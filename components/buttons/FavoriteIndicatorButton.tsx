import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFavoritesContext } from "../../context/FavoritesContext";

interface FavoriteIndicatorButtonProps {
  query: string;
}

const FavoriteIndicatorButton: React.FC<FavoriteIndicatorButtonProps> = ({
  query,
}) => {
  const safeQuery = query.toUpperCase();
  const { favorites, setFavorites } = useFavoritesContext();
  const [fill, setFill] = useState<boolean>(favorites.includes(safeQuery));

  useEffect(() => {
    fill
      ? setFavorites((prev) => [...prev, safeQuery])
      : setFavorites((prev) => prev.filter((item) => item !== safeQuery));
  }, [fill]);

  const onPress = () => {
    setFill(!fill);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      {fill ? (
        <FontAwesome name="star" size={40} color="black" />
      ) : (
        <FontAwesome name="star-o" size={40} color="yellow" />
      )}
    </TouchableOpacity>
  );
};

export default FavoriteIndicatorButton;
