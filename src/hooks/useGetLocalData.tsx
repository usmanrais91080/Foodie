import { useCallback } from 'react';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

function useGetLocalData<T = any>(key: string) {
  return useCallback((): T | null => {
    try {
      const value = storage.getString(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Failed to get data:', error);
      return null;
    }
  }, [key]);
}

export default useGetLocalData;
