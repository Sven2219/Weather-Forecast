import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");


export const IMAGE_SIZE = (width + height) / 15;
