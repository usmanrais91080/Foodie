import {useQuery} from '@tanstack/react-query';
import {
  asyncGetAllProductsOnSearch,
  asyncGetBurger,
  asyncGetCountries,
  asyncGetLambMeal,
  asyncGetSaladMeal,
} from '../fetcher';

export enum QUERY_KEYS {
  HOME_PRODUCTS = 'HOME_PRODUCTS',
  BURGER = 'BURGER',
  SALAD = 'SALAD',
  LAMB = 'LAMB',
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
