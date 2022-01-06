import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchApi from '../services/fetchApi';

function FoodRecipe() {
  const { pathname } = useLocation();
  const { recipeId } = useParams();
  const [recipeInfo, setRecipeInfo] = useState({});
  const { strMeal,
    strCategory,
    strMealThumb,
    strInstructions,
    strYoutube } = recipeInfo;
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function fetchMeal() {
      const apiReturn = await fetchApi('receita', recipeId, pathname);
      setRecipeInfo(apiReturn.meals[0]);
      setIngredients(Object.entries(apiReturn.meals[0])
        .filter((att) => att[0].includes('Ingredient') && att[1])
        .map((att) => att[1]));
      setMeasures(Object.entries(apiReturn.meals[0])
        .filter((att) => att[0].includes('Measure') && att[1])
        .map((att) => att[1]));
    }

    fetchMeal();
  }, [pathname, recipeId]);

  useEffect(() => {
    async function fetchRecommendedDrinks() {
      const apiReturn = await fetchApi('nome', '', 'bebidas');
      const maxRecommendations = 6;
      setRecommendations(apiReturn.drinks
        .filter((_drink, index) => index < maxRecommendations)
        .map(({ strDrinkThumb, strDrink, strAlcoholic }) => ({
          thumb: strDrinkThumb,
          title: strDrink,
          category: strAlcoholic,
        })));
    }

    fetchRecommendedDrinks();
  }, []);

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
      <ul>
        { ingredients.map((ingredient, index) => (
          <li
            key={ `${index}-ingredient` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${ingredient} ${measures[index]}` }
          </li>
        )) }
      </ul>
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
      { recommendations.map(({ thumb, title, category }, index) => (
        <div
          key={ `${index}-recommendation` }
          data-testid={ `${index}-recomendation-card` }
        >
          <img src={ thumb } alt={ title } />
          <h5>{ category }</h5>
          <h3 data-testid={ `${index}-recomendation-title` }>{ title }</h3>
        </div>
      )) }
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

export default FoodRecipe;
