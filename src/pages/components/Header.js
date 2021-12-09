import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

export default function Header({ title, displaySearch = true }) {
  const history = useHistory();
  const [showSearchBar, setSearchBar] = useState(false);
  const [query, setQuery] = useState('');
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
          alt="search top button"
          onClick={ () => setSearchBar(!showSearchBar) }
          src={ searchIcon }
        />}
      </header>

      {showSearchBar
      && <input
        className="mb-3"
        data-testid="search-input"
        placeholder="Digite sua busca"
        type="text"
        name="query"
        value={ query }
        onChange={ ({ target }) => setQuery(target.value) }
      />}

    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  displaySearch: PropTypes.bool.isRequired,
};
