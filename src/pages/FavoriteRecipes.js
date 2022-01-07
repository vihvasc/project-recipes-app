import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import RecipesContext from '../context/RecipesContext';

function FavoriteRecipes() {
  const [recipes, setRecipes] = useState(['']);

  const { favoriteRecipes: favoritesArr } = useContext(RecipesContext);

  function filterFood(foods) {
    setRecipes(foods.filter((recipe) => recipe.type === 'comida'));
  }
  function filterDrink(drinks) {
    setRecipes(drinks.filter((recipe) => recipe.type === 'bebida'));
  }

  useEffect(() => {
    if (favoritesArr) setRecipes(favoritesArr);
  }, [favoritesArr]);

  return (
    <div>
      <Header pageTitle="Receitas Favoritas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setRecipes(favoritesArr) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterFood(favoritesArr) }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterDrink(favoritesArr) }
      >
        Drinks
      </button>
      {
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
              <ShareButton
                pathname={ `/comidas/${recipe.id}` }
                dataTestid={ `${index}-horizontal-share-btn` }
              />
              <FavoriteButton
                recipeId={ recipe.id }
                dataTestid={ `${index}-horizontal-favorite-btn` }
              />
            </div>
          ) : (
            <div key={ recipe.name }>
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
              <ShareButton
                pathname={ `/bebidas/${recipe.id}` }
                dataTestid={ `${index}-horizontal-share-btn` }
              />
              <FavoriteButton
                recipeId={ recipe.id }
                dataTestid={ `${index}-horizontal-favorite-btn` }
              />
            </div>
          )
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
