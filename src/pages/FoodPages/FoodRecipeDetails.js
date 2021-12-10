import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';

// Cada card deve conter o data-testid="${index}-recipe-card".
// Cada imagem deve conter o data-testid="${index}-card-img".
// Cada tag com o nome da receita deve ter o data-testid="${index}-card-name".
// Caso mais de uma bebida seja encontrada, mostrar as 12 primeiras (ou menos, se não hoverem 12).

export default function FoodRecipeDetails() {
  const { id } = useParams();
  const { data } = useContext(AppContext);
  console.log('data ao renderizar o :', data);
  return (
    <div>
      FoodRecipeDetails
    </div>
  );
}
