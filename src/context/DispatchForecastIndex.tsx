import { createContext } from 'react';
import { setForecastIndex } from '../reducers/main';
interface IContextProps {
    setForecastIndex: React.Dispatch<setForecastIndex>;
}
export const DispatchForecastIndex = createContext({} as IContextProps);