import { IUserLocation, IWeather } from "../helpers/global/interfaces";

export interface IState {
    dayIndex: number;
    forecastIndex: number;
    userLocation: IUserLocation | null;
    detailedDailyForecasts: IWeather | null;
    spinnerFlag: boolean;
    locationErrorMessage: string;
}

export type setDayIndex = {
    readonly type: "setDayIndex";
    readonly payload: number;
}

export type setForecastIndex = {
    readonly type: "setForecastIndex";
    readonly payload: number;
}

type setDetailedDailyForecast = {
    readonly type: "setDetailedDailyForecast";
    readonly payload: IWeather;
}
type setUserLocation = {
    readonly type: "setUserLocation";
    readonly payload: IUserLocation;
}
type setLocationErrorMessage = {
    readonly type: "setLocationErrorMessage";
    readonly payload: string;
}
export type Actions = setDayIndex | setForecastIndex | setDetailedDailyForecast | setUserLocation | setLocationErrorMessage;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setDayIndex":
            return { ...state, dayIndex: actions.payload };
        case "setForecastIndex":
            return { ...state, forecastIndex: actions.payload };
        case "setDetailedDailyForecast":
            return { ...state, detailedDailyForecasts: actions.payload, spinnerFlag: false };

        case "setUserLocation":
            return { ...state, userLocation: actions.payload }
        case "setLocationErrorMessage":
            return { ...state, locationErrorMessage: actions.payload };
        default:
            return state;
    }
}