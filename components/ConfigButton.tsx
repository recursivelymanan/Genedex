import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ConfigButtonProps {
  onPress: () => void;
}

const ConfigButton: React.FC<ConfigButtonProps> = ({ onPress }) => {
  return <AntDesign name="setting" size={40} color="black" onPress={onPress} />;
};

export default ConfigButton;
