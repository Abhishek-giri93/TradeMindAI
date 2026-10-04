import { useEffect, useState } from "react";

import {
  getMarketQuote,
  searchMarketStocks,
} from "../../api/marketApi";

import socket from "../../api/marketSocket";

function WatchList({
  orderShow,
  holdings = [],
  onStockSelect,
}) {

  // ==========================================
  // WATCHLIST SYMBOLS
  // ==========================================

  const [watchlistSymbols, setWatchlistSymbols] =
    useState(() => {

      const savedWatchlist =
        localStorage.getItem(
          "trademind_watchlist"
        );

      if (savedWatchlist) {

        try {

          return JSON.parse(
            savedWatchlist
          );

        } catch (error) {

          console.log(
            "Invalid saved watchlist:",
            error
          );

        }

      }

      return [
        "RELIANCE",
        "TCS",
        "INFY",
      ];

    });


  // ==========================================
  // MARKET DATA
  // ==========================================

  const [watchlist, setWatchlist] =
    useState([]);


  // ==========================================
  // SEARCH
  // ==========================================

  const [search, setSearch] =
    useState("");

  const [searchResults, setSearchResults] =
    useState([]);

  const [isSearching, setIsSearching] =
    useState(false);


  // ==========================================
  // LOADING / ERROR
  // ==========================================

  const [isInitialLoading, setIsInitialLoading] =
    useState(true);

  const [marketError, setMarketError] =
    useState("");

  const [lastUpdated, setLastUpdated] =
    useState(null);


  // ==========================================
  // SAVE WATCHLIST
  // ==========================================

  useEffect(() => {

    localStorage.setItem(
      "trademind_watchlist",
      JSON.stringify(
        watchlistSymbols
      )
    );

  }, [watchlistSymbols]);


  // ==========================================
  // INITIAL MARKET DATA
  // ==========================================

  useEffect(() => {

    let isMounted = true;


    const loadInitialMarketData =
      async () => {

        if (
          watchlistSymbols.length === 0
        ) {

          if (isMounted) {

            setWatchlist([]);

            setIsInitialLoading(
              false
            );

            setLastUpdated(
              new Date()
            );

          }

          return;

        }


        try {

          if (isMounted) {

            setIsInitialLoading(
              true
            );

            setMarketError("");

          }


          // ----------------------------------
          // Fetch initial market data
          // ----------------------------------

          const results =
            await Promise.allSettled(

              watchlistSymbols.map(
                async (symbol) => {

                  const quote =
                    await getMarketQuote(
                      symbol
                    );


                  const price =
                    Number(
                      quote?.price
                    );


                  const change =
                    Number(
                      quote?.changePercent
                    );


                  // ----------------------------
                  // Validate price
                  // ----------------------------

                  if (
                    !Number.isFinite(
                      price
                    )
                  ) {

                    throw new Error(
                      `Invalid price received for ${symbol}`
                    );

                  }


                  return {

                    stock:
                      symbol,

                    company:
                      quote?.company_name ||
                      symbol,

                    price:
                      price,

                    change:
                      Number.isFinite(
                        change
                      )
                        ? change
                        : 0,

                  };

                }
              )

            );


          // ----------------------------------
          // Successful requests
          // ----------------------------------

          const successfulResults =
            results
              .filter(
                (result) =>
                  result.status ===
                  "fulfilled"
              )
              .map(
                (result) =>
                  result.value
              );


          // ----------------------------------
          // Failed requests
          // ----------------------------------

          const failedRequests =
            results.filter(
              (result) =>
                result.status ===
                "rejected"
            );


          if (isMounted) {

            setWatchlist(
              successfulResults
            );


            setLastUpdated(
              new Date()
            );


            if (
              failedRequests.length > 0
            ) {

              console.log(
                `${failedRequests.length} market request(s) failed.`
              );

              setMarketError(
                "Some stock prices could not be loaded."
              );

            } else {

              setMarketError("");

            }

          }

        } catch (error) {

          console.error(
            "Initial market data error:",
            error
          );


          if (isMounted) {

            setMarketError(
              error.message ||
              "Unable to load market data."
            );

          }

        } finally {

          if (isMounted) {

            setIsInitialLoading(
              false
            );

          }

        }

      };


    loadInitialMarketData();


    // --------------------------------------
    // Cleanup
    // --------------------------------------

    return () => {

      isMounted = false;

    };

  }, [watchlistSymbols]);


  // ==========================================
  // LIVE MARKET DATA - SOCKET.IO
  // ==========================================

  useEffect(() => {

    if (
      watchlistSymbols.length === 0
    ) {

      return;

    }


    // --------------------------------------
    // Handle live market data
    // --------------------------------------

    const handleMarketData =
      (data) => {

        const symbol =
          data?.symbol
            ?.toString()
            .trim()
            .toUpperCase();


        if (!symbol) {

          return;

        }


        const newPrice =
          Number(
            data?.price
          );


        if (
          !Number.isFinite(
            newPrice
          )
        ) {

          console.log(
            "Invalid live market price:",
            data
          );

          return;

        }


        const newChangePercent =
          Number(
            data?.changePercent
          );


        // ----------------------------------
        // Update matching stock
        // ----------------------------------

        setWatchlist(
          (currentWatchlist) => {

            return currentWatchlist.map(
              (item) => {

                if (
                  item.stock !==
                  symbol
                ) {

                  return item;

                }


                return {

                  ...item,

                  price:
                    newPrice,

                  change:
                    Number.isFinite(
                      newChangePercent
                    )
                      ? newChangePercent
                      : item.change,

                };

              }
            );

          }
        );


        setLastUpdated(
          new Date()
        );


        console.log(
          `Live price update: ${symbol} ₹${newPrice}`
        );

      };


    // --------------------------------------
    // Register listener first
    // --------------------------------------

    socket.on(
      "marketData",
      handleMarketData
    );


    // --------------------------------------
    // Subscribe to stocks
    // --------------------------------------

    watchlistSymbols.forEach(
      (symbol) => {

        console.log(
          "Subscribing WatchList to:",
          symbol
        );


        socket.emit(
          "subscribeStock",
          symbol
        );

      }
    );


    // --------------------------------------
    // Cleanup
    // --------------------------------------

    return () => {

      socket.off(
        "marketData",
        handleMarketData
      );

    };

  }, [watchlistSymbols]);


  // ==========================================
  // SEARCH STOCKS
  // ==========================================

  useEffect(() => {

    const query =
      search.trim();


    if (!query) {

      setSearchResults([]);

      return;

    }


    const timer =
      setTimeout(
        async () => {

          try {

            setIsSearching(
              true
            );


            const results =
              await searchMarketStocks(
                query
              );


            setSearchResults(
              Array.isArray(
                results
              )
                ? results
                : []
            );

          } catch (error) {

            console.log(
              "Stock search error:",
              error
            );


            setSearchResults([]);

          } finally {

            setIsSearching(
              false
            );

          }

        },
        300
      );


    return () => {

      clearTimeout(
        timer
      );

    };

  }, [search]);


  // ==========================================
  // ADD STOCK
  // ==========================================

  function addStockFromSearch(
    stock
  ) {

    const symbol =
      stock?.symbol
        ?.trim()
        .toUpperCase();


    if (!symbol) {

      return;

    }


    setWatchlistSymbols(
      (currentSymbols) => {

        if (
          currentSymbols.includes(
            symbol
          )
        ) {

          return currentSymbols;

        }


        return [
          ...currentSymbols,
          symbol,
        ];

      }
    );


    setSearch("");

    setSearchResults([]);

  }


  // ==========================================
  // REMOVE STOCK
  // ==========================================

  function removeStock(
    stock
  ) {

    setWatchlistSymbols(
      (currentSymbols) =>
        currentSymbols.filter(
          (item) =>
            item !== stock
        )
    );


    setWatchlist(
      (currentWatchlist) =>
        currentWatchlist.filter(
          (item) =>
            item.stock !== stock
        )
    );

  }


  // ==========================================
  // SELECT STOCK
  // ==========================================

  function handleStockSelect(
    stock
  ) {

    if (
      typeof onStockSelect ===
      "function"
    ) {

      onStockSelect(
        stock
      );

    }

  }


  // ==========================================
  // FILTER WATCHLIST
  // ==========================================

  const clearSearch =
    search
      .trim()
      .toLowerCase();


  const filteredWatchlist =
    clearSearch
      ? watchlist.filter(
          (item) =>

            item.stock
              .toLowerCase()
              .includes(
                clearSearch
              ) ||

            item.company
              .toLowerCase()
              .includes(
                clearSearch
              )
        )
      : watchlist;


  // ==========================================
  // UI
  // ==========================================

  return (

    <section className="w-100">


      {/* ======================================
          TITLE
      ====================================== */}

      <h2 className="section-title">
        Watchlist
      </h2>


      {/* ======================================
          LAST UPDATED
      ====================================== */}

      {lastUpdated &&
        !isInitialLoading && (

          <div className="text-secondary small mb-3">

            Last updated:{" "}

            {lastUpdated.toLocaleTimeString(
              "en-IN"
            )}

          </div>

        )}


      {/* ======================================
          SEARCH
      ====================================== */}

      <div
        className="watchlist-search mb-3"
        style={{
          position:
            "relative",
        }}
      >

        <div className="input-group">

          <span className="input-group-text">
            🔎
          </span>


          <input
            type="text"
            className="form-control"
            placeholder="Search stocks..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />


          {/* Search Loading */}

          {isSearching && (

            <span className="input-group-text">

              <div
                className="spinner-border spinner-border-sm"
                role="status"
              />

            </span>

          )}


          {/* Clear Search */}

          {search && (

            <button
              type="button"
              className="btn btn-light"
              onClick={() => {

                setSearch("");

                setSearchResults([]);

              }}
            >
              ×
            </button>

          )}

        </div>


        {/* ====================================
            SEARCH RESULTS
        ==================================== */}

        {searchResults.length >
          0 && (

          <div
            className="stock-search-results"
            style={{
              position:
                "absolute",

              top:
                "100%",

              left:
                0,

              right:
                0,

              zIndex:
                1000,

              background:
                "#fff",

              border:
                "1px solid #ddd",

              borderRadius:
                "8px",

              marginTop:
                "4px",

              maxHeight:
                "300px",

              overflowY:
                "auto",

              boxShadow:
                "0 4px 12px rgba(0,0,0,0.12)",
            }}
          >

            {searchResults.map(
              (stock) => {

                const isAlreadyAdded =
                  watchlistSymbols.includes(
                    stock.symbol
                  );


                return (

                  <button
                    key={
                      stock.symbol
                    }

                    type="button"

                    disabled={
                      isAlreadyAdded
                    }

                    onClick={() =>
                      addStockFromSearch(
                        stock
                      )
                    }

                    style={{
                      width:
                        "100%",

                      border:
                        "none",

                      background:
                        isAlreadyAdded
                          ? "#f5f5f5"
                          : "#fff",

                      padding:
                        "10px 14px",

                      textAlign:
                        "left",

                      cursor:
                        isAlreadyAdded
                          ? "default"
                          : "pointer",

                      borderBottom:
                        "1px solid #eee",
                    }}
                  >

                    <div>

                      <strong>
                        {
                          stock.symbol
                        }
                      </strong>


                      {isAlreadyAdded && (

                        <span className="text-success ms-2 small">
                          Added
                        </span>

                      )}

                    </div>


                    <small className="text-secondary">

                      {
                        stock.company_name ||
                        stock.symbol
                      }

                    </small>

                  </button>

                );

              }
            )}

          </div>

        )}


        {/* No Results */}

        {!isSearching &&
          search.trim() &&
          searchResults.length ===
            0 && (

            <div className="text-secondary small mt-2">

              No matching stocks found.

            </div>

          )}

      </div>


      {/* ======================================
          WATCHLIST
      ====================================== */}

      <div className="watchlist">


        {/* ====================================
            LOADING
        ==================================== */}

        {isInitialLoading ? (

          <div className="py-4 text-secondary text-center">

            <div
              className="spinner-border spinner-border-sm me-2"
              role="status"
            />

            Loading market data...

          </div>


        ) : marketError &&
          watchlist.length === 0 ? (


          /* ==================================
             ERROR
          ================================== */

          <div className="py-4 text-danger text-center">

            <p className="mb-2">
              Unable to load market data.
            </p>

            <small>
              {marketError}
            </small>

          </div>


        ) : filteredWatchlist.length >
          0 ? (


          /* ==================================
             STOCKS
          ================================== */

          filteredWatchlist.map(
            (item) => {

              const selectedHolding =
                holdings.find(
                  (holding) =>
                    holding.stock_symbol ===
                    item.stock
                );


              const holdingQuantity =
                selectedHolding
                  ? Number(
                      selectedHolding.quantity
                    )
                  : 0;


              const canSell =
                holdingQuantity >
                0;


              return (

                <div
                  className="watchlist-row"
                  key={
                    item.stock
                  }

                  // =================================
                  // CLICK ENTIRE ROW
                  // =================================

                  onClick={() =>
                    handleStockSelect(
                      item
                    )
                  }

                  style={{
                    cursor:
                      "pointer",
                  }}
                >


                  {/* ================================
                      STOCK INFO
                  ================================= */}

                  <div className="stock-info">

                    <span className="stock-name">

                      {
                        item.stock
                      }

                    </span>


                    <small className="company-name">

                      {
                        item.company
                      }

                    </small>

                  </div>


                  {/* ================================
                      PRICE + ACTIONS
                  ================================= */}

                  <div className="stock-details">


                    {/* PRICE */}

                    <span className="stock-price">

                      ₹
                      {Number(
                        item.price
                      ).toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits:
                            2,

                          maximumFractionDigits:
                            2,
                        }
                      )}

                    </span>


                    {/* CHANGE */}

                    <small
                      className={
                        item.change >= 0
                          ? "profit"
                          : "loss"
                      }
                    >

                      {item.change >= 0
                        ? "+"
                        : ""}

                      {Number(
                        item.change
                      ).toFixed(
                        2
                      )}

                      %

                    </small>


                    {/* ACTION BUTTONS */}

                    <div className="trade-buttons">


                      {/* ==========================
                          BUY
                      =========================== */}

                      <button
                        className="btn btn-sm btn-success"

                        onClick={(
                          event
                        ) => {

                          // Prevent row click
                          event.stopPropagation();


                          // Select stock
                          handleStockSelect(
                            item
                          );


                          // Open order modal
                          orderShow(
                            "BUY",
                            item
                          );

                        }}
                      >
                        Buy
                      </button>


                      {/* ==========================
                          SELL
                      =========================== */}

                      <button
                        className="btn btn-sm btn-danger"

                        disabled={
                          !canSell
                        }

                        onClick={(
                          event
                        ) => {

                          // Prevent row click
                          event.stopPropagation();


                          // Select stock
                          handleStockSelect(
                            item
                          );


                          // Open order modal
                          orderShow(
                            "SELL",
                            item
                          );

                        }}
                      >
                        Sell
                      </button>


                      {/* ==========================
                          REMOVE
                      =========================== */}

                      <button
                        className="btn btn-sm btn-outline-danger"

                        onClick={(
                          event
                        ) => {

                          // Prevent row click
                          event.stopPropagation();


                          removeStock(
                            item.stock
                          );

                        }}
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              );

            }
          )


        ) : (


          /* ==================================
             EMPTY
          ================================== */

          <div className="py-4 text-secondary">

            <p className="text-center">

              No stocks found in watchlist.

            </p>

          </div>

        )}

      </div>

    </section>

  );

}

export default WatchList;