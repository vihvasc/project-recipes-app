import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ recipe, index }) {
  const { strMeal, strMealThumb, strDrink, strDrinkThumb } = recipe;

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        className="rounded w-40"
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
