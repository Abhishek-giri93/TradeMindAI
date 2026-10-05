// =====================================================
// MARKET SERVICE
// =====================================================

// -----------------------------------------------------
// MARKET API URL
// -----------------------------------------------------
// Local development:
// MARKET_API_URL=http://localhost:8787
//
// Production / Render:
// MARKET_API_URL=https://your-market-api-url.onrender.com
//
// Keep the actual URL inside environment variables.
// Do NOT hard-code localhost for production.
// -----------------------------------------------------

const MARKET_API_URL =
  process.env.MARKET_API_URL;


// -----------------------------------------------------
// Validate Market API Configuration
// -----------------------------------------------------

if (!MARKET_API_URL) {
  console.warn(
    "WARNING: MARKET_API_URL environment variable is not configured."
  );
}


// =====================================================
// STOCK SYMBOL MAPPING
// =====================================================

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


// =====================================================
// NORMALIZE STOCK SYMBOL
// =====================================================

const normalizeStockSymbol = (symbol) => {

  if (!symbol) {
    throw new Error(
      "Stock symbol is required"
    );
  }


  const cleanSymbol =
    String(symbol)
      .trim()
      .toUpperCase();


  // Check if stock name has
  // a specific mapping

  if (SYMBOL_MAP[cleanSymbol]) {
    return SYMBOL_MAP[cleanSymbol];
  }


  // Normal symbols:
  //
  // RELIANCE -> RELIANCE
  // TCS      -> TCS
  // INFY     -> INFY
  //
  // Also handles:
  //
  // HDFC  BANK -> HDFCBANK

  return cleanSymbol.replace(
    /\s+/g,
    ""
  );
};


// =====================================================
// GET STOCK QUOTE
// =====================================================

const getStockQuote = async (symbol) => {

  // ---------------------------------------------------
  // Check API configuration
  // ---------------------------------------------------

  if (!MARKET_API_URL) {

    throw new Error(
      "Market API URL is not configured"
    );

  }


  // ---------------------------------------------------
  // Normalize symbol
  // ---------------------------------------------------

  const normalizedSymbol =
    normalizeStockSymbol(symbol);


  // ---------------------------------------------------
  // Create NSE ticker
  // ---------------------------------------------------

  const ticker =
    `${normalizedSymbol}.NS`;


  console.log(
    `Fetching market data for: ${ticker}`
  );


  // ---------------------------------------------------
  // Build API URL
  // ---------------------------------------------------

  const url =
    `${MARKET_API_URL}/stock?symbol=${encodeURIComponent(
      ticker
    )}&res=num`;


  console.log(
    `Market API request: ${url}`
  );


  // ---------------------------------------------------
  // Fetch market data
  // ---------------------------------------------------

  let response;

  try {

    response = await fetch(url);

  } catch (error) {

    console.error(
      "Market API connection failed:",
      error
    );

    throw new Error(
      `Unable to connect to market API: ${
        error.message
      }`
    );

  }


  // ---------------------------------------------------
  // Parse response
  // ---------------------------------------------------

  let data;

  try {

    data = await response.json();

  } catch (error) {

    console.error(
      "Invalid market API response:",
      error
    );

    throw new Error(
      "Market API returned an invalid response"
    );

  }


  // ---------------------------------------------------
  // Validate response
  // ---------------------------------------------------

  if (
    !response.ok ||
    data.status !== "success"
  ) {

    throw new Error(
      data.message ||
      "Failed to fetch market data"
    );

  }


  // ---------------------------------------------------
  // Return stock data
  // ---------------------------------------------------

  return data.data;
};


// =====================================================
// SEARCH STOCKS
// =====================================================

const searchStocks = async (query) => {

  // ---------------------------------------------------
  // Check API configuration
  // ---------------------------------------------------

  if (!MARKET_API_URL) {

    throw new Error(
      "Market API URL is not configured"
    );

  }


  // ---------------------------------------------------
  // Clean search query
  // ---------------------------------------------------

  const cleanQuery =
    String(query || "")
      .trim();


  if (!cleanQuery) {
    return [];
  }


  // ---------------------------------------------------
  // Build search URL
  // ---------------------------------------------------

  const url =
    `${MARKET_API_URL}/search?q=${encodeURIComponent(
      cleanQuery
    )}`;


  // ---------------------------------------------------
  // Fetch search results
  // ---------------------------------------------------

  let response;

  try {

    response = await fetch(url);

  } catch (error) {

    console.error(
      "Market search API connection failed:",
      error
    );

    throw new Error(
      `Unable to connect to market API: ${
        error.message
      }`
    );

  }


  // ---------------------------------------------------
  // Parse response
  // ---------------------------------------------------

  let data;

  try {

    data = await response.json();

  } catch (error) {

    console.error(
      "Invalid market search API response:",
      error
    );

    throw new Error(
      "Market API returned an invalid response"
    );

  }


  console.log(
    "RAW SEARCH API RESPONSE:",
    data
  );


  // ---------------------------------------------------
  // Validate response
  // ---------------------------------------------------

  if (
    !response.ok ||
    data.status !== "success"
  ) {

    throw new Error(
      data.message ||
      "Failed to search stocks"
    );

  }


  // ---------------------------------------------------
  // Return search results
  // ---------------------------------------------------

  return Array.isArray(data.results)
    ? data.results
    : [];
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getStockQuote,
  searchStocks,
};