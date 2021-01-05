import { createContext } from 'react';
import { setTemperatureIndex } from '../reducers/main';
interface IContextProps {
    setTemperatureIndex: React.Dispatch<setTemperatureIndex>;
}
export const DispatchTemperatureIndex = createContext({} as IContextProps);