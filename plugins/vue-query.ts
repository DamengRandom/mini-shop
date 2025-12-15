import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const queryClient = new QueryClient();

  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient });
})
