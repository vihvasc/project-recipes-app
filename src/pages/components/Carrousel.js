import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Card from './Card';

export default function Carrousel({ url }) {
  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
    const getRecomments = async () => {
      const NUMBER_OF_RECOMMENDATIONS = 6;
      const response = await fetch(url);
      const APIData = await response.json();
      setRecommendations(Object.values(APIData)[0].slice(0, NUMBER_OF_RECOMMENDATIONS));
    };
    getRecomments();
  }, [url]);
  return (
    <div>
      {recommendations ? recommendations.map(
        (recipe, index) => (
          <div data-testid={ `${index}-recomendation-card` } key={ index }>
            <Card
              recipe={ recipe }
              key={ index }
              index={ index }
            />
          </div>
        ),
      ) : ''}
    </div>
  );
}

Carrousel.propTypes = {
  url: PropTypes.string.isRequired,
};
