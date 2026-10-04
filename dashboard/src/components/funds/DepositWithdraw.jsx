import { useState } from "react";

function DepositWithdraw({
  balance,
  handleTransaction,
  isProcessing,
  successMessage,
  clearSuccessMessage,
  transactionType,
}) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("deposit");

  function handleSubmit(e) {
    e.preventDefault();

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (
      type === "withdraw" &&
      numericAmount > balance
    ) {
      alert("Insufficient balance.");
      return;
    }

    handleTransaction(type, numericAmount);

    setAmount("");
  }

  return (
    <section className="fund-action-card">

      <h3 className="mb-1">
        Add / Withdraw Funds
      </h3>

      <p className="text-secondary mb-4">
        Manage your available trading balance.
      </p>

      {successMessage && (
        <div className={`alert ${transactionType==="deposit" ? "alert-success" : "alert-danger"}
         alert-dismissible fade show`} role="alert">
          {successMessage}
          <button 
          type="button"
          aria-label="Close"
          className="btn-close"
          onClick={clearSuccessMessage}
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>

        {/* Transaction Type */}
        <div className="mb-3">
          <label className="form-label">
            Transaction Type
          </label>

          <select
            className="form-select"
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >
            <option value="deposit">
              Deposit
            </option>

            <option value="withdraw">
              Withdraw
            </option>
          </select>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="form-label">
            Amount
          </label>

          <div className="input-group">

            <span className="input-group-text">
              ₹
            </span>

            <input
              type="number"
              min="1"
              className="form-control"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
            />

          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled = {isProcessing}
          className={`btn w-100 ${
            type === "deposit"
              ? "btn-success"
              : "btn-danger"
          }`}
        >
          {type === "deposit"
            ? "Deposit Funds"
            : "Withdraw Funds"}
        </button>

      </form>

    </section>
  );
}

export default DepositWithdraw;