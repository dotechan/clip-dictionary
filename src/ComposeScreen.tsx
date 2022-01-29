import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, Text } from "react-native";
import { useTheme, TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { useForm, Controller } from "react-hook-form";

import { ComposeScreenNavigationProp } from "./ReactNavigationTypes";
import { Credential, save } from "./store";

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
      {/* 認証先 */}
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="target"
      />
      {errors.target && <Text>認証先を入力してください。</Text>}
      {/* アカウントID */}
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="accountId"
      />
      {errors.target && <Text>アカウントIDを入力してください。</Text>}
      {/* パスワード */}
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="primaryPass"
      />
      {errors.target && <Text>パスワードを入力してください。</Text>}
      <Button mode="contained" onPress={handleSubmit(onSubmit, onError)}>
        保存
      </Button>
      <StatusBar backgroundColor={theme.colors.secondary} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
