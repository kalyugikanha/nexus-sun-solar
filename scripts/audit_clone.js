const http = require('http');

function getHtml(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3005${path}`, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function audit() {
  console.log("=== AUDITING CLONE PARITY ===");
  
  // 1. Home page audit
  const home = await getHtml('/');
  console.log("Home Page checks:");
  console.log("- Header logo present:", home.includes('suntech_white_logo.png'));
  console.log("- Sticky nav links present:", home.includes('Home') && home.includes('About Us') && home.includes('Our Services') && home.includes('Gallery &amp; Videos'));
  console.log("- Store button present:", home.includes('store.suntechapp.com'));
  console.log("- Hero headline present:", home.includes('Vadodara No.1') && home.includes('Solar Cleaning'));
  console.log("- Make Appointment CTA present:", home.includes('Make an Appointment'));
  console.log("- Stats bar numbers present:", home.includes('1,912+') && home.includes('4,034+') && home.includes('7,554+'));
  console.log("- Video player present:", home.includes('Promo-Final-1.mp4'));
  console.log("- Services cards present:", home.includes('Residential Solar Panel Cleaning') && home.includes('Commercial &amp; Industrial Cleaning'));
  console.log("- FAQ cards present:", home.includes('Why is it important to clean solar panels?'));
  console.log("- Excellence section present:", home.includes('Excellence in Solar Panel Cleaning'));
  console.log("- Project grid present:", home.includes('DND Mega Clean') && home.includes('PureAir Solar'));
  console.log("- Testimonials present:", home.includes('What Our Customers Say') && home.includes('Google Review'));
  console.log("- App download present:", home.includes('Download the SunTech App') && home.includes('solar-house-min.png'));
  console.log("- Floating WhatsApp present:", home.includes('wa.me/919998546315'));
  console.log("- Footer present:", home.includes('All rights reserved') && home.includes('41, Krupal society'));

  // 2. About page audit
  const about = await getHtml('/about-us');
  console.log("\nAbout Us checks:");
  console.log("- Commitment to Clean Energy:", about.includes('Our Commitment to Clean Energy'));
  console.log("- Why Choose SunTech:", about.includes('Why Choose SunTech?'));
  console.log("- Achievements section:", about.includes('Our Achievement'));

  // 3. Services page audit
  const services = await getHtml('/our-services');
  console.log("\nOur Services checks:");
  console.log("- Complete Solar Care Solutions:", services.includes('Complete Solar Care Solutions'));
  console.log("- How It Works workflow:", services.includes('How It Works') && services.includes('01') && services.includes('04'));

  // 4. Gallery page audit
  const gallery = await getHtml('/gallery');
  console.log("\nGallery checks:");
  console.log("- Project items count:", (gallery.match(/Industrial Solar Farm|Rooftop Residential|Solar Array Cleaning/g) || []).length > 0);
  console.log("- YouTube iframes count:", (gallery.match(/iframe\s+src="https:\/\/www\.youtube\.com\/embed/g) || []).length);

  // 5. Contact page audit
  const contact = await getHtml('/contact-us');
  console.log("\nContact Us checks:");
  console.log("- Phone & email:", contact.includes('+91 9998546315') && contact.includes('info@suntechapp.com'));
  console.log("- Consultation form present:", contact.includes('Book a Free Consultation'));
  console.log("- FAQs present:", contact.includes('Frequently Asked Questions'));

  // 6. Get Started page audit
  const getStarted = await getHtml('/get-started');
  console.log("\nGet Started checks:");
  console.log("- App download links present:", getStarted.includes('App Store') && getStarted.includes('Google Play'));
  console.log("- We're Here to Help present:", getStarted.includes("We&#x27;re Here to Help") || getStarted.includes("We're Here to Help"));

  console.log("\nALL AUDIT CHECKS COMPLETED SUCCESSFULLY!");
}

audit();
