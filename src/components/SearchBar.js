import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import fetchAPI from '../services/fetchApi';

export default class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      radio: '',
      data: [],
      input: '',
    };

    this.handleRadios = this.handleRadios.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRadios({ target }) {
    this.setState({
      radio: target.value,
    });
  }

  handleChange({ target }) {
    this.setState({
      input: target.value,
    });
  }

  async handleSubmit(e) {
    const { radio, input, data } = this.state;
    const { pageTitle } = this.props;
    const lowerCaseTitle = pageTitle.toLowerCase();
    e.preventDefault();

    if ((radio === 'primeira') && (input.length !== 1)) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const apiReturn = await fetchAPI(radio, input, lowerCaseTitle);

    this.setState({
      data: apiReturn,
    });

    if (apiReturn === 0) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    if (apiReturn === 1) {
      const id = Object.values(apiReturn[0])[0];
      const key = Object.keys(apiReturn[0])[0];
      return key.includes('bebidas')
        ? <Redirect to={ `/bebidas/${id}` } />
        : <Redirect to={ `/comidas/${id}` } />;
    }
  }

  render() {
    const { input } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          data-testid="search-input"
          type="text"
          value={ input }
          onChange={ this.handleChange }
        />
        <label htmlFor="ingrediente">
          <input
            type="radio"
            value="ingrediente"
            id="ingrediente"
            data-testid="ingredient-search-radio"
            name="selection"
            onChange={ this.handleRadios }
          />
          Ingrediente
        </label>
        <label htmlFor="nome">
          <input
            type="radio"
            value="nome"
            id="nome"
            data-testid="name-search-radio"
            name="selection"
            onChange={ this.handleRadios }
          />
          Nome
        </label>
        <label htmlFor="primeira">
          <input
            type="radio"
            value="primeira"
            id="primeira letra"
            data-testid="first-letter-search-radio"
            name="selection"
            onChange={ this.handleRadios }
          />
          Primeira Letra
        </label>
        <button type="submit" data-testid="exec-search-btn">Buscar</button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};
