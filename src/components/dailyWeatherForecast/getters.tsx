import { days } from "../../helpers/global/days";

export const getDay = (datetime: string): string => {
    const date = new Date(datetime);
    return days[date.getDay()];
}
export const getBorderWidth = (index: number, currentIndex: number): number => {
    return index === currentIndex ? 1 : 0;
}
export const getRightMargin = (index: number): number => {
    if (index !== 4) {
        return 20;
    }
    return 0;
}