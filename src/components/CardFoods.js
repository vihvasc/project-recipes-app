import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function CardFoods() {
  const { data } = useContext(RecipesContext);

  function cardFoods() {
    if (data) {
      const MAX_LENGTH = 12;
      const sliced = data.slice(0, MAX_LENGTH);
      console.log(sliced);

      return (sliced.map(({ idMeal, strMealThumb, strMeal }, index) => (
        <div key={ idMeal }>
          <p data-testid={ `${index}-recipe-card` } />
          <img data-testid={ `${index}-card-img` } src={ strMealThumb } alt="img" />
          <p data-testid={ `${index}-card-name` }>{strMeal}</p>
        </div>
      )));
    }
  }

  return (
    cardFoods()
  );
}

export default CardFoods;
