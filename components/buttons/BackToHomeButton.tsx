import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface BackToHomeButtonProps {
  onPress: () => void;
  size?: number;
}

const BackToHomeButton: React.FC<BackToHomeButtonProps> = ({
  onPress,
  size,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <AntDesign name="back" size={size ? size : 40} color="black" />
    </TouchableOpacity>
  );
};

export default BackToHomeButton;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    left: 16,
    top: 10,
  },
});
