# SunTech Solar & Store — Full Suite Web Application

A pixel-perfect, end-to-end production web application cloning [SunTech](https://www.suntechapp.com/) (Vadodara's No. 1 Solar Panel Cleaning Company) and [SunTech Store](https://store.suntechapp.com/), complete with an Executive Admin Portal.

---

## 🌟 Key Features

### 1. 🏠 SunTech Main Website
- **Hero Cross-Fade Slider**: 4 dynamic slides with device-aware appointment booking redirection (iOS App Store, Android Play Store, or `/get-started`).
- **About Us Section**: With YouTube video modal (`VhBl3dHT5SY`), values checklist, and feature highlights.
- **Interactive Stats Counter**: Live animated counters for panel and customer metrics.
- **HTML5 Looping Video Player**: Serving high-definition promotional video (`Promo-Final-1.mp4`).
- **Services Showcase**: Residential, commercial, and industrial cleaning services.
- **Photo FAQs**: Comprehensive solar cleaning FAQs with photo cards.
- **Excellence Dark Section**: Trust badges (Safe & Certified, Professional, Award-Winning, Max Efficiency).
- **Projects Showcase Grid**: Featuring Vadodara installations.
- **Customer Testimonials Carousel**: Reviews with Google Review badges and star ratings.
- **App Download Section**: Featuring solar house graphics and app store links.
- **Floating WhatsApp Widget**: Instant chat connection to `+91 9998546315`.

### 2. 🛒 SunTech Store (`/store`)
- **Direct Navigation**: Clicking "Store" routes internally with zero external redirects.
- **Product Catalog**: 12 high-efficiency solar maintenance tools (Telescopic Water-Fed Poles, Rotary Dual-Jet Brushes, Deionized Water Filters, Solar Panel Clips, Anti-Soiling Sprays, Organic Wash Concentrates, Safety Kits, DIY Bundles).
- **Category Filtering & Search**: Filter by equipment type, search by keyword, sort by price and rating.
- **Product Detail Pages (`/store/product/[id]`)**: Full specifications, warranty badges, ratings, and instant Add-to-Cart.

### 3. 🛍️ Cart & Checkout Flow
- **Cart Drawer & Page (`/cart`)**: Persistent cart state, cross-tab reactivity, and zero hydration flicker.
- **Flexible Payment Options (`/checkout`)**:
  - **100% Pre-Paid**: Full advance payment via Card/UPI/NetBanking.
  - **Part Payment**: Pay customizable deposit (e.g., 25% or 30%) now, remaining balance upon delivery.
  - **Cash on Delivery (COD)**.
- **Order Confirmation & Invoicing (`/store/order-success`)**: Printable receipts and tracking IDs.
- **Order Tracking (`/store/track-order`)**: Real-time status lookup (Pending -> Confirmed -> Shipped -> Out for Delivery -> Delivered).

### 4. 👑 Executive Admin Portal (`/admin`)
- **Dashboard & Analytics**: Total revenue, delivery schedule metrics, prepaid vs part-payment breakdown.
- **Order & Booking Management**: Update delivery status, track courier details, and reconcile payments.
- **Part Payment Toggle**: Enable/disable part payments storewide and configure minimum partial payment percentage.
- **Product Management**: Add, update, and manage inventory and pricing.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node.js 24)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/kalyugikanha/nexus-sun-solar.git
cd nexus-sun-solar

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or whichever port is assigned) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── public/
│   ├── favicon.ico
│   └── images/               # High-res solar photos and Promo-Final-1.mp4
├── src/
│   ├── app/
│   │   ├── about-us/         # About Us page
│   │   ├── admin/            # Executive Admin Portal
│   │   ├── cart/             # Dedicated Cart page
│   │   ├── checkout/         # Multi-option checkout flow
│   │   ├── contact-us/       # Contact inquiry & FAQs
│   │   ├── gallery/          # 12 project photos + 15 YouTube embeds
│   │   ├── get-started/      # App download hub
│   │   ├── our-services/     # Complete solar care solutions
│   │   ├── privacy-policy/   # Legal privacy policy
│   │   ├── refund-cancellation-policy/
│   │   ├── store/            # SunTech Store catalog
│   │   │   ├── order-success/
│   │   │   ├── product/[id]/
│   │   │   └── track-order/
│   │   ├── terms-conditions/
│   │   ├── globals.css       # Design tokens & Nunito typography
│   │   ├── layout.tsx        # Global shell (Header, Footer, WhatsApp)
│   │   └── page.tsx          # 11-section Home page
│   ├── components/           # Reusable UI components
│   ├── context/              # Cart & state management
│   ├── lib/                  # Local storage & data models
│   └── types/                # TypeScript interfaces
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 📄 License
All rights reserved © 2026 SunTech.
