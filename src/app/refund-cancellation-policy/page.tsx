import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | SunTech Solar",
  description: "SunTech Refund and Cancellation Policy for solar panel cleaning services.",
};

export default function RefundCancellationPolicyPage() {
  return (
    <div>
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Refund &amp; Cancellation Policy
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-blue-200">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-yellow-400 font-semibold">Refund Policy</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-4xl mx-auto prose prose-blue">
          <p className="text-sm text-gray-500 mb-8 font-medium">Last updated: November 2025</p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We understand that plans can change. Our cancellation policy is designed to be fair to both customers and our service team:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
            <li>
              <strong>48+ hours before service:</strong> Free cancellation, full refund
            </li>
            <li>
              <strong>24-48 hours before service:</strong> 50% cancellation fee applies
            </li>
            <li>
              <strong>Less than 24 hours:</strong> 100% cancellation fee applies
            </li>
            <li>
              <strong>No-shows:</strong> Full service charge applies
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Policy</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We strive to deliver excellent service. If you are not satisfied with our service:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
            <li>Notify us within 24 hours of service completion</li>
            <li>We will investigate and address your concern</li>
            <li>
              If the issue is on our end, we will re-clean at no charge or provide a partial/full refund
            </li>
            <li>Refunds are processed within 7-10 business days</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">AMC Contracts</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            For Annual Maintenance Contracts, cancellations can be made with a 30-day written notice. Refunds for unused services will be calculated on a pro-rata basis.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Request a Refund</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            To request a refund or cancel a service, please contact us via:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
            <li>
              Email:{" "}
              <a href="mailto:info@suntechapp.com" className="text-primary font-bold hover:underline">
                info@suntechapp.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+919998546315" className="text-primary font-bold hover:underline">
                +91 9998546315
              </a>
            </li>
            <li>Through the SunTech mobile app</li>
          </ul>

          <p className="text-gray-600 leading-relaxed">
            We are committed to resolving any issues promptly and ensuring your complete satisfaction.
          </p>
        </div>
      </section>
    </div>
  );
}
