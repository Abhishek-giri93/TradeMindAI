
const MARKET_API_URL = "http://localhost:8787";

// ------------------------------------------
// Stock Symbol Mapping
// ------------------------------------------

// Some stock names contain spaces,
// but NSE ticker symbols do not.
//
// Example:
// HDFC BANK -> HDFCBANK
// ICICI BANK -> ICICIBANK
// STATE BANK OF INDIA -> SBIN

const SYMBOL_MAP = {
  "HDFC BANK": "HDFCBANK",
  "ICICI BANK": "ICICIBANK",
  "STATE BANK OF INDIA": "SBIN",
};


// ------------------------------------------
// Normalize Stock Symbol
// ------------------------------------------

const normalizeStockSymbol = (symbol) => {
  if (!symbol) {
    throw new Error("Stock symbol is required");
  }

  const cleanSymbol = String(symbol)
    .trim()
    .toUpperCase();

  // Check if stock name has a specific mapping
  if (SYMBOL_MAP[cleanSymbol]) {
    return SYMBOL_MAP[cleanSymbol];
  }

  // For normal symbols:
  // RELIANCE -> RELIANCE
  // TCS      -> TCS
  // INFY     -> INFY
  //
  // Also handles:
  // "HDFC  BANK" -> "HDFCBANK"
  return cleanSymbol.replace(/\s+/g, "");
};


// ------------------------------------------
// Get Stock Quote
// ------------------------------------------

const getStockQuote = async (symbol) => {
  const normalizedSymbol =
    normalizeStockSymbol(symbol);

  const ticker = `${normalizedSymbol}.NS`;

  console.log(
    `Fetching market data for: ${ticker}`
  );

  const response = await fetch(
    `${MARKET_API_URL}/stock?symbol=${ticker}&res=num`
  );

  const data = await response.json();

  if (!response.ok || data.status !== "success") {
    throw new Error(
      data.message ||
        "Failed to fetch market data"
    );
  }

  return data.data;
};


// ------------------------------------------
// Search Stocks
// ------------------------------------------

const searchStocks = async (query) => {
  const cleanQuery = String(query || "").trim();

  if (!cleanQuery) {
    return [];
  }

  const response = await fetch(
    `${MARKET_API_URL}/search?q=${encodeURIComponent(
      cleanQuery
    )}`
  );

  const data = await response.json();

  console.log(
    "RAW SEARCH API RESPONSE:",
    data
  );

  if (!response.ok || data.status !== "success") {
    throw new Error(
      data.message ||
        "Failed to search stocks"
    );
  }

  // Actual API structure:
  //
  // data
  //  ├── status
  //  ├── query
  //  ├── total_results
  //  └── results[]
  //
  // So we return data.results

  return Array.isArray(data.results)
    ? data.results
    : [];
};


// ------------------------------------------
// Export
// ------------------------------------------

module.exports = {
  getStockQuote,
  searchStocks,
};

