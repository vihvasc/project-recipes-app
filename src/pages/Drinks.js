import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import fetchApi from '../services/fetchApi';

function Drinks() {
  const { drinks, setDrinks, data } = useContext(RecipesContext);
  const { pathname } = useLocation();

  useEffect(() => {
    async function fetchRecipes() {
      const apiReturn = await fetchApi('nome', '', pathname);
      const apiReturnArr = Object.values(apiReturn)[0];
      setDrinks(apiReturnArr);
    }

    fetchRecipes();
  }, [pathname, setDrinks]);

  function displayRecipes(recipes) {
    const MAX_RECIPES = 12;

    return recipes.slice(0, MAX_RECIPES).map((recipe, index) => (
      <RecipeCard
        key={ recipe.idDrink }
        recipe={ recipe }
        index={ index }
      />
    ));
  }

  return (
    <div>
      <Header pageTitle="Bebidas" searchBtn />
      <div>
        { data.length > 0 ? displayRecipes(data) : displayRecipes(drinks) }
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
