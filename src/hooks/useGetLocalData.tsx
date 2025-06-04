import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export function getLocalData<T = any>(key: string): T | null {
  try {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Failed to get local data:', error);
    return null;
  }
}
