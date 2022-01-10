import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import fetchApi from '../services/fetchApi';

function Foods() {
  const { meals, setMeals, data } = useContext(RecipesContext);
  const { pathname, state } = useLocation();

  useEffect(() => {
    async function fetchRecipes() {
      const apiReturn = state
        ? await fetchApi('ingrediente', state.ingredient, pathname)
        : await fetchApi('nome', '', pathname);
      const apiReturnArr = Object.values(apiReturn)[0];
      setMeals(apiReturnArr);
    }

    fetchRecipes();
  }, [pathname, setMeals, state]);

  function displayRecipes(recipes) {
    const MAX_RECIPES = 12;

    return recipes.slice(0, MAX_RECIPES).map((recipe, index) => (
      <Link to={ `/comidas/${recipe.idMeal}` } key={ recipe.idMeal }>
        <RecipeCard
          recipe={ recipe }
          index={ index }
        />
      </Link>
    ));
  }

  return (
    <div>
      <Header pageTitle="Comidas" searchBtn />
      <div>
        { data && data.length > 0 ? displayRecipes(data) : displayRecipes(meals) }
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
