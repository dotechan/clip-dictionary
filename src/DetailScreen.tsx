import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { List, IconButton, Snackbar } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";

import { Credential, loadByKey } from "./store";
import { MaskedText } from "./components/MaskedText";

type Props = {
  key: string;
};

export const DetailScreen = () => {
  const route = useRoute();
  const { storeKey } = route.params;
  const [credential, setCredential] = useState<Credential>();
  const [isMasked, setIsMasked] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const credential = await loadByKey(storeKey);
      setCredential(credential);
    };
    initialize();
  }, [storeKey]);

  // コピー成功時のスナックバー
  const [isVisibleSuccessSnackBar, setIsVisibleSuccessSnackBar] =
    useState(false);
  const handleOpenSuccessSnackBar = () => setIsVisibleSuccessSnackBar(true);
  const handleDismissSuccessSnackBar = () => setIsVisibleSuccessSnackBar(false);

  // コピー失敗時のスナックバー
  const [isVisibleFailedSnackBar, setIsVisibleFailedSnackBar] = useState(false);
  const handleOpenFailedSnackBar = () => setIsVisibleFailedSnackBar(true);
  const handleDismissFailedSnackBar = () => setIsVisibleFailedSnackBar(false);

  const handleClickUnmaskPassword = () => {
    setIsMasked(false);
  };

  const handleClickCopyID = () => {
    if (!credential?.accountId) {
      handleOpenFailedSnackBar();
      return;
    }

    const id = credential.accountId;
    Clipboard.setString(id);
    handleOpenSuccessSnackBar();
  };

  const handleClickCopyPassword = () => {
    if (!credential?.primaryPass) {
      handleOpenFailedSnackBar();
      return;
    }

    const password = credential?.primaryPass;
    Clipboard.setString(password);
    handleOpenSuccessSnackBar();
  };

  return (
    <View style={styles.container}>
      {/* Webサイト名 */}
      <View style={styles.subTitleBlock}>
        <Text style={styles.subTitle}>Webサイト名</Text>
      </View>
      {/* ID */}
      <View style={styles.item}>
        <View style={styles.mainIconArea}>
          <List.Icon icon="account" />
        </View>
        <View style={styles.textArea}>
          <Text style={styles.itemTitle}>ID</Text>
          <Text style={styles.itemDescription}>{credential?.accountId}</Text>
        </View>
        <View style={styles.operationIconArea}>
          <IconButton icon="content-copy" onPress={handleClickCopyID} />
        </View>
      </View>
      {/* Password */}
      <View style={styles.item}>
        <View style={styles.mainIconArea}>
          <List.Icon icon="key" />
        </View>
        <View style={styles.textArea}>
          <Text style={styles.itemTitle}>Password</Text>
          <MaskedText style={styles.itemDescription} isMasked={isMasked}>
            {credential?.primaryPass}
          </MaskedText>
        </View>
        <View style={styles.operationIconArea}>
          <IconButton icon="eye-outline" onPress={handleClickUnmaskPassword} />
          <IconButton icon="content-copy" onPress={handleClickCopyPassword} />
        </View>
      </View>

      <Snackbar
        visible={isVisibleSuccessSnackBar}
        onDismiss={handleDismissSuccessSnackBar}
        duration={2000}
        style={styles.snackBar}
      >
        Success
      </Snackbar>
      <Snackbar
        visible={isVisibleFailedSnackBar}
        onDismiss={handleDismissFailedSnackBar}
        duration={2000}
        style={styles.snackBar}
      >
        Failed
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    paddingHorizontal: 10,
  },
  subTitleBlock: {
    height: 72,
    left: 20,
    justifyContent: "center",
  },
  subTitle: {
    fontSize: 24,
  },
  item: {
    height: 72,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  mainIconArea: {
    marginHorizontal: 20,
  },
  textArea: {
    display: "flex",
  },
  itemTitle: {
    fontSize: 16,
  },
  itemDescription: {
    fontSize: 16,
  },
  operationIconArea: {
    marginLeft: "auto",
    display: "flex",
    flexDirection: "row",
    marginRight: 20,
  },
  snackBar: {
    bottom: 30,
  },
});
