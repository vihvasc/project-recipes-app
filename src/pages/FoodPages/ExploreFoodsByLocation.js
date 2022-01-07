import React, { useEffect, useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { areaListFetch } from '../helpers/fetchAPI';

export default function ExploreFoodsByOrigin() {
  const [areasList, setAreasList] = useState([]);
  const MAX_LIST_NUMBER = 12;
  useEffect(() => {
    async function doAreaListFetch() {
      const areasListData = await areaListFetch();
      setAreasList(areasListData.slice(0, MAX_LIST_NUMBER));
    }
    doAreaListFetch();
  }, []);

  console.log(areasList);
  return (
    <>
      <Header title="Explorar Origem" />

      <select name="cars" id="cars" data-testid="explore-by-area-dropdown">
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
