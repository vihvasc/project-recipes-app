import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import fetchApi from '../services/fetchApi';

function Foods() {
  const { meals, setMeals, data } = useContext(RecipesContext);
  const { pathname } = useLocation();

  useEffect(() => {
    async function fetchRecipes() {
      const apiReturn = await fetchApi('nome', '', pathname);
      const apiReturnArr = Object.values(apiReturn)[0];
      setMeals(apiReturnArr);
    }

    fetchRecipes();
  }, [pathname, setMeals]);

  function displayRecipes(recipes) {
    const MAX_RECIPES = 12;

    return recipes.slice(0, MAX_RECIPES).map((recipe, index) => (
      <RecipeCard
        key={ recipe.idMeal }
        recipe={ recipe }
        index={ index }
      />
    ));
  }

  return (
    <div>
      <Header pageTitle="Comidas" searchBtn />
      <div>
        { data.length > 0 ? displayRecipes(data) : displayRecipes(meals) }
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
