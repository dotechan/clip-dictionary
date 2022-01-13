import { useEffect, useContext } from "react";
import * as LocalAuthentication from "expo-local-authentication";

import { AuthContext } from "./context/AuthContext";

export const LocalAuthScreen = () => {
  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    const authenticate = async () => {
      const authResult = await LocalAuthentication.authenticateAsync();
      if (authResult.success) {
        signIn();
      } else {
        alert("Authentication failed");
      }
    };
    authenticate();
  }, []);

  return null;
};
