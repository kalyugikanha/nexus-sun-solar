const http = require('http');

const urls = [
  '/',
  '/about-us',
  '/our-services',
  '/gallery',
  '/contact-us',
  '/get-started',
  '/privacy-policy',
  '/terms-conditions',
  '/refund-cancellation-policy',
  '/store',
  '/store/product/prod-1',
  '/cart',
  '/checkout',
  '/store/track-order',
  '/store/order-success?id=ST-2026-9841',
  '/admin',
  '/project-gallery',
  '/video',
  '/images/suntech_white_logo.png',
  '/images/Promo-Final-1.mp4',
  '/favicon.ico'
];

async function checkUrl(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3005${path}`, (res) => {
      console.log(`[${res.statusCode}] ${path} (${res.headers['content-type']})`);
      resolve({ path, status: res.statusCode });
    }).on('error', (err) => {
      console.log(`[ERROR] ${path}: ${err.message}`);
      resolve({ path, error: err.message });
    });
  });
}

(async () => {
  console.log("Checking all routes and assets on http://localhost:3005...");
  for (const u of urls) {
    await checkUrl(u);
  }
})();
