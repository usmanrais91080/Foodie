import {useQuery} from '@tanstack/react-query';
import {
  asyncGetAllProductsOnSearch,
  asyncGetBeefMeal,
  asyncGetBurger,
  asyncGetChickenMeal,
  asyncGetCountries,
  asyncGetDesert,
  asyncGetFishMeal,
  asyncGetLambMeal,
  asyncGetSaladMeal,
} from '../fetcher';

export enum QUERY_KEYS {
  HOME_PRODUCTS = 'HOME_PRODUCTS',
  BURGER = 'BURGER',
  SALAD = 'SALAD',
  LAMB = 'LAMB',
  CHICKEN = 'CHICKEN',
  BEEF = 'BEEF',
  DESERT = 'DESERT',
  FISH = 'FISH',
  SEARCH_PRODUCTS = 'SEARCH_PRODUCTS',
  COUNTRY = 'COUNTRY',
}

export const useGetBurger = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.BURGER],
    queryFn: asyncGetBurger,
  });
};

export const useGetSalad = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.SALAD],
    queryFn: asyncGetSaladMeal,
  });
};

export const useGetLambData = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.LAMB],
    queryFn: asyncGetLambMeal,
  });
};
export const useGetChickenData = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHICKEN],
    queryFn: asyncGetChickenMeal,
  });
};
export const useGetBeefData = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.BEEF],
    queryFn: asyncGetBeefMeal,
  });
};
export const useGetDesertData = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.DESERT],
    queryFn: asyncGetDesert,
  });
};
export const useGetFishData = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FISH],
    queryFn: asyncGetFishMeal,
  });
};

export const useGetAllProducts = (search: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_PRODUCTS],
    queryFn: () => asyncGetAllProductsOnSearch(search),
    enabled: !!search,
  });
};

export const useGetCountries = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.COUNTRY],
    queryFn: asyncGetCountries,
  });
};
