import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isSearching: false,
    };

    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleSearchClick() {
    const { isSearching } = this.state;
    if (isSearching === false) {
      this.setState({ isSearching: true });
    } else {
      this.setState({ isSearching: false });
    }
  }

  render() {
    const { pageTitle, searchBtn } = this.props;
    const { isSearching } = this.state;
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
            onClick={ this.handleSearchClick }
          >
            <img
              src={ searchIcon }
              alt="Botão de procura"
              data-testid="search-top-btn"
            />
          </button>)
          : null }
        { isSearching ? <SearchBar pageTitle={ pageTitle } /> : null }
      </div>
    );
  }
}

Header.propTypes = {
  searchBtn: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
