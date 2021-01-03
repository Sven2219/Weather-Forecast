import React, { useEffect, useReducer } from 'react';
import GetLocation from 'react-native-get-location'
import FiveDayForecast from '../components/forecastList/FiveDayForecast';
import { Actions, IState, reducer } from '../reducers/main';
import { DispatchDayIndex } from '../context/DispatchDayIndex';
import { MainState } from '../context/MainState';
import { StyleSheet, View } from 'react-native';

const Main = (): JSX.Element | null => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, { dayIndex: 0, userLocation: { latitude: 0, longitude: 0 } });
    useEffect(() => {
        setUserLocation();
    }, [])
    const setUserLocation = async (): Promise<void> => {
        try {
            const userLocation = await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
            dispatch({ type: "setUserLocation", payload: { latitude: userLocation.latitude, longitude: userLocation.longitude } });
        } catch (error) {
            console.log(error)
        }
    }
    if (state.userLocation.longitude !== 0) {
        return (
            <View style={styles.mainContainer}>
                <DispatchDayIndex.Provider value={{ setDayIndex: dispatch }}>
                    <MainState.Provider value={{ state }}>
                        <FiveDayForecast />
                    </MainState.Provider>
                </DispatchDayIndex.Provider>
            </View>
        )
    }
    return null;
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    }
})

export default Main;