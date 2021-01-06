import React, { useContext, useEffect, useRef, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { DispatchForecastIndex } from '../context/MainDispatch';
import { MainState } from '../context/MainState';
import { chartConfig } from '../helpers/weatherForecastGraph/chartConfig';
import { getFirstTimeZeroHours } from '../helpers/weatherForecastGraph/getFirstTimeZeroHours';
import { getGraphData } from '../helpers/weatherForecastGraph/sliceData';
import { NUMBER_OF_POINTS_IN_GRAPH, width } from '../helpers/global/constants';
import { IGraph } from '../helpers/global/interfaces';
import { StyleSheet } from 'react-native';


const WeatherForecastGraph = (): JSX.Element | null => {
    const { setForecastIndex } = useContext(DispatchForecastIndex);
    const { state } = useContext(MainState);
    const [graphData, setGraphData] = useState<IGraph>({ labels: [], values: [] });
    const firstTimeZeroHours = useRef<number>(0)
    useEffect(() => {
        if (state.detailedDailyForecasts !== null) {
            firstTimeZeroHours.current = getFirstTimeZeroHours(state.detailedDailyForecasts?.data.slice(0, 11));
        }
    }, [])
    useEffect(() => {
        if (state.detailedDailyForecasts !== null) {
            const graphData: IGraph = getGraphData(state.detailedDailyForecasts, state.dayIndex, firstTimeZeroHours.current);
            setGraphData(graphData);
            updateTemperatureIndex();
        }
    }, [state.dayIndex])


    const updateTemperatureIndex = (): void => {
        const temperatureIndex: number = state.dayIndex === 0 ? 0 : firstTimeZeroHours.current + (state.dayIndex - 1) * NUMBER_OF_POINTS_IN_GRAPH;
        setForecastIndex({ type: "setForecastIndex", payload: temperatureIndex });
    }

    const getIndexPosition = (index: number): number => {
        return state.dayIndex === 0 ? index : (NUMBER_OF_POINTS_IN_GRAPH * (state.dayIndex - 1)) + firstTimeZeroHours.current + index;
    }

    const data = {
        labels: graphData.labels,
        datasets: [
            {
                data: graphData.values,
                color: (opacity = 1) => `rgba(229, 219, 19, ${opacity})`, // optional
                strokeWidth: 4 // optional
            }
        ],
    };

    if (graphData.labels.length !== 0) {
        return (
            <LineChart
                onDataPointClick={({ index }) => setForecastIndex({ type: "setForecastIndex", payload: getIndexPosition(index) })}
                data={data}
                width={width}
                height={170}
                style={styles.graphStyle}
                withHorizontalLines={false}
                withVerticalLines={false}
                withHorizontalLabels={false}
                chartConfig={chartConfig}
                bezier
            />
        )
    }
    return null;
}
const styles = StyleSheet.create({
    graphStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})
export default WeatherForecastGraph;