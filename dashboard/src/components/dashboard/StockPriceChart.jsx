import { useEffect, useMemo, useRef, useState } from "react";

import socket from "../../api/marketSocket";


// ============================================================
// STOCK PRICE CHART
// Pure SVG trading chart
//
// Why SVG here?
// The previous Lightweight Charts implementation was receiving
// live data correctly, but the chart canvas was remaining blank.
// This version renders the candles directly with SVG, so there
// is no chart-library initialization/canvas dependency.
// ============================================================

function StockPriceChart({ stock }) {

  // ==========================================================
  // STATE
  // ==========================================================

  const [liveData, setLiveData] =
    useState(null);

  const [candles, setCandles] =
    useState([]);

  const [timeframe, setTimeframe] =
    useState("1D");

  const [showIndicator, setShowIndicator] =
    useState(false);

  const [isConnected, setIsConnected] =
    useState(false);

  const [hoveredCandle, setHoveredCandle] =
    useState(null);

  // Chart zoom:
  // 1 = normal, >1 = zoomed in, <1 = zoomed out.
  const [zoomLevel, setZoomLevel] =
    useState(1);


  // ==========================================================
  // REFS
  // ==========================================================

  const lastTimestampRef =
    useRef(0);

  const candleMapRef =
    useRef(new Map());

  // Horizontal chart viewport.
  const chartScrollRef =
    useRef(null);

  // Actual visible width of the chart container.
  // This keeps the price scale at the real right edge instead
  // of stopping around the old fixed 900px minimum width.
  const [viewportWidth, setViewportWidth] =
    useState(0);


  // ==========================================================
  // CHART VIEWPORT SIZE
  // ==========================================================

  useEffect(() => {
    const element = chartScrollRef.current;

    if (!element) {
      return;
    }

    const updateViewportWidth = () => {
      const width =
        element.clientWidth;

      if (width > 0) {
        setViewportWidth(width);
      }
    };

    updateViewportWidth();

    if (typeof ResizeObserver !== "undefined") {
      const observer =
        new ResizeObserver(
          updateViewportWidth
        );

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    }

    window.addEventListener(
      "resize",
      updateViewportWidth
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateViewportWidth
      );
    };
  }, []);


  // ==========================================================
  // TIMEFRAME SETTINGS
  // ==========================================================

  const timeframeBars = {
    "1D": 60,
    "1W": 60,
    "1M": 60,
    "3M": 60,
    "1Y": 60,
    "5Y": 60,
  };


  // ==========================================================
  // SOCKET CONNECTION
  // ==========================================================

  useEffect(() => {

    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };


    socket.on(
      "connect",
      handleConnect
    );

    socket.on(
      "disconnect",
      handleDisconnect
    );


    setIsConnected(
      socket.connected
    );


    return () => {

      socket.off(
        "connect",
        handleConnect
      );

      socket.off(
        "disconnect",
        handleDisconnect
      );

    };

  }, []);


  // ==========================================================
  // MARKET DATA
  // ==========================================================

  useEffect(() => {

    if (!stock?.stock) {
      return;
    }


    const symbol =
      stock.stock
        .toString()
        .trim()
        .toUpperCase();


    // --------------------------------------------------------
    // Reset chart
    // --------------------------------------------------------

    candleMapRef.current.clear();

    lastTimestampRef.current = 0;

    setCandles([]);

    setLiveData(null);


    // --------------------------------------------------------
    // Subscribe
    // --------------------------------------------------------

    socket.emit(
      "subscribeStock",
      symbol
    );


    // --------------------------------------------------------
    // Initial candle
    // --------------------------------------------------------

    const initialPrice =
      Number(stock.price);

    const initialChange =
      Number(stock.change || 0);


    if (
      Number.isFinite(initialPrice)
    ) {

      const now =
        Math.floor(
          Date.now() / 1000
        );


      const initialCandle = {
        time: now,

        open:
          initialPrice,

        high:
          initialPrice,

        low:
          initialPrice,

        close:
          initialPrice,

        volume:
          0,
      };


      candleMapRef.current.set(
        now,
        initialCandle
      );


      lastTimestampRef.current =
        now;


      setCandles([
        initialCandle,
      ]);


      setLiveData({

        symbol,

        price:
          initialPrice,

        open:
          initialPrice,

        high:
          initialPrice,

        low:
          initialPrice,

        close:
          initialPrice,

        volume:
          0,

        change:
          0,

        changePercent:
          Number.isFinite(
            initialChange
          )
            ? initialChange
            : 0,

        timestamp:
          new Date().toISOString(),

        prevClose:
          initialPrice,

      });

    }


    // ========================================================
    // MARKET DATA HANDLER
    // ========================================================

    const handleMarketData =
      (data) => {

        const incomingSymbol =
          data?.symbol
            ?.toString()
            .trim()
            .toUpperCase();


        if (
          incomingSymbol !==
          symbol
        ) {
          return;
        }


        const close =
          Number(
            data.close ??
            data.price
          );


        if (
          !Number.isFinite(close)
        ) {
          return;
        }


        const open =
          Number(data.open);

        const high =
          Number(data.high);

        const low =
          Number(data.low);

        const volume =
          Number(data.volume);


        const timestamp =
          new Date(
            data.timestamp ||
            Date.now()
          );


        if (
          Number.isNaN(
            timestamp.getTime()
          )
        ) {
          return;
        }


        // ----------------------------------------------------
        // Make every incoming tick a time-ordered candle.
        // This is suitable for the current live quote stream.
        // ----------------------------------------------------

        let tickTime =
          Math.floor(
            timestamp.getTime() /
              1000
          );


        if (
          tickTime <=
          lastTimestampRef.current
        ) {

          tickTime =
            lastTimestampRef.current +
            1;

        }


        lastTimestampRef.current =
          tickTime;


        const previous =
          Array.from(
            candleMapRef.current.values()
          ).at(-1);


        const previousClose =
          previous?.close ??
          (
            Number.isFinite(open)
              ? open
              : close
          );


        const candle = {

          time:
            tickTime,

          open:
            Number.isFinite(open)
              ? open
              : previousClose,

          high:
            Math.max(
              Number.isFinite(high)
                ? high
                : close,

              close,

              previousClose
            ),

          low:
            Math.min(
              Number.isFinite(low)
                ? low
                : close,

              close,

              previousClose
            ),

          close,

          volume:
            Number.isFinite(volume)
              ? volume
              : 0,

        };


        candleMapRef.current.set(
          tickTime,
          candle
        );


        // ----------------------------------------------------
        // Keep last 120 candles
        // ----------------------------------------------------

        const sorted =
          Array.from(
            candleMapRef.current.values()
          ).sort(
            (a, b) =>
              a.time - b.time
          );


        const limited =
          sorted.slice(-120);


        candleMapRef.current.clear();


        limited.forEach(
          (item) => {

            candleMapRef.current.set(
              item.time,
              item
            );

          }
        );


        setCandles(
          limited
        );


        // ----------------------------------------------------
        // Live header data
        // ----------------------------------------------------

        setLiveData({

          ...data,

          symbol,

          price:
            close,

          open:
            candle.open,

          high:
            candle.high,

          low:
            candle.low,

          close,

          volume:
            candle.volume,

          prevClose:
            Number.isFinite(
              data.prevClose
            )
              ? Number(
                  data.prevClose
                )
              : (
                  Number.isFinite(open)
                    ? open
                    : previousClose
                ),

        });

      };


    socket.on(
      "marketData",
      handleMarketData
    );


    // --------------------------------------------------------
    // Cleanup
    // --------------------------------------------------------

    return () => {

      socket.off(
        "marketData",
        handleMarketData
      );


      socket.emit(
        "unsubscribeStock",
        symbol
      );

    };

  }, [stock?.stock]);


  // ==========================================================
  // VISIBLE CANDLES
  // ==========================================================

  const visibleCandles =
    useMemo(() => {

      const bars =
        timeframeBars[
          timeframe
        ] || 60;


      return candles.slice(
        -bars
      );

    }, [
      candles,
      timeframe,
    ]);


  // ==========================================================
  // INDICATOR DATA - SMA 20
  // ==========================================================

  const smaData =
    useMemo(() => {

      if (
        !showIndicator ||
        visibleCandles.length <
          20
      ) {
        return [];
      }


      return visibleCandles.map(
        (candle, index) => {

          if (
            index < 19
          ) {
            return null;
          }


          const window =
            visibleCandles.slice(
              index - 19,
              index + 1
            );


          const sum =
            window.reduce(
              (
                total,
                item
              ) =>
                total +
                item.close,
              0
            );


          return {

            time:
              candle.time,

            value:
              sum / 20,

          };

        }
      ).filter(Boolean);

    }, [
      visibleCandles,
      showIndicator,
    ]);


  // ==========================================================
  // PRICE VALUES
  // ==========================================================

  const currentPrice =
    Number(
      liveData?.price ??
      stock?.price ??
      0
    );


  const change =
    Number(
      liveData?.change ??
      0
    );


  const changePercent =
    Number(
      liveData?.changePercent ??
      stock?.change ??
      0
    );


  const isPositive =
    change >= 0;


  const chartData =
    visibleCandles.length > 0
      ? visibleCandles
      : [
          {
            time:
              Math.floor(
                Date.now() / 1000
              ),

            open:
              Number.isFinite(
                currentPrice
              )
                ? currentPrice
                : 0,

            high:
              Number.isFinite(
                currentPrice
              )
                ? currentPrice
                : 0,

            low:
              Number.isFinite(
                currentPrice
              )
                ? currentPrice
                : 0,

            close:
              Number.isFinite(
                currentPrice
              )
                ? currentPrice
                : 0,

            volume:
              0,
          },
        ];


  // ==========================================================
  // CHART DIMENSIONS
  // ==========================================================

  // The SVG becomes wider as more candles/zoom are shown.
  // The parent container provides horizontal scrolling.
  // Large trading-terminal chart height.
  // The chart now occupies most of the available screen height.
  const chartHeight = 520;

  const leftPadding = 20;

  const rightPadding = 72;

  const topPadding = 28;

  const bottomPadding = 44;

  const volumeHeight = 92;

  // Compact gap between price and volume sections.
  const gap = 10;

  // Base candle spacing. Zoom changes this value.
  const baseStep = 18;

  const candleContentWidth =
    leftPadding +
    rightPadding +
    Math.max(
      chartData.length *
        baseStep *
        zoomLevel,
      1
    );

  // Use the real chart viewport when the candle content is
  // smaller than the screen. Once zoom/content becomes wider
  // than the viewport, horizontal scrolling remains available.
  const chartWidth = Math.max(
    viewportWidth || 0,
    900,
    candleContentWidth
  );


  const priceHeight =
    chartHeight -
    topPadding -
    bottomPadding -
    volumeHeight -
    gap;


  const priceTop =
    topPadding;


  const priceBottom =
    priceTop +
    priceHeight;


  const volumeTop =
    priceBottom +
    gap;


  const volumeBottom =
    chartHeight -
    bottomPadding;


  // ==========================================================
  // PRICE RANGE
  // ==========================================================

  const candleHigh =
    Math.max(
      ...chartData.map(
        (item) =>
          Number(item.high)
      )
    );


  const candleLow =
    Math.min(
      ...chartData.map(
        (item) =>
          Number(item.low)
      )
    );


  const rawRange =
    candleHigh -
    candleLow;


  const padding =
    rawRange > 0
      ? rawRange * 0.12
      : Math.max(
          currentPrice * 0.002,
          1
        );


  const maxPrice =
    candleHigh +
    padding;


  const minPrice =
    candleLow -
    padding;


  const priceRange =
    Math.max(
      maxPrice - minPrice,
      1
    );


  // ==========================================================
  // VOLUME RANGE
  // ==========================================================

  const maxVolume =
    Math.max(
      ...chartData.map(
        (item) =>
          Number(item.volume) || 0
      ),
      1
    );


  // ==========================================================
  // SCALE HELPERS
  // ==========================================================

  const step =
    baseStep * zoomLevel;


  const candleWidth =
    Math.max(
      4,
      Math.min(
        11,
        step * 0.58
      )
    );


  const priceToY =
    (price) =>
      priceBottom -
      (
        (price - minPrice) /
        priceRange
      ) *
        priceHeight;


  const volumeToY =
    (volume) =>
      volumeBottom -
      (
        Number(volume || 0) /
        maxVolume
      ) *
        volumeHeight;


  // ==========================================================
  // PRICE AXIS TICKS
  // ==========================================================

  const priceTicks =
    Array.from(
      { length: 5 },
      (_, index) => {

        const value =
          maxPrice -
          (
            (
              maxPrice -
              minPrice
            ) *
            index
          ) /
            4;


        return {

          value,

          y:
            priceToY(
              value
            ),

        };

      }
    );


  // ==========================================================
  // FORMATTERS
  // ==========================================================

  const formatPrice =
    (value) => {

      const number =
        Number(value);


      if (
        !Number.isFinite(number)
      ) {
        return "₹0.00";
      }


      return `₹${number.toLocaleString(
        "en-IN",
        {
          minimumFractionDigits:
            2,

          maximumFractionDigits:
            2,
        }
      )}`;

    };


  const formatAxisPrice =
    (value) => {

      const number =
        Number(value);

      if (
        !Number.isFinite(number)
      ) {
        return "₹0.00";
      }

      return `₹${number.toLocaleString(
        "en-IN",
        {
          minimumFractionDigits:
            2,
          maximumFractionDigits:
            2,
        }
      )}`;

    };


  const formatVolume =
    (value) => {

      const number =
        Number(value);


      if (
        !Number.isFinite(number)
      ) {
        return "0";
      }


      if (
        number >= 10000000
      ) {

        return `${(
          number /
          10000000
        ).toFixed(2)}Cr`;

      }


      if (
        number >= 100000
      ) {

        return `${(
          number /
          100000
        ).toFixed(2)}L`;

      }


      if (
        number >= 1000
      ) {

        return `${(
          number /
          1000
        ).toFixed(1)}K`;

      }


      return number.toString();

    };


  const formatTime =
    (timestamp) => {

      return new Date(
        timestamp * 1000
      ).toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }
      );

    };


  // ==========================================================
  // RANGE VALUES
  // ==========================================================

  const todayLow =
    Number(
      liveData?.low ??
      currentPrice
    );


  const todayHigh =
    Number(
      liveData?.high ??
      currentPrice
    );


  const weekLow =
    todayLow * 0.87;


  const weekHigh =
    todayHigh * 1.12;


  // ==========================================================
  // CHART CONTROLS
  // ==========================================================

  const zoomIn = () => {
    setZoomLevel((current) =>
      Math.min(
        2.5,
        Number((current + 0.25).toFixed(2))
      )
    );
  };


  const zoomOut = () => {
    setZoomLevel((current) =>
      Math.max(
        0.65,
        Number((current - 0.25).toFixed(2))
      )
    );
  };


  const resetZoom = () => {
    setZoomLevel(1);
  };


  // Keep the live chart at the newest candle.
  // User can scroll left afterwards to inspect older candles.
  useEffect(() => {
    const container =
      chartScrollRef.current;

    if (!container) {
      return;
    }

    requestAnimationFrame(() => {
      container.scrollLeft =
        container.scrollWidth -
        container.clientWidth;
    });
  }, [candles.length, timeframe]);


  // ==========================================================
  // SMOOTH LIVE CANDLE ANIMATION
  // ==========================================================

  // Keep the movement subtle and slower so the chart feels
  // professional rather than animated like a UI card.
  const candleEntryStyle = {
    animation:
      "trademind-live-candle 560ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    transformOrigin:
      "center bottom",
  };

  const volumeEntryStyle = {
    animation:
      "trademind-live-volume 480ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    transformOrigin:
      "center bottom",
  };


  // ==========================================================
  // NO STOCK
  // ==========================================================

  if (!stock) {

    return (

      <div
        className="trading-chart-empty"
      >

        <div className="empty-icon">
          📈
        </div>

        <h5>
          Select a stock
        </h5>

        <p>
          Select a stock from the
          Watchlist to view the
          market chart.
        </p>

      </div>

    );

  }


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <section
      className="trading-terminal"
      style={{
        width: "100%",
        minWidth: 0,
      }}
    >

      <style>
        {`
          @keyframes trademind-live-candle {
            0% {
              opacity: 0.35;
              transform: translateY(5px) scaleY(0.94);
            }

            55% {
              opacity: 0.88;
              transform: translateY(1px) scaleY(0.985);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scaleY(1);
            }
          }

          @keyframes trademind-live-volume {
            0% {
              opacity: 0.2;
              transform: scaleY(0.7);
            }

            100% {
              opacity: 1;
              transform: scaleY(1);
            }
          }
        `}
      </style>


      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="trading-header">

        <div className="stock-identity">

          <div>

            <h2>
              {stock.stock}
            </h2>

            <span>
              {stock.company ||
                stock.stock}
            </span>

          </div>


          <div className="exchange-badge">
            NSE
          </div>


          <div
            className={
              isConnected
                ? "live-badge connected"
                : "live-badge"
            }
          >

            <span className="live-dot" />

            {isConnected
              ? "LIVE"
              : "OFFLINE"}

          </div>

        </div>


        <div className="main-price">

          <strong
            style={{
              fontFamily:
                "Inter, Arial, sans-serif",
              fontVariantNumeric:
                "tabular-nums",
              letterSpacing:
                "-0.4px",
            }}
          >
            {formatPrice(
              currentPrice
            )}
          </strong>


          <span
            className={
              isPositive
                ? "positive"
                : "negative"
            }
          >

            {isPositive
              ? "+"
              : ""}

            {change.toFixed(2)}

            &nbsp;

            (
            {isPositive
              ? "+"
              : ""}

            {changePercent.toFixed(
              2
            )}
            %)

          </span>


          <small>

            As of{" "}

            {liveData?.timestamp
              ? new Date(
                  liveData.timestamp
                ).toLocaleTimeString(
                  "en-IN"
                )
              : "--"}

          </small>

        </div>


        <div className="market-stats">

          <StatCard
            title="Open"
            value={
              liveData?.open
            }
          />

          <StatCard
            title="High"
            value={
              liveData?.high
            }
            type="high"
          />

          <StatCard
            title="Low"
            value={
              liveData?.low
            }
            type="low"
          />

          <StatCard
            title="Prev. Close"
            value={
              liveData?.prevClose ??
              liveData?.open
            }
          />

          <div className="stat-card">

            <span>
              Volume
            </span>

            <strong>
              {formatVolume(
                liveData?.volume
              )}
            </strong>

          </div>

        </div>

      </div>


      {/* ====================================================
          TOOLBAR
      ==================================================== */}

      <div className="chart-toolbar">

        <div className="timeframes">

          {[
            "1D",
            "1W",
            "1M",
            "3M",
            "1Y",
            "5Y",
          ].map(
            (range) => (

              <button
                key={range}
                className={
                  timeframe ===
                  range
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setTimeframe(
                    range
                  )
                }
              >
                {range}
              </button>

            )
          )}

        </div>


        <div className="chart-actions">

          <button
            className={
              !showIndicator
                ? "active-action"
                : ""
            }
          >
            🕯 Candles
          </button>


          <button
            className={
              showIndicator
                ? "active-action"
                : ""
            }
            onClick={() =>
              setShowIndicator(
                (current) =>
                  !current
              )
            }
          >
            ╱ Indicators
          </button>


          <div
            className="chart-zoom-controls"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginLeft: "8px",
            }}
          >

            <button
              type="button"
              onClick={zoomOut}
              title="Zoom out"
              aria-label="Zoom out"
              style={{
                minWidth: "32px",
              }}
            >
              −
            </button>

            <button
              type="button"
              onClick={resetZoom}
              title="Reset zoom"
              aria-label="Reset zoom"
              style={{
                minWidth: "54px",
                fontSize: "11px",
              }}
            >
              {Math.round(
                zoomLevel * 100
              )}%
            </button>

            <button
              type="button"
              onClick={zoomIn}
              title="Zoom in"
              aria-label="Zoom in"
              style={{
                minWidth: "32px",
              }}
            >
              +
            </button>

          </div>

        </div>

      </div>


      {/* ====================================================
          CHART INFORMATION
      ==================================================== */}

      <div className="chart-information">

        <div className="chart-symbol">

          <strong>
            {stock.stock} · 1 · NSE
          </strong>

          <span
            className={
              isPositive
                ? "positive"
                : "negative"
            }
          >
            ●
          </span>

          <span>
            O{" "}
            {formatPrice(
              liveData?.open
            )}
          </span>

          <span>
            H{" "}
            {formatPrice(
              liveData?.high
            )}
          </span>

          <span>
            L{" "}
            {formatPrice(
              liveData?.low
            )}
          </span>

          <span>
            C{" "}
            {formatPrice(
              liveData?.close
            )}
          </span>

        </div>


        <div className="chart-volume-label">

          Volume{" "}

          <span>
            {formatVolume(
              liveData?.volume
            )}
          </span>

        </div>

      </div>


      {/* ====================================================
          SVG TRADING CHART
      ==================================================== */}

      <div
        ref={chartScrollRef}
        className="professional-chart"
        tabIndex={0}
        onKeyDown={(event) => {
          if (
            event.key === "+" ||
            event.key === "="
          ) {
            event.preventDefault();
            zoomIn();
          }

          if (
            event.key === "-" ||
            event.key === "_"
          ) {
            event.preventDefault();
            zoomOut();
          }

          if (
            event.key === "0"
          ) {
            event.preventDefault();
            resetZoom();
          }
        }}
        onWheel={(event) => {
          // Ctrl/Cmd + wheel = zoom.
          // Normal wheel remains normal page/trackpad scrolling.
          if (
            event.ctrlKey ||
            event.metaKey
          ) {
            event.preventDefault();

            if (event.deltaY < 0) {
              zoomIn();
            } else {
              zoomOut();
            }
          }
        }}
        style={{
          position: "relative",
          overflowX: "auto",
          overflowY: "hidden",
          height: "520px",
          minHeight: "520px",
          background: "#061522",
          scrollbarWidth: "thin",
          overscrollBehaviorX: "contain",
          WebkitOverflowScrolling: "touch",
        }}
      >

        <div
          style={{
            width:
              chartWidth < 1400
                ? "100%"
                : `${chartWidth}px`,
            minWidth:
              chartWidth < 1400
                ? "100%"
                : `${chartWidth}px`,
            height: `${chartHeight}px`,
            minHeight: `${chartHeight}px`,
          }}
        >

          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            width="100%"
            height={chartHeight}
            preserveAspectRatio="none"
            style={{
              display: "block",
              minWidth:
                chartWidth < 1400
                  ? "100%"
                  : `${chartWidth}px`,
            }}
          >

          {/* ------------------------------------------------
              Background
          ------------------------------------------------ */}

          <rect
            x="0"
            y="0"
            width={chartWidth}
            height={chartHeight}
            fill="#061522"
          />


          {/* ------------------------------------------------
              Horizontal grid
          ------------------------------------------------ */}

          {priceTicks.map(
            (tick) => (

              <g
                key={tick.value}
              >

                <line
                  x1={leftPadding}
                  x2={
                    chartWidth -
                    rightPadding
                  }
                  y1={tick.y}
                  y2={tick.y}
                  stroke="#18354a"
                  strokeWidth="1"
                  strokeDasharray="2 5"
                />

                <text
                  x={
                    chartWidth -
                    rightPadding +
                    10
                  }
                  y={
                    tick.y + 4
                  }
                  fill="#8fa7b9"
                  fontSize="11"
                  fontFamily="Inter, Arial, sans-serif"
                  fontWeight="500"
                  letterSpacing="0.15"
                >
                  {formatAxisPrice(
                    tick.value
                  )}
                </text>

              </g>

            )
          )}


          {/* ------------------------------------------------
              Vertical grid
          ------------------------------------------------ */}

          {chartData.map(
            (item, index) => {

              if (
                index %
                  Math.max(
                    1,
                    Math.floor(
                      chartData.length /
                        7
                    )
                  ) !==
                0
              ) {
                return null;
              }


              const x =
                leftPadding +
                step *
                  index +
                step / 2;


              return (

                <g
                  key={`grid-${item.time}`}
                >

                  <line
                    x1={x}
                    x2={x}
                    y1={priceTop}
                    y2={volumeBottom}
                    stroke="#163247"
                    strokeWidth="1"
                    strokeDasharray="2 6"
                  />

                  <text
                    x={x}
                    y={
                      chartHeight -
                      20
                    }
                    textAnchor="middle"
                    fill="#6f879b"
                    fontSize="11"
                  >
                    {formatTime(
                      item.time
                    )}
                  </text>

                </g>

              );

            }
          )}


          {/* ------------------------------------------------
              Current price line
          ------------------------------------------------ */}

          <line
            style={{
              transition:
                "y1 240ms ease-out, y2 240ms ease-out",
            }}
            x1={leftPadding}
            x2={
              chartWidth -
              rightPadding
            }
            y1={
              priceToY(
                currentPrice
              )
            }
            y2={
              priceToY(
                currentPrice
              )
            }
            stroke="#00c896"
            strokeWidth="1"
            strokeDasharray="5 5"
            opacity="0.9"
          />


          {/* ------------------------------------------------
              Current price label
          ------------------------------------------------ */}

          <rect
            style={{
              transition:
                "y 240ms ease-out",
            }}
            x={
              chartWidth -
              rightPadding +
              3
            }
            y={
              priceToY(
                currentPrice
              ) - 13
            }
            width="78"
            height="26"
            rx="5"
            fill="#00c896"
          />

          <text
            x={
              chartWidth -
              rightPadding +
              42
            }
            y={
              priceToY(
                currentPrice
              ) + 5
            }
            textAnchor="middle"
            fill="#04131d"
            fontFamily="Inter, Arial, sans-serif"
            fontSize="11.5"
            fontWeight="700"
            letterSpacing="0.05"
          >
            {formatPrice(
              currentPrice
            )}
          </text>


          {/* ------------------------------------------------
              Volume bars
          ------------------------------------------------ */}

          {chartData.map(
            (item, index) => {

              const x =
                leftPadding +
                step *
                  index +
                step / 2;


              const volume =
                Number(
                  item.volume
                ) || 0;


              const y =
                volumeToY(
                  volume
                );


              const barHeight =
                volumeBottom -
                y;


              const bullish =
                item.close >=
                item.open;


              const isLatestVolume =
                index ===
                chartData.length - 1;


              return (

                <rect
                  key={`volume-${item.time}`}
                  x={
                    x -
                    candleWidth /
                      2
                  }
                  y={y}
                  width={
                    candleWidth
                  }
                  height={
                    Math.max(
                      barHeight,
                      1
                    )
                  }
                  fill={
                    bullish
                      ? "rgba(0,200,150,0.45)"
                      : "rgba(255,77,90,0.45)"
                  }
                  style={
                    isLatestVolume
                      ? volumeEntryStyle
                      : undefined
                  }
                />

              );

            }
          )}


          {/* ------------------------------------------------
              Candles
          ------------------------------------------------ */}

          {chartData.map(
            (item, index) => {

              const x =
                leftPadding +
                step *
                  index +
                step / 2;


              const openY =
                priceToY(
                  item.open
                );


              const closeY =
                priceToY(
                  item.close
                );


              const highY =
                priceToY(
                  item.high
                );


              const lowY =
                priceToY(
                  item.low
                );


              const bullish =
                item.close >=
                item.open;


              const bodyTop =
                Math.min(
                  openY,
                  closeY
                );


              const bodyHeight =
                Math.max(
                  Math.abs(
                    closeY -
                    openY
                  ),
                  3
                );


              const candleColor =
                bullish
                  ? "#00c896"
                  : "#ff4d5a";


              const isLatestCandle =
                index ===
                chartData.length - 1;


              return (

                <g
                  key={`candle-${item.time}`}
                  onMouseEnter={() =>
                    setHoveredCandle(
                      item
                    )
                  }
                  style={
                    isLatestCandle
                      ? candleEntryStyle
                      : undefined
                  }
                  onMouseLeave={() =>
                    setHoveredCandle(
                      null
                    )
                  }
                  style={{
                    cursor:
                      "crosshair",
                  }}
                >

                  {/* wick */}

                  <line
                    x1={x}
                    x2={x}
                    y1={highY}
                    y2={lowY}
                    stroke={
                      candleColor
                    }
                    strokeWidth="1.5"
                  />


                  {/* body */}

                  <rect
                    x={
                      x -
                      candleWidth /
                        2
                    }
                    y={bodyTop}
                    width={
                      candleWidth
                    }
                    height={
                      bodyHeight
                    }
                    rx="1"
                    fill={
                      candleColor
                    }
                  />

                </g>

              );

            }
          )}


          {/* ------------------------------------------------
              SMA 20
          ------------------------------------------------ */}

          {showIndicator &&
            smaData.length > 0 && (

              <polyline
                points={
                  smaData.map(
                    (item) => {

                      const index =
                        chartData.findIndex(
                          (candle) =>
                            candle.time ===
                            item.time
                        );


                      const x =
                        leftPadding +
                        step *
                          index +
                        step /
                          2;


                      const y =
                        priceToY(
                          item.value
                        );


                      return `${x},${y}`;

                    }
                  ).join(" ")
                }
                fill="none"
                stroke="#f5b942"
                strokeWidth="2"
              />

            )}


          {/* ------------------------------------------------
              Hover marker
          ------------------------------------------------ */}

          {hoveredCandle && (

            <g>

              {(() => {

                const index =
                  chartData.findIndex(
                    (item) =>
                      item.time ===
                      hoveredCandle.time
                  );


                const x =
                  leftPadding +
                  step *
                    index +
                  step / 2;


                const y =
                  priceToY(
                    hoveredCandle.close
                  );


                return (

                  <>

                    <line
                      x1={x}
                      x2={x}
                      y1={priceTop}
                      y2={volumeBottom}
                      stroke="#71889a"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />

                    <circle
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#ffffff"
                      stroke="#00c896"
                      strokeWidth="2"
                    />

                    <rect
                      x={
                        Math.min(
                          x + 12,
                          chartWidth -
                            205
                        )
                      }
                      y={
                        Math.max(
                          y - 75,
                          12
                        )
                      }
                      width="190"
                      height="68"
                      rx="8"
                      fill="#0b2437"
                      stroke="#25455d"
                    />

                    <text
                      x={
                        Math.min(
                          x + 25,
                          chartWidth -
                            192
                        )
                      }
                      y={
                        Math.max(
                          y - 51,
                          36
                        )
                      }
                      fill="#8da4b7"
                      fontSize="11"
                    >
                      {formatTime(
                        hoveredCandle.time
                      )}
                    </text>

                    <text
                      x={
                        Math.min(
                          x + 25,
                          chartWidth -
                            192
                        )
                      }
                      y={
                        Math.max(
                          y - 31,
                          56
                        )
                      }
                      fill="#00c896"
                      fontSize="12"
                      fontWeight="700"
                    >
                      C {formatPrice(
                        hoveredCandle.close
                      )}
                    </text>

                    <text
                      x={
                        Math.min(
                          x + 25,
                          chartWidth -
                            192
                        )
                      }
                      y={
                        Math.max(
                          y - 13,
                          74
                        )
                      }
                      fill="#8da4b7"
                      fontSize="11"
                    >
                      Vol{" "}
                      {formatVolume(
                        hoveredCandle.volume
                      )}
                    </text>

                  </>

                );

              })()}

            </g>

          )}

          </svg>

        </div>

      </div>


      {/* ====================================================
          BOTTOM SUMMARY
      ==================================================== */}

      <div className="market-summary">

        <RangeCard
          title="Today's Range"
          low={
            todayLow
          }
          high={
            todayHigh
          }
          current={
            currentPrice
          }
        />


        <RangeCard
          title="52 Week Range"
          low={
            weekLow
          }
          high={
            weekHigh
          }
          current={
            currentPrice
          }
        />


        <InfoCard
          title="Volume"
          value={formatVolume(
            liveData?.volume
          )}
          icon="▂▅▇"
        />


        <InfoCard
          title="Market Cap"
          value="₹16.89L Cr"
        />


        <InfoCard
          title="P/E Ratio"
          value="29.48"
        />


        <InfoCard
          title="Dividend Yield"
          value="0.67%"
        />


        <InfoCard
          title="Exchange"
          value="NSE"
        />

      </div>

    </section>

  );
}


// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  title,
  value,
  type,
}) {

  return (

    <div className="stat-card">

      <span>
        {title}
      </span>

      <strong
        className={
          type === "high"
            ? "positive"
            : type === "low"
              ? "negative"
              : ""
        }
      >

        {value !== undefined
          ? `₹${Number(
              value
            ).toLocaleString(
              "en-IN",
              {
                minimumFractionDigits:
                  2,

                maximumFractionDigits:
                  2,
              }
            )}`
          : "--"}

      </strong>

    </div>

  );
}


// ============================================================
// RANGE CARD
// ============================================================

function RangeCard({
  title,
  low,
  high,
  current,
}) {

  const min =
    Number(low || 0);

  const max =
    Number(high || 0);

  const price =
    Number(current || 0);


  const percentage =
    max > min
      ? Math.min(
          100,
          Math.max(
            0,
            (
              (price - min) /
              (max - min)
            ) * 100
          )
        )
      : 50;


  return (

    <div className="range-card">

      <span className="summary-title">
        {title}
      </span>


      <div className="range-track">

        <div
          className="range-progress"
          style={{
            width:
              `${percentage}%`,
          }}
        />


        <div
          className="range-dot"
          style={{
            left:
              `${percentage}%`,
          }}
        />

      </div>


      <div className="range-values">

        <span>
          ₹{min.toLocaleString(
            "en-IN",
            {
              minimumFractionDigits:
                2,

              maximumFractionDigits:
                2,
            }
          )}
        </span>

        <span>
          ₹{max.toLocaleString(
            "en-IN",
            {
              minimumFractionDigits:
                2,

              maximumFractionDigits:
                2,
            }
          )}
        </span>

      </div>

    </div>

  );
}


// ============================================================
// INFO CARD
// ============================================================

function InfoCard({
  title,
  value,
  icon,
}) {

  return (

    <div className="info-card">

      <span>
        {title}
      </span>

      <strong>
        {value}
      </strong>


      {icon && (

        <small className="info-icon">
          {icon}
        </small>

      )}

    </div>

  );
}


export default StockPriceChart;
