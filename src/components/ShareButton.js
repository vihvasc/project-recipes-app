import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButton({ pathname, dataTestId }) {
  const [isCopied, setIsCopied] = useState(false);

  function handleClick() {
    copy(`http://localhost:3000${pathname}`);
    setIsCopied(!isCopied);
  }

  return (
    <span className="share-button">
      <button
        type="button"
        onClick={ handleClick }
      >
        <img data-testid={ dataTestId } src={ shareIcon } alt="Profile-icon" />
      </button>
      { isCopied && (
        <Alert variant="success">
          Link copiado!
        </Alert>
      ) }
    </span>
  );
}

ShareButton.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
};
