function generateDomain(pageTitle) {
  if (pageTitle.includes('comidas')) {
    return 'themealdb';
  }

  if (pageTitle.includes('bebidas')) {
    return 'thecocktaildb';
  }
}

export default async function fetchApi(type, value, pageTitle) {
  const domain = generateDomain(pageTitle);
  const queryParameter = {
    ingrediente: 'filter.php?i=',
    nome: 'search.php?s=',
    primeira: 'search.php?f=',
    receita: 'lookup.php?i=',
  };

  const response = await fetch(`https://www.${domain}.com/api/json/v1/1/${queryParameter[type]}${value}`);
  const data = await response.json();
  return data;
}
