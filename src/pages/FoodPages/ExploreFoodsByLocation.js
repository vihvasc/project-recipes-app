import React, { useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { areaListFetch } from '../helpers/fetchAPI';

export default function ExploreFoodsByOrigin() {
  const [areasList, setAreasList] = useState([]);
  // const { setDefaultData } = useContext(AppContext);
  const MAX_LIST_NUMBER = 12;

  /*
  TODO:
  1. Fazer um setDefaultData com os dados da requisição do select escolhido
  2. Carregar o componente CardRecipes
  */

  useEffect(() => {
    async function doAreaListFetch() {
      const areasListData = await areaListFetch();
      setAreasList(areasListData.slice(0, MAX_LIST_NUMBER));
    }
    doAreaListFetch();
  }, []);

  function handleChange(e) {
    console.log(e);
  }

  return (
    <>
      <Header title="Explorar Origem" />

      <select
        name="cars"
        id="cars"
        data-testid="explore-by-area-dropdown"
        onChange={ ({ target }) => handleChange(target.value) }
      >
        {areasList.length && areasList.map(({ strArea }, i) => (
          <option
            value={ strArea }
            data-testid={ `${strArea}-option` }
            key={ i }
          >
            {strArea}
          </option>

        ))}
      </select>

      <Footer />
    </>
  );
}
