import PropTypes from 'prop-types';
import React from 'react';
import MyContext from './appContext';

function Provider({ children }) {
  // const INITIAL_STATE = {};
  // const [state, setState] = useState('bla');

  return (
    <MyContext.Provider value={ state }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
