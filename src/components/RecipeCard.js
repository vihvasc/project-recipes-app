import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, index }) {
  const { idMeal, strMeal, strMealThumb, idDrink, strDrink, strDrinkThumb } = recipe;

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
      />
      <p
        data-testid={ `${index}-card-name` }
      >
        { strMeal || strDrink }
      </p>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
