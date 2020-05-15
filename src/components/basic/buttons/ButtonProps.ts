import { TextStyle, ViewStyle } from "react-native";

export type ButtonProps = {
    label?: string,
    style?: ViewStyle,
    textStyle?: TextStyle,
    onPress?: () => void,
    icon?: JSX.Element,
}
