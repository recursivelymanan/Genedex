import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MAX_RECENT_QUERIES = 6;
const STORAGE_KEY = "recentQueries";

interface RecentQueriesContextType {
  recentQueries: string[];
  addRecentQuery: (query: string) => void;
  setRecentQueries: React.Dispatch<React.SetStateAction<string[]>>;
}

const RecentQueriesContext = createContext<
  RecentQueriesContextType | undefined
>(undefined);

export const useRecentQueries = () => {
  const context = useContext(RecentQueriesContext);
  if (!context)
    throw new Error(
      "useRecentQueries must be used within RecentQueriesProvider"
    );
  return context;
};

export const RecentQueriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /*----
  States
  ----*/

  const [recentQueries, setRecentQueries] = useState<string[]>([]);

  /*-----
  Effects
  -----*/

  useEffect(() => {
    const loadRecents = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setRecentQueries(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load stored recent queries", error);
      }
    };
    loadRecents();
  }, []);

  useEffect(() => {
    const saveRecents = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recentQueries));
      } catch (error) {
        console.log("Failed to save recent queries", error);
      }
    };
    saveRecents();
  }, [recentQueries]);

  /*-------
  Functions
  -------*/

  const addRecentQuery = (query: string) => {
    const safeQuery = query.toUpperCase();
    let arr = [...recentQueries];
    const index: number = arr.indexOf(safeQuery);
    index !== -1 ? arr.splice(index, 1) : null;
    arr.length === MAX_RECENT_QUERIES ? arr.pop() : null;
    arr.unshift(safeQuery);
    setRecentQueries(arr);
  };

  return (
    <RecentQueriesContext.Provider
      value={{ recentQueries, addRecentQuery, setRecentQueries }}
    >
      {children}
    </RecentQueriesContext.Provider>
  );
};
