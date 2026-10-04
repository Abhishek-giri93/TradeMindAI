function Holdings({ holdings = [], isLoading }) {
  // ==========================================
  // FORMAT CURRENCY
  // ==========================================

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // ==========================================
  // GET P/L CLASS
  // ==========================================

  const getProfitLossClass = (value) => {
    const number = Number(value || 0);

    if (number > 0) {
      return "text-success";
    }

    if (number < 0) {
      return "text-danger";
    }

    return "text-secondary";
  };

  return (
    <div className="holdings">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="holdings-header d-flex justify-content-between align-items-center">

        <div>
          <h3 className="mb-1 fw-bold">
            Holdings
          </h3>

          <p className="text-secondary mb-0 small">
            Your current stock holdings
          </p>
        </div>

        {!isLoading && (
          <span
            className="badge rounded-pill bg-light text-dark border px-3 py-2"
            style={{ fontSize: "12px" }}
          >
            {holdings.length}{" "}
            {holdings.length === 1
              ? "Stock"
              : "Stocks"}
          </span>
        )}

      </div>


      {/* ==========================================
          TABLE
      ========================================== */}

      <div className="table-responsive">

        <table className="table align-middle mb-0 holdings-table">

          {/* ========================================
              TABLE HEADER
          ======================================== */}

          <thead>

            <tr>

              <th className="text-secondary fw-medium">
                Stock
              </th>

              <th className="text-secondary fw-medium text-center">
                Quantity
              </th>

              <th className="text-secondary fw-medium text-end">
                Avg. Price
              </th>

              <th className="text-secondary fw-medium text-end">
                Current Price
              </th>

              <th className="text-secondary fw-medium text-end">
                Investment
              </th>

              <th className="text-secondary fw-medium text-end">
                Current Value
              </th>

              <th className="text-secondary fw-medium text-end">
                P/L
              </th>

              <th className="text-secondary fw-medium text-end">
                Return
              </th>

            </tr>

          </thead>


          {/* ========================================
              TABLE BODY
          ======================================== */}

          <tbody>

            {/* ======================================
                LOADING STATE
            ====================================== */}

            {isLoading ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-5"
                >

                  <div
                    className="spinner-border spinner-border-sm text-secondary mb-2"
                    role="status"
                  >
                    <span className="visually-hidden">
                      Loading...
                    </span>
                  </div>

                  <div className="text-secondary small">
                    Loading holdings...
                  </div>

                </td>

              </tr>

            ) : holdings.length === 0 ? (

              /* ====================================
                 EMPTY STATE
              ==================================== */

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-5"
                >

                  <div
                    className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle bg-light border"
                    style={{
                      width: "54px",
                      height: "54px",
                      fontSize: "22px",
                    }}
                  >
                    📊
                  </div>

                  <strong className="d-block mb-1">
                    No holdings yet
                  </strong>

                  <span className="text-secondary small">
                    Your purchased stocks will appear here.
                  </span>

                </td>

              </tr>

            ) : (

              /* ====================================
                 HOLDINGS
              ==================================== */

              holdings.map((holding) => {

                const profitLoss = Number(
                  holding.profit_loss || 0
                );

                const returnPercent = Number(
                  holding.return_percent || 0
                );

                const profitLossClass =
                  getProfitLossClass(profitLoss);

                return (
                  <tr
                    key={holding.id}
                    className="holding-row"
                  >

                    {/* =================================
                        STOCK
                    ================================= */}

                    <td>

                      <div className="d-flex align-items-center gap-3">

                        <div className="holding-stock-avatar">
                          {holding.stock_symbol.slice(0, 2)}
                        </div>

                        <div>

                          <strong
                            className="d-block"
                            style={{
                              fontSize: "14px",
                            }}
                          >
                            {holding.stock_symbol}
                          </strong>

                          <span
                            className="text-secondary"
                            style={{
                              fontSize: "11px",
                            }}
                          >
                            NSE · Equity
                          </span>

                        </div>

                      </div>

                    </td>


                    {/* =================================
                        QUANTITY
                    ================================= */}

                    <td className="text-center">

                      <span className="fw-semibold">
                        {Number(holding.quantity)}
                      </span>

                    </td>


                    {/* =================================
                        AVERAGE PRICE
                    ================================= */}

                    <td className="text-end">

                      <span className="fw-semibold">

                        ₹
                        {formatCurrency(
                          holding.average_price
                        )}

                      </span>

                    </td>


                    {/* =================================
                        CURRENT PRICE
                    ================================= */}

                    <td className="text-end">

                      <span className="fw-semibold">

                        ₹
                        {formatCurrency(
                          holding.current_price
                        )}

                      </span>

                    </td>


                    {/* =================================
                        INVESTMENT
                    ================================= */}

                    <td className="text-end">

                      <span className="fw-semibold">

                        ₹
                        {formatCurrency(
                          holding.investment
                        )}

                      </span>

                    </td>


                    {/* =================================
                        CURRENT VALUE
                    ================================= */}

                    <td className="text-end">

                      <span className="fw-semibold">

                        ₹
                        {formatCurrency(
                          holding.current_value
                        )}

                      </span>

                    </td>


                    {/* =================================
                        PROFIT / LOSS
                    ================================= */}

                    <td className="text-end">

                      <span
                        className={`${profitLossClass} fw-semibold`}
                      >

                        {profitLoss > 0 ? "+" : ""}
                        {profitLoss < 0 ? "-" : ""}
                        ₹
                        {formatCurrency(
                          Math.abs(profitLoss)
                        )}

                      </span>

                    </td>


                    {/* =================================
                        RETURN
                    ================================= */}

                    <td className="text-end">

                      <span
                        className={`${profitLossClass} fw-semibold`}
                      >

                        {returnPercent > 0 ? "+" : ""}
                        {returnPercent.toFixed(2)}%

                      </span>

                    </td>

                  </tr>
                );
              })

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Holdings;