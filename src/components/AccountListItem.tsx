import React from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title: string;
  accountId: string;
};

export const AccounListItem = (props: Props) => {
  const navigation = useNavigation();

  const { title, accountId } = props;
  const storeKey = `${title}-${accountId}`;

  const handleClickItem = () => {
    navigation.navigate("Detail", {
      storeKey: storeKey,
    });
  };

  return (
    <List.Item
      style={styles.container}
      title={title}
      titleStyle={styles.title}
      // TODO leftのアイコンはWebサイトの名称の頭文字を表示するアイコンに置き換える
      left={(props) => <List.Icon {...props} icon="account" />}
      onPress={handleClickItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 72,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
  },
});
