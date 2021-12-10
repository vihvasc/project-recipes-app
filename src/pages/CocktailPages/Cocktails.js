import React from 'react';
import Header from '../components/Header';
import CardRecipes from '../components/CardRecipes';
import Footer from '../components/Footer';

export default function CockTails() {
  return (
    <>
      <Header title="Bebidas" />
      <div>
        CockTails
      </div>
      <CardRecipes />
      <Footer />
    </>
  );
}
