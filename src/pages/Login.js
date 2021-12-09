import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState(true);
  const history = useHistory();
  const isValidEmail = (login) => login.match(/^[\w.]+@[\w.]+\w+\.\w+$/);

  const validateLogin = () => {
    const MIN_PASSWORD = 6;
    setValidate(!(password.length >= MIN_PASSWORD && isValidEmail(email)));
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    validateLogin();
  };

  const handleLogin = (event) => {
    setEmail(event.target.value);
    validateLogin();
  };

  function handleClick() {
    const userEmail = { email };
    localStorage.setItem('user', JSON.stringify(userEmail));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    history.push('/comidas');
  }

  return (
    <div>
      <form>
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            type="email"
            name="login"
            placeholder="email"
            value={ email }
            onChange={ handleLogin }
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ handlePassword }
          />
        </label>
        <label htmlFor="login-submit-btn">
          <input
            data-testid="login-submit-btn"
            type="button"
            disabled={ validate }
            value="Entrar"
            onClick={ handleClick }
          />
        </label>
      </form>
    </div>
  );
}

export default Login;
