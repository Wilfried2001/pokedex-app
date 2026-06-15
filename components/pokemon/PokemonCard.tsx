import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, View, type ViewStyle } from "react-native";
import { Card } from "../Card";
import { ThemeText } from "../ThemeText";
import { getPokemonArtwork } from "@/functions/pokemon";

type Props = {
  style?: ViewStyle;
  id: number;
  name: string;
};

export function PokemonCard({ style, id, name }: Props) {
  const colors = useThemeColors();
  return (
    <Link
      href={{ pathname: "/pokemon/[id]", params: { id: id.toString() } }}
      asChild
    >
      <Pressable style={style}>
        <Card style={[styles.card]}>
          <ThemeText style={styles.id} variant="caption" color="grayMedium">
            #{id.toString().padStart(3, "0")}
          </ThemeText>
          <Image
            source={{
              uri:getPokemonArtwork(id),
            }}
            width={72}
            height={72}
          />
          <ThemeText>{name}</ThemeText>
          <View
            style={[styles.shadow, { backgroundColor: colors.grayBackground }]}
          />
        </Card>
      </Pressable>
    </Link>
  );
}
const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    padding: 4,
  },
  id: {
    alignSelf: "flex-end",
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 8,
    zIndex: -1,
  },
});
