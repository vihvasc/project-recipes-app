import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer" className="bottom-fixed footer">
      <Link to="/bebidas">
        <img src={ drinkIcon } alt="drink icon" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/comidas">
        <img src={ mealIcon } alt="meal icon" data-testid="food-bottom-btn" />
      </Link>
      <Link to="/explorar">
        <img src={ exploreIcon } alt="explore icon" data-testid="explore-bottom-btn" />
      </Link>
    </footer>
  );
}
