import React from "react";
import { TouchableOpacity } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

interface FavoritesButtonProps {
  onPress: () => void;
}

const FavoritesButton: React.FC<FavoritesButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome name="star" size={40} color="black" />
    </TouchableOpacity>
  );
};

export default FavoritesButton;
