import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Sun,
  Zap,
  Check,
  ArrowRight,
  Shield,
  Award,
  Users,
  Clock,
  Sparkles,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import StatsCounter from "@/components/StatsCounter";
import TestimonialSlider from "@/components/TestimonialSlider";

export const metadata: Metadata = {
  title: "About Us | SunTech Solar",
  description:
    "Learn about SunTech - Vadodara's trusted solar panel cleaning company with 11+ years of experience.",
};

export default function AboutUsPage() {
  return (
    <div>
      {/* 1. Page Header Banner */}
      <section className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Us</h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-blue-200">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-yellow-400 font-semibold">About Us</span>
          </nav>
        </div>
      </section>

      {/* 2. Our Commitment to Clean Energy */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Image with Floating Experience Badge */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  alt="SunTech Solar Team Vadodara"
                  className="w-full h-full object-cover"
                  src="/images/IMG_5242-1536x858-1.jpg"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 bg-primary text-white p-6 rounded-2xl shadow-xl flex items-center gap-4">
                <div className="text-4xl font-extrabold text-yellow-400">11+</div>
                <div className="text-sm font-semibold leading-tight">
                  Years
                  <br />
                  Experience
                </div>
              </div>
            </div>

            {/* Right: Narrative */}
            <div>
              <span className="section-badge">
                <Sun className="w-4 h-4 text-primary" /> ABOUT US
              </span>
              <h2 className="section-title">Our Commitment to Clean Energy</h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                SunTech is Vadodara&apos;s trusted solar panel cleaning company, committed to delivering cleaner energy and higher panel efficiency. Our trained professionals use Professional methods to remove dust, debris, and pollutants from your panels. With years of experience, we ensure your solar system performs at its best while protecting your long-term investment.
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "Solar Panel Cleaning Experts",
                  "Professional Methods",
                  "Sustainable Vision",
                  "Community Focused",
                  "Driven by Results",
                  "Reliable Support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="font-semibold text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* 2 Feature Boxes */}
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

              <div className="p-5 rounded-2xl bg-yellow-50 border border-yellow-200 flex items-center gap-4">
                <Award className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Award-Winning Service</h4>
                  <p className="text-gray-600 text-xs">Advanced cleaning technology with sustainable practices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose SunTech? */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="section-badge justify-center">
              <Sun className="w-4 h-4 text-primary" /> WHY US
            </span>
            <h2 className="section-title">Why Choose SunTech?</h2>
            <p className="section-subtitle">
              Vadodara&apos;s leading solar cleaning team delivering unmatched efficiency and customer care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Solar Panel Cleaning Experts",
                desc: "Over 11 years of hands-on expertise specializing strictly in solar care and high-efficiency output.",
                icon: <Sun className="w-6 h-6 text-primary" />,
              },
              {
                title: "Professional Methods",
                desc: "We use non-abrasive deionized water wash technology that preserves delicate anti-reflective coatings.",
                icon: <Sparkles className="w-6 h-6 text-primary" />,
              },
              {
                title: "Sustainable Vision",
                desc: "Promoting green energy across Gujarat through zero-chemical cleaning and water conservation techniques.",
                icon: <Shield className="w-6 h-6 text-primary" />,
              },
              {
                title: "Community Focused",
                desc: "Local Vadodara technicians providing prompt, trustworthy, and neighborly service with every visit.",
                icon: <Users className="w-6 h-6 text-primary" />,
              },
              {
                title: "Driven by Results",
                desc: "Our before-and-after performance metrics ensure you receive 20-30% more power from your rooftop array.",
                icon: <BarChart3 className="w-6 h-6 text-primary" />,
              },
              {
                title: "Reliable Support",
                desc: "Dedicated support helpline, digital app booking, and customized Annual Maintenance Contracts (AMC).",
                icon: <Clock className="w-6 h-6 text-primary" />,
              },
            ].map((item) => (
              <div key={item.title} className="card hover:-translate-y-1 transition-transform">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-xl">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Animated Stats Counter */}
      <StatsCounter />

      {/* 5. Our Achievement Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-badge">
                <Sun className="w-4 h-4 text-primary" /> Our Achievement
              </span>
              <h2 className="section-title">Our Achievement</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                Over the years, SunTech has built a strong reputation for reliability and results. From small residential panels to large commercial arrays, we have consistently delivered spotless professional solar manual cleaning service and satisfied customers across Vadodara.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="font-bold text-gray-900">7,554+</span>
                  <span className="text-gray-500 text-sm">Panels Cleaned</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="font-bold text-gray-900">4,034+</span>
                  <span className="text-gray-500 text-sm">kW&apos;s Serviced</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="font-bold text-gray-900">1,912+</span>
                  <span className="text-gray-500 text-sm">Happy Customers</span>
                </div>
              </div>

              <Link className="btn-primary" href="/get-started">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                alt="SunTech Solar Cleaning Achievement"
                className="w-full h-full object-cover"
                src="/images/IMG_5247-scaled.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary-dark to-primary">
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
    </div>
  );
}
