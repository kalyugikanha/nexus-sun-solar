"use client";

import React, { useState } from "react";
import { Play, X } from "lucide-react";

interface YouTubeModalProps {
  videoId: string;
  thumbnailSrc: string;
  title: string;
}

export default function YouTubeModal({ videoId, thumbnailSrc, title }: YouTubeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-gray-100 group">
        <img
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={thumbnailSrc}
        />
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
          aria-label={`Watch ${title}`}
        >
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-primary fill-primary ml-1" />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
