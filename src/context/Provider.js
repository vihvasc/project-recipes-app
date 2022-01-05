import PropTypes from 'prop-types';
import React from 'react';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  return (
    <RecipesContext.Provider>
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
