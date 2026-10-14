Daira Frontend-Only Demo

This folder is a standalone plain HTML, CSS, and Vanilla JavaScript workspace.
It does not use React, a build step, the existing backend/API, or real payment processing.
Tailwind CSS is loaded from its browser CDN in each HTML page.

index.html contains the static home page, responsive navigation, footer, hero slider,
statistics animation, and a local-only contact form demo. The Products and Product
Details pages use a local JavaScript catalog. Cart and wishlist state is stored in
localStorage and work for guest users.

The account, order, and checkout pages remain assignment scaffolds.

Serve this folder over HTTP so the browser can fetch the shared HTML fragments.
For example, from this folder run: python -m http.server 8000
Then open http://localhost:8000/index.html.

Internet access is needed for Tailwind, Google Fonts, and remote photography.
