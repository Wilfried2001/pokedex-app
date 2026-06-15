import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { SearchBar } from "@/components/SearchBar";
import { SortButton } from "@/components/SortButton";
import { ThemeText } from "@/components/ThemeText";
import { getPokemonId } from "@/functions/pokemon";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colors = useThemeColors();
  const { data, isLoading, fetchNextPage } =
    useInfiniteFetchQuery("/pokemon?limit=24");
  const pokemons = data?.pages.flatMap((page) => page.results.map(r => ({name:r.name, id: getPokemonId(r.url)}) )) ?? [];
  const [searchValue, setSearchValue] = useState("");
  const [sortKey, setSortKey] = useState<"id" | "name">("id");
  const filteredPokemons = [
    ...(searchValue
      ? pokemons.filter(
        (p) => 
          p.name.includes(searchValue.toLowerCase()) ||
         p.id.toString().toString() === searchValue
      )
      : pokemons
      ),
  ].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
  return (
    <RootView >
      <Row style={styles.header} gap={16}>
        <Image
          source={require("@/assets/images/pokeball.png")}
          width={24}
          height={24}
        />
        <ThemeText variant="headline" color="grayLight">
          Pokedex
        </ThemeText>
      </Row>
      <Row  gap={16} style={styles.form} >
        <SearchBar value={searchValue} onChange={setSearchValue} />
        <SortButton value={sortKey} onChange={setSortKey} />
      </Row>
      <Card style={styles.body}>
        <FlatList
          data={filteredPokemons}
          numColumns={3}
          contentContainerStyle={[styles.gridGap, styles.list]}
          columnWrapperStyle={styles.gridGap}
          ListEmptyComponent={
            isLoading ? <ActivityIndicator color={colors.tint} /> : null
          }
          onEndReached={searchValue ? undefined : () => fetchNextPage()}
          renderItem={({ item }) => (
            <PokemonCard
              id={item.id}
              name={item.name}
              style={{ flex: 1 / 3 }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
  
  header: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  body: {
    flex: 1,
    marginTop: 16,
  },
  gridGap: {
    gap: 12,
  },
  list: {
    padding: 20,
  },
  form: {
    paddingHorizontal: 12,
  }, 
});
