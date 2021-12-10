import React from 'react';
import CardRecipes from '../components/CardRecipes';
import Header from '../components/Header';

export default function Food() {
  return (
    <>
      <Header title="Comidas" />
      <div>
        COMIDA
      </div>
      <CardRecipes />
    </>
  );
}
