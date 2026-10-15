import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SunTech Solar",
  description: "SunTech Privacy Policy - How we collect and use your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Privacy Policy</h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-blue-200">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-yellow-400 font-semibold">Privacy Policy</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-4xl mx-auto prose prose-blue">
          <p className="text-sm text-gray-500 mb-8 font-medium">Last updated: November 2025</p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            SunTech (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
            <li>Personal identification information (name, email address, phone number)</li>
            <li>Location data for service area verification in Vadodara and nearby regions</li>
            <li>Device information and usage data</li>
            <li>Service booking and transaction details</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We use the collected information to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
            <li>Provide, operate, and maintain our services</li>
            <li>Process bookings and payments</li>
            <li>Send you service updates and notifications</li>
            <li>Respond to your inquiries and customer support requests</li>
            <li>Improve our website and mobile application</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:info@suntechapp.com" className="text-primary font-bold hover:underline">
              info@suntechapp.com
            </a>{" "}
            or call{" "}
            <a href="tel:+919998546315" className="text-primary font-bold hover:underline">
              +91 9998546315
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
