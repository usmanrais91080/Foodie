import axios from 'axios';

// gradients extract for all (burger,lamb etc)
const extractIngredients = (meal: any) => {
  const ingredients: { ingredient: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : '',
      });

      // Stop collecting after 5 valid ingredients
      if (ingredients.length === 8) {
        break;
      }
    }
  }

  return ingredients;
};


const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';
const COUNTRY_API_URL = 'https://countriesnow.space/api/v0.1';

export const asyncGetBurger = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=burger`);
    const burgerWithDetails = response.data?.meals?.map((meal: any) => {
      let price;
      let review;
      let calories;

      // Random time (10–60 mins)
      const time = Math.floor(Math.random() * (60 - 10 + 1)) + 10;
      const ingredients = extractIngredients(meal);

      if (meal.strCategory === 'Chicken') {
        price = 30.0;
        review = 4.2;
        calories = 450;
      } else if (meal.strCategory === 'Lamb') {
        price = 9.99;
        review = 4.0;
        calories = 550;
      } else {
        price = Math.floor(Math.random() * 50) + 1;
        review = parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
        calories = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
      }

      return {
        ...meal,
        price,
        review,
        calories,
        time,
        ingredients,
      };
    });

    return burgerWithDetails || [];
  } catch (error) {
    console.log('Error fetching burger', error);
    return [];
  }
};

export const asyncGetSaladMeal = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=salad`);
    const saladWithDetails = response.data?.meals?.map((meal: any) => {
      let price;
      let review;
      let calories;

      const time = Math.floor(Math.random() * (60 - 10 + 1)) + 10;
      const ingredients = extractIngredients(meal);

      if (meal.strCategory === 'Seafood') {
        price = 10.99;
        review = 3.78;
        calories = 250;
      } else if (meal.strCategory === 'Chicken') {
        price = 24.0;
        review = 2.99;
        calories = 350;
      } else if (meal.strCategory === 'Vegetarian') {
        price = 13.99;
        review = 4.77;
        calories = 180;
      } else {
        price = Math.floor(Math.random() * 20) + 1;
        review = parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
        calories = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
      }

      return {...meal, price, review, calories, time, ingredients};
    });

    return saladWithDetails || [];
  } catch (error) {
    console.log('Error fetching salad', error);
    return [];
  }
};

export const asyncGetLambMeal = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=lamb`);
    const lambPrice = response.data?.meals?.map((meal: any) => {
      let price;
      let review;
      let calories;
      const time = Math.floor(Math.random() * (60 - 10 + 1)) + 10;
      const ingredients = extractIngredients(meal);

      if (meal.strArea === 'Russian') {
        price = 33.99;
        review = 4.89;
        calories = 200;
      } else if (meal.strArea === 'Indian') {
        price = 12.33;
        review = 3.66;
        calories = 210;
      } else if (meal.strArea === 'Moroccan') {
        price = 18.0;
        review = 4.99;
        calories = 500;
      } else if (meal.strArea === 'Tunisian') {
        price = 9.99;
        review = 4.3;
        calories = 300;
      } else {
        price = Math.floor(Math.random() * 20) + 1;
        review = parseFloat((Math.random() * 1.3 + 3.5).toFixed(1));
        calories = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
      }

      return {...meal, price, review, calories, time, ingredients};
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
    return [];
  }
};

export const asyncGetCountries = async () => {
  try {
    const response = await axios.get(`${COUNTRY_API_URL}/countries`);
    console.log('country', response);
    return response?.data?.data?.map(country => country.country);
  } catch (error) {
    throw error;
  }
};
