import React from "react";

import Navbar from "../Navbar";
import OpenAccount from "../OpenAccount";
import Footer from "../Footer";

import Hero from "./Hero";
import Awards from "./Awards";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";

function HomePage() {
  return (
    <div className="trademind-homepage">
      <Navbar />

      <main>
        {/* Hero / Landing Section */}
        <Hero />

        {/* Why TradeMind AI */}
        <Awards />

        {/* Trust & Ecosystem */}
        <Stats />

        {/* Pricing */}
        <Pricing />

        {/* Education */}
        <Education />

        {/* Account CTA */}
        <OpenAccount />
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;