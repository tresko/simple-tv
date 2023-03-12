// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "./src",

  css: ["~/assets/global.css"],

  modules: ["@nuxtjs/eslint-module"],

  nitro: {
    routeRules: {
      // "/api/ohlc/**": {
      //   swr: 60,
      // },
      // "/api/symbols": {
      //   swr: 60 * 60,
      // },
    },
  },
});
