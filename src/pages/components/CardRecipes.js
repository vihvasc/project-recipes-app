import React, { useContext, useEffect, useState } from 'react';

import AppContext from '../../context/AppContext';
import Card from './Card';

export default function CardRecipes({ url }) {
  const [defaultData, setDefaultData] = useState([]);
  const { data } = useContext(AppContext);
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

  console.log(defaultData);

  console.log(defaultData.length ? 'é true' : 'é falso');

  return (
    data.length ? data.slice(0, MAX_LENGTH)
      .map((recipe, index) => <Card recipe={ recipe } key={ index } index={ index } />)
      : defaultData.slice(0, MAX_LENGTH)
        .map((recipe, index) => <Card recipe={ recipe } key={ index } index={ index } />)

  );
}
