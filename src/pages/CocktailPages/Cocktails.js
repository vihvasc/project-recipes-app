import React from 'react';
import Header from '../components/Header';
import CardRecipes from '../components/CardRecipes';
import Footer from '../components/Footer';
import { DRINK_URLS } from '../../consts';

export default function CockTails() {
  return (
    <>
      <Header title="Bebidas" />
      <div>
        CockTails
      </div>
      <CardRecipes url={ DRINK_URLS.NAME } maxLength={ 12 } />
      <Footer />
    </>
  );
}
