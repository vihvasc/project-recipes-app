import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchAPI from '../services/fetchApi';

function FoodRecipe() {
  const { pathname } = useLocation();
  const { recipeId } = useParams();
  const [recipeInfo, setRecipeInfo] = useState({});
  const { strMeal,
    strCategory,
    strMealThumb,
    strInstructions,
    strYoutube } = recipeInfo;

  useEffect(() => {
    async function fetchData() {
      const apiReturn = await fetchAPI('receita', recipeId, pathname);
      console.log(apiReturn.meals[0]);
      setRecipeInfo(apiReturn.meals[0]);
    }

    fetchData();
  }, [pathname, recipeId]);

  return (
    <div>
      <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
      <div>
        <div>
          <h1 data-testid="recipe-title">{ strMeal }</h1>
          <button type="button">
            <img data-testid="share-btn" src={ shareIcon } alt="Profile-icon" />
          </button>
          <button type="button">
            <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="Profile-icon" />
          </button>
        </div>
        <h3 data-testid="recipe-category">{ strCategory }</h3>
      </div>
      <h2>Ingredients</h2>
      {/* <ul>
        <li data-testid={ `${index}-ingredient-and-measure` }>a</li>
      </ul> */}
      <h2>Instructions</h2>
      <p data-testid="instructions">{ strInstructions }</p>
      <h2>Vídeo</h2>
      <iframe
        title={ strMeal }
        width="420"
        height="315"
        src={ strYoutube && strYoutube.replace('watch?v=', 'embed/') }
        data-testid="video"
      />
      <h2>Recomendadas</h2>
      {/* <div data-testid={ `${index}-recommendation-card` }>a</div> */}
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

export default FoodRecipe;
