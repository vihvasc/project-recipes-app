import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardFoods from '../components/CardFoods';

function Foods() {
  return (
    <div>
      <Header pageTitle="Comidas" searchBtn />
      <CardFoods />
      <Footer />
    </div>
  );
}

export default Foods;
