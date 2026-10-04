import React from "react";

const pricingItems = [
  [
    "₹0",
    "Account opening",
    "Create your TradeMind AI account with no platform opening fee.",
    "Free to start",
  ],
  [
    "₹0",
    "Equity delivery",
    "Track and manage long-term investments with a simple, transparent experience.",
    "Long-term investing",
  ],
  [
    "₹20",
    "Intraday & F&O",
    "A simple flat-fee model for eligible executed orders.",
    "Flat-fee pricing",
  ],
];

function Pricing() {
  return (
    <section className="tm-pricing-section">
      <div className="tm-pricing-container">

        {/* =========================================
            HEADER / INTRO
        ========================================== */}
        <div className="tm-pricing-header">

          <div className="tm-pricing-intro">

            <div className="tm-pricing-eyebrow">
              <span></span>
              Simple, transparent pricing
            </div>

            <h2>
              More clarity.
              <br />
              <span>Less complexity.</span>
            </h2>

            <p>
              TradeMind AI is designed around transparent
              pricing, so you can understand what you're
              paying before you trade or invest.
            </p>

            <a
              className="tm-pricing-link"
              href="/pricing"
            >
              View complete pricing

              <span>
                <i
                  className="fa-solid fa-arrow-right"
                  aria-hidden="true"
                />
              </span>
            </a>

          </div>

          {/* Pricing Philosophy */}
          <div className="tm-pricing-philosophy">

            <div className="tm-pricing-philosophy-icon">
              <i
                className="fa-solid fa-receipt"
                aria-hidden="true"
              />
            </div>

            <div>
              <strong>No confusing fee structure</strong>

              <p>
                Know the applicable charges before placing
                an order.
              </p>
            </div>

            <i
              className="fa-solid fa-check"
              aria-hidden="true"
            />

          </div>
        </div>

        {/* =========================================
            PRICING CARDS
        ========================================== */}
        <div className="tm-pricing-cards">

          {pricingItems.map(
            ([amount, title, description, label], index) => (
              <article
                className={`tm-pricing-card ${
                  index === 1
                    ? "tm-pricing-card--featured"
                    : ""
                }`}
                key={title}
              >

                {/* Card Top */}
                <div className="tm-pricing-card-top">

                  <span className="tm-pricing-card-number">
                    0{index + 1}
                  </span>

                  <span className="tm-pricing-card-label">
                    {label}
                  </span>

                </div>

                {/* Amount */}
                <div className="tm-pricing-amount">
                  {amount}
                  {index === 2 && (
                    <small> / order</small>
                  )}
                </div>

                {/* Title */}
                <h3>{title}</h3>

                {/* Description */}
                <p>{description}</p>

                {/* Bottom */}
                <div className="tm-pricing-card-footer">

                  <span>
                    <i
                      className="fa-solid fa-circle-check"
                      aria-hidden="true"
                    />
                    Transparent pricing
                  </span>

                  <i
                    className="fa-solid fa-arrow-up-right-from-square"
                    aria-hidden="true"
                  />

                </div>

              </article>
            )
          )}

        </div>

        {/* =========================================
            BOTTOM NOTE
        ========================================== */}
        <div className="tm-pricing-note">

          <div className="tm-pricing-note-left">

            <div className="tm-pricing-note-icon">
              <i
                className="fa-solid fa-shield-halved"
                aria-hidden="true"
              />
            </div>

            <div>
              <strong>
                Transparent by design
              </strong>

              <p>
                Applicable taxes, exchange charges,
                regulatory charges, and other statutory
                fees may apply where relevant.
              </p>
            </div>

          </div>

          <a href="/pricing">
            Full pricing details
            <i
              className="fa-solid fa-arrow-right"
              aria-hidden="true"
            />
          </a>

        </div>

      </div>

      {/* =========================================
          STYLES
      ========================================== */}
      <style>
        {`
          .tm-pricing-section {
            position: relative;
            width: 100%;
            overflow: hidden;
            background: #ffffff;
            padding:
              clamp(80px, 9vw, 125px) 0;
          }

          .tm-pricing-container {
            width: 100%;
            max-width: 1500px;
            margin: 0 auto;
            padding-left: clamp(24px, 5vw, 90px);
            padding-right: clamp(24px, 5vw, 90px);
          }

          /* =========================================
              HEADER
          ========================================== */

          .tm-pricing-header {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 50px;
            margin-bottom: 48px;
          }

          .tm-pricing-intro {
            max-width: 650px;
          }

          .tm-pricing-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
            color: #2563eb;
            font-size: 12px;
            font-weight: 750;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .tm-pricing-eyebrow span {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #2563eb;
            box-shadow:
              0 0 0 5px rgba(37,99,235,0.09);
          }

          .tm-pricing-intro h2 {
            margin: 0;
            color: #172554;
            font-size: clamp(36px, 4vw, 54px);
            line-height: 1.08;
            letter-spacing: -2px;
            font-weight: 750;
          }

          .tm-pricing-intro h2 span {
            color: #2563eb;
          }

          .tm-pricing-intro > p {
            max-width: 590px;
            margin: 22px 0 25px;
            color: #64748b;
            font-size: 15px;
            line-height: 1.8;
          }

          .tm-pricing-link {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            color: #2563eb;
            text-decoration: none;
            font-size: 13px;
            font-weight: 700;
          }

          .tm-pricing-link span {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            background: #eff6ff;
            transition:
              transform 0.2s ease,
              background 0.2s ease;
          }

          .tm-pricing-link:hover {
            color: #1d4ed8;
          }

          .tm-pricing-link:hover span {
            transform: translateX(4px);
            background: #dbeafe;
          }

          /* =========================================
              PHILOSOPHY
          ========================================== */

          .tm-pricing-philosophy {
            min-width: 300px;
            max-width: 370px;
            display: flex;
            align-items: center;
            gap: 13px;
            padding: 16px 18px;
            border: 1px solid #e2e8f0;
            border-radius: 13px;
            background: #f8fafc;
          }

          .tm-pricing-philosophy-icon {
            width: 40px;
            height: 40px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            background: #eff6ff;
            color: #2563eb;
          }

          .tm-pricing-philosophy > div:nth-child(2) {
            flex: 1;
          }

          .tm-pricing-philosophy strong {
            display: block;
            color: #172554;
            font-size: 12px;
          }

          .tm-pricing-philosophy p {
            margin: 4px 0 0;
            color: #94a3b8;
            font-size: 10px;
            line-height: 1.5;
          }

          .tm-pricing-philosophy > i {
            color: #22c55e;
            font-size: 12px;
          }

          /* =========================================
              CARDS
          ========================================== */

          .tm-pricing-cards {
            display: grid;
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
            gap: 20px;
          }

          .tm-pricing-card {
            position: relative;
            min-height: 300px;
            display: flex;
            flex-direction: column;
            padding: 27px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
            border-radius: 17px;
            background: #ffffff;
            transition:
              transform 0.28s ease,
              border-color 0.28s ease,
              box-shadow 0.28s ease;
          }

          .tm-pricing-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background:
              linear-gradient(
                90deg,
                transparent,
                #2563eb,
                transparent
              );
            opacity: 0;
            transition: opacity 0.28s ease;
          }

          .tm-pricing-card:hover {
            transform: translateY(-7px);
            border-color: #bfdbfe;
            box-shadow:
              0 20px 45px rgba(15,23,42,0.08);
          }

          .tm-pricing-card:hover::before {
            opacity: 1;
          }

          .tm-pricing-card--featured {
            border-color: #bfdbfe;
            background:
              linear-gradient(
                145deg,
                #ffffff,
                #f8fbff
              );
            box-shadow:
              0 12px 30px rgba(37,99,235,0.06);
          }

          .tm-pricing-card--featured::after {
            content: "POPULAR";
            position: absolute;
            top: 20px;
            right: 20px;
            padding: 5px 8px;
            border-radius: 6px;
            background: #eff6ff;
            color: #2563eb;
            font-size: 8px;
            font-weight: 800;
            letter-spacing: 0.6px;
          }

          .tm-pricing-card-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-bottom: 28px;
          }

          .tm-pricing-card-number {
            color: #cbd5e1;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1px;
          }

          .tm-pricing-card-label {
            padding: 5px 8px;
            border-radius: 6px;
            background: #f8fafc;
            color: #64748b;
            font-size: 8px;
            font-weight: 700;
          }

          .tm-pricing-amount {
            color: #172554;
            font-size: 42px;
            line-height: 1;
            letter-spacing: -2px;
            font-weight: 750;
          }

          .tm-pricing-amount small {
            color: #94a3b8;
            font-size: 11px;
            letter-spacing: 0;
            font-weight: 500;
          }

          .tm-pricing-card h3 {
            margin: 15px 0 9px;
            color: #334155;
            font-size: 15px;
            font-weight: 700;
          }

          .tm-pricing-card p {
            margin: 0;
            color: #94a3b8;
            font-size: 11px;
            line-height: 1.7;
          }

          .tm-pricing-card-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-top: auto;
            padding-top: 25px;
          }

          .tm-pricing-card-footer span {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #64748b;
            font-size: 9px;
          }

          .tm-pricing-card-footer span i {
            color: #22c55e;
          }

          .tm-pricing-card-footer > i {
            color: #cbd5e1;
            font-size: 10px;
            transition:
              color 0.2s ease,
              transform 0.2s ease;
          }

          .tm-pricing-card:hover
          .tm-pricing-card-footer > i {
            color: #2563eb;
            transform: translate(2px, -2px);
          }

          /* =========================================
              NOTE
          ========================================== */

          .tm-pricing-note {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 30px;
            margin-top: 25px;
            padding: 18px 20px;
            border: 1px solid #e2e8f0;
            border-radius: 13px;
            background: #f8fafc;
          }

          .tm-pricing-note-left {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .tm-pricing-note-icon {
            width: 37px;
            height: 37px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 9px;
            background: #ffffff;
            color: #2563eb;
          }

          .tm-pricing-note strong {
            display: block;
            color: #334155;
            font-size: 11px;
          }

          .tm-pricing-note p {
            margin: 3px 0 0;
            color: #94a3b8;
            font-size: 9px;
            line-height: 1.5;
          }

          .tm-pricing-note > a {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
            color: #2563eb;
            text-decoration: none;
            font-size: 10px;
            font-weight: 700;
          }

          .tm-pricing-note > a i {
            transition:
              transform 0.2s ease;
          }

          .tm-pricing-note > a:hover {
            color: #1d4ed8;
          }

          .tm-pricing-note > a:hover i {
            transform: translateX(3px);
          }

          /* =========================================
              RESPONSIVE
          ========================================== */

          @media (max-width: 991.98px) {
            .tm-pricing-header {
              align-items: flex-start;
              flex-direction: column;
            }

            .tm-pricing-philosophy {
              max-width: 500px;
              width: 100%;
            }

            .tm-pricing-cards {
              grid-template-columns:
                repeat(2, minmax(0, 1fr));
            }

            .tm-pricing-card:last-child {
              grid-column: 1 / -1;
            }
          }

          @media (max-width: 650px) {
            .tm-pricing-section {
              padding:
                70px 0;
            }

            .tm-pricing-cards {
              grid-template-columns: 1fr;
            }

            .tm-pricing-card:last-child {
              grid-column: auto;
            }

            .tm-pricing-note {
              align-items: flex-start;
              flex-direction: column;
            }

            .tm-pricing-note > a {
              margin-left: 49px;
            }
          }

          @media (max-width: 480px) {
            .tm-pricing-container {
              padding-left: 18px;
              padding-right: 18px;
            }

            .tm-pricing-card {
              min-height: 280px;
              padding: 23px;
            }

            .tm-pricing-philosophy {
              min-width: 0;
            }

            .tm-pricing-note > a {
              margin-left: 0;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .tm-pricing-section *,
            .tm-pricing-section *::before,
            .tm-pricing-section *::after {
              transition-duration: 0.01ms !important;
              animation-duration: 0.01ms !important;
            }
          }
        `}
      </style>
    </section>
  );
}

export default Pricing;