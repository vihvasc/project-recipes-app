import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import filterObjIntoArray from '../helpers/dataManagement';

export default function CockTailsRecipeDetails() {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  console.log(id);

  const memoizedData = useCallback(
    async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const dataDetails = await response.json();
      setCocktail(dataDetails.drinks[0]);
      setIngredients(filterObjIntoArray(dataDetails.drinks[0], 'Ingredient'));
      setMeasures(filterObjIntoArray(dataDetails.drinks[0], 'Measure'));
    }, [id],
  );

  useEffect(() => {
    memoizedData();
  }, [memoizedData]);

  return (
    <div>
      {cocktail ? (
        <div>
          {console.log(cocktail)}
          <img src={ cocktail.strDrinkThumb } alt="" data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{ cocktail.strDrink }</h1>
          <button type="button" data-testid="share-btn">SHARE</button>
          <button type="button" data-testid="favorite-btn">FAVORITE</button>
          <h3 data-testid="recipe-category">{ cocktail.strAlcoholic }</h3>

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
            {cocktail.strInstructions}
          </p>
          <video data-testid="video" controls>
            <source src={ cocktail.strYoutube } type="video/mp4" />
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
