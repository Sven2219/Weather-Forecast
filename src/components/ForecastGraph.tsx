import React, { useContext, useEffect, useRef, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { DispatchForecastIndex } from '../context/DispatchForecastIndex';
import { MainState } from '../context/MainState';
import { chartConfig } from '../helpers/forecastGraph/chartConfig';
import { getFirstTimeZero } from '../helpers/forecastGraph/getFirstTimeZero';
import { getGraphData } from '../helpers/forecastGraph/sliceData';
import { NUMBER_OF_POINTS_IN_GRAPH, width } from '../helpers/global/constants';
import { IGraph } from '../helpers/global/interfaces';


const ForecastGraph = (): JSX.Element | null => {
    const { setForecastIndex } = useContext(DispatchForecastIndex);
    const { state } = useContext(MainState);
    const [graphData, setGraphData] = useState<IGraph>({ labels: [], values: [] });
    const firstTimeZero = useRef<number>(0)
    useEffect(() => {
        if (state.detailedDailyForecasts !== null) {
            firstTimeZero.current = getFirstTimeZero(state.detailedDailyForecasts?.data.slice(0, 11));
        }
    }, [])
    useEffect(() => {
        if (state.detailedDailyForecasts !== null) {
            const graphData: IGraph = getGraphData(state.detailedDailyForecasts, state.dayIndex, firstTimeZero.current);
            setGraphData(graphData);
            updateTemperatureIndex();
        }
    }, [state.dayIndex])


    const updateTemperatureIndex = (): void => {
        const temperatureIndex: number = state.dayIndex === 0 ? 0 : firstTimeZero.current + (state.dayIndex - 1) * NUMBER_OF_POINTS_IN_GRAPH;
        setForecastIndex({ type: "setForecastIndex", payload: temperatureIndex });
    }

    const getIndexPosition = (index: number): number => {
        return state.dayIndex === 0 ? index : (NUMBER_OF_POINTS_IN_GRAPH * (state.dayIndex - 1)) + firstTimeZero.current + index;
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
                withHorizontalLines={false}
                withVerticalLines={false}
                withHorizontalLabels={false}
                chartConfig={chartConfig}
                bezier
            />)
    }
    return null;
}

export default ForecastGraph;