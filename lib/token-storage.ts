import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const KEY = "authToken";

const hasLocalStorage = () =>
  Platform.OS === "web" && typeof localStorage !== "undefined";

export async function saveToken(token: string) {
  if (Platform.OS === "web") {
    if (hasLocalStorage()) localStorage.setItem(KEY, token);
    return;
  }
  await SecureStore.setItemAsync(KEY, token);
}

export async function getToken(): Promise<string | null> {
  if (Platform.OS === "web") {
    return hasLocalStorage() ? localStorage.getItem(KEY) : null;
  }
  return SecureStore.getItemAsync(KEY);
}

export async function removeToken() {
  if (Platform.OS === "web") {
    if (hasLocalStorage()) localStorage.removeItem(KEY);
    return;
  }
  await SecureStore.deleteItemAsync(KEY);
}
