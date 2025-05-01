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
    handleFavoriteTrigger();
  }, [fill]);

  const onPress = () => {
    setFill(!fill);
  };

  function handleFavoriteTrigger() {
    if (favorites.includes(query)) {
      fill
        ? null
        : setFavorites((prev) => prev.filter((item) => item !== safeQuery));
    } else {
      fill ? setFavorites((prev) => [...prev, safeQuery]) : null;
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      {fill ? (
        <FontAwesome name="star" size={40} color="yellow" />
      ) : (
        <FontAwesome name="star-o" size={40} color="black" />
      )}
    </TouchableOpacity>
  );
};

export default FavoriteIndicatorButton;
