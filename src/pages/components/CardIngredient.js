import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { byIngredientsFetch } from '../helpers/fetchAPI';

export default function CardIngredient({ingredient: {strIngredient1, strIngredient}, index}) {
  const history = useHistory()
  const [dataFilteredByIngredients, setDataFilteredByIngredients] = useState([]);

  // fazer o fetch e depois do café criar o link ao redor e redirecionar a pessoa para a tela principal de receitas
  useEffect(() => {
    async function fetchByIngredients() {
      const filteredData = await
        byIngredientsFetch(history.location.pathname, strIngredient || strIngredient1)
      setDataFilteredByIngredients(filteredData)
    }
    fetchByIngredients()
  }, [])

  function getImage() {
    if (history.location.pathname.includes('bebidas')) {
    return `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}.png`;
    }
    return `https://www.themealdb.com/images/ingredients/${strIngredient}.png`;
  
  }
  console.log(dataFilteredByIngredients)

  return (
    <div data-testid={`${index}-ingredient-card`}>
      <img
        src={getImage()}
        alt={`${strIngredient || strIngredient1} thumb`}
        data-testid={`${index}-card-img`}
      />
      <p data-testid={`${index}-card-name`}>{strIngredient1 || strIngredient}</p>
    </div>
  )
}
