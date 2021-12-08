import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const DEFAULT_LOGIN = {
  email: '',
  password: '',
};

export default function Login({ history }) {
  const [loginData, setLoginData] = useState(DEFAULT_LOGIN);
  const [isDisabled, setIsDisabled] = useState(true);
  const { email, password } = loginData;

  function validateEmail(userEmail) {
    const validFormat = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    if (userEmail.match(validFormat)) return true;
    return false;
    // Fonte da RegEx de validação de email: https://digitalfortress.tech/js/top-15-commonly-used-regex/
  }

  useEffect(() => {
    function enableBtn() {
      const MIN_PASSWORD_LENGTH = 7;
      const emailIsValid = email.length > 1 ? validateEmail(email) : false;

      if (password.length >= MIN_PASSWORD_LENGTH && emailIsValid) {
        return setIsDisabled(false);
      }
      return setIsDisabled(true);
    }

    enableBtn();
  }, [email, password]);

  function handleClick() {
    const userEmail = { email };

    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify(userEmail));
    history.push('/comidas');
  }

  return (
    <div>
      LOGIN
      <form>
        <input
          data-testid="email-input"
          id="email"
          placeholder="Email"
          type="text"
          name="email"
          value={ email }
          onChange={ ({ target }) => setLoginData({ ...loginData, email: target.value }) }
        />

        <input
          data-testid="password-input"
          placeholder="Senha"
          id="password"
          type="password"
          name="password"
          value={ password }
          onChange={ ({ target }) => setLoginData(
            { ...loginData, password: target.value },
          ) }
        />

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ handleClick }
        >
          Login
        </button>
      </form>

    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
