import { type LineItem } from "@stripe/stripe-js";
import { useRuntimeConfig } from "#app";

export async function useCheckout(lineItems: LineItem[]) {
  const config = useRuntimeConfig();
  
  const { data } = await useFetch('/api/checkout', {
    method: 'POST',
    body: {
      lineItems,
      successUrl: `${config.NUXT_BASE_URL || window.location.origin}/checkout-success`,
      cancelUrl: `${config.NUXT_BASE_URL || window.location.origin}/checkout-cancel`,
    }
  });

  if (data.value?.url) {
    window.location.href = data.value.url;
  } else {
    console.error('Failed to create checkout session');
  }
}
