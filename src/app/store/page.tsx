"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Star,
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  PhoneCall,
  X,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Plus,
  Minus
} from "lucide-react";
import { Product, ProductCategory } from "@/types/store";
import { getStoredProducts, getStoredSettings } from "@/lib/storeStorage";
import { useCart } from "@/context/CartContext";

const CATEGORIES: { id: ProductCategory; label: string; icon: string }[] = [
  { id: "all", label: "All Equipment", icon: "☀️" },
  { id: "cleaning-kits", label: "Telescopic Kits", icon: "🧰" },
  { id: "brushes", label: "Solar Brushes", icon: "🧹" },
  { id: "cleaning-liquids", label: "Cleaning Solutions", icon: "🧪" },
  { id: "drain-clips", label: "Drainage Clips", icon: "📎" },
  { id: "accessories", label: "Hoses & Safety", icon: "🪢" },
  { id: "spares", label: "Spare Parts", icon: "⚙️" },
];

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price_asc" | "price_desc" | "rating">("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [partPaymentAllowed, setPartPaymentAllowed] = useState(true);
  const [partPaymentPercent, setPartPaymentPercent] = useState(30);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const { addToCart, openCart } = useCart();

  useEffect(() => {
    const prods = getStoredProducts();
    setProducts(prods);

    const s = getStoredSettings();
    setPartPaymentAllowed(s.allowPartPayment);
    setPartPaymentPercent(s.minPartPaymentPercentage);

    const handleUpdate = () => {
      setProducts(getStoredProducts());
      const updatedS = getStoredSettings();
      setPartPaymentAllowed(updatedS.allowPartPayment);
      setPartPaymentPercent(updatedS.minPartPaymentPercentage);
    };

    window.addEventListener("suntech_storage_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("suntech_storage_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const handleQtyChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, Math.min(20, current + delta));
      return { ...prev, [productId]: next };
    });
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
        if (inStockOnly && (!p.inStock || p.stockCount <= 0)) return false;
        if (p.price > maxPrice) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesCategory = p.categoryName.toLowerCase().includes(q);
          const matchesDesc = p.shortDescription.toLowerCase().includes(q);
          if (!matchesName && !matchesCategory && !matchesDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, selectedCategory, inStockOnly, maxPrice, searchQuery, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Promotional Announcement */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-blue-700 text-white text-xs sm:text-sm py-2.5 px-4">
        <div className="container-custom flex items-center justify-between text-center md:text-left gap-2">
          <div className="flex items-center gap-2 mx-auto md:mx-0 font-medium">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse flex-shrink-0" />
            <span>
              <strong>SunTech Store:</strong> Free Shipping on orders over ₹999
              {partPaymentAllowed && (
                <> • <strong>Part-Payment Available:</strong> Pay only {partPaymentPercent}% deposit today &amp; balance on delivery!</>
              )}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs text-blue-100">
            <Link href="/store/track-order" className="hover:text-white underline">Track Order</Link>
            <span>|</span>
            <a href="tel:+919998546315" className="hover:text-white flex items-center gap-1">
              <PhoneCall className="w-3 h-3" /> +91 9998546315
            </a>
          </div>
        </div>
      </div>

      {/* Store Hero Banner */}
      <section className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200/80 py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-primary mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Official SunTech Equipment Store
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              Professional Solar Cleaning Kits &amp; Maintenance Tools
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
              Restore up to 25% lost energy output with certified zero-scratch brushes, water-fed telescopic poles, anti-static cleaning liquids, and automatic frame drain clips.
            </p>
            <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-gray-200">
                <Truck className="w-4 h-4 text-primary" />
                <span>Fast 3-5 Days Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-gray-200">
                <CreditCard className="w-4 h-4 text-primary" />
                <span>Prepaid &amp; Part-Payment Options</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-gray-200">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>ARC Glass Certified Safe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Catalog Content */}
      <div className="container-custom py-10">
        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 flex-shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-gray-200/80 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search telescopic poles, brushes, liquid, clips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-medium text-gray-700"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>

            {/* In-Stock Toggle */}
            <div className="md:col-span-2 flex items-center">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary accent-primary"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Max Price Filter Indicator */}
            <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-2 text-xs text-gray-500">
              <span>Max: ₹{maxPrice}</span>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-primary cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Results Count & Active Filters */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold text-gray-600">
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> solar products
          </p>
          {(searchQuery || selectedCategory !== "all" || inStockOnly || maxPrice < 10000) && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setInStockOnly(false);
                setMaxPrice(10000);
                setSortBy("featured");
              }}
              className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
            <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No matching products found</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              We couldn&apos;t find any items matching your current filters. Try searching for &ldquo;brush&rdquo;, &ldquo;pole&rdquo;, or &ldquo;clips&rdquo;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setMaxPrice(10000);
                setInStockOnly(false);
              }}
              className="btn-primary text-sm py-2 px-5"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const qty = quantities[product.id] || 1;
              const depositAmount = Math.round((product.price * partPaymentPercent) / 100);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-primary/30 transition-all flex flex-col group overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative bg-gradient-to-b from-gray-50 to-gray-100/60 p-4 aspect-square flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                      {product.badge && (
                        <span className="bg-primary text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-xs">
                          {product.badge}
                        </span>
                      )}
                      {product.discountPercent > 0 && (
                        <span className="bg-yellow-400 text-primary-dark text-[10px] font-black px-2 py-0.5 rounded-md">
                          {product.discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    {/* Stock Indicator */}
                    <div className="absolute top-3 right-3">
                      {product.inStock ? (
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" /> In Stock
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Sold Out
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating and Category */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                        <span className="font-semibold text-primary">{product.categoryName}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-gray-900">{product.rating}</span>
                          <span className="text-gray-400 text-[11px]">({product.reviewCount})</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 hover:text-primary transition-colors mb-2">
                        <Link href={`/store/product/${product.id}`}>
                          {product.name}
                        </Link>
                      </h3>

                      {/* Short Description */}
                      <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-3">
                        {product.shortDescription}
                      </p>
                    </div>

                    {/* Price and Action Section */}
                    <div>
                      {/* Price Section */}
                      <div className="pt-3 border-t border-gray-100 mb-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-gray-900">₹{product.price}</span>
                          {product.mrp > product.price && (
                            <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
                          )}
                          <span className="text-xs text-green-600 font-bold ml-auto">
                            Save ₹{product.mrp - product.price}
                          </span>
                        </div>

                        {/* Part Payment Notice if allowed */}
                        {partPaymentAllowed && (
                          <div className="mt-1 bg-amber-50/70 border border-amber-200/50 rounded-lg px-2 py-1 text-[11px] text-amber-900 flex items-center justify-between">
                            <span>Part-Pay ({partPaymentPercent}%):</span>
                            <strong className="text-amber-800">₹{depositAmount} today</strong>
                          </div>
                        )}
                      </div>

                      {/* Quantity Controls & Add to Cart */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/80">
                          <button
                            type="button"
                            onClick={() => handleQtyChange(product.id, -1)}
                            className="w-7 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-gray-800">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(product.id, 1)}
                            className="w-7 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          disabled={!product.inStock}
                          onClick={() => {
                            addToCart(product, qty);
                            openCart();
                          }}
                          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                            product.inStock
                              ? "bg-primary hover:bg-primary-dark text-white hover:shadow-md"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
                        </button>
                      </div>

                      <div className="mt-2 text-center">
                        <Link
                          href={`/store/product/${product.id}`}
                          className="text-[11px] font-semibold text-primary hover:underline"
                        >
                          View Specifications &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Why Buy From SunTech Section */}
        <section className="mt-20 bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="section-badge justify-center">The SunTech Difference</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Why Solar Pros &amp; Rooftop Owners Choose SunTech Store
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Every tool and chemical is lab-tested and field-proven on over 100,000+ panels across Gujarat and Western India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Zero Micro-Scratch Guarantee</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Standard nylon scratches the anti-reflective ARC nano-coating on solar glass. Our feathered split-tip bristles protect coating warranties.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Flexible Part-Payment</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Order with confidence. Pay a small deposit upfront to trigger priority dispatch, and settle the balance securely upon doorstep delivery.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-green-50/50 border border-green-100">
              <div className="w-12 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Express Fast Dispatch</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Orders placed before 2:00 PM ship same day from our Vadodara distribution warehouse with live end-to-end SMS &amp; web tracking.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Solar Engineer Support</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Have a unique roof pitch or ground-mount array? Call our engineering helpline for tailored equipment selection guidance.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
