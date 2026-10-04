import { useNavigate } from "react-router-dom";

function OrderConfirmation({
  confirmationHide,
  selectedStock,
  orderType,
  quantity,
  totalPrice
}) {

  const navigate = useNavigate();

  return (
    <div className="confirmation-overlay">
      
    <div className="order-confirmation">
      
      <div className="confirmation-icon">
        ✓
      </div>

      <h3>Order Successful</h3>

      <p className="text-secondary">
        Your order has been placed successfully.
      </p>

      <div className="confirmation-details">
        <div>
          <span>Stock</span>
          <strong>{selectedStock.stock}</strong>
        </div>

        <div>
          <span>Type</span>
          <strong>{orderType}</strong>
        </div>

        <div>
          <span>Quantity</span>
          <strong>{quantity}</strong>
        </div>

        <div>
          <span>Total Amount</span>
          <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      {/* buttons  */}
      <div className="d-flex gap-2 mt-3">

      <button 
        className="btn btn-secondary flex-fill"
        onClick={confirmationHide}
        >Close</button>
      </div>
    </div>
    
    </div>
  );
}

export default OrderConfirmation;