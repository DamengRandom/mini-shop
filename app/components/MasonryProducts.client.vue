<script setup lang="ts">
  import type { LineItem } from '@stripe/stripe-js';
  import { useCheckout } from '~/composables/useCheckout';

  const config = useRuntimeConfig();

  const { mutate: checkout, isPending } = useCheckout();

  const handleBuy = (price: string) => {
    checkout([
      {
        price,
        quantity: 1
      }
    ] as unknown as LineItem[]);
  }
</script>
<template>
  <h2 class="text-2xl font-bold">Products List</h2>
  <div className={styles.grid}>
    <div>
      <p>Demo production one</p>
      <button :disabled="isPending" @click="handleBuy(config.public.NUXT_PRODUCT_PRICE_ID)">
        {{ isPending ? 'Processing...' : 'BUY NOW ~' }}
      </button>
    </div>
    <div>
      <p>Demo production two</p>
    </div>
  </div>
</template>
