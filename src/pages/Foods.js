import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import CategoryButtons from '../components/CategoryButtons';
import RecipesContext from '../context/RecipesContext';
import fetchApi from '../services/fetchApi';

function Foods() {

  const { meals,
    setMeals,
    // data,
    categories,
    setCategories,
    filter,
    // setFilter,
    filteredRecipes,
    setFilteredRecipes,
    setToggle,
    toggle,
  } = useContext(RecipesContext);
  const { pathname } = useLocation();


  useEffect(() => {
    async function fetchRecipes() {
      const apiReturn = state
        ? await fetchApi('ingrediente', state.ingredient, pathname)
        : await fetchApi('nome', '', pathname);
      const apiReturnArr = Object.values(apiReturn)[0];
      setMeals(apiReturnArr);
    }

    fetchRecipes();
  }, [pathname, setMeals, state]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetchApi('categoria', '', pathname);
      const responseArr = Object.values(response)[0];
      // console.log(responseArr);
      setCategories(responseArr);
    }

    fetchCategories();
  }, [pathname, setCategories]);

  useEffect(() => {
    async function fetchFilter() {
      // console.log(filter);
      const filterResponse = await fetchApi('filtro', filter, pathname);
      // console.log(filterResponse);
      const filteredRecipesArr = Object.values(filterResponse)[0];
      // console.log(filteredRecipesArr);
      setFilteredRecipes(filteredRecipesArr);
    }
    fetchFilter();
  }, [pathname, filter, setFilteredRecipes]);

  function displayRecipes(recipes) {
    const MAX_RECIPES = 12;
    // console.log(recipes);
    return recipes.slice(0, MAX_RECIPES).map((recipe, index) => (
      <Link to={ `/comidas/${recipe.idMeal}` } key={ recipe.idMeal }>
        <RecipeCard
          recipe={ recipe }
          index={ index }
        />
      </Link>
    ));
  }

  function displayCategoryButtons(cat) {
    const MAX_CATEGORIES = 5;
    // console.log(cat);
    return cat.slice(0, MAX_CATEGORIES).map((category, index) => (
      <CategoryButtons
        key={ index }
        category={ category }
        index={ index }
      />
    ));
  }

  const handleButtonAll = () => {
    setToggle(false);
  };

  // const mealBy = filteredRecipes;
  // console.log(mealBy);
  return (
    <div>
      <Header pageTitle="Comidas" searchBtn />
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handleButtonAll }
        >
          All
        </button>
        { categories && displayCategoryButtons(categories) }
      </section>
      <div>
        { toggle && filteredRecipes
          ? displayRecipes(filteredRecipes) : displayRecipes(meals) }
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
