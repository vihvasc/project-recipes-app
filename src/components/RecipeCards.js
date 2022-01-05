import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCards({ recipe: {
  strMeal, strMealThumb, strDrink, strDrinkThumb }, index }) {
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

RecipeCards.propTypes = {
  recipe: PropTypes.shape(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
