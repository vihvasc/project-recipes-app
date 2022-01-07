import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

function DoneRecipes() {
  const [recipes, setRecipes] = useState('');

  function filterFood(foods) {
    setRecipes(foods.filter((recipe) => recipe.type === 'comida'));
  }
  function filterDrink(drinks) {
    setRecipes(drinks.filter((recipe) => recipe.type === 'bebida'));
  }

  useEffect(() => {
    if (doneRecipes) setRecipes(doneRecipes);
  }, []);

  return (
    <div>
      <Header pageTitle="Receitas Feitas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setRecipes(doneRecipes) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterFood(doneRecipes) }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterDrink(doneRecipes) }
      >
        Drinks
      </button>
      { recipes !== '' ? (
        recipes.map((recipe, index) => (
          recipe.type === 'comida' ? (
            <div key={ recipe.id }>
              <Link to={ `/comidas/${recipe.id}` }>
                <img
                  className="card-img"
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipe.area} - ${recipe.category}` }
              </p>
              <Link to={ `/comidas/${recipe.id}` }>
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipe.name }
                </p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                { `Feita em: ${recipe.doneDate}` }
              </p>
              {recipe.tags.map((tagName) => (
                <p
                  key={ tagName }
                  data-testid={ `${index}-${tagName}-horizontal-tag` }
                >
                  { tagName }
                </p>
              ))}
              <ShareButton
                pathname={ `/comidas/${recipe.id}` }
                dataTestId={ `${index}-horizontal-share-btn` }
              />
            </div>
          ) : (
            <div key={ recipe.id }>
              <Link to={ `/bebidas/${recipe.id}` }>
                <img
                  className="card-img"
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}
              </p>
              <Link to={ `/bebidas/${recipe.id}` }>
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipe.name }
                </p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                { `Feita em: ${recipe.doneDate}` }
              </p>
              <ShareButton
                pathname={ `/bebidas/${recipe.id}` }
                dataTestId={ `${index}-horizontal-share-btn` }
              />
            </div>
          )
        ))
      ) : (null)}
    </div>
  );
}

export default DoneRecipes;
