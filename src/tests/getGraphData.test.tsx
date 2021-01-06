import { getGraphData } from "../helpers/weatherForecastGraph/getGraphData"
import { weatherForecast } from "./testData"
//again using dummy data
it('Should slice weather forecast data correctly', () => {
    expect(getGraphData(weatherForecast, 1, 7)).toEqual(
        expect.objectContaining({
            values: ([10,10,10,10,10,10,10,10]),
            labels: (["00:00","03:00","06:00","09:00","12:00","15:00","18:00","21:00"])
        }),
    );
});
