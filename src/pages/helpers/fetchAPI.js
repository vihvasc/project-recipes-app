import { MEAL_URLS, DRINK_URLS } from '../../consts';

export default async function fetchAPI(type, value, location) {
  let response = null;
  let data = null;

  if (location.includes('bebidas')) {
    // Procura pela API de Drinks
    switch (type) {
    case 'ingredients':
      response = await fetch(`${MEAL_URLS.INGREDIENT}${value}`);
      data = await response.json();
      break;
    case 'name':
      response = await fetch(`${MEAL_URLS.NAME}${value}`);
      data = await response.json();
      break;
    case 'first-letter':
      response = await fetch(`${MEAL_URLS.FIRST_LETTER}${value}`);
      data = await response.json();
      break;
    default:
      return console.log('DEU RUIM');
    }
    return Object.values(data)[0];
  }

  // Procura pela API de comidas
  switch (type) {
  case 'ingredients':
    response = await fetch(`${DRINK_URLS.INGREDIENT}${value}`);
    data = await response.json();
    break;
  case 'name':
    response = await fetch(`${DRINK_URLS.NAME}${value}`);
    data = await response.json();
    break;
  case 'first-letter':
    // console.log('chegou first letter comida');
    response = await fetch(`${DRINK_URLS.FIRST_LETTER}${value}`);
    data = await response.json();
    break;
  default:
    return console.log('DEU RUIM');
  }

  return Object.values(data)[0];
}

// Busca por categoria
export async function fetchByCategory(category, type) {
  if (type === '/bebidas') {
    const drinkResponse = await fetch(`${MEAL_URLS.CATEGORY}${category}`);
    const drinkData = await drinkResponse.json();
    return Object.values(drinkData)[0];
  }

  const mealResponse = await fetch(`${DRINK_URLS.CATEGORY}${category}`);

  const mealData = await mealResponse.json();
  return Object.values(mealData)[0];
}

// Busca aleatória
// https://www.themealdb.com/api/json/v1/1/random.php

export async function randomFetch(type) {
  if (type.includes('/bebidas')) {
    const drinkResponse = await fetch(DRINK_URLS.RANDOM);
    const drinkData = await drinkResponse.json();
    return Object.values(drinkData)[0];
  }

  const mealResponse = await fetch(MEAL_URLS.RANDOM);

  const mealData = await mealResponse.json();
  return Object.values(mealData)[0];
}
