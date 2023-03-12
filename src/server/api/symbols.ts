import { MainClient } from "binance";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    let allowedQuotes: string[] = [];

    if (Array.isArray(query.quotes)) {
      allowedQuotes = query.quotes;
    } else if (typeof query.quotes === "string") {
      allowedQuotes = [query.quotes];
    }

    const client = new MainClient({});
    const symbols = (await client.getExchangeInfo()).symbols;
    const allowedSymbols = [];

    symbols.forEach((symbol) => {
      if (
        symbol.status === "TRADING" &&
        allowedQuotes.includes(symbol.quoteAsset)
      ) {
        allowedSymbols.push(symbol.symbol);
      }
    });

    return {
      symbols: allowedSymbols,
    };
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: "Something went wrong",
    });
  }
});
