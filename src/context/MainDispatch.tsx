import { createContext } from 'react';
import { setForecastIndex,setDayIndex } from '../reducers/main';


interface IContextForecastIndex {
    setForecastIndex: React.Dispatch<setForecastIndex>;
}
export const DispatchForecastIndex = createContext({} as IContextForecastIndex);


interface IContextDayIndex {
    setDayIndex: React.Dispatch<setDayIndex>;
}
export const DispatchDayIndex = createContext({} as IContextDayIndex);