import {useCallback} from 'react';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

function useRemoveLocalStorage(key: string) {
  return useCallback(() => {
    try {
      storage.delete(key);
    } catch (error) {
      console.log('Error to remove data:', error);
    }
  }, [key]);
}
export default useRemoveLocalStorage;
