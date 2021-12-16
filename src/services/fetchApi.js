export default async function fetchAPI(type, value, pageTitle) {
  let data = null;

  if (pageTitle.includes('comidas')) {
    if (type === 'ingrediente') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`);
      data = response.json();
      return data;
    } if (type === 'nome') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
      data = response.json();
      return data;
    } if (type === 'primeira') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`);
      data = response.json();
      return data;
    }
  }

  if (pageTitle.includes('bebidas')) {
    if (type === 'ingrediente') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`);
      data = response.json();
      return data;
    } if (type === 'nome') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
      data = response.json();
      return data;
    } if (type === 'primeira') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`);
      data = response.json();
      return data;
    }
  }
}
