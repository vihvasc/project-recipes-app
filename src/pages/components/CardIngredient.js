import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { byIngredientsFetch } from '../helpers/fetchAPI';

export default function CardIngredient({ ingredient: { strIngredient1, strIngredient },
  key, index }) {
  const history = useHistory()
  const {setDefaultData} = useContext(AppContext)
  const [dataFilteredByIngredients, setDataFilteredByIngredients] = useState([]);


  //FIXME: Verificar o motivo do por quê estes valores estão chegando como undefined, daí quebra os requisitos que não acham o datatestId..
  console.log(key)
  console.log(index)

  useEffect(() => {
    async function fetchByIngredients() {
      const filteredData = await
        byIngredientsFetch(history.location.pathname, strIngredient || strIngredient1)
      setDataFilteredByIngredients(filteredData)
    }
    fetchByIngredients()
  }, [history.location.pathname, strIngredient1, strIngredient])

  function getImage() {
    if (history.location.pathname.includes('bebidas')) {
    return `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}.png`;
    }
    return `https://www.themealdb.com/images/ingredients/${strIngredient}.png`;
  
  }

  function handleClick() {
    setDefaultData(dataFilteredByIngredients)
    if (history.location.pathname.includes('bebidas')) {
      history.push('/bebidas')
    }
    history.push('/comidas')

  }

  return (
    <div data-testid={`${index}-ingredient-card`}>
      <input
        type="image"
        src={getImage()}
        alt={`${strIngredient || strIngredient1} thumb`}
        data-testid={`${index}-card-img`}
        onClick={() => handleClick()}
      />

      <p data-testid={`${index}-card-name`}>{strIngredient1 || strIngredient}</p>
    </div>
  )
}
