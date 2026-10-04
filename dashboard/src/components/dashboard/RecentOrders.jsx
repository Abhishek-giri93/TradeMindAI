import { useNavigate } from "react-router-dom";
import { cancelOrder } from "../../api/ordersApi";

function RecentOrders({
  orders = [],
  isLoading,
  onOrderCancelled,
}) {
  const navigate = useNavigate();

  // ==========================================
  // CHECK IF ANY ORDER IS PENDING
  // ==========================================

  const hasPendingOrders = orders.some(
    (order) => order.status === "Pending"
  );


  // ==========================================
  // CANCEL ORDER
  // ==========================================

  const handleCancelOrder = async (orderId) => {
    try {

      await cancelOrder(orderId);

      // Refresh orders after successful cancellation
      if (onOrderCancelled) {
        await onOrderCancelled();
      }

    } catch (error) {

      console.error(
        "Cancel order failed:",
        error
      );

      alert(
        error.message || "Failed to cancel order"
      );
    }
  };


  return (
    <div className="recent-orders">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="recent-orders-header">
        <h3>Recent Orders</h3>
      </div>


      <div className="table-responsive">

        <table className="table align-middle mb-0">

          {/* =================================
              TABLE HEADER
          ================================= */}

          <thead>

            <tr>

              <th className="text-secondary">
                Stock
              </th>

              <th className="text-secondary">
                Type
              </th>

              <th className="text-secondary">
                Quantity
              </th>

              <th className="text-secondary">
                Price
              </th>

              <th className="text-secondary">
                Total
              </th>

              <th className="text-secondary">
                Status
              </th>

              {hasPendingOrders && (
                <th className="text-secondary">
                  Action
                </th>
              )}

            </tr>

          </thead>


          {/* =================================
              TABLE BODY
          ================================= */}

          <tbody>

            {/* =================================
                LOADING STATE
            ================================= */}

            {isLoading ? (

              <tr>

                <td
                  colSpan={hasPendingOrders ? 7 : 6}
                  className="text-center py-4"
                >
                  Loading orders...
                </td>

              </tr>

            ) : orders.length === 0 ? (

              /* =================================
                  EMPTY STATE
              ================================= */

              <tr>

                <td
                  colSpan={hasPendingOrders ? 7 : 6}
                  className="text-center py-4"
                >
                  No orders found.
                </td>

              </tr>

            ) : (

              /* =================================
                  ORDERS
              ================================= */

              orders
                .slice(0, 5)
                .map((order) => {

                  const totalPrice =
                    Number(order.price) *
                    Number(order.quantity);

                  return (

                    <tr key={order.id}>

                      {/* STOCK */}

                      <td>
                        <strong>
                          {order.stock}
                        </strong>
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
                        ₹
                        {Number(
                          order.price
                        ).toLocaleString("en-IN")}
                      </td>


                      {/* TOTAL */}

                      <td>
                        ₹
                        {totalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`order-status ${
                            order.status === "Completed"
                              ? "status-completed"
                              : order.status === "Pending"
                              ? "status-pending"
                              : order.status === "Cancelled"
                              ? "status-cancelled"
                              : "status-failed"
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
                                handleCancelOrder(
                                  order.id
                                )
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

                  );

                })

            )}

          </tbody>

        </table>


        {/* =====================================
            VIEW ALL ORDERS
        ===================================== */}

        {!isLoading && orders.length > 5 && (

          <div className="text-end mt-3">

            <button
              type="button"
              className="btn btn-link"
              onClick={() =>
                navigate("/orders")
              }
            >
              View Orders
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default RecentOrders;