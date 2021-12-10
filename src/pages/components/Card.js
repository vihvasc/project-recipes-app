import PropTypes from 'prop-types';
import React from 'react';

export default function Card({ recipe: {
  strMealThumb, strMeal, strDrinkThumb, strDrink }, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <p data-testid={ `${index}-card-name` }>{ strMeal || strDrink }</p>
      <img
        data-testid={ `${index}-card-img` }
        src={ strMealThumb || strDrinkThumb }
        alt=""
      />
    </div>);
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape(PropTypes.any).isRequired,
};
