// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
    }
  },
  runtimeConfig: {
    NUXT_STRIPE_SECRET_KEY: process.env.NUXT_STRIPE_SECRET_KEY,
    NUXT_STRIPE_WEBHOOK_SECRET: process.env.NUXT_STRIPE_WEBHOOK_SECRET,
    public: {
      NUXT_STRIPE_PUBLISHABLE_KEY: process.env.NUXT_STRIPE_PUBLISHABLE_KEY,
      NUXT_BASE_URL: process.env.NUXT_BASE_URL,
      NUXT_PRODUCT_PRICE_ID: process.env.NUXT_PRODUCT_PRICE_ID,
    }
  },
  plugins: [
    '~/plugins/vue-query.ts',
  ],
  devServer: {
    host: '0.0.0.0'
  },
  vite: {
    server: {
      allowedHosts: ['all']
    }
  }
})
