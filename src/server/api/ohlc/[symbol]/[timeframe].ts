import { MainClient } from "binance";
import type { Ohlc } from "~/types";

export default defineEventHandler(async (event) => {
  const symbol = event.context.params.symbol.toUpperCase();
  const interval = event.context.params.timeframe;

  try {
    const client = new MainClient({});
    const candles = (
      await client.getKlines({
        symbol,
        interval,
      })
    ).map((kline) => ({
      time: kline[0] / 1000,
      open: parseFloat(kline[1]),
      high: parseFloat(kline[2]),
      low: parseFloat(kline[3]),
      close: parseFloat(kline[4]),
    })) as Ohlc;

    return {
      symbol,
      interval,
      candles,
    };
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: "Something went wrong",
    });
  }
});
