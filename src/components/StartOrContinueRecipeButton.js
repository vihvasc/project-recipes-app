import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function StartOrContinueRecipeButton({ pathname, recipeId }) {
  const history = useHistory();

  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState([]);

  useEffect(() => {
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(storedDoneRecipes);
    const storedInProgressObject = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storedInProgressObject) {
      const storedInProgressRecipes = Object.values(storedInProgressObject)
        .reduce((ids, ingByIdObj) => [...ids, ...Object.keys(ingByIdObj)], []);
      setInProgressRecipes(storedInProgressRecipes);
    }
  }, []);

  return (doneRecipes && doneRecipes.some(({ id }) => id === recipeId) ? '' : (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="bottom-fixed"
      onClick={ () => history.push(`${pathname}/in-progress`) }
    >
      { inProgressRecipes && inProgressRecipes.some((id) => id === recipeId)
        ? 'Continuar Receita' : 'Iniciar Receita' }
    </button>
  ));
}

StartOrContinueRecipeButton.propTypes = {
  pathname: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
};
