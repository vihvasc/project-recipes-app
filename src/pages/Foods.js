import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import CategoryButtons from '../components/CategoryButtons';
import RecipesContext from '../context/RecipesContext';
import fetchApi from '../services/fetchApi';

function Foods() {
  const { pathname, state } = useLocation();

  const {
    data,
    meals,
    setMeals,
    categories,
    setCategories,
    filter,
    filteredRecipes,
    setFilteredRecipes,
    setToggle,
    toggle,
  } = useContext(RecipesContext);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetchApi('categoria', '', pathname);
      const responseArr = Object.values(response)[0];
      setCategories(responseArr);
    }

    fetchCategories();
  }, [pathname, setCategories]);

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
    async function fetchFilter() {
      const filterResponse = await fetchApi('filtro', filter, pathname);
      const filteredRecipesArr = Object.values(filterResponse)[0];
      setFilteredRecipes(filteredRecipesArr);
    }
    fetchFilter();
  }, [pathname, filter, setFilteredRecipes]);

  function displayRecipes(recipes) {
    const MAX_RECIPES = 12;
    return recipes.slice(0, MAX_RECIPES).map((recipe, index) => (
      <Link to={ `/comidas/${recipe.idMeal}` } key={ recipe.idMeal }>
        <RecipeCard
          recipe={ recipe }
          index={ index }
        />
      </Link>
    ));
  }

  function setDisplay() {
    if (data && data.length > 0) return displayRecipes(data);
    if (toggle && filteredRecipes) return displayRecipes(filteredRecipes);
    return displayRecipes(meals);
  }

  function displayCategoryButtons(cat) {
    const MAX_CATEGORIES = 5;
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
        { setDisplay() }
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
