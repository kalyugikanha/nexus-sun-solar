import React from "react";
import Link from "next/link";
import {
  Sun,
  Zap,
  Check,
  ArrowRight,
  Phone,
  Home as HomeIcon,
  Building2,
  Wrench,
  ChevronRight,
  Shield,
  Leaf,
  Award,
  Sparkles,
  BarChart3,
  Calendar,
  ShoppingBag,
  Truck,
} from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import StatsCounter from "@/components/StatsCounter";
import YouTubeModal from "@/components/YouTubeModal";
import TestimonialSlider from "@/components/TestimonialSlider";

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero Slider Section */}
      <HeroSlider />

      {/* 2. About Us Section */}
      <section className="py-[80px] bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="section-badge justify-center">
              <Sun className="w-4 h-4 text-primary" />
              ABOUT US
            </span>
            <h2 className="section-title">Dedicated to Sustainable Solar</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Video preview */}
            <div className="relative">
              <YouTubeModal
                videoId="VhBl3dHT5SY"
                thumbnailSrc="/images/IMG_5242-1536x858-1.jpg"
                title="Dedicated to Sustainable Solar"
              />
            </div>

            {/* Right: Content */}
            <div className="pt-2">
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                Suntech leads Vadodara&apos;s solar cleaning scene, ensuring every panel gets expert care. Our digital app makes bookings instant and follow-ups easy.
              </p>

              {/* 6 Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "Solar Cleaning",
                  "Professional Process",
                  "Sustained Efficiency",
                  "Vadodara Local Team",
                  "Performance Driven",
                  "Solar Panel Wash",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-green-600 stroke-[3]" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              {/* 2 Highlighted boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-3 bg-blue-50 rounded-2xl p-5">
                  <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sun className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800 text-sm leading-snug">
                    Solar Maintenance Services
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 rounded-2xl p-5">
                  <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-800 text-sm leading-snug">
                    Solar Efficiency Improvement
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 flex-wrap">
                <Link className="btn-primary" href="/about-us">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+919998546315" className="btn-outline">
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Live Animated Stats Counter */}
      <StatsCounter />

      {/* 4. See SunTech in Action (Watch Us Work) */}
      <section className="py-[60px] bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="section-badge justify-center">
              <Sun className="w-4 h-4 text-primary" /> Watch Us Work
            </span>
            <h2 className="section-title">See SunTech in Action</h2>
            <p className="section-subtitle">
              Watch our professional team deliver spotless results across Vadodara.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-100 max-w-5xl mx-auto">
            <video
              src="/images/Promo-Final-1.mp4"
              autoPlay
              loop
              controls
              playsInline
              muted
              poster="/images/IMG_5255-768x432-1.jpg"
              className="w-full max-h-[560px] object-cover"
              controlsList="nodownload"
            />
          </div>
        </div>
      </section>

      {/* 5. Services Section */}
      <section className="py-[80px] bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="section-badge">
                <Sun className="w-4 h-4 text-primary" /> Services
              </span>
              <h2 className="section-title mb-2">Our Services</h2>
              <p className="text-gray-500 text-lg max-w-xl">
                Professional solar panel cleaning solutions for every need residential, commercial, or industrial.
              </p>
            </div>
            <Link className="btn-primary flex-shrink-0" href="/our-services">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Link className="card group relative overflow-hidden flex flex-col hover:-translate-y-1" href="/our-services">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <HomeIcon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-xl leading-tight group-hover:text-primary transition-colors">
                Residential Solar Panel Cleaning
              </h3>
              <p className="text-gray-500 leading-relaxed mb-6 flex-1">
                Our expert team provides complete solar panel cleaning for homes across Vadodara, ensuring spotless surfaces that maximize sunlight absorption and boost your energy efficiency.
              </p>
              <span className="flex items-center gap-1 text-primary font-semibold">
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Card 2 */}
            <Link className="card group relative overflow-hidden flex flex-col hover:-translate-y-1" href="/our-services">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <Building2 className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-xl leading-tight group-hover:text-primary transition-colors">
                Commercial &amp; Industrial Cleaning
              </h3>
              <p className="text-gray-500 leading-relaxed mb-6 flex-1">
                From small offices to large factories, SunTech delivers professional cleaning for solar of every scale safe, fast, and highly effective for peak performance.
              </p>
              <span className="flex items-center gap-1 text-primary font-semibold">
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Card 3 */}
            <Link className="card group relative overflow-hidden flex flex-col hover:-translate-y-1" href="/our-services">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <Wrench className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-xl leading-tight group-hover:text-primary transition-colors">
                Maintenance &amp; Performance Checkups
              </h3>
              <p className="text-gray-500 leading-relaxed mb-6 flex-1">
                Regular maintenance extends your panel life and efficiency. Our team inspects, cleans, and monitors system health to prevent energy losses and ensure consistent output.
              </p>
              <span className="flex items-center gap-1 text-primary font-semibold">
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5.5 Store Showcase Section */}
      <section className="py-16 bg-gradient-to-br from-primary-dark via-primary to-blue-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-slate-900 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                🛒 SunTech Online Store
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                Professional Solar Cleaning Equipment Delivered To Your Doorstep
              </h2>
              <p className="text-blue-100 text-base mb-6 leading-relaxed">
                Order aerospace-grade telescopic poles, dual-jet soft nylon brushes, drainage clips, and pH-neutral deionized cleaning solutions. Fast dispatch across Gujarat with <strong className="text-yellow-300">Pre-Paid Online</strong>, <strong className="text-yellow-300">Part-Payment (30% Deposit)</strong>, or <strong className="text-yellow-300">Cash on Delivery</strong>!
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/store"
                  className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-7 py-3.5 rounded-2xl transition-all shadow-lg flex items-center gap-2 hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-5 h-5 text-slate-900" />
                  <span>Shop Store Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/store/track-order"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-2xl transition-colors flex items-center gap-2"
                >
                  <Truck className="w-4 h-4 text-blue-300" />
                  <span>Track Your Order</span>
                </Link>
              </div>
            </div>

            {/* Quick 4-feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                <span className="text-2xl mb-2 block">🧰</span>
                <h4 className="font-bold text-white text-sm">6M &amp; 9M Telescopic Kits</h4>
                <p className="text-xs text-blue-200 mt-1">Water-fed aluminum poles for safe ground operation.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                <span className="text-2xl mb-2 block">🧹</span>
                <h4 className="font-bold text-white text-sm">Dual-Jet Soft Brushes</h4>
                <p className="text-xs text-blue-200 mt-1">Split-filament nylon designed for solar anti-reflective glass.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                <span className="text-2xl mb-2 block">🧪</span>
                <h4 className="font-bold text-white text-sm">Spot-Free Rinse Formula</h4>
                <p className="text-xs text-blue-200 mt-1">Deionized concentrate that repels airborne dust.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                <span className="text-2xl mb-2 block">⚡</span>
                <h4 className="font-bold text-white text-sm">Part-Payment Available</h4>
                <p className="text-xs text-blue-200 mt-1">Pay advance deposit today &amp; settle balance on delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="section-badge justify-center">
              <Sun className="w-4 h-4 text-primary" /> FAQ
            </span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know about solar panel cleaning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-100 flex flex-col hover:shadow-xl transition-shadow">
              <div className="relative aspect-video w-full">
                <img
                  alt="Why is it important to clean solar panels?"
                  className="w-full h-full object-cover"
                  src="/images/IMG_5232-1024x768-1.jpg"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 mb-4 text-lg leading-snug">
                  Why is it important to clean solar panels?
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  For maximum exploitation of the sun-rays, properly cleaned solar panels will expose the power cells to the clear sun view to achieve high-energy output and efficiency. Regular cleaning of the panels is one of the critical requirements of a solar equipment warranty.
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-100 flex flex-col hover:shadow-xl transition-shadow">
              <div className="relative aspect-video w-full">
                <img
                  alt="Benefits of Cleaning Solar Panels?"
                  className="w-full h-full object-cover"
                  src="/images/IMG_5255-1536x864-1.jpg"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 mb-4 text-lg leading-snug">
                  Benefits of Cleaning Solar Panels?
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Cleaning solar panels is key to their long-term performance. Solar panels should be cleaned as much as possible to avoid degradation, which can cause reduced energy production and increased maintenance costs.
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-100 flex flex-col hover:shadow-xl transition-shadow">
              <div className="relative aspect-video w-full">
                <img
                  alt="Will cleaning actually improve performance?"
                  className="w-full h-full object-cover"
                  src="/images/IMG_5243-2048x1031-1-768x387.jpg"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 mb-4 text-lg leading-snug">
                  Will cleaning actually improve performance?
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Yes, dirt and debris can reduce efficiency. While light dust may only cause a minimal reduction, significant buildup like bird droppings or heavy grime can decrease energy output by up to 20% to 30%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Excellence in Solar Panel Cleaning (Dark CTA Section) */}
      <section className="py-32 bg-primary-dark overflow-hidden relative">
        <div className="absolute inset-0">
          <img
            alt="SunTech Work"
            className="w-full h-full object-cover opacity-20"
            src="/images/IMG_5255-2048x1152-1.jpg"
          />
        </div>
        <div className="relative z-10 container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight">
                Excellence in Solar Panel Cleaning
              </h2>
              <div className="w-20 h-1.5 bg-yellow-400 rounded mb-7" />
              <p className="text-blue-200 leading-relaxed mb-10 text-lg">
                Suntech is Vadodara&apos;s trusted leader in professional solar cleaning and wind maintenance. Our skilled team ensures your panels and systems perform at their best, with Professional care and reliable support. Effortlessly book and manage your service appointments through the Suntech app—clean energy made simple.
              </p>
              <div className="flex flex-wrap gap-5 items-center">
                <Link
                  href="/contact-us"
                  className="flex items-center gap-2 bg-white text-primary px-7 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-colors text-base"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact Us</span>
                </Link>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Call us Now</p>
                    <a
                      href="tel:+919998546315"
                      className="font-bold hover:text-yellow-400 transition-colors text-lg"
                    >
                      +91 9998546315
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/20 flex flex-col items-center text-center gap-4 hover:bg-white/15 transition-colors">
                <Shield className="w-8 h-8 text-yellow-400" />
                <p className="text-white font-semibold text-base">Safe &amp; Certified</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/20 flex flex-col items-center text-center gap-4 hover:bg-white/15 transition-colors">
                <Leaf className="w-8 h-8 text-yellow-400" />
                <p className="text-white font-semibold text-base">Professional</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/20 flex flex-col items-center text-center gap-4 hover:bg-white/15 transition-colors">
                <Award className="w-8 h-8 text-yellow-400" />
                <p className="text-white font-semibold text-base">Award-Winning</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/20 flex flex-col items-center text-center gap-4 hover:bg-white/15 transition-colors">
                <Zap className="w-8 h-8 text-yellow-400" />
                <p className="text-white font-semibold text-base">Max Efficiency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Our Projects */}
      <section className="py-[60px] bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="section-badge justify-center">
              <Sun className="w-4 h-4 text-primary" /> Projects
            </span>
            <h2 className="section-title">Our Projects</h2>
            <p className="section-subtitle">Maintaining clean, efficient solar for Vadodara&apos;s trusted names.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "DND Mega Clean",
                src: "/images/IMG_5255-2048x1152-1.jpg",
                category: "Commercial Project",
              },
              {
                title: "PureAir Solar",
                src: "/images/IMG_5247-2048x1152-1.jpg",
                category: "Rooftop Installation",
              },
              {
                title: "GP Solar Work",
                src: "/images/IMG_5243-2048x1031-1.jpg",
                category: "Industrial Plant",
              },
              {
                title: "Sky Energy Clean",
                src: "/images/IMG_5232-1536x1152-1.jpg",
                category: "Residential Array",
              },
            ].map((proj) => (
              <Link
                key={proj.title}
                href="/gallery"
                className="group relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] block"
              >
                <img
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={proj.src}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/30 to-transparent flex flex-col justify-end p-6">
                  <span className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    {proj.category}
                  </span>
                  <h3 className="text-white font-bold text-xl">{proj.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link className="btn-primary" href="/gallery">
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Our Achievement */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="section-badge justify-center">
              <Sun className="w-4 h-4 text-primary" /> Milestones
            </span>
            <h2 className="section-title">Our Achievement</h2>
            <p className="section-subtitle">Delivering excellence in solar care throughout Vadodara and Gujarat.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-3xl bg-blue-50/60 border border-blue-100 flex flex-col items-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-6 shadow-md">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">11+ Years of Leadership</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pioneering professional solar panel cleaning and specialized maintenance services in Vadodara since 2013.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-yellow-50/60 border border-yellow-100 flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-primary-dark mb-6 shadow-md">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">25-30% Efficiency Gain</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our deionized cleaning and professional methods consistently restore maximum generation output on rooftop arrays.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-green-50/60 border border-green-100 flex flex-col items-center">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-md">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">100% Reliable AMC</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Scheduled hassle-free annual maintenance contracts for homes, housing societies, and corporate complexes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Testimonials Section */}
      <section className="py-[60px] bg-gradient-to-br from-primary-dark to-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="section-badge justify-center text-white">
              <Sun className="w-4 h-4 text-yellow-400" /> Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">What Our Customers Say</h2>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* 11. Download the SunTech App */}
      <section className="py-[60px] bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-dark to-primary rounded-3xl p-8 sm:p-12 md:p-20 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
              <div className="text-white">
                <span className="inline-flex items-center gap-2 text-yellow-300 font-semibold text-sm uppercase tracking-wider mb-5">
                  <Sun className="w-3.5 h-3.5" /> Mobile App
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
                  Download the SunTech App
                </h3>
                <p className="text-blue-200 mb-10 text-base sm:text-lg leading-relaxed">
                  Book solar panel cleaning in minutes. Track your service, manage appointments, and get real-time updates all from your phone.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://apps.apple.com/app/suntech-clean-solar-panel/id6504866923"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-2xl hover:bg-gray-900 transition-all hover:scale-105 shadow-lg"
                  >
                    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-400">Download on the</p>
                      <p className="font-bold text-base sm:text-lg">App Store</p>
                    </div>
                  </a>

                  <a
                    href="https://play.google.com/store/apps/details?id=app.suntech.customer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-2xl hover:bg-gray-900 transition-all hover:scale-105 shadow-lg"
                  >
                    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                      <path d="M3.18 23.77c.39.22.82.23 1.22.03l10.7-5.98-2.33-2.34L3.18 23.77zM.5 2.06C.19 2.53 0 3.22 0 4.12v15.76c0 .9.19 1.59.5 2.06l.11.1 8.84-8.84v-.2L.61 2.06l-.11.1zm17.48 9.35l-2.73-1.53-2.61 2.62 2.61 2.61 2.74-1.53c.78-.44.78-1.73-.01-2.17zM4.4 .2L15.1 6.18l-2.33 2.34L3.93.23c.16-.04.32-.05.47-.03z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-400">GET IT ON</p>
                      <p className="font-bold text-base sm:text-lg">Google Play</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="flex justify-center md:justify-end">
                <img
                  alt="SunTech Solar App"
                  className="max-h-[380px] w-auto object-contain filter drop-shadow-2xl"
                  src="/images/solar-house-min.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
