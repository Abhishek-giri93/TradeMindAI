import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useMemo, useState } from "react";


// ==========================================
// DEMO PORTFOLIO HISTORY
// ==========================================

const PORTFOLIO_HISTORY = {
  "1D": [
    { time: "09:15", value: 13480 },
    { time: "10:00", value: 13520 },
    { time: "11:00", value: 13490 },
    { time: "12:00", value: 13620 },
    { time: "13:00", value: 13580 },
    { time: "14:00", value: 13740 },
    { time: "15:00", value: 13896.4 },
  ],

  "1W": [
    { time: "Mon", value: 13240 },
    { time: "Tue", value: 13420 },
    { time: "Wed", value: 13380 },
    { time: "Thu", value: 13610 },
    { time: "Fri", value: 13896.4 },
  ],

  "1M": [
    { time: "Week 1", value: 12600 },
    { time: "Week 2", value: 12950 },
    { time: "Week 3", value: 13320 },
    { time: "Week 4", value: 13896.4 },
  ],

  "3M": [
    { time: "Jul", value: 11800 },
    { time: "Aug", value: 12450 },
    { time: "Sep", value: 13120 },
    { time: "Oct", value: 13896.4 },
  ],

  "1Y": [
    { time: "Oct", value: 9800 },
    { time: "Dec", value: 10600 },
    { time: "Feb", value: 11200 },
    { time: "Apr", value: 12100 },
    { time: "Jun", value: 12900 },
    { time: "Aug", value: 13500 },
    { time: "Oct", value: 13896.4 },
  ],
};


// ==========================================
// TIMEFRAME OPTIONS
// ==========================================

const TIMEFRAMES = [
  "1D",
  "1W",
  "1M",
  "3M",
  "1Y",
];


// ==========================================
// PORTFOLIO FLUCTUATION
// ==========================================

function PortfolioFluctuation({
  holdings = [],
  isLoading = false,
}) {

  const [timeframe, setTimeframe] =
    useState("1D");


  // ========================================
  // CURRENT PORTFOLIO VALUE
  // ========================================

  const currentValue = useMemo(() => {

    return holdings.reduce(
      (total, holding) =>
        total +
        Number(
          holding.current_value || 0
        ),
      0
    );

  }, [holdings]);


  // ========================================
  // CHART DATA
  // ========================================

  const chartData =
    PORTFOLIO_HISTORY[timeframe];


  // ========================================
  // STARTING VALUE
  // ========================================

  const startingValue =
    chartData.length > 0
      ? chartData[0].value
      : 0;


  // ========================================
  // ENDING VALUE
  // ========================================

  const endingValue =
    chartData.length > 0
      ? chartData[
          chartData.length - 1
        ].value
      : 0;


  // ========================================
  // CHANGE
  // ========================================

  const change =
    endingValue - startingValue;


  // ========================================
  // CHANGE %
  // ========================================

  const changePercent =
    startingValue > 0
      ? (change / startingValue) * 100
      : 0;


  // ========================================
  // POSITIVE / NEGATIVE
  // ========================================

  const isPositive =
    change >= 0;


  // ========================================
  // FORMAT CURRENCY
  // ========================================

  const formatCurrency = (value) => {

    return Number(value || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  };


  // ========================================
  // LOADING STATE
  // ========================================

  if (isLoading) {

    return (
      <div className="portfolio-fluctuation">

        <div className="portfolio-fluctuation-header">

          <div>

            <span className="portfolio-fluctuation-eyebrow">
              PERFORMANCE
            </span>

            <h2>
              Portfolio Fluctuation
            </h2>

            <p>
              Track your portfolio performance
            </p>

          </div>

        </div>

        <div className="portfolio-fluctuation-loading">

          <div
            className="spinner-border spinner-border-sm"
            role="status"
          />

          <span>
            Loading portfolio data...
          </span>

        </div>

      </div>
    );

  }


  // ========================================
  // MAIN UI
  // ========================================

  return (

    <div className="portfolio-fluctuation">


      {/* ====================================
          HEADER
      ==================================== */}

      <div className="portfolio-fluctuation-header">

        <div>

          <span className="portfolio-fluctuation-eyebrow">
            PERFORMANCE
          </span>

          <h2>
            Portfolio Fluctuation
          </h2>

          <p>
            Track your portfolio performance
          </p>

        </div>

        <div
          className={
            isPositive
              ? "portfolio-performance-badge positive"
              : "portfolio-performance-badge negative"
          }
        >

          {isPositive ? "+" : ""}
          {changePercent.toFixed(2)}%

        </div>

      </div>


      {/* ====================================
          VALUE SUMMARY
      ==================================== */}

      <div className="portfolio-fluctuation-summary">

        <div>

          <span>
            Current Value
          </span>

          <strong>
            ₹
            {formatCurrency(
              currentValue || endingValue
            )}
          </strong>

        </div>


        <div
          className={
            isPositive
              ? "portfolio-change positive"
              : "portfolio-change negative"
          }
        >

          <span>
            {timeframe} Change
          </span>

          <strong>

            {isPositive ? "+" : "-"}
            ₹
            {formatCurrency(
              Math.abs(change)
            )}

          </strong>

        </div>

      </div>


      {/* ====================================
          TIMEFRAME
      ==================================== */}

      <div className="portfolio-timeframes">

        {TIMEFRAMES.map(
          (item) => (

            <button
              key={item}
              type="button"
              className={
                timeframe === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                setTimeframe(item)
              }
            >
              {item}
            </button>

          )
        )}

      </div>


      {/* ====================================
          CHART
      ==================================== */}

      <div className="portfolio-fluctuation-chart">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={chartData}
            margin={{
              top: 12,
              right: 8,
              left: 4,
              bottom: 4,
            }}
          >

            <defs>

              <linearGradient
                id="portfolioGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#00C896"
                  stopOpacity={0.28}
                />

                <stop
                  offset="100%"
                  stopColor="#00C896"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>


            {/* GRID */}

            <CartesianGrid
              stroke="#153247"
              strokeDasharray="3 5"
              vertical={false}
            />


            {/* X AXIS */}

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#668296",
                fontSize: 10,
              }}
              dy={8}
            />


            {/* Y AXIS */}

            <YAxis
              axisLine={false}
              tickLine={false}
              width={65}
              tick={{
                fill: "#668296",
                fontSize: 10,
              }}
              tickFormatter={(value) =>
                `₹${Number(
                  value
                ).toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}`
              }
              domain={[
                "dataMin - 300",
                "dataMax + 300",
              ]}
            />


            {/* TOOLTIP */}

            <Tooltip
              cursor={{
                stroke: "#456276",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                backgroundColor:
                  "#0A2030",
                border:
                  "1px solid #1B4056",
                borderRadius: "9px",
                boxShadow:
                  "0 12px 30px rgba(0,0,0,0.35)",
              }}
              labelStyle={{
                color: "#7F9AAD",
                fontSize: "10px",
                marginBottom: "4px",
              }}
              itemStyle={{
                color: "#00C896",
                fontSize: "12px",
                fontWeight: 600,
              }}
              formatter={(value) => [
                `₹${formatCurrency(
                  value
                )}`,
                "Portfolio Value",
              ]}
            />


            {/* AREA */}

            <Area
              type="monotone"
              dataKey="value"
              stroke="#00C896"
              strokeWidth={2.5}
              fill="url(#portfolioGradient)"
              fillOpacity={1}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#00C896",
                stroke: "#061522",
                strokeWidth: 3,
              }}
              isAnimationActive={true}
              animationDuration={900}
              animationEasing="ease-out"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>


      {/* ====================================
          FOOTER
      ==================================== */}

      <div className="portfolio-fluctuation-footer">

        <span>
          Portfolio value movement
        </span>

        <strong
          className={
            isPositive
              ? "positive"
              : "negative"
          }
        >

          {isPositive
            ? "▲"
            : "▼"}

          {" "}

          {Math.abs(
            changePercent
          ).toFixed(2)}%

        </strong>

      </div>

    </div>
  );
}


export default PortfolioFluctuation;