import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface BackToHomeButtonProps {
  onPress: () => void;
}

const BackToHomeButton: React.FC<BackToHomeButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <AntDesign name="back" size={40} color="black" />
    </TouchableOpacity>
  );
};

export default BackToHomeButton;

const styles = StyleSheet.create({
  button: {
    left: 20,
    zIndex: 10,
  },
});
