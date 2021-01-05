import { days } from "./days";

export const getDay = (datetime:string): string => {
    const date = new Date(datetime);
    return days[date.getDay()];
}
export const getBorderWidth = (index:number,currentIndex:number): number => {
    return index === currentIndex ? 1 : 0;
}