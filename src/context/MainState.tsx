import { createContext } from 'react';
import { IState } from '../reducers/main';
interface IContextProps {
    state: IState;
}
export const MainState = createContext({} as IContextProps);