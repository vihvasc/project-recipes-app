import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreFoodsByOrigin() {
  return (
    <>
      <Header title="Explorar Origem" />

      <label for="cars">Choose a car:</label>
        <select name="cars" id="cars" data-testid="explore-by-area-dropdown">
          <option value="volvo" data-testid="${area}-option">Volvo</option>
      </select>
      <Footer />
    </>
  );
}
