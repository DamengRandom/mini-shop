import { type LineItem } from "@stripe/stripe-js";
import { useRuntimeConfig } from "#app";
import { useMutation } from "@tanstack/vue-query";

export function useCheckout() {
  const config = useRuntimeConfig();
  const toast = useToast();
  
  return useMutation({
    mutationFn: async (lineItems: LineItem[]) => {
      const { data, error } = await useFetch('/api/checkout', {
        method: 'POST',
        body: {
          lineItems,
          successUrl: `${config.public.NUXT_BASE_URL || window.location.origin}/checkout-success`,
          cancelUrl: `${config.public.NUXT_BASE_URL || window.location.origin}/checkout-cancel`,
        }
      });

      if (error.value) {
        throw new Error(error.value.message || 'Failed to create checkout session');
      }

      if (!data.value?.url) {
        throw new Error('No checkout URL returned');
      }

      return data.value;
    },
    onSuccess: async (data) => {
      if (data.url) {
        await navigateTo(data.url, { external: true });
      }
    },
    onError: (error) => {
      console.error('Checkout error:', error);
      toast.add({
        title: 'Checkout Error',
        description: error.message || 'An unexpected error occurred.',
        color: 'error',
        icon: 'i-heroicons-exclamation-circle',
      });
    }
  });
}
