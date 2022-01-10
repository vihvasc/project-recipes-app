import React from 'react';
import { useHistory } from 'react-router';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <footer className="page-footer" data-testid="footer">
      <input
        data-testid="drinks-bottom-btn"
        type="image"
        alt="drinks bottom button"
        onClick={ () => history.push('/bebidas') }
        src={ drinkIcon }
      />

      <input
        data-testid="explore-bottom-btn"
        type="image"
        alt="explore bottom button"
        onClick={ () => history.push('/explorar') }
        src={ exploreIcon }
      />

      <input
        data-testid="food-bottom-btn"
        type="image"
        alt="food bottom button"
        onClick={ () => history.push('/comidas') }
        src={ mealIcon }
      />

    </footer>
  );
}
