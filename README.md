# HOMEBAKES — Production-ready bakery storefront

A polished React + Vite bakery storefront with responsive pages, product browsing, search/filtering, product details, localStorage cart, checkout validation, WhatsApp order generation, custom-cake request form, testimonials, gallery, contact page and SEO metadata.

## 1. Run locally
1. Install Node.js 18+.
2. In this folder run:
   `npm install`
3. Start development:
   `npm run dev`
4. Open the local URL printed by Vite.
5. Production build:
   `npm run build`
6. Preview the build:
   `npm run preview`

## 2. Change products
Open `src/main.jsx` and edit the `PRODUCTS` array. Each item contains `name`, `category`, `price`, `sizes`, `image`, `desc`, and `ingredients`.

For a larger project, move `PRODUCTS` into `src/data/products.js`; the UI is already component-based so this is a simple refactor.

## 3. Change prices
Edit `price` for regular items and the `sizes` object for cakes. Prices are displayed in UGX through the centralized `money()` formatter.

## 4. Change WhatsApp / phone / email / address
Edit the `CONFIG` object at the top of `src/main.jsx`:
- `email`
- `phone`
- `whatsapp` (digits only, country code included)
- `address`
- `hours`
- `deliveryFee`

For a production deployment, move these values into environment variables or a dedicated `src/config.js` file.

## 5. Connect a real payment gateway
The checkout currently records the selected payment method but does NOT claim that payment happened. Replace the checkout submit flow with a server-side payment integration such as Flutterwave, Pesapal, Stripe, or another gateway available to the business. Never put secret API keys in React/browser code. The backend should create the payment request, verify the callback/webhook, then mark the order paid.

## 6. Connect orders to a database
Create a backend/API endpoint such as `POST /api/orders`. Send the validated checkout payload to the backend, store it in PostgreSQL, MySQL, Supabase or Firebase, and return a server-generated order number. Add authentication/admin tools separately if staff need order management.

## 7. Deploy online
Recommended static hosting options include Vercel, Netlify, Cloudflare Pages or any Node-compatible host:
1. Push the project to GitHub.
2. Import the repository into your hosting provider.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add any production environment variables.
6. Connect the custom domain.
7. If using client-side routing on static hosting, configure SPA fallback so `/menu`, `/cart`, `/checkout`, etc. serve `index.html`.

## Production notes
- Replace placeholder phone/WhatsApp/address/social URLs in `CONFIG`.
- Replace remote Unsplash image URLs with optimized owned/commercially licensed bakery photos before launch.
- Add a real backend/database for durable orders.
- Add a server-side payment gateway and webhook verification before accepting online payments.
- Add analytics, cookie/privacy notices and business policies appropriate to your deployment.
