import Stripe from 'stripe';
import { STRIPE_API_VERSION } from '~~/shared/constants/common';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  
  if (!config.NUXT_STRIPE_SECRET_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Stripe secret key is not configured',
    });
  }

  const stripe = new Stripe(config.NUXT_STRIPE_SECRET_KEY, {
    apiVersion: STRIPE_API_VERSION,
  } as any);

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: body.lineItems,
      mode: 'payment',
      success_url: body.successUrl,
      cancel_url: body.cancelUrl,
      shipping_address_collection: {
        allowed_countries: ['AU', 'NZ', 'CN'],
      },
      phone_number_collection: {
        enabled: true,
      },
      customer_email: body.email,
      billing_address_collection: 'required',
      invoice_creation: {
        enabled: true,
      },
    });

    return { url: session.url };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
