import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [recipeProgress, setRecipeProgress] = useState([]);

  const setupProgress = (length) => {
    if (recipeProgress.length === 0) {
      setRecipeProgress(new Array(length).fill(false));
    }
  };

  return (
    <AppContext.Provider
      value={ {
        data,
        setData,
        recipeProgress,
        setRecipeProgress,
        setupProgress,
      } }
    >
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
