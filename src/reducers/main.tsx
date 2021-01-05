import { IUserLocation, IWeather } from "../helpers/global/interfaces";

export interface IState {
    dayIndex: number;
    temperatureIndex: number;
    userLocation: IUserLocation | null;
    detailedDailyForecasts: IWeather | null;

}

export type setDayIndex = {
    readonly type: "setDayIndex";
    readonly payload: number;
}


export type setTemperatureIndex = {
    readonly type: "setTemperatureIndex";
    readonly payload: number;
}

type setInitialValues = {
    readonly type: "setInitialValues";
    readonly userLocation: IUserLocation;
    readonly detailedDailyForecasts: IWeather;
}
export type Actions = setDayIndex | setTemperatureIndex | setInitialValues;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setDayIndex":
            return { ...state, dayIndex: actions.payload };
        case "setTemperatureIndex":
            return { ...state, temperatureIndex: actions.payload };
        case "setInitialValues":
            return { ...state, userLocation: actions.userLocation, detailedDailyForecasts: actions.detailedDailyForecasts };
        default:
            return state;
    }
}