import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import RecipeCards from '../components/RecipeCards';
import { fetchDrinks } from '../services/fetchRecipes';

function Drinks() {
  const { drinks, setDrinks } = useContext(RecipesContext);

  useEffect(() => {
    fetchDrinks(setDrinks);
  }, [setDrinks]);

  const MAX_RECIPES = 12;

  return (
    <div>
      <Header pageTitle="Bebidas" searchBtn />
      <div>
        { drinks && drinks.slice(0, MAX_RECIPES).map((recipe, index) => (
          <Link to={ `/bebidas/${recipe.idDrink}` } key={ index }>
            <RecipeCards
              key={ index }
              index={ index }
              recipe={ recipe }
            />
          </Link>
        )) }
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
