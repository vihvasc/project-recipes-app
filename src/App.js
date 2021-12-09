import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foods from './pages/Foods';

function App() {
  return (
    <div className="foods">
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          exact
          path="/comidas"
          component={ Foods }
        />
      </Switch>
    </div>
  );
}
export default App;
