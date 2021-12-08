import React, { useState } from 'react';
import MyContext from './appContext';

function Provider({ children }) {
  // const INITIAL_STATE = {};
  const [state, setState] = useState('bla');

  return (
    <MyContext.Provider value={ state }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
