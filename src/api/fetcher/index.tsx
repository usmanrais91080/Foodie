import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';
const COUNTRY_API_URL = 'https://countriesnow.space/api/v0.1';

export const asyncGetBurger = async () => {
  try {
    const responce = await axios.get(`${BASE_URL}/search.php?s=burger`);
    // adding static price for burgers based on category
    const burgerWithPrice = responce.data?.meals?.map((meal: any) => {
      let price;
      if (meal.strCategory === 'Chicken') {
        price = 30.0;
      } else if (meal.strCategory === 'Lamb') {
        price = 9.99;
      } else {
        price = Math.floor(Math.random() * 50) + 1;
      }
      return {
        ...meal,
        price,
      };
    });
    return burgerWithPrice || [];
  } catch (error) {
    console.log('Error fetching burger', error);
  }
};

export const asyncGetSaladMeal = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=salad`);
    // adding static price for salad
    const saladPrice = response.data?.meals?.map((meal: any) => {
      let price;
      if (meal.strCategory === 'Seafood') {
        price = 10.99;
      } else if (meal.strCategory === 'Chicken') {
        price = 24.0;
      } else if (meal.strCategory === 'Vegetarian') {
        price = 13.99;
      } else {
        price = Math.floor(Math.random() * 20) + 1;
      }
      return {...meal, price};
    });
    return saladPrice || [];
  } catch (error) {
    console.log('Error fetching salad', error);
  }
};

export const asyncGetLambMeal = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=lamb`);
    // adding static price
    const lambPrice = response.data?.meals?.map((meal: any) => {
      let price;
      if (meal.strArea === 'Russian') {
        price = 33.99;
      } else if (meal.strArea === 'Indian') {
        price = 12.33;
      } else if (meal.strArea === 'Moroccan') {
        price = 18.0;
      } else if (meal.strArea === 'Tunisian') {
        price = 9.99;
      } else {
        price = Math.floor(Math.random() * 20) + 1;
      }
      return {...meal, price};
    });
    return lambPrice || [];
  } catch (error) {
    console.log('Error fetching lamb data', error);
  }
};

export const asyncGetAllProductsOnSearch = async (search: string) => {
  try {
    const responce = await axios.get(`${BASE_URL}search.php?s=${search}`);
    console.log('responce', responce);
    return responce.data.meal || [];
  } catch (error) {
    console.log('Error fetching search products', error);
    return []
  }
};

export const asyncGetCountries = async () => {
  try {
    const response = await axios.get(`${COUNTRY_API_URL}/countries`);
    console.log('country',response)
    return response?.data?.data?.map((country)=>country.country)
  } catch (error) {
    throw error;
  }
};
