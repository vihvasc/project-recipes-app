import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import RecipesContext from '../context/RecipesContext';
import filterArray from './Helper/dataManagement';
import Loading from '../components/Loading';

function DrinkInProgress() {
  const history = useHistory();
  const { recipeId } = useParams();

  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [cocktail, setCocktail] = useState({});
  const { strAlcoholic,
    strCategory,
    strInstructions,
    strDrink,
    strDrinkThumb } = cocktail;

  const { setRecipeProgress } = useContext(RecipesContext);

  const memoizedData = useCallback(
    async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const dataDetails = await response.json();
      setCocktail(dataDetails.drinks[0]);
      setIngredients(filterArray(dataDetails.drinks[0], 'Ingredient'));
      setMeasures(filterArray(dataDetails.drinks[0], 'Measure'));
    }, [recipeId],
  );

  const checkProgress = useCallback((index) => {
    if (!localStorage.getItem('recipeProgress')) {
      const empty = new Array(ingredients.length).fill(false);
      localStorage.setItem('recipeProgress', JSON.stringify(empty));
    }
    const newProgress = [...JSON.parse(localStorage.getItem('recipeProgress'))];
    newProgress[index] = !newProgress[index];
    localStorage.setItem('recipeProgress', JSON.stringify(newProgress));

    setRecipeProgress(JSON.parse(localStorage.getItem('recipeProgress')));
  }, [ingredients, setRecipeProgress]);

  const showButton = () => (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      style={ { position: 'fixed', bottom: '0' } }
      onClick={ () => history.push('/receitas-feitas') }
      disabled={
        localStorage.getItem('recipeProgress')
          ? JSON.parse(localStorage.getItem('recipeProgress')).includes(false)
          : true
      }
    >
      Finalizar Receita
    </button>
  );

  useEffect(() => {
    memoizedData();
  }, [memoizedData]);

  const storageObject = {
    id: recipeId,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };

  return (
    <div>
      {cocktail ? (
        <div>
          <img src={ strDrinkThumb } alt="" data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{ strDrink }</h1>
          <ShareButton pathname={ `/bebidas/${recipeId}` } />
          <FavoriteButton recipeId={ recipeId } newFavorite={ storageObject } />
          <h3 data-testid="recipe-category">{ strAlcoholic }</h3>

          <ol>
            Ingredientes:
            {ingredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  name={ ingredient }
                  id={ index }
                  onClick={ () => checkProgress(index) }
                  defaultChecked={
                    localStorage.getItem('recipeProgress')
                      ? JSON.parse(localStorage.getItem('recipeProgress'))[index]
                      : false
                  }
                  style={ { textDecoration: 'none solid black' } }
                />
                {`${ingredient} ${measures[index]}`}
              </li>
            ))}
          </ol>
          <p data-testid="instructions">
            Intruções de preparo:
            <br />
            {strInstructions}
          </p>

          <Carousel.Item />
          {showButton()}
        </div>
      ) : <Loading />}
    </div>
  );
}

export default DrinkInProgress;
