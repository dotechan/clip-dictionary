import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { MainScreen } from "./src/MainScreen";
import { ComposeScreen } from "./src/ComposeScreen";
import { DetailScreen } from "./src/DetailScreen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{
              title: "Webサイト名",
            }}
          />
          <Stack.Screen
            name="Compose"
            component={ComposeScreen}
            options={{ title: "登録" }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{ title: "詳細" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
