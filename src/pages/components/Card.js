import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Card({ recipe: {
  strMealThumb, strMeal, idMeal, strDrinkThumb, strDrink, idDrink }, index }) {
  const history = useHistory();
  return (
    <Link to={ `${history.location.pathname}/${idMeal || idDrink}` }>
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
