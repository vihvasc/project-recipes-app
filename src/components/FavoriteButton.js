import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';

export default function FavoriteButton({ newFavorite, recipeId, dataTestid }) {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(RecipesContext);
  const [isFavorite, setIsFavorite] = useState(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      return false;
    }
    const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return favoriteRecipe.some(({ id }) => id === recipeId);
  });

  // useEffect(() => {
  //   const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   setFavoriteRecipes(storedFavorites);
  // }, []);

  useEffect(() => {
    setIsFavorite(favoriteRecipes && favoriteRecipes.some(({ id }) => id === recipeId));
  }, [favoriteRecipes, recipeId]);

  console.log(favoriteRecipes);

  function handleClick() {
    if (isFavorite) {
      setFavoriteRecipes((prevFavs) => prevFavs.filter(({ id }) => id !== recipeId));
    } else {
      setFavoriteRecipes((prevFavs) => (prevFavs && prevFavs.length > 0
        ? [...prevFavs, newFavorite] : [newFavorite]));
    }
  }

  return (
    <button type="button" onClick={ handleClick } data-testid={ dataTestid }>
      <img
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Profile-icon"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  dataTestid: PropTypes.string,
  newFavorite: PropTypes.objectOf(PropTypes.string),
  recipeId: PropTypes.string,
};

FavoriteButton.defaultProps = {
  newFavorite: {},
  recipeId: '',
  dataTestid: '',
};
