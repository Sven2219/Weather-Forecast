export interface IData {
    datetime: string;
    weather: IIcon;
    temp: number;
    wind_spd: number;
    low_temp: number;
    max_temp: number;
}
export interface IIcon {
    icon: string;
    description: string;
}
export interface IWeather {
    city_name: string;
    data: IData[];
}
export interface IUserLocation {
    latitude: number;
    longitude: number;
}
export interface IGraph {
    labels: string[];
    values: number[];
}