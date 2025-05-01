import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface FavoritesButtonProps {
  onPress: () => void;
}

const FavoritesButton: React.FC<FavoritesButtonProps> = ({ onPress }) => {
  return <FontAwesome name="star" size={40} color="black" onPress={onPress} />;
};

export default FavoritesButton;
