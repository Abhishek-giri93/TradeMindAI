function FundsSummary({ balance }) {
  return (
    <section>
      <h2 className="section-title">Funds Summary</h2>

      <div className="row g-3">

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="summary-card">
            <div className="summary-icon investment-icon">
              💰
            </div>

            <p>Available Balance</p>

            <h3>
              ₹
              {balance.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </h3>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="summary-card">
            <div className="summary-icon value-icon">
              📊
            </div>

            <p>Account Status</p>

            <h3 className="profit">
              Active
            </h3>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="summary-card">
            <div className="summary-icon profit-icon">
              💳
            </div>

            <p>Trading Account</p>

            <h3>
              Ready
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FundsSummary;