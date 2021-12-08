import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      radio: '',
      data: [],
    };

    this.handleRadios = this.handleRadios.bind(this);
  }

  handleRadios({ target }) {
    this.setState({
      radio: target.value,
    });
  }

  render() {
    const { radio } = this.state;
    return (
      <form>
        <label htmlFor="ingrediente">
          <input
            type="radio"
            value="ingrediente"
            id="ingrediente"
            data-testid="ingredient-search-radio"
            name="selection"
            onChange={ this.handleRadios }
          />
          {' '}
          ingrediente
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
          {' '}
          nome
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
