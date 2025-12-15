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
  <UContainer class="max-w-6xl px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl font-bold mb-4">Products</h2>
    <div class="grid gap-6 sm:grid-cols-2">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <p class="font-medium">Demo product one</p>
            <p class="text-sm text-gray-500">$12</p>
          </div>
        </template>
        <p class="text-sm text-gray-600">A simple demo product powered by Stripe Checkout.</p>
        <template #footer>
          <UButton :loading="isPending" @click="handleBuy(config.public.NUXT_PRODUCT_PRICE_ID)">
            {{ isPending ? 'Processing...' : 'Buy now' }}
          </UButton>
        </template>
      </UCard>
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <p class="font-medium">Demo product two</p>
            <p class="text-sm text-gray-500">$24</p>
          </div>
        </template>
        <p class="text-sm text-gray-600">Another placeholder item using Nuxt UI components.</p>
        <template #footer>
          <UButton variant="ghost" disabled>
            Coming soon
          </UButton>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
