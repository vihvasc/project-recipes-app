import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

export default function Profile() {
  return (
    <>
      <Header title="Perfil" displaySearch={ false } />
      <div>
        PERFIL
      </div>
      <Footer />
    </>
  );
}
