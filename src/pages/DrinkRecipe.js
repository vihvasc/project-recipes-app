import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchAPI from '../services/fetchApi';

function DrinkRecipe() {
  const { pathname } = useLocation();
  const { recipeId } = useParams();
  const [recipeInfo, setRecipeInfo] = useState({});
  const { strDrink,
    strAlcoholic,
    strDrinkThumb,
    strInstructions } = recipeInfo;
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function fetchDrink() {
      const apiReturn = await fetchAPI('receita', recipeId, pathname);
      setRecipeInfo(apiReturn.drinks[0]);
      setIngredients(Object.entries(apiReturn.drinks[0])
        .filter((att) => att[0].includes('Ingredient') && att[1])
        .map((att) => att[1]));
      setMeasures(Object.entries(apiReturn.drinks[0])
        .filter((att) => att[0].includes('Measure') && att[1])
        .map((att) => att[1]));
    }

    fetchDrink();
  }, [pathname, recipeId]);

  useEffect(() => {
    async function fetchRecommendedMeals() {
      const apiReturn = await fetchAPI('nome', '', 'comidas');
      const maxRecommendations = 6;
      setRecommendations(apiReturn.meals
        .filter((_meal, index) => index < maxRecommendations)
        .map(({ strMealThumb, strMeal, strCategory }) => ({
          thumb: strMealThumb,
          title: strMeal,
          category: strCategory,
        })));
    }

    fetchRecommendedMeals();
  }, []);

  return (
    <div>
      <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
      <div>
        <div>
          <h1 data-testid="recipe-title">{ strDrink }</h1>
          <button type="button">
            <img data-testid="share-btn" src={ shareIcon } alt="Profile-icon" />
          </button>
          <button type="button">
            <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="Profile-icon" />
          </button>
        </div>
        <h3 data-testid="recipe-category">{ strAlcoholic }</h3>
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

export default DrinkRecipe;
