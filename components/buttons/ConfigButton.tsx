import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface ConfigButtonProps {
  onPress: () => void;
}

const ConfigButton: React.FC<ConfigButtonProps> = ({ onPress }) => {
  return (
    <FontAwesome6
      name="screwdriver-wrench"
      size={40}
      color="black"
      onPress={onPress}
    />
  );
};

export default ConfigButton;
