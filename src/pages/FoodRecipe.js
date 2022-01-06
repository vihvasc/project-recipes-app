import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchApi from '../services/fetchApi';

const copy = require('clipboard-copy');

function FoodRecipe() {
  const { pathname } = useLocation();

  const { recipeId } = useParams();

  const history = useHistory();

  const [recipeInfo, setRecipeInfo] = useState({});
  const { strMeal,
    strCategory,
    strMealThumb,
    strInstructions,
    strYoutube } = recipeInfo;

  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const recommendationsCards = recommendations
    .map(({ thumb, title, category }, index) => (
      <Card
        key={ `${index}-recommendation` }
        style={ { width: '18rem' } }
        data-testid={ `${index}-recomendation-card` }
      >
        <Card.Img variant="top" src={ thumb } />
        <Card.Body>
          <Card.Title
            data-testid={ `${index}-recomendation-title` }
          >
            { title }
          </Card.Title>
          <Card.Text>{ category }</Card.Text>
        </Card.Body>
      </Card>
    ));

  const maxRecommendations = 6;

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
          <button
            data-testid="share-btn"
            type="button"
            onClick={ () => {
              copy(pathname);
              return <p>Link copiado</p>;
            } }
          >
            <img src={ shareIcon } alt="Profile-icon" />
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
      <Carousel interval={ null } style={ { marginBottom: '3rem' } }>
        <Carousel.Item>
          <div style={ { display: 'flex', justifyContent: 'center' } }>
            { recommendationsCards[0] }
            { recommendationsCards[1] }
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={ { display: 'flex', justifyContent: 'center' } }>
            { recommendationsCards[2] }
            { recommendationsCards[3] }
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={ { display: 'flex', justifyContent: 'center' } }>
            { recommendationsCards[4] }
            { recommendationsCards[5] }
          </div>
        </Carousel.Item>
      </Carousel>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="bottom-fixed"
        onClick={ () => history.push(`/comidas/${recipeId}/in-progress`) }
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default FoodRecipe;
