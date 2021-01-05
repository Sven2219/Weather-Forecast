import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
interface IProps {
    city_name: string;
}
const CityName = ({ city_name }: IProps): JSX.Element => {
    return (
        <View style={styles.namePosition}>
            <Text style={styles.nameStyle}>{city_name}</Text>
        </View>)
}
const styles = StyleSheet.create({
    namePosition: {
        alignItems: 'center',
        padding: 15
    },
    nameStyle: {
        fontSize: 20,
        letterSpacing: 1.4,
        fontWeight:'bold',
        textTransform: 'uppercase',
        color: '#000'
    }
})
export default CityName;