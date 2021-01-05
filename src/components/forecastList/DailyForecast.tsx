import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { IData } from '../../helpers/global/interfaces';
import axios from 'axios';
import { MainState } from '../../context/MainState';
import Item from './Item';

const DailyForecast = (): JSX.Element => {
    const [dailyForecast, setDailyForecast] = useState<IData[] | null>(null)
    const { state } = useContext(MainState);
    useEffect(() => {
        getDailyForecast();
    }, [])
    const getDailyForecast = async (): Promise<void> => {
        try {
            if (state.userLocation !== null) {
                const response = await axios.get('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily',
                    {
                        headers: {
                            'x-rapidapi-key': 'd61a1eb47fmsh0d8daf8b10d2ab6p183bd9jsn351c8602f81b',
                            'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
                        },
                        params: {
                            lon: state.userLocation.longitude, lat: state.userLocation.latitude
                        }
                    })
                setDailyForecast(response.data.data.slice(0, 5));
            }
        } catch (error) {
            console.log(error)
        }
    }
    const renderItem = (item: IData, index: number): JSX.Element => {
        return (<Item item={item} index={index} />)
    }
    return (
        <FlatList
            data={dailyForecast}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListStyle}
            renderItem={({ item, index }) => renderItem(item, index)}
        />
    )
}
const styles = StyleSheet.create({
    flatListStyle: {
        position: 'absolute',
        bottom: 20,
        padding: 20,
    }
})
export default DailyForecast;