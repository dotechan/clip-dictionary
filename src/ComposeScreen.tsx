import React from "react";
import { StyleSheet, KeyboardAvoidingView, View, Text } from "react-native";
import { useTheme, TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { useForm, Controller } from "react-hook-form";

import { ComposeScreenNavigationProp } from "./ReactNavigationTypes";
import { Credential, save } from "./store";
import { Spacer } from "./components/Spacer";

export const ComposeScreen: React.VFC = () => {
  const theme = useTheme();
  const navigation = useNavigation<ComposeScreenNavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Credential>({
    defaultValues: {
      target: "",
      accountId: "",
      primaryPass: "",
    },
  });

  const onSubmit = async (credential: Credential) => {
    await save(credential);
    navigation.goBack();
  };

  const onError = () => alert("入力内容に誤りがあります。");

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.form}>
        {/* 認証先 */}
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              mode="outlined"
              label="認証先"
              placeholder="認証先"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="target"
        />
        {errors.target && <Text>認証先を入力してください。</Text>}
        <Spacer />
        {/* アカウントID */}
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              mode="outlined"
              label="アカウントID"
              placeholder="アカウントID"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="accountId"
        />
        {errors.target && <Text>アカウントIDを入力してください。</Text>}
        <Spacer />
        {/* パスワード */}
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              mode="outlined"
              label="パスワード"
              placeholder="パスワード"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="primaryPass"
        />
        {errors.target && <Text>パスワードを入力してください。</Text>}
        <Spacer />
        <Button
          style={styles.saveButton}
          mode="contained"
          onPress={handleSubmit(onSubmit, onError)}
        >
          保存
        </Button>
      </View>
      <StatusBar backgroundColor={theme.colors.secondary} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    padding: 16,
  },
  form: {
    display: "flex",
  },
  input: {
    width: "100%",
  },
  saveButton: {
    justifyContent: "flex-end",
  },
});
