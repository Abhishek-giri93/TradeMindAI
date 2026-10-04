const { getStockQuote } = require("./src/services/marketService");
const test = async () => {
  try {
    const quote = await getStockQuote("RELIANCE");

    console.log("Market Quote:");
    console.log(quote);
  } catch (error) {
    console.log("Market API Error:", error.message);
  }
};

test();