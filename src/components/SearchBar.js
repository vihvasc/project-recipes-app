import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import fetchApi from '../services/fetchApi';

function SearchBar() {
  const [filters, setFilters] = useState({ radio: '', input: '' });
  const { radio, input } = filters;

  const history = useHistory();
  const location = useLocation();

  const { setData } = useContext(RecipesContext);

  function handleChange({ target }) {
    const { name, value } = target;
    setFilters({ ...filters, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if ((radio === 'primeira') && (input.length !== 1)) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const apiReturn = await fetchApi(radio, input, location.pathname);
    const apiReturnArr = Object.values(apiReturn)[0];
    setData(apiReturnArr);
    // const { meals, drinks } = apiReturn;

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

  return (
    <form onSubmit={ handleSubmit }>
      <input
        name="input"
        data-testid="search-input"
        type="text"
        value={ input }
        onChange={ handleChange }
      />
      <label htmlFor="ingrediente">
        <input
          type="radio"
          name="radio"
          value="ingrediente"
          id="ingrediente"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
          checked={ radio === 'ingrediente' }
        />
        Ingrediente
      </label>
      <label htmlFor="nome">
        <input
          type="radio"
          name="radio"
          value="nome"
          id="nome"
          data-testid="name-search-radio"
          onChange={ handleChange }
          checked={ radio === 'nome' }
        />
        Nome
      </label>
      <label htmlFor="primeira">
        <input
          type="radio"
          name="radio"
          value="primeira"
          id="primeira letra"
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
          checked={ radio === 'primeira' }
        />
        Primeira Letra
      </label>
      <button type="submit" data-testid="exec-search-btn">Buscar</button>
    </form>
  );
}

export default SearchBar;
