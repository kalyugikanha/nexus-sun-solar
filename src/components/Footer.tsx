import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-16">
      <div className="container-custom pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand Info */}
          <div>
            <Link className="inline-block mb-6" href="/">
              <img
                alt="SunTech Logo"
                width={200}
                height={60}
                className="h-12 w-auto object-contain brightness-0 invert"
                src="/images/suntech_white_logo.png"
              />
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Vadodara&apos;s leading solar panel cleaning service provider. Trusted by thousands for efficient and safe solar maintenance.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/people/SunTechapp/61563399513716/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-blue-200 hover:text-white hover:bg-blue-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/suntech.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-blue-200 hover:text-white hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@suntechapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-blue-200 hover:text-white hover:bg-red-600 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/93205241/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-blue-200 hover:text-white hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "SunTech Store", href: "/store" },
                { label: "Track Your Order", href: "/store/track-order" },
                { label: "About Us", href: "/about-us" },
                { label: "Our Services", href: "/our-services" },
                { label: "Gallery & Videos", href: "/gallery" },
                { label: "Contact Us", href: "/contact-us" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-blue-200 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-5">Our Services</h4>
            <ul className="space-y-3">
              {[
                { name: "Residential Solar Cleaning", href: "/our-services" },
                { name: "Commercial & Industrial Cleaning", href: "/our-services" },
                { name: "Maintenance & Checkups", href: "/our-services" },
                { name: "Solar AMC Services", href: "/our-services" },
                { name: "Solar Maintenance Products", href: "/store" },
                { name: "Performance Monitoring", href: "/our-services" },
              ].map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-blue-200 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="text-white font-bold text-lg mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                  <p className="text-blue-300 text-xs mb-0.5">Call Us</p>
                  <a
                    href="tel:+919998546315"
                    className="text-white font-semibold hover:text-blue-200 transition-colors"
                  >
                    +91 9998546315
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                  <p className="text-blue-300 text-xs mb-0.5">Email Us</p>
                  <a
                    href="mailto:info@suntechapp.com"
                    className="text-white font-semibold hover:text-blue-200 transition-colors text-sm"
                  >
                    info@suntechapp.com
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                  <p className="text-blue-300 text-xs mb-0.5">Location</p>
                  <p className="text-white text-sm leading-relaxed">
                    41, Krupal society, near Deep Chambers, Manjalpur, Vadodara, Gujarat 390011
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-blue-200 text-sm">
            © 2026 SunTech. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link className="text-blue-200 hover:text-white text-sm transition-colors" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="text-blue-200 hover:text-white text-sm transition-colors" href="/terms-conditions">
              Terms &amp; Conditions
            </Link>
            <Link className="text-blue-200 hover:text-white text-sm transition-colors" href="/refund-cancellation-policy">
              Refund Policy
            </Link>
            <Link className="text-yellow-400 hover:text-yellow-300 font-semibold text-sm transition-colors" href="/admin">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
