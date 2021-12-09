import React from 'react';

export default async function fetchAPI(type, value, location) {
  let response = null;
  let data = null;
  console.log('executou');

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
    return data;
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
    console.log('fetch do:', `www.themealdb.com/api/json/v1/1/search.php?f=${value}`)
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`);
    data = await response.json();
    break;
  default:
    return console.log('DEU RUIM');
  }
  console.log(data);
  return data;
}
