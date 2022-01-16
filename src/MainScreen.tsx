import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { MainScreenNavigationProp } from "./ReactNavigationTypes";
import { loadAll, Credential } from "./store";
import { AccounListItem } from "./components/AccountListItem";

export const MainScreen = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const [credentials, setCredentials] = useState<Array<Credential>>([]);

  useEffect(() => {
    const initialize = async () => {
      const newCredentials = await loadAll();
      setCredentials(newCredentials);
    };

    const unsubscribe = navigation.addListener("focus", initialize);

    return unsubscribe;
  }, [navigation]);

  const handlePressAdd = () => {
    navigation.navigate("Compose");
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={credentials}
        keyExtractor={(item) => `${item.target}-${item.accountId}`}
        renderItem={({ item }) => (
          <AccounListItem title={item.target} accountId={item.accountId} />
        )}
      />
      <FAB
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
        }}
        icon="plus"
        onPress={handlePressAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
