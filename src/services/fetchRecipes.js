export async function fetchDrinks(setDrinks) {
  const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((resp) => resp.json());
  const { drinks } = result;
  setDrinks(drinks);
}

export async function fetchMeals(setMeals) {
  const result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=').then((resp) => resp.json());
  const { meals } = result;
  setMeals(meals);
}
