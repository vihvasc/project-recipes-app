import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinkIngredients() {
  const [ingredients, setIngredients] = useState([]);

  async function fetchIngredients() {
    const REQUEST_LIMIT = 12;

    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    const ingredientsToShow = data.drinks
      .filter((_ingredient, index) => index < REQUEST_LIMIT);
    setIngredients(ingredientsToShow);
  }

  useEffect(() => { fetchIngredients(); }, []);

  return (
    <div>
      <Header pageTitle="Explorar Ingredientes" />
      { ingredients.map(({ strIngredient1: strIngredient }, index) => (
        <Link
          key={ `${strIngredient}-card` }
          data-testid={ `${index}-ingredient-card` }
          to={ {
            pathname: '/bebidas',
            state: { ingredient: `${strIngredient}` },
          } }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient}-Small.png` }
            alt={ `${strIngredient}` }
            data-testid={ `${index}-card-img` }
          />
          <h4 data-testid={ `${index}-card-name` }>{ strIngredient }</h4>
        </Link>
      )) }
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredients;
