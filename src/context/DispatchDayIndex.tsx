import { createContext } from 'react';
import { setDayIndex } from '../reducers/main';
interface IContextProps {
    setDayIndex: React.Dispatch<setDayIndex>;
}
export const DispatchDayIndex = createContext({} as IContextProps);