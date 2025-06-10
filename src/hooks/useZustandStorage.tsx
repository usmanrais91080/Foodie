// utils/zustandMMKVStorage.ts
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const zustandStorage = {
  setItem: (key: string, value: string) => {
    // ✅ Ensure you're passing a stringified version of any object
    storage.set(key, JSON.stringify(value));
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return value; // fallback if not JSON
    }
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};
