import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "favorites";

interface FavoritesContextType {
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error(
      "useFavoritesContext must be used within FavoritesProvider"
    );
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /*----
  States
  ----*/

  const [favorites, setFavorites] = useState<string[]>([]);

  /*-----
  Effects
  -----*/

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load stored favorites", error);
      }
    };
    loadConfig();
  }, []);

  useEffect(() => {
    const saveConfig = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.log("Failed to save favorites", error);
      }
    };
    saveConfig();
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
