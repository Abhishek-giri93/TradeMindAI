import React from "react";

function Awards() {
  return (
    <section className="tm-awards-section">
      <div className="tm-awards-container">

        <div className="tm-awards-grid">

          {/* =========================================
              VISUAL
          ========================================== */}
          <div className="tm-awards-visual">

            <div className="tm-awards-orbit tm-awards-orbit--one"></div>
            <div className="tm-awards-orbit tm-awards-orbit--two"></div>

            {/* Main AI Analytics Card */}
            <div className="tm-awards-dashboard">

              <div className="tm-awards-dashboard-header">
                <div>
                  <span>TradeMind AI</span>
                  <strong>Market Intelligence</strong>
                </div>

                <div className="tm-awards-ai-badge">
                  <i
                    className="fa-solid fa-brain"
                    aria-hidden="true"
                  />
                  AI
                </div>
              </div>

              {/* Market Score */}
              <div className="tm-awards-score">

                <div className="tm-awards-score-ring">
                  <div className="tm-awards-score-inner">
                    <strong>84</strong>
                    <span>/100</span>
                  </div>
                </div>

                <div className="tm-awards-score-info">
                  <span>Market outlook</span>
                  <strong>Bullish</strong>
                  <small>
                    AI confidence is strong
                  </small>
                </div>

              </div>

              {/* Analytics Rows */}
              <div className="tm-awards-metrics">

                <div className="tm-awards-metric">
                  <span>
                    <i
                      className="fa-solid fa-chart-line"
                      aria-hidden="true"
                    />
                    Momentum
                  </span>
                  <strong className="positive">
                    +12.8%
                  </strong>
                </div>

                <div className="tm-awards-metric">
                  <span>
                    <i
                      className="fa-solid fa-chart-simple"
                      aria-hidden="true"
                    />
                    Volume
                  </span>
                  <strong>
                    High
                  </strong>
                </div>

                <div className="tm-awards-metric">
                  <span>
                    <i
                      className="fa-solid fa-shield-halved"
                      aria-hidden="true"
                    />
                    Risk
                  </span>
                  <strong>
                    Moderate
                  </strong>
                </div>

              </div>

            </div>

            {/* Floating AI Card */}
            <div className="tm-awards-floating-card">

              <div className="tm-awards-floating-icon">
                <i
                  className="fa-solid fa-wand-magic-sparkles"
                  aria-hidden="true"
                />
              </div>

              <div>
                <span>AI Insight</span>
                <strong>
                  Opportunity detected
                </strong>
              </div>

              <i
                className="fa-solid fa-check"
                aria-hidden="true"
              />

            </div>

          </div>

          {/* =========================================
              CONTENT
          ========================================== */}
          <div className="tm-awards-content">

            <p className="tm-awards-eyebrow">
              Why TradeMind AI
            </p>

            <h2>
              Everything you need to make
              <span> smarter decisions.</span>
            </h2>

            <p className="tm-awards-copy">
              TradeMind AI combines powerful trading tools,
              intelligent market insights, and portfolio
              analytics into one seamless experience built
              for modern investors.
            </p>

            {/* Feature List */}
            <div className="tm-awards-feature-grid">

              <div className="tm-awards-feature">
                <div className="tm-awards-feature-icon">
                  <i
                    className="fa-solid fa-brain"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h3>AI-powered insights</h3>
                  <p>
                    Understand market trends and discover
                    meaningful signals with intelligent
                    analysis.
                  </p>
                </div>
              </div>

              <div className="tm-awards-feature">
                <div className="tm-awards-feature-icon">
                  <i
                    className="fa-solid fa-chart-pie"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h3>Portfolio intelligence</h3>
                  <p>
                    Track your investments, performance,
                    allocation, and overall portfolio health.
                  </p>
                </div>
              </div>

              <div className="tm-awards-feature">
                <div className="tm-awards-feature-icon">
                  <i
                    className="fa-solid fa-bolt"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h3>Fast trading experience</h3>
                  <p>
                    Access your watchlist, orders, funds,
                    holdings, and positions from one platform.
                  </p>
                </div>
              </div>

              <div className="tm-awards-feature">
                <div className="tm-awards-feature-icon">
                  <i
                    className="fa-solid fa-shield-halved"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h3>Built with security in mind</h3>
                  <p>
                    A modern platform designed around secure
                    access and responsible trading.
                  </p>
                </div>
              </div>

            </div>

            {/* CTA */}
            <a
              href="/products"
              className="tm-awards-link"
            >
              Explore the platform
              <span>
                <i
                  className="fa-solid fa-arrow-right"
                  aria-hidden="true"
                />
              </span>
            </a>

          </div>
        </div>

        {/* =========================================
            MARKET CAPABILITIES
        ========================================== */}
        <div className="tm-awards-capabilities">

          <div className="tm-awards-capability-heading">
            <span>One platform</span>
            <strong>
              Multiple ways to participate in the market
            </strong>
          </div>

          <div className="tm-awards-capability-list">

            <div className="tm-awards-capability">
              <i
                className="fa-solid fa-arrow-trend-up"
                aria-hidden="true"
              />
              <span>Stocks</span>
            </div>

            <div className="tm-awards-capability">
              <i
                className="fa-solid fa-layer-group"
                aria-hidden="true"
              />
              <span>ETFs</span>
            </div>

            <div className="tm-awards-capability">
              <i
                className="fa-solid fa-chart-column"
                aria-hidden="true"
              />
              <span>Derivatives</span>
            </div>

            <div className="tm-awards-capability">
              <i
                className="fa-solid fa-coins"
                aria-hidden="true"
              />
              <span>Mutual Funds</span>
            </div>

            <div className="tm-awards-capability">
              <i
                className="fa-solid fa-building-columns"
                aria-hidden="true"
              />
              <span>Bonds</span>
            </div>

            <div className="tm-awards-capability">
              <i
                className="fa-solid fa-chart-line"
                aria-hidden="true"
              />
              <span>Market Analytics</span>
            </div>

          </div>
        </div>

      </div>

      {/* =========================================
          STYLES
      ========================================== */}
      <style>
        {`
          .tm-awards-section {
            position: relative;
            width: 100%;
            overflow: hidden;
            background: #ffffff;
            padding:
              clamp(80px, 9vw, 130px)
              0;
          }

          .tm-awards-container {
            width: 100%;
            max-width: 1500px;
            margin: 0 auto;
            padding-left: clamp(24px, 5vw, 90px);
            padding-right: clamp(24px, 5vw, 90px);
          }

          .tm-awards-grid {
            display: grid;
            grid-template-columns:
              minmax(430px, 0.95fr)
              minmax(480px, 1.05fr);
            align-items: center;
            gap: clamp(60px, 8vw, 130px);
          }

          /* =========================================
              VISUAL
          ========================================== */

          .tm-awards-visual {
            position: relative;
            min-height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .tm-awards-dashboard {
            position: relative;
            z-index: 2;
            width: min(100%, 520px);
            padding: 26px;
            border: 1px solid #e2e8f0;
            border-radius: 22px;
            background:
              linear-gradient(
                145deg,
                #ffffff,
                #f8fafc
              );
            box-shadow:
              0 30px 70px rgba(15, 23, 42, 0.10),
              0 8px 25px rgba(37, 99, 235, 0.06);
            animation:
              tmAwardsDashboardFloat
              6s
              ease-in-out
              infinite;
          }

          .tm-awards-dashboard-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 20px;
            padding-bottom: 22px;
            border-bottom: 1px solid #e2e8f0;
          }

          .tm-awards-dashboard-header span {
            display: block;
            color: #94a3b8;
            font-size: 11px;
            font-weight: 600;
            margin-bottom: 5px;
          }

          .tm-awards-dashboard-header strong {
            display: block;
            color: #172554;
            font-size: 17px;
          }

          .tm-awards-ai-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 7px 10px;
            border-radius: 8px;
            background: #eff6ff;
            color: #2563eb;
            font-size: 11px;
            font-weight: 700;
          }

          /* Score */

          .tm-awards-score {
            display: flex;
            align-items: center;
            gap: 24px;
            padding: 28px 0;
          }

          .tm-awards-score-ring {
            width: 118px;
            height: 118px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background:
              conic-gradient(
                #2563eb 0deg 302deg,
                #e2e8f0 302deg 360deg
              );
            position: relative;
          }

          .tm-awards-score-ring::before {
            content: "";
            position: absolute;
            inset: 9px;
            border-radius: 50%;
            background: #ffffff;
          }

          .tm-awards-score-inner {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: baseline;
          }

          .tm-awards-score-inner strong {
            color: #172554;
            font-size: 30px;
            font-weight: 750;
          }

          .tm-awards-score-inner span {
            color: #94a3b8;
            font-size: 12px;
          }

          .tm-awards-score-info span {
            display: block;
            color: #94a3b8;
            font-size: 11px;
            margin-bottom: 5px;
          }

          .tm-awards-score-info strong {
            display: block;
            color: #16a34a;
            font-size: 20px;
            margin-bottom: 5px;
          }

          .tm-awards-score-info small {
            color: #64748b;
            font-size: 11px;
          }

          /* Metrics */

          .tm-awards-metrics {
            display: grid;
            gap: 2px;
            padding-top: 8px;
          }

          .tm-awards-metric {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 0;
            border-top: 1px solid #f1f5f9;
          }

          .tm-awards-metric span {
            display: flex;
            align-items: center;
            gap: 9px;
            color: #64748b;
            font-size: 12px;
          }

          .tm-awards-metric span i {
            width: 25px;
            color: #2563eb;
            text-align: center;
          }

          .tm-awards-metric strong {
            color: #334155;
            font-size: 12px;
          }

          .tm-awards-metric strong.positive {
            color: #16a34a;
          }

          /* Floating card */

          .tm-awards-floating-card {
            position: absolute;
            z-index: 4;
            right: -15px;
            bottom: 42px;
            display: flex;
            align-items: center;
            gap: 11px;
            padding: 13px 15px;
            border: 1px solid #e2e8f0;
            border-radius: 13px;
            background: rgba(255,255,255,0.96);
            box-shadow:
              0 15px 35px rgba(15,23,42,0.10);
            backdrop-filter: blur(12px);
            animation:
              tmAwardsFloating
              4.5s
              ease-in-out
              infinite;
          }

          .tm-awards-floating-icon {
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 9px;
            background: #f5f3ff;
            color: #7c3aed;
          }

          .tm-awards-floating-card span {
            display: block;
            color: #94a3b8;
            font-size: 9px;
          }

          .tm-awards-floating-card strong {
            display: block;
            margin-top: 2px;
            color: #172554;
            font-size: 11px;
          }

          .tm-awards-floating-card > i {
            margin-left: 8px;
            color: #22c55e;
          }

          .tm-awards-orbit {
            position: absolute;
            border: 1px dashed #dbeafe;
            border-radius: 50%;
            pointer-events: none;
          }

          .tm-awards-orbit--one {
            width: 430px;
            height: 430px;
            animation:
              tmAwardsOrbit
              18s
              linear
              infinite;
          }

          .tm-awards-orbit--two {
            width: 580px;
            height: 580px;
            border-color: #eff6ff;
            animation:
              tmAwardsOrbit
              24s
              linear
              infinite
              reverse;
          }

          /* =========================================
              CONTENT
          ========================================== */

          .tm-awards-content {
            max-width: 650px;
          }

          .tm-awards-eyebrow {
            margin: 0 0 16px;
            color: #2563eb;
            font-size: 13px;
            font-weight: 750;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .tm-awards-content h2 {
            margin: 0;
            color: #172554;
            font-size: clamp(34px, 4vw, 52px);
            line-height: 1.12;
            letter-spacing: -2px;
            font-weight: 750;
          }

          .tm-awards-content h2 span {
            color: #2563eb;
          }

          .tm-awards-copy {
            max-width: 600px;
            margin: 24px 0 32px;
            color: #64748b;
            font-size: 16px;
            line-height: 1.8;
          }

          /* Features */

          .tm-awards-feature-grid {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .tm-awards-feature {
            display: flex;
            align-items: flex-start;
            gap: 13px;
            padding: 17px;
            border: 1px solid #eef2f7;
            border-radius: 13px;
            background: #ffffff;
            transition:
              transform 0.25s ease,
              border-color 0.25s ease,
              box-shadow 0.25s ease;
          }

          .tm-awards-feature:hover {
            transform: translateY(-4px);
            border-color: #dbeafe;
            box-shadow:
              0 12px 28px rgba(15,23,42,0.06);
          }

          .tm-awards-feature-icon {
            width: 37px;
            height: 37px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 9px;
            background: #eff6ff;
            color: #2563eb;
            font-size: 13px;
          }

          .tm-awards-feature h3 {
            margin: 1px 0 6px;
            color: #172554;
            font-size: 13px;
            font-weight: 700;
          }

          .tm-awards-feature p {
            margin: 0;
            color: #94a3b8;
            font-size: 11px;
            line-height: 1.65;
          }

          .tm-awards-link {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            margin-top: 32px;
            color: #2563eb;
            text-decoration: none;
            font-size: 14px;
            font-weight: 700;
          }

          .tm-awards-link span {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            background: #eff6ff;
            transition:
              transform 0.2s ease,
              background 0.2s ease;
          }

          .tm-awards-link:hover {
            color: #1d4ed8;
          }

          .tm-awards-link:hover span {
            transform: translateX(4px);
            background: #dbeafe;
          }

          /* =========================================
              CAPABILITIES
          ========================================== */

          .tm-awards-capabilities {
            margin-top: 100px;
            padding: 30px 0 0;
            border-top: 1px solid #e2e8f0;
            display: grid;
            grid-template-columns:
              minmax(220px, 0.7fr)
              minmax(500px, 1.8fr);
            gap: 50px;
            align-items: center;
          }

          .tm-awards-capability-heading span {
            display: block;
            margin-bottom: 7px;
            color: #2563eb;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.8px;
          }

          .tm-awards-capability-heading strong {
            display: block;
            color: #172554;
            font-size: 18px;
            line-height: 1.4;
          }

          .tm-awards-capability-list {
            display: grid;
            grid-template-columns:
              repeat(3, 1fr);
            gap: 12px;
          }

          .tm-awards-capability {
            display: flex;
            align-items: center;
            gap: 9px;
            padding: 13px;
            border: 1px solid #eef2f7;
            border-radius: 10px;
            color: #64748b;
            font-size: 11px;
            font-weight: 600;
            transition:
              transform 0.2s ease,
              border-color 0.2s ease,
              color 0.2s ease;
          }

          .tm-awards-capability i {
            color: #2563eb;
          }

          .tm-awards-capability:hover {
            transform: translateY(-2px);
            border-color: #bfdbfe;
            color: #2563eb;
          }

          /* =========================================
              ANIMATIONS
          ========================================== */

          @keyframes tmAwardsDashboardFloat {
            0%, 100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-7px);
            }
          }

          @keyframes tmAwardsFloating {
            0%, 100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-9px);
            }
          }

          @keyframes tmAwardsOrbit {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          /* =========================================
              RESPONSIVE
          ========================================== */

          @media (max-width: 1199.98px) {
            .tm-awards-grid {
              gap: 60px;
            }

            .tm-awards-floating-card {
              right: -5px;
            }
          }

          @media (max-width: 991.98px) {
            .tm-awards-grid {
              grid-template-columns: 1fr;
            }

            .tm-awards-content {
              max-width: 760px;
              margin: 0 auto;
            }

            .tm-awards-visual {
              min-height: 480px;
            }

            .tm-awards-capabilities {
              grid-template-columns: 1fr;
              gap: 30px;
            }
          }

          @media (max-width: 650px) {
            .tm-awards-section {
              padding:
                70px 0;
            }

            .tm-awards-feature-grid {
              grid-template-columns: 1fr;
            }

            .tm-awards-capability-list {
              grid-template-columns:
                repeat(2, 1fr);
            }

            .tm-awards-dashboard {
              padding: 20px;
            }

            .tm-awards-floating-card {
              right: -10px;
              bottom: 20px;
              transform: scale(0.9);
            }

            .tm-awards-orbit--one {
              width: 360px;
              height: 360px;
            }

            .tm-awards-orbit--two {
              width: 470px;
              height: 470px;
            }
          }

          @media (max-width: 480px) {
            .tm-awards-container {
              padding-left: 18px;
              padding-right: 18px;
            }

            .tm-awards-visual {
              min-height: 400px;
            }

            .tm-awards-score {
              gap: 15px;
            }

            .tm-awards-score-ring {
              width: 95px;
              height: 95px;
            }

            .tm-awards-score-inner strong {
              font-size: 24px;
            }

            .tm-awards-capability-list {
              grid-template-columns: 1fr;
            }

            .tm-awards-floating-card {
              transform: scale(0.78);
              right: -28px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .tm-awards-section *,
            .tm-awards-section *::before,
            .tm-awards-section *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>
    </section>
  );
}

export default Awards;