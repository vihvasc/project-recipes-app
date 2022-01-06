import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [foodCategories, setFoodCategories] = useState({});
  const [drinkCategories, setDrinkCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function categoriesFetch() {
      const foodFetch = await fetch(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      );
      const foodFetchData = await foodFetch.json();
      setFoodCategories(foodFetchData);

      const drinkFetch = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
      );
      const drinkFetchData = await drinkFetch.json();
      setDrinkCategories(drinkFetchData);
    }
    categoriesFetch();
  }, []);

  return (
    <AppContext.Provider
      value={ {
        data,
        setData,
        defaultData,
        setDefaultData,
        foodCategories,
        drinkCategories,
        selectedCategory,
        setSelectedCategory,
      } }
    >
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
