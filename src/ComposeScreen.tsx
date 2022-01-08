import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { Credential, save } from "./store";

type TextId = "target" | "accoutId" | "primaryPass" | "secondaryPass" | "memo";

export const ComposeScreen = () => {
  const [credential, setCredential] = useState<Credential>({
    target: "",
    accountId: "",
    primaryPass: "",
    secondaryPass: "",
    memo: "",
  });
  const navigation = useNavigation();

  const handleChangeText = (id: TextId, text: string) => {
    setCredential({ ...credential, [id]: text });
  };

  const handlePressSave = async () => {
    if (credential == null) {
      return;
    }

    await save(credential);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        style={{ marginBottom: 16 }}
        mode="outlined"
        placeholder="認証先を入力してください"
        multiline
        onChangeText={(text) => handleChangeText("target", text)}
      />
      <TextInput
        style={{ marginBottom: 16 }}
        mode="outlined"
        placeholder="アカウント名を入力してください"
        multiline
        onChangeText={(text) => handleChangeText("accountId", text)}
      />
      <TextInput
        style={{ marginBottom: 16 }}
        mode="outlined"
        placeholder="第一パスワードを入力してください"
        multiline
        onChangeText={(text) => handleChangeText("primaryPass", text)}
      />
      <TextInput
        style={{ marginBottom: 16 }}
        mode="outlined"
        placeholder="第二パスワードを入力してください"
        multiline
        onChangeText={(text) => handleChangeText("secondaryPass", text)}
      />
      <TextInput
        style={{ marginBottom: 16 }}
        mode="outlined"
        placeholder="メモを入力してください"
        multiline
        onChangeText={(text) => handleChangeText("memo", text)}
      />
      <Button mode="contained" onPress={handlePressSave}>
        保存
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
