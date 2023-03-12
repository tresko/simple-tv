<template>
  <div>
    <ClientOnly>
      <div ref="chartRef" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { createChart } from "lightweight-charts";
import { Ohlc } from "~/types";

interface ChartProps {
  candles: Ohlc;
  inverted?: boolean;
}

const props = withDefaults(defineProps<ChartProps>(), {
  inverted: false,
});

const chartRef = ref<HTMLDivElement | null>(null);

watchEffect(() => {
  if (chartRef.value) {
    const candles = props.candles;
    const chartOptions = {
      width: window.innerWidth * 0.8,
      height: 300,
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
    };
    const chart = createChart(chartRef.value, chartOptions);
    if (props.inverted) {
      chart.applyOptions({
        rightPriceScale: {
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
          invertScale: true,
        },
      });
    }
    // Candlesticks
    const red = "#ef5350";
    const green = "#26a69a";
    const bullish = props.inverted ? red : green;
    const bearish = props.inverted ? green : red;
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: bullish,
      downColor: bearish,
      borderVisible: false,
      wickUpColor: bullish,
      wickDownColor: bearish,
    });
    candlestickSeries.setData(candles);

    const ema200 = chart.addLineSeries({
      color: "#d1ca33",
      lineWidth: 1,
    });
    ema200.setData(exponentialMovingAverage(candles, 200));

    const ema20 = chart.addLineSeries({
      color: "#0100c6",
      lineWidth: 1,
    });
    ema20.setData(exponentialMovingAverage(candles, 20));
  }
});

function exponentialMovingAverage(
  data: {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }[],
  timePeriod: number
) {
  const k = 2 / (timePeriod + 1);
  let ema = data[0].close;
  const emaData = [{ time: data[0].time, value: ema }];
  for (let i = 1; i < data.length; i++) {
    ema = k * (data[i].close - ema) + ema;
    emaData.push({ time: data[i].time, value: ema });
  }
  return emaData;
}
</script>
