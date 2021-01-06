import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");


export const IMAGE_SIZE: number = (width + height) / 15;
export const ITEM_WIDTH: number = width / 3;
export const ITEM_HEIGHT: number = width / 2.6;
export const NUMBER_OF_POINTS_IN_GRAPH: number = 8;
export const RETRY_BUTTON_WIDTH: number = width / 4;
export const RETRY_BUTTON_HEIGHT:number = 30;