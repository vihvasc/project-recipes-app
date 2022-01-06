import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardIngredient from '../components/CardIngredient';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { ingredientsFetch } from '../helpers/fetchAPI';

export default function ExploreCocktailsByIngredients() {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    async function doIngredientsFetch() {
      const drinkIngredients = await ingredientsFetch(history.location.pathname)
      setIngredients(drinkIngredients.slice(0, 12))
    }
    doIngredientsFetch()
  }, [history.location.pathname])

  return (
    <>
      <Header title="Explorar Ingredientes" displaySearch={ false } />
      
      {ingredients.length && ingredients
        .map((ingredient, i) => <CardIngredient ingredient={ingredient} key={i}/>)}
      <Footer />
    </>
  );
}
