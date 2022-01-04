import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  function recipesDone() {
    history.push('/receitas-feitas');
  }

  function recipesFavorites() {
    history.push('/receitas-favoritas');
  }

  function LogoutButton() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header pageTitle="Perfil" />
      <h2 data-testid="profile-email">
        {email}
      </h2>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ recipesDone }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ recipesFavorites }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ LogoutButton }
      >
        Sair
      </button>
      <Header pageTitle="Perfil" />
      <Footer />
    </div>
  );
}
export default Profile;
