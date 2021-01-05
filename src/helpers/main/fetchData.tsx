import axios from "axios";
import { IUserLocation, IWeather } from "../global/interfaces";
import GetLocation from 'react-native-get-location'
export const getUserLocation = async (): Promise<GetLocation.Location | undefined> => {
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

export const getDetailedDailyForecast = async (userLocation: IUserLocation): Promise<IWeather | undefined> => {
    try {
        const response = await axios.get('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
            {
                headers: {
                    'x-rapidapi-key': 'd61a1eb47fmsh0d8daf8b10d2ab6p183bd9jsn351c8602f81b',
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
