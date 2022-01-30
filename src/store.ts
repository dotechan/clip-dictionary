import AsyncStorage from "@react-native-async-storage/async-storage";

export type Credential = {
  target: string;
  accountId: string;
  primaryPass: string;
};

export const save = async (credential: Credential) => {
  const { target, accountId } = credential;
  const key = `${target}-${accountId}`;
  const value = JSON.stringify(credential);

  await AsyncStorage.setItem(key, value);
};

export const loadAll = async () => {
  const keys = await AsyncStorage.getAllKeys();
  keys.sort();
  const entryList = await AsyncStorage.multiGet(keys);

  return entryList.map((entry) => JSON.parse(entry[1]!!));
};

export const loadByKey = async (key: string) => {
  const value = await AsyncStorage.getItem(key);

  return JSON.parse(value!!);
};

export const clearByKey = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};
