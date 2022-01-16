import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";

type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Compose: undefined;
  Detail: { storeKey: string };
};
export const Stack = createStackNavigator<RootStackParamList>();

// 認証画面のProps
type AuthScreenProps = StackScreenProps<RootStackParamList, "Auth">;
export type AuthScreenNavigationProp = AuthScreenProps["navigation"];
export type AuthScreenRouteProp = AuthScreenProps["route"];

// メイン画面のProps
type MainScreenProps = StackScreenProps<RootStackParamList, "Main">;
export type MainScreenNavigationProp = MainScreenProps["navigation"];
export type MainScreenRouteProp = MainScreenProps["route"];

// 新規作成画面のProps
type ComposeScreenProp = StackScreenProps<RootStackParamList, "Compose">;
export type ComposeScreenNavigationProp = ComposeScreenProp["navigation"];
export type ComposeScreenRouteProp = ComposeScreenProp["route"];

// 詳細画面のProps
type DetailScreenProps = StackScreenProps<RootStackParamList, "Detail">;
export type DetailScreenNavigationProp = DetailScreenProps["navigation"];
export type DetailScreenRouteProp = DetailScreenProps["route"];
