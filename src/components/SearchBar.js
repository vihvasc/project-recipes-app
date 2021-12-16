import PropTypes, { string } from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import fetchAPI from '../services/fetchApi';

class SearchBar extends Component {
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
    const { pageTitle, history } = this.props;
    const lowerCaseTitle = pageTitle.toLowerCase();
    e.preventDefault();

    if ((radio === 'primeira') && (input.length !== 1)) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const apiReturn = await fetchAPI(radio, input, lowerCaseTitle);
    // console.log(apiReturn);
    const apiReturnArr = Object.values(apiReturn)[0];
    this.setState({
      data: apiReturnArr,
    });
    // const { meals, drinks } = apiReturn;
    console.log(data);

    if (apiReturnArr === null) {
      // console.log('chegou null');
      return global
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    if (apiReturnArr.length === 1) {
      // console.log(Object.values(apiReturn[1]));
      const id = Object.values(apiReturnArr[0])[0];
      // console.log(id);
      const key = Object.keys(apiReturn)[0];
      // console.log(key);
      return (key.includes('drinks')
        ? history.push(`/bebidas/${id}`)
        : history.push(`/comidas/${id}`));
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
  history: PropTypes.objectOf(string).isRequired,
};

export default withRouter(SearchBar);
