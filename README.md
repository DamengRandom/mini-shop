# Mini Shop

- This is a mini shop app which integrates with Stripe to sell own products online ~

## Techs

### Frontend

- NuxtJS ✅
- TailwindCSS ✅
- Masonry List (TODO)
- Stripe API ✅
- Vue Query ✅

### Backend - No backend needed for now 

- Plan to create a backend for business owner (To deal with fulfillment) (TODO)

## How to start locally

```bash
pnpm dev # start nuxt app locally
# Please create a .env file and setup related environment variables based on .env.example
# Please setup ngrok to listen on localhost:7873 and forward to localhost:7873
brew install ngrok
ngrok config add-authtoken <YOUR_ACCOUNT_TOKEN>
ngrok http 3000
# Please setup stripe webhook to forward events with ngrok url (ONLY FOR LOCAL ENVIRONMENT TESTING)
# Meanwhile, every time, we restart Ngrok server for local development, we need to update:
# - webhook domain url (copy latest url from ngrok terminal window), eg: https://7b43d62df1dc.ngrok-free.app/api/stripe/webhooks
```
