import { getDay } from "../components/dailyWeatherForecast/getters"

it('Should return current day', () => {
    expect(getDay('2021-01-07')).toBe('Thu')
})