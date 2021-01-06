import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { IData } from '../../helpers/global/interfaces';
import { MainState } from '../../context/MainState';
import Item from './Item';
import { getFiveDayForecast } from '../../helpers/global/fetchData';
import StartMessage from '../StartMessage';

const DailyWeatherForecast = (): JSX.Element => {
    const [dailyWeatherForecasts, setDailyWeatherForecasts] = useState<IData[] | null>(null)
    const { state } = useContext(MainState);

    useEffect(() => {
        setFiveDayWeatherForecast();
    }, [])

    const setFiveDayWeatherForecast = async (): Promise<void> => {
        try {
            if (state.userLocation !== null) {
                const response: IData[] | undefined = await getFiveDayForecast(state.userLocation);
                if (response !== undefined) {
                    setDailyWeatherForecasts(response)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const renderItem = (item: IData, index: number): JSX.Element => {
        return (<Item item={item} index={index} />)
    }
    if (!state.spinnerFlag) {
        return (
            <FlatList
                data={dailyWeatherForecasts}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListStyle}
                renderItem={({ item, index }) => renderItem(item, index)}
            />
        )
    }
    return <StartMessage size={40} />

}
const styles = StyleSheet.create({
    flatListStyle: {
        position: 'absolute',
        bottom: 20,
        padding: 20,
    }
})
export default DailyWeatherForecast;