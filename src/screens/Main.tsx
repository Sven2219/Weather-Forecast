import React, { useEffect, useReducer } from 'react';
import DailyWeatherForecast from '../components/dailyWeatherForecast/DailyWeatherForecast';
import { Actions, IState, reducer } from '../reducers/main';
import { MainState } from '../context/MainState';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import WeatherForecastGraph from '../components/WeatherForecastGraph';
import { DispatchForecastIndex, DispatchDayIndex } from '../context/MainDispatch';
import { getDetailedDailyForecast, getUserLocation } from '../helpers/global/fetchData';
import CityName from '../components/CityName';
import CurrentWeatherInfo from '../components/CurrentWeatherInfo';
import StartMessage from '../components/StartMessage';
import { IUserLocation, IWeather } from '../helpers/global/interfaces';
//@ts-ignore
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import { RETRY_BUTTON_HEIGHT, RETRY_BUTTON_WIDTH } from '../helpers/global/constants';

const Main = (): JSX.Element => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        detailedDailyForecasts: null,
        dayIndex: 0,
        forecastIndex: 0,
        userLocation: null,
        spinnerFlag: true,
        locationErrorMessage: ""
    }
    );
    useEffect(() => {
        enableLocation()
    }, [])
    useEffect(() => {
        if (state.userLocation !== null) {
            setDetailedDailyForecast()
        }
    }, [state.userLocation])
    const enableLocation = async (): Promise<void> => {
        try {
            await LocationServicesDialogBox.checkLocationServicesIsEnabled({
                message: "<h2>Use Location?</h2> \ This app wants to change your device settings:<br/><br/>\ Use GPS for location<br/><br/>",
                ok: "YES", cancel: "NO"
            })
            await setUserLocation();
        } catch (error) {
            dispatch({ type: "setLocationErrorMessage", payload: "If you do not allow the location we cannot show you the temperature" });
        }
    }
    const setUserLocation = async (): Promise<void> => {
        try {
            const userLocation: IUserLocation | undefined = await getUserLocation();
            if (userLocation?.latitude !== undefined && userLocation.longitude !== undefined) {
                dispatch({ type: "setUserLocation", payload: { latitude: userLocation.latitude, longitude: userLocation.longitude } })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setDetailedDailyForecast = async (): Promise<void> => {
        try {
            if (state.userLocation !== null) {
                const detailedDailyForecasts: IWeather | undefined = await getDetailedDailyForecast(state.userLocation);
                if (detailedDailyForecasts !== undefined) {
                    dispatch({ type: "setDetailedDailyForecast", payload: detailedDailyForecasts })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const detailedInformation = (): JSX.Element | null => {
        if (state.detailedDailyForecasts !== null) {
            return (
                <>
                    <CityName city_name={state.detailedDailyForecasts.city_name} />
                    <CurrentWeatherInfo currentWeather={state.detailedDailyForecasts.data[state.forecastIndex]} />
                    <DispatchForecastIndex.Provider value={{ setForecastIndex: dispatch }}>
                        <MainState.Provider value={{ state }}>
                            <WeatherForecastGraph />
                        </MainState.Provider>
                    </DispatchForecastIndex.Provider>
                </>
            )
        }
        return null;
    }
    if (state.userLocation !== null) {
        return (
            <View style={styles.mainContainer}>
                {detailedInformation()}
                <DispatchDayIndex.Provider value={{ setDayIndex: dispatch }}>
                    <MainState.Provider value={{ state }}>
                        <DailyWeatherForecast />
                    </MainState.Provider>
                </DispatchDayIndex.Provider>
            </View>
        )
    }
    else if (state.locationErrorMessage !== "") {
        return (
            <View style={[styles.mainContainer, styles.errorPosition]}>
                <Text style={styles.errorText}>{state.locationErrorMessage}</Text>
                <TouchableOpacity onPress={setUserLocation} style={[styles.buttonContainer, styles.shadow]}>
                    <Text style={[styles.errorText, styles.retryText]}>Retry</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return <StartMessage size={40} />
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    errorPosition: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        fontSize: 18,
        letterSpacing: 1.3,
        textAlign: 'center'
    },
    retryText: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        top: RETRY_BUTTON_HEIGHT,
        width: RETRY_BUTTON_WIDTH,
        height: RETRY_BUTTON_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
})

export default Main;