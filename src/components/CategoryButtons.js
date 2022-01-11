import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function CategoryButtons({ category }) {
  const { strCategory } = category;

  const { setFilter, toggle, setToggle } = useContext(RecipesContext);
  const [isToggled, setIsToggled] = useState(false);

  function handleFilter(e) {
    const filterValue = e.target.value;
    setIsToggled(!isToggled);
    console.log(toggle);
    setFilter(filterValue);
  }

  useEffect(() => {
    setToggle(isToggled);
  }, [setToggle, isToggled]);

  return (
    <button
      data-testid={ `${strCategory}-category-filter` }
      value={ strCategory }
      type="submit"
      onClick={ handleFilter }
    >
      { strCategory }
    </button>
  );
}

CategoryButtons.propTypes = {
  category: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CategoryButtons;
