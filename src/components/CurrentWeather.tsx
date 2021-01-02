import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { IMAGE_SIZE } from '../helpers/constants';
import { IData } from '../helpers/interfaces';

interface IProps {
    weather: IData;
}

const CurrentWeather = ({ weather }: IProps) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.weatherDescriptionText}>{weather.weather.description}</Text>
            <View style={styles.informationContainer}>
                <View style={styles.temperatureContainer}>
                    <Image source={{ uri: `https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png` }} style={styles.imageSize} />
                    <Text style={styles.temperatureText}>{weather.temp}&#176;</Text>
                </View>
                <View style={{ padding: 20, alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', marginRight: 30 }}>
                        <Text >Oborine</Text>
                        <Text>10</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text>Vlaga</Text>
                        <Text>10</Text>
                    </View>
                </View>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 25
    },
    informationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    weatherDescriptionText: {
        fontSize: 16,
        color: '#696969',
        padding: 10
    },
    imageSize: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        resizeMode: 'contain'
    },
    temperatureContainer: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center'
    },
    temperatureText: {
        fontSize: 25,
        fontWeight: 'bold'
    }
})
export default CurrentWeather;