"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Printer,
  ArrowRight,
  CreditCard
} from "lucide-react";
import { Order } from "@/types/store";
import { getOrderById } from "@/lib/storeStorage";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<Order | null>(() => (orderId ? getOrderById(orderId) || null : null));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      const found = getOrderById(orderId);
      setOrder(found || null);
    }
    setLoading(false);
  }, [orderId]);

  if (loading && !order) {
    return (
      <div className="container-custom py-24 text-center max-w-lg">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <h2 className="text-lg font-bold text-gray-900 mb-1">Verifying your order...</h2>
        <p className="text-xs text-gray-500">Please wait while we fetch your booking details.</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-custom py-20 text-center max-w-lg">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h2>
        <p className="text-xs text-gray-500 mb-6">
          We couldn&apos;t find an order matching {orderId ? `"${orderId}"` : "the provided link"}. You can check your Order ID on the tracking page.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/store/track-order" className="btn-outline text-xs py-2.5 px-4">
            Track Order
          </Link>
          <Link href="/store" className="btn-primary text-xs py-2.5 px-5">
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  const statusSteps = [
    { key: "pending", label: "Order Placed" },
    { key: "confirmed", label: "Confirmed" },
    { key: "shipped", label: "Shipped" },
    { key: "out_for_delivery", label: "Out For Delivery" },
    { key: "delivered", label: "Delivered" },
  ];

  const currentStepIdx = statusSteps.findIndex((s) => s.key === order.status);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom max-w-4xl">
        {/* Success Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xs text-center mb-8">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm animate-in zoom-in">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
            Booking &amp; Order Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-3 mb-2">
            Thank you, {order.customer.fullName}!
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
            Your SunTech order has been received and queued for dispatch from our Vadodara warehouse.
          </p>

          <div className="inline-flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-200 text-xs text-gray-700">
            <span>Order ID: <strong className="text-gray-900 font-mono text-sm">{order.id}</strong></span>
            <span>•</span>
            <span>Date: <strong>{new Date(order.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}</strong></span>
          </div>
        </div>

        {/* Live Delivery Stepper */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-gray-900 text-base">Delivery Status</h2>
              <p className="text-xs text-gray-500">Estimated Delivery: <strong>{order.estimatedDelivery || "3-5 business days"}</strong></p>
            </div>
            {order.trackingNumber && (
              <span className="text-xs font-mono bg-blue-50 text-primary px-3 py-1.5 rounded-xl border border-blue-200 font-bold">
                Tracking: {order.trackingNumber}
              </span>
            )}
          </div>

          {/* Stepper Visual */}
          <div className="relative flex justify-between items-center max-w-2xl mx-auto py-4">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
              style={{
                width: `${Math.max(0, (Math.min(currentStepIdx, 4) / 4) * 100)}%`,
              }}
            />

            {statusSteps.map((step, idx) => {
              const isPassed = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;
              return (
                <div key={step.key} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPassed
                        ? "bg-primary text-white shadow-md shadow-primary/30"
                        : "bg-gray-100 text-gray-400 border border-gray-300"
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span
                    className={`text-[11px] mt-2 font-semibold text-center hidden sm:block ${
                      isCurrent ? "text-primary font-bold" : isPassed ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Payment & Amount Summary */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-gray-900 text-base pb-2 border-b border-gray-100 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              <span>Payment Details</span>
            </h3>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span className="font-bold text-gray-900 capitalize">
                  {order.paymentMethod === "part_payment"
                    ? `Part Payment (${order.partPaymentPercentage || 30}% Advance)`
                    : order.paymentMethod === "prepaid"
                    ? "Full Pre-Paid Online"
                    : "Cash on Delivery"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment Status:</span>
                <span
                  className={`font-bold uppercase px-2 py-0.5 rounded-full text-[10px] ${
                    order.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : order.paymentStatus === "partially_paid"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span>Total Order Value:</span>
                <span className="font-black text-sm text-gray-900">₹{order.total}</span>
              </div>
              <div className="flex justify-between text-green-700 font-bold">
                <span>Amount Paid Now:</span>
                <span>₹{order.paidAmount}</span>
              </div>
              {order.remainingAmount > 0 && (
                <div className="flex justify-between p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 font-bold">
                  <span>Balance Due on Delivery:</span>
                  <span>₹{order.remainingAmount}</span>
                </div>
              )}
            </div>

            {order.paymentMethod === "part_payment" && (
              <p className="text-[11px] text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-xl">
                ℹ️ Please keep <strong>₹{order.remainingAmount}</strong> ready in Cash or UPI to pay the delivery driver upon receipt.
              </p>
            )}
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-xs space-y-3">
            <h3 className="font-bold text-gray-900 text-base pb-2 border-b border-gray-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Shipping Address</span>
            </h3>

            <div className="text-xs text-gray-600 space-y-1 leading-relaxed">
              <p className="font-bold text-gray-900 text-sm">{order.customer.fullName}</p>
              <p>{order.customer.address}</p>
              {order.customer.apartment && <p>{order.customer.apartment}</p>}
              <p>{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
              <p className="pt-2 text-gray-500">
                Phone: <strong className="text-gray-800">{order.customer.phone}</strong>
              </p>
              {order.customer.notes && (
                <p className="text-[11px] text-gray-500 italic pt-1">
                  Note: &ldquo;{order.customer.notes}&rdquo;
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Ordered Items Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs mb-8">
          <h3 className="font-bold text-gray-900 text-base mb-4">Equipment Summary</h3>
          <div className="divide-y divide-gray-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between text-xs gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl p-1 border border-gray-100 flex-shrink-0">
                    <img src={item.image} alt={item.productName} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{item.productName}</h4>
                    <span className="text-gray-400">Qty: {item.quantity} × ₹{item.price}</span>
                  </div>
                </div>
                <span className="font-extrabold text-sm text-gray-900">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" /> Print Tax Invoice
          </button>

          <div className="flex items-center gap-3">
            <Link
              href={`/store/track-order?id=${order.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary text-primary text-xs font-bold hover:bg-blue-50 transition-colors"
            >
              <Truck className="w-4 h-4" /> Track Live Order
            </Link>
            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors shadow-xs"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-gray-500">Loading Order Confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
