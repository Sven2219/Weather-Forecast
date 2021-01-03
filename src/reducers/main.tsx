import { IUserLocation } from "../helpers/interfaces";

export interface IState {
    dayIndex: number;
    userLocation: IUserLocation;
}

export type setDayIndex = {
    readonly type: "setDayIndex";
    readonly payload: number;
}

type setUserLocation = {
    readonly type: "setUserLocation";
    readonly payload: IUserLocation;
}

export type Actions = setDayIndex | setUserLocation;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setDayIndex":
            return { ...state, dayIndex: actions.payload };
        case "setUserLocation":
            return { ...state, userLocation: actions.payload };
        default:
            return state;
    }
}