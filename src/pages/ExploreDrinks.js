import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  const history = useHistory();

  async function handleClick() {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const { drinks } = await response.json();
    const { idDrink } = drinks[0];
    history.push(`/bebidas/${idDrink}`);
  }

  return (
    <div>
      <Header pageTitle="Explorar Bebidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
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

export default ExploreDrinks;
