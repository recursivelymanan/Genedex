import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
  button: React.ReactElement;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({ button, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {button}
    </TouchableOpacity>
  );
};

export default Button;
