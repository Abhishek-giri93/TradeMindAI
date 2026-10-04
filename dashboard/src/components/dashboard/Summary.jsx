
function Summary({ holdings = [] }) {

  // --------------------------------
  // Total Investment
  // --------------------------------

  const totalInvestment = holdings.reduce(
    (total, holding) =>
      total +
      Number(holding.investment || 0),
    0
  );


  // --------------------------------
  // Current Portfolio Value
  // --------------------------------

  const totalCurrentValue = holdings.reduce(
    (total, holding) =>
      total +
      Number(holding.current_value || 0),
    0
  );


  // --------------------------------
  // Total Profit / Loss
  // --------------------------------

  const totalProfitLoss =
    totalCurrentValue - totalInvestment;


  // --------------------------------
  // Total Return %
  // --------------------------------

  const totalReturn =
    totalInvestment > 0
      ? (totalProfitLoss / totalInvestment) * 100
      : 0;


  // --------------------------------
  // Formatting
  // --------------------------------

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };


  // --------------------------------
  // Profit / Loss Color
  // --------------------------------

  const getProfitLossClass = (value) => {
    if (value > 0) return "text-success";
    if (value < 0) return "text-danger";
    return "text-secondary";
  };


  const profitLossClass =
    getProfitLossClass(totalProfitLoss);


  return (
    <section>

      <h2 className="section-title">
        Portfolio Summary
      </h2>

      <div className="row g-3">

        {/* =========================
            TOTAL INVESTMENT
        ========================== */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="summary-card">

            <div className="summary-icon investment-icon">
              💰
            </div>

            <p>Total Investment</p>

            <h3>
              ₹{formatCurrency(totalInvestment)}
            </h3>

          </div>

        </div>


        {/* =========================
            CURRENT VALUE
        ========================== */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="summary-card">

            <div className="summary-icon value-icon">
              📈
            </div>

            <p>Current Value</p>

            <h3>
              ₹{formatCurrency(totalCurrentValue)}
            </h3>

          </div>

        </div>


        {/* =========================
            PROFIT / LOSS
        ========================== */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="summary-card">

            <div className="summary-icon profit-icon">
              💹
            </div>

            <p>Profit / Loss</p>

            <h3 className={profitLossClass}>

              {totalProfitLoss > 0 && "+"}

              {totalProfitLoss < 0 && "-"}

              ₹
              {formatCurrency(
                Math.abs(totalProfitLoss)
              )}

            </h3>

          </div>

        </div>


        {/* =========================
            RETURN %
        ========================== */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="summary-card">

            <div className="summary-icon change-icon">
              📊
            </div>

            <p>Return</p>

            <h3 className={profitLossClass}>

              {totalReturn > 0 && "+"}

              {totalReturn.toFixed(2)}%

            </h3>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Summary;
