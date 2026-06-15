import { Colors } from "@/app-example/constants/theme";
import { Shadows } from "@/app/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ViewProps, View, ViewStyle } from "react-native";

type Props = ViewProps

export function Card({style, ...rest}: Props) {
    const colors = useThemeColors();
    return <View style={[style, styles, {backgroundColor: colors.grayWhite} ]} {...rest} />
}

const styles = {
    borderRadius: 8,
    overflow: "hidden",
    ...Shadows.dp2,
} satisfies ViewStyle;