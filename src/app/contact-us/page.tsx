"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sun,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    solarSize: "Residential (1-5 kW)",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "What services does SunTech provide in Vadodara?",
      a: "SunTech specializes in professional solar panel cleaning services for residential, commercial and industrial setups in Vadodara. Our trained experts use Professional cleaning methods to enhance energy efficiency and protect your panels from long-term damage.",
    },
    {
      q: "How often should I clean my solar panels?",
      a: "It's recommended to clean your solar panels monthly. Dust, dirt, and pollution can block sunlight and reduce your energy generation by up to 20% to 30%. Regular cleaning by SunTech professionals ensures your panels work at maximum capacity throughout the year.",
    },
    {
      q: "Is the cleaning process safe for solar panels?",
      a: "Yes, our cleaning process is completely safe for solar panels. We use Professional, non-abrasive cleaning agents and techniques specifically designed for solar panel surfaces, ensuring no damage while achieving maximum cleanliness.",
    },
    {
      q: "Do you offer AMC (Annual Maintenance Contract)?",
      a: "Yes, we offer Annual Maintenance Contracts at discounted rates. AMC customers get priority scheduling, regular checkups, and comprehensive maintenance reports.",
    },
    {
      q: "How can I book a service?",
      a: "You can book a service through our mobile app (available on iOS and Android), by calling +91 9998546315, or by emailing info@suntechapp.com.",
    },
    {
      q: "What areas do you serve?",
      a: "We primarily serve Vadodara and surrounding areas in Gujarat. Contact us to check if we cover your location.",
    },
  ];

  return (
    <div>
      {/* 1. Page Header */}
      <section className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-blue-200">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-yellow-400 font-semibold">Contact Us</span>
          </nav>
        </div>
      </section>

      {/* 2. Contact Cards */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Email Card */}
            <div className="card text-center flex flex-col items-center border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                For any inquiries, service bookings, or partnership details, drop us an email and our support team will reach out within 24 hours.
              </p>
              <a
                href="mailto:info@suntechapp.com"
                className="text-primary font-bold hover:underline text-base"
              >
                info@suntechapp.com
              </a>
            </div>

            {/* Phone Card */}
            <div className="card text-center flex flex-col items-center border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Call Now</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                Keep your solar panels shining bright with SunTech&apos;s professional cleaning service. Book your slot easily using our app or call us directly!
              </p>
              <a
                href="tel:+919998546315"
                className="text-primary font-bold hover:underline text-base"
              >
                +91 9998546315
              </a>
            </div>

            {/* Location Card */}
            <div className="card text-center flex flex-col items-center border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Location</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                41, Krupal society, near Deep Chambers, Manjalpur
                <br />
                Vadodara, Gujarat 390011
              </p>
              <span className="text-gray-700 font-semibold text-sm">
                Vadodara, Gujarat
              </span>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-gray-50 rounded-3xl p-8 sm:p-12 md:p-16 border border-gray-200 max-w-3xl mx-auto shadow-sm">
            <div className="text-center mb-10">
              <span className="section-badge justify-center">
                <Sun className="w-4 h-4 text-primary" /> Send A Message
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Book a Free Consultation
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Fill out the form below and our Vadodara solar cleaning experts will contact you.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-green-50 rounded-2xl text-center border border-green-200">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-green-900 mb-2">Thank you!</h4>
                <p className="text-green-700 text-sm">
                  Your message has been received. Our team will get in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 99985 46315"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Solar System Size
                    </label>
                    <select
                      value={formData.solarSize}
                      onChange={(e) => setFormData({ ...formData, solarSize: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-white"
                    >
                      <option>Residential (1-5 kW)</option>
                      <option>Residential (6-15 kW)</option>
                      <option>Commercial Complex (15-50 kW)</option>
                      <option>Industrial Plant (50+ kW)</option>
                      <option>Other / Not Sure</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your panels, location in Vadodara, or specific requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-badge justify-center">
              <Sun className="w-4 h-4 text-primary" /> FAQ
            </span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Common questions about our professional solar panel cleaning in Vadodara.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-gray-900 text-base hover:text-primary transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      openFaq === index ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
