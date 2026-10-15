"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface SlideData {
  src: string;
  alt: string;
  badge: string;
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix: string;
  description: string;
  primaryLabel: string;
  primaryAction: "appointment" | "store";
  secondaryLabel: string;
  secondaryHref: string;
}

const slides: SlideData[] = [
  {
    src: "/images/IMG_5255-768x432-1.jpg",
    alt: "Solar Panel Cleaning Vadodara",
    badge: "☀️ Vadodara's No.1 Solar Cleaning Company",
    headlinePrefix: "Vadodara No.1 ",
    headlineHighlight: "Solar Cleaning",
    headlineSuffix: " Company.",
    description:
      "We have 11 years of experience in the Solar Industry. Professional panel cleaning for maximum efficiency.",
    primaryLabel: "Make an Appointment",
    primaryAction: "appointment",
    secondaryLabel: "Explore Services",
    secondaryHref: "/our-services",
  },
  {
    src: "/images/IMG_5247-scaled.jpg",
    alt: "Professional Solar Cleaning",
    badge: "🛒 Premium Solar Products & Accessories",
    headlinePrefix: "High-Quality ",
    headlineHighlight: "Solar Products",
    headlineSuffix: " for You.",
    description:
      "Shop top-brand solar panels, inverters, and accessories - everything you need to power your home or business.",
    primaryLabel: "Shop Now",
    primaryAction: "store",
    secondaryLabel: "View Products",
    secondaryHref: "/store",
  },
  {
    src: "/images/IMG_5242-1536x858-1.jpg",
    alt: "SunTech Solar Services",
    badge: "☀️ Vadodara's No.1 Solar Cleaning Company",
    headlinePrefix: "Vadodara No.1 ",
    headlineHighlight: "Solar Cleaning",
    headlineSuffix: " Company.",
    description:
      "We have 11 years of experience in the Solar Industry. Professional panel cleaning for maximum efficiency.",
    primaryLabel: "Make an Appointment",
    primaryAction: "appointment",
    secondaryLabel: "Explore Services",
    secondaryHref: "/our-services",
  },
  {
    src: "/images/WhatsApp-Image-2023-05-04-at-11.35.54-1.jpeg",
    alt: "Solar Panel Team",
    badge: "☀️ Vadodara's No.1 Solar Cleaning Company",
    headlinePrefix: "Vadodara No.1 ",
    headlineHighlight: "Solar Cleaning",
    headlineSuffix: " Company.",
    description:
      "We have 11 years of experience in the Solar Industry. Professional panel cleaning for maximum efficiency.",
    primaryLabel: "Make an Appointment",
    primaryAction: "appointment",
    secondaryLabel: "Explore Services",
    secondaryHref: "/our-services",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handlePrimaryClick = (action: "appointment" | "store") => {
    if (action === "store") {
      router.push("/store");
      return;
    }
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
      window.location.href = "https://apps.apple.com/app/suntech-clean-solar-panel/id6504866923";
    } else if (userAgent.includes("android")) {
      window.location.href = "https://play.google.com/store/apps/details?id=app.suntech.customer";
    } else {
      router.push("/get-started");
    }
  };

  const current = slides[currentSlide];

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            alt={slide.alt}
            className="w-full h-full object-cover object-center"
            src={slide.src}
          />
        </div>
      ))}

      {/* Gradients */}
      <div className="absolute inset-0 hero-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-3xl mx-auto text-center">
            <div className="transition-all duration-500">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2 rounded-full mb-6 border border-white/30">
                {current.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                {current.headlinePrefix}
                <span className="text-yellow-400">{current.headlineHighlight}</span>
                {current.headlineSuffix}
              </h1>
              <p className="text-white/90 text-lg md:text-2xl mb-10 leading-relaxed max-w-2xl mx-auto">
                {current.description}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => handlePrimaryClick(current.primaryAction)}
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 shadow-xl"
                >
                  <span>{current.primaryLabel}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                {current.secondaryHref.startsWith("http") ? (
                  <a
                    href={current.secondaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/40 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors inline-flex items-center justify-center"
                  >
                    {current.secondaryLabel}
                  </a>
                ) : (
                  <Link
                    href={current.secondaryHref}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/40 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors inline-flex items-center justify-center"
                  >
                    {current.secondaryLabel}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next Navigation Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Pagination Dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? "bg-white w-6" : "bg-white/50 w-2"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Bottom Frosted Glass Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="container-custom py-4 sm:py-6">
            <div className="grid grid-cols-3 divide-x divide-white/20">
              <div className="text-center px-2 sm:px-6">
                <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">1,912+</p>
                <p className="text-white/80 text-xs sm:text-sm mt-0.5">Happy Customers</p>
              </div>
              <div className="text-center px-2 sm:px-6">
                <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">4,034+</p>
                <p className="text-white/80 text-xs sm:text-sm mt-0.5">kW&apos;s Cleaned</p>
              </div>
              <div className="text-center px-2 sm:px-6">
                <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">7,554+</p>
                <p className="text-white/80 text-xs sm:text-sm mt-0.5">Solar Panels Cleaned</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
