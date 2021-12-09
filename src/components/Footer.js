import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DrinkIcon from '../images/drinkIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';

export default class Footer extends Component {
  render() {
    return (
      <footer data-testid="footer" className="footer">
        <Link to="/bebidas" data-testid="drinks-bottom-btn">
          <img src={ DrinkIcon } alt="drink icon" />
        </Link>
        <Link to="/comidas" data-testid="food-bottom-btn">
          <img src={ MealIcon } alt="meal icon" />
        </Link>
        <Link to="/explorar" data-testid="explore-bottom-btn">
          <img src={ ExploreIcon } alt="explore icon" />
        </Link>
      </footer>
    );
  }
}
