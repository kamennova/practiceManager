import { ViewStyle } from "react-native";

export type ButtonProps = {
    children: string | JSX.Element,
    style?: ViewStyle,
    onPress?: () => void,
}
