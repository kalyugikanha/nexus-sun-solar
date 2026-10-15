"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
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
    isCartOpen,
    toastMessage,
    closeCart,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    amountNeededForFreeShipping,
    freeShippingThreshold,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
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

  const progressPercent = Math.min(100, Math.round(((freeShippingThreshold - amountNeededForFreeShipping) / freeShippingThreshold) * 100));

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity animate-in fade-in"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base">Your Cart</h2>
              <p className="text-xs text-gray-500">{cartCount} {cartCount === 1 ? "item" : "items"} selected</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-lg hover:bg-gray-200/80 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-blue-50/70 border-b border-blue-100/70">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium text-primary-dark">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-primary" />
                {amountNeededForFreeShipping > 0 ? (
                  <span>Add <strong className="text-primary font-bold">₹{amountNeededForFreeShipping}</strong> more for <strong>FREE Delivery</strong></span>
                ) : (
                  <span className="text-green-700 font-bold flex items-center gap-1">🎉 You unlocked FREE Delivery!</span>
                )}
              </span>
              <span className="text-gray-500">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-blue-200/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Items List or Empty State */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Your cart is empty</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                Explore our catalog of professional solar cleaning kits, brushes, and specialized liquids.
              </p>
              <Link
                href="/store"
                onClick={closeCart}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors shadow-sm"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-3.5 p-3.5 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 transition-all shadow-sm"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-xl bg-gray-50 p-1 flex-shrink-0 border border-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm line-clamp-1 hover:text-primary">
                      <Link href={`/store/product/${product.id}`} onClick={closeCart}>
                        {product.name}
                      </Link>
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">{product.categoryName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-gray-900 text-sm">₹{product.price}</span>
                      {product.mrp > product.price && (
                        <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Remove */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/50">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-l-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-gray-800">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-r-lg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Totals and Checkout CTA */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50/60 space-y-3.5">
            {/* Promo Code Input */}
            <div>
              {couponCode ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-xs">
                  <span className="flex items-center gap-1.5 text-green-700 font-semibold">
                    <Tag className="w-3.5 h-3.5" /> Coupon &ldquo;{couponCode}&rdquo; applied (-₹{couponDiscount})
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-500 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. SUNTECH10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="flex-1 uppercase px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-primary bg-white"
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

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200/60">
              <div className="flex justify-between">
                <span>Total MRP:</span>
                <span className="line-through text-gray-400">₹{totalMrp}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Product Discount:</span>
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
                <span>Shipping Fee:</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-green-600 font-bold">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-gray-200 text-sm font-bold text-gray-900">
                <span>Subtotal Payable:</span>
                <span className="text-lg text-primary">₹{total}</span>
              </div>
            </div>

            {/* Guarantee badge */}
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              <span>100% Genuine SunTech Equipment &amp; Secure Checkout</span>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full text-center py-2.5 px-3 border border-gray-300 rounded-xl font-bold text-xs text-gray-700 hover:bg-gray-100 transition-colors"
              >
                View Full Cart
              </Link>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full text-center py-2.5 px-3 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary-dark transition-colors flex items-center justify-center gap-1 shadow-sm"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
