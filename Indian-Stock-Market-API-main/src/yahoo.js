// Talks to Yahoo Finance public JSON endpoints via fetch.
// Designed to work inside Cloudflare Workers without requiring
// Yahoo's crumb/cookie authentication for stock-price retrieval.

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

// ------------------------------------------------------------
// Helper
// ------------------------------------------------------------

const raw = (field) =>
  field && typeof field === "object"
    ? field.raw ?? null
    : field ?? null;


// ------------------------------------------------------------
// NSE Autocomplete
// ------------------------------------------------------------

export async function tryNseAutocomplete(query) {
  try {
    const headers = {
      "User-Agent": UA,
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      Referer: "https://www.nseindia.com/",
      "X-Requested-With": "XMLHttpRequest",
    };

    const homeRes = await fetch("https://www.nseindia.com", {
      headers,
      signal: AbortSignal.timeout(5000),
    });

    const cookie =
      (homeRes.headers.get("set-cookie") || "").split(";")[0];

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await fetch(
      `https://www.nseindia.com/api/search/autocomplete?q=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          ...headers,
          Cookie: cookie,
        },
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return (data.symbols || [])
      .filter((item) => item.result_sub_type === "equity")
      .map((item) => ({
        symbol: item.symbol,
        company_name: item.symbol_info,
        listing_date: item.listing_date,
        source: "nse_api",
      }));
  } catch (error) {
    console.error("NSE autocomplete error:", error.message);
    return [];
  }
}


// ------------------------------------------------------------
// Yahoo Direct Search
// ------------------------------------------------------------

export async function searchYahooDirect(query) {
  const symbol = query.toUpperCase().replace(/\s+/g, "");

  if (!symbol) {
    return [];
  }

  const detail = await getStockDetail(`${symbol}.NS`);

  if (!detail) {
    return [];
  }

  return [
    {
      symbol,
      company_name: detail.companyName,
      sector: detail.sector,
      industry: detail.industry,
      source: "yahoo_direct",
    },
  ];
}


// ------------------------------------------------------------
// Yahoo Search
// ------------------------------------------------------------

export async function searchYahoo(query) {
  try {
    const url =
      `https://query1.finance.yahoo.com/v1/finance/search` +
      `?q=${encodeURIComponent(query)}&quotesCount=15`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": UA,
      },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return (data.quotes || [])
      .filter(
        (q) =>
          q.symbol &&
          (q.symbol.endsWith(".NS") || q.symbol.endsWith(".BO"))
      )
      .map((q) => ({
        symbol: q.symbol.replace(/\.(NS|BO)$/, ""),
        company_name: q.longname || q.shortname || q.symbol,
        sector: q.sector || "N/A",
        industry: q.industry || "N/A",
        source: "yahoo",
      }));
  } catch (error) {
    console.error("Yahoo search error:", error.message);
    return [];
  }
}


// ------------------------------------------------------------
// Get Stock Detail
//
// Uses Yahoo Finance Chart API.
// This endpoint does NOT require Yahoo crumb/cookie
// authentication.
// ------------------------------------------------------------

export async function getStockDetail(tickerSymbol) {
  try {
    const url =
      `https://query1.finance.yahoo.com/v8/finance/chart/` +
      `${encodeURIComponent(tickerSymbol)}` +
      `?range=5d&interval=1d`;

    console.log(`Fetching Yahoo chart data for: ${tickerSymbol}`);

    const res = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error(
        `Yahoo Chart API returned HTTP ${res.status} for ${tickerSymbol}`
      );

      return null;
    }

    const data = await res.json();

    const result = data?.chart?.result?.[0];

    if (!result) {
      console.error(`No Yahoo chart result for ${tickerSymbol}`);
      return null;
    }

    const meta = result.meta || {};

    const timestamps = result.timestamp || [];
    const quote = result.indicators?.quote?.[0] || {};

    const closes = quote.close || [];
    const opens = quote.open || [];
    const highs = quote.high || [];
    const lows = quote.low || [];
    const volumes = quote.volume || [];

    // Find the latest valid close.
    let latestIndex = -1;

    for (let i = closes.length - 1; i >= 0; i--) {
      if (closes[i] !== null && closes[i] !== undefined) {
        latestIndex = i;
        break;
      }
    }

    if (latestIndex === -1) {
      console.error(`No price data available for ${tickerSymbol}`);
      return null;
    }

    const lastPrice =
      meta.regularMarketPrice ??
      closes[latestIndex];

    const previousClose =
      meta.previousClose ??
      meta.chartPreviousClose ??
      null;

    const open =
      meta.regularMarketPrice !== null &&
      meta.regularMarketPrice !== undefined
        ? opens[latestIndex]
        : opens[latestIndex];

    const dayHigh = highs[latestIndex] ?? null;
    const dayLow = lows[latestIndex] ?? null;
    const volume = volumes[latestIndex] ?? null;

    let change = null;
    let percentChange = null;

    if (
      lastPrice !== null &&
      previousClose !== null &&
      previousClose !== 0
    ) {
      change = lastPrice - previousClose;
      percentChange = (change / previousClose) * 100;
    }

    const currency = meta.currency || "INR";

    const companyName =
      meta.longName ||
      meta.shortName ||
      meta.symbol ||
      tickerSymbol;

    const regularMarketTime =
      meta.regularMarketTime ||
      (timestamps.length > 0
        ? timestamps[latestIndex]
        : null);

    return {
      companyName,

      currency,

      lastPrice,

      change,

      percentChange,

      previousClose,

      open,

      dayHigh,

      dayLow,

      // Chart API does not reliably provide these fundamentals.
      yearHigh:
        meta.fiftyTwoWeekHigh ??
        null,

      yearLow:
        meta.fiftyTwoWeekLow ??
        null,

      volume,

      marketCap:
        meta.marketCap ??
        null,

      peRatio: null,

      dividendYield: null,

      bookValue: null,

      eps: null,

      // These are not reliably available from Chart API.
      sector: "N/A",

      industry: "N/A",

      lastUpdateEpoch: regularMarketTime,
    };
  } catch (error) {
    console.error(
      `Yahoo Chart API error for ${tickerSymbol}:`,
      error.message
    );

    return null;
  }
}


// ------------------------------------------------------------
// Batch Quote
//
// Also uses Yahoo Chart API instead of the authenticated
// /v7/finance/quote endpoint.
// ------------------------------------------------------------

export async function getQuoteBatch(tickerSymbols) {
  const results = {};

  for (const tickerSymbol of tickerSymbols) {
    try {
      const detail = await getStockDetail(tickerSymbol);

      if (!detail) {
        continue;
      }

      results[tickerSymbol] = {
        companyName: detail.companyName,

        lastPrice: detail.lastPrice,

        change: detail.change,

        percentChange: detail.percentChange,

        volume: detail.volume,

        marketCap: detail.marketCap,

        peRatio: detail.peRatio,
      };
    } catch (error) {
      console.error(
        `Failed to get quote for ${tickerSymbol}:`,
        error.message
      );
    }
  }

  return results;
}