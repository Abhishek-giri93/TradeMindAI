import React, { useState } from "react";

function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const quickTopics = [
    "Track account opening",
    "Trading & order issues",
    "Funds & withdrawals",
    "Market data & charts",
  ];

  const featuredTopics = [
    "Important platform updates and announcements",
    "Trading, account and security updates",
  ];

  return (
    <section className="trademind-support-hero">
      <div className="container py-4 py-md-5">

        {/* =========================================
            TOP HEADER
        ========================================= */}

        <div className="support-topbar">

          <div className="support-brand">
            <div className="support-brand-icon">
              <i className="fa-solid fa-headset"></i>
            </div>

            <div>
              <h1>TradeMind AI Support</h1>
              <span>We're here to help</span>
            </div>
          </div>

          <a
            href="#track-tickets"
            className="support-ticket-link"
          >
            <span>Track tickets</span>
            <i className="fa-solid fa-arrow-right"></i>
          </a>

        </div>


        {/* =========================================
            MAIN CONTENT
        ========================================= */}

        <div className="row gy-5 gx-lg-5 align-items-start">

          {/* =========================================
              LEFT COLUMN
          ========================================= */}

          <div className="col-12 col-md-7">

            <div className="support-main-content">

              <div className="support-eyebrow">
                <span></span>
                HELP CENTER
              </div>

              <h2>
                How can we help you today?
              </h2>

              <p className="support-description">
                Search for an answer or explore our help topics to quickly
                find information about your account, trading, funds, and
                TradeMind AI products.
              </p>


              {/* Search */}
              <div className="support-search-wrapper">

                <i className="fa-solid fa-magnifying-glass support-search-icon"></i>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="support-search-input"
                  placeholder="Search for help, e.g. order rejected, funds, account..."
                  aria-label="Search TradeMind AI support"
                />

                {searchQuery && (
                  <button
                    type="button"
                    className="support-search-clear"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}

              </div>


              {/* Search Status */}
              {searchQuery && (
                <div className="support-search-status">
                  Searching help topics for{" "}
                  <strong>"{searchQuery}"</strong>
                </div>
              )}


              {/* Quick Topics */}
              <div className="support-quick-section">

                <span className="support-quick-title">
                  Popular topics
                </span>

                <div className="support-topic-list">

                  {quickTopics.map((topic, index) => (
                    <a
                      href="#"
                      key={index}
                      className="support-topic-link"
                    >
                      {topic}

                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  ))}

                </div>

              </div>

            </div>

          </div>


          {/* =========================================
              RIGHT COLUMN
          ========================================= */}

          <div className="col-12 col-md-5">

            <div className="support-featured-card">

              <div className="featured-header">

                <div className="featured-icon">
                  <i className="fa-solid fa-bullhorn"></i>
                </div>

                <div>
                  <h3>Featured</h3>
                  <span>Latest support updates</span>
                </div>

              </div>


              <div className="featured-list">

                {featuredTopics.map((topic, index) => (
                  <a
                    href="#"
                    key={index}
                    className="featured-item"
                  >

                    <span className="featured-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="featured-text">
                      {topic}
                    </span>

                    <i className="fa-solid fa-arrow-right featured-arrow"></i>

                  </a>
                ))}

              </div>


              {/* Support Status */}
              <div className="support-status">

                <span className="status-dot"></span>

                <span>
                  TradeMind AI Support Center
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      <style>{`

        /* =========================================
           HERO
        ========================================= */

        .trademind-support-hero {
          position: relative;

          width: 100%;

          overflow: hidden;

          color: #ffffff;

          background:
            radial-gradient(
              circle at 85% 20%,
              rgba(255,255,255,0.10),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #245f9e 0%,
              #387ed1 55%,
              #2f72c1 100%
            );
        }

        .trademind-support-hero::before {
          content: "";

          position: absolute;

          width: 380px;
          height: 380px;

          border-radius: 50%;

          right: -180px;
          bottom: -220px;

          background:
            rgba(255,255,255,0.06);

          filter: blur(10px);

          pointer-events: none;
        }

        .trademind-support-hero::after {
          content: "";

          position: absolute;

          width: 250px;
          height: 250px;

          border-radius: 50%;

          left: -150px;
          top: 20%;

          background:
            rgba(255,255,255,0.04);

          pointer-events: none;
        }

        .trademind-support-hero .container {
          position: relative;
          z-index: 2;
        }


        /* =========================================
           TOP BAR
        ========================================= */

        .support-topbar {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 20px;

          margin-bottom: 48px;

          padding-bottom: 20px;

          border-bottom:
            1px solid
            rgba(255,255,255,0.18);
        }

        .support-brand {
          display: flex;

          align-items: center;

          gap: 12px;
        }

        .support-brand-icon {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 12px;

          background:
            rgba(255,255,255,0.13);

          border:
            1px solid
            rgba(255,255,255,0.16);

          color: #ffffff;

          font-size: 17px;
        }

        .support-brand h1 {
          margin: 0;

          color: #ffffff;

          font-size: 17px;

          font-weight: 600;
        }

        .support-brand span {
          display: block;

          margin-top: 2px;

          color:
            rgba(255,255,255,0.72);

          font-size: 11px;
        }


        /* =========================================
           TICKET LINK
        ========================================= */

        .support-ticket-link {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          color: #ffffff;

          text-decoration: none;

          font-size: 14px;

          font-weight: 500;

          transition:
            opacity 0.3s ease,
            transform 0.3s ease;
        }

        .support-ticket-link:hover {
          color: #ffffff;

          opacity: 0.85;

          transform:
            translateX(3px);
        }

        .support-ticket-link i {
          font-size: 11px;

          transition:
            transform 0.3s ease;
        }

        .support-ticket-link:hover i {
          transform:
            translateX(4px);
        }


        /* =========================================
           MAIN CONTENT
        ========================================= */

        .support-main-content {
          padding-right: 25px;
        }

        .support-eyebrow {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          margin-bottom: 13px;

          color:
            rgba(255,255,255,0.75);

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 1.4px;
        }

        .support-eyebrow span {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #ffffff;

          box-shadow:
            0 0 0 5px
            rgba(255,255,255,0.10);
        }

        .support-main-content h2 {
          max-width: 600px;

          margin: 0 0 13px;

          color: #ffffff;

          font-size: clamp(30px, 4vw, 42px);

          line-height: 1.2;

          font-weight: 600;

          letter-spacing: -0.8px;
        }

        .support-description {
          max-width: 610px;

          margin: 0 0 25px;

          color:
            rgba(255,255,255,0.76);

          font-size: 15px;

          line-height: 1.7;
        }


        /* =========================================
           SEARCH
        ========================================= */

        .support-search-wrapper {
          position: relative;

          width: 100%;

          max-width: 650px;
        }

        .support-search-icon {
          position: absolute;

          left: 17px;
          top: 50%;

          transform:
            translateY(-50%);

          z-index: 2;

          color: #7b8794;

          font-size: 14px;
        }

        .support-search-input {
          width: 100%;

          height: 54px;

          padding:
            0 50px 0 45px;

          border: none;

          border-radius: 11px;

          outline: none;

          background: #ffffff;

          color: #374151;

          font-size: 14px;

          box-shadow:
            0 12px 30px
            rgba(0,0,0,0.12);

          transition:
            box-shadow 0.3s ease,
            transform 0.3s ease;
        }

        .support-search-input::placeholder {
          color: #9ca3af;
        }

        .support-search-input:focus {
          box-shadow:
            0 15px 35px
            rgba(0,0,0,0.18);

          transform:
            translateY(-1px);
        }

        .support-search-clear {
          position: absolute;

          right: 12px;
          top: 50%;

          transform:
            translateY(-50%);

          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: none;

          border-radius: 50%;

          background: #f1f3f5;

          color: #6b7280;

          cursor: pointer;
        }

        .support-search-status {
          margin-top: 9px;

          color:
            rgba(255,255,255,0.68);

          font-size: 11px;
        }


        /* =========================================
           QUICK TOPICS
        ========================================= */

        .support-quick-section {
          margin-top: 24px;
        }

        .support-quick-title {
          display: block;

          margin-bottom: 11px;

          color:
            rgba(255,255,255,0.65);

          font-size: 11px;

          font-weight: 600;

          text-transform: uppercase;

          letter-spacing: 0.7px;
        }

        .support-topic-list {
          display: flex;

          flex-wrap: wrap;

          gap: 9px;
        }

        .support-topic-link {
          display: inline-flex;

          align-items: center;

          gap: 7px;

          padding: 7px 11px;

          border:
            1px solid
            rgba(255,255,255,0.18);

          border-radius: 7px;

          background:
            rgba(255,255,255,0.07);

          color: #ffffff;

          text-decoration: none;

          font-size: 12px;

          transition:
            background 0.3s ease,
            border-color 0.3s ease,
            transform 0.3s ease;
        }

        .support-topic-link:hover {
          color: #ffffff;

          background:
            rgba(255,255,255,0.14);

          border-color:
            rgba(255,255,255,0.30);

          transform:
            translateY(-2px);
        }

        .support-topic-link i {
          font-size: 8px;

          opacity: 0.7;
        }


        /* =========================================
           FEATURED CARD
        ========================================= */

        .support-featured-card {
          padding: 25px;

          border:
            1px solid
            rgba(255,255,255,0.15);

          border-radius: 18px;

          background:
            rgba(255,255,255,0.09);

          box-shadow:
            0 15px 45px
            rgba(0,0,0,0.10);

          backdrop-filter:
            blur(12px);

          transition:
            transform 0.35s ease,
            background 0.35s ease;
        }

        .support-featured-card:hover {
          transform:
            translateY(-4px);

          background:
            rgba(255,255,255,0.11);
        }


        /* =========================================
           FEATURED HEADER
        ========================================= */

        .featured-header {
          display: flex;

          align-items: center;

          gap: 12px;

          margin-bottom: 20px;
        }

        .featured-icon {
          width: 40px;
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 11px;

          background:
            rgba(255,255,255,0.12);

          color: #ffffff;

          font-size: 15px;
        }

        .featured-header h3 {
          margin: 0 0 2px;

          color: #ffffff;

          font-size: 16px;

          font-weight: 600;
        }

        .featured-header span {
          color:
            rgba(255,255,255,0.60);

          font-size: 10px;
        }


        /* =========================================
           FEATURED ITEMS
        ========================================= */

        .featured-list {
          display: flex;

          flex-direction: column;
        }

        .featured-item {
          display: grid;

          grid-template-columns:
            35px 1fr 20px;

          align-items: center;

          gap: 10px;

          padding: 15px 0;

          border-top:
            1px solid
            rgba(255,255,255,0.10);

          color: #ffffff;

          text-decoration: none;

          transition:
            padding 0.3s ease;
        }

        .featured-item:hover {
          color: #ffffff;

          padding-left: 5px;
        }

        .featured-number {
          color:
            rgba(255,255,255,0.40);

          font-size: 11px;

          font-weight: 600;
        }

        .featured-text {
          color:
            rgba(255,255,255,0.88);

          font-size: 13px;

          line-height: 1.55;
        }

        .featured-arrow {
          color:
            rgba(255,255,255,0.60);

          font-size: 10px;

          transition:
            transform 0.3s ease;
        }

        .featured-item:hover .featured-arrow {
          transform:
            translateX(4px);
        }


        /* =========================================
           SUPPORT STATUS
        ========================================= */

        .support-status {
          display: flex;

          align-items: center;

          gap: 8px;

          margin-top: 18px;
          padding-top: 16px;

          border-top:
            1px solid
            rgba(255,255,255,0.10);

          color:
            rgba(255,255,255,0.60);

          font-size: 10px;
        }

        .status-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #7ee2a8;

          box-shadow:
            0 0 0 4px
            rgba(126,226,168,0.10);

          animation:
            supportStatusPulse
            2s ease-in-out infinite;
        }


        /* =========================================
           ANIMATION
        ========================================= */

        @keyframes supportStatusPulse {

          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.55;
            transform: scale(1.15);
          }

        }


        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 991px) {

          .support-main-content {
            padding-right: 0;
          }

          .support-featured-card {
            padding: 22px;
          }

        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 767px) {

          .trademind-support-hero .container {
            padding-left: 20px;
            padding-right: 20px;
          }

          .support-topbar {
            margin-bottom: 35px;
          }

          .support-brand h1 {
            font-size: 15px;
          }

          .support-ticket-link {
            font-size: 12px;
          }

          .support-main-content h2 {
            font-size: 30px;
          }

          .support-description {
            font-size: 14px;
          }

          .support-search-input {
            height: 50px;

            font-size: 13px;
          }

          .support-featured-card {
            margin-top: 5px;
          }

        }


        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 480px) {

          .support-topbar {
            align-items: flex-start;
          }

          .support-brand-icon {
            width: 37px;
            height: 37px;
          }

          .support-brand h1 {
            font-size: 14px;
          }

          .support-main-content h2 {
            font-size: 28px;
          }

          .support-topic-list {
            gap: 7px;
          }

          .support-topic-link {
            font-size: 11px;
          }

        }


        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .support-status .status-dot {
            animation: none;
          }

          .support-ticket-link,
          .support-ticket-link i,
          .support-search-input,
          .support-topic-link,
          .support-featured-card,
          .featured-item,
          .featured-arrow {
            transition: none;
          }

        }

      `}</style>
    </section>
  );
}

export default Hero;