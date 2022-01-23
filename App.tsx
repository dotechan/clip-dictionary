import React, { useEffect, useReducer, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { Stack } from "./src/ReactNavigationTypes";
import { AuthContext } from "./src/context/AuthContext";
import { LocalAuthScreen } from "./src/LocalAuthScreen";
import { MainScreen } from "./src/MainScreen";
import { ComposeScreen } from "./src/ComposeScreen";
import { DetailScreen } from "./src/DetailScreen";

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      secondary: string;
    }
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#bfa441",
    secondary: "#9c7e37",
    accent: "#415cbf",
  },
};

type Action = {
  type: "RESTORE_TOKEN" | "SIGN_IN" | "SIGN_OUT";
  token?: string;
};

type Auth = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | undefined;
};

const initialState: Auth = {
  isLoading: true,
  isSignout: false,
  userToken: undefined,
};

export default function App() {
  const [state, dispatch] = useReducer((prevState: Auth, action: Action) => {
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
          userToken: undefined,
        };
    }
  }, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async () => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Auth"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: "#000",
            }}
          >
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
