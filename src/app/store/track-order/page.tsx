"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Truck,
  CheckCircle2,
  AlertCircle,
  Package,
  ArrowLeft
} from "lucide-react";
import { Order } from "@/types/store";
import { getOrderById } from "@/lib/storeStorage";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [orderIdInput, setOrderIdInput] = useState(initialId);
  const [phoneInput, setPhoneInput] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId]);

  const handleSearch = (idToSearch?: string) => {
    const target = (idToSearch || orderIdInput).trim();
    if (!target) {
      setError("Please enter your SunTech Order ID (e.g. ST-2026-9841)");
      return;
    }
    setError(null);
    setSearched(true);

    const found = getOrderById(target);
    if (found) {
      if (phoneInput.trim() && !found.customer.phone.includes(phoneInput.trim())) {
        setError("Order found, but phone number did not match our records.");
        setOrder(null);
        return;
      }
      setOrder(found);
    } else {
      setOrder(null);
      setError(`No order found matching "${target}". Please check your order confirmation.`);
    }
  };

  const statusColors: Record<Order["status"], string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-indigo-100 text-indigo-800",
    out_for_delivery: "bg-amber-100 text-amber-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/store" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary mb-3">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
          <h1 className="text-3xl font-black text-gray-900">Track Your SunTech Order</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Check the live delivery and dispatch status of your solar cleaning kits and equipment.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Order ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. ST-2026-9841"
                    value={orderIdInput}
                    onChange={(e) => setOrderIdInput(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Mobile Number (Optional verification)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 98250 12345"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-gray-400">
                Demo sample: <button type="button" onClick={() => { setOrderIdInput("ST-2026-9841"); handleSearch("ST-2026-9841"); }} className="underline text-primary">ST-2026-9841</button>
              </span>
              <button
                type="submit"
                className="btn-primary text-xs py-2.5 px-6"
              >
                <Search className="w-4 h-4" />
                <span>Track Order</span>
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Order Result Card */}
        {order && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6 animate-in fade-in">
            {/* Header Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-gray-900 font-mono">{order.id}</h2>
                  <span className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-md ${statusColors[order.status]}`}>
                    {order.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Placed by <strong>{order.customer.fullName}</strong> on {new Date(order.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                </p>
              </div>

              {order.courierPartner && (
                <div className="text-xs text-right">
                  <span className="text-gray-400 block">Carrier Partner:</span>
                  <span className="font-bold text-gray-800">{order.courierPartner}</span>
                  {order.trackingNumber && (
                    <span className="text-primary font-mono block text-[11px]">#{order.trackingNumber}</span>
                  )}
                </div>
              )}
            </div>

            {/* Payment Summary */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block">Total Value:</span>
                <span className="font-black text-sm text-gray-900">₹{order.total}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Amount Paid:</span>
                <span className="font-bold text-sm text-green-700">₹{order.paidAmount}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Balance on Delivery:</span>
                <span className={`font-bold text-sm ${order.remainingAmount > 0 ? "text-amber-800" : "text-gray-500"}`}>
                  ₹{order.remainingAmount}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block">Expected Delivery:</span>
                <span className="font-bold text-sm text-gray-900">{order.estimatedDelivery || "3-5 days"}</span>
              </div>
            </div>

            {/* Timeline Events */}
            <div>
              <h3 className="font-bold text-sm text-gray-900 mb-4">Tracking History</h3>
              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                {order.timeline.map((evt, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-xs" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs mb-0.5">
                      <h4 className="font-bold text-gray-900">{evt.title}</h4>
                      <span className="text-gray-400 text-[11px]">{evt.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-500">{evt.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info & Items */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-4 text-xs text-gray-600">
              <div>
                <span className="font-bold text-gray-800 block mb-1">Destination Address:</span>
                <p>{order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
              </div>
              <div className="sm:text-right">
                <span className="font-bold text-gray-800 block mb-1">Ordered Items:</span>
                <p>{order.items.map((i) => `${i.productName} (${i.quantity}x)`).join(", ")}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-gray-500">Loading Order Tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
