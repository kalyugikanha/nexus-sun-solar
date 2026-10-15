import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | SunTech Solar",
  description: "SunTech Terms and Conditions for using our services.",
};

export default function TermsConditionsPage() {
  return (
    <div>
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Terms &amp; Conditions</h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-blue-200">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-yellow-400 font-semibold">Terms &amp; Conditions</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-4xl mx-auto prose prose-blue">
          <p className="text-sm text-gray-500 mb-8 font-medium">Last updated: November 2025</p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            By accessing and using SunTech&apos;s website, mobile application, or services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Services</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            SunTech provides professional solar panel cleaning and maintenance services. We reserve the right to modify, suspend, or discontinue any service at any time without notice.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-8">
            <li>Provide accurate and complete information when booking services</li>
            <li>Ensure safe and clear access to solar panel installations</li>
            <li>Make timely payment for services rendered</li>
            <li>Notify us promptly of any special requirements or safety concerns</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            SunTech shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services, except as required by law.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            These Terms shall be governed by and construed in accordance with the laws of India, with jurisdiction in Vadodara, Gujarat.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            For questions about these Terms, contact us at{" "}
            <a href="mailto:info@suntechapp.com" className="text-primary font-bold hover:underline">
              info@suntechapp.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
