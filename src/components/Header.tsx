"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Our Services", href: "/our-services" },
    { label: "Gallery & Videos", href: "/gallery" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm py-3 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center" href="/">
            <img
              alt="SunTech Logo"
              width={200}
              height={60}
              className="h-12 w-auto object-contain logo-filter"
              src="/images/suntech_white_logo.png"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-blue-50"
                    : "text-gray-700 hover:text-primary hover:bg-blue-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Store Internal Link */}
            <Link
              href="/store"
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-1.5 ml-1 ${
                pathname.startsWith("/store")
                  ? "bg-yellow-500 text-slate-900 shadow-sm"
                  : "bg-yellow-400 text-primary-dark hover:bg-yellow-300"
              }`}
            >
              <span>🛒</span> Store
            </Link>

            {/* Admin Portal link */}
            <Link
              href="/admin"
              className={`px-3 py-2 rounded-lg font-semibold text-xs flex items-center gap-1 transition-colors ${
                pathname.startsWith("/admin")
                  ? "text-white bg-slate-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </nav>

          {/* Desktop Right CTAs: Cart Drawer trigger + Get Started */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl border border-gray-200 hover:border-primary/40 hover:bg-blue-50/50 text-gray-700 hover:text-primary transition-all flex items-center gap-2"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 text-primary" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors shadow-sm"
              href="/get-started"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Actions: Store, Cart, Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/store"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold text-xs bg-yellow-400 text-primary-dark hover:bg-yellow-300 transition-colors"
            >
              <span>🛒</span> Store
            </Link>

            <button
              onClick={openCart}
              className="relative p-2 rounded-lg border border-gray-200 text-gray-700 hover:text-primary"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 text-primary" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors relative z-50"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white/98 backdrop-blur-md px-6 py-6 mt-3 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl font-semibold text-base transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-blue-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/store"
              className="px-4 py-3 rounded-xl font-bold text-base bg-yellow-400 text-primary-dark flex items-center justify-between mt-2"
            >
              <span>🛒 Visit SunTech Store</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/admin"
              className="px-4 py-3 rounded-xl font-semibold text-sm bg-slate-100 text-slate-800 flex items-center justify-between mt-1"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-600" />
                Admin Portal &amp; Bookings
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/get-started"
              className="bg-primary text-white text-center py-3.5 rounded-xl font-bold text-base mt-2 flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
