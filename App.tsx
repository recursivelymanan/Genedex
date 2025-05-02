import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";

import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import ConfigureResultsScreen from "./screens/ConfigureResultsScreen";
import InfoScreen from "./screens/InfoScreen";
import DisplayMoreDataScreen from "./screens/DisplayMoreDataScreen";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecentQueriesProvider } from "./context/RecentQueryContext";
import { ResultsConfigurationProvider } from "./context/ResultsConfigurationContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { goResult, QueryResult } from "./types/types";

export type RootStackParamList = {
  Home: undefined;
  Results: { query: string };
  Config: undefined;
  Favorites: { handleSearch: (query: string) => void };
  Info: undefined;
  MoreData: {
    data: "rsG" | "rsR" | "rsP" | "goBP" | "goCC" | "goMF";
    refseqIDs?: string[];
    goResults?: goResult[];
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <RecentQueriesProvider>
          <ResultsConfigurationProvider>
            <FavoritesProvider>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Results"
                    component={ResultsScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Config"
                    component={ConfigureResultsScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Info"
                    component={InfoScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="MoreData"
                    component={DisplayMoreDataScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </FavoritesProvider>
          </ResultsConfigurationProvider>
        </RecentQueriesProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
