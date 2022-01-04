import React, { useEffect, useState, useCallback } from 'react';

import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import filterObjIntoArray from '../helpers/dataManagement';
import Carrousel from '../components/Carrousel';
import { DRINK_URLS } from '../../consts';

export default function FoodRecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const memoizedData = useCallback(
    async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const dataDetails = await response.json();
      setMeal(dataDetails.meals[0]);
      setIngredients(filterObjIntoArray(dataDetails.meals[0], 'Ingredient'));
      setMeasures(filterObjIntoArray(dataDetails.meals[0], 'Measure'));
    }, [id],
  );

  useEffect(() => {
    memoizedData();
  }, [memoizedData]);

  return (
    <div>
      {meal ? (
        <div>
          <img src={ meal.strMealThumb } alt="" data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{ meal.strMeal }</h1>
          <button type="button" data-testid="share-btn">SHARE</button>
          <button type="button" data-testid="favorite-btn">FAVORITE</button>
          <h3 data-testid="recipe-category">{ meal.strCategory }</h3>

          <ul>
            Ingredientes:
            {ingredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${measures[index]} of ${ingredient}`}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">
            Intruções de preparo:
            <br />
            {meal.strInstructions}
          </p>
          <video data-testid="video" controls>
            <source src={ meal.strYoutube } type="video/mp4" />
            <track src="" kind="captions" srcLang="en" label="English" />
          </video>

          <button type="button" data-testid="start-recipe-btn">INICIAR RECEITA</button>

          <Carrousel url={ DRINK_URLS.NAME } />
        </div>
      ) : <Loading />}
    </div>
  );
}
