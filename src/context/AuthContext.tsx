import { createContext } from "react";

type AuthContextType = {
  signIn: () => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>(undefined);
