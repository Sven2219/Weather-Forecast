import { IData } from "../global/interfaces";

export const getFirstTimeZero = (data: IData[]): number => {
    const length: number = data.length;
    for (let i = 0; i < length; i++) {
        if (i !== 0 && data[i].datetime.slice(-2) === "00") {
            return i;
        }
    }
    return 0;
}