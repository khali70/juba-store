# جوبا | Juba Store

Online store for Juba (جوبا), a clothing brand from El Qanater El Khayreya, Qalyubia: hoodies, sweatshirts and tees with Islamic-heritage designs, plus a kids line.

Static site (HTML, CSS, vanilla JS), no build step.

## Features
- Arabic RTL catalog with category filters (hoodies, sweatshirts, tees, kids)
- Product view with photo gallery, color, size and quantity
- Cart saved in the browser
- Checkout sends the order as a WhatsApp message (cash on delivery)

## Run locally
```bash
python3 -m http.server 5173
```
Then open http://localhost:5173

## Edit products
Products, prices and sizes live in `products.js`. Photos are in `images/p/<id>.webp`.
