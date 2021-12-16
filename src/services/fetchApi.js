export default async function fetchAPI(type, value, pageTitle) {
  if (pageTitle.includes('comidas')) {
    if (type === 'ingrediente') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`);
      const data = response.json();
      return data;
    } if (type === 'nome') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
      const data = response.json();
      return data;
    } if (type === 'primeira') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`);
      const data = response.json();
      return data;
    }
    return null;
  }

  if (pageTitle.includes('bebidas')) {
    if (type === 'ingrediente') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`);
      const data = response.json();
      return data;
    } if (type === 'nome') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
      const data = response.json();
      return data;
    } if (type === 'primeira') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`);
      const data = response.json();
      return data;
    }
  }
}
