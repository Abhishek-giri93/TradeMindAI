import React from "react";

const values = [
  [
    "Customer-first, always",
    "A trading experience designed around clarity, simplicity, and the needs of modern investors.",
  ],
  [
    "No spam or gimmicks",
    "Thoughtful products without unnecessary distractions, designed to help you focus on the market.",
  ],
  [
    "A complete ecosystem",
    "Tools for trading, portfolio tracking, market analysis, learning, and intelligent decision-making.",
  ],
  [
    "Do better with money",
    "Data-driven tools and AI-powered insights that help you make more informed financial decisions.",
  ],
];

function Stats() {
  return (
    <section className="home-section trust-section trademind-trust">
      <div className="container split-section trademind-trust__layout">

        {/* LEFT CONTENT */}
        <div className="split-section__content trademind-trust__content">
          <p className="eyebrow trademind-eyebrow">
            Our approach
          </p>

          <h2>
            Trade with confidence.
          </h2>

          <p className="trademind-trust__intro">
            TradeMind AI combines intelligent technology, market insights,
            and a clean trading experience to help you make better decisions.
          </p>

          <div className="value-list trademind-value-list">
            {values.map(([title, copy], index) => (
              <article
                key={title}
                className="trademind-value-card"
                style={{
                  "--delay": `${index * 100}ms`,
                }}
              >
                <div className="trademind-value-number">
                  0{index + 1}
                </div>

                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="split-section__visual ecosystem-visual trademind-ecosystem">

          <div className="ecosystem-dashboard">

            <div className="ecosystem-dashboard__header">
              <div>
                <span className="dashboard-label">
                  TRADEMIND AI
                </span>

                <h3>
                  Intelligent Trading Ecosystem
                </h3>
              </div>

              <span className="live-indicator">
                <span />
                LIVE
              </span>
            </div>

            <div className="ecosystem-network">

              <div className="network-line network-line--one" />
              <div className="network-line network-line--two" />
              <div className="network-line network-line--three" />
              <div className="network-line network-line--four" />

              {/* Main AI node */}
              <div className="ecosystem-node ecosystem-node--main">
                <div className="node-icon">
                  <i className="fa-solid fa-brain" />
                </div>

                <strong>AI Intelligence</strong>
                <span>Market insights</span>
              </div>

              {/* Supporting nodes */}
              <div className="ecosystem-node ecosystem-node--top">
                <i className="fa-solid fa-chart-line" />
                <strong>Market Data</strong>
                <span>Real-time insights</span>
              </div>

              <div className="ecosystem-node ecosystem-node--left">
                <i className="fa-solid fa-wallet" />
                <strong>Portfolio</strong>
                <span>Track holdings</span>
              </div>

              <div className="ecosystem-node ecosystem-node--right">
                <i className="fa-solid fa-bolt" />
                <strong>Trading</strong>
                <span>Fast execution</span>
              </div>

              <div className="ecosystem-node ecosystem-node--bottom">
                <i className="fa-solid fa-graduation-cap" />
                <strong>Learn</strong>
                <span>Build knowledge</span>
              </div>
            </div>

            <div className="ecosystem-dashboard__footer">
              <div>
                <span>Market Intelligence</span>
                <strong>Active</strong>
              </div>

              <div>
                <span>Portfolio Analysis</span>
                <strong>Ready</strong>
              </div>

              <div>
                <span>Risk Insights</span>
                <strong>Enabled</strong>
              </div>
            </div>
          </div>

          <div className="ecosystem-links">
            <a
              className="text-link text-link--arrow"
              href="/products"
            >
              Explore products
              <i
                className="fa-solid fa-arrow-right"
                aria-hidden="true"
              />
            </a>

            <a
              className="text-link text-link--arrow"
              href="/signup"
            >
              Get started
              <i
                className="fa-solid fa-arrow-right"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>

      {/* DEVELOPER / AI STRIP */}
      <div className="developer-strip trademind-developer-strip">
        <div className="container developer-strip__inner">

          <div className="developer-strip__icon">
            <i className="fa-solid fa-code" />
          </div>

          <div className="developer-strip__content">
            <span className="developer-strip__label">
              FOR DEVELOPERS
            </span>

            <h3>
              Build smarter financial experiences.
            </h3>

            <p>
              Connect your applications with trading tools, market data,
              portfolio insights, and AI-powered capabilities through a
              developer-friendly architecture.
            </p>
          </div>

          <a
            className="text-link text-link--arrow developer-strip__link"
            href="/products"
          >
            Explore
            <i
              className="fa-solid fa-arrow-right"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      <style>{`
        .trademind-trust {
          position: relative;
          overflow: hidden;
        }

        .trademind-trust::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          right: -180px;
          top: 10%;
          border-radius: 50%;
          background: rgba(67, 97, 238, 0.06);
          filter: blur(20px);
          pointer-events: none;
        }

        .trademind-trust__layout {
          position: relative;
          z-index: 2;
          align-items: center;
          gap: clamp(45px, 7vw, 100px);
        }

        .trademind-trust__content {
          flex: 1;
          min-width: 0;
        }

        .trademind-eyebrow {
          margin-bottom: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .trademind-trust__content h2 {
          margin-bottom: 18px;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.1;
        }

        .trademind-trust__intro {
          max-width: 620px;
          margin-bottom: 35px;
          color: #64748b;
          font-size: 1.05rem;
          line-height: 1.8;
        }

        .trademind-value-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .trademind-value-card {
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 18px;
          padding: 18px 20px;
          border: 1px solid rgba(15, 23, 42, 0.07);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.72);
          box-shadow: 0 8px 25px rgba(15, 23, 42, 0.035);
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
          animation: trustCardIn 0.65s ease both;
          animation-delay: var(--delay);
        }

        .trademind-value-card:hover {
          transform: translateX(8px);
          border-color: rgba(67, 97, 238, 0.22);
          box-shadow: 0 16px 35px rgba(15, 23, 42, 0.08);
        }

        .trademind-value-number {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          background: #f1f5ff;
          color: #4361ee;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .trademind-value-card h3 {
          margin: 0 0 6px;
          font-size: 1rem;
          color: #0f172a;
        }

        .trademind-value-card p {
          margin: 0;
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.65;
        }

        /* ECOSYSTEM VISUAL */

        .trademind-ecosystem {
          flex: 1;
          min-width: 0;
        }

        .ecosystem-dashboard {
          position: relative;
          min-height: 570px;
          padding: 26px;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 28px;
          background:
            radial-gradient(
              circle at 50% 45%,
              rgba(67, 97, 238, 0.13),
              transparent 34%
            ),
            linear-gradient(
              145deg,
              #0b1220,
              #101b32 55%,
              #0d172a
            );
          box-shadow:
            0 30px 70px rgba(15, 23, 42, 0.18);
          animation: dashboardFloat 6s ease-in-out infinite;
        }

        .ecosystem-dashboard::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px
            );
          background-size: 32px 32px;
          mask-image: linear-gradient(
            to bottom,
            black,
            transparent
          );
          pointer-events: none;
        }

        .ecosystem-dashboard__header {
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .dashboard-label {
          display: block;
          margin-bottom: 7px;
          color: #8ea7ff;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .ecosystem-dashboard__header h3 {
          margin: 0;
          color: #f8fafc;
          font-size: clamp(1.1rem, 2vw, 1.4rem);
        }

        .live-indicator {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 10px;
          border: 1px solid rgba(34, 197, 94, 0.22);
          border-radius: 999px;
          background: rgba(34, 197, 94, 0.08);
          color: #86efac;
          font-size: 0.65rem;
          font-weight: 700;
        }

        .live-indicator span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 12px rgba(74, 222, 128, 0.8);
          animation: livePulse 1.7s ease-in-out infinite;
        }

        .ecosystem-network {
          position: relative;
          height: 380px;
          margin-top: 8px;
        }

        .ecosystem-node {
          position: absolute;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 130px;
          min-height: 82px;
          padding: 12px;
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-radius: 16px;
          background: rgba(15, 23, 42, 0.82);
          backdrop-filter: blur(12px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          text-align: center;
          transition:
            transform 0.35s ease,
            border-color 0.35s ease;
        }

        .ecosystem-node:hover {
          transform: translateY(-6px) scale(1.03);
          border-color: rgba(142, 167, 255, 0.5);
        }

        .ecosystem-node i {
          margin-bottom: 8px;
          color: #8ea7ff;
          font-size: 1rem;
        }

        .ecosystem-node strong {
          color: #f8fafc;
          font-size: 0.78rem;
        }

        .ecosystem-node span {
          margin-top: 3px;
          color: #94a3b8;
          font-size: 0.62rem;
        }

        .ecosystem-node--main {
          left: 50%;
          top: 50%;
          width: 155px;
          min-height: 105px;
          transform: translate(-50%, -50%);
          border-color: rgba(99, 102, 241, 0.4);
          background:
            linear-gradient(
              145deg,
              rgba(67, 97, 238, 0.2),
              rgba(15, 23, 42, 0.9)
            );
          box-shadow:
            0 0 0 8px rgba(67, 97, 238, 0.035),
            0 20px 50px rgba(67, 97, 238, 0.18);
        }

        .ecosystem-node--main:hover {
          transform: translate(-50%, -50%) scale(1.03);
        }

        .node-icon {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.16);
          color: #a5b4fc;
        }

        .ecosystem-node--top {
          left: 50%;
          top: 8%;
          transform: translateX(-50%);
        }

        .ecosystem-node--left {
          left: 4%;
          top: 50%;
          transform: translateY(-50%);
        }

        .ecosystem-node--right {
          right: 4%;
          top: 50%;
          transform: translateY(-50%);
        }

        .ecosystem-node--bottom {
          left: 50%;
          bottom: 5%;
          transform: translateX(-50%);
        }

        .network-line {
          position: absolute;
          z-index: 1;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(99, 102, 241, 0.55),
            transparent
          );
          opacity: 0.55;
        }

        .network-line--one,
        .network-line--two {
          width: 34%;
          height: 1px;
          top: 50%;
        }

        .network-line--one {
          left: 16%;
        }

        .network-line--two {
          right: 16%;
        }

        .network-line--three,
        .network-line--four {
          width: 1px;
          height: 31%;
          left: 50%;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(99, 102, 241, 0.55),
            transparent
          );
        }

        .network-line--three {
          top: 19%;
        }

        .network-line--four {
          bottom: 18%;
        }

        .ecosystem-dashboard__footer {
          position: absolute;
          left: 26px;
          right: 26px;
          bottom: 22px;
          z-index: 5;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .ecosystem-dashboard__footer div {
          padding: 10px 12px;
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.035);
        }

        .ecosystem-dashboard__footer span {
          display: block;
          margin-bottom: 3px;
          color: #64748b;
          font-size: 0.58rem;
        }

        .ecosystem-dashboard__footer strong {
          color: #cbd5e1;
          font-size: 0.72rem;
        }

        .ecosystem-links {
          display: flex;
          gap: 28px;
          margin-top: 22px;
        }

        /* DEVELOPER STRIP */

        .trademind-developer-strip {
          margin-top: 80px;
          border-top: 1px solid rgba(15, 23, 42, 0.07);
          border-bottom: 1px solid rgba(15, 23, 42, 0.07);
          background: linear-gradient(
            100deg,
            #f8fafc,
            #ffffff,
            #f8fafc
          );
        }

        .trademind-developer-strip
        .developer-strip__inner {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 24px;
          padding-top: 35px;
          padding-bottom: 35px;
        }

        .developer-strip__icon {
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          background: #eef2ff;
          color: #4361ee;
          font-size: 1.15rem;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .developer-strip__inner:hover
        .developer-strip__icon {
          transform: rotate(-5deg) scale(1.05);
          box-shadow: 0 12px 25px rgba(67, 97, 238, 0.12);
        }

        .developer-strip__label {
          display: block;
          margin-bottom: 4px;
          color: #4361ee;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .developer-strip__content h3 {
          margin: 0 0 5px;
          color: #0f172a;
          font-size: 1.15rem;
        }

        .developer-strip__content p {
          max-width: 780px;
          margin: 0;
          color: #64748b;
          font-size: 0.88rem;
          line-height: 1.65;
        }

        .developer-strip__link {
          white-space: nowrap;
        }

        /* ANIMATIONS */

        @keyframes trustCardIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dashboardFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes livePulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.4;
            transform: scale(0.7);
          }
        }

        @media (max-width: 991.98px) {
          .trademind-trust__layout {
            flex-direction: column;
          }

          .trademind-trust__content,
          .trademind-ecosystem {
            width: 100%;
          }

          .ecosystem-dashboard {
            min-height: 540px;
          }
        }

        @media (max-width: 767.98px) {
          .ecosystem-dashboard {
            min-height: 500px;
            padding: 20px;
            border-radius: 22px;
          }

          .ecosystem-network {
            height: 335px;
          }

          .ecosystem-node {
            width: 105px;
            min-height: 70px;
            padding: 9px;
          }

          .ecosystem-node--main {
            width: 125px;
            min-height: 90px;
          }

          .ecosystem-node--left {
            left: 0;
          }

          .ecosystem-node--right {
            right: 0;
          }

          .ecosystem-dashboard__footer {
            left: 20px;
            right: 20px;
          }

          .ecosystem-dashboard__footer div {
            padding: 8px;
          }

          .ecosystem-dashboard__footer span {
            font-size: 0.5rem;
          }

          .ecosystem-dashboard__footer strong {
            font-size: 0.62rem;
          }

          .trademind-developer-strip
          .developer-strip__inner {
            grid-template-columns: auto 1fr;
          }

          .developer-strip__link {
            grid-column: 2;
          }
        }

        @media (max-width: 575.98px) {
          .trademind-value-card {
            grid-template-columns: 34px 1fr;
            gap: 12px;
            padding: 15px;
          }

          .trademind-value-number {
            width: 32px;
            height: 32px;
          }

          .ecosystem-dashboard {
            min-height: 475px;
          }

          .ecosystem-network {
            height: 310px;
          }

          .ecosystem-node {
            width: 90px;
            min-height: 65px;
          }

          .ecosystem-node--main {
            width: 110px;
          }

          .ecosystem-node strong {
            font-size: 0.68rem;
          }

          .ecosystem-node span {
            font-size: 0.54rem;
          }

          .ecosystem-links {
            flex-direction: column;
            gap: 12px;
          }

          .trademind-developer-strip
          .developer-strip__inner {
            grid-template-columns: 1fr;
          }

          .developer-strip__link {
            grid-column: auto;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ecosystem-dashboard,
          .trademind-value-card,
          .live-indicator span {
            animation: none;
          }

          .trademind-value-card,
          .ecosystem-node,
          .developer-strip__icon {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Stats;