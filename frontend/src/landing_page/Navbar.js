import React from "react";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg bg-white border-bottom sticky-top"
      style={{
        minHeight: "76px",
        padding: "0",
      }}
    >
      <div
        className="container-fluid"
        style={{
          width: "100%",
          paddingLeft: "clamp(24px, 4vw, 72px)",
          paddingRight: "clamp(24px, 4vw, 72px)",
        }}
      >
        {/* =========================
            TradeMind AI Brand
        ========================== */}
        <a
          className="navbar-brand d-flex align-items-center gap-2"
          href="/"
          aria-label="TradeMind AI Home"
          style={{
            marginRight: "clamp(30px, 5vw, 80px)",
          }}
        >
          {/* Brand Mark */}
          <span
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{
              width: "40px",
              height: "40px",
              flexShrink: 0,
              background:
                "linear-gradient(135deg, #172554 0%, #2563eb 100%)",
              color: "#ffffff",
              fontSize: "18px",
              boxShadow: "0 5px 14px rgba(37, 99, 235, 0.20)",
            }}
          >
            <i className="fa-solid fa-chart-line"></i>
          </span>

          {/* Brand Name */}
          <span className="d-flex flex-column lh-sm">
            <span
              style={{
                color: "#172554",
                fontSize: "20px",
                fontWeight: "700",
                letterSpacing: "-0.5px",
                whiteSpace: "nowrap",
              }}
            >
              TradeMind <span style={{ color: "#2563eb" }}>AI</span>
            </span>

            <small
              className="d-none d-sm-block"
              style={{
                color: "#64748b",
                fontSize: "8px",
                letterSpacing: "1.1px",
                fontWeight: "600",
                marginTop: "2px",
              }}
            >
              SMARTER TRADING
            </small>
          </span>
        </a>

        {/* =========================
            Mobile Toggle
        ========================== */}
        <button
          className="navbar-toggler border-0 shadow-none p-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#tradeMindNavbar"
          aria-controls="tradeMindNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* =========================
            Navigation
        ========================== */}
        <div
          className="collapse navbar-collapse"
          id="tradeMindNavbar"
        >
          <ul
            className="navbar-nav ms-auto align-items-start align-items-lg-center"
            style={{
              gap: "6px",
            }}
          >
            {/* Signup */}
            <li className="nav-item">
              <a
                className="nav-link px-3 py-2"
                href="/signup"
                style={{
                  color: "#475569",
                  fontSize: "15px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                }}
              >
                Signup
              </a>
            </li>

            {/* Login */}
            <li className="nav-item">
              <a
                className="nav-link px-3 py-2"
                href="/login"
                style={{
                  color: "#475569",
                  fontSize: "15px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                }}
              >
                Login
              </a>
            </li>

            {/* About */}
            <li className="nav-item">
              <a
                className="nav-link px-3 py-2"
                href="/about"
                style={{
                  color: "#475569",
                  fontSize: "15px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                }}
              >
                About
              </a>
            </li>

            {/* Products */}
            <li className="nav-item">
              <a
                className="nav-link px-3 py-2"
                href="/products"
                style={{
                  color: "#475569",
                  fontSize: "15px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                }}
              >
                Products
              </a>
            </li>

            {/* Pricing */}
            <li className="nav-item">
              <a
                className="nav-link px-3 py-2"
                href="/pricing"
                style={{
                  color: "#475569",
                  fontSize: "15px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                }}
              >
                Pricing
              </a>
            </li>

            {/* Support */}
            <li className="nav-item">
              <a
                className="nav-link px-3 py-2"
                href="/support"
                style={{
                  color: "#475569",
                  fontSize: "15px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                }}
              >
                Support
              </a>
            </li>

            {/* Get Started */}
            <li
              className="nav-item"
              style={{
                marginLeft: "10px",
              }}
            >
              <a
                href="/signup"
                className="btn px-4 py-2 rounded-3"
                style={{
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  color: "#ffffff",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  minHeight: "42px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 5px 14px rgba(37, 99, 235, 0.20)",
                  whiteSpace: "nowrap",
                }}
              >
                Get Started
              </a>
            </li>

            {/* Menu */}
            <li
              className="nav-item"
              style={{
                marginLeft: "4px",
              }}
            >
              <a
                className="nav-link d-flex align-items-center justify-content-center rounded-3"
                href="#menu"
                aria-label="Open menu"
                style={{
                  width: "42px",
                  height: "42px",
                  color: "#475569",
                  fontSize: "17px",
                }}
              >
                <i className="fa-solid fa-bars"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* =========================
          Responsive Styling
      ========================== */}
      <style>
        {`
          .navbar .nav-link {
            transition:
              color 0.2s ease,
              background-color 0.2s ease;
            border-radius: 8px;
          }

          .navbar .nav-link:hover {
            color: #2563eb !important;
            background: #f1f5f9;
          }

          .navbar .navbar-brand {
            transition: opacity 0.2s ease;
          }

          .navbar .navbar-brand:hover {
            opacity: 0.92;
          }

          .navbar .navbar-toggler {
            border-radius: 10px;
          }

          .navbar .navbar-toggler:hover {
            background: #f1f5f9;
          }

          @media (max-width: 991.98px) {
            .navbar {
              min-height: 68px !important;
            }

            .navbar .navbar-collapse {
              padding-top: 16px;
              padding-bottom: 18px;
            }

            .navbar .navbar-nav {
              width: 100%;
              gap: 2px !important;
            }

            .navbar .nav-item {
              width: 100%;
              margin-left: 0 !important;
            }

            .navbar .nav-link {
              width: 100%;
              padding: 11px 14px !important;
            }

            .navbar .btn {
              width: 100%;
              margin-top: 8px;
            }

            .navbar .navbar-nav .nav-item:last-child {
              width: auto;
            }
          }

          @media (max-width: 575.98px) {
            .navbar .navbar-brand {
              margin-right: 15px !important;
            }

            .navbar .navbar-brand span:first-child {
              width: 36px !important;
              height: 36px !important;
            }

            .navbar .navbar-brand span span {
              font-size: 17px !important;
            }
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;