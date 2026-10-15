const http = require('http');

const urls = [
  '/',
  '/store',
  '/cart',
  '/checkout',
  '/admin',
  '/store/track-order',
  '/store/order-success',
  '/store/product/prod-1',
  '/about-us',
  '/our-services',
  '/gallery',
  '/contact-us',
  '/get-started'
];

async function checkUrl(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3005${path}`, (res) => {
      console.log(`[${res.statusCode}] http://localhost:3005${path} (${res.headers['content-type']})`);
      resolve({ path, status: res.statusCode });
    }).on('error', (err) => {
      console.log(`[ERROR] ${path}: ${err.message}`);
      resolve({ path, error: err.message });
    });
  });
}

(async () => {
  console.log("Checking all store, cart, checkout, admin, and main routes on http://localhost:3005...");
  for (const u of urls) {
    await checkUrl(u);
  }
})();
