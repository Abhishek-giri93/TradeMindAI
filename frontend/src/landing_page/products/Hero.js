import React from "react";

function Hero() {
  return (
    <section className="products-hero">
      <div className="container py-5 overflow-hidden">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-md-10 col-lg-8">

            {/* Small Badge */}
            <div className="products-hero-badge">
              <span className="badge-dot"></span>
              TradeMind AI Platform
            </div>

            {/* Main Heading */}
            <h1 className="products-hero-title">
              TradeMind AI Products
            </h1>

            {/* Subheading */}
            <h2 className="products-hero-subtitle">
              Powerful, intelligent, and intuitive tools for modern investors
            </h2>

            {/* Description */}
            <p className="products-hero-description">
              Explore our suite of trading, portfolio, market intelligence,
              and AI-powered tools designed to help you make more informed
              decisions.
            </p>

            {/* Navigation Link */}
            <div className="products-hero-link-wrapper">
              <a
                href="#investment-offerings"
                className="products-hero-link"
              >
                <span>Explore our investment offerings</span>

                <span className="products-arrow">
                  <i className="fa-solid fa-arrow-right-long"></i>
                </span>
              </a>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .products-hero {
          width: 100%;
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            180deg,
            #ffffff 0%,
            #fafcff 100%
          );
          padding-top: 45px;
          padding-bottom: 35px;
        }

        /* Soft background glow */
        .products-hero::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: rgba(56, 126, 209, 0.06);
          filter: blur(70px);
          top: -220px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .products-hero .container {
          position: relative;
          z-index: 2;
        }

        /* Badge */
        .products-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px;
          margin-bottom: 22px;
          border: 1px solid rgba(56, 126, 209, 0.15);
          border-radius: 999px;
          background: rgba(56, 126, 209, 0.05);
          color: #387ed1;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.3px;
          animation: productsBadgeFade 0.7s ease forwards;
        }

        .badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #387ed1;
          box-shadow: 0 0 0 5px rgba(56, 126, 209, 0.08);
          animation: badgePulse 2s ease-in-out infinite;
        }

        /* Heading */
        .products-hero-title {
          margin: 0 0 14px;
          color: #1f2937;
          font-size: clamp(32px, 5vw, 52px);
          line-height: 1.15;
          font-weight: 600;
          letter-spacing: -1.5px;
          animation: productsTitleFade 0.8s ease forwards;
        }

        /* Subtitle */
        .products-hero-subtitle {
          margin: 0 auto 16px;
          max-width: 700px;
          color: #4b5563;
          font-size: clamp(18px, 2.5vw, 24px);
          line-height: 1.45;
          font-weight: 400;
          animation: productsSubtitleFade 0.9s ease forwards;
        }

        /* Description */
        .products-hero-description {
          max-width: 680px;
          margin: 0 auto 24px;
          color: #6b7280;
          font-size: 16px;
          line-height: 1.7;
          font-weight: 400;
          animation: productsDescriptionFade 1s ease forwards;
        }

        /* Link */
        .products-hero-link-wrapper {
          display: flex;
          justify-content: center;
          animation: productsLinkFade 1.1s ease forwards;
        }

        .products-hero-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #387ed1;
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .products-hero-link:hover {
          color: #245fa5;
        }

        .products-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .products-hero-link:hover .products-arrow {
          transform: translateX(6px);
        }

        /* Animations */
        @keyframes productsBadgeFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes productsTitleFade {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes productsSubtitleFade {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes productsDescriptionFade {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes productsLinkFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes badgePulse {
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

        /* Tablet */
        @media (max-width: 768px) {
          .products-hero {
            padding-top: 30px;
            padding-bottom: 25px;
          }

          .products-hero-description {
            font-size: 15px;
            padding: 0 10px;
          }

          .products-hero-link {
            font-size: 15px;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .products-hero {
            padding-top: 20px;
          }

          .products-hero-badge {
            font-size: 12px;
            padding: 6px 12px;
          }

          .products-hero-title {
            letter-spacing: -0.8px;
          }

          .products-hero-subtitle {
            font-size: 17px;
          }

          .products-hero-description {
            font-size: 14px;
            line-height: 1.6;
          }

          .products-hero-link {
            font-size: 14px;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .products-hero-badge,
          .products-hero-title,
          .products-hero-subtitle,
          .products-hero-description,
          .products-hero-link-wrapper {
            animation: none;
          }

          .badge-dot {
            animation: none;
          }

          .products-hero-link,
          .products-arrow {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;