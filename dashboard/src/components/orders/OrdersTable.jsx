import { cancelOrder } from "../../api/ordersApi";

function OrdersTable({
  orders = [],
  onOrderCancelled,
}) {

  // ==========================================
  // CHECK IF ANY ORDER CAN BE CANCELLED
  // ==========================================

  const hasPendingOrders = orders.some(
    (order) => order.status === "Pending"
  );


  // ==========================================
  // CANCEL ORDER
  // ==========================================

  const handleCancelOrder = async (orderId) => {

    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) {
      return;
    }

    try {

      await cancelOrder(orderId);

      // Refresh latest orders from backend
      if (onOrderCancelled) {
        await onOrderCancelled();
      }

    } catch (error) {

      console.error(
        "Failed to cancel order:",
        error
      );

      alert(
        error.message || "Failed to cancel order"
      );
    }
  };


  // ==========================================
  // FORMAT PRICE
  // ==========================================

  const formatPrice = (price) => {
    const value = Number(price);

    if (Number.isNaN(value)) {
      return "₹0.00";
    }

    return `₹${value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };


  return (
    <div className="orders-table-card">

      <div className="table-responsive">

        <table className="table orders-table align-middle mb-0">

          {/* =================================
              TABLE HEADER
          ================================= */}

          <thead>

            <tr>

              <th>Stock</th>

              <th>Type</th>

              <th>Quantity</th>

              <th>Price</th>

              <th>Total</th>

              <th>Status</th>

              {hasPendingOrders && (
                <th>Action</th>
              )}

            </tr>

          </thead>


          {/* =================================
              TABLE BODY
          ================================= */}

          <tbody>

            {orders.length === 0 ? (

              <tr>

                <td
                  colSpan={hasPendingOrders ? 7 : 6}
                  className="text-center py-4 text-secondary"
                >
                  No orders found.
                </td>

              </tr>

            ) : (

              orders.map((order) => (

                <tr key={order.id}>

                  {/* STOCK */}

                  <td>

                    <strong>
                      {order.stock}
                    </strong>

                    {order.company && (
                      <div className="text-secondary small">
                        {order.company}
                      </div>
                    )}

                  </td>


                  {/* TYPE */}

                  <td
                    className={
                      order.type === "BUY"
                        ? "buy-type"
                        : "sell-type"
                    }
                  >
                    {order.type}
                  </td>


                  {/* QUANTITY */}

                  <td>
                    {order.quantity}
                  </td>


                  {/* PRICE */}

                  <td>
                    {formatPrice(order.price)}
                  </td>


                  {/* TOTAL */}

                  <td>
                    {formatPrice(
                      Number(order.price) *
                      Number(order.quantity)
                    )}
                  </td>


                  {/* STATUS */}

                  <td>

                    <span
                      className={`order-status ${
                        order.status === "Completed"
                          ? "completed"
                          : order.status === "Pending"
                          ? "pending"
                          : order.status === "Cancelled"
                          ? "cancelled"
                          : "failed"
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>


                  {/* ACTION */}

                  {hasPendingOrders && (

                    <td>

                      {order.status === "Pending" ? (

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            handleCancelOrder(order.id)
                          }
                        >
                          Cancel
                        </button>

                      ) : (

                        <span className="text-secondary">
                          —
                        </span>

                      )}

                    </td>

                  )}

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default OrdersTable;