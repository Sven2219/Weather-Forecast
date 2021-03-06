import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { DispatchDayIndex } from '../../context/MainDispatch';
import { MainState } from '../../context/MainState';
import { IMAGE_SIZE, ITEM_HEIGHT, ITEM_WIDTH } from '../../helpers/global/constants';
import { IData } from '../../helpers/global/interfaces';
import { getBorderWidth, getDay, getRightMargin } from './getters';

interface IProps {
    item: IData;
    index: number
}

const Item = ({ item, index }: IProps): JSX.Element => {
    const { setDayIndex } = useContext(DispatchDayIndex);
    const { state } = useContext(MainState);
    const setIndex = (): void => {
        setDayIndex({ type: "setDayIndex", payload: index });
    }

    return (
        <TouchableWithoutFeedback onPress={setIndex}>
            <View style={[styles.mainContainer, styles.shadow,
            { borderWidth: getBorderWidth(index, state.dayIndex), marginRight: getRightMargin(index) }
            ]}>
                <Text style={styles.greyText}>{getDay(item.datetime)}</Text>
                <Image
                    source={{ uri: `https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png` }}
                    style={styles.imageStyle}
                />
                <View style={styles.minMaxContainer}>
                    <Text style={styles.darkText}>
                        {item.max_temp}&#176;
                    </Text>
                    <Text style={styles.greyText}>
                        {item.low_temp}&#176;
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    shadow: {
        shadowColor: "#fff",
        shadowOffset: {
            width: 10,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    imageStyle: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
    },
    minMaxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: ITEM_WIDTH,
        justifyContent: 'space-evenly'
    },
    greyText: {
        color: 'rgba(0,0,0,0.5)',
    },
    darkText: {
        color: '#000',
    }
})
export default Item;