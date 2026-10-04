import { useState } from "react";
import {
  placeBuyOrder,
  placeSellOrder,
} from "../../api/ordersApi";

function OrderModal({
  orderHide,
  orderType,
  selectedStock,
  quantity,
  setQuantity,
  confirmationShow,
  orders,
  balance,
  refreshOrders,
  refreshBalance,
  refreshHoldings,
  holdings
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  // --------------------------------
  // Calculate available quantity
  // --------------------------------
  const selectedHolding = holdings.find(
    (holding) =>
      holding.stock_symbol === selectedStock.stock
  );
  const availableQuantity = selectedHolding
  ? Number(selectedHolding.quantity)
  : 0;

  // --------------------------------
  // Total order amount
  // --------------------------------
  const totalPrice =
    Number(selectedStock.price) * Number(quantity);

  // --------------------------------
  // BUY balance validation
  // --------------------------------
  const insufficientFunds =
    orderType === "BUY" &&
    totalPrice > Number(balance);

  // --------------------------------
  // Place Order
  // --------------------------------
  async function handlePlaceOrder() {
    // Prevent duplicate requests
    if (isProcessing) {
      return;
    }

    // --------------------------------
    // SELL validation
    // --------------------------------
    if (orderType === "SELL") {
      if (availableQuantity <= 0) {
        alert(
          `You don't have any ${selectedStock.stock} shares to sell.`
        );
        return;
      }

      if (Number(quantity) > availableQuantity) {
        alert(
          `You can sell maximum ${availableQuantity} shares of ${selectedStock.stock}.`
        );
        return;
      }
    }

    // --------------------------------
    // BUY validation
    // --------------------------------
    if (
      orderType === "BUY" &&
      totalPrice > Number(balance)
    ) {
      alert(
        `Insufficient funds. You need ₹${totalPrice.toLocaleString(
          "en-IN"
        )}, but your available balance is ₹${Number(
          balance
        ).toLocaleString("en-IN")}.`
      );

      return;
    }

    try {
      setIsProcessing(true);

      // ==================================
      // BUY API
      // ==================================
      if (orderType === "BUY") {
        const data = await placeBuyOrder(
          selectedStock.stock,
          Number(quantity),
          Number(selectedStock.price)
        );

        console.log(
          "BUY order successful:",
          data
        );
      }

      // ==================================
      // SELL API
      // ==================================
      if (orderType === "SELL") {
        const data = await placeSellOrder(
          selectedStock.stock,
          Number(quantity),
          Number(selectedStock.price)
        );

        console.log(
          "SELL order successful:",
          data
        );
      }

      // --------------------------------
      // Refresh latest backend data
      // --------------------------------
      await refreshOrders();
      await refreshBalance();
      await refreshHoldings();

      // --------------------------------
      // Close modal
      // --------------------------------
      orderHide();

      // --------------------------------
      // Show confirmation
      // --------------------------------
      confirmationShow();

    } catch (error) {
      console.error(
        `${orderType} order failed:`,
        error
      );

      alert(
        error.message ||
        `Failed to place ${orderType} order`
      );

    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="order-overlay">

      <div className="order-modal">

        {/* CLOSE BUTTON */}
        <button
          className="btn btn-danger order-modal-close"
          onClick={orderHide}
          disabled={isProcessing}
        >
          ×
        </button>

        <section className="order-form-section">

          {/* HEADER */}
          <div className="order-modal-header">

            <h2 className="order-modal-title">
              {orderType} Order
            </h2>

            <p className="order-modal-subtitle">
              Review your order before placing it.
            </p>

          </div>

          <div className="order-panel">

            {/* =========================
                STOCK INFORMATION
            ========================== */}
            <div className="order-stock-info mb-4">

              <div>

                <h4 className="order-stock-name">
                  {selectedStock.stock}
                </h4>

                <p className="order-stock-company">
                  {selectedStock.company}
                </p>

              </div>

            </div>


            {/* =========================
                AVAILABLE BALANCE
            ========================== */}
            {orderType === "BUY" && (
              <div className="mb-3 text-secondary">

                Available Balance:{" "}

                <strong>
                  ₹
                  {Number(balance).toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>
            )}


            {/* =========================
                AVAILABLE QUANTITY
            ========================== */}
            {orderType === "SELL" && (
              <div className="mb-3 text-secondary">

                Available:{" "}

                <strong>
                  {availableQuantity}
                </strong>{" "}
                shares

              </div>
            )}


            {/* =========================
                PRICE + TOTAL
            ========================== */}
            <div className="order-price-box mb-4">

              <div>

                <span className="order-label">
                  Price
                </span>

                <h4 className="order-price">
                  ₹
                  {Number(
                    selectedStock.price
                  ).toLocaleString("en-IN")}
                </h4>

              </div>

              <div className="text-end">

                <span className="order-label">
                  Total Amount
                </span>

                <h4 className="order-total">
                  ₹
                  {totalPrice.toLocaleString(
                    "en-IN"
                  )}
                </h4>

              </div>

            </div>


            {/* =========================
                INSUFFICIENT FUNDS
            ========================== */}
            {insufficientFunds && (
              <div className="alert alert-danger">

                Insufficient funds.

                <br />

                Required: ₹
                {totalPrice.toLocaleString(
                  "en-IN"
                )}

                <br />

                Available: ₹
                {Number(balance).toLocaleString(
                  "en-IN"
                )}

              </div>
            )}


            {/* =========================
                QUANTITY
            ========================== */}
            <div className="mb-4">

              <label className="order-label mb-2">
                Quantity
              </label>

              <div className="d-flex align-items-center gap-2">

                {/* MINUS */}
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  disabled={
                    quantity <= 1 ||
                    isProcessing
                  }
                  onClick={() =>
                    setQuantity((prev) =>
                      prev > 1
                        ? prev - 1
                        : 1
                    )
                  }
                >
                  -
                </button>


                {/* INPUT */}
                <input
                  type="number"
                  min="1"
                  max={
                    orderType === "SELL"
                      ? availableQuantity
                      : undefined
                  }
                  className="form-control order-quantity-input"
                  value={quantity}
                  disabled={isProcessing}
                  onChange={(e) => {

                    const value = Number(
                      e.target.value
                    );

                    if (value < 1) {
                      return;
                    }

                    if (
                      orderType === "SELL" &&
                      value > availableQuantity
                    ) {
                      setQuantity(
                        availableQuantity
                      );

                      return;
                    }

                    setQuantity(value);
                  }}
                />


                {/* PLUS */}
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  disabled={
                    isProcessing ||
                    (
                      orderType === "SELL" &&
                      quantity >= availableQuantity
                    )
                  }
                  onClick={() =>
                    setQuantity(
                      (prev) => prev + 1
                    )
                  }
                >
                  +
                </button>

              </div>

            </div>


            {/* =========================
                PLACE ORDER
            ========================== */}
            <button
              className={`btn w-100 order-submit-btn ${
                orderType === "BUY"
                  ? "btn-success"
                  : "btn-sell"
              }`}
              onClick={handlePlaceOrder}
              disabled={
                isProcessing ||
                (
                  orderType === "SELL" &&
                  availableQuantity <= 0
                ) ||
                insufficientFunds
              }
            >

              {isProcessing
                ? "Processing..."
                : `Place ${orderType} Order`}

            </button>

          </div>

        </section>

      </div>

    </div>
  );
}

export default OrderModal;