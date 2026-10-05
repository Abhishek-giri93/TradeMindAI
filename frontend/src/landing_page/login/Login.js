import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { loginUser } from "../../api/authApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser({
        email,
        password,
      });

      console.log("Login successfully.", data);

      // Redirect to homepage after successful login
      window.location.href = "https://trade-mind-dashboard.vercel.app/";
        } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="trademind-login-page">
        <div className="container">
          <div className="row align-items-center justify-content-center trademind-login-row">

            {/* =========================================
                LEFT SIDE - BRAND / VISUAL
            ========================================= */}

            <div className="col-lg-6 trademind-login-visual-col">
              <div className="trademind-login-visual">

                {/* Background glow */}
                <div className="login-glow login-glow--one" />
                <div className="login-glow login-glow--two" />

                <div className="login-visual-content">

                  <span className="login-badge">
                    <span className="login-badge__dot" />
                    Welcome back to TradeMind AI
                  </span>

                  <h1>
                    Your market.
                    <br />
                    <span>Your intelligence.</span>
                  </h1>

                  <p>
                    Continue your trading journey with intelligent market
                    insights, portfolio analytics, and powerful trading tools
                    designed for smarter decisions.
                  </p>
                </div>

                {/* Trading Dashboard */}
                <div className="login-dashboard">

                  <div className="login-dashboard__header">
                    <div>
                      <span>MARKET OVERVIEW</span>
                      <strong>Today's Market</strong>
                    </div>

                    <div className="login-market-status">
                      <span />
                      Market Open
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="login-chart">
                    <svg
                      viewBox="0 0 500 190"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id="loginChartFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#6366f1"
                            stopOpacity="0.28"
                          />

                          <stop
                            offset="100%"
                            stopColor="#6366f1"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      <path
                        className="login-chart__area"
                        d="
                          M0 155
                          C30 148, 45 135, 70 142
                          S110 115, 140 125
                          S170 105, 200 112
                          S235 82, 265 95
                          S295 72, 325 80
                          S360 58, 390 68
                          S420 38, 450 49
                          S480 27, 500 20
                          L500 190
                          L0 190 Z
                        "
                      />

                      <path
                        className="login-chart__line"
                        d="
                          M0 155
                          C30 148, 45 135, 70 142
                          S110 115, 140 125
                          S170 105, 200 112
                          S235 82, 265 95
                          S295 72, 325 80
                          S360 58, 390 68
                          S420 38, 450 49
                          S480 27, 500 20
                        "
                      />

                      <circle
                        className="login-chart__point"
                        cx="500"
                        cy="20"
                        r="5"
                      />
                    </svg>
                  </div>

                  <div className="login-dashboard__stats">

                    <div>
                      <span>NIFTY 50</span>
                      <strong>25,722.30</strong>
                      <small>+0.84%</small>
                    </div>

                    <div>
                      <span>SENSEX</span>
                      <strong>83,998.10</strong>
                      <small>+0.72%</small>
                    </div>

                    <div>
                      <span>AI SENTIMENT</span>
                      <strong>Positive</strong>
                      <small>84/100</small>
                    </div>

                  </div>
                </div>

                {/* Floating AI card */}
                <div className="login-floating-card login-floating-card--top">

                  <div className="login-floating-icon">
                    <i className="fa-solid fa-brain" />
                  </div>

                  <div>
                    <span>AI Insight</span>
                    <strong>Positive momentum detected</strong>
                  </div>

                </div>

                {/* Floating security card */}
                <div className="login-floating-card login-floating-card--bottom">

                  <div className="login-floating-icon">
                    <i className="fa-solid fa-shield-halved" />
                  </div>

                  <div>
                    <span>Account Security</span>
                    <strong>Protected</strong>
                  </div>

                </div>

              </div>
            </div>

            {/* =========================================
                RIGHT SIDE - LOGIN FORM
            ========================================= */}

            <div className="col-lg-5 col-xl-4">

              <div className="trademind-login-card">

                {/* Header */}
                <div className="login-card-header">

                  <div className="login-card-icon">
                    <i className="fa-solid fa-right-to-bracket" />
                  </div>

                  <div>
                    <h2>
                      Welcome back
                    </h2>

                    <p>
                      Login to continue to TradeMind AI.
                    </p>
                  </div>

                </div>

                {/* Error Message */}
                {error && (
                  <div
                    className="trademind-login-error"
                    role="alert"
                  >
                    <div className="login-error-icon">
                      <i className="fa-solid fa-exclamation" />
                    </div>

                    <span>{error}</span>

                    <button
                      type="button"
                      onClick={() => setError("")}
                      aria-label="Close error"
                    >
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  {/* Email */}
                  <div className="trademind-login-form-group">

                    <label htmlFor="login-email">
                      Email Address
                    </label>

                    <div className="trademind-login-input">

                      <i className="fa-regular fa-envelope" />

                      <input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        autoComplete="email"
                        required
                      />

                    </div>

                  </div>

                  {/* Password */}
                  <div className="trademind-login-form-group">

                    <div className="login-password-label">

                      <label htmlFor="login-password">
                        Password
                      </label>

                      <Link to="/forgot-password">
                        Forgot password?
                      </Link>

                    </div>

                    <div className="trademind-login-input">

                      <i className="fa-solid fa-lock" />

                      <input
                        id="login-password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError("");
                        }}
                        autoComplete="current-password"
                        required
                      />

                      <button
                        type="button"
                        className="login-password-toggle"
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

                  {/* Remember me */}
                  <div className="login-options">

                    <label className="login-remember">
                      <input type="checkbox" />
                      <span>
                        Remember me
                      </span>
                    </label>

                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="trademind-login-button"
                    disabled={loading}
                  >

                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        />

                        Signing in...
                      </>
                    ) : (
                      <>
                        Login to TradeMind AI

                        <i className="fa-solid fa-arrow-right" />
                      </>
                    )}

                  </button>

                </form>

                {/* Signup */}
                <div className="trademind-signup-link">

                  <span>
                    Don't have an account?
                  </span>

                  <Link to="/signup">
                    Create an account
                    <i className="fa-solid fa-arrow-right" />
                  </Link>

                </div>

                {/* Security */}
                <div className="login-security-note">

                  <i className="fa-solid fa-shield-halved" />

                  <span>
                    Your login credentials are securely handled
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

        /* =========================================
           PAGE
        ========================================= */

        .trademind-login-page {
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

        .trademind-login-row {
          min-height: 620px;
          gap: 25px;
        }

        /* =========================================
           LEFT VISUAL
        ========================================= */

        .trademind-login-visual {
          position: relative;
          min-height: 590px;
          padding: 20px;
        }

        .login-visual-content {
          position: relative;
          z-index: 5;
          max-width: 600px;
        }

        .login-badge {
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

          animation: loginFadeUp 0.7s ease both;
        }

        .login-badge__dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #22c55e;

          box-shadow:
            0 0 0 5px rgba(34, 197, 94, 0.08);

          animation: loginLivePulse 1.8s ease-in-out infinite;
        }

        .login-visual-content h1 {
          margin: 0;

          color: #0f172a;

          font-size: clamp(2.6rem, 5vw, 4.5rem);
          line-height: 1.04;
          letter-spacing: -0.045em;

          animation:
            loginFadeUp
            0.7s
            ease
            0.08s
            both;
        }

        .login-visual-content h1 span {
          color: #4361ee;
        }

        .login-visual-content p {
          max-width: 550px;

          margin: 22px 0 0;

          color: #64748b;

          font-size: 1rem;
          line-height: 1.8;

          animation:
            loginFadeUp
            0.7s
            ease
            0.16s
            both;
        }

        /* =========================================
           DASHBOARD
        ========================================= */

        .login-dashboard {
          position: absolute;

          left: 35px;
          right: 25px;
          bottom: 5px;

          z-index: 2;

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

          animation:
            loginDashboardIn
            0.9s
            ease
            0.2s
            both;
        }

        .login-dashboard::before {
          content: "";

          position: absolute;
          inset: 0;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            );

          background-size: 30px 30px;

          pointer-events: none;
        }

        .login-dashboard__header {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .login-dashboard__header span {
          display: block;

          margin-bottom: 5px;

          color: #64748b;

          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .login-dashboard__header strong {
          color: #f8fafc;
          font-size: 1.15rem;
        }

        .login-market-status {
          display: flex !important;
          align-items: center;
          gap: 7px;

          padding: 7px 10px;

          border:
            1px solid
            rgba(34,197,94,0.2);

          border-radius: 999px;

          background:
            rgba(34,197,94,0.07);

          color: #86efac !important;

          font-size: 0.62rem !important;
        }

        .login-market-status span {
          width: 6px;
          height: 6px;

          margin: 0 !important;

          border-radius: 50%;

          background: #4ade80;

          box-shadow:
            0 0 10px rgba(74,222,128,0.7);

          animation:
            loginLivePulse
            1.7s
            ease-in-out
            infinite;
        }

        /* =========================================
           CHART
        ========================================= */

        .login-chart {
          position: relative;
          z-index: 2;

          height: 150px;

          margin: 16px 0;
        }

        .login-chart svg {
          width: 100%;
          height: 100%;
        }

        .login-chart__area {
          fill: url(#loginChartFill);
        }

        .login-chart__line {
          fill: none;

          stroke: #818cf8;
          stroke-width: 2.5;

          stroke-linecap: round;
          stroke-linejoin: round;

          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;

          animation:
            loginChartDraw
            2s
            ease
            0.7s
            forwards;

          filter:
            drop-shadow(
              0 0 5px
              rgba(129,140,248,0.4)
            );
        }

        .login-chart__point {
          fill: #a5b4fc;

          filter:
            drop-shadow(
              0 0 7px
              rgba(165,180,252,0.8)
            );

          animation:
            loginPointPulse
            2s
            ease-in-out
            infinite;
        }

        /* =========================================
           DASHBOARD STATS
        ========================================= */

        .login-dashboard__stats {
          position: relative;
          z-index: 2;

          display: grid;
          grid-template-columns: repeat(3, 1fr);

          gap: 10px;
        }

        .login-dashboard__stats > div {
          padding: 10px;

          border:
            1px solid
            rgba(148,163,184,0.1);

          border-radius: 9px;

          background:
            rgba(255,255,255,0.035);
        }

        .login-dashboard__stats span {
          display: block;

          margin-bottom: 4px;

          color: #64748b;

          font-size: 0.58rem;
          font-weight: 700;
        }

        .login-dashboard__stats strong {
          display: block;

          margin-bottom: 2px;

          color: #cbd5e1;

          font-size: 0.72rem;
        }

        .login-dashboard__stats small {
          color: #4ade80;

          font-size: 0.6rem;
        }

        /* =========================================
           FLOATING CARDS
        ========================================= */

        .login-floating-card {
          position: absolute;

          z-index: 6;

          display: flex;
          align-items: center;

          gap: 10px;

          min-width: 180px;

          padding: 12px;

          border:
            1px solid
            rgba(148,163,184,0.14);

          border-radius: 13px;

          background:
            rgba(255,255,255,0.9);

          backdrop-filter: blur(12px);

          box-shadow:
            0 18px 40px
            rgba(15,23,42,0.12);
        }

        .login-floating-card--top {
          top: 245px;
          right: 0;

          animation:
            loginFloating
            4s
            ease-in-out
            infinite;
        }

        .login-floating-card--bottom {
          left: 0;
          bottom: 40px;

          animation:
            loginFloating
            4s
            ease-in-out
            infinite
            1s;
        }

        .login-floating-icon {
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

        .login-floating-card span {
          display: block;

          margin-bottom: 3px;

          color: #94a3b8;

          font-size: 0.6rem;
        }

        .login-floating-card strong {
          color: #1e293b;

          font-size: 0.7rem;
        }

        /* =========================================
           LOGIN CARD
        ========================================= */

        .trademind-login-card {
          position: relative;

          padding: 34px;

          border:
            1px solid
            rgba(15,23,42,0.07);

          border-radius: 22px;

          background:
            rgba(255,255,255,0.96);

          box-shadow:
            0 25px 60px
            rgba(15,23,42,0.08);

          animation:
            loginCardIn
            0.8s
            ease
            both;
        }

        .login-card-header {
          display: flex;
          align-items: center;

          gap: 13px;

          margin-bottom: 27px;
        }

        .login-card-icon {
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

        .login-card-header h2 {
          margin: 0 0 4px;

          color: #0f172a;

          font-size: 1.35rem;

          letter-spacing: -0.02em;
        }

        .login-card-header p {
          margin: 0;

          color: #94a3b8;

          font-size: 0.78rem;
        }

        /* =========================================
           ERROR
        ========================================= */

        .trademind-login-error {
          display: flex;
          align-items: center;

          gap: 9px;

          margin-bottom: 20px;
          padding: 10px 11px;

          border:
            1px solid
            rgba(220,53,69,0.12);

          border-radius: 9px;

          background:
            rgba(220,53,69,0.045);

          color: #b42332;

          font-size: 0.72rem;
        }

        .login-error-icon {
          width: 25px;
          height: 25px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 50%;

          background:
            rgba(220,53,69,0.1);

          color: #dc3545;

          font-size: 0.65rem;
        }

        .trademind-login-error > span {
          flex: 1;
        }

        .trademind-login-error button {
          width: 25px;
          height: 25px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 0;
          border-radius: 6px;

          background: transparent;

          color: #94a3b8;

          cursor: pointer;
        }

        .trademind-login-error button:hover {
          background: rgba(220,53,69,0.07);
          color: #dc3545;
        }

        /* =========================================
           FORM
        ========================================= */

        .trademind-login-form-group {
          margin-bottom: 20px;
        }

        .trademind-login-form-group label {
          display: block;

          margin-bottom: 7px;

          color: #334155;

          font-size: 0.78rem;
          font-weight: 600;
        }

        .login-password-label {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 7px;
        }

        .login-password-label label {
          margin: 0;
        }

        .login-password-label a {
          color: #6366f1;

          font-size: 0.68rem;
          font-weight: 600;

          text-decoration: none;
        }

        .login-password-label a:hover {
          text-decoration: underline;
        }

        .trademind-login-input {
          position: relative;
        }

        .trademind-login-input > i {
          position: absolute;

          left: 14px;
          top: 50%;

          z-index: 2;

          transform:
            translateY(-50%);

          color: #94a3b8;

          font-size: 0.78rem;

          pointer-events: none;
        }

        .trademind-login-input input {
          width: 100%;
          height: 48px;

          padding:
            0 42px;

          border:
            1px solid
            #e2e8f0;

          border-radius: 10px;

          outline: none;

          background: #ffffff;

          color: #0f172a;

          font-size: 0.84rem;

          box-sizing: border-box;

          transition:
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .trademind-login-input input::placeholder {
          color: #b1bac7;
        }

        .trademind-login-input input:focus {
          border-color: #6366f1;

          box-shadow:
            0 0 0 3px
            rgba(99,102,241,0.1);
        }

        .login-password-toggle {
          position: absolute;

          right: 9px;
          top: 50%;

          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          transform:
            translateY(-50%);

          border: 0;

          border-radius: 7px;

          background: transparent;

          color: #94a3b8;

          cursor: pointer;
        }

        .login-password-toggle:hover {
          background: #f1f5f9;
          color: #475569;
        }

        /* =========================================
           OPTIONS
        ========================================= */

        .login-options {
          display: flex;
          justify-content: space-between;

          margin:
            -3px
            0
            20px;
        }

        .login-remember {
          display: flex;
          align-items: center;

          gap: 7px;

          color: #64748b;

          font-size: 0.7rem;

          cursor: pointer;
        }

        .login-remember input {
          width: 14px;
          height: 14px;

          accent-color: #6366f1;

          cursor: pointer;
        }

        /* =========================================
           LOGIN BUTTON
        ========================================= */

        .trademind-login-button {
          width: 100%;
          height: 48px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 9px;

          border: 0;
          border-radius: 10px;

          background:
            linear-gradient(
              135deg,
              #4361ee,
              #6366f1
            );

          color: #ffffff;

          font-size: 0.82rem;
          font-weight: 700;

          cursor: pointer;

          box-shadow:
            0 10px 22px
            rgba(67,97,238,0.2);

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            opacity 0.25s ease;
        }

        .trademind-login-button:hover:not(:disabled) {
          transform: translateY(-2px);

          box-shadow:
            0 15px 30px
            rgba(67,97,238,0.28);
        }

        .trademind-login-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .trademind-login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .trademind-login-button i {
          transition:
            transform 0.25s ease;
        }

        .trademind-login-button:hover:not(:disabled) i {
          transform:
            translateX(4px);
        }

        /* =========================================
           SIGNUP LINK
        ========================================= */

        .trademind-signup-link {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 5px;

          margin-top: 21px;
          padding-top: 20px;

          border-top:
            1px solid
            #eef2f7;

          font-size: 0.75rem;
        }

        .trademind-signup-link span {
          color: #94a3b8;
        }

        .trademind-signup-link a {
          display: inline-flex;
          align-items: center;

          gap: 5px;

          color: #4361ee;

          font-weight: 700;

          text-decoration: none;
        }

        .trademind-signup-link a:hover {
          color: #3348c7;
        }

        .trademind-signup-link i {
          font-size: 0.6rem;
        }

        /* =========================================
           SECURITY
        ========================================= */

        .login-security-note {
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

        .login-security-note i {
          margin-top: 2px;

          color: #64748b;
        }

        /* =========================================
           BACKGROUND GLOWS
        ========================================= */

        .login-glow {
          position: absolute;

          border-radius: 50%;

          filter: blur(5px);

          pointer-events: none;
        }

        .login-glow--one {
          width: 260px;
          height: 260px;

          top: -100px;
          left: 10%;

          background:
            rgba(67,97,238,0.07);
        }

        .login-glow--two {
          width: 200px;
          height: 200px;

          right: 10%;
          bottom: 0;

          background:
            rgba(139,92,246,0.06);
        }

        /* =========================================
           ANIMATIONS
        ========================================= */

        @keyframes loginFadeUp {
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

        @keyframes loginCardIn {
          from {
            opacity: 0;
            transform:
              translateY(25px);
          }

          to {
            opacity: 1;
            transform:
              translateY(0);
          }
        }

        @keyframes loginDashboardIn {
          from {
            opacity: 0;
            transform:
              translateY(30px)
              scale(0.97);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes loginChartDraw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes loginPointPulse {
          0%,
          100% {
            opacity: 1;
            r: 5;
          }

          50% {
            opacity: 0.5;
            r: 7;
          }
        }

        @keyframes loginFloating {
          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(-8px);
          }
        }

        @keyframes loginLivePulse {
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
          .trademind-login-visual {
            padding-left: 0;
          }

          .login-dashboard {
            left: 10px;
            right: 5px;
          }

          .login-floating-card--top {
            right: -15px;
          }
        }

        @media (max-width: 991.98px) {
          .trademind-login-page {
            padding:
              50px 0
              70px;
          }

          .trademind-login-row {
            min-height: auto;
          }

          .trademind-login-visual {
            min-height: 570px;
            margin-bottom: 35px;
          }

          .trademind-login-card {
            max-width: 520px;
            margin: 0 auto;
          }
        }

        @media (max-width: 767.98px) {
          .trademind-login-page {
            padding:
              40px 0
              60px;
          }

          .trademind-login-visual {
            min-height: auto;
            padding:
              10px 0
              20px;
          }

          .login-visual-content h1 {
            font-size: 2.7rem;
          }

          .login-dashboard {
            position: relative;

            left: auto;
            right: auto;
            bottom: auto;

            margin-top: 35px;
          }

          .login-floating-card--top,
          .login-floating-card--bottom {
            display: none;
          }

          .trademind-login-card {
            padding:
              28px 24px;
          }
        }

        @media (max-width: 575.98px) {
          .login-visual-content h1 {
            font-size: 2.3rem;
          }

          .login-visual-content p {
            font-size: 0.9rem;
          }

          .login-dashboard {
            padding: 17px;
          }

          .login-dashboard__stats {
            gap: 5px;
          }

          .login-dashboard__stats > div {
            padding: 8px;
          }

          .login-dashboard__stats span {
            font-size: 0.5rem;
          }

          .login-dashboard__stats strong {
            font-size: 0.6rem;
          }

          .login-dashboard__stats small {
            font-size: 0.52rem;
          }

          .trademind-login-card {
            padding:
              24px 18px;

            border-radius: 18px;
          }

          .login-card-header h2 {
            font-size: 1.2rem;
          }

          .trademind-signup-link {
            flex-wrap: wrap;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .login-badge,
          .login-visual-content h1,
          .login-visual-content p,
          .login-dashboard,
          .login-chart__line,
          .login-chart__point,
          .login-floating-card,
          .trademind-login-card,
          .login-badge__dot,
          .login-market-status span {
            animation: none;
          }

          .trademind-login-button,
          .trademind-login-input input,
          .login-password-toggle {
            transition: none;
          }
        }

      `}</style>
    </>
  );
}

export default Login;