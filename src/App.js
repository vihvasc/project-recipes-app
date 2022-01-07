import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './pages/Login';
import Explore from './pages/Explore';
import Food from './pages/FoodPages/Food';
import ExploreFoods from './pages/FoodPages/ExploreFoods';
import ExploreFoodsByIngredients from './pages/FoodPages/ExploreFoodsByIngredients';
import ExploreFoodsByLocation from './pages/FoodPages/ExploreFoodsByLocation';
import FoodRecipeDetails from './pages/FoodPages/FoodRecipeDetails';
import FoodRecipeProcess from './pages/FoodPages/FoodRecipeProcess';
import Cocktails from './pages/CocktailPages/Cocktails';
import CocktailsRecipeDetails from './pages/CocktailPages/CocktailsRecipeDetails';
import CocktailsRecipeProcess from './pages/CocktailPages/CocktailsRecipeProcess';
import ExploreCocktails from './pages/CocktailPages/ExploreCocktails';
import CocktailsByIngredients from './pages/CocktailPages/ExploreCocktailsByIngredients';
import DoneRecipes from './pages/Recipes/DoneRecipes';
import FavoriteRecipes from './pages/Recipes/FavoriteRecipes';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        exact
        path="/comidas"
        component={ Food }
      />

      <Route
        exact
        path="/comidas/:id"
        component={ FoodRecipeDetails }
      />

      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ FoodRecipeProcess }
      />

      <Route
        exact
        path="/bebidas"
        component={ Cocktails }
      />

      <Route
        exact
        path="/bebidas/:id"
        component={ CocktailsRecipeDetails }
      />

      <Route
        exact
        path="/bebidas/:id/in-progress"
        component={ CocktailsRecipeProcess }
      />

      <Route
        exact
        path="/explorar"
        component={ Explore }
      />

      <Route
        exact
        path="/explorar/comidas"
        component={ ExploreFoods }
      />

      <Route
        exact
        path="/explorar/bebidas"
        component={ ExploreCocktails }
      />

      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodsByIngredients }
      />

      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ CocktailsByIngredients }
      />

      <Route
        exact
        path="/explorar/comidas/area"
        component={ ExploreFoodsByLocation }
      />

      <Route
        exact
        path="/perfil"
        component={ Profile }
      />

      <Route
        exact
        path="/receitas-feitas"
        component={ DoneRecipes }
      />

      <Route
        exact
        path="/receitas-favoritas"
        component={ FavoriteRecipes }
      />

    </Switch>

  );
}

export default App;
