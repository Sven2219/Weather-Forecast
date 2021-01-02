export interface IData {
    dattime: string;
    sunrise: string;
    sunset: string;
    weather: IIcon;
    temp: string;
    wind_spd: string
}
export interface IIcon {
    icon: string;
    code: string;
    description: string;
}
export interface IWeather {
    city_name: string;
    country_code: string;
    data: IData[];
}