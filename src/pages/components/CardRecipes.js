import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import Card from './Card';

export default function CardRecipes() {
  const { data } = useContext(AppContext);
  console.log(data);
  const MAX_LENGTH = 12;
  return (
    data && data.slice(0, MAX_LENGTH)
      .map((recipe, index) => <Card recipe={ recipe } key={ index } index={ index } />)
  );
}
