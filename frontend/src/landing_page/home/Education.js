import React from "react";

function Education() {
  return (
    <section className="tm-education-section">
      <div className="tm-education-container">

        <div className="tm-education-grid">

          {/* =========================================
              VISUAL
          ========================================== */}
          <div className="tm-education-visual">

            <div className="tm-education-glow"></div>

            {/* Main Learning Dashboard */}
            <div className="tm-education-dashboard">

              {/* Header */}
              <div className="tm-education-dashboard-header">

                <div className="tm-education-brand">
                  <div className="tm-education-brand-icon">
                    <i
                      className="fa-solid fa-graduation-cap"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <span>TradeMind AI</span>
                    <strong>Learning Center</strong>
                  </div>
                </div>

                <div className="tm-education-status">
                  <span></span>
                  Learning
                </div>

              </div>

              {/* Progress */}
              <div className="tm-education-progress">

                <div className="tm-education-progress-heading">
                  <div>
                    <span>Your learning journey</span>
                    <strong>Market Fundamentals</strong>
                  </div>

                  <strong>68%</strong>
                </div>

                <div className="tm-education-progress-bar">
                  <span></span>
                </div>

              </div>

              {/* Learning Modules */}
              <div className="tm-education-modules">

                <div className="tm-education-module tm-education-module--completed">
                  <div className="tm-education-module-icon">
                    <i
                      className="fa-solid fa-check"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <strong>Stock Market Basics</strong>
                    <span>Completed</span>
                  </div>

                  <i
                    className="fa-solid fa-circle-check"
                    aria-hidden="true"
                  />
                </div>

                <div className="tm-education-module tm-education-module--active">
                  <div className="tm-education-module-icon">
                    <i
                      className="fa-solid fa-chart-line"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <strong>Technical Analysis</strong>
                    <span>In progress</span>
                  </div>

                  <i
                    className="fa-solid fa-arrow-right"
                    aria-hidden="true"
                  />
                </div>

                <div className="tm-education-module">
                  <div className="tm-education-module-icon">
                    <i
                      className="fa-solid fa-shield-halved"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <strong>Risk Management</strong>
                    <span>Next module</span>
                  </div>

                  <i
                    className="fa-solid fa-lock"
                    aria-hidden="true"
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="tm-education-dashboard-footer">
                <span>
                  <i
                    className="fa-solid fa-book-open"
                    aria-hidden="true"
                  />
                  120+ learning resources
                </span>

                <span>
                  <i
                    className="fa-solid fa-clock"
                    aria-hidden="true"
                  />
                  Learn at your pace
                </span>
              </div>

            </div>

            {/* Floating Insight Card */}
            <div className="tm-education-floating-card">

              <div className="tm-education-floating-icon">
                <i
                  className="fa-solid fa-lightbulb"
                  aria-hidden="true"
                />
              </div>

              <div>
                <span>Today's insight</span>
                <strong>
                  Understand before you trade.
                </strong>
              </div>

            </div>

          </div>

          {/* =========================================
              CONTENT
          ========================================== */}
          <div className="tm-education-content">

            <p className="tm-education-eyebrow">
              Learn at your pace
            </p>

            <h2>
              Learn the market.
              <br />
              <span>Trade with confidence.</span>
            </h2>

            <p className="tm-education-copy">
              Whether you're taking your first step into the
              market or improving your trading strategy,
              TradeMind AI gives you the resources and
              insights you need to build stronger market
              knowledge.
            </p>

            {/* =========================================
                EDUCATION LINKS
            ========================================== */}
            <div className="tm-education-links">

              {/* TradeMind Academy */}
              <article className="tm-education-card">

                <div className="tm-education-card-top">

                  <div className="tm-education-card-icon">
                    <i
                      className="fa-solid fa-graduation-cap"
                      aria-hidden="true"
                    />
                  </div>

                  <span className="tm-education-card-badge">
                    Learning
                  </span>

                </div>

                <h3>
                  TradeMind Academy
                </h3>

                <p>
                  Learn stocks, technical analysis, portfolio
                  management, risk management, and trading
                  fundamentals through structured,
                  easy-to-follow lessons.
                </p>

                <a
                  className="tm-education-card-link"
                  href="#academy"
                >
                  Explore Academy

                  <span>
                    <i
                      className="fa-solid fa-arrow-right"
                      aria-hidden="true"
                    />
                  </span>
                </a>

              </article>

              {/* Market Insights */}
              <article className="tm-education-card">

                <div className="tm-education-card-top">

                  <div className="tm-education-card-icon tm-education-card-icon--purple">
                    <i
                      className="fa-solid fa-brain"
                      aria-hidden="true"
                    />
                  </div>

                  <span className="tm-education-card-badge tm-education-card-badge--purple">
                    Insights
                  </span>

                </div>

                <h3>
                  Market Insights
                </h3>

                <p>
                  Explore market concepts, company analysis,
                  trading ideas, and educational insights
                  designed to help you understand what is
                  happening in the market.
                </p>

                <a
                  className="tm-education-card-link"
                  href="#market-insights"
                >
                  Explore Insights

                  <span>
                    <i
                      className="fa-solid fa-arrow-right"
                      aria-hidden="true"
                    />
                  </span>
                </a>

              </article>

            </div>

            {/* Bottom Note */}
            <div className="tm-education-note">

              <div className="tm-education-note-icon">
                <i
                  className="fa-solid fa-circle-info"
                  aria-hidden="true"
                />
              </div>

              <p>
                Education first. Decisions second. Build your
                understanding before putting your capital at
                risk.
              </p>

            </div>

          </div>
        </div>
      </div>

      {/* =========================================
          STYLES
      ========================================== */}
      <style>
        {`
          .tm-education-section {
            position: relative;
            width: 100%;
            overflow: hidden;
            background:
              linear-gradient(
                180deg,
                #f8fafc 0%,
                #ffffff 100%
              );
            padding:
              clamp(85px, 9vw, 135px) 0;
          }

          .tm-education-container {
            width: 100%;
            max-width: 1500px;
            margin: 0 auto;
            padding-left: clamp(24px, 5vw, 90px);
            padding-right: clamp(24px, 5vw, 90px);
          }

          .tm-education-grid {
            display: grid;
            grid-template-columns:
              minmax(480px, 1.05fr)
              minmax(430px, 0.95fr);
            align-items: center;
            gap: clamp(60px, 8vw, 130px);
          }

          /* =========================================
              VISUAL
          ========================================== */

          .tm-education-visual {
            position: relative;
            min-height: 510px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .tm-education-glow {
            position: absolute;
            width: 390px;
            height: 390px;
            border-radius: 50%;
            background: #dbeafe;
            filter: blur(75px);
            opacity: 0.55;
            animation:
              tmEducationGlow
              7s
              ease-in-out
              infinite
              alternate;
          }

          .tm-education-dashboard {
            position: relative;
            z-index: 2;
            width: min(100%, 560px);
            padding: 25px;
            border: 1px solid #e2e8f0;
            border-radius: 22px;
            background: rgba(255,255,255,0.95);
            box-shadow:
              0 30px 70px rgba(15,23,42,0.10),
              0 8px 25px rgba(37,99,235,0.06);
            backdrop-filter: blur(15px);
            animation:
              tmEducationDashboard
              6s
              ease-in-out
              infinite;
          }

          /* Header */

          .tm-education-dashboard-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            padding-bottom: 21px;
            border-bottom: 1px solid #e2e8f0;
          }

          .tm-education-brand {
            display: flex;
            align-items: center;
            gap: 11px;
          }

          .tm-education-brand-icon {
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            background:
              linear-gradient(
                135deg,
                #172554,
                #2563eb
              );
            color: #ffffff;
            font-size: 14px;
          }

          .tm-education-brand span {
            display: block;
            color: #94a3b8;
            font-size: 9px;
            margin-bottom: 3px;
          }

          .tm-education-brand strong {
            display: block;
            color: #172554;
            font-size: 13px;
          }

          .tm-education-status {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 9px;
            border-radius: 7px;
            background: #f0fdf4;
            color: #16a34a;
            font-size: 10px;
            font-weight: 700;
          }

          .tm-education-status span {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #22c55e;
            animation: tmEducationPulse 2s infinite;
          }

          /* Progress */

          .tm-education-progress {
            padding: 24px 0;
          }

          .tm-education-progress-heading {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 20px;
          }

          .tm-education-progress-heading span {
            display: block;
            color: #94a3b8;
            font-size: 10px;
            margin-bottom: 5px;
          }

          .tm-education-progress-heading div strong {
            display: block;
            color: #172554;
            font-size: 14px;
          }

          .tm-education-progress-heading > strong {
            color: #2563eb;
            font-size: 14px;
          }

          .tm-education-progress-bar {
            width: 100%;
            height: 7px;
            margin-top: 13px;
            overflow: hidden;
            border-radius: 999px;
            background: #e2e8f0;
          }

          .tm-education-progress-bar span {
            display: block;
            width: 68%;
            height: 100%;
            border-radius: inherit;
            background:
              linear-gradient(
                90deg,
                #2563eb,
                #60a5fa
              );
            transform-origin: left;
            animation:
              tmEducationProgress
              1.2s
              ease-out both;
          }

          /* Modules */

          .tm-education-modules {
            display: grid;
            gap: 9px;
          }

          .tm-education-module {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            border: 1px solid #eef2f7;
            border-radius: 10px;
            transition:
              transform 0.22s ease,
              border-color 0.22s ease,
              background 0.22s ease;
          }

          .tm-education-module:hover {
            transform: translateX(4px);
            border-color: #dbeafe;
            background: #f8fbff;
          }

          .tm-education-module-icon {
            width: 32px;
            height: 32px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            background: #f1f5f9;
            color: #64748b;
            font-size: 11px;
          }

          .tm-education-module--completed
          .tm-education-module-icon {
            background: #ecfdf5;
            color: #16a34a;
          }

          .tm-education-module--active {
            border-color: #dbeafe;
            background: #f8fbff;
          }

          .tm-education-module--active
          .tm-education-module-icon {
            background: #eff6ff;
            color: #2563eb;
          }

          .tm-education-module > div:nth-child(2) {
            flex: 1;
          }

          .tm-education-module strong {
            display: block;
            color: #334155;
            font-size: 11px;
          }

          .tm-education-module span {
            display: block;
            margin-top: 2px;
            color: #94a3b8;
            font-size: 9px;
          }

          .tm-education-module > i {
            color: #cbd5e1;
            font-size: 10px;
          }

          .tm-education-module--completed > i {
            color: #22c55e;
          }

          .tm-education-module--active > i {
            color: #2563eb;
          }

          /* Dashboard Footer */

          .tm-education-dashboard-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 18px;
            padding-top: 17px;
            border-top: 1px solid #f1f5f9;
          }

          .tm-education-dashboard-footer span {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #94a3b8;
            font-size: 9px;
          }

          .tm-education-dashboard-footer i {
            color: #2563eb;
          }

          /* Floating card */

          .tm-education-floating-card {
            position: absolute;
            z-index: 4;
            right: -20px;
            bottom: 40px;
            display: flex;
            align-items: center;
            gap: 11px;
            max-width: 230px;
            padding: 13px 15px;
            border: 1px solid #e2e8f0;
            border-radius: 13px;
            background: rgba(255,255,255,0.96);
            box-shadow:
              0 15px 35px rgba(15,23,42,0.10);
            backdrop-filter: blur(12px);
            animation:
              tmEducationFloat
              4.5s
              ease-in-out
              infinite;
          }

          .tm-education-floating-icon {
            width: 35px;
            height: 35px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 9px;
            background: #fefce8;
            color: #ca8a04;
          }

          .tm-education-floating-card span {
            display: block;
            color: #94a3b8;
            font-size: 9px;
          }

          .tm-education-floating-card strong {
            display: block;
            margin-top: 2px;
            color: #172554;
            font-size: 10px;
          }

          /* =========================================
              CONTENT
          ========================================== */

          .tm-education-content {
            max-width: 650px;
          }

          .tm-education-eyebrow {
            margin: 0 0 16px;
            color: #2563eb;
            font-size: 13px;
            font-weight: 750;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .tm-education-content h2 {
            margin: 0;
            color: #172554;
            font-size: clamp(36px, 4vw, 54px);
            line-height: 1.1;
            letter-spacing: -2px;
            font-weight: 750;
          }

          .tm-education-content h2 span {
            color: #2563eb;
          }

          .tm-education-copy {
            max-width: 600px;
            margin: 25px 0 32px;
            color: #64748b;
            font-size: 16px;
            line-height: 1.8;
          }

          /* Cards */

          .tm-education-links {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 17px;
          }

          .tm-education-card {
            padding: 22px;
            border: 1px solid #e2e8f0;
            border-radius: 15px;
            background: #ffffff;
            transition:
              transform 0.25s ease,
              border-color 0.25s ease,
              box-shadow 0.25s ease;
          }

          .tm-education-card:hover {
            transform: translateY(-5px);
            border-color: #bfdbfe;
            box-shadow:
              0 18px 40px rgba(15,23,42,0.07);
          }

          .tm-education-card-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-bottom: 20px;
          }

          .tm-education-card-icon {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            background: #eff6ff;
            color: #2563eb;
          }

          .tm-education-card-icon--purple {
            background: #f5f3ff;
            color: #7c3aed;
          }

          .tm-education-card-badge {
            padding: 5px 8px;
            border-radius: 6px;
            background: #eff6ff;
            color: #2563eb;
            font-size: 9px;
            font-weight: 700;
          }

          .tm-education-card-badge--purple {
            background: #f5f3ff;
            color: #7c3aed;
          }

          .tm-education-card h3 {
            margin: 0 0 9px;
            color: #172554;
            font-size: 15px;
            font-weight: 700;
          }

          .tm-education-card p {
            min-height: 78px;
            margin: 0;
            color: #94a3b8;
            font-size: 11px;
            line-height: 1.7;
          }

          .tm-education-card-link {
            display: inline-flex;
            align-items: center;
            gap: 9px;
            margin-top: 20px;
            color: #2563eb;
            text-decoration: none;
            font-size: 11px;
            font-weight: 700;
          }

          .tm-education-card-link span {
            transition:
              transform 0.2s ease;
          }

          .tm-education-card-link:hover {
            color: #1d4ed8;
          }

          .tm-education-card-link:hover span {
            transform: translateX(4px);
          }

          /* Note */

          .tm-education-note {
            display: flex;
            align-items: center;
            gap: 11px;
            margin-top: 22px;
            padding: 13px 15px;
            border: 1px solid #e0f2fe;
            border-radius: 11px;
            background: #f8fcff;
          }

          .tm-education-note-icon {
            color: #0284c7;
            font-size: 14px;
          }

          .tm-education-note p {
            margin: 0;
            color: #64748b;
            font-size: 10px;
            line-height: 1.6;
          }

          /* =========================================
              ANIMATIONS
          ========================================== */

          @keyframes tmEducationDashboard {
            0%, 100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-7px);
            }
          }

          @keyframes tmEducationFloat {
            0%, 100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-9px);
            }
          }

          @keyframes tmEducationGlow {
            from {
              transform: scale(1);
              opacity: 0.45;
            }

            to {
              transform: scale(1.12);
              opacity: 0.65;
            }
          }

          @keyframes tmEducationProgress {
            from {
              transform: scaleX(0);
            }

            to {
              transform: scaleX(1);
            }
          }

          @keyframes tmEducationPulse {
            0%, 100% {
              box-shadow:
                0 0 0 0 rgba(34,197,94,0.20);
            }

            50% {
              box-shadow:
                0 0 0 5px rgba(34,197,94,0.05);
            }
          }

          /* =========================================
              RESPONSIVE
          ========================================== */

          @media (max-width: 1100px) {
            .tm-education-grid {
              gap: 60px;
            }

            .tm-education-floating-card {
              right: -5px;
            }
          }

          @media (max-width: 991.98px) {
            .tm-education-grid {
              grid-template-columns: 1fr;
            }

            .tm-education-content {
              max-width: 760px;
              margin: 0 auto;
            }

            .tm-education-visual {
              min-height: 480px;
            }
          }

          @media (max-width: 650px) {
            .tm-education-section {
              padding:
                70px 0;
            }

            .tm-education-links {
              grid-template-columns: 1fr;
            }

            .tm-education-card p {
              min-height: auto;
            }

            .tm-education-dashboard {
              padding: 20px;
            }

            .tm-education-floating-card {
              right: -10px;
              bottom: 20px;
              transform: scale(0.88);
            }
          }

          @media (max-width: 480px) {
            .tm-education-container {
              padding-left: 18px;
              padding-right: 18px;
            }

            .tm-education-visual {
              min-height: 410px;
            }

            .tm-education-dashboard-header {
              align-items: flex-start;
            }

            .tm-education-status {
              font-size: 9px;
            }

            .tm-education-floating-card {
              right: -25px;
              transform: scale(0.78);
            }

            .tm-education-dashboard-footer {
              flex-direction: column;
              align-items: flex-start;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .tm-education-section *,
            .tm-education-section *::before,
            .tm-education-section *::after {
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

export default Education;