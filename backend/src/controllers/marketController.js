const {
  getStockQuote,
  searchStocks,
} = require("../services/marketService");


// ------------------------------------------
// Get Market Quote
// ------------------------------------------

const getMarketQuote = async (req, res) => {
  try {
    const { symbol } = req.params;

    const quote = await getStockQuote(symbol);

    return res.status(200).json({
      message: "Market quote fetched successfully.",
      quote,
    });

  } catch (error) {
    console.log(
      "Get market quote error:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "Unable to fetch market quote.",
    });
  }
};


// ------------------------------------------
// Search Market Stocks
// ------------------------------------------

const searchMarketStocks = async (req, res) => {
  try {
    const { query } = req.params;

    // Validate query
    if (
      !query ||
      query.trim().length === 0
    ) {
      return res.status(400).json({
        message: "Search query is required.",
        results: [],
      });
    }

    // Call market service
    const searchResponse =
      await searchStocks(
        query.trim()
      );

    console.log(
      "Search service response:",
      searchResponse
    );

    let results = [];

    // --------------------------------------
    // Case 1:
    // Service returns:
    // { results: [...] }
    // --------------------------------------

    if (
      Array.isArray(
        searchResponse?.results
      )
    ) {
      results =
        searchResponse.results;
    }

    // --------------------------------------
    // Case 2:
    // Service returns:
    // { results: { results: [...] } }
    // --------------------------------------

    else if (
      Array.isArray(
        searchResponse?.results?.results
      )
    ) {
      results =
        searchResponse.results.results;
    }

    // --------------------------------------
    // Case 3:
    // Service returns:
    // { data: { results: [...] } }
    // --------------------------------------

    else if (
      Array.isArray(
        searchResponse?.data?.results
      )
    ) {
      results =
        searchResponse.data.results;
    }

    // --------------------------------------
    // Case 4:
    // Service returns:
    // { data: { results: { results: [...] } } }
    // --------------------------------------

    else if (
      Array.isArray(
        searchResponse?.data?.results?.results
      )
    ) {
      results =
        searchResponse.data.results.results;
    }

    // --------------------------------------
    // Case 5:
    // Service directly returns an array
    // --------------------------------------

    else if (
      Array.isArray(searchResponse)
    ) {
      results =
        searchResponse;
    }

    console.log(
      "Final stock search results:",
      results
    );

    return res.status(200).json({
      message:
        "Stocks searched successfully.",
      results,
    });

  } catch (error) {
    console.log(
      "Search market stocks error:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "Unable to search stocks.",
      results: [],
    });
  }
};


module.exports = {
  getMarketQuote,
  searchMarketStocks,
};