import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";

import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import ConfigureResultsScreen from "./screens/ConfigureResultsScreen";
import InfoScreen from "./screens/InfoScreen";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecentQueriesProvider } from "./context/RecentQueryContext";
import { ResultsConfigurationProvider } from "./context/ResultsConfigurationContext";

export type RootStackParamList = {
  Home: undefined;
  Results: { query: string };
  Config: undefined;
  Favorites: undefined;
  Info: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <RecentQueriesProvider>
          <ResultsConfigurationProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen name="Results" component={ResultsScreen} />
                <Stack.Screen
                  name="Config"
                  component={ConfigureResultsScreen}
                />
                <Stack.Screen name="Favorites" component={FavoritesScreen} />
                <Stack.Screen name="Info" component={InfoScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </ResultsConfigurationProvider>
        </RecentQueriesProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
