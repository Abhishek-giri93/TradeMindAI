import React from "react";

function Team() {
  return (
    <section className="container my-5 py-md-5 trademind-team-section">
      {/* Section Header */}
      <div className="row text-center mb-5">
        <div className="col-12">
          <span className="trademind-team-eyebrow">
            The people behind TradeMind AI
          </span>

          <h2 className="trademind-team-title">
            People
          </h2>

          <p className="trademind-team-subtitle">
            Building technology that makes market intelligence simpler,
            smarter, and more accessible.
          </p>
        </div>
      </div>

      {/* Team Profile Section */}
      <div className="row justify-content-center align-items-center gy-5 gx-lg-5">
        {/* Left Column: Team Visual */}
        <div className="col-12 col-md-5 text-center">
          <div className="trademind-team-profile">
            {/* Decorative rings */}
            <div className="team-ring team-ring--one" />
            <div className="team-ring team-ring--two" />

            {/* Profile visual */}
            <div className="trademind-team-avatar">
              <div className="team-avatar-glow" />

              <div className="team-avatar-content">
                <i className="fa-solid fa-users" />
              </div>
            </div>

            <h3 className="trademind-team-name">
              TradeMind AI
            </h3>

            <p className="trademind-team-role">
              Founding Team
            </p>

            <div className="trademind-team-status">
              <span />
              Building the future of trading
            </div>
          </div>
        </div>

        {/* Right Column: Team Description */}
        <div className="col-12 col-md-6 col-lg-5">
          <div className="trademind-team-bio">
            <div className="team-bio-label">
              <i className="fa-solid fa-quote-left" />
              Our philosophy
            </div>

            <p>
              TradeMind AI is being built with a simple idea:
              technology should help traders and investors understand
              the market better, not make the experience unnecessarily
              complicated.
            </p>

            <p>
              Our focus is on combining modern software engineering,
              market data, analytics, and artificial intelligence to
              create a powerful yet easy-to-use trading ecosystem.
            </p>

            <p>
              We believe that better tools can help people make more
              informed financial decisions. That is why we are
              continuously improving the platform, experimenting with
              new ideas, and learning from the people who use it.
            </p>

            {/* Values */}
            <div className="trademind-team-values">
              <div className="team-value">
                <div className="team-value-icon">
                  <i className="fa-solid fa-lightbulb" />
                </div>

                <div>
                  <strong>Innovation</strong>
                  <span>
                    Build useful technology for modern markets.
                  </span>
                </div>
              </div>

              <div className="team-value">
                <div className="team-value-icon">
                  <i className="fa-solid fa-user" />
                </div>

                <div>
                  <strong>User first</strong>
                  <span>
                    Keep the experience simple and meaningful.
                  </span>
                </div>
              </div>

              <div className="team-value">
                <div className="team-value-icon">
                  <i className="fa-solid fa-chart-line" />
                </div>

                <div>
                  <strong>Data driven</strong>
                  <span>
                    Turn complex information into useful insights.
                  </span>
                </div>
              </div>
            </div>

            {/* Connect */}
            <div className="trademind-team-connect">
              <span>
                Connect with TradeMind AI
              </span>

              <div className="team-social-links">
                <button
                  type="button"
                  aria-label="TradeMind AI Homepage"
                  title="Homepage"
                >
                  <i className="fa-solid fa-globe" />
                </button>

                <button
                  type="button"
                  aria-label="TradeMind AI LinkedIn"
                  title="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in" />
                </button>

                <button
                  type="button"
                  aria-label="TradeMind AI X"
                  title="X"
                >
                  <i className="fa-brands fa-x-twitter" />
                </button>

                <button
                  type="button"
                  aria-label="TradeMind AI GitHub"
                  title="GitHub"
                >
                  <i className="fa-brands fa-github" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* =========================================
           SECTION
        ========================================= */

        .trademind-team-section {
          position: relative;
          overflow: hidden;
        }

        .trademind-team-section::before {
          content: "";

          position: absolute;

          width: 350px;
          height: 350px;

          left: -180px;
          top: 20%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(67, 97, 238, 0.06),
              transparent 70%
            );

          pointer-events: none;
        }

        /* =========================================
           HEADER
        ========================================= */

        .trademind-team-eyebrow {
          display: inline-block;

          margin-bottom: 12px;

          color: #4361ee;

          font-size: 0.68rem;
          font-weight: 700;

          letter-spacing: 0.13em;

          text-transform: uppercase;

          animation:
            teamFadeUp
            0.7s
            ease
            both;
        }

        .trademind-team-title {
          margin: 0 0 12px;

          color: #424242;

          font-size: clamp(
            2rem,
            4vw,
            2.8rem
          );

          font-weight: 500;

          letter-spacing: -0.025em;

          animation:
            teamFadeUp
            0.7s
            ease
            0.08s
            both;
        }

        .trademind-team-subtitle {
          max-width: 620px;

          margin: 0 auto;

          color: #64748b;

          font-size: 0.98rem;

          line-height: 1.75;

          animation:
            teamFadeUp
            0.7s
            ease
            0.16s
            both;
        }

        /* =========================================
           PROFILE
        ========================================= */

        .trademind-team-profile {
          position: relative;

          display: flex;
          flex-direction: column;
          align-items: center;

          padding: 25px;

          animation:
            teamProfileIn
            0.8s
            ease
            0.2s
            both;
        }

        .trademind-team-avatar {
          position: relative;

          width: 280px;
          height: 280px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            linear-gradient(
              145deg,
              #0b1220,
              #172554
            );

          box-shadow:
            0 25px 55px
            rgba(15, 23, 42, 0.18);

          overflow: hidden;

          animation:
            teamAvatarFloat
            5s
            ease-in-out
            infinite;
        }

        .trademind-team-avatar::before {
          content: "";

          position: absolute;
          inset: 12px;

          border:
            1px solid
            rgba(129, 140, 248, 0.3);

          border-radius: 50%;
        }

        .trademind-team-avatar::after {
          content: "";

          position: absolute;

          width: 190px;
          height: 190px;

          border:
            1px dashed
            rgba(165, 180, 252, 0.25);

          border-radius: 50%;

          animation:
            teamOrbit
            18s
            linear
            infinite;
        }

        .team-avatar-glow {
          position: absolute;

          width: 150px;
          height: 150px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(99, 102, 241, 0.4),
              transparent 70%
            );

          filter: blur(8px);
        }

        .team-avatar-content {
          position: relative;
          z-index: 3;

          width: 90px;
          height: 90px;

          display: flex;
          align-items: center;
          justify-content: center;

          border:
            1px solid
            rgba(165, 180, 252, 0.25);

          border-radius: 25px;

          background:
            rgba(99, 102, 241, 0.12);

          color: #a5b4fc;

          font-size: 2.3rem;

          box-shadow:
            0 0 40px
            rgba(99, 102, 241, 0.15);
        }

        .team-ring {
          position: absolute;

          border-radius: 50%;

          border:
            1px solid
            rgba(99, 102, 241, 0.1);

          pointer-events: none;
        }

        .team-ring--one {
          width: 330px;
          height: 330px;

          animation:
            teamRingPulse
            4s
            ease-in-out
            infinite;
        }

        .team-ring--two {
          width: 370px;
          height: 370px;

          border-color:
            rgba(99, 102, 241, 0.05);

          animation:
            teamRingPulse
            4s
            ease-in-out
            infinite
            1s;
        }

        .trademind-team-name {
          margin:
            28px
            0
            4px;

          color: #1e293b;

          font-size: 1.35rem;
          font-weight: 600;
        }

        .trademind-team-role {
          margin: 0 0 12px;

          color: #64748b;

          font-size: 0.85rem;
        }

        .trademind-team-status {
          display: inline-flex;
          align-items: center;

          gap: 7px;

          padding: 7px 11px;

          border:
            1px solid
            rgba(34, 197, 94, 0.12);

          border-radius: 999px;

          background:
            rgba(34, 197, 94, 0.05);

          color: #64748b;

          font-size: 0.65rem;
        }

        .trademind-team-status span {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #22c55e;

          box-shadow:
            0 0 0 4px
            rgba(34, 197, 94, 0.08);

          animation:
            teamLivePulse
            1.8s
            ease-in-out
            infinite;
        }

        /* =========================================
           BIO
        ========================================= */

        .trademind-team-bio {
          animation:
            teamFadeUp
            0.8s
            ease
            0.3s
            both;
        }

        .team-bio-label {
          display: flex;
          align-items: center;

          gap: 9px;

          margin-bottom: 18px;

          color: #4361ee;

          font-size: 0.72rem;
          font-weight: 700;

          letter-spacing: 0.08em;

          text-transform: uppercase;
        }

        .team-bio-label i {
          font-size: 0.7rem;
        }

        .trademind-team-bio > p {
          margin-bottom: 20px;

          color: #666666;

          font-size: 0.96rem;

          line-height: 1.85;
        }

        /* =========================================
           VALUES
        ========================================= */

        .trademind-team-values {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 9px;

          margin:
            25px
            0;
        }

        .team-value {
          padding: 13px;

          border:
            1px solid
            rgba(15, 23, 42, 0.06);

          border-radius: 12px;

          background: #ffffff;

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .team-value:hover {
          transform:
            translateY(-4px);

          border-color:
            rgba(67, 97, 238, 0.16);

          box-shadow:
            0 12px 25px
            rgba(15, 23, 42, 0.06);
        }

        .team-value-icon {
          width: 31px;
          height: 31px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 9px;

          border-radius: 8px;

          background: #eef2ff;

          color: #4361ee;

          font-size: 0.68rem;
        }

        .team-value strong {
          display: block;

          margin-bottom: 4px;

          color: #1e293b;

          font-size: 0.72rem;
        }

        .team-value span {
          display: block;

          color: #94a3b8;

          font-size: 0.61rem;

          line-height: 1.5;
        }

        /* =========================================
           SOCIAL
        ========================================= */

        .trademind-team-connect {
          display: flex;
          align-items: center;

          gap: 18px;

          padding-top: 20px;

          border-top:
            1px solid
            #eef2f7;

          color: #64748b;

          font-size: 0.75rem;
          font-weight: 600;
        }

        .team-social-links {
          display: flex;

          gap: 7px;
        }

        .team-social-links button {
          width: 32px;
          height: 32px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 0;

          border:
            1px solid
            #e2e8f0;

          border-radius: 9px;

          background: #ffffff;

          color: #64748b;

          font-family: inherit;
          font-size: inherit;

          cursor: pointer;

          transition:
            transform 0.25s ease,
            color 0.25s ease,
            background 0.25s ease,
            border-color 0.25s ease;
        }

        .team-social-links button:hover {
          transform:
            translateY(-3px);

          background: #eef2ff;

          border-color:
            rgba(67, 97, 238, 0.18);

          color: #4361ee;
        }

        .team-social-links button:focus-visible {
          outline:
            2px solid
            rgba(67, 97, 238, 0.45);

          outline-offset: 3px;
        }

        /* =========================================
           ANIMATIONS
        ========================================= */

        @keyframes teamFadeUp {
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

        @keyframes teamProfileIn {
          from {
            opacity: 0;

            transform:
              translateY(25px)
              scale(0.97);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes teamAvatarFloat {
          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(-7px);
          }
        }

        @keyframes teamOrbit {
          from {
            transform:
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg);
          }
        }

        @keyframes teamRingPulse {
          0%,
          100% {
            transform: scale(1);

            opacity: 0.7;
          }

          50% {
            transform: scale(1.04);

            opacity: 0.35;
          }
        }

        @keyframes teamLivePulse {
          0%,
          100% {
            transform: scale(1);

            opacity: 1;
          }

          50% {
            transform: scale(0.7);

            opacity: 0.45;
          }
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 991.98px) {
          .trademind-team-values {
            grid-template-columns:
              repeat(2, 1fr);
          }
        }

        @media (max-width: 767.98px) {
          .trademind-team-section {
            padding-top: 35px !important;
            padding-bottom: 50px !important;
          }

          .trademind-team-avatar {
            width: 250px;
            height: 250px;
          }

          .team-ring--one {
            width: 295px;
            height: 295px;
          }

          .team-ring--two {
            width: 330px;
            height: 330px;
          }

          .trademind-team-bio {
            text-align: left;
          }
        }

        @media (max-width: 575.98px) {
          .trademind-team-avatar {
            width: 220px;
            height: 220px;
          }

          .team-ring--one {
            width: 260px;
            height: 260px;
          }

          .team-ring--two {
            width: 290px;
            height: 290px;
          }

          .trademind-team-values {
            grid-template-columns: 1fr;
          }

          .trademind-team-connect {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trademind-team-eyebrow,
          .trademind-team-title,
          .trademind-team-subtitle,
          .trademind-team-profile,
          .trademind-team-bio,
          .trademind-team-avatar,
          .trademind-team-avatar::after,
          .team-ring,
          .trademind-team-status span {
            animation: none;
          }

          .team-value,
          .team-social-links button {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Team;