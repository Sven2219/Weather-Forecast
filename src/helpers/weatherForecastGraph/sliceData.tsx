import { NUMBER_OF_POINTS_IN_GRAPH } from "../global/constants";
import { IGraph, IWeather } from "../global/interfaces";


export const getGraphData = (detailedDailyForecasts: IWeather, dayIndex: number, firstTimeZero: number): IGraph => {
    const values: number[] = [];
    const labels: string[] = [];
    if (detailedDailyForecasts !== null) {
        const { data } = detailedDailyForecasts;
        if (dayIndex === 0) {
            for (let i = 0; i < NUMBER_OF_POINTS_IN_GRAPH; i++) {
                values.push(data[i].temp);
                labels.push(data[i].datetime.slice(-2) + ":" + "00");
            }
        }
        else {
            let i: number = firstTimeZero + NUMBER_OF_POINTS_IN_GRAPH * (dayIndex - 1);
            const length: number = i + NUMBER_OF_POINTS_IN_GRAPH;
            for (i; i < length; i++) {
                values.push(data[i].temp);
                labels.push(data[i].datetime.slice(-2) + ":" + "00");
            }
        }
    }
    return { values, labels };
}