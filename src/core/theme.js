import { DefaultTheme } from "react-native-paper";
import { Dimensions, PixelRatio } from "react-native";
const { width, height } = Dimensions.get("window");

const scaleFont = (size) => size * PixelRatio.getFontScale();

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "#000000",
    primary: "#487563",
    secondary: "#414757",
    error: "#f13a59",
    lightBlue: "#049ead",
    background: "#DCEEE7",
    white: "#ffffff",
    success: "#3adb76",
    warning: "#ffae00",
    turquoise: "#03dac5",
  },
  mixins: {
    height: height,
    width: width,
  },
  fontSize: {
    FONT_SIZE_36: scaleFont(36),
    FONT_SIZE_30: scaleFont(30),
    FONT_SIZE_28: scaleFont(28),
    FONT_SIZE_26: scaleFont(26),
    FONT_SIZE_25: scaleFont(25),
    FONT_SIZE_24: scaleFont(24),
    FONT_SIZE_23: scaleFont(23),
    FONT_SIZE_22: scaleFont(22),
    FONT_SIZE_21: scaleFont(21),
    FONT_SIZE_20: scaleFont(20),
    FONT_SIZE_19: scaleFont(19),
    FONT_SIZE_18: scaleFont(18),
    FONT_SIZE_17: scaleFont(17),
    FONT_SIZE_16: scaleFont(16),
    FONT_SIZE_15: scaleFont(15),
    FONT_SIZE_14: scaleFont(14),
    FONT_SIZE_13: scaleFont(13),
    FONT_SIZE_12: scaleFont(12),
    FONT_SIZE_11: scaleFont(11),
    FONT_SIZE_10: scaleFont(10),
  },
};
