import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';
import GetLocation from 'react-native-get-location'


const Main = (): JSX.Element => {
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
            const response = await axios.get('https://weatherbit-v1-mashape.p.rapidapi.com/current', {
                headers: {
                    'x-rapidapi-key': 'd61a1eb47fmsh0d8daf8b10d2ab6p183bd9jsn351c8602f81b',
                    'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
                },
                params: { lon: `${userLocation?.longitude}`, lat: `${userLocation?.latitude}` },
            })
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    return (<View>
        <Text>
            Main
        </Text>
    </View>)
}

export default Main;