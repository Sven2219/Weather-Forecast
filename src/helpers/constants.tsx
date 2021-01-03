import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");


export const IMAGE_SIZE:number = (width + height) / 15;
export const ITEM_WIDTH:number = width/3;
export const ITEM_HEIGHT:number = width/2.6;