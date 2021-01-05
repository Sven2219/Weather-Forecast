import React, { useEffect, useReducer } from 'react';
import DailyForecast from '../components/forecastList/DailyForecast';
import { Actions, IState, reducer } from '../reducers/main';
import { DispatchDayIndex } from '../context/DispatchDayIndex';
import { MainState } from '../context/MainState';
import { StyleSheet, View } from 'react-native';
import ForecastGraph from '../components/ForecastGraph';
import { DispatchForecastIndex } from '../context/DispatchForecastIndex';
import { getDetailedDailyForecast, getUserLocation } from '../helpers/main/fetchData';
import CityName from '../components/CityName';
import CurrentWeatherInfo from '../components/CurrentWeatherInfo';
import StartMessage from '../components/StartMessage';
import { IUserLocation, IWeather } from '../helpers/global/interfaces';


const Main = (): JSX.Element => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        detailedDailyForecasts: null,
        dayIndex: 0,
        forecastIndex: 0,
        userLocation: null,
    }
    );
    useEffect(() => {
        fetchDataByLocation()
    }, [])

    const fetchDataByLocation = async (): Promise<void> => {
        try {
            const userLocation: IUserLocation | undefined = await getUserLocation();
            if (userLocation !== undefined) {
                const detailedDailyForecasts: IWeather | undefined = await getDetailedDailyForecast(userLocation);
                if (detailedDailyForecasts !== undefined) {
                    dispatch({ type: "setInitialValues", userLocation: userLocation, detailedDailyForecasts: detailedDailyForecasts })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const showCurrentWeather = (): JSX.Element | null => {
        if (state.detailedDailyForecasts !== null) {
            return (
                <CurrentWeatherInfo currentWeather={state.detailedDailyForecasts.data[state.forecastIndex]} />
            )
        }
        return null;
    }
    if (state.detailedDailyForecasts !== null) {
        return (
            <View style={styles.mainContainer}>
                <CityName city_name={state.detailedDailyForecasts.city_name} />
                {showCurrentWeather()}
                <DispatchForecastIndex.Provider value={{ setForecastIndex: dispatch }}>
                    <MainState.Provider value={{ state }}>
                        <ForecastGraph />
                    </MainState.Provider>
                </DispatchForecastIndex.Provider>
                <DispatchDayIndex.Provider value={{ setDayIndex: dispatch }}>
                    <MainState.Provider value={{ state }}>
                        <DailyForecast />
                    </MainState.Provider>
                </DispatchDayIndex.Provider>
            </View>
        )
    }
    return <StartMessage size={40} />;
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    }
})

export default Main;