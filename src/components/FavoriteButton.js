import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteButton({ newFavorite, recipeId }) {
  const [localFavorites, setLocalFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(storedFavorites);
    setLocalFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    setIsFavorite(localFavorites && localFavorites.some(({ id }) => id === recipeId));
  }, [localFavorites, recipeId]);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(localFavorites));
  }, [localFavorites]);

  function handleClick() {
    if (isFavorite) {
      setLocalFavorites((prevFavs) => prevFavs.filter(({ id }) => id !== recipeId));
    } else {
      setLocalFavorites((prevFavs) => (prevFavs && prevFavs.length > 0
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
