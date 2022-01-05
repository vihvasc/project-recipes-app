import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AppContext from '../../context/AppContext';
import { fetchByCategory } from '../helpers/fetchAPI';
import Card from './Card';

export default function CardRecipes({ url }) {
  const [defaultData, setDefaultData] = useState([]);
  const [categoryFilteredData, setCategoryFilteredData] = useState([]);
  const { data, setData, selectedCategory } = useContext(AppContext);
  const history = useHistory();
  console.log(history);
  const MAX_LENGTH = 12;

  useEffect(() => {
    async function doFetch() {
      if (url) {
        const response = await fetch(url);
        const fetchData = await response.json();
        setDefaultData(Object.values(fetchData)[0]);
      }
    }
    doFetch();
  }, [setDefaultData, url]);

  useEffect(() => {
    async function doCategoryFetch() {
      const path = history.location.pathname;
      const categoryData = await fetchByCategory(selectedCategory, path);
      setCategoryFilteredData(categoryData);
    }
    doCategoryFetch();
  }, [selectedCategory, history.location.pathname]);

  if (data === null) {
    setData([]);

    return defaultData.slice(0, MAX_LENGTH)
      .map((recipe, index) => <Card recipe={ recipe } key={ index } index={ index } />);
  }

  if (selectedCategory !== 'All' && categoryFilteredData) {
    return categoryFilteredData.slice(0, MAX_LENGTH)
      .map((recipe, index) => <Card recipe={ recipe } key={ index } index={ index } />);
  }

  return (
    data.length ? data.slice(0, MAX_LENGTH)
      .map((recipe, index) => <Card recipe={ recipe } key={ index } index={ index } />)
      : defaultData.slice(0, MAX_LENGTH)
        .map((recipe, index) => <Card recipe={ recipe } key={ index } index={ index } />)

  );
}
