import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  const history = useHistory();

  async function handleClick() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const { meals } = await response.json();
    const { idMeal } = meals[0];
    history.push(`/comidas/${idMeal}`);
  }

  return (
    <div>
      <Header pageTitle="Explorar Comidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleClick }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
