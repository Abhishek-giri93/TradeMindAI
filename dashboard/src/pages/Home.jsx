import { Link, useNavigate } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


// ==================================================
// PORTFOLIO DATA
// ==================================================

const portfolioData = [
  { day: "Mon", value: 50000 },
  { day: "Tue", value: 50800 },
  { day: "Wed", value: 51500 },
  { day: "Thu", value: 52500 },
  { day: "Fri", value: 54500 },
];


// ==================================================
// HERO SECTION
// ==================================================

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero py-5">
      <div className="container">

        <div className="row align-items-center min-vh-75">

          {/* Hero Content */}

          <div className="col-12 col-lg-6">

            <p className="text-secondary fw-semibold mb-2">
              AI Powered Trading Platform
            </p>

            <h1 className="display-4 fw-bold mb-3">
              Trade Smarter with
              <span className="d-block">
                TradeMind AI
              </span>
            </h1>

            <p className="lead text-secondary mb-4">
              Analyze your portfolio, understand market trends,
              and make smarter trading decisions with AI-powered insights.
            </p>

            <div className="d-flex flex-wrap gap-3">

              <button
                className="btn btn-dark px-4 py-2"
                onClick={() => navigate("/dashboard")}
              >
                Get Started
              </button>

              <button
                className="btn btn-outline-dark px-4 py-2"
                onClick={() => navigate("/dashboard")}
              >
                Explore Dashboard
              </button>

            </div>

          </div>


          {/* Hero Dashboard Preview */}

          <div className="col-12 col-lg-6 mt-5 mt-lg-0">

          <div className="hero-preview">

{/* Preview Header */}

<div className="preview-top">
  <div>
    <small>Portfolio Value</small>
    <h3>₹54,500</h3>
  </div>

  <span className="profit">
    +8.42%
  </span>
</div>


{/* Chart */}

<div className="hero-chart">

  <div className="hero-chart-title">
    Performance
  </div>

  <div className="hero-chart-area">

    <ResponsiveContainer width="100%" height="100%">

      <LineChart
        data={portfolioData}
        margin={{
          top: 10,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >

        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 11 }}
        />

        <YAxis hide />

        <Tooltip
          formatter={(value) => [
            `₹${value.toLocaleString("en-IN")}`,
            "Portfolio",
          ]}
        />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#1f3b5b"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 5 }}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

</div>


{/* Statistics */}

<div className="row g-2">

  <div className="col-6">

    <div className="preview-stat">

      <small>
        Investment
      </small>

      <strong>
        ₹50,000
      </strong>

    </div>

  </div>


  <div className="col-6">

    <div className="preview-stat">

      <small>
        Profit
      </small>

      <strong className="profit">
        +₹4,500
      </strong>

    </div>

  </div>

</div>

</div>

          </div>

        </div>

      </div>
    </section>
  );
}


// ==================================================
// FEATURES SECTION
// ==================================================

function FeaturesSection() {
  return (
    // ==================================================
    // FEATURES SECTION
    // ==================================================

    <section className="features py-5">

      <div className="container">

        {/* Section Header */}
        <div className="text-center mb-5">
          <h2>Everything You Need to Trade Smarter</h2>

          <p className="text-secondary">
            Powerful tools to understand the market and manage your portfolio.
          </p>
        </div>


        {/* Feature Cards */}
        <div className="row g-4">

          {/* Market Analysis */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="feature-card h-100">

              <div className="feature-icon">
                📊
              </div>

              <h5>Market Analysis</h5>

              <p>
                Analyze market trends and stock performance
                with clear and useful insights.
              </p>

            </div>
          </div>


          {/* AI Insights */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="feature-card h-100">

              <div className="feature-icon">
                🤖
              </div>

              <h5>AI Insights</h5>

              <p>
                Get intelligent insights to help you understand
                market opportunities and risks.
              </p>

            </div>
          </div>


          {/* Portfolio Analytics */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="feature-card h-100">

              <div className="feature-icon">
                📈
              </div>

              <h5>Portfolio Analytics</h5>

              <p>
                Track your investments and understand your
                portfolio performance at a glance.
              </p>

            </div>
          </div>


          {/* Quick Decisions */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="feature-card h-100">

              <div className="feature-icon">
                ⚡
              </div>

              <h5>Quick Decisions</h5>

              <p>
                Access important information quickly and make
                better-informed trading decisions.
              </p>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}


// ==================================================
// HOW IT WORKS SECTION
// ==================================================

function HowItWorksSection() {
  return (
    <>
      {/* ==================================================
          HOW IT WORKS SECTION
          ================================================== */}

      <section className="how-it-works py-5">

        <div className="container">

          {/* Section Header */}
          <div className="text-center mb-5">

            <p className="text-secondary fw-semibold mb-2">
              HOW IT WORKS
            </p>

            <h2 className="fw-bold">
              Trade smarter in three simple steps
            </h2>

            <p className="text-secondary">
              Everything you need, from analysis to decision.
            </p>

          </div>


          {/* Steps */}
          <div className="row g-4">

            {/* Step 1 */}
            <div className="col-12 col-md-4">

              <div className="how-card h-100 text-center">

                <div className="how-number">
                  1
                </div>

                <h5>
                  Analyze
                </h5>

                <p>
                  View your portfolio, holdings, market data,
                  and trading performance.
                </p>

              </div>

            </div>


            {/* Step 2 */}
            <div className="col-12 col-md-4">

              <div className="how-card h-100 text-center">

                <div className="how-number">
                  2
                </div>

                <h5>
                  Get AI Insights
                </h5>

                <p>
                  Use AI to understand market trends and
                  analyze your trading information.
                </p>

              </div>

            </div>


            {/* Step 3 */}
            <div className="col-12 col-md-4">

              <div className="how-card h-100 text-center">

                <div className="how-number">
                  3
                </div>

                <h5>
                  Make Decisions
                </h5>

                <p>
                  Use the insights to make more informed
                  trading decisions.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}


// ==================================================
// PLATFORM PREVIEW SECTION
// ==================================================

function PlatformPreviewSection() {
  return (
    <>
      {/* ==================================================
          PLATFORM PREVIEW SECTION
          ================================================== */}

      <section className="platform-preview py-5">

        <div className="container">

          {/* Section Header */}
          <div className="text-center mb-5">

            <p className="text-secondary fw-semibold mb-2">
              POWERFUL DASHBOARD
            </p>

            <h2 className="fw-bold">
              Everything in one place
            </h2>

            <p className="text-secondary">
              Monitor your portfolio and trading activity
              from a single dashboard.
            </p>

          </div>


          {/* Dashboard Preview */}
          <div className="row justify-content-center">

            <div className="col-12 col-lg-10">

              <div className="dashboard-preview">

                {/* Preview Header */}
                <div className="preview-header">

                  <span>
                    TradeMind AI
                  </span>

                  <span>
                    Portfolio Overview
                  </span>

                </div>


                <div className="row g-3 p-3">

                  {/* Investment */}
                  <div className="col-12 col-md-4">

                    <div className="preview-card h-100">

                      <small>
                        Total Investment
                      </small>

                      <h4>
                        ₹50,000
                      </h4>

                    </div>

                  </div>


                  {/* Current Value */}
                  <div className="col-12 col-md-4">

                    <div className="preview-card h-100">

                      <small>
                        Current Value
                      </small>

                      <h4>
                        ₹54,500
                      </h4>

                    </div>

                  </div>


                  {/* Profit / Loss */}
                  <div className="col-12 col-md-4">

                    <div className="preview-card h-100">

                      <small>
                        Profit / Loss
                      </small>

                      <h4 className="profit">
                        +₹4,500
                      </h4>

                    </div>

                  </div>


                  {/* Platform Chart */}
                  <div className="col-12">

                    <div className="preview-chart">

                      <div className="preview-chart-title">
                        Portfolio Performance
                      </div>


                      <div className="chart-area">

                        <ResponsiveContainer
                          width="100%"
                          height="100%"
                        >

                          <LineChart
                            data={portfolioData}
                            margin={{
                              top: 10,
                              right: 10,
                              left: 10,
                              bottom: 5,
                            }}
                          >

                            <XAxis
                              dataKey="day"
                              tickLine={false}
                              axisLine={false}
                              tick={{ fontSize: 12 }}
                            />

                            <YAxis hide />

                            <Tooltip
                              formatter={(value) => [
                                `₹${value.toLocaleString("en-IN")}`,
                                "Portfolio",
                              ]}
                            />

                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#1f3b5b"
                              strokeWidth={3}
                              dot={false}
                              activeDot={{ r: 5 }}
                            />

                          </LineChart>

                        </ResponsiveContainer>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}


// ==================================================
// CTA SECTION
// ==================================================

function CTASection() {
  const navigate = useNavigate();

  return (
    <>
      {/* ==================================================
          CTA SECTION
          ================================================== */}

      <section className="cta-section py-5">

        <div className="container">

          <div className="cta-box text-center">

            {/* CTA Content */}
            <h2 className="fw-bold">
              Ready to Trade Smarter?
            </h2>

            <p>
              Explore your portfolio, analyze the market,
              and make better-informed trading decisions.
            </p>

            {/* CTA Button */}
            <button
              type="button"
              className="btn btn-light px-4 py-2"
              onClick={() => navigate("/dashboard")}
            >
              Explore Dashboard
            </button>

          </div>

        </div>

      </section>
    </>
  );
}


// ==================================================
// FOOTER SECTION
// ==================================================

function FooterSection() {
  return (
    <>
      {/* ==================================================
          FOOTER SECTION
          ================================================== */}

      <footer className="footer-section">

        <div className="container py-5">

          <div className="row g-4">

            {/* Brand */}
            <div className="col-12 col-md-6 col-lg-5">

              <h5>
                TradeMind AI
              </h5>

              <p>
                A smart trading dashboard designed to help
                you analyze the market, understand your
                portfolio, and make informed decisions.
              </p>

            </div>


            {/* Platform */}
            <div className="col-6 col-md-3 col-lg-3">

              <h6>
                Platform
              </h6>

              <Link to="/dashboard">
                Dashboard
              </Link>

              <Link to="/orders">
                Orders
              </Link>

              <Link to="/funds">
                Funds
              </Link>

            </div>


            {/* Explore */}
            <div className="col-6 col-md-3 col-lg-4">

              <h6>
                Explore
              </h6>

              <Link to="/">
                Home
              </Link>

              <Link to="/apps">
                Apps
              </Link>

            </div>

          </div>


          {/* Footer Bottom */}
          <div className="footer-bottom mt-4">

            <span>
              © 2026 TradeMind AI. All rights reserved.
            </span>

            <span>
              Smart tools. Better decisions.
            </span>

          </div>

        </div>

      </footer>
    </>
  );
}


// ==================================================
// HOME PAGE
// ==================================================

function Home() {
  return (
    <>
      <HeroSection />

      <FeaturesSection />

      <HowItWorksSection />

      <PlatformPreviewSection />

      <CTASection />

      <FooterSection />
    </>
  );
}


export default Home;