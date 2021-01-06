import { getFirstTimeZeroHours } from "../helpers/weatherForecastGraph/getFirstTimeZeroHours"
import { weatherForecast } from "./testData";

it('Should return first time zero hours', () => {
    expect(getFirstTimeZeroHours(weatherForecast)).toBe(7);
})
