import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';

export default function FoodRecipeDetails() {
  const { id } = useParams();
  console.log(id);
  const { data } = useContext(AppContext);
  console.log('data ao renderizar o :', data);
  return (
    <div>
      FoodRecipeDetails
    </div>
  );
}
