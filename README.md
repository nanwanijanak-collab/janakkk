# Urban Monkey

Cinematic e-commerce storefront for Urban Monkey — Indian streetwear.
Caps, hoodies and eyewear, with a working cart, Razorpay checkout and a
camera-based virtual try-on.

**Live:** https://urban-monkey-janak10.vercel.app

## What is here

```
index.html          home — hero film, three video-led category sections, featured
product.html        product detail (reads ?id=)
try.html            Try & Use — virtual try-on
assets/css          one stylesheet
assets/js/site.js   shared core: header, footer, cart, checkout, motion
assets/js/app.js    homepage composition
assets/js/product.js  product detail page
assets/js/tryon.js  MediaPipe face/pose try-on
assets/img          product cut-outs, model photography, brand marks
assets/video        six cinematic films
data/catalog.js     catalog, inlined so the site runs from file:// too
api/                serverless payment functions
vercel.json         long-cache headers for images and video
```

No build step. It is static HTML/CSS/JS plus two serverless functions.

## Payments

The browser never decides what to charge.

- `api/create-order.js` — receives only product ids and quantities, prices the
  order from `api/_prices.js` (generated from the catalog), rejects unknown,
  sold-out or bad-quantity lines, then creates the Razorpay order.
- `api/verify-payment.js` — recomputes the HMAC-SHA256 signature over
  `order_id|payment_id` and compares it in constant time. The cart only clears
  after that passes.

### Required environment variables

Set these in Vercel under **Settings → Environment Variables**, then redeploy:

| Variable | Notes |
|---|---|
| `RAZORPAY_KEY_ID` | Public. Sent to the browser to open checkout. |
| `RAZORPAY_KEY_SECRET` | Secret. Server only — never expose it. |

Without them, `/api/create-order` returns 503 and checkout falls back to
Razorpay's public demo key.

Health check: `/api/health`

## Local development

Requires Node 18+.

```
node server.js
```

Serves the site and runs the `/api` functions, reading keys from a local
`.env` file (which is gitignored and must never be committed).

## Still to do before real customers

- Orders are not persisted anywhere — payments appear in the Razorpay
  dashboard, but the site records nothing. Needs a database.
- No Razorpay webhook, so a payment completed after the browser closes is
  never learned about.
- No shipping address or contact capture.
- Stock is static in the catalog, so sold-out items can oversell.

## Credits

Photography, video and logo are Urban Monkey's own.
Instagram [@urbanmonkeyindia](https://www.instagram.com/urbanmonkeyindia/) ·
YouTube [@urbanmonkeyIND](https://www.youtube.com/@urbanmonkeyIND)