import OrderFilters from "../components/orders/OrderFilters";
import OrderSummary from "../components/orders/OrderSummary";
import OrderTable from "../components/orders/OrdersTable";
import { useState } from "react";

function Orders({ orders = [], refreshOrders }) {
  const [search, setSearch] = useState("");
  const [orderType, setOrderType] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const cleanSearch = search.trim().toLowerCase();

    const matchesSearch =
      order.stock.toLowerCase().includes(cleanSearch);

    const matchesType =
      orderType === "all" ||
      order.type.toLowerCase() === orderType;

    const matchesStatus =
      status === "all" ||
      order.status.toLowerCase() === status;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="orders-page px-3 py-4 px-md-4">

      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          Orders
        </h2>

        <p>
          Total Orders: {orders.length}
        </p>

        <p className="text-secondary mb-0">
          View and manage your trading orders.
        </p>
      </div>

      {/* Order Filters */}
      <OrderFilters
        search={search}
        setSearch={setSearch}
        orderType={orderType}
        setOrderType={setOrderType}
        status={status}
        setStatus={setStatus}
      />

      {/* Order Summary */}
      <div className="mt-4">
        <OrderSummary orders={orders} />
      </div>

      {/* Orders Table */}
      <div className="mt-4">
        <OrderTable
          orders={filteredOrders}
          onOrderCancelled={refreshOrders}
        />
      </div>

    </div>
  );
}

export default Orders;