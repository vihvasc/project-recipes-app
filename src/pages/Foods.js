import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCards from '../components/RecipeCards';
import RecipesContext from '../context/RecipesContext';
import CardFoods from '../components/CardFoods';

function Foods() {
  const { meals } = useContext(RecipesContext);

  const MAX_RECIPES = 12;
  console.log(meals);
  return (

    <div>
      <Header pageTitle="Comidas" searchBtn />
      <div>
        { meals && meals.slice(0, MAX_RECIPES).map((recipe, index) => (
          <Link to={ `/comidas/${recipe.idMeal}` } key={ index }>
            <RecipeCards
              key={ index }
              index={ index }
              recipe={ recipe }
            />
          </Link>
        )) }
      </div>
      <CardFoods />
      <Footer />
    </div>
  );
}

export default Foods;
