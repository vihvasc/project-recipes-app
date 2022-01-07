import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const context = {
    data,
    setData,
    meals,
    setMeals,
    drinks,
    setDrinks,
    favoriteRecipes,
    setFavoriteRecipes,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
