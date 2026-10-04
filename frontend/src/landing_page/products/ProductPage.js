import React from "react";
import Navbar from "../Navbar";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";
import Footer from "../Footer";

function ProductPage() {
  return (
    <div className="trademind-product-page">

      {/* Navigation */}
      <Navbar />

      {/* Products Hero */}
      <main>
        <Hero />

        {/* =========================================
            FLAGSHIP PRODUCTS
        ========================================= */}

        {/* TradeMind Trading */}
        <LeftSection
          imageUrl="media/images/products-kite.png"
          productName="TradeMind Trading"
          productDescription="A streamlined trading experience built for modern investors. Monitor market movements, analyze stocks, manage orders, and stay connected with your portfolio through a clean and intuitive interface."
          tryDemo="#"
          learnMore="#"
          googlePlayLink="#"
          appStoreLink="#"
        />

        {/* TradeMind Portfolio */}
        <RightSection
          imageUrl="media/images/products-console.png"
          productName="TradeMind Portfolio"
          productDescription="Your centralized portfolio intelligence dashboard. Track holdings, positions, allocation, performance, funds, and trading activity while keeping your investment data organized in one place."
          learnMore="#"
        />

        {/* TradeMind Market Intelligence */}
        <LeftSection
          imageUrl="media/images/products-coin.png"
          productName="TradeMind Market Intelligence"
          productDescription="Understand the market beyond price movements. Explore market trends, stock performance, technical signals, sentiment, and AI-powered insights designed to help you analyze opportunities more effectively."
          tryDemo="#"
          learnMore="#"
          googlePlayLink="#"
          appStoreLink="#"
        />

        {/* TradeMind Developer Platform */}
        <RightSection
          imageUrl="media/images/landing.svg"
          productName="TradeMind Developer Platform"
          productDescription="Build powerful financial experiences with developer-friendly APIs and tools. Connect applications with market intelligence, portfolio data, and trading capabilities to create innovative financial products."
          learnMore="#"
        />

        {/* TradeMind Academy */}
        <LeftSection
          imageUrl="media/images/varsity-products.svg"
          productName="TradeMind Academy"
          productDescription="Learn the fundamentals of investing and trading through structured educational content. Understand markets, technical analysis, risk management, and financial concepts at your own pace."
          tryDemo="#"
          learnMore="#"
          googlePlayLink="#"
          appStoreLink="#"
        />

        {/* =========================================
            TRADEMIND AI ECOSYSTEM
        ========================================= */}

        <Universe />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default ProductPage;