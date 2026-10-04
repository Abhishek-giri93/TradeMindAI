import React from 'react';
import Hero from './Hero';
import Brokerage from './Brokerage';
import Footer from '../Footer';
import Navbar from '../Navbar';
import ChargesTable from './ChargesTable';
import OpenAccount from '../OpenAccount';

function PricingPage() {
  return ( 
    <>
      <Navbar />
      <Hero />
      <ChargesTable/>
      <Brokerage />
      <OpenAccount/>
      <Footer/>
    </>
   );
}

export default PricingPage;