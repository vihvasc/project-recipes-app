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
