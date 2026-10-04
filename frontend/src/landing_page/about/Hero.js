import React from "react";

function Hero() {
  return (
    <section className="container my-5 py-5 trademind-about-hero">
      
      {/* Header Section */}
      <div className="row justify-content-center text-center mb-5 pb-lg-4">
        <div className="col-12 col-md-10 col-lg-9">

          <span className="trademind-about-eyebrow">
            About TradeMind AI
          </span>

          <h1
            className="trademind-about-title"
          >
            We are building a smarter way to understand the markets.
            
            <span className="trademind-about-subtitle">
              Technology that helps traders and investors make more informed decisions.
            </span>
          </h1>

        </div>
      </div>

      {/* Divider */}
      <div className="row mb-5">
        <div className="col-12 col-lg-10 mx-auto">
          <div className="trademind-about-divider">
            <span />
          </div>
        </div>
      </div>

      {/* Body Content Section */}
      <div className="row gy-4 gx-lg-5 justify-content-center">

        {/* Column 1 */}
        <div className="col-12 col-md-5">

          <div className="trademind-about-column">

            <div className="trademind-about-number">
              01
            </div>

            <div>
              <p className="trademind-about-text">
                TradeMind AI was built with a simple goal: make the
                trading experience more intelligent, accessible, and
                easier to understand for modern traders and investors.
              </p>

              <p className="trademind-about-text">
                Markets generate enormous amounts of information every
                day. Our platform brings market data, portfolio insights,
                analytics, and intelligent tools together in one
                streamlined experience.
              </p>

              <p className="trademind-about-text mb-0">
                Instead of overwhelming users with unnecessary
                complexity, TradeMind AI focuses on presenting useful
                information in a clear and actionable way.
              </p>
            </div>

          </div>

        </div>

        {/* Column 2 */}
        <div className="col-12 col-md-5">

          <div className="trademind-about-column">

            <div className="trademind-about-number">
              02
            </div>

            <div>
              <p className="trademind-about-text">
                Our ecosystem is designed around the complete trading
                journey — from discovering market opportunities to
                tracking portfolios and understanding risk.
              </p>

              <p className="trademind-about-text">
                We are also focused on learning and responsible
                decision-making. Better technology should not replace
                the investor's judgement; it should help investors
                understand the information available to them.
              </p>

              <p className="trademind-about-text mb-0">
                And this is only the beginning. TradeMind AI is
                continuously evolving with new tools, intelligent
                capabilities, and a stronger focus on the future of
                digital investing.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Highlights */}
      <div className="row justify-content-center mt-5 pt-lg-4">
        <div className="col-12 col-lg-10">

          <div className="trademind-about-highlights">

            <div className="trademind-about-highlight">
              <div className="highlight-icon">
                <i className="fa-solid fa-brain" />
              </div>

              <div>
                <strong>AI-powered insights</strong>
                <span>
                  Understand market information more intelligently.
                </span>
              </div>
            </div>

            <div className="trademind-about-highlight">
              <div className="highlight-icon">
                <i className="fa-solid fa-chart-line" />
              </div>

              <div>
                <strong>Market intelligence</strong>
                <span>
                  Turn complex market data into useful insights.
                </span>
              </div>
            </div>

            <div className="trademind-about-highlight">
              <div className="highlight-icon">
                <i className="fa-solid fa-shield-halved" />
              </div>

              <div>
                <strong>Responsible technology</strong>
                <span>
                  Technology designed to support better decisions.
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`

        /* =========================================
           ABOUT HERO
        ========================================= */

        .trademind-about-hero {
          position: relative;
          overflow: hidden;
        }

        .trademind-about-hero::before {
          content: "";

          position: absolute;

          width: 420px;
          height: 420px;

          top: -180px;
          left: 50%;

          transform: translateX(-50%);

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(67, 97, 238, 0.08),
              transparent 70%
            );

          pointer-events: none;
        }

        /* =========================================
           EYEBROW
        ========================================= */

        .trademind-about-eyebrow {
          position: relative;

          display: inline-flex;
          align-items: center;

          padding: 7px 13px;
          margin-bottom: 18px;

          border:
            1px solid
            rgba(67, 97, 238, 0.14);

          border-radius: 999px;

          background:
            rgba(67, 97, 238, 0.055);

          color: #4361ee;

          font-size: 0.68rem;
          font-weight: 700;

          letter-spacing: 0.12em;
          text-transform: uppercase;

          animation:
            trademindAboutFadeUp
            0.7s
            ease
            both;
        }

        /* =========================================
           TITLE
        ========================================= */

        .trademind-about-title {
          position: relative;

          margin: 0;

          color: #424242;

          font-size: clamp(
            2rem,
            4vw,
            3rem
          );

          font-weight: 500;

          line-height: 1.25;

          letter-spacing: -0.025em;

          animation:
            trademindAboutFadeUp
            0.7s
            ease
            0.08s
            both;
        }

        .trademind-about-subtitle {
          display: block;

          max-width: 760px;

          margin:
            16px
            auto
            0;

          color: #666666;

          font-size: clamp(
            1.1rem,
            2.2vw,
            1.45rem
          );

          font-weight: 400;

          line-height: 1.6;
        }

        /* =========================================
           DIVIDER
        ========================================= */

        .trademind-about-divider {
          position: relative;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              #e0e0e0 20%,
              #e0e0e0 80%,
              transparent
            );
        }

        .trademind-about-divider span {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 55px;
          height: 3px;

          transform:
            translate(-50%, -50%);

          border-radius: 999px;

          background:
            linear-gradient(
              90deg,
              #4361ee,
              #6366f1
            );

          animation:
            trademindDividerGrow
            1s
            ease
            0.35s
            both;
        }

        /* =========================================
           BODY COLUMNS
        ========================================= */

        .trademind-about-column {
          display: grid;

          grid-template-columns:
            38px
            1fr;

          gap: 17px;

          animation:
            trademindAboutFadeUp
            0.7s
            ease
            both;
        }

        .col-md-5:nth-child(1)
        .trademind-about-column {
          animation-delay: 0.15s;
        }

        .col-md-5:nth-child(2)
        .trademind-about-column {
          animation-delay: 0.25s;
        }

        .trademind-about-number {
          width: 34px;
          height: 34px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background: #f1f5ff;

          color: #4361ee;

          font-size: 0.68rem;
          font-weight: 700;
        }

        .trademind-about-text {
          margin-bottom: 22px;

          color: #666666;

          font-size: 0.98rem;

          line-height: 1.85;
        }

        .trademind-about-text:first-child {
          color: #475569;
        }

        /* =========================================
           HIGHLIGHTS
        ========================================= */

        .trademind-about-highlights {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 14px;

          padding: 18px;

          border:
            1px solid
            rgba(15,23,42,0.07);

          border-radius: 18px;

          background:
            linear-gradient(
              135deg,
              #ffffff,
              #f8fafc
            );

          box-shadow:
            0 12px 35px
            rgba(15,23,42,0.045);

          animation:
            trademindAboutFadeUp
            0.7s
            ease
            0.4s
            both;
        }

        .trademind-about-highlight {
          display: flex;
          align-items: flex-start;

          gap: 12px;

          padding: 13px;

          border-radius: 12px;

          transition:
            transform 0.3s ease,
            background 0.3s ease;
        }

        .trademind-about-highlight:hover {
          transform:
            translateY(-4px);

          background:
            rgba(67,97,238,0.035);
        }

        .highlight-icon {
          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 10px;

          background: #eef2ff;

          color: #4361ee;

          font-size: 0.8rem;

          transition:
            transform 0.3s ease;
        }

        .trademind-about-highlight:hover
        .highlight-icon {
          transform:
            rotate(-5deg)
            scale(1.05);
        }

        .trademind-about-highlight strong {
          display: block;

          margin-bottom: 4px;

          color: #1e293b;

          font-size: 0.78rem;
        }

        .trademind-about-highlight span {
          display: block;

          color: #94a3b8;

          font-size: 0.68rem;

          line-height: 1.5;
        }

        /* =========================================
           ANIMATIONS
        ========================================= */

        @keyframes trademindAboutFadeUp {
          from {
            opacity: 0;

            transform:
              translateY(18px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }
        }

        @keyframes trademindDividerGrow {
          from {
            width: 0;
            opacity: 0;
          }

          to {
            width: 55px;
            opacity: 1;
          }
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 991.98px) {
          .trademind-about-title {
            font-size: 2.25rem;
          }

          .trademind-about-highlights {
            grid-template-columns:
              repeat(2, 1fr);
          }
        }

        @media (max-width: 767.98px) {
          .trademind-about-hero {
            padding-top: 35px !important;
            padding-bottom: 50px !important;
          }

          .trademind-about-title {
            font-size: 2rem;
          }

          .trademind-about-subtitle {
            font-size: 1.05rem;
          }

          .trademind-about-column {
            grid-template-columns:
              32px
              1fr;

            gap: 13px;
          }

          .trademind-about-text {
            font-size: 0.92rem;
            line-height: 1.75;
          }

          .trademind-about-highlights {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 575.98px) {
          .trademind-about-title {
            font-size: 1.75rem;
          }

          .trademind-about-subtitle {
            font-size: 0.98rem;
          }

          .trademind-about-eyebrow {
            font-size: 0.6rem;
          }

          .trademind-about-highlights {
            padding: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trademind-about-eyebrow,
          .trademind-about-title,
          .trademind-about-column,
          .trademind-about-highlights,
          .trademind-about-divider span {
            animation: none;
          }

          .trademind-about-highlight,
          .highlight-icon {
            transition: none;
          }
        }

      `}</style>
    </section>
  );
}

export default Hero;