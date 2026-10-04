import React from "react";

function Hero() {
  const chargeItems = [
    {
      icon: "fa-solid fa-chart-line",
      title: "Equity Delivery",
      description:
        "Simple and transparent pricing for long-term equity investments. View applicable brokerage and statutory charges clearly before placing an order.",
    },
    {
      icon: "fa-solid fa-bolt",
      title: "Intraday & F&O",
      description:
        "Trade with transparent pricing across intraday and derivatives. All applicable brokerage, exchange, and statutory charges are clearly presented.",
    },
    {
      icon: "fa-solid fa-layer-group",
      title: "Investment Products",
      description:
        "Explore applicable charges for different investment products from one place, with clear information designed to make your investment decisions easier.",
    },
  ];

  return (
    <section className="trademind-charges-hero">
      <div className="container py-5">

        {/* =========================================
            PAGE HEADER
        ========================================= */}
        <div className="row text-center">
          <div className="col-12 col-md-10 col-lg-8 mx-auto">

            {/* Badge */}
            <div className="charges-badge">
              <span></span>
              TRADEMIND AI PRICING
            </div>

            <h1 className="charges-title">
              Charges
            </h1>

            <p className="charges-subtitle">
              Clear, transparent pricing for your trading and investment
              journey
            </p>

            <p className="charges-description">
              Understand brokerage, transaction costs, and applicable charges
              before you trade. No unnecessary complexity — just clear
              information when you need it.
            </p>

          </div>
        </div>


        {/* =========================================
            CHARGE CARDS
        ========================================= */}
        <div className="row gy-4 gx-4 mt-4">

          {chargeItems.map((item, index) => (
            <div
              className="col-12 col-md-4"
              key={index}
            >
              <div className="charge-card">

                {/* Icon */}
                <div className="charge-icon">
                  <i className={item.icon}></i>
                </div>

                {/* Content */}
                <div className="charge-content">

                  <h2 className="charge-card-title">
                    {item.title}
                  </h2>

                  <p className="charge-card-description">
                    {item.description}
                  </p>

                </div>

                {/* Bottom Indicator */}
                <div className="charge-card-line"></div>

              </div>
            </div>
          ))}

        </div>


        {/* =========================================
            TRANSPARENCY NOTE
        ========================================= */}
        <div className="row mt-5">
          <div className="col-12 col-lg-10 mx-auto">

            <div className="pricing-note">

              <div className="pricing-note-icon">
                <i className="fa-solid fa-circle-info"></i>
              </div>

              <div>
                <h3>
                  Transparent by design
                </h3>

                <p>
                  Actual brokerage, taxes, exchange charges, and other
                  applicable costs may vary based on the product and order.
                  Always check the applicable charges before placing a trade.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>


      <style>{`

        /* =========================================
           SECTION
        ========================================= */

        .trademind-charges-hero {
          width: 100%;
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(
              180deg,
              #ffffff 0%,
              #fafcff 100%
            );
        }

        .trademind-charges-hero .container {
          position: relative;
          z-index: 2;
        }


        /* =========================================
           HEADER
        ========================================= */

        .charges-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 16px;

          color: #387ed1;

          font-size: 11px;
          font-weight: 700;

          letter-spacing: 1.2px;
        }

        .charges-badge span {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #387ed1;

          box-shadow:
            0 0 0 5px
            rgba(56, 126, 209, 0.08);

          animation:
            chargesBadgePulse
            2s ease-in-out infinite;
        }

        .charges-title {
          margin: 0 0 12px;

          color: #1f2937;

          font-size: clamp(36px, 5vw, 52px);

          line-height: 1.15;

          font-weight: 600;

          letter-spacing: -1.2px;
        }

        .charges-subtitle {
          margin: 0 auto 14px;

          max-width: 720px;

          color: #4b5563;

          font-size: clamp(18px, 2.5vw, 24px);

          line-height: 1.45;

          font-weight: 400;
        }

        .charges-description {
          max-width: 680px;

          margin: 0 auto;

          color: #6b7280;

          font-size: 15px;

          line-height: 1.75;
        }


        /* =========================================
           CHARGE CARDS
        ========================================= */

        .charge-card {
          position: relative;

          height: 100%;

          min-height: 285px;

          padding: 30px 26px;

          border:
            1px solid #e5e7eb;

          border-radius: 18px;

          background: #ffffff;

          box-shadow:
            0 8px 25px
            rgba(31, 41, 55, 0.04);

          overflow: hidden;

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .charge-card:hover {
          transform:
            translateY(-7px);

          border-color:
            rgba(56, 126, 209, 0.25);

          box-shadow:
            0 18px 45px
            rgba(31, 41, 55, 0.09);
        }


        /* =========================================
           ICON
        ========================================= */

        .charge-icon {
          width: 58px;
          height: 58px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 22px;

          border-radius: 16px;

          background:
            rgba(56, 126, 209, 0.08);

          color: #387ed1;

          font-size: 22px;

          transition:
            transform 0.35s ease,
            background 0.35s ease;
        }

        .charge-card:hover .charge-icon {
          transform:
            translateY(-3px)
            scale(1.05);

          background:
            rgba(56, 126, 209, 0.13);
        }


        /* =========================================
           CARD CONTENT
        ========================================= */

        .charge-card-title {
          margin: 0 0 12px;

          color: #1f2937;

          font-size: 20px;

          line-height: 1.35;

          font-weight: 600;
        }

        .charge-card-description {
          margin: 0;

          color: #6b7280;

          font-size: 14px;

          line-height: 1.75;
        }


        /* =========================================
           CARD BOTTOM LINE
        ========================================= */

        .charge-card-line {
          position: absolute;

          left: 26px;
          right: 26px;
          bottom: 0;

          height: 3px;

          background:
            linear-gradient(
              90deg,
              transparent,
              #387ed1,
              transparent
            );

          opacity: 0;

          transform:
            scaleX(0.5);

          transition:
            opacity 0.35s ease,
            transform 0.35s ease;
        }

        .charge-card:hover .charge-card-line {
          opacity: 1;

          transform:
            scaleX(1);
        }


        /* =========================================
           TRANSPARENCY NOTE
        ========================================= */

        .pricing-note {
          display: flex;

          align-items: flex-start;

          gap: 15px;

          padding: 20px 22px;

          border:
            1px solid
            rgba(56, 126, 209, 0.15);

          border-radius: 14px;

          background:
            rgba(56, 126, 209, 0.04);
        }

        .pricing-note-icon {
          flex-shrink: 0;

          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background:
            rgba(56, 126, 209, 0.1);

          color: #387ed1;

          font-size: 17px;
        }

        .pricing-note h3 {
          margin: 0 0 5px;

          color: #374151;

          font-size: 15px;

          font-weight: 600;
        }

        .pricing-note p {
          margin: 0;

          color: #6b7280;

          font-size: 13px;

          line-height: 1.6;
        }


        /* =========================================
           ANIMATION
        ========================================= */

        @keyframes chargesBadgePulse {

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

          .charge-card {
            min-height: 270px;
            padding: 26px 22px;
          }

          .charge-card-line {
            left: 22px;
            right: 22px;
          }

        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 767px) {

          .trademind-charges-hero .container {
            padding-left: 20px;
            padding-right: 20px;
          }

          .charges-description {
            font-size: 14px;
          }

          .charge-card {
            min-height: auto;
          }

          .pricing-note {
            padding: 17px;
          }

        }


        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 480px) {

          .charges-title {
            font-size: 36px;
          }

          .charges-subtitle {
            font-size: 18px;
          }

          .charge-card-title {
            font-size: 19px;
          }

          .charge-card-description {
            font-size: 13px;
          }

          .pricing-note {
            flex-direction: column;
          }

        }


        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .charges-badge span {
            animation: none;
          }

          .charge-card,
          .charge-icon,
          .charge-card-line {
            transition: none;
          }

        }

      `}</style>
    </section>
  );
}

export default Hero;