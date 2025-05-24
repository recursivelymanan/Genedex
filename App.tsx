import React, { useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { enableScreens } from "react-native-screens";
import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  EncodeSans_800ExtraBold,
} from "@expo-google-fonts/encode-sans";

import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import ConfigureResultsScreen from "./screens/ConfigureResultsScreen";
import InfoScreen from "./screens/InfoScreen";
import DisplayMoreDataScreen from "./screens/DisplayMoreDataScreen";

import { goResult } from "./types/types";
import AppContextProviders from "./context/AppContextProviders";

export type RootStackParamList = {
  Home: undefined;
  Results: { query: string };
  Config: undefined;
  Favorites: undefined;
  Info: undefined;
  MoreData: {
    refseqIDs?: string[];
    goResults?: goResult[];
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
SplashScreen.preventAutoHideAsync();

enableScreens();

const App = () => {
  const [fontsLoaded] = useFonts({
    EncodeSans_800ExtraBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <AppContextProviders>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />
            <Stack.Screen name="Config" component={ConfigureResultsScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="Info" component={InfoScreen} />
            <Stack.Screen name="MoreData" component={DisplayMoreDataScreen} />
          </Stack.Navigator>
        </AppContextProviders>
      </View>
    </NavigationContainer>
  );
};

export default App;
