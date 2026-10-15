"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Tag,
  ShieldCheck,
  Truck,
  Zap
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getStoredSettings } from "@/lib/storeStorage";

export default function CartPage() {
  const {
    items,
    cartCount,
    subtotal,
    totalMrp,
    savings,
    shippingFee,
    couponCode,
    couponDiscount,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    isInitialized,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [partPaymentAllowed, setPartPaymentAllowed] = useState(true);
  const [partPaymentPercent, setPartPaymentPercent] = useState(30);

  useEffect(() => {
    const s = getStoredSettings();
    setPartPaymentAllowed(s.allowPartPayment);
    setPartPaymentPercent(s.minPartPaymentPercentage);

    const handleUpdate = () => {
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

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponError(null);
      setInputCoupon("");
    } else {
      setCouponError(res.message);
      setCouponSuccess(null);
    }
  };

  const depositPayable = Math.round((total * partPaymentPercent) / 100);
  const remainingPayable = total - depositPayable;

  if (!isInitialized) {
    return (
      <div className="bg-gray-50 min-h-screen py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-semibold text-sm">Loading your cart items...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container-custom max-w-xl text-center bg-white p-10 sm:p-14 rounded-3xl border border-gray-200/80 shadow-xs">
          <div className="w-20 h-20 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Your Shopping Cart is Empty</h1>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Looks like you haven&apos;t added any solar cleaning equipment yet. Browse our professional telescopic poles, scratch-free brushes, and specialized deionized cleaning solutions.
          </p>
          <Link href="/store" className="btn-primary inline-flex items-center gap-2">
            <span>Explore SunTech Store</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container-custom">
        {/* Breadcrumbs & Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link href="/store" className="hover:text-primary">Store</Link>
              <span>/</span>
              <span className="text-gray-900 font-semibold">Shopping Cart</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              Shopping Cart ({cartCount} {cartCount === 1 ? "Item" : "Items"})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-gray-400 hover:text-red-500 font-semibold flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Cart
          </button>
        </div>

        {/* Free Shipping Alert */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-primary-dark">
            <Truck className="w-5 h-5 text-primary flex-shrink-0" />
            {amountNeededForFreeShipping > 0 ? (
              <span>
                Add <strong className="text-primary font-bold">₹{amountNeededForFreeShipping}</strong> more of eligible items to enjoy <strong>FREE Delivery</strong>!
              </span>
            ) : (
              <span className="text-green-700 font-bold">🎉 Congratulations! You have unlocked FREE Express Delivery!</span>
            )}
          </div>
          <Link href="/store" className="text-xs font-bold text-primary hover:underline flex-shrink-0 hidden sm:block">
            + Add More Items
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-xs hover:border-gray-300 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                {/* Product Thumbnail */}
                <div className="w-24 h-24 bg-gray-50 rounded-xl p-2 flex-shrink-0 border border-gray-100 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-primary uppercase">{product.categoryName}</span>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 hover:text-primary transition-colors line-clamp-1 mb-1">
                    <Link href={`/store/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="flex items-baseline gap-2 text-xs">
                    <span className="font-extrabold text-sm sm:text-base text-gray-900">₹{product.price}</span>
                    {product.mrp > product.price && (
                      <span className="text-gray-400 line-through">₹{product.mrp}</span>
                    )}
                    <span className="text-green-600 font-bold text-[11px]">
                      Save ₹{(product.mrp - product.price) * quantity}
                    </span>
                  </div>
                </div>

                {/* Quantity and Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-xs font-bold text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[70px]">
                    <span className="font-black text-sm text-gray-900 block">
                      ₹{product.price * quantity}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-2 flex justify-between items-center">
              <Link
                href="/store"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <div>
              {couponCode ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-3.5 py-2 text-xs">
                  <span className="flex items-center gap-1.5 text-green-700 font-semibold">
                    <Tag className="w-3.5 h-3.5" /> Coupon &ldquo;{couponCode}&rdquo; applied
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-500 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. SUNTECH10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="flex-1 uppercase px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded-xl hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-500 mt-1">{couponError}</p>}
              {couponSuccess && <p className="text-[11px] text-green-600 mt-1">{couponSuccess}</p>}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Total Items MRP:</span>
                <span className="line-through text-gray-400">₹{totalMrp}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Product Savings:</span>
                  <span>-₹{savings}</span>
                </div>
              )}
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Coupon Discount:</span>
                  <span>-₹{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Standard Delivery Fee:</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-green-600 font-bold">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-gray-200 text-sm font-bold text-gray-900">
                <span>Total Amount:</span>
                <span className="text-2xl text-primary font-black">₹{total}</span>
              </div>
            </div>

            {/* Part Payment Highlight Banner */}
            {partPaymentAllowed && (
              <div className="p-3.5 bg-amber-50/70 border border-amber-200/60 rounded-2xl text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-950">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Part-Payment Option Enabled</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  You can choose to pay <strong>₹{depositPayable}</strong> ({partPaymentPercent}% deposit) at checkout and the remaining <strong>₹{remainingPayable}</strong> upon delivery!
                </p>
              </div>
            )}

            {/* Proceed to Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full py-4 px-6 rounded-2xl font-extrabold text-sm bg-primary text-white hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Trust Points */}
            <div className="pt-3 border-t border-gray-100 space-y-2 text-[11px] text-gray-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>100% Genuine SunTech Equipment</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Insured Doorstep Delivery across India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
