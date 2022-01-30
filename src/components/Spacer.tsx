import React from "react";
import { View, StyleSheet } from "react-native";

export const Spacer: React.VFC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: 8,
  },
});
