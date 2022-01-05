import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardDrinks from '../components/CardDrinks';

function Drinks() {
  return (
    <div>
      <Header pageTitle="Bebidas" searchBtn />
      <CardDrinks />
      <Footer />
    </div>
  );
}

export default Drinks;
