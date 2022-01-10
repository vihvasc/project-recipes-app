import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Drinks from './pages/Drinks';
import FoodRecipe from './pages/FoodRecipe';
import DrinkRecipe from './pages/DrinkRecipe';
import DrinkInProgress from './pages/DrinkInProgress';
import FoodInProgress from './pages/FoodInProgress';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreFoodOrigin from './pages/ExploreFoodOrigin';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ExploreDrinkOrigin from './pages/ExploreDrinkOrigin';

function App() {
  return (
    <div className="foods">
      <Switch>
        <Route path="/bebidas/:recipeId/in-progress" component={ DrinkInProgress } />
        <Route path="/bebidas/:recipeId" component={ DrinkRecipe } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/comidas/:recipeId/in-progress" component={ FoodInProgress } />
        <Route path="/comidas/:recipeId" component={ FoodRecipe } />
        <Route path="/comidas" component={ Foods } />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinkIngredients }
        />
        <Route path="/explorar/bebidas/area" component={ ExploreDrinkOrigin } />
        <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodIngredients }
        />
        <Route path="/explorar/comidas/area" component={ ExploreFoodOrigin } />
        <Route path="/explorar/comidas" component={ ExploreFoods } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
