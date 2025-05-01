import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { TouchableOpacity } from "react-native";

interface ConfigButtonProps {
  onPress: () => void;
}

const ConfigButton: React.FC<ConfigButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome6 name="screwdriver-wrench" size={40} color="black" />
    </TouchableOpacity>
  );
};

export default ConfigButton;
