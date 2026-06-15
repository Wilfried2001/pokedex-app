import { useThemeColors } from "@/hooks/useThemeColors";
import { useEffect } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Row } from "../Row";
import { ThemeText } from "../ThemeText";

type Props = ViewProps & {
  name: string;
  color: string;
  value: number;
};
function statShortName(name: string): string {
  return name
    .replace("special-", "S ")
    .replace("attack", "atk")
    .replace("-", "")
    .replace("defense", "def")
    .replace("speed", "spd")
    .replace("hp", "HP")
    .toUpperCase();
}

export function PokemonStat({ style, color, name, value, ...rest }: Props) {
  const colors = useThemeColors();
  const sharedValue = useSharedValue(0);
  const barInnerStyle = useAnimatedStyle(() => {
    return {
      flex: sharedValue.value,
    };
  });
  const barBackgroundStyle = useAnimatedStyle(() => {
    return {
      flex: 255 - sharedValue.value,
      //backgroundColor: colors.grayLight,
    };
  });

  useEffect(() => {
    sharedValue.value = withSpring(value);
  }, [value]);
  return (
    <Row gap={8} style={[style, styles.root]} {...rest}>
      <View style={[styles.name, { borderColor: colors.grayLight }]}>
        <ThemeText variant="subtitle3" style={{ color: color }}>
          {statShortName(name)}
        </ThemeText>
      </View>
      <View style={[styles.value, { borderColor: colors.grayLight }]}>
        <ThemeText>{value.toString().padStart(3, "0")}</ThemeText>
      </View>
      <Row style={styles.bar}>
        <Animated.View
          style={[styles.barInner, { backgroundColor: color }, barInnerStyle]}
        />
        <Animated.View
          style={[
            styles.barBackground,
            barBackgroundStyle,
            { backgroundColor: color },
          ]}
        />
      </Row>
    </Row>
  );
}
const styles = StyleSheet.create({
  root: {},
  name: {
    width: 40,
    paddingRight: 8,
    borderRightWidth: 1,
    borderStyle: "solid",
  },
  value: {
    width: 23,
  },
  bar: {
    flex: 1,
    borderRadius: 20,
    height: 4,
    overflow: "hidden",
  },
  barInner: {
    height: 4,
  },
  barBackground: {
    height: 4,
    opacity: 0.24,
  },
});
