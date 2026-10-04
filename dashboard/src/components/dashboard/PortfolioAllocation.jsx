import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

// ==========================================
// PORTFOLIO COLORS
// ==========================================

const CHART_COLORS = [
  "#00C896",
  "#3B82F6",
  "#8B5CF6",
  "#F59E0B",
  "#06B6D4",
  "#EC4899",
  "#64748B",
  "#10B981",
];

// ==========================================
// PORTFOLIO ALLOCATION
// ==========================================

function PortfolioAllocation({
  holdings = [],
  isLoading = false,
}) {
  // ==========================================
  // PREPARE DATA
  // ==========================================

  const chartData = holdings
    .filter(
      (holding) =>
        Number(holding.investment || 0) > 0
    )
    .map((holding) => ({
      name: holding.stock_symbol,
      value: Number(holding.investment || 0),
    }));

  // ==========================================
  // FORMAT CURRENCY
  // ==========================================

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  // ==========================================
  // TOTAL INVESTMENT
  // ==========================================

  const totalInvestment = chartData.reduce(
    (total, item) => total + item.value,
    0
  );

  // ==========================================
  // PERCENTAGE
  // ==========================================

  const getPercentage = (value) => {
    if (totalInvestment <= 0) {
      return 0;
    }

    return (value / totalInvestment) * 100;
  };

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (isLoading) {
    return (
      <div className="portfolio-full-page">

        <div className="portfolio-page-header">

          <div>
            <span className="portfolio-page-eyebrow">
              PORTFOLIO
            </span>

            <h1 className="portfolio-page-title">
              Portfolio Allocation
            </h1>

            <p className="portfolio-page-subtitle">
              Distribution of your investments
            </p>
          </div>

          <div className="portfolio-live-badge">
            <span className="portfolio-live-dot" />
            LIVE
          </div>

        </div>

        <div className="portfolio-loading-screen">

          <div
            className="spinner-border"
            role="status"
          />

          <p>
            Loading portfolio data...
          </p>

        </div>

      </div>
    );
  }

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (chartData.length === 0) {
    return (
      <div className="portfolio-full-page">

        <div className="portfolio-page-header">

          <div>
            <span className="portfolio-page-eyebrow">
              PORTFOLIO
            </span>

            <h1 className="portfolio-page-title">
              Portfolio Allocation
            </h1>

            <p className="portfolio-page-subtitle">
              Distribution of your investments
            </p>
          </div>

        </div>

        <div className="portfolio-empty-screen">

          <div className="portfolio-empty-icon">
            📊
          </div>

          <h2>
            No investments yet
          </h2>

          <p>
            Your portfolio allocation will appear
            here once you start investing.
          </p>

        </div>

      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="portfolio-full-page">

      {/* ======================================
          PAGE HEADER
      ======================================= */}

      <div className="portfolio-page-header">

        <div>

          <span className="portfolio-page-eyebrow">
            PORTFOLIO
          </span>

          <h1 className="portfolio-page-title">
            Portfolio Allocation
          </h1>

          <p className="portfolio-page-subtitle">
            Distribution of your investments
          </p>

        </div>

        <div className="portfolio-live-badge">

          <span className="portfolio-live-dot" />

          LIVE

        </div>

      </div>


      {/* ======================================
          MAIN CONTENT
      ======================================= */}

      <div className="portfolio-page-content">

        {/* ====================================
            LEFT — LARGE DONUT
        ===================================== */}

        <section className="portfolio-chart-panel">

          <div className="portfolio-panel-header">

            <div>

              <h2>
                Asset Distribution
              </h2>

              <p>
                Investment allocation across
                your holdings
              </p>

            </div>

            <div className="portfolio-total-mini">

              <span>
                Total Invested
              </span>

              <strong>
                ₹{formatCurrency(totalInvestment)}
              </strong>

            </div>

          </div>


          {/* CHART */}

          <div className="portfolio-large-chart">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="48%"
                  outerRadius="72%"
                  paddingAngle={3}
                  cornerRadius={4}
                  label={false}
                  labelLine={false}
                  isAnimationActive={true}
                  animationDuration={900}
                  animationEasing="ease-out"
                >

                  {chartData.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          CHART_COLORS[
                            index %
                              CHART_COLORS.length
                          ]
                        }
                        stroke="#071A29"
                        strokeWidth={4}
                      />
                    )
                  )}

                  {/* ==========================
                      CENTER CONTENT
                  =========================== */}

                  <Label
                    position="center"
                    content={() => (
                      <g>

                        <text
                          x="50%"
                          y="46%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="allocation-center-label-large"
                        >
                          ₹
                          {formatCurrency(
                            totalInvestment
                          )}
                        </text>

                        <text
                          x="50%"
                          y="56%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="allocation-center-subtitle-large"
                        >
                          Total Invested
                        </text>

                      </g>
                    )}
                  />

                </Pie>


                {/* ==========================
                    TOOLTIP
                =========================== */}

                <Tooltip
                  contentStyle={{
                    backgroundColor:
                      "#0B1F30",
                    border:
                      "1px solid #1E4058",
                    borderRadius:
                      "10px",
                    boxShadow:
                      "0 12px 30px rgba(0,0,0,0.35)",
                  }}
                  labelStyle={{
                    color: "#ffffff",
                    fontWeight: 600,
                  }}
                  itemStyle={{
                    color: "#D7E3EC",
                  }}
                  formatter={(
                    value,
                    name
                  ) => [
                    `₹${formatCurrency(value)}`,
                    name,
                  ]}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </section>


        {/* ====================================
            RIGHT — PORTFOLIO DETAILS
        ===================================== */}

        <section className="portfolio-details-panel">

          {/* SUMMARY */}

          <div className="portfolio-summary-box">

            <span>
              Total Investment
            </span>

            <strong>
              ₹{formatCurrency(
                totalInvestment
              )}
            </strong>

            <small>
              Across {chartData.length}{" "}
              {chartData.length === 1
                ? "stock"
                : "stocks"}
            </small>

          </div>


          {/* HOLDINGS HEADER */}

          <div className="portfolio-holdings-header">

            <div>

              <h2>
                Your Holdings
              </h2>

              <p>
                Allocation by investment value
              </p>

            </div>

            <span>
              {chartData.length}
            </span>

          </div>


          {/* HOLDINGS LIST */}

          <div className="portfolio-full-list">

            {chartData.map(
              (item, index) => {

                const percentage =
                  getPercentage(
                    item.value
                  );

                const chartColor =
                  CHART_COLORS[
                    index %
                      CHART_COLORS.length
                  ];

                return (
                  <div
                    key={item.name}
                    className="portfolio-full-row"
                  >

                    {/* STOCK INFO */}

                    <div className="portfolio-full-stock">

                      <span
                        className="portfolio-full-dot"
                        style={{
                          backgroundColor:
                            chartColor,
                        }}
                      />

                      <div>

                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          Equity
                        </span>

                      </div>

                    </div>


                    {/* VALUE */}

                    <div className="portfolio-full-value">

                      <strong>
                        ₹
                        {formatCurrency(
                          item.value
                        )}
                      </strong>

                      <span>
                        {percentage.toFixed(
                          1
                        )}
                        %
                      </span>

                    </div>


                    {/* PROGRESS */}

                    <div className="portfolio-progress">

                      <div
                        className="portfolio-progress-fill"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor:
                            chartColor,
                        }}
                      />

                    </div>

                  </div>
                );
              }
            )}

          </div>


          {/* FOOTER */}

          <div className="portfolio-details-footer">

            <span>
              Portfolio allocation
            </span>

            <strong>
              {chartData.length} Holdings
            </strong>

          </div>

        </section>

      </div>

    </div>
  );
}

export default PortfolioAllocation;