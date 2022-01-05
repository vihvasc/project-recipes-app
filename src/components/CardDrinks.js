import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function CardDrinks() {
  const { data } = useContext(RecipesContext);

  function cardDrinks() {
    if (data) {
      const MAX_LENGTH = 12;
      const sliced = data.slice(0, MAX_LENGTH);

      console.log(sliced);

      return (sliced.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
        <div key={ idDrink }>
          <p data-testid={ `${index}-recipe-card` } />
          <img data-testid={ `${index}-card-img` } src={ strDrinkThumb } alt="img" />
          <p data-testid={ `${index}-card-name` }>{strDrink}</p>
        </div>
      )));
    }
  }

  return (
    cardDrinks()
  );
}

export default CardDrinks;
