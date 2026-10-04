function OrderPanel() {
  return (
    <section className="w-100">
      <h2 className="section-title">Place Order</h2>

      <div className="order-panel">

        <div className="order-type">
          <button className="btn btn-success active">
            Buy
          </button>

          <button className="btn btn-outline-danger">
            Sell
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Stock</label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter stock symbol"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>

          <input
            type="number"
            className="form-control"
            placeholder="Enter quantity"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>

          <input
            type="number"
            className="form-control"
            placeholder="Enter price"
          />
        </div>

        <button className="btn btn-success w-100">
          Place Buy Order
        </button>

      </div>
    </section>
  );
}

export default OrderPanel;