import { NUMBER_OF_POINTS_IN_GRAPH } from "../global/constants";
import { IData, IGraph } from "../global/interfaces";


export const getGraphData = (data: IData[], dayIndex: number, firstTimeZeroHours: number): IGraph => {
    const values: number[] = [];
    const labels: string[] = [];
    if (dayIndex === 0) {
        for (let i = 0; i < NUMBER_OF_POINTS_IN_GRAPH; i++) {
            values.push(data[i].temp);
            labels.push(data[i].datetime.slice(-2) + ":" + "00");
        }
    }
    else {
        let i: number = firstTimeZeroHours + NUMBER_OF_POINTS_IN_GRAPH * (dayIndex - 1);
        const length: number = i + NUMBER_OF_POINTS_IN_GRAPH;
        for (i; i < length; i++) {
            values.push(data[i].temp);
            labels.push(data[i].datetime.slice(-2) + ":" + "00");
        }
    }
    return { values, labels };
}