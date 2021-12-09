import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import fetchAPI from '../helpers/fetchAPI';

const types = ['ingredients', 'name', 'first-letter'];

function Search() {
  const history = useHistory();
  const oneLetter = useRef(null);
  const [query, setQuery] = useState('');
  const [type, setType] = useState(types[0]);

  function handleClick() {
    if (oneLetter.current.checked && query.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    fetchAPI(type, query, history.location.pathname);
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
