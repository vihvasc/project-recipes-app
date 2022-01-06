import React from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function FavoriteButton() {
  return (
    <button type="button">
      <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="Profile-icon" />
    </button>
  );
}
