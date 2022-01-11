import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import CategoryButtons from '../components/CategoryButtons';
import fetchApi from '../services/fetchApi';

function Drinks() {
  const { drinks,
    setDrinks,
    categories,
    setCategories,
    filter,
    filteredDrinks,
    setFilteredDrinks,
    setToggle,
    toggle,
  } = useContext(RecipesContext);
  const { pathname, state } = useLocation();

  useEffect(() => {
    async function fetchRecipes() {
      const apiReturn = state
        ? await fetchApi('ingrediente', state.ingredients, pathname)
        : await fetchApi('nome', '', pathname);
      const apiReturnArr = Object.values(apiReturn)[0];
      setDrinks(apiReturnArr);
    }

    fetchRecipes();
  }, [pathname, setDrinks, state]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetchApi('categoria', '', pathname);
      const responseArr = Object.values(response)[0];
      setCategories(responseArr);
    }

    fetchCategories();
  }, [pathname, setCategories]);

  useEffect(() => {
    async function fetchFilter() {
      const filterResponse = await fetchApi('filtro', filter, pathname);
      const filteredRecipesArr = Object.values(filterResponse)[0];
      setFilteredDrinks(filteredRecipesArr);
    }
    fetchFilter();
  }, [pathname, filter, setFilteredDrinks]);

  function displayRecipes(recipes) {
    const MAX_RECIPES = 12;

    return recipes.slice(0, MAX_RECIPES).map((recipe, index) => (
      <Link to={ `/bebidas/${recipe.idDrink}` } key={ recipe.idDrink }>
        <RecipeCard
          recipe={ recipe }
          index={ index }
        />
      </Link>
    ));
  }

  function displayCategoryButtons(cat) {
    const MAX_CATEGORIES = 5;

    return cat.slice(0, MAX_CATEGORIES).map((category, index) => (
      <CategoryButtons
        key={ category.strCategory }
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
      <Header pageTitle="Bebidas" searchBtn />
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
        { toggle && filteredDrinks
          ? displayRecipes(filteredDrinks) : displayRecipes(drinks) }
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
