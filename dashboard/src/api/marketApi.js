const API_URL = "http://localhost:3000";

// ------------------------------------------
// Get Market Quote
// ------------------------------------------

export const getMarketQuote = async (symbol) => {
  if (!symbol) {
    throw new Error("Stock symbol is required");
  }

  const cleanSymbol = String(symbol)
    .trim()
    .toUpperCase();

  const response = await fetch(
    `${API_URL}/market/quote/${encodeURIComponent(cleanSymbol)}`
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ||
        "Failed to fetch market quote"
    );
  }

  console.log(
    `Market quote received for ${cleanSymbol}:`,
    data.data
  );

  return data.data;
};

// ------------------------------------------
// Search Market Stocks
// ------------------------------------------

export const searchMarketStocks = async (query) => {
  const cleanQuery = String(query || "").trim();

  if (!cleanQuery) {
    return [];
  }

  const response = await fetch(
    `${API_URL}/market/search?query=${encodeURIComponent(
      cleanQuery
    )}`
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ||
        "Failed to search market stocks"
    );
  }

  return Array.isArray(data.data)
    ? data.data
    : [];
};