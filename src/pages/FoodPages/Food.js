import React from 'react';
import CardRecipes from '../components/CardRecipes';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
import Header from '../components/Header';

const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export default function Food() {
  return (
    <>
      <Header title="Comidas" />
      <Filters />
      <div>
        COMIDA
      </div>
      <CardRecipes url={ MEALS_URL } />
      <Footer />
    </>
  );
}
