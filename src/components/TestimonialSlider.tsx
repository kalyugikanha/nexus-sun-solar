"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Star } from "lucide-react";

interface Review {
  name: string;
  badge: string | null;
  text: string;
}

const reviewsData: Review[] = [
  {
    name: "Premal Khamar",
    badge: null,
    text: "Lowest quotation with best material for cleaning at very affordable rate. We are from Undera area and we gave AMC for high rise 4 towers and they did exceptional job with very affordable price compared to market. Ground staff is very well trained and very polite and accurate in timing.",
  },
  {
    name: "Dr. G. S. Doiphode",
    badge: null,
    text: "Excellent work done by your team. Very impressed with the speed and professionalism.",
  },
  {
    name: "Kalpesh Prajapati",
    badge: null,
    text: "I'm fully satisfied with the service provided. Good job!",
  },
  {
    name: "Maitreya Mehta",
    badge: null,
    text: "Good and timely cleaning service. Highly reliable local team in Vadodara.",
  },
  {
    name: "Pratik Patel",
    badge: null,
    text: "Good service and good timing, perfection and excellent work.",
  },
  {
    name: "Vaghela Vishal",
    badge: null,
    text: "Very good company. All staff is very excellent. Very good behaviour. Very best solar company 👌.",
  },
  {
    name: "Varsha Patel",
    badge: null,
    text: "Proven results, trusted team. Very satisfied with the professional service provided by SunTech.",
  },
  {
    name: "Deepak Verma",
    badge: null,
    text: "Nice and prompt service highly recommended for residential and commercial panels.",
  },
  {
    name: "Ashok Kadam",
    badge: null,
    text: "Good work done. The boys' behaviour is also very good.",
  },
];

const avatarColors = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-rose-500",
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-label="Google">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}

export default function TestimonialSlider() {
  const [reviews] = useState<Review[]>(reviewsData);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 2 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    const timer = setInterval(nextPage, 5000);
    return () => clearInterval(timer);
  }, [nextPage]);

  const visibleReviews = reviews.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visibleReviews.map((rev) => (
          <a
            key={rev.name}
            href="https://g.co/kgs/qN9VqfV"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <GoogleIcon />
                  <span>Google Review</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-4">
                &ldquo;{rev.text}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
              <div
                className={`w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm ${getAvatarColor(
                  rev.name
                )}`}
              >
                {rev.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{rev.name}</h4>
                <p className="text-xs text-gray-400">Google Reviewer</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Pagination indicators */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentPage(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentPage ? "bg-white w-6" : "bg-white/40 w-2.5"
            }`}
            aria-label={`Go to review page ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
