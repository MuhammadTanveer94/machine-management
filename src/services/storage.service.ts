import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageService = {
  set,
  get,
  clear,
  remove,
  setObject,
};
async function set(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

async function setObject(key: string, value: object) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
}

async function get(key: string) {
  return await AsyncStorage.getItem(key);
}

async function clear() {
  return await AsyncStorage.clear();
}

async function remove(key: string) {
  return await AsyncStorage.removeItem(key);
}
