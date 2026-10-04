function Positions({ holdings = [], isLoading }) {
  return (
    <section className="w-100">

      <h2 className="section-title">
        Open Positions
      </h2>

      <div className="positions">

        {/* HEADER */}
        <div className="positions-header">
          <span>Stock</span>
          <span>Qty</span>
          <span>Avg. Price</span>
          <span>Current</span>
          <span>P/L</span>
        </div>

        {/* LOADING */}
        {isLoading ? (

          <div className="py-4 text-secondary text-center">
            Loading positions...
          </div>

        ) : holdings.length > 0 ? (

          holdings.map((holding) => (

            <div
              className="positions-row"
              key={holding.id}
            >

              {/* STOCK */}
              <span>
                {holding.stock_symbol}
              </span>

              {/* QUANTITY */}
              <span>
                {Number(holding.quantity)}
              </span>

              {/* AVERAGE PRICE */}
              <span>
                ₹
                {Number(
                  holding.average_price
                ).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>

              {/* CURRENT PRICE */}
              <span>
                —
              </span>

              {/* PROFIT / LOSS */}
              <span>
                —
              </span>

            </div>

          ))

        ) : (

          <div className="py-4 text-secondary text-center">
            No open positions.
          </div>

        )}

      </div>

    </section>
  );
}

export default Positions;