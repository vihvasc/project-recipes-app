import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import RecipesContext from './RecipesContext';
import { fetchMeals, fetchDrinks } from '../services/fetchRecipes';

function Provider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const contextValue = {
    meals,
    setMeals,
    drinks,
    setDrinks,
  };

  useEffect(() => {
    fetchMeals(setMeals);
  }, [setMeals]);

  useEffect(() => {
    fetchDrinks(setDrinks);
  }, [setDrinks]);

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
