
const API_URL = import.meta.env.VITE_API_URL;

export const placeBuyOrder = async(stockSymbol, quantity, price)=>{
  const response = await fetch(`${API_URL}/orders/buy`,{
    method : "POST",
    credentials : "include",
    headers : {
      "Content-Type" : "application/json",
    },
    body : JSON.stringify({
      stockSymbol,
      quantity : Number(quantity),
      price : Number(price)
    })
  })

  const data = await response.json();

  if(!response.ok){
    throw new Error(data.message || "Failed to place buy order");
  }
  return data;
}


export const getOrders = async () => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch orders"
    );
  }

  const orders = data.result.map((order) => ({
    id: order.id,
    type: order.order_type,
    stock: order.stock_symbol,
    quantity: Number(order.quantity),
    price: Number(order.price),
    status: order.status,
    date: order.created_at,
  }));

  return orders;
};

export const placeSellOrder = async (
  stockSymbol,
  quantity,
  price
) => {
  const response = await fetch(`${API_URL}/orders/sell`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stockSymbol,
      quantity: Number(quantity),
      price: Number(price),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to place sell order"
    );
  }

  return data;
};

export const cancelOrder = async (orderId) => {
  const response = await fetch(
    `${API_URL}/orders/${orderId}/cancel`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to cancel order"
    );
  }

  return data;
};