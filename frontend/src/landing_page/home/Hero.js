import React from "react";

function Hero() {
  return (
    <section className="tm-hero">
      <div className="tm-hero__background">
        <div className="tm-hero__glow tm-hero__glow--one"></div>
        <div className="tm-hero__glow tm-hero__glow--two"></div>
        <div className="tm-hero__grid"></div>
      </div>

      <div className="container-fluid tm-hero__container">
        <div className="tm-hero__inner">

          {/* =========================================
              LEFT — HERO CONTENT
          ========================================== */}
          <div className="tm-hero__content">

            <div className="tm-hero__badge">
              <span className="tm-hero__badge-dot"></span>
              AI-powered trading platform
            </div>

            <p className="tm-hero__eyebrow">
              Built for smarter investors
            </p>

            <h1 className="tm-hero__title">
              Trade smarter.
              <br />
              <span>Think beyond the market.</span>
            </h1>

            <p className="tm-hero__description">
              TradeMind AI brings intelligent market insights,
              portfolio tracking, powerful analytics, and
              seamless trading tools together in one modern
              platform.
            </p>

            {/* =========================================
                ACTIONS
            ========================================== */}
            <div className="tm-hero__actions">

              <a
                className="tm-hero__primary-button"
                href="/signup"
              >
                Start trading smarter
                <span>
                  <i
                    className="fa-solid fa-arrow-right"
                    aria-hidden="true"
                  />
                </span>
              </a>

              <a
                className="tm-hero__secondary-button"
                href="/products"
              >
                Explore TradeMind AI
                <i
                  className="fa-solid fa-arrow-up-right-from-square"
                  aria-hidden="true"
                />
              </a>

            </div>

            {/* =========================================
                TRUST / PLATFORM INFO
            ========================================== */}
            <div className="tm-hero__trust">

              <div className="tm-hero__trust-item">
                <i
                  className="fa-solid fa-shield-halved"
                  aria-hidden="true"
                />
                <span>Secure platform</span>
              </div>

              <div className="tm-hero__trust-divider"></div>

              <div className="tm-hero__trust-item">
                <i
                  className="fa-solid fa-bolt"
                  aria-hidden="true"
                />
                <span>Fast execution</span>
              </div>

              <div className="tm-hero__trust-divider"></div>

              <div className="tm-hero__trust-item">
                <i
                  className="fa-solid fa-brain"
                  aria-hidden="true"
                />
                <span>AI-powered insights</span>
              </div>

            </div>
          </div>

          {/* =========================================
              RIGHT — TRADING VISUAL
          ========================================== */}
          <div className="tm-hero__visual">

            {/* Floating top card */}
            <div className="tm-hero__floating-card tm-hero__floating-card--top">

              <div className="tm-hero__floating-icon">
                <i
                  className="fa-solid fa-arrow-trend-up"
                  aria-hidden="true"
                />
              </div>

              <div>
                <span>Market sentiment</span>
                <strong>Bullish</strong>
              </div>

              <span className="tm-hero__sentiment">
                +78%
              </span>
            </div>

            {/* Main dashboard card */}
            <div className="tm-hero__dashboard">

              {/* Dashboard header */}
              <div className="tm-hero__dashboard-header">

                <div>
                  <span className="tm-hero__dashboard-label">
                    Portfolio value
                  </span>

                  <h3>
                    ₹12,84,650
                  </h3>
                </div>

                <div className="tm-hero__profit">
                  <i
                    className="fa-solid fa-arrow-up"
                    aria-hidden="true"
                  />
                  8.42%
                </div>

              </div>

              {/* Chart */}
              <div className="tm-hero__chart">

                <div className="tm-hero__chart-grid"></div>

                <svg
                  viewBox="0 0 600 230"
                  preserveAspectRatio="none"
                  className="tm-hero__chart-svg"
                  aria-label="Portfolio growth chart"
                >
                  <defs>
                    <linearGradient
                      id="tmHeroChartGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#2563eb"
                        stopOpacity="0.28"
                      />
                      <stop
                        offset="100%"
                        stopColor="#2563eb"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    className="tm-hero__chart-area"
                    d="
                      M0 190
                      C45 180 60 165 95 170
                      C130 175 145 135 180 142
                      C215 149 225 120 260 126
                      C295 132 315 92 350 105
                      C385 118 400 78 435 87
                      C470 96 490 58 520 66
                      C550 74 570 42 600 25
                      L600 230
                      L0 230
                      Z
                    "
                  />

                  <path
                    className="tm-hero__chart-line"
                    d="
                      M0 190
                      C45 180 60 165 95 170
                      C130 175 145 135 180 142
                      C215 149 225 120 260 126
                      C295 132 315 92 350 105
                      C385 118 400 78 435 87
                      C470 96 490 58 520 66
                      C550 74 570 42 600 25
                    "
                  />

                  <circle
                    cx="600"
                    cy="25"
                    r="6"
                    className="tm-hero__chart-point"
                  />
                </svg>

              </div>

              {/* Chart footer */}
              <div className="tm-hero__chart-footer">

                <span>1D</span>
                <span>1W</span>
                <span className="active">1M</span>
                <span>1Y</span>
                <span>All</span>

              </div>

            </div>

            {/* Floating bottom card */}
            <div className="tm-hero__floating-card tm-hero__floating-card--bottom">

              <div className="tm-hero__ai-icon">
                <i
                  className="fa-solid fa-wand-magic-sparkles"
                  aria-hidden="true"
                />
              </div>

              <div>
                <span>TradeMind AI</span>
                <strong>AI insight generated</strong>
              </div>

              <i
                className="fa-solid fa-check"
                aria-hidden="true"
              />

            </div>

            {/* Decorative dots */}
            <div className="tm-hero__decorative-dot tm-hero__decorative-dot--one"></div>
            <div className="tm-hero__decorative-dot tm-hero__decorative-dot--two"></div>

          </div>
        </div>

        {/* =========================================
            BOTTOM STATS
        ========================================== */}
        <div className="tm-hero__stats">

          <div className="tm-hero__stat">
            <strong>25+</strong>
            <span>Trading instruments</span>
          </div>

          <div className="tm-hero__stat-divider"></div>

          <div className="tm-hero__stat">
            <strong>AI</strong>
            <span>Powered market intelligence</span>
          </div>

          <div className="tm-hero__stat-divider"></div>

          <div className="tm-hero__stat">
            <strong>24×7</strong>
            <span>Portfolio visibility</span>
          </div>

          <div className="tm-hero__stat-divider"></div>

          <div className="tm-hero__stat">
            <strong>1</strong>
            <span>Unified trading platform</span>
          </div>

        </div>
      </div>

      {/* =========================================
          HERO STYLES
      ========================================== */}
      <style>
        {`
          .tm-hero {
            position: relative;
            width: 100%;
            min-height: 720px;
            overflow: hidden;
            background:
              linear-gradient(
                135deg,
                #f8fbff 0%,
                #ffffff 45%,
                #f4f8ff 100%
              );
            color: #172554;
          }

          .tm-hero__background {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .tm-hero__grid {
            position: absolute;
            inset: 0;
            opacity: 0.35;
            background-image:
              linear-gradient(
                rgba(37, 99, 235, 0.035) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(37, 99, 235, 0.035) 1px,
                transparent 1px
              );
            background-size: 55px 55px;
          }

          .tm-hero__glow {
            position: absolute;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            filter: blur(90px);
            opacity: 0.12;
            animation: tmHeroGlow 8s ease-in-out infinite alternate;
          }

          .tm-hero__glow--one {
            top: -250px;
            right: 5%;
            background: #2563eb;
          }

          .tm-hero__glow--two {
            bottom: -300px;
            left: 5%;
            background: #60a5fa;
            animation-delay: 2s;
          }

          .tm-hero__container {
            position: relative;
            z-index: 2;
            width: 100%;
            padding-left: clamp(24px, 5vw, 90px);
            padding-right: clamp(24px, 5vw, 90px);
          }

          .tm-hero__inner {
            width: 100%;
            max-width: 1500px;
            min-height: 650px;
            margin: 0 auto;
            display: grid;
            grid-template-columns:
              minmax(420px, 0.9fr)
              minmax(500px, 1.1fr);
            align-items: center;
            gap: clamp(50px, 7vw, 120px);
            padding-top: 70px;
            padding-bottom: 45px;
          }

          /* Content */

          .tm-hero__content {
            max-width: 650px;
            animation: tmHeroContentIn 0.8s ease-out both;
          }

          .tm-hero__badge {
            display: inline-flex;
            align-items: center;
            gap: 9px;
            padding: 8px 14px;
            margin-bottom: 22px;
            border: 1px solid #dbeafe;
            border-radius: 999px;
            background: rgba(239, 246, 255, 0.8);
            color: #1d4ed8;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.3px;
          }

          .tm-hero__badge-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #22c55e;
            box-shadow:
              0 0 0 4px rgba(34, 197, 94, 0.12);
            animation: tmPulse 2s infinite;
          }

          .tm-hero__eyebrow {
            margin: 0 0 14px;
            color: #2563eb;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .tm-hero__title {
            margin: 0;
            color: #172554;
            font-size: clamp(44px, 5vw, 72px);
            line-height: 1.03;
            letter-spacing: -3px;
            font-weight: 750;
          }

          .tm-hero__title span {
            color: #2563eb;
          }

          .tm-hero__description {
            max-width: 610px;
            margin: 28px 0 0;
            color: #64748b;
            font-size: clamp(16px, 1.3vw, 19px);
            line-height: 1.75;
          }

          /* Actions */

          .tm-hero__actions {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
            margin-top: 34px;
          }

          .tm-hero__primary-button {
            display: inline-flex;
            align-items: center;
            gap: 16px;
            min-height: 52px;
            padding: 0 7px 0 22px;
            border-radius: 12px;
            background:
              linear-gradient(
                135deg,
                #2563eb,
                #1d4ed8
              );
            color: #ffffff;
            text-decoration: none;
            font-size: 14px;
            font-weight: 700;
            box-shadow:
              0 12px 25px rgba(37, 99, 235, 0.20);
            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease;
          }

          .tm-hero__primary-button span {
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 9px;
            background: rgba(255,255,255,0.14);
          }

          .tm-hero__primary-button:hover {
            color: #ffffff;
            transform: translateY(-3px);
            box-shadow:
              0 17px 32px rgba(37, 99, 235, 0.28);
          }

          .tm-hero__primary-button:hover i {
            transform: translateX(3px);
          }

          .tm-hero__primary-button i {
            transition: transform 0.25s ease;
          }

          .tm-hero__secondary-button {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            min-height: 52px;
            padding: 0 20px;
            border-radius: 12px;
            color: #334155;
            text-decoration: none;
            font-size: 14px;
            font-weight: 650;
            border: 1px solid #e2e8f0;
            background: rgba(255,255,255,0.7);
            transition:
              color 0.2s ease,
              border-color 0.2s ease,
              transform 0.2s ease;
          }

          .tm-hero__secondary-button:hover {
            color: #2563eb;
            border-color: #bfdbfe;
            transform: translateY(-2px);
          }

          /* Trust */

          .tm-hero__trust {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 14px;
            margin-top: 36px;
          }

          .tm-hero__trust-item {
            display: flex;
            align-items: center;
            gap: 7px;
            color: #64748b;
            font-size: 12px;
            font-weight: 550;
          }

          .tm-hero__trust-item i {
            color: #2563eb;
          }

          .tm-hero__trust-divider {
            width: 1px;
            height: 17px;
            background: #cbd5e1;
          }

          /* Visual */

          .tm-hero__visual {
            position: relative;
            min-height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: tmHeroVisualIn 0.9s 0.15s ease-out both;
          }

          .tm-hero__dashboard {
            position: relative;
            z-index: 3;
            width: min(100%, 610px);
            padding: 24px;
            border: 1px solid rgba(255,255,255,0.8);
            border-radius: 22px;
            background:
              linear-gradient(
                145deg,
                rgba(255,255,255,0.98),
                rgba(248,250,252,0.94)
              );
            box-shadow:
              0 30px 80px rgba(15,23,42,0.13),
              0 8px 25px rgba(37,99,235,0.08);
            backdrop-filter: blur(18px);
            animation: tmDashboardFloat 5s ease-in-out infinite;
          }

          .tm-hero__dashboard-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 20px;
          }

          .tm-hero__dashboard-label {
            display: block;
            margin-bottom: 7px;
            color: #94a3b8;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.7px;
          }

          .tm-hero__dashboard-header h3 {
            margin: 0;
            color: #172554;
            font-size: 30px;
            letter-spacing: -1px;
          }

          .tm-hero__profit {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 8px 11px;
            border-radius: 8px;
            background: #ecfdf5;
            color: #16a34a;
            font-size: 12px;
            font-weight: 700;
          }

          .tm-hero__chart {
            position: relative;
            height: 250px;
            margin-top: 22px;
            overflow: hidden;
            border-radius: 12px;
          }

          .tm-hero__chart-grid {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(
                #e2e8f0 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                #e2e8f0 1px,
                transparent 1px
              );
            background-size: 100% 25%, 20% 100%;
            opacity: 0.55;
          }

          .tm-hero__chart-svg {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            overflow: visible;
          }

          .tm-hero__chart-area {
            fill: url(#tmHeroChartGradient);
            animation: tmChartReveal 1.4s ease-out both;
          }

          .tm-hero__chart-line {
            fill: none;
            stroke: #2563eb;
            stroke-width: 4;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: tmChartDraw 1.8s 0.25s ease-out forwards;
          }

          .tm-hero__chart-point {
            fill: #2563eb;
            stroke: #ffffff;
            stroke-width: 4;
            animation: tmPointPulse 2s 1.7s infinite;
          }

          .tm-hero__chart-footer {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 18px;
            margin-top: 16px;
            color: #94a3b8;
            font-size: 11px;
            font-weight: 650;
          }

          .tm-hero__chart-footer .active {
            color: #2563eb;
          }

          /* Floating Cards */

          .tm-hero__floating-card {
            position: absolute;
            z-index: 5;
            display: flex;
            align-items: center;
            gap: 11px;
            padding: 13px 15px;
            border: 1px solid rgba(226,232,240,0.9);
            border-radius: 13px;
            background: rgba(255,255,255,0.94);
            box-shadow:
              0 15px 35px rgba(15,23,42,0.10);
            backdrop-filter: blur(12px);
          }

          .tm-hero__floating-card span {
            display: block;
            color: #94a3b8;
            font-size: 9px;
          }

          .tm-hero__floating-card strong {
            display: block;
            margin-top: 2px;
            color: #172554;
            font-size: 12px;
          }

          .tm-hero__floating-card--top {
            top: 18px;
            right: -12px;
            animation: tmFloatingTop 4s ease-in-out infinite;
          }

          .tm-hero__floating-card--bottom {
            bottom: 18px;
            left: -22px;
            animation: tmFloatingBottom 4.5s 0.7s ease-in-out infinite;
          }

          .tm-hero__floating-icon,
          .tm-hero__ai-icon {
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 9px;
            background: #eff6ff;
            color: #2563eb;
          }

          .tm-hero__ai-icon {
            background: #f5f3ff;
            color: #7c3aed;
          }

          .tm-hero__sentiment {
            margin-left: 8px;
            color: #16a34a !important;
            font-size: 11px !important;
            font-weight: 700;
          }

          .tm-hero__floating-card--bottom > i {
            margin-left: 8px;
            color: #22c55e;
          }

          .tm-hero__decorative-dot {
            position: absolute;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #60a5fa;
            animation: tmDotFloat 3s ease-in-out infinite;
          }

          .tm-hero__decorative-dot--one {
            top: 75px;
            left: 4%;
          }

          .tm-hero__decorative-dot--two {
            right: 2%;
            bottom: 70px;
            animation-delay: 1s;
          }

          /* Stats */

          .tm-hero__stats {
            position: relative;
            z-index: 3;
            max-width: 1200px;
            margin: 0 auto;
            padding: 24px 30px;
            display: grid;
            grid-template-columns:
              repeat(4, 1fr);
            align-items: center;
            border-top: 1px solid #e2e8f0;
            border-bottom: 1px solid #e2e8f0;
          }

          .tm-hero__stat {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 5px;
          }

          .tm-hero__stat strong {
            color: #172554;
            font-size: 20px;
            font-weight: 750;
          }

          .tm-hero__stat span {
            color: #94a3b8;
            font-size: 11px;
          }

          .tm-hero__stat-divider {
            display: none;
          }

          /* Animations */

          @keyframes tmHeroContentIn {
            from {
              opacity: 0;
              transform: translateY(25px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes tmHeroVisualIn {
            from {
              opacity: 0;
              transform: translateX(35px) scale(0.97);
            }
            to {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          @keyframes tmDashboardFloat {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-7px);
            }
          }

          @keyframes tmFloatingTop {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-9px) rotate(0.5deg);
            }
          }

          @keyframes tmFloatingBottom {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(8px);
            }
          }

          @keyframes tmChartDraw {
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes tmChartReveal {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes tmPointPulse {
            0%, 100% {
              transform: scale(1);
              transform-origin: center;
            }
            50% {
              transform: scale(1.25);
              transform-origin: center;
            }
          }

          @keyframes tmPulse {
            0%, 100% {
              box-shadow:
                0 0 0 4px rgba(34,197,94,0.12);
            }
            50% {
              box-shadow:
                0 0 0 7px rgba(34,197,94,0.04);
            }
          }

          @keyframes tmHeroGlow {
            from {
              transform: translate3d(0,0,0) scale(1);
            }
            to {
              transform: translate3d(20px,15px,0) scale(1.08);
            }
          }

          @keyframes tmDotFloat {
            0%, 100% {
              transform: translateY(0);
              opacity: 0.45;
            }
            50% {
              transform: translateY(-10px);
              opacity: 1;
            }
          }

          /* Responsive */

          @media (max-width: 1199.98px) {
            .tm-hero__inner {
              grid-template-columns:
                minmax(380px, 0.9fr)
                minmax(430px, 1.1fr);
              gap: 45px;
            }

            .tm-hero__floating-card--top {
              right: -5px;
            }

            .tm-hero__floating-card--bottom {
              left: -8px;
            }
          }

          @media (max-width: 991.98px) {
            .tm-hero {
              min-height: auto;
            }

            .tm-hero__inner {
              grid-template-columns: 1fr;
              min-height: auto;
              gap: 65px;
              padding-top: 65px;
              padding-bottom: 55px;
            }

            .tm-hero__content {
              max-width: 750px;
              margin: 0 auto;
              text-align: center;
            }

            .tm-hero__badge,
            .tm-hero__actions,
            .tm-hero__trust {
              justify-content: center;
            }

            .tm-hero__description {
              margin-left: auto;
              margin-right: auto;
            }

            .tm-hero__visual {
              min-height: 480px;
            }

            .tm-hero__stats {
              grid-template-columns:
                repeat(2, 1fr);
              gap: 24px;
            }
          }

          @media (max-width: 575.98px) {
            .tm-hero__container {
              padding-left: 18px;
              padding-right: 18px;
            }

            .tm-hero__inner {
              padding-top: 45px;
              gap: 45px;
            }

            .tm-hero__title {
              font-size: 42px;
              letter-spacing: -2px;
            }

            .tm-hero__description {
              font-size: 15px;
              line-height: 1.7;
            }

            .tm-hero__actions {
              flex-direction: column;
              width: 100%;
            }

            .tm-hero__primary-button,
            .tm-hero__secondary-button {
              width: 100%;
              justify-content: center;
            }

            .tm-hero__trust {
              gap: 10px;
            }

            .tm-hero__trust-divider {
              display: none;
            }

            .tm-hero__visual {
              min-height: 370px;
            }

            .tm-hero__dashboard {
              padding: 17px;
              border-radius: 17px;
            }

            .tm-hero__dashboard-header h3 {
              font-size: 23px;
            }

            .tm-hero__chart {
              height: 190px;
            }

            .tm-hero__floating-card {
              transform: scale(0.82);
            }

            .tm-hero__floating-card--top {
              top: -5px;
              right: -15px;
            }

            .tm-hero__floating-card--bottom {
              bottom: -8px;
              left: -18px;
            }

            .tm-hero__stats {
              padding: 22px 10px;
              gap: 22px 10px;
            }

            .tm-hero__stat strong {
              font-size: 18px;
            }

            .tm-hero__stat span {
              font-size: 10px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .tm-hero *,
            .tm-hero *::before,
            .tm-hero *::after {
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

export default Hero;