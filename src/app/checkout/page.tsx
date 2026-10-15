"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Lock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Zap,
  Banknote,
  QrCode,
  Smartphone
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PaymentMethod, StoreSettings } from "@/types/store";
import { createOrder, getStoredSettings } from "@/lib/storeStorage";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    totalMrp,
    couponCode,
    couponDiscount,
    shippingFee,
    total,
    clearCart,
    isInitialized,
  } = useCart();

  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("prepaid");
  const [onlinePayType, setOnlinePayType] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Customer form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    apartment: "",
    city: "Vadodara",
    state: "Gujarat",
    pincode: "390011",
    landmark: "",
    notes: "",
  });

  useEffect(() => {
    const s = getStoredSettings();
    setSettings(s);
  }, []);

  const partPaymentAllowed = settings?.allowPartPayment ?? true;
  const partPaymentPercent = settings?.minPartPaymentPercentage ?? 30;

  const depositPayable = Math.round((total * partPaymentPercent) / 100);
  const remainingPayable = Math.max(0, total - depositPayable);

  const amountToPayNow =
    paymentMethod === "prepaid"
      ? total
      : paymentMethod === "part_payment"
      ? depositPayable
      : 0;

  const amountDueOnDelivery =
    paymentMethod === "prepaid"
      ? 0
      : paymentMethod === "part_payment"
      ? remainingPayable
      : total;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic Validation
    if (!formData.fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile phone number.");
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg("Please provide your delivery street address.");
      return;
    }
    if (!formData.city.trim() || !formData.pincode.trim()) {
      setErrorMsg("Please enter city and 6-digit PIN code.");
      return;
    }

    if (items.length === 0) {
      setErrorMsg("Your cart is empty. Please add products before checking out.");
      return;
    }

    setIsSubmitting(true);

    // Simulate payment processing delay for realistic, reassuring experience
    setTimeout(() => {
      try {
        const orderItems = items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          price: i.product.price,
          mrp: i.product.mrp,
          quantity: i.quantity,
          image: i.product.image,
          category: i.product.category,
        }));

        const newOrder = createOrder({
          customer: {
            fullName: formData.fullName.trim(),
            email: formData.email.trim() || `${formData.fullName.toLowerCase().replace(/\s+/g, "")}@customer.com`,
            phone: formData.phone.trim(),
            address: formData.address.trim(),
            apartment: formData.apartment.trim() || undefined,
            city: formData.city.trim(),
            state: formData.state.trim(),
            pincode: formData.pincode.trim(),
            landmark: formData.landmark.trim() || undefined,
            notes: formData.notes.trim() || undefined,
          },
          items: orderItems,
          subtotal,
          discount: couponDiscount,
          couponCode: couponCode || undefined,
          shippingFee,
          tax: 0,
          total,
          paymentMethod,
          paymentStatus: paymentMethod === "prepaid" ? "paid" : paymentMethod === "part_payment" ? "partially_paid" : "pending",
          paidAmount: amountToPayNow,
          remainingAmount: amountDueOnDelivery,
          partPaymentPercentage: paymentMethod === "part_payment" ? partPaymentPercent : undefined,
          status: "pending",
          estimatedDelivery: "3-5 business days",
        });

        clearCart();
        setIsSubmitting(false);
        router.push(`/store/order-success?id=${newOrder.id}`);
      } catch (err) {
        console.error("Order placement failed", err);
        setErrorMsg("Failed to place order. Please try again.");
        setIsSubmitting(false);
      }
    }, 1200);
  };

  if (!isInitialized) {
    return (
      <div className="bg-gray-50 min-h-screen py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-semibold text-sm">Preparing secure checkout...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container-custom max-w-lg text-center bg-white p-10 rounded-3xl border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-2">No items to checkout</h2>
          <p className="text-sm text-gray-500 mb-6">Your cart is currently empty. Please choose products from our store catalog.</p>
          <Link href="/store" className="btn-primary">
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container-custom">
        {/* Checkout Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Link href="/cart" className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-gray-900">Secure Checkout</h1>
              <p className="text-xs text-gray-500">Fast, encrypted order processing for SunTech Solar Equipment</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-xl border border-green-200 font-semibold">
            <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column: Address & Payment */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Contact Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-xs">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-gray-100">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
                <h2 className="font-bold text-gray-900 text-base">Contact Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Rajesh Patel"
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Phone Number (for SMS &amp; Delivery) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98250 12345"
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Email Address (for invoice and tracking)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-xs">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-gray-100">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span>
                <h2 className="font-bold text-gray-900 text-base">Delivery &amp; Rooftop Location</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    House / Flat / Society / Building Name &amp; Street <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. 41, Krupal Society, Near Deep Chambers, Manjalpur"
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    maxLength={6}
                    placeholder="390011"
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Nearby Landmark (optional)
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="Opposite Water Tank / School"
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Delivery Instructions for Driver (optional)
                  </label>
                  <textarea
                    rows={2}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Call before coming, drop at security gate..."
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method Selection */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-xs">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-gray-100">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">3</span>
                <h2 className="font-bold text-gray-900 text-base">Select Payment Method</h2>
              </div>

              <div className="space-y-3.5">
                {/* Option A: Pre-Paid Online (100% Full Payment) */}
                <label
                  className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "prepaid"
                      ? "border-primary bg-blue-50/40 shadow-xs"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="prepaid"
                      checked={paymentMethod === "prepaid"}
                      onChange={() => setPaymentMethod("prepaid")}
                      className="mt-1 w-4 h-4 text-primary accent-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-gray-900">Pre-Paid Full Online Payment (100%)</span>
                        <span className="text-xs bg-green-100 text-green-700 font-extrabold px-2 py-0.5 rounded-full">
                          Fastest Dispatch
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Pay full amount of <strong>₹{total}</strong> instantly via UPI (GPay/PhonePe/Paytm), Credit/Debit Cards, or NetBanking.
                      </p>

                      {/* Sub-options when Pre-paid selected */}
                      {paymentMethod === "prepaid" && (
                        <div className="mt-4 pt-3 border-t border-blue-200/60 space-y-3 animate-in fade-in">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setOnlinePayType("upi")}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                                onlinePayType === "upi" ? "bg-primary text-white" : "bg-white border text-gray-700"
                              }`}
                            >
                              <Smartphone className="w-3.5 h-3.5" /> UPI / QR
                            </button>
                            <button
                              type="button"
                              onClick={() => setOnlinePayType("card")}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                                onlinePayType === "card" ? "bg-primary text-white" : "bg-white border text-gray-700"
                              }`}
                            >
                              <CreditCard className="w-3.5 h-3.5" /> Cards
                            </button>
                            <button
                              type="button"
                              onClick={() => setOnlinePayType("netbanking")}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                                onlinePayType === "netbanking" ? "bg-primary text-white" : "bg-white border text-gray-700"
                              }`}
                            >
                              <Banknote className="w-3.5 h-3.5" /> Net Banking
                            </button>
                          </div>

                          {onlinePayType === "upi" && (
                            <div className="flex gap-2 items-center bg-white p-2.5 rounded-xl border border-gray-200">
                              <QrCode className="w-5 h-5 text-gray-400" />
                              <input
                                type="text"
                                placeholder="Enter UPI ID (e.g. yourname@okhdfcbank)"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                className="w-full text-xs focus:outline-none"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </label>

                {/* Option B: Part-Payment (Deposit upfront, balance on delivery) */}
                {partPaymentAllowed && (
                  <label
                    className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "part_payment"
                        ? "border-amber-500 bg-amber-50/50 shadow-xs"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="part_payment"
                        checked={paymentMethod === "part_payment"}
                        onChange={() => setPaymentMethod("part_payment")}
                        className="mt-1 w-4 h-4 text-amber-600 accent-amber-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                            Part-Payment ({partPaymentPercent}% Advance Deposit)
                          </span>
                          <span className="text-xs bg-amber-200 text-amber-900 font-extrabold px-2 py-0.5 rounded-full">
                            Admin Approved
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          Pay only <strong className="text-amber-900 font-bold">₹{depositPayable}</strong> now to reserve equipment and initiate dispatch. Settle the balance of <strong className="text-gray-900 font-bold">₹{remainingPayable}</strong> directly with the delivery agent via Cash or UPI upon arrival.
                        </p>

                        {paymentMethod === "part_payment" && (
                          <div className="mt-3 p-3 bg-white rounded-xl border border-amber-200 text-xs space-y-1.5">
                            <div className="flex justify-between font-bold text-gray-800">
                              <span>Pay Online Now ({partPaymentPercent}%):</span>
                              <span className="text-amber-700">₹{depositPayable}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                              <span>Pay at Delivery ({100 - partPaymentPercent}%):</span>
                              <span>₹{remainingPayable}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                )}

                {/* Option C: Cash on Delivery (Full COD) */}
                <label
                  className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-primary bg-blue-50/40 shadow-xs"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-1 w-4 h-4 text-primary accent-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-gray-900">Cash on Delivery (Full COD)</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Pay entire amount of <strong>₹{total}</strong> directly to courier when package arrives.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-xs space-y-5 sticky top-24">
            <h2 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
              Items in Order ({items.length})
            </h2>

            {/* Items mini list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 items-center text-xs">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg p-1 border border-gray-100 flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{product.name}</p>
                    <p className="text-gray-400">Qty: {quantity} × ₹{product.price}</p>
                  </div>
                  <span className="font-bold text-gray-900">₹{product.price * quantity}</span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-medium text-gray-900">₹{subtotal}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Coupon &ldquo;{couponCode}&rdquo;:</span>
                  <span>-₹{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-green-600">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-gray-200 text-sm font-bold text-gray-900">
                <span>Total Order Value:</span>
                <span className="text-xl text-primary font-black">₹{total}</span>
              </div>
            </div>

            {/* Amount Due Split Display */}
            <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-1.5">
              <div className="flex justify-between font-bold text-gray-900">
                <span>Amount Payable Today:</span>
                <span className="text-sm text-green-700">₹{amountToPayNow}</span>
              </div>
              {amountDueOnDelivery > 0 && (
                <div className="flex justify-between text-gray-600 font-semibold">
                  <span>Balance Due on Delivery:</span>
                  <span className="text-amber-800">₹{amountDueOnDelivery}</span>
                </div>
              )}
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark shadow-primary/25 hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing &amp; Creating Order...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    {paymentMethod === "prepaid"
                      ? `Pay ₹${amountToPayNow} & Confirm Order`
                      : paymentMethod === "part_payment"
                      ? `Pay ₹${amountToPayNow} Deposit & Confirm`
                      : "Place Cash on Delivery Order"}
                  </span>
                </>
              )}
            </button>

            <div className="text-[11px] text-gray-400 text-center leading-relaxed">
              By confirming your order, you agree to SunTech terms of service, warranty policy, and delivery verification terms.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
