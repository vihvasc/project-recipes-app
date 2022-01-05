import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
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
      <Carousel interval={ null }>
        <Carousel.Item>
          <div style={ { display: 'flex' } }>
            { recommendationsCards[0] }
            { recommendationsCards[1] }
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={ { display: 'flex' } }>
            { recommendationsCards[2] }
            { recommendationsCards[3] }
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={ { display: 'flex' } }>
            { recommendationsCards[4] }
            { recommendationsCards[5] }
          </div>
        </Carousel.Item>
      </Carousel>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="bottom-fixed"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default DrinkRecipe;
