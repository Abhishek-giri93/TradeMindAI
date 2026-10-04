import React from "react";

function OpenAccount() {
  return (
    <section className="account-cta trademind-account-cta">
      <div className="container">
        <div className="account-cta__inner">

          {/* Background decoration */}
          <div className="account-cta__glow account-cta__glow--one" />
          <div className="account-cta__glow account-cta__glow--two" />

          <div className="account-cta__content">
            <span className="eyebrow trademind-account-cta__eyebrow">
              Get started today
            </span>

            <h2>
              Start your journey with TradeMind AI.
            </h2>

            <p>
              Access intelligent market insights, portfolio analytics,
              trading tools, and a smarter investing experience — all from
              one powerful platform.
            </p>

            <div className="account-cta__actions">
              <a
                className="button-primary trademind-account-cta__button"
                href="/signup"
              >
                Sign up for free
                <i
                  className="fa-solid fa-arrow-right"
                  aria-hidden="true"
                />
              </a>

              <a
                className="trademind-account-cta__secondary"
                href="/products"
              >
                Explore TradeMind AI
                <i
                  className="fa-solid fa-arrow-up-right-from-square"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* Floating visual */}
          <div className="account-cta__visual">
            <div className="account-cta__orb">
              <i className="fa-solid fa-chart-line" />
            </div>

            <div className="account-cta__floating-card account-cta__floating-card--top">
              <span>AI Insights</span>
              <strong>Active</strong>
            </div>

            <div className="account-cta__floating-card account-cta__floating-card--bottom">
              <span>Market Intelligence</span>
              <strong>
                <i className="fa-solid fa-arrow-trend-up" />
                Ready
              </strong>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .trademind-account-cta {
          position: relative;
          overflow: hidden;
          padding: 90px 0;
          background:
            radial-gradient(
              circle at 75% 45%,
              rgba(99, 102, 241, 0.18),
              transparent 28%
            ),
            linear-gradient(
              135deg,
              #0b1220 0%,
              #111c35 50%,
              #0b1220 100%
            );
        }

        .trademind-account-cta::before {
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
          background-size: 42px 42px;
          mask-image: linear-gradient(
            to bottom,
            black,
            transparent
          );
          pointer-events: none;
        }

        .trademind-account-cta
        .container {
          position: relative;
          z-index: 2;
        }

        .account-cta__inner {
          position: relative;
          min-height: 430px;
          display: flex;
          align-items: center;
          padding: 70px;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 30px;
          background:
            linear-gradient(
              110deg,
              rgba(15, 23, 42, 0.96),
              rgba(15, 23, 42, 0.72)
            );
          box-shadow:
            0 35px 80px rgba(0, 0, 0, 0.25);
        }

        .account-cta__content {
          position: relative;
          z-index: 4;
          max-width: 680px;
        }

        .trademind-account-cta__eyebrow {
          display: inline-block;
          margin-bottom: 16px;
          color: #93a7ff;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .account-cta__content h2 {
          margin: 0 0 20px;
          color: #f8fafc;
          font-size: clamp(2.1rem, 4.5vw, 4rem);
          line-height: 1.08;
          letter-spacing: -0.035em;
        }

        .account-cta__content p {
          max-width: 620px;
          margin: 0;
          color: #a9b5c7;
          font-size: 1.05rem;
          line-height: 1.8;
        }

        .account-cta__actions {
          display: flex;
          align-items: center;
          gap: 25px;
          margin-top: 32px;
        }

        .trademind-account-cta__button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 21px;
          border-radius: 10px;
          text-decoration: none;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .trademind-account-cta__button:hover {
          transform: translateY(-3px);
          box-shadow:
            0 14px 30px rgba(67, 97, 238, 0.28);
        }

        .trademind-account-cta__button i {
          transition: transform 0.3s ease;
        }

        .trademind-account-cta__button:hover i {
          transform: translateX(4px);
        }

        .trademind-account-cta__secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #cbd5e1;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          transition:
            color 0.25s ease,
            gap 0.25s ease;
        }

        .trademind-account-cta__secondary:hover {
          color: #ffffff;
          gap: 12px;
        }

        .trademind-account-cta__secondary i {
          font-size: 0.72rem;
        }

        /* Visual */

        .account-cta__visual {
          position: absolute;
          right: 8%;
          top: 50%;
          width: 300px;
          height: 300px;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .account-cta__orb {
          position: absolute;
          inset: 50%;
          width: 145px;
          height: 145px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(129, 140, 248, 0.45);
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(99, 102, 241, 0.25),
              rgba(15, 23, 42, 0.1)
            );
          box-shadow:
            0 0 0 25px rgba(99, 102, 241, 0.035),
            0 0 0 55px rgba(99, 102, 241, 0.018),
            0 0 70px rgba(99, 102, 241, 0.2);
          animation: ctaOrbFloat 4s ease-in-out infinite;
        }

        .account-cta__orb::before {
          content: "";
          position: absolute;
          width: 70px;
          height: 70px;
          border: 1px dashed rgba(165, 180, 252, 0.5);
          border-radius: 50%;
          animation: ctaOrbit 10s linear infinite;
        }

        .account-cta__orb i {
          position: relative;
          z-index: 2;
          color: #a5b4fc;
          font-size: 2rem;
          filter: drop-shadow(
            0 0 15px rgba(129, 140, 248, 0.55)
          );
        }

        .account-cta__floating-card {
          position: absolute;
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 150px;
          padding: 13px 15px;
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-radius: 13px;
          background: rgba(15, 23, 42, 0.76);
          backdrop-filter: blur(12px);
          box-shadow:
            0 18px 35px rgba(0, 0, 0, 0.2);
        }

        .account-cta__floating-card span {
          color: #64748b;
          font-size: 0.65rem;
        }

        .account-cta__floating-card strong {
          color: #e2e8f0;
          font-size: 0.78rem;
        }

        .account-cta__floating-card--top {
          top: 25px;
          right: 0;
          animation: ctaCardFloat 4s ease-in-out infinite;
        }

        .account-cta__floating-card--bottom {
          bottom: 25px;
          left: 0;
          animation: ctaCardFloat 4s ease-in-out infinite 1s;
        }

        .account-cta__floating-card--bottom strong {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #86efac;
        }

        .account-cta__floating-card--bottom i {
          font-size: 0.65rem;
        }

        .account-cta__glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(5px);
        }

        .account-cta__glow--one {
          width: 240px;
          height: 240px;
          top: -120px;
          left: 12%;
          background: rgba(67, 97, 238, 0.08);
        }

        .account-cta__glow--two {
          width: 180px;
          height: 180px;
          bottom: -90px;
          right: 20%;
          background: rgba(139, 92, 246, 0.08);
        }

        @keyframes ctaOrbFloat {
          0%,
          100% {
            transform: translate(-50%, -50%);
          }

          50% {
            transform: translate(-50%, calc(-50% - 8px));
          }
        }

        @keyframes ctaOrbit {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ctaCardFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @media (max-width: 991.98px) {
          .trademind-account-cta {
            padding: 65px 0;
          }

          .account-cta__inner {
            min-height: auto;
            padding: 55px;
          }

          .account-cta__visual {
            right: -30px;
            opacity: 0.45;
          }

          .account-cta__content {
            max-width: 650px;
          }
        }

        @media (max-width: 767.98px) {
          .account-cta__inner {
            padding: 45px 30px;
            border-radius: 22px;
          }

          .account-cta__visual {
            display: none;
          }

          .account-cta__content {
            max-width: 100%;
          }

          .account-cta__actions {
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
          }
        }

        @media (max-width: 575.98px) {
          .trademind-account-cta {
            padding: 45px 0;
          }

          .account-cta__inner {
            padding: 38px 22px;
          }

          .account-cta__content h2 {
            font-size: 2rem;
          }

          .account-cta__content p {
            font-size: 0.92rem;
          }

          .trademind-account-cta__button {
            width: 100%;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .account-cta__orb,
          .account-cta__orb::before,
          .account-cta__floating-card {
            animation: none;
          }

          .trademind-account-cta__button,
          .trademind-account-cta__secondary {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

export default OpenAccount;