import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState(() => (localStorage
    .getItem('favoriteRecipes') ? JSON.parse(localStorage
      .getItem('favoriteRecipes')) : []));
  const [recipeProgress, setRecipeProgress] = useState([]);

  const setupProgress = (length) => {
    if (recipeProgress.length === 0) {
      setRecipeProgress(new Array(length).fill(false));
    }
  };
  const context = {
    data,
    setData,
    meals,
    setMeals,
    drinks,
    setDrinks,
    favoriteRecipes,
    setFavoriteRecipes,
    recipeProgress,
    setRecipeProgress,
    setupProgress,
  };

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

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
