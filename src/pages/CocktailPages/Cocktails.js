import React from 'react';
import Header from '../components/Header';
import CardRecipes from '../components/CardRecipes';
import Footer from '../components/Footer';
import Filters from '../components/Filters';

const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export default function CockTails() {
  return (
    <>
      <Header title="Bebidas" />
      <Filters />
      <CardRecipes url={ DRINKS_URL } />
      <Footer />
    </>
  );
}
