import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import Search from './Search';

export default function Header({ title, displaySearch = true }) {
  const history = useHistory();
  const [showButton, setShowButton] = useState(false);
  return (
    <>
      <header className="page-header">
        <input
          data-testid="profile-top-btn"
          type="image"
          alt="profile top button"
          onClick={ () => history.push('/perfil') }
          src={ profileIcon }
        />

        <h1 data-testid="page-title">{title}</h1>

        {displaySearch
        && <input
          data-testid="search-top-btn"
          type="image"
          className="search-btn"
          alt="search top button"
          onClick={ () => setShowButton(!showButton) }
          src={ searchIcon }
        />}

      </header>

      {showButton
      && <Search />}

    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  displaySearch: PropTypes.bool.isRequired,
};
