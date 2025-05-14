import { useNavigation } from "@react-navigation/native";
import React, { createContext, useContext, useState } from "react";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { QueryResult } from "../types/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface QuerySearchContextType {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  queryResult: QueryResult;
  setQueryResult: React.Dispatch<React.SetStateAction<QueryResult>>;
  handleSearch: (searchQuery?: string) => void;
}

const QuerySearchContext = createContext<QuerySearchContextType | undefined>(
  undefined
);

export const useQuerySearchContext = () => {
  const context = useContext(QuerySearchContext);
  if (!context) {
    throw new Error(
      "useQuerySearchContext must be used within QuerySearchProvider"
    );
  }
  return context;
};

export const QuerySearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState<string>("");
  const [queryResult, setQueryResult] = useState<QueryResult>({
    symbol: "",
    mirna: false,
  });
  const navigation = useNavigation<NavigationProp>();

  /**
   * Upon search, navigate to ResultsScreen and provide the query.
   * @param searchQuery Optional parameter, when it is passed, pass this value
   *                    to ResultsScreen instead of the query state.
   * @returns
   */
  const handleSearch = (searchQuery?: string) => {
    if (searchQuery) setQuery(searchQuery);
    navigation.navigate("Results", {
      query: searchQuery ? searchQuery : query,
    });
  };
  return (
    <QuerySearchContext.Provider
      value={{ query, setQuery, queryResult, setQueryResult, handleSearch }}
    >
      {children}
    </QuerySearchContext.Provider>
  );
};
