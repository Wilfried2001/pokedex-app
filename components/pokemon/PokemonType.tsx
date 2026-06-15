import { Colors } from "@/app/constants/Colors";
import { View, ViewStyle } from "react-native";
import { ThemeText } from "../ThemeText";

type Props = {
    name: keyof (typeof Colors)["type"];
}

export function PokemonType({name}: Props) {
    return <View style={[rootStyle, { backgroundColor: Colors.type[name] }]} >
        <ThemeText style={{textTransform: "capitalize"}}  color="grayWhite" variant="subtitle3" > {name} </ThemeText>
    </View>
}
const rootStyle = {
    flex: 0,
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 8,

} satisfies ViewStyle;