import { screen, fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import { renderWithRouter } from './test-utils';

const EMAIL_DE_TESTE = 'algum@email.com';
const SENHA_DE_TESTE = '123456789';

describe('Testa a tela de Login', () => {
  it('É possivel digitar informações', () => {
    renderWithRouter(<App />);

    const emailHTML = screen.getByTestId('email-input');
    const passwordHTML = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(emailHTML).toBeInTheDocument();
    expect(passwordHTML).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();

    fireEvent.change(emailHTML, { target: { value: EMAIL_DE_TESTE } });
    expect(emailHTML.value).toBe(EMAIL_DE_TESTE);

    fireEvent.change(passwordHTML, { target: { value: SENHA_DE_TESTE } });
    expect(passwordHTML.value).toBe(SENHA_DE_TESTE);
  });
});
