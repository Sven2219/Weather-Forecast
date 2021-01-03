export interface IData {
    datetime: string;
    sunrise: string;
    sunset: string;
    weather: IIcon;
    temp: number;
    wind_spd: number;
    low_temp: number;
    max_temp: number;
}
export interface IIcon {
    icon: string;
    code: number;
    description: string;
}
export interface IWeather {
    city_name: string;
    country_code: string;
    data: IData[];
}
export interface IUserLocation {
    latitude: number;
    longitude: number;
}