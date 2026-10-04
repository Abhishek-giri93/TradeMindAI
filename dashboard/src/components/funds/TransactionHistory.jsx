function TransactionHistory({ transactions }) {
  return (
    <section className="transaction-history">

      <div className="transaction-history-header">
        <h3>Transaction History</h3>
      </div>

      <div className="table-responsive">

        <table className="table align-middle mb-0">

          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction.id}>

                  <td
                    className={
                      transaction.type === "DEPOSIT"
                        ? "buy-type"
                        : transaction.type === "WITHDRAW"
                          ? "sell-type"
                          : transaction.type === "BUY"
                            ? "buy-type" : "sell-type"
                    }
                  >
                    {transaction.type === "DEPOSIT"
                      ? "Deposit"
                      : transaction.type === "WITHDRAW"
                        ? "Withdraw"
                        : transaction.type === "BUY"
                          ? "Buy"
                          : "Sell"
                    }
                  </td>

                  <td className={
                    transaction.type === "DEPOSIT" || transaction.type === "SELL"
                      ? "text-success"
                      : "text-danger"
                  }>
                    
                    {transaction.type === "DEPOSIT" || transaction.type === "SELL"
                      ? "+ "
                      : "- "}
                    ₹{Number(transaction.amount).toLocaleString("en-IN")}
                  </td>

                  <td>
                    {new Date(transaction.created_at).toLocaleString("en-IN")}
                  </td>

                  <td>
                    <span className="order-status status-completed">
                    {transaction.status || "Completed"}
                    </span>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-secondary py-4"
                >
                  No transactions yet.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </section>
  );
}

export default TransactionHistory;