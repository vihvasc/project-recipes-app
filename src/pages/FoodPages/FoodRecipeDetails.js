import React, { useEffect, useState, useCallback } from 'react';

import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import filterObjIntoArray from '../helpers/dataManagement';

export default function FoodRecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  console.log(id);

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
          {console.log(meal)}
          <img src={ meal.strMealThumb } alt="" data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{ meal.strMeal }</h1>
          <button type="button" data-testid="share-btn">SHARE</button>
          <button type="button" data-testid="favorite-btn">FAVORITE</button>
          <h3 data-testid="recipe-category">{ meal.strCategory }</h3>

          <ol>
            Ingredientes:
            {ingredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} ${measures[index]}`}
              </li>
            ))}
          </ol>
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

          <div>
            <div data-testid={ `${0}-recomendation-card` }>RECEITA RECOMENDADA 1</div>
          </div>
        </div>
      ) : <Loading />}
    </div>
  );
}
