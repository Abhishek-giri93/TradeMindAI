require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = 3000;


// ==================================================
// ALLOWED ORIGINS
// ==================================================

const allowedOrigin = [
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL
].filter(Boolean);


// ==================================================
// HTTP SERVER
// ==================================================

const server = http.createServer(app);


// ==================================================
// SOCKET.IO
// ==================================================

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    credentials: true
  }
});


// ==================================================
// MIDDLEWARE
// ==================================================

// JSON parsing
app.use(express.json());


// CORS
app.use(
  cors({
    origin: (origin, callback) => {

      // Allow requests without origin
      if (!origin) {
        return callback(null, true);
      }


      // Allow configured frontend origins
      if (allowedOrigin.includes(origin)) {
        return callback(null, true);
      }


      return callback(
        new Error("Origin not allowed by cors.")
      );
    },

    credentials: true
  })
);


// Cookie parser
app.use(cookieParser());


// ==================================================
// DATABASE
// ==================================================

const db = require("./config/db");


// ==================================================
// ROUTES
// ==================================================

const authRoutes =
  require("./routes/authRoutes");

const fundsRoutes =
  require("./routes/fundsRoutes");

const transactionRoutes =
  require("./routes/transactionRoutes");

const orderRoutes =
  require("./routes/orderRoutes");

const portfolioRoutes =
  require("./routes/portfolioRoutes");

const watchlistRoutes =
  require("./routes/watchlistRoutes");

const holdingsRoutes =
  require("./routes/holdingsRoutes");

const marketRoutes =
  require("./routes/market");


// ==================================================
// ROUTE MOUNTING
// ==================================================

// Auth
app.use(
  "/auth",
  authRoutes
);


// Funds
app.use(
  "/funds",
  fundsRoutes
);


// Transactions
app.use(
  "/transactions",
  transactionRoutes
);


// Orders
app.use(
  "/orders",
  orderRoutes
);


// Portfolio
app.use(
  "/portfolio",
  portfolioRoutes
);


// Watchlist
app.use(
  "/watchlist",
  watchlistRoutes
);


// Holdings
app.use(
  "/holdings",
  holdingsRoutes
);


// Market
app.use(
  "/market",
  marketRoutes
);


// ==================================================
// SOCKET.IO MARKET DATA
// ==================================================

io.on("connection", (socket) => {

  console.log(
    "Client connected:",
    socket.id
  );


  // ==================================================
  // STORE ALL STOCK STREAMS FOR THIS CLIENT
  // ==================================================

  const marketIntervals = new Map();


  // ==================================================
  // STOCK SUBSCRIPTION
  // ==================================================

  socket.on(
    "subscribeStock",
    (symbol) => {

      try {

        const stockSymbol =
          String(symbol || "")
            .trim()
            .toUpperCase();


        // ----------------------------------------------
        // Validate symbol
        // ----------------------------------------------

        if (!stockSymbol) {

          console.log(
            "Invalid stock symbol received."
          );

          return;
        }


        console.log(
          `Client ${socket.id} subscribed to ${stockSymbol}`
        );


        // ==================================================
        // PREVENT DUPLICATE SUBSCRIPTION
        // ==================================================

        if (
          marketIntervals.has(
            stockSymbol
          )
        ) {

          console.log(
            `${stockSymbol} is already subscribed for client ${socket.id}`
          );

          return;
        }


        // ==================================================
        // INITIAL MARKET PRICE
        // ==================================================

        let currentPrice = 2485.40;

        const startingPrice =
          currentPrice;


        // ==================================================
        // INITIAL OHLCV DATA
        // ==================================================

        const initialMarketData = {

          symbol:
            stockSymbol,

          // Opening price
          open:
            Number(
              currentPrice.toFixed(2)
            ),

          // Highest price
          high:
            Number(
              currentPrice.toFixed(2)
            ),

          // Lowest price
          low:
            Number(
              currentPrice.toFixed(2)
            ),

          // Closing price
          close:
            Number(
              currentPrice.toFixed(2)
            ),

          // Current market price
          price:
            Number(
              currentPrice.toFixed(2)
            ),

          // Trading volume
          volume:
            100000,

          // Price change
          change:
            0,

          // Percentage change
          changePercent:
            0,

          // Server timestamp
          timestamp:
            new Date()
        };


        // Send initial market data
        socket.emit(
          "marketData",
          initialMarketData
        );


        // ==================================================
        // CONTINUOUS MARKET STREAM
        // ==================================================

        const marketInterval =
          setInterval(
            () => {

              try {

                // ------------------------------------------
                // Previous closing price
                // ------------------------------------------

                const previousPrice =
                  currentPrice;


                // ------------------------------------------
                // Generate random price movement
                // ------------------------------------------

                const movement =
                  (Math.random() - 0.5) * 10;


                // ------------------------------------------
                // Calculate new closing price
                // ------------------------------------------

                currentPrice =
                  Math.max(
                    1,
                    currentPrice + movement
                  );


                // ==================================================
                // OHLC
                // ==================================================

                // Open = previous close
                const open =
                  previousPrice;


                // Close = current price
                const close =
                  currentPrice;


                // High should always be >= open and close
                const high =
                  Math.max(
                    open,
                    close
                  ) +
                  Math.random() * 3;


                // Low should always be <= open and close
                const low =
                  Math.min(
                    open,
                    close
                  ) -
                  Math.random() * 3;


                // ==================================================
                // PRICE CHANGE
                // ==================================================

                const change =
                  close -
                  startingPrice;


                const changePercent =
                  startingPrice > 0
                    ? (
                        change /
                        startingPrice
                      ) *
                      100
                    : 0;


                // ==================================================
                // SIMULATED VOLUME
                // ==================================================

                const volume =
                  Math.floor(
                    50000 +
                    Math.random() *
                      200000
                  );


                // ==================================================
                // COMPLETE MARKET DATA
                // ==================================================

                const marketData = {

                  // Stock symbol
                  symbol:
                    stockSymbol,


                  // ------------------------------------------
                  // OHLC
                  // ------------------------------------------

                  open:
                    Number(
                      open.toFixed(2)
                    ),

                  high:
                    Number(
                      high.toFixed(2)
                    ),

                  low:
                    Number(
                      low.toFixed(2)
                    ),

                  close:
                    Number(
                      close.toFixed(2)
                    ),


                  // ------------------------------------------
                  // Current price
                  // ------------------------------------------

                  price:
                    Number(
                      close.toFixed(2)
                    ),


                  // ------------------------------------------
                  // Volume
                  // ------------------------------------------

                  volume,


                  // ------------------------------------------
                  // Change
                  // ------------------------------------------

                  change:
                    Number(
                      change.toFixed(2)
                    ),


                  // ------------------------------------------
                  // Change percentage
                  // ------------------------------------------

                  changePercent:
                    Number(
                      changePercent.toFixed(2)
                    ),


                  // ------------------------------------------
                  // Timestamp
                  // ------------------------------------------

                  timestamp:
                    new Date()
                };


                // ==================================================
                // SEND DATA TO CLIENT
                // ==================================================

                socket.emit(
                  "marketData",
                  marketData
                );


                // ==================================================
                // SERVER LOG
                // ==================================================

                console.log(
                  `Market update ${stockSymbol}:`,
                  `₹${marketData.close}`,
                  `O:${marketData.open}`,
                  `H:${marketData.high}`,
                  `L:${marketData.low}`,
                  `V:${marketData.volume}`,
                  `${marketData.changePercent}%`
                );

              } catch (error) {

                console.error(
                  `Market stream error for ${stockSymbol}:`,
                  error
                );

              }

            },

            // Update every 2 seconds
            2000
          );


        // ==================================================
        // STORE INTERVAL
        // ==================================================

        marketIntervals.set(
          stockSymbol,
          marketInterval
        );

      } catch (error) {

        console.error(
          "Subscribe stock error:",
          error
        );

      }

    }
  );


  // ==================================================
  // UNSUBSCRIBE STOCK
  // ==================================================

  socket.on(
    "unsubscribeStock",
    (symbol) => {

      try {

        const stockSymbol =
          String(symbol || "")
            .trim()
            .toUpperCase();


        if (!stockSymbol) {
          return;
        }


        const interval =
          marketIntervals.get(
            stockSymbol
          );


        if (interval) {

          clearInterval(
            interval
          );


          marketIntervals.delete(
            stockSymbol
          );


          console.log(
            `Client ${socket.id} unsubscribed from ${stockSymbol}`
          );

        }

      } catch (error) {

        console.error(
          "Unsubscribe stock error:",
          error
        );

      }

    }
  );


  // ==================================================
  // DISCONNECT
  // ==================================================

  socket.on(
    "disconnect",
    () => {

      console.log(
        "Client disconnected:",
        socket.id
      );


      // ----------------------------------------------
      // Stop every stock stream
      // ----------------------------------------------

      marketIntervals.forEach(
        (interval) => {

          clearInterval(
            interval
          );

        }
      );


      // ----------------------------------------------
      // Clear all intervals
      // ----------------------------------------------

      marketIntervals.clear();

    }
  );

});


// ==================================================
// TEMPORARY TEST ROUTES
// ==================================================


// JSON parsing test
app.post(
  "/test",
  (req, res) => {

    console.log(
      req.body
    );


    return res.json({

      name:
        "Abhishek Giri",

      rollno:
        9001,

      section:
        "cse-34",

      data: {

        class:
          "CSE-34",

        rollno:
          9001

      }

    });

  }
);


// ==================================================
// DATABASE TEST
// ==================================================

app.get(
  "/test-db",
  (req, res) => {

    const query =
      "SELECT * FROM users";


    db.query(
      query,
      (err, results) => {

        if (err) {

          console.log(
            "Database test failed:",
            err
          );


          return res
            .status(500)
            .json({

              message:
                "Something went wrong"

            });

        }


        return res
          .status(200)
          .json({

            message:
              "Database tested successfully",

            data:
              results

          });

      }
    );

  }
);


// ==================================================
// 404 HANDLER
// ==================================================

app.use(
  (req, res) => {

    return res
      .status(404)
      .json({

        message:
          "Route not found"

      });

  }
);


// ==================================================
// GLOBAL ERROR HANDLER
// ==================================================

const errorMiddleware =
  require("./middleware/errorMiddleware");


app.use(
  errorMiddleware
);


// ==================================================
// START SERVER
// ==================================================

server.listen(
  port,
  () => {

    console.log(
      `Server is running on port ${port}`
    );

    console.log(
      `Socket.IO is running on port ${port}`
    );

  }
);