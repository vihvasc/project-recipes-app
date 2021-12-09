import React, { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import AppContext from '../../context/AppContext';
import fetchAPI from '../helpers/fetchAPI';

const types = ['ingredients', 'name', 'first-letter'];

function Search() {
  const history = useHistory();
  const oneLetter = useRef(null);
  const [query, setQuery] = useState('');
  const [type, setType] = useState(types[0]);
  const { data, setData } = useContext(AppContext);

  async function handleClick() {
    if (oneLetter.current.checked && query.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const APIData = await fetchAPI(type, query, history.location.pathname);
    console.log(APIData);
    setData(APIData);

    if (data === null) {
      return global
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    if (APIData.length === 1) {
      const id = Object.values(APIData[0])[0];
      const key = Object.keys(APIData[0])[0];
      console.log(id, key);
      return key === 'meals' ? history.push(`/comidas/${id}`)
        : history.push(`/bebidas/${id}`);
    }
  }

  return (
    <div>
      <input
        data-testid="search-input"
        placeholder="Digite sua busca"
        type="text"
        name="query"
        value={ query }
        onChange={ ({ target }) => setQuery(target.value) }
      />
      <label htmlFor="ingredients">
        <input
          type="radio"
          name="search-type"
          id="ingredients"
          onClick={ () => setType(types[0]) }
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          name="search-type"
          id="name"
          onClick={ () => setType(types[1]) }
          data-testid="name-search-radio"
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          ref={ oneLetter }
          type="radio"
          name="search-type"
          id="first-letter"
          onClick={ () => setType(types[2]) }
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>

      <button
        type="button"
        onClick={ handleClick }
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default Search;
