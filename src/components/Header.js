import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageTitle, searchBtn }) {
  const [isSearching, setIsSearching] = useState(false);

  function handleSearchClick() {
    setIsSearching(!isSearching);
  }

  return (
    <div>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile-icon" />
      </Link>
      <h1 data-testid="page-title">{ pageTitle }</h1>
      { searchBtn ? (
        <button
          id="search-button"
          type="button"
          onClick={ handleSearchClick }
        >
          <img
            src={ searchIcon }
            alt="Botão de procura"
            data-testid="search-top-btn"
          />
        </button>)
        : null }
      { isSearching ? <SearchBar /> : null }
    </div>
  );
}

Header.propTypes = {
  searchBtn: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
