import React, { Component } from 'react';
import { fetchNome, fetchPrimeiraLetra, fetchIngrediente } from '../services/fetchApi';

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
    console.log(radio);
    console.log(input);
    e.preventDefault();
    if (radio === 'ingrediente') {
      const ingredienteData = await fetchIngrediente(input);
      this.setState({
        data: ingredienteData,
      });
    } else if (radio === 'nome') {
      const nomeData = await fetchNome(input);
      this.setState({
        data: nomeData,
      });
    } else if ((radio === 'primeira') && (input.length !== 1)) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      const primeiraData = await fetchPrimeiraLetra(input);
      this.setState({
        data: primeiraData,
      });
    }
    console.log(data);
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
