function OrderFilters({
  search,
  setSearch,
  orderType,
  setOrderType,
  status,
  setStatus
}) {
  return (
    <>
      {/* ==================================================
          ORDER FILTERS
          ================================================== */}

      <div className="order-filters">

        <div className="row g-3 align-items-end">

          {/* Search */}
          <div className="col-12 col-md-5">

            <label className="form-label">
              Search
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Search by stock..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          {/* Order Type */}
          <div className="col-12 col-md-3">

            <label className="form-label">
              Order Type
            </label>

            <select
              className="form-select"
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>

          </div>


          {/* Status */}
          <div className="col-12 col-md-3">

            <label className="form-label">
              Status
            </label>

            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>

          </div>


          {/* Reset */}
          <div className="col-12 col-md-1">

            <button
              type="button"
              className="btn btn-outline-secondary reset-filter-btn w-100"
              onClick={() => {
                setSearch("");
                setOrderType("all");
                setStatus("all");
              }}
            >
              Reset
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default OrderFilters;