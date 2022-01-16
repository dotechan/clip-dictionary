import React from "react";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import { AuthContext } from "./context/AuthContext";

export const LocalAuthScreen = () => {
  const navigation = useNavigation();
  const { signIn } = React.useContext(AuthContext);

  const authenticate = async () => {
    const authResult = await LocalAuthentication.authenticateAsync();
    // TypeScriptの推論を効かせるためにfalseと厳密等価で比較している
    if (authResult.success === false) {
      alert(`Authentication failed: ${authResult.error}`);
      return;
    }

    signIn();
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", authenticate);

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        icon="fingerprint"
        onPress={authenticate}
        accessibilityLabel="Authenticate Button"
      >
        Authenticate
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
