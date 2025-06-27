import {useQuery} from '@tanstack/react-query';
import {
  asyncGetAllProductsOnSearch,
  asyncGetBeefMeal,
  asyncGetBurger,
  asyncGetCategories,
  asyncGetChickenMeal,
  asyncGetChoc0late,
  asyncGetCountries,
  asyncGetDesert,
  asyncGetFishMeal,
  asyncGetLambMeal,
  asyncGetMealByCategory,
  asyncGetSaladMeal,
  asyncGetSoup,
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
  CHOCOLATE = 'CHOCOLATE',
  CATEGORIES = 'CATEGORIES',
  SOUP = 'SOUP',
  MEALS_BY_CATEGORY = 'MEALS_BY_CATEGORY',
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

export const useGetChocolateData = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHOCOLATE],
    queryFn: asyncGetChoc0late,
  });
};

export const useGetSoupData = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.SOUP],
    queryFn: asyncGetSoup,
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: asyncGetCategories,
  });
};

export const useGetMealByCategory = (category: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MEALS_BY_CATEGORY, category],
    queryFn: () => asyncGetMealByCategory(category),
    enabled: !!category && category !== 'All',
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
