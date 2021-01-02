import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
interface IProps {
    city_name: string;
}
const CityName = ({ city_name }: IProps) => {
    return (<View style={styles.namePosition}>
        <Text style={styles.nameStyle}>{city_name}</Text>
    </View>)
}
const styles = StyleSheet.create({
    namePosition:{
        alignItems:'center',
        padding:40
    },
    nameStyle:{
        fontSize:18,
        letterSpacing:1.3,
        textTransform:'uppercase',
        color:'#000'
    }
})
export default CityName;