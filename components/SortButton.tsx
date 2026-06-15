import { Card } from "@/components/Card";
import { Row } from "@/components/Row";
import { ThemeText } from "@/components/ThemeText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useRef, useState } from "react";

import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Radio } from "./Radio";
import { Shadows } from "@/app/constants/Shadows";

type Props = {
  value: "id" | "name";
  onChange: (value: "id" | "name") => void;
};
const options = [
  { label: "Number", value: "id" },
  { label: "Name", value: "name" },
] as const;

export function SortButton({ value, onChange }: Props) {
  const buttonRef = useRef<View>(null);
  const colors = useThemeColors();
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState<null | {
    top: number;
    right: number;
  }>(null);
  const onButtonPress = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({
        top: y + height,
        right: Dimensions.get("window").width - x - width,
      });
      setModalVisible(true);
    });
  };
  const onClose = () => {
    setModalVisible(false);
    // onChange(value === "id" ? "name" : "id");
  };
  return (
    <>
      <Pressable onPress={onButtonPress}>
        <View
          ref={buttonRef}
          style={[styles.button, { backgroundColor: colors.grayWhite }]}
        >
          <Image
            source={
              value === "id"
                ? require("@/assets/images/number.png")
                : require("@/assets/images/alpha.png")
            }
            width={16}
            height={16}
          />
        </View>
      </Pressable>
      <Modal animationType="fade" visible={modalVisible} transparent onRequestClose={onClose}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={[styles.popup, { backgroundColor: colors.tint, ...position }]}>
          <ThemeText style={styles.title} variant="subtitle2" color="grayWhite">
            Sort by :
          </ThemeText>
          <Card style={styles.card}>
            {options.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => onChange(option.value)}
              >
                <Row key={option.value} gap={8}>
                  <Radio checked={value === option.value} />
                  <ThemeText>{option.label}</ThemeText>
                </Row>
              </Pressable>
            ))}
          </Card>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 32,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  popup: {
    position: "absolute",
    width: 114,
    padding: 4,
    paddingTop: 16,
    gap: 16,
    borderRadius: 12,
    ...Shadows.dp2
  },
  title: {
    paddingLeft: 20,
  },
  card: {
    padding: 8,
  },
});
