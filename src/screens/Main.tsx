import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import GetLocation from 'react-native-get-location'
import CurrentWeather from '../components/CurrentWeather';
import { IWeather } from '../helpers/interfaces';
import CityName from '../components/CityName';


const Main = (): JSX.Element | null => {
    const [weather, setWeather] = useState<IWeather | null>(null);
    useEffect(() => {
        getWeather();
    }, [])
    const getUserLocation = async (): Promise<GetLocation.Location | undefined> => {
        try {
            const userLocation = await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
            return userLocation;
        } catch (error) {
            console.log(error)
        }
    }
    const getWeather = async (): Promise<void> => {
        try {
            const userLocation = await getUserLocation();
            const response = await axios.get('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly', {
                headers: {
                    'x-rapidapi-key': 'd61a1eb47fmsh0d8daf8b10d2ab6p183bd9jsn351c8602f81b',
                    'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
                },
                params: { lon: `${userLocation?.longitude}`, lat: `${userLocation?.latitude}` },
            })
            setWeather(response.data);
        } catch (error) {
            console.log(error)
        }
    }
    if (weather !== null) {
        return (<View style={styles.mainContainer}>
            <StatusBar hidden />
            <CityName city_name={weather.city_name} />
            <CurrentWeather weather={weather.data[0]} />
        </View>)
    }
    return null;
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:'rgba(255,255,255,0.5)'
    }
})

export default Main;