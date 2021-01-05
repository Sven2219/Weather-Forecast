import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { IMAGE_SIZE } from '../helpers/global/constants';
import { IData } from '../helpers/global/interfaces';
interface IProps {
    currentWeather: IData;
}

const CurrentWeatherInfo = ({ currentWeather }: IProps): JSX.Element => {
    return (
        <View>
            <Text style={styles.weatherDescriptionText}>{currentWeather.weather.description}</Text>
            <View style={styles.informationContainer}>
                <View style={styles.temperatureContainer}>
                    <Image source={{ uri: `https://www.weatherbit.io/static/img/icons/${currentWeather.weather.icon}.png` }} style={styles.imageSize} />
                    <Text style={styles.temperatureText}>{currentWeather.temp}&#176;</Text>
                </View>
                <View style={styles.otherInformation}>
                    <View style={styles.windTextPosition}>
                        <Text style={styles.windText}>Wind</Text>
                        <Text style={styles.windText}>{(currentWeather.wind_spd).toPrecision(1)} km/h</Text>
                    </View>
                </View>
            </View>
        </View>)
}

const styles = StyleSheet.create({

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
    },
    windText: {
        fontSize: 16,
        letterSpacing: 1.3,
    },
    windTextPosition: {
        alignItems: 'center',
        marginRight: 30
    }
})
export default CurrentWeatherInfo;