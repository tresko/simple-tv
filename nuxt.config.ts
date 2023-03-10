// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      "/api/hello": {
        swr: 60,
      },
    },
  },
});
