import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodIngredients() {
  const [ingredients, setIngredients] = useState([]);

  async function fetchIngredients() {
    const REQUEST_LIMIT = 12;

    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    const ingredientsToShow = data.meals
      .filter((_ingredient, index) => index < REQUEST_LIMIT);
    setIngredients(ingredientsToShow);
  }

  useEffect(() => { fetchIngredients(); }, []);

  return (
    <div>
      <Header pageTitle="Explorar Ingredientes" />
      { ingredients.map(({ strIngredient }, index) => (
        <Link
          key={ `${strIngredient}-card` }
          to={ {
            pathname: '/comidas',
            state: { ingredient: `${strIngredient}` },
          } }
        >
          <div data-testid={ `${index}-ingredient-card` } className="w-40 h-40">
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png ` }
              alt={ `${strIngredient}` }
            />
            <h4 data-testid={ `${index}-card-name` }>{ strIngredient }</h4>
          </div>
        </Link>
      )) }
      <Footer />
    </div>
  );
}

export default ExploreFoodIngredients;
