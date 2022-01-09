import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ recipe: {
  strMealThumb, strMeal, idMeal, strDrinkThumb, strDrink, idDrink }, index }) {
  function linkTo() {
    if (!!idDrink === true) return `/bebidas/${idDrink}`;
    return `/comidas/${idMeal}`;
  }
  return (
    <Link to={ linkTo() }>
      <div data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{ strMeal || strDrink }</p>
        <img
          data-testid={ `${index}-card-img` }
          src={ strMealThumb || strDrinkThumb }
          alt=""
        />
      </div>
    </Link>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape(PropTypes.any).isRequired,
};
