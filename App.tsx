import React, { useEffect, useReducer, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { AuthContext } from "./src/context/AuthContext";
import { LocalAuthScreen } from "./src/LocalAuthScreen";
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
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.userToken == null ? (
              <Stack.Screen
                name="Auth"
                component={LocalAuthScreen}
                options={{
                  title: "認証",
                }}
              />
            ) : (
              <>
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
                  options={{
                    title: "詳細",
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
}
