import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Food from './pages/Food';

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

      {/* <Route
        exact
        path="/comidas/:id"
        component={ FoodDetails }
      /> */}

      {/* <Route
        exact
        path="/comidas/:id/in-progress"
        component={ FoodInProgress }
      /> */}

      {/* <Route
        exact
        path="/bebidas"
        component={ Cocktails }
      /> */}

      {/* <Route
        exact
        path="/bebidas/:id"
        component={ CocktailsDetails }
      /> */}

      {/* <Route
        exact
        path="/bebidas/:id/in-progress"
        component={ CocktailsInProgress }
      /> */}

      {/* <Route
        exact
        path="/explorar"
        component={ Explore }
      /> */}

      {/* <Route
        exact
        path="/explorar/comidas"
        component={ ExploreFood }
      /> */}

      {/* <Route
        exact
        path="/explorar/bebidas"
        component={ ExploreCocktails }
      /> */}

      {/* <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodIngredients }
      /> */}

      {/* <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreCocktailsIngredients }
      /> */}

      {/* <Route
        exact
        path="/explorar/comidas/area"
        component={ ExploreFoodByArea }
      /> */}

      {/* <Route
        exact
        path="/perfil"
        component={ Profile }
      /> */}

      {/* <Route
        exact
        path="/receitas-feitas"
        component={ DoneRecipes }
      /> */}

      {/* <Route
        exact
        path="/receitas-favoritas"
        component={ FavoriteRecipes }
      /> */}

    </Switch>

  // <div className="meals">
  //   <span className="logo">TRYBE</span>
  //   <object
  //     className="rocksGlass"
  //     type="image/svg+xml"
  //     data={ rockGlass }
  //   >
  //     Glass
  //   </object>
  // </div>
  );
}

export default App;
