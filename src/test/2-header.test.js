import { screen, fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import { renderWithRouter } from './test-utils';

describe('Testa o Header', () => {
  it('TEST', () => {
    renderWithRouter(<App />);
  });
});
