function OrderSummary({orders}) {
  // completed and pending calculation-
  const completedOrder = orders.filter((order)=> order.status === "Completed").length;
  const pendingOrder = orders.filter((order)=> order.status === "Pending").length;

  return (
    <>
      {/* ==================================================
          ORDER SUMMARY
          ================================================== */}

      <div className="row g-3">

        {/* Total Orders */}
        <div className="col-12 col-md-4">

          <div className="order-summary-card h-100">

            <small>
              Total Orders
            </small>

            <h4>
              {orders.length}
            </h4>

          </div>

        </div>


        {/* Completed Orders */}
        <div className="col-12 col-md-4">

          <div className="order-summary-card h-100">

            <small>
              Completed
            </small>

            <h4 className="profit">
              {completedOrder}
            </h4>

          </div>

        </div>


        {/* Pending Orders */}
        <div className="col-12 col-md-4">

          <div className="order-summary-card h-100">

            <small>
              Pending
            </small>

            <h4>
              {pendingOrder}
            </h4>

          </div>

        </div>

      </div>
    </>
    
  );
}

export default OrderSummary;