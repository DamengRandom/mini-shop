<script setup lang="ts">
  import type { LineItem } from '@stripe/stripe-js';
  import { useCheckout } from '~/composables/useCheckout';

  const config = useRuntimeConfig();

  const checkout = (price: string) => {
    useCheckout([
      {
        price,
        quantity: 1
      } as unknown as LineItem
    ]);
  }
</script>
<template>
  <h2 class="text-2xl font-bold">Products List</h2>
  <div className={styles.grid}>
    <div>
      <p>Demo production one</p>
      <button @click="checkout(config.public.NUXT_PRODUCT_PRICE_ID)">BUY NOW ~</button>
    </div>
    <div>
      <p>Demo production two</p>
    </div>
  </div>
</template>
