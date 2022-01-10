import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import fetchApi from '../services/fetchApi';

function ExploreFoodOrigin() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [meals, setMeals] = useState([]);

  const { pathname } = useLocation();

  async function fetchOrigins() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await response.json();
    setAreas(data.meals.map(({ strArea }) => strArea));
  }

  useEffect(() => { fetchOrigins(); }, []);

  function handleChange({ target }) {
    const { value } = target;
    setSelectedArea(value);
  }

  useEffect(() => {
    async function fetchRecipes() {
      const apiReturn = selectedArea
        ? await fetchApi('area', selectedArea, pathname)
        : await fetchApi('nome', '', pathname);
      const apiReturnArr = Object.values(apiReturn)[0];
      setMeals(apiReturnArr);
    }

    fetchRecipes();
  }, [pathname, selectedArea, setMeals]);

  const MAX_RECIPES = 12;

  return (
    <div>
      <Header pageTitle="Explorar Origem" searchBtn />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleChange }
      >
        <option
          value=""
          data-testid="All-option"
        >
          All
        </option>
        { areas.map((area) => (
          <option
            value={ `${area}` }
            data-testid={ `${area}-option` }
            key={ `${area}-option` }
          >
            { area }
          </option>
        )) }
      </select>
      { meals && meals.slice(0, MAX_RECIPES).map((recipe, index) => (
        <Link to={ `/comidas/${recipe.idMeal}` } key={ recipe.idMeal }>
          <RecipeCard
            recipe={ recipe }
            index={ index }
          />
        </Link>
      )) }
      <Footer />
    </div>
  );
}

export default ExploreFoodOrigin;
