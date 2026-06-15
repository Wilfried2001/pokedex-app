import { Card } from "@/components/Card";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { PokemonStat } from "@/components/pokemon/PokemonStat";
import { PokemonType } from "@/components/pokemon/PokemonType";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemeText } from "@/components/ThemeText";
import {
  formatHeight,
  formatWeight,
  getPokemonArtwork,
} from "@/functions/pokemon";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Audio } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

export default function Pokemon() {
  const colors = useThemeColors();
  const params = useLocalSearchParams() as { id: string };
  const { data: pokemon } = useFetchQuery("/pokemon/:id", { id: params.id });
  const id = parseInt(params.id, 10);
  const { data: species } = useFetchQuery("/pokemon-species/:id", {
    id: params.id,
  });
  const mainType = pokemon?.types[0].type.name;
  const colorType = mainType ? Colors.type[mainType] : colors.tint;
  const types = pokemon?.types ?? [];
  const bio = species?.flavor_text_entries
    ?.find(({ language }) => language.name === "en")
    ?.flavor_text.replaceAll("\n", " ");
  const onImagePress = async () => {
    const cry = pokemon?.cries.latest_deprecated;
    if (!cry) {
      return;
    }
    try {
      const { sound } = await Audio.Sound.createAsync(
        {
          uri: cry,
        },
        { shouldPlay: true },
      );
      await sound.playAsync();
    } catch (error) {
      console.error("Erreur lors de la lecture du cri :", error);
    }
  };
  const onPrevious = () => {
    router.replace({
      pathname: "/pokemon/[id]",
      params: { id: Math.max(id - 1, 1) },
    });
  };
  const onNext = () => {
    router.replace({
      pathname: "/pokemon/[id]",
      params: { id: Math.min(id + 1, 151) },
    });
  };
  return (
    <RootView backgroundColor={colorType}>
      <View>
        <Image
          style={styles.pokeball}
          source={require("@/assets/images/Pokeball_big.png")}
          width={208}
          height={208}
        />
        <Row style={styles.header}>
          <Pressable onPress={router.back}>
            <Row gap={8}>
              <Image
                source={require("@/assets/images/back.png")}
                style={{ width: 24, height: 24 }}
              />
              <ThemeText
                style={{ textTransform: "capitalize" }}
                color="grayWhite"
                variant="headline"
              >
                {pokemon?.name}
              </ThemeText>
            </Row>
          </Pressable>
          <ThemeText color="grayWhite" variant="subtitle2">
            #{params.id.padStart(3, "0")}
          </ThemeText>
        </Row>

        <View style={styles.body}>
          <Row style={styles.imageRow}>
            {id===1 ? (
              <View></View>
            ) : (
              <Pressable onPress={onPrevious}>
              <Image
                source={require("@/assets/images/prev.png")}
                style={{ width: 24, height: 24 }}
              />
            </Pressable>
            )}
            <Pressable onPress={onImagePress}>
              <Image
                style={styles.artwork}
                source={{
                  uri: getPokemonArtwork(params.id),
                }}
                width={200}
                height={200}
              />
            </Pressable>
            <Pressable onPress={onNext}>
              <Image
                source={require("@/assets/images/next.png")}
                style={{ width: 24, height: 24 }}
              />
            </Pressable>
          </Row>
          <Card style={styles.card}>
            <Row gap={16} style={{ height: 20 }}>
              {types.map((type) => (
                <PokemonType key={type.type.name} name={type.type.name} />
              ))}
            </Row>
            {/* About */}
            <ThemeText variant="subtitle1" style={{ color: colorType }}>
              About
            </ThemeText>
            <Row>
              <PokemonSpec
                style={{
                  borderStyle: "solid",
                  borderColor: colors.grayLight,
                  borderRightWidth: 1,
                }}
                title={formatWeight(pokemon?.weight)}
                description="weight"
                image={require("@/assets/images/weight.png")}
              />
              <PokemonSpec
                style={{
                  borderStyle: "solid",
                  borderColor: colors.grayLight,
                  borderRightWidth: 1,
                }}
                title={formatHeight(pokemon?.height)}
                description="height"
                image={require("@/assets/images/straighten.png")}
              />
              <PokemonSpec
                title={pokemon?.moves
                  .slice(0, 2)
                  .map((move) => move.move.name)
                  .join(", \n  ")}
                description="moves"
              />
            </Row>
            <ThemeText style={{ textAlign: "center", width: "100%" }}>
              {bio}
            </ThemeText>
            {/* Stats */}
            <ThemeText variant="subtitle1" style={{ color: colorType }}>
              Base Stats
            </ThemeText>
            <View style={{ alignSelf: "stretch" }}>
              {pokemon?.stats.map((stat) => (
                <PokemonStat
                  key={stat.stat.name}
                  name={stat.stat.name}
                  value={stat.base_stat}
                  color={colorType}
                />
              ))}
            </View>
          </Card>
        </View>
      </View>
    </RootView>
  );
}
const styles = StyleSheet.create({
  header: {
    margin: 20,
    justifyContent: "space-between",
  },
  pokeball: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  imageRow: {
    position: "absolute",
    top: -140,
    zIndex: 2,
    justifyContent: "space-between",
    left: 0,
    right: 8,
    paddingHorizontal: 20,
  },
  artwork: {
    alignSelf: "center",
  },
  body: {
    marginTop: 144,
  },
  card: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    gap: 16,
    alignItems: "center",
  },
});
