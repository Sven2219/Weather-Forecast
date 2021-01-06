import axios from "axios";
import { IData, IUserLocation, IWeather } from "./interfaces";
import GetLocation from 'react-native-get-location'
export const getUserLocation = async (): Promise<GetLocation.Location | undefined> => {
    try {
        const userLocation = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        return userLocation;
    } catch (error) {
        return error;
    }
}

export const getDetailedDailyForecast = async (userLocation: IUserLocation): Promise<IWeather | undefined> => {
    try {
        const response = await axios.get('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
            {
                headers: {
                    'x-rapidapi-key': '93604754d4msh71333ee389a8f3dp1f1610jsn812751c78d91',
                    'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
                },
                params: {
                    lon: userLocation.longitude, lat: userLocation.latitude
                }
            })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export const getFiveDayForecast = async (userLocation: IUserLocation): Promise<IData[] | undefined> => {
    try {
        if (userLocation !== null) {
            const response = await axios.get('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily',
                {
                    headers: {
                        'x-rapidapi-key': '93604754d4msh71333ee389a8f3dp1f1610jsn812751c78d91',
                        'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
                    },
                    params: {
                        lon: userLocation.longitude, lat: userLocation.latitude
                    }
                })
            return response.data.data.slice(0, 5)
        }
    } catch (error) {
        console.log(error)
    }
}