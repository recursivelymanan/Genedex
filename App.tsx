import React from "react";
import { StatusBar } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecentQueriesProvider } from "./context/RecentQueryContext";

export type RootStackParamList = {
  Home: undefined;
  Results: { query: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RecentQueriesProvider>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Results" component={ResultsScreen} />
          </Stack.Navigator>
        </RecentQueriesProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
