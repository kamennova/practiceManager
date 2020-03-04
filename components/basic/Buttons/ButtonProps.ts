import { TextStyle, ViewStyle } from "react-native";

export type ButtonProps = {
    children: string | JSX.Element,
    style?: ViewStyle,
    textStyle?: TextStyle,
    onPress?: () => void,
}
