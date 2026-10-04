import React from "react";
import Navbar from "../Navbar";
import Hero from "./Hero";
import CreateTicket from "./CreateTicket";
import Footer from "../Footer";

function SupportPage() {
  return (
    <div className="trademind-support-page">
      <Navbar />

      <main>
        <Hero />
        <CreateTicket />
      </main>

      <Footer />
    </div>
  );
}

export default SupportPage;