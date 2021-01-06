import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
interface IProps {
    size: number;
}
const StartMessage = ({ size }: IProps): JSX.Element => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.textStyle}>Retrieving temperature from your location</Text>
            <ActivityIndicator size={size} color={'#000000'} />
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textStyle: {
        fontSize: 17,
        letterSpacing: 1.3,
        fontWeight: 'bold',
        textAlign: 'center',
        bottom: 20
    }
})
export default StartMessage;