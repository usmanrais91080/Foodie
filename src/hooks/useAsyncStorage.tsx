import { useCallback } from 'react';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

function useAsyncStorage<T>(key: string) {
  const storeLocalData = useCallback((value: T) => {
    try {
      const data = typeof value === 'string' ? value : JSON.stringify(value);
      storage.set(key, data); // ✅ Use the key correctly
    } catch (error) {
      console.error('Failed to save data:', error); // ✅ Correct error variable
    }
  }, [key]);

  return storeLocalData; // ✅ Return the function
}

export default useAsyncStorage;
