import React from "react";

function Universe() {
  const ecosystem = [
    {
      icon: "fa-solid fa-brain",
      title: "TradeMind Intelligence",
      desc: "AI-powered market intelligence that helps you understand market trends, momentum, sentiment, and potential opportunities.",
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "TradeMind Analytics",
      desc: "Analyze stocks and market data with interactive charts, technical indicators, performance insights, and portfolio analytics.",
    },
    {
      icon: "fa-solid fa-wallet",
      title: "TradeMind Portfolio",
      desc: "Track your investments, holdings, positions, portfolio allocation, and overall performance from one centralized dashboard.",
    },
    {
      icon: "fa-solid fa-bolt",
      title: "TradeMind Trading",
      desc: "A streamlined trading experience designed to help you monitor markets and manage your orders with speed and clarity.",
    },
    {
      icon: "fa-solid fa-graduation-cap",
      title: "TradeMind Academy",
      desc: "Learn investing, trading, technical analysis, risk management, and market concepts through structured educational resources.",
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "TradeMind Security",
      desc: "Built with security-focused architecture and responsible technology practices to protect your trading experience.",
    },
  ];

  return (
    <section className="trademind-universe">

      <div className="container py-5">

        {/* =========================================
            DIVIDER
        ========================================= */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="universe-divider"></div>
          </div>
        </div>


        {/* =========================================
            HEADER
        ========================================= */}
        <div className="row text-center mb-5">
          <div className="col-12 col-md-10 col-lg-8 mx-auto">

            <div className="universe-badge">
              <span></span>
              TRADEMIND AI ECOSYSTEM
            </div>

            <h2 className="universe-title">
              The TradeMind AI Universe
            </h2>

            <p className="universe-subtitle">
              Everything you need to understand markets, manage your
              portfolio, and make more informed trading decisions — connected
              through one intelligent ecosystem.
            </p>

          </div>
        </div>


        {/* =========================================
            ECOSYSTEM CARDS
        ========================================= */}
        <div className="row gy-4 gx-4 justify-content-center">

          {ecosystem.map((item, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-lg-4"
            >
              <a
                href="#"
                className="universe-card-link"
              >

                <div className="universe-card">

                  {/* Icon */}
                  <div className="universe-icon">
                    <i className={item.icon}></i>
                  </div>

                  {/* Content */}
                  <div className="universe-card-content">

                    <h3 className="universe-card-title">
                      {item.title}
                    </h3>

                    <p className="universe-card-description">
                      {item.desc}
                    </p>

                  </div>

                  {/* Arrow */}
                  <div className="universe-card-arrow">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>

                </div>

              </a>
            </div>
          ))}

        </div>


        {/* =========================================
            CTA
        ========================================= */}
        <div className="row text-center mt-5 pt-3">
          <div className="col-12">

            <a
              href="/signup"
              className="universe-cta"
            >
              <span>Get started with TradeMind AI</span>

              <i className="fa-solid fa-arrow-right"></i>
            </a>

          </div>
        </div>

      </div>


      <style>{`

        /* =========================================
           SECTION
        ========================================= */

        .trademind-universe {
          width: 100%;
          position: relative;
          overflow: hidden;
          background: #ffffff;
        }

        .trademind-universe .container {
          position: relative;
          z-index: 2;
        }


        /* =========================================
           DIVIDER
        ========================================= */

        .universe-divider {
          width: 100%;
          height: 1px;
          background:
            linear-gradient(
              90deg,
              transparent,
              #e5e7eb,
              transparent
            );
        }


        /* =========================================
           HEADER
        ========================================= */

        .universe-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 16px;

          color: #387ed1;

          font-size: 11px;
          font-weight: 700;

          letter-spacing: 1.2px;
        }

        .universe-badge span {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #387ed1;

          box-shadow:
            0 0 0 5px
            rgba(56, 126, 209, 0.08);

          animation:
            universeBadgePulse
            2s ease-in-out infinite;
        }

        .universe-title {
          margin: 0 0 16px;

          color: #1f2937;

          font-size: clamp(30px, 4vw, 42px);

          line-height: 1.2;

          font-weight: 600;

          letter-spacing: -0.9px;
        }

        .universe-subtitle {
          max-width: 720px;

          margin: 0 auto;

          color: #6b7280;

          font-size: 16px;

          line-height: 1.75;
        }


        /* =========================================
           CARD LINK
        ========================================= */

        .universe-card-link {
          display: block;

          height: 100%;

          color: inherit;

          text-decoration: none;
        }


        /* =========================================
           CARD
        ========================================= */

        .universe-card {
          position: relative;

          height: 100%;

          min-height: 235px;

          padding: 28px 25px;

          border:
            1px solid #e5e7eb;

          border-radius: 18px;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #fafcff
            );

          box-shadow:
            0 8px 25px
            rgba(31, 41, 55, 0.04);

          overflow: hidden;

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .universe-card::before {
          content: "";

          position: absolute;

          width: 160px;
          height: 160px;

          top: -90px;
          right: -90px;

          border-radius: 50%;

          background:
            rgba(56, 126, 209, 0.07);

          filter: blur(25px);

          transition:
            transform 0.5s ease;
        }

        .universe-card:hover {
          transform: translateY(-7px);

          border-color:
            rgba(56, 126, 209, 0.25);

          box-shadow:
            0 18px 45px
            rgba(31, 41, 55, 0.09);
        }

        .universe-card:hover::before {
          transform: scale(1.6);
        }


        /* =========================================
           ICON
        ========================================= */

        .universe-icon {
          position: relative;
          z-index: 2;

          width: 52px;
          height: 52px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 20px;

          border-radius: 14px;

          background:
            rgba(56, 126, 209, 0.08);

          color: #387ed1;

          font-size: 21px;

          transition:
            transform 0.35s ease,
            background 0.35s ease;
        }

        .universe-card:hover .universe-icon {
          transform:
            translateY(-3px)
            scale(1.05);

          background:
            rgba(56, 126, 209, 0.13);
        }


        /* =========================================
           CARD CONTENT
        ========================================= */

        .universe-card-content {
          position: relative;
          z-index: 2;
          padding-right: 20px;
        }

        .universe-card-title {
          margin: 0 0 10px;

          color: #1f2937;

          font-size: 19px;

          line-height: 1.35;

          font-weight: 600;
        }

        .universe-card-description {
          margin: 0;

          color: #6b7280;

          font-size: 14px;

          line-height: 1.7;
        }


        /* =========================================
           CARD ARROW
        ========================================= */

        .universe-card-arrow {
          position: absolute;

          right: 22px;
          bottom: 22px;

          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            rgba(56, 126, 209, 0.07);

          color: #387ed1;

          font-size: 12px;

          opacity: 0;

          transform:
            translateX(-5px);

          transition:
            opacity 0.3s ease,
            transform 0.3s ease;
        }

        .universe-card:hover .universe-card-arrow {
          opacity: 1;

          transform:
            translateX(0);
        }


        /* =========================================
           CTA
        ========================================= */

        .universe-cta {
          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 12px;

          padding: 12px 22px;

          border-radius: 9px;

          background: #387ed1;

          color: #ffffff;

          text-decoration: none;

          font-size: 15px;

          font-weight: 600;

          box-shadow:
            0 8px 20px
            rgba(56, 126, 209, 0.18);

          transition:
            transform 0.3s ease,
            background 0.3s ease,
            box-shadow 0.3s ease;
        }

        .universe-cta:hover {
          color: #ffffff;

          background: #2868b3;

          transform:
            translateY(-3px);

          box-shadow:
            0 12px 28px
            rgba(56, 126, 209, 0.25);
        }

        .universe-cta i {
          transition:
            transform 0.3s ease;
        }

        .universe-cta:hover i {
          transform:
            translateX(5px);
        }


        /* =========================================
           ANIMATIONS
        ========================================= */

        @keyframes universeBadgePulse {

          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.6;
            transform: scale(1.15);
          }

        }


        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 991px) {

          .universe-card {
            min-height: 220px;
            padding: 24px 22px;
          }

        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 767px) {

          .trademind-universe .container {
            padding-left: 20px;
            padding-right: 20px;
          }

          .universe-subtitle {
            font-size: 15px;
            line-height: 1.65;
          }

          .universe-card {
            min-height: auto;
          }

          .universe-card-arrow {
            opacity: 1;
            transform: none;
          }

        }


        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 480px) {

          .universe-title {
            font-size: 29px;
          }

          .universe-card-title {
            font-size: 18px;
          }

          .universe-card-description {
            font-size: 13px;
          }

          .universe-cta {
            width: 100%;
            max-width: 320px;
          }

        }


        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .universe-badge span {
            animation: none;
          }

          .universe-card,
          .universe-icon,
          .universe-card-arrow,
          .universe-cta,
          .universe-cta i {
            transition: none;
          }

        }

      `}</style>
    </section>
  );
}

export default Universe;