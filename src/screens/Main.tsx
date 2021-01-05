import React, { useEffect, useReducer } from 'react';
import DailyForecast from '../components/forecastList/DailyForecast';
import { Actions, IState, reducer } from '../reducers/main';
import { DispatchDayIndex } from '../context/DispatchDayIndex';
import { MainState } from '../context/MainState';
import { StyleSheet, View } from 'react-native';
import ForecastGraph from '../components/ForecastGraph';
import { DispatchTemperatureIndex } from '../context/DispatchTemperatureIndex';
import { getDetailedDailyForecast, getUserLocation } from '../helpers/main/getInitialValues';
import CityName from '../components/CityName';
import CurrentWeather from '../components/CurrentWeather';

const Main = (): JSX.Element | null => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        detailedDailyForecasts: null,
        dayIndex: 0,
        temperatureIndex: 0,
        userLocation: null,
    }
    );
    useEffect(() => {
        setInitialValues()
    }, [])
    const setInitialValues = async (): Promise<void> => {
        try {
            const userLocation = await getUserLocation();
            if (userLocation !== undefined) {
                const detailedDailyForecasts = await getDetailedDailyForecast(userLocation);
                dispatch({ type: "setInitialValues", userLocation: userLocation, detailedDailyForecasts: detailedDailyForecasts })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const showCurrentWeather = () => {
        let index: number = state.dayIndex === 0 ? state.temperatureIndex : state.dayIndex * state.temperatureIndex;
        if (state.detailedDailyForecasts !== null)
            return (
                <CurrentWeather currentWeather={state.detailedDailyForecasts.data[index]} />
            )
    }
    if (state.detailedDailyForecasts !== null) {
        return (
            <View style={styles.mainContainer}>
                <CityName city_name={state.detailedDailyForecasts.city_name} />
                {showCurrentWeather()}
                <DispatchTemperatureIndex.Provider value={{ setTemperatureIndex: dispatch }}>
                    <MainState.Provider value={{ state }}>
                        <ForecastGraph />
                    </MainState.Provider>
                </DispatchTemperatureIndex.Provider>
                <DispatchDayIndex.Provider value={{ setDayIndex: dispatch }}>
                    <MainState.Provider value={{ state }}>
                        < DailyForecast />
                    </MainState.Provider>
                </DispatchDayIndex.Provider>
            </View>
        )
    }
    //spinner goes here
    return null;
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    }
})

export default Main;