import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Sun, Mail, Phone, MapPin, MessageCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Get Started | Book Your Solar Panel Cleaning | SunTech Solar",
  description:
    "Download the SunTech app or reach out directly to book your solar panel cleaning in Vadodara. Email, call, WhatsApp, or find us on the map.",
};

export default function GetStartedPage() {
  return (
    <div>
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Get Started</h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-blue-200">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-yellow-400 font-semibold">Get Started</span>
          </nav>
        </div>
      </section>

      {/* 2. Download the App Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-dark to-primary rounded-3xl p-8 sm:p-12 md:p-20 shadow-2xl mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
              <div className="text-white">
                <span className="inline-flex items-center gap-2 text-yellow-300 font-semibold text-sm uppercase tracking-wider mb-5">
                  <Sun className="w-3.5 h-3.5" /> Mobile App
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
                  Download the SunTech App
                </h2>
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
                      <p className="text-xs text-gray-400">Get it on</p>
                      <p className="font-bold text-base sm:text-lg">Google Play</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="flex justify-center md:justify-end">
                <img
                  alt="SunTech Solar App"
                  className="max-h-[360px] w-auto object-contain filter drop-shadow-2xl"
                  src="/images/solar-house-min.png"
                />
              </div>
            </div>
          </div>

          {/* 3. We're Here to Help */}
          <div className="text-center mb-16">
            <span className="section-badge justify-center">
              <Sun className="w-4 h-4 text-primary" /> Reach Us
            </span>
            <h2 className="section-title">We&apos;re Here to Help</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Prefer to talk? Drop us a message, call, or WhatsApp us and we&apos;ll get back to you fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email Card */}
            <div className="card text-center flex flex-col items-center border border-gray-100">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                For any inquiries, service bookings, or partnership details, drop us an email and our support team will reach out within 24 hours.
              </p>
              <a
                href="mailto:info@suntechapp.com"
                className="text-primary font-bold hover:underline"
              >
                info@suntechapp.com
              </a>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="card text-center flex flex-col items-center border border-gray-100">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Call Now</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                Keep your solar panels shining bright with SunTech&apos;s professional cleaning service. Book your slot easily using our app or reach us directly!
              </p>
              <div className="flex flex-col gap-2 items-center">
                <a
                  href="tel:+919998546315"
                  className="text-primary font-bold hover:underline text-lg"
                >
                  +91 9998546315
                </a>
                <a
                  href="https://wa.me/919998546315"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 hover:text-green-700 bg-green-50 px-3 py-1.5 rounded-full"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="card text-center flex flex-col items-center border border-gray-100">
              <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Location</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                Visit us or drop by our office we&apos;re happy to meet you in person and discuss your solar maintenance needs.
              </p>
              <span className="text-gray-800 font-semibold text-sm">
                41, Krupal society, near Deep Chambers, Manjalpur, Vadodara, Gujarat 390011
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
