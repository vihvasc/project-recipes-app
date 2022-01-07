import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteButton({ newFavorite, recipeId }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(storedFavorites);
  }, []);

  useEffect(() => {
    setIsFavorite(favoriteRecipes && favoriteRecipes.some(({ id }) => id === recipeId));
  }, [favoriteRecipes, recipeId]);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  function handleClick() {
    if (isFavorite) {
      setFavoriteRecipes((prevFavs) => prevFavs.filter(({ id }) => id !== recipeId));
    } else {
      setFavoriteRecipes((prevFavs) => (prevFavs && prevFavs.length > 0
        ? [...prevFavs, newFavorite] : [newFavorite]));
    }
  }

  return (
    <button type="button" onClick={ handleClick }>
      <img
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Profile-icon"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  newFavorite: PropTypes.objectOf(PropTypes.string),
  recipeId: PropTypes.string,
};

FavoriteButton.defaultProps = {
  newFavorite: {},
  recipeId: '',
};
