import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Sun,
  Home as HomeIcon,
  Building2,
  Wrench,
  ShoppingBag,
  BarChart3,
  Calendar,
  ArrowRight,
  Phone,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | SunTech Solar",
  description:
    "Professional solar panel cleaning services in Vadodara residential, commercial, and industrial.",
};

export default function OurServicesPage() {
  const services = [
    {
      title: "Residential Solar Panel Cleaning",
      desc: "Our expert team provides complete solar panel cleaning for homes across Vadodara, ensuring spotless surfaces that maximize sunlight absorption and boost your energy efficiency.",
      icon: <HomeIcon className="w-7 h-7 text-primary" />,
      cta: "Book This Service",
      href: "/get-started",
    },
    {
      title: "Commercial & Industrial Cleaning",
      desc: "From small offices to large factories, SunTech delivers professional cleaning for solar of every scale safe, fast, and highly effective for peak performance.",
      icon: <Building2 className="w-7 h-7 text-primary" />,
      cta: "Book This Service",
      href: "/get-started",
    },
    {
      title: "Maintenance & Performance Checkups",
      desc: "Regular maintenance extends your panel life and efficiency. Our team inspects, cleans, and monitors system health to prevent energy losses and ensure consistent output.",
      icon: <Wrench className="w-7 h-7 text-primary" />,
      cta: "Book This Service",
      href: "/get-started",
    },
    {
      title: "Solar Maintenance Products",
      desc: "Keep your panels spotless between professional cleanings with our range of solar maintenance essentials panel clips, soft-bristle cleaning brushes, and specially formulated solar cleaning liquid.",
      icon: <ShoppingBag className="w-7 h-7 text-primary" />,
      cta: "Explore Store",
      href: "/store",
      external: false,
    },
    {
      title: "Solar Performance Monitoring",
      desc: "Our digital monitoring service tracks your panel performance over time, identifying dips in energy production so you know exactly when cleaning is needed.",
      icon: <BarChart3 className="w-7 h-7 text-primary" />,
      cta: "Know More",
      href: "/get-started",
    },
    {
      title: "AMC (Annual Maintenance Contract)",
      desc: "Sign up for our Annual Maintenance Contract and enjoy hassle-free, scheduled cleanings throughout the year at discounted rates with priority service.",
      icon: <Calendar className="w-7 h-7 text-primary" />,
      cta: "Book This Service",
      href: "/get-started",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Book Online or Call",
      desc: "Schedule a service through our SunTech app or website.",
    },
    {
      step: "02",
      title: "Site Assessment",
      desc: "Our team visits your site and assesses your solar installation.",
    },
    {
      step: "03",
      title: "Professional Cleaning",
      desc: "We use professional cleaning methods to clean every panel thoroughly.",
    },
    {
      step: "04",
      title: "Performance Report",
      desc: "After cleaning, we share a performance report and recommendations.",
    },
  ];

  return (
    <div>
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Services</h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-blue-200">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-yellow-400 font-semibold">Our Services</span>
          </nav>
        </div>
      </section>

      {/* 2. Complete Solar Care Solutions */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="section-badge justify-center">
              <Sun className="w-4 h-4 text-primary" /> What We Offer
            </span>
            <h2 className="section-title">Complete Solar Care Solutions</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              From residential rooftops to industrial solar farms, SunTech covers every need with professional expertise and Professional practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="card flex flex-col justify-between group hover:-translate-y-1 transition-all border border-gray-100"
              >
                <div>
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    {svc.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-xl group-hover:text-primary transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                {svc.external ? (
                  <a
                    href={svc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline"
                  >
                    <span>{svc.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    href={svc.href}
                    className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline"
                  >
                    <span>{svc.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Top Solar Panel Cleaning Service in Vadodara Banner */}
      <section className="py-16 bg-blue-50">
        <div className="container-custom">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-blue-100 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="section-badge mb-2">
                <Sun className="w-4 h-4 text-primary" /> Vadodara No. 1
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
                Top Solar Panel Cleaning Service in Vadodara
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Specialized cleaning for all rooftop and ground-mount solar panel systems. We serve homes, commercial complexes, and industrial installations across Vadodara and nearby districts.
              </p>
            </div>
            <Link className="btn-primary flex-shrink-0" href="/contact-us">
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Our Process (How It Works) */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="section-badge justify-center">
              <Sun className="w-4 h-4 text-primary" /> Our Process
            </span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Simple 4-step workflow to restore your system to peak generation efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((st) => (
              <div
                key={st.step}
                className="relative bg-gray-50 rounded-3xl p-8 flex flex-col justify-between hover:bg-blue-50/50 transition-colors"
              >
                <div>
                  <span className="text-4xl font-extrabold text-primary/30 mb-4 block">
                    {st.step}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{st.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Banner */}
      <section className="py-20 bg-primary-dark text-white text-center">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Get Your Panels Cleaned?
          </h2>
          <p className="text-blue-200 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Contact us today for a free quote and experience the SunTech difference.
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link
              href="/contact-us"
              className="bg-yellow-400 text-primary-dark px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition-colors flex items-center gap-2 shadow-lg"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+919998546315"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call +91 9998546315</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
