import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { IMAGE_SIZE } from '../helpers/constants';
import { IData } from '../helpers/interfaces';

interface IProps {
    currentWeather: IData;
}

const CurrentWeather = ({ currentWeather }: IProps): JSX.Element => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.weatherDescriptionText}>{currentWeather.weather.description}</Text>
            <View style={styles.informationContainer}>
                <View style={styles.temperatureContainer}>
                    <Image source={{ uri: `https://www.weatherbit.io/static/img/icons/${currentWeather.weather.icon}.png` }} style={styles.imageSize} />
                    <Text style={styles.temperatureText}>{currentWeather.temp}&#176;</Text>
                </View>
                <View style={styles.otherInformation}>
                    <View style={{ alignItems: 'center', marginRight: 30 }}>
                        <Text >Oborine</Text>
                        <Text>10</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text>Vjetar</Text>
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
        resizeMode: 'contain',
        marginRight: 10
    },
    temperatureContainer: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center'
    },
    temperatureText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    otherInformation: {
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row'
    }
})
export default CurrentWeather;