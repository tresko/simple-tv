<template>
  <div v-if="showChart">
    <div v-for="symbol in symbols" :key="symbol.symbol">
      {{ symbol.symbol }} {{ symbol.interval }}
      <a
        :href="`https://www.tradingview.com/chart/?symbol=BINANCE:${symbol.symbol}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to chart
      </a>
      <TvChart :candles="symbol.candles" inverted />
      <TvChart :candles="symbol.candles" />
    </div>
  </div>
</template>

<script setup lang="ts">
const symbols = shallowRef([]);
const showChart = ref<boolean>(false);
const interval = ref<string>("4h");

const { data: symbolsData, error: symbolsError } = await useFetch(
  "/api/symbols",
  {
    query: {
      quotes: ["USDT"],
    },
  }
);
if (symbolsData.value) {
  Promise.allSettled(
    symbolsData.value.symbols.slice(0, 10).map((symbol) => {
      return useFetch(`/api/ohlc/${symbol}/${interval.value}`);
    })
  ).then((results) => {
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        symbols.value.push(result.value.data.value);
      }
    });
    triggerRef(symbols);
    showChart.value = true;
  });
} else {
  console.log(symbolsError.value);
}
</script>
