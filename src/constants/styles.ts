import {Dimensions, Platform} from "react-native";
import { colors } from "./colors";

const {width, height} = Dimensions.get('screen');
export const APP_WIDTH = width;
export const APP_HEIGHT = height;

export const crossPlaformShadow = (size: number) => ({
    ...Platform.select({
      ios: {
        shadowColor: colors.plainBlack,
        shadowOffset: {
          width: 0,
          height: size / 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: size / 1.1,
        overflow: 'visible',
      },
      android: {
        elevation: size,
        overflow: 'hidden',
        shadowColor: colors.grey_500,
        shadowRadius: size * 2,
      },
    }),
  });