export default async function fetchAPI(type, value, location) {
  let response = null;
  let data = null;

  if (location.includes('bebidas')) {
    // Procura pela API de Drinks
    switch (type) {
    case 'ingredients':
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`);
      data = await response.json();
      break;
    case 'name':
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
      data = await response.json();
      break;
    case 'first-letter':
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`);
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
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`);
    data = await response.json();
    break;
  case 'name':
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    data = await response.json();
    break;
  case 'first-letter':
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`);
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
    const drinkResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const drinkData = await drinkResponse.json();
    return Object.values(drinkData)[0];
  }

  const mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

  const mealData = await mealResponse.json();
  return Object.values(mealData)[0];
}

// Busca aleatória
// https://www.themealdb.com/api/json/v1/1/random.php

export async function randomFetch(type) {
  if (type.includes('/bebidas')) {
    const drinkResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const drinkData = await drinkResponse.json();
    return Object.values(drinkData)[0];
  }

  const mealResponse = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

  const mealData = await mealResponse.json();
  return Object.values(mealData)[0];
}
