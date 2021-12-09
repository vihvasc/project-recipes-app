import React, { Component } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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
    const { history, pageTitle, searchBtn } = this.props;
    const { isSearching } = this.state;
    return (
      <div>
        <button
          id="profile-button"
          type="button"
          data-testid="profile-top-btn"
          onClick={ () => history.push('/perfil') }
        >
          <img
            src={ profileIcon }
            alt="Perfil do usuário"
          />
        </button>
        <h1 data-testid="page-title">{ pageTitle }</h1>
        { searchBtn ? (
          <button
            id="search-button"
            type="button"
            data-testid="search-top-btn"
            onClick={ this.handleSearchClick }
          >
            <img
              src={ searchIcon }
              alt="Botão de procura"
            />
          </button>)
          : null }
        { isSearching ? <span data-testid="search-input">Search</span> : null }
      </div>
    );
  }
}

Header.propTypes = {
  history: PropTypes.string.isRequired,
  searchBtn: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
