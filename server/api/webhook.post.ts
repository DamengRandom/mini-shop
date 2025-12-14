import Stripe from 'stripe';
import { STRIPE_API_VERSION } from '~~/shared/constants/common';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const stripe = new Stripe(config.NUXT_STRIPE_SECRET_KEY, {
    apiVersion: STRIPE_API_VERSION,
  } as any);

  const headers = event.node.req.headers;
  const sig = headers['stripe-signature'];
  const webhookSecret = config.NUXT_STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Webhook Error: Missing signature or secret',
    });
  }

  let stripeEvent: Stripe.Event;

  try {
    const rawBody = await readRawBody(event);
    if (!rawBody) {
      throw new Error('No body provided');
    }
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    throw createError({
      statusCode: 400,
      statusMessage: `Webhook Error: ${err.message}`,
    });
  }

  // Handle the event
  switch (stripeEvent.type) { // Can be used for database update as well
    case 'checkout.session.completed':
      const session = stripeEvent.data.object as Stripe.Checkout.Session;

      console.log(`✅ Payment successful for session ID: ${session.id}`);
      console.log(`💰 Amount: ${session.amount_total}`);
      console.log(`📧 Customer Email: ${session.customer_details?.email}`);

      break;
    
    case 'invoice.payment_succeeded':
      const invoice = stripeEvent.data.object as Stripe.Invoice;

      console.log(`✅ Invoice paid: ${invoice.id}`);
      console.log(`📄 Invoice PDF: ${invoice.hosted_invoice_url}`);

      break;

    case 'invoice.payment_failed':
      const failedInvoice = stripeEvent.data.object as Stripe.Invoice;

      console.error(`❌ Invoice payment failed: ${failedInvoice.id}`);

      break;

    default:
      console.log(`ℹ️ Unhandled event type: ${stripeEvent.type}`);
  }

  return { received: true };
});
