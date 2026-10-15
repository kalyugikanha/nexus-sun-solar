import fs from 'fs';
import path from 'path';
import https from 'https';

const assets = [
  'suntech_white_logo.png',
  'IMG_5242-1536x858-1.jpg',
  'IMG_5243-2048x1031-1-768x387.jpg',
  'IMG_5255-1536x864-1.jpg',
  'IMG_5232-1024x768-1.jpg',
  'IMG_5247-820x461-1.jpg',
  'IMG_5257-1170x658-1.jpg',
  'IMG_5247-2048x1152-1.jpg',
  'IMG_5243-2048x1031-1.jpg',
  'IMG_5232-1536x1152-1.jpg',
  'WhatsApp-Image-2023-05-04-at-11.35.54-1.jpeg',
  'WhatsApp-Image-2023-05-04-at-11.35.55-1.jpeg',
  'WhatsApp-Image-2023-05-23-at-13.09.17-1.jpeg',
  'WhatsApp-Image-2024-01-09-at-5.22.20-PM-1170x658-1.jpeg',
  'IMG_4052-scaled.jpg',
  '2-1024x461-1.jpg',
  'solar-house-min.png',
  'IMG_5255-768x432-1.jpg',
  'IMG_5247-scaled.jpg',
  'IMG_5255-2048x1152-1.jpg',
  'Promo-Final-1.mp4'
];

const targetDir = path.resolve('public/images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(name) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(targetDir, name);
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
      console.log(`Already exists: ${name}`);
      return resolve();
    }
    const url = `https://www.suntechapp.com/images/${encodeURIComponent(name)}`;
    const file = fs.createWriteStream(filePath);
    console.log(`Downloading: ${name}...`);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Finished: ${name}`);
            resolve();
          });
        }).on('error', reject);
        return;
      }
      if (response.statusCode !== 200) {
        console.error(`Failed ${name} with status ${response.statusCode}`);
        return resolve();
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Finished: ${name}`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${name}:`, err.message);
      resolve();
    });
  });
}

(async () => {
  console.log(`Starting asset download into ${targetDir}`);
  for (const asset of assets) {
    await downloadFile(asset);
  }
  console.log("All assets downloaded!");
})();
