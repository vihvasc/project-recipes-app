import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import RecipesContext from '../context/RecipesContext';
import filterArray from './Helper/dataManagement';
import Loading from '../components/Loading';

function FoodInProgress() {
  const history = useHistory();
  const { recipeId } = useParams();

  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recipe, setRecipe] = useState({});
  const { strArea,
    strCategory,
    strInstructions,
    strMeal,
    strMealThumb,
    strYoutube } = recipe;

  const { setRecipeProgress } = useContext(RecipesContext);

  const memoizedData = useCallback(
    async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const dataDetails = await response.json();
      setRecipe(dataDetails.meals[0]);
      setIngredients(filterArray(dataDetails.meals[0], 'Ingredient'));
      setMeasures(filterArray(dataDetails.meals[0], 'Measure'));
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
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

  return (
    <div>
      {recipe ? (
        <div>
          <img src={ strMealThumb } alt="" data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{ strMeal }</h1>
          <ShareButton pathname={ `/comidas/${recipeId}` } />
          <FavoriteButton recipeId={ recipeId } newFavorite={ storageObject } />
          <h3 data-testid="recipe-category">{ strCategory }</h3>

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
                />
                {`${ingredient} ${measures[index]}`}
              </li>
            ))}
          </ol>
          <p data-testid="instructions">
            Instruções de preparo:
            <br />
            {strInstructions}
          </p>
          <video data-testid="video" controls>
            <source src={ strYoutube } type="video/mp4" />
            <track src="" kind="captions" srcLang="en" label="English" />
          </video>

          <Carousel.Item />
          {showButton()}
        </div>
      ) : <Loading />}
    </div>
  );
}

export default FoodInProgress;
