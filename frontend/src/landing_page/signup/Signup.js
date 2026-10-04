import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { registerUser } from "../../api/authApi";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const data = await registerUser({
        name,
        email,
        password,
      });

      setSuccess("Account created successfully!");
      setError("");

      console.log("Registration successful:", data);

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Registration error:", error.message);

      setError(
        error.message || "Something went wrong. Please try again."
      );

      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Success Alert */}
      {success && (
        <div className="container trademind-alert-wrapper">
          <div
            className="alert alert-success alert-dismissible fade show trademind-alert"
            role="alert"
          >
            <div className="trademind-alert__icon">
              <i className="fa-solid fa-check" />
            </div>

            <span>{success}</span>

            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccess("")}
              aria-label="Close"
            />
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="container trademind-alert-wrapper">
          <div
            className="alert alert-danger alert-dismissible fade show trademind-alert"
            role="alert"
          >
            <div className="trademind-alert__icon trademind-alert__icon--error">
              <i className="fa-solid fa-exclamation" />
            </div>

            <span>{error}</span>

            <button
              type="button"
              className="btn-close"
              onClick={() => setError("")}
              aria-label="Close"
            />
          </div>
        </div>
      )}

      <main className="trademind-signup-page">
        <div className="container">
          <div className="row align-items-center justify-content-center trademind-signup-row">

            {/* LEFT SIDE */}
            <div className="col-lg-6 trademind-signup-visual-col">
              <div className="trademind-signup-visual">

                {/* Background glow */}
                <div className="signup-glow signup-glow--one" />
                <div className="signup-glow signup-glow--two" />

                <div className="signup-visual-content">
                  <span className="signup-badge">
                    <span className="signup-badge__dot" />
                    AI-powered trading platform
                  </span>

                  <h1>
                    Trade smarter.
                    <br />
                    <span>Invest with confidence.</span>
                  </h1>

                  <p>
                    Build your financial journey with intelligent market
                    insights, portfolio analytics, and powerful trading tools.
                  </p>
                </div>

                {/* Dashboard Illustration */}
                <div className="signup-dashboard">

                  <div className="signup-dashboard__top">
                    <div>
                      <span>PORTFOLIO</span>
                      <strong>₹12,84,650</strong>
                    </div>

                    <div className="signup-dashboard__profit">
                      <i className="fa-solid fa-arrow-trend-up" />
                      +8.42%
                    </div>
                  </div>

                  <div className="signup-chart">
                    <svg
                      viewBox="0 0 500 180"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id="signupChartFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#6366f1"
                            stopOpacity="0.30"
                          />
                          <stop
                            offset="100%"
                            stopColor="#6366f1"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      <path
                        className="signup-chart__area"
                        d="
                          M0 145
                          C35 138, 45 125, 75 132
                          S115 108, 145 115
                          S175 90, 205 102
                          S235 78, 265 88
                          S300 65, 330 76
                          S365 50, 395 61
                          S430 32, 460 45
                          S485 24, 500 18
                          L500 180
                          L0 180 Z
                        "
                      />

                      <path
                        className="signup-chart__line"
                        d="
                          M0 145
                          C35 138, 45 125, 75 132
                          S115 108, 145 115
                          S175 90, 205 102
                          S235 78, 265 88
                          S300 65, 330 76
                          S365 50, 395 61
                          S430 32, 460 45
                          S485 24, 500 18
                        "
                      />
                    </svg>
                  </div>

                  <div className="signup-dashboard__bottom">
                    <div>
                      <span>Market Sentiment</span>
                      <strong>Positive</strong>
                    </div>

                    <div>
                      <span>AI Score</span>
                      <strong>84/100</strong>
                    </div>

                    <div>
                      <span>Risk Level</span>
                      <strong>Moderate</strong>
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="signup-floating-card signup-floating-card--top">
                  <div className="floating-card-icon">
                    <i className="fa-solid fa-brain" />
                  </div>

                  <div>
                    <span>AI Insight</span>
                    <strong>Market momentum ↑</strong>
                  </div>
                </div>

                <div className="signup-floating-card signup-floating-card--bottom">
                  <div className="floating-card-icon">
                    <i className="fa-solid fa-shield-halved" />
                  </div>

                  <div>
                    <span>Portfolio</span>
                    <strong>Risk monitored</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-5 col-xl-4">
              <div className="trademind-signup-card">

                <div className="signup-card-header">
                  <div className="signup-card-icon">
                    <i className="fa-solid fa-user-plus" />
                  </div>

                  <div>
                    <h2>Create your account</h2>

                    <p>
                      Join TradeMind AI and start your journey.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>

                  {/* NAME */}
                  <div className="trademind-form-group">
                    <label htmlFor="signup-name">
                      Full Name
                    </label>

                    <div className="trademind-input-wrapper">
                      <i className="fa-regular fa-user" />

                      <input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        required
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="trademind-form-group">
                    <label htmlFor="signup-email">
                      Email Address
                    </label>

                    <div className="trademind-input-wrapper">
                      <i className="fa-regular fa-envelope" />

                      <input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div className="trademind-form-group">
                    <label htmlFor="signup-password">
                      Password
                    </label>

                    <div className="trademind-input-wrapper">
                      <i className="fa-solid fa-lock" />

                      <input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        <i
                          className={
                            showPassword
                              ? "fa-regular fa-eye-slash"
                              : "fa-regular fa-eye"
                          }
                        />
                      </button>
                    </div>
                  </div>

                  {/* TERMS */}
                  <div className="trademind-terms">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                    />

                    <label htmlFor="terms">
                      I agree to the{" "}
                      <a href="/terms">
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a href="/privacy">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    className="trademind-signup-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create account
                        <i className="fa-solid fa-arrow-right" />
                      </>
                    )}
                  </button>
                </form>

                {/* LOGIN */}
                <div className="trademind-login-link">
                  <span>
                    Already have an account?
                  </span>

                  <a href="/login">
                    Login
                    <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>

                {/* Security note */}
                <div className="signup-security-note">
                  <i className="fa-solid fa-shield-halved" />

                  <span>
                    Your account information is securely handled
                    by TradeMind AI.
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .trademind-signup-page {
          position: relative;
          min-height: 720px;
          padding: 70px 0 90px;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 10% 20%,
              rgba(99, 102, 241, 0.055),
              transparent 30%
            ),
            #f8fafc;
        }

        .trademind-signup-row {
          min-height: 620px;
          gap: 25px;
        }

        /* =========================================
           ALERTS
        ========================================= */

        .trademind-alert-wrapper {
          position: relative;
          z-index: 20;
          padding-top: 18px;
        }

        .trademind-alert {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 0;
          border-radius: 12px;
          border: 1px solid transparent;
          box-shadow: 0 8px 25px rgba(15, 23, 42, 0.06);
        }

        .trademind-alert__icon {
          width: 27px;
          height: 27px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 50%;
          background: rgba(25, 135, 84, 0.12);
          color: #198754;
          font-size: 0.7rem;
        }

        .trademind-alert__icon--error {
          background: rgba(220, 53, 69, 0.1);
          color: #dc3545;
        }

        /* =========================================
           LEFT VISUAL
        ========================================= */

        .trademind-signup-visual-col {
          min-width: 0;
        }

        .trademind-signup-visual {
          position: relative;
          min-height: 590px;
          padding: 20px 20px 40px;
        }

        .signup-visual-content {
          position: relative;
          z-index: 4;
          max-width: 590px;
        }

        .signup-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 12px;
          margin-bottom: 20px;
          border: 1px solid rgba(67, 97, 238, 0.13);
          border-radius: 999px;
          background: rgba(67, 97, 238, 0.06);
          color: #4361ee;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          animation: signupFadeUp 0.7s ease both;
        }

        .signup-badge__dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 5px rgba(34, 197, 94, 0.08);
          animation: signupLivePulse 1.8s ease-in-out infinite;
        }

        .signup-visual-content h1 {
          margin: 0;
          color: #0f172a;
          font-size: clamp(2.6rem, 5vw, 4.5rem);
          line-height: 1.04;
          letter-spacing: -0.045em;
          animation: signupFadeUp 0.7s ease 0.08s both;
        }

        .signup-visual-content h1 span {
          color: #4361ee;
        }

        .signup-visual-content p {
          max-width: 540px;
          margin: 22px 0 0;
          color: #64748b;
          font-size: 1rem;
          line-height: 1.8;
          animation: signupFadeUp 0.7s ease 0.16s both;
        }

        /* =========================================
           DASHBOARD VISUAL
        ========================================= */

        .signup-dashboard {
          position: absolute;
          z-index: 2;
          left: 35px;
          right: 25px;
          bottom: 5px;
          padding: 22px;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 22px;
          background:
            linear-gradient(
              145deg,
              #0b1220,
              #111c35
            );
          box-shadow:
            0 30px 70px rgba(15, 23, 42, 0.18);
          animation: signupDashboardIn 0.9s ease 0.2s both;
        }

        .signup-dashboard::before {
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
          background-size: 30px 30px;
          pointer-events: none;
        }

        .signup-dashboard__top,
        .signup-dashboard__bottom {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .signup-dashboard__top span,
        .signup-dashboard__bottom span {
          display: block;
          margin-bottom: 5px;
          color: #64748b;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .signup-dashboard__top strong {
          color: #f8fafc;
          font-size: 1.25rem;
        }

        .signup-dashboard__profit {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #4ade80;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .signup-chart {
          position: relative;
          z-index: 2;
          height: 145px;
          margin: 15px 0;
        }

        .signup-chart svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .signup-chart__area {
          fill: url(#signupChartFill);
        }

        .signup-chart__line {
          fill: none;
          stroke: #818cf8;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: signupChartDraw 2s ease 0.8s forwards;
          filter: drop-shadow(
            0 0 5px rgba(129, 140, 248, 0.4)
          );
        }

        .signup-dashboard__bottom {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .signup-dashboard__bottom > div {
          padding: 10px;
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.035);
        }

        .signup-dashboard__bottom strong {
          color: #cbd5e1;
          font-size: 0.7rem;
        }

        /* =========================================
           FLOATING CARDS
        ========================================= */

        .signup-floating-card {
          position: absolute;
          z-index: 6;
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 175px;
          padding: 12px;
          border: 1px solid rgba(148, 163, 184, 0.14);
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(12px);
          box-shadow:
            0 18px 40px rgba(15, 23, 42, 0.12);
        }

        .signup-floating-card--top {
          top: 250px;
          right: 0;
          animation:
            signupFloating 4s ease-in-out infinite;
        }

        .signup-floating-card--bottom {
          left: 0;
          bottom: 40px;
          animation:
            signupFloating 4s ease-in-out infinite 1s;
        }

        .floating-card-icon {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 10px;
          background: #eef2ff;
          color: #6366f1;
          font-size: 0.8rem;
        }

        .signup-floating-card span {
          display: block;
          margin-bottom: 3px;
          color: #94a3b8;
          font-size: 0.6rem;
        }

        .signup-floating-card strong {
          color: #1e293b;
          font-size: 0.7rem;
        }

        /* =========================================
           RIGHT FORM CARD
        ========================================= */

        .trademind-signup-card {
          position: relative;
          padding: 34px;
          border: 1px solid rgba(15, 23, 42, 0.07);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.95);
          box-shadow:
            0 25px 60px rgba(15, 23, 42, 0.08);
          animation: signupCardIn 0.8s ease both;
        }

        .signup-card-header {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 28px;
        }

        .signup-card-icon {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 13px;
          background: #eef2ff;
          color: #4361ee;
        }

        .signup-card-header h2 {
          margin: 0 0 4px;
          color: #0f172a;
          font-size: 1.35rem;
          letter-spacing: -0.02em;
        }

        .signup-card-header p {
          margin: 0;
          color: #94a3b8;
          font-size: 0.78rem;
        }

        /* =========================================
           FORM
        ========================================= */

        .trademind-form-group {
          margin-bottom: 19px;
        }

        .trademind-form-group label {
          display: block;
          margin-bottom: 7px;
          color: #334155;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .trademind-input-wrapper {
          position: relative;
        }

        .trademind-input-wrapper > i {
          position: absolute;
          left: 14px;
          top: 50%;
          z-index: 2;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 0.78rem;
          pointer-events: none;
        }

        .trademind-input-wrapper input {
          width: 100%;
          height: 48px;
          padding: 0 42px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          outline: none;
          background: #ffffff;
          color: #0f172a;
          font-size: 0.84rem;
          box-sizing: border-box;
          transition:
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease;
        }

        .trademind-input-wrapper input::placeholder {
          color: #b1bac7;
        }

        .trademind-input-wrapper input:focus {
          border-color: #6366f1;
          background: #fff;
          box-shadow:
            0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .password-toggle {
          position: absolute;
          right: 10px;
          top: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(-50%);
          border: 0;
          background: transparent;
          color: #94a3b8;
          cursor: pointer;
          border-radius: 7px;
        }

        .password-toggle:hover {
          background: #f1f5f9;
          color: #475569;
        }

        /* =========================================
           TERMS
        ========================================= */

        .trademind-terms {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          margin: 5px 0 22px;
        }

        .trademind-terms input {
          width: 15px;
          height: 15px;
          margin-top: 2px;
          flex-shrink: 0;
          accent-color: #6366f1;
          cursor: pointer;
        }

        .trademind-terms label {
          color: #64748b;
          font-size: 0.72rem;
          line-height: 1.55;
          cursor: pointer;
        }

        .trademind-terms a {
          color: #4361ee;
          text-decoration: none;
          font-weight: 600;
        }

        .trademind-terms a:hover {
          text-decoration: underline;
        }

        /* =========================================
           BUTTON
        ========================================= */

        .trademind-signup-button {
          width: 100%;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border: 0;
          border-radius: 10px;
          background: linear-gradient(
            135deg,
            #4361ee,
            #6366f1
          );
          color: #ffffff;
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow:
            0 10px 22px rgba(67, 97, 238, 0.2);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            opacity 0.25s ease;
        }

        .trademind-signup-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            0 15px 30px rgba(67, 97, 238, 0.28);
        }

        .trademind-signup-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .trademind-signup-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .trademind-signup-button i {
          transition: transform 0.25s ease;
        }

        .trademind-signup-button:hover:not(:disabled) i {
          transform: translateX(4px);
        }

        /* =========================================
           LOGIN
        ========================================= */

        .trademind-login-link {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          margin-top: 21px;
          padding-top: 20px;
          border-top: 1px solid #eef2f7;
          font-size: 0.75rem;
        }

        .trademind-login-link span {
          color: #94a3b8;
        }

        .trademind-login-link a {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #4361ee;
          font-weight: 700;
          text-decoration: none;
        }

        .trademind-login-link a:hover {
          color: #3348c7;
        }

        .trademind-login-link i {
          font-size: 0.6rem;
        }

        /* =========================================
           SECURITY NOTE
        ========================================= */

        .signup-security-note {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 18px;
          padding: 11px 12px;
          border-radius: 9px;
          background: #f8fafc;
          color: #94a3b8;
          font-size: 0.65rem;
          line-height: 1.5;
        }

        .signup-security-note i {
          margin-top: 2px;
          color: #64748b;
        }

        /* =========================================
           ANIMATIONS
        ========================================= */

        @keyframes signupFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes signupCardIn {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes signupDashboardIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes signupChartDraw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes signupFloating {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes signupLivePulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }

          50% {
            transform: scale(0.72);
            opacity: 0.5;
          }
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 1199.98px) {
          .trademind-signup-visual {
            padding-left: 0;
          }

          .signup-dashboard {
            left: 10px;
            right: 5px;
          }

          .signup-floating-card--top {
            right: -15px;
          }
        }

        @media (max-width: 991.98px) {
          .trademind-signup-page {
            padding: 50px 0 70px;
          }

          .trademind-signup-row {
            min-height: auto;
          }

          .trademind-signup-visual {
            min-height: 570px;
            margin-bottom: 35px;
          }

          .trademind-signup-card {
            max-width: 520px;
            margin: 0 auto;
          }
        }

        @media (max-width: 767.98px) {
          .trademind-signup-page {
            padding: 40px 0 60px;
          }

          .trademind-signup-visual {
            min-height: auto;
            padding: 10px 0 20px;
          }

          .signup-visual-content h1 {
            font-size: 2.7rem;
          }

          .signup-dashboard {
            position: relative;
            left: auto;
            right: auto;
            bottom: auto;
            margin-top: 35px;
          }

          .signup-floating-card--top,
          .signup-floating-card--bottom {
            display: none;
          }

          .trademind-signup-card {
            padding: 28px 24px;
          }
        }

        @media (max-width: 575.98px) {
          .signup-visual-content h1 {
            font-size: 2.3rem;
          }

          .signup-visual-content p {
            font-size: 0.9rem;
          }

          .signup-dashboard {
            padding: 17px;
          }

          .signup-dashboard__bottom {
            gap: 5px;
          }

          .signup-dashboard__bottom > div {
            padding: 8px;
          }

          .signup-dashboard__bottom span {
            font-size: 0.5rem;
          }

          .signup-dashboard__bottom strong {
            font-size: 0.6rem;
          }

          .trademind-signup-card {
            padding: 24px 18px;
            border-radius: 18px;
          }

          .signup-card-header h2 {
            font-size: 1.2rem;
          }

          .trademind-login-link {
            flex-wrap: wrap;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .signup-badge,
          .signup-visual-content h1,
          .signup-visual-content p,
          .signup-dashboard,
          .signup-chart__line,
          .signup-floating-card,
          .trademind-signup-card,
          .signup-badge__dot {
            animation: none;
          }

          .trademind-signup-button,
          .trademind-input-wrapper input,
          .password-toggle {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}

export default Signup;