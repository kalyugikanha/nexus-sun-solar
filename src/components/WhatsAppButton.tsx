import React from "react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919998546315"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      style={{ backgroundColor: "#25D366" }}
    >
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
      </span>
      <svg
        viewBox="0 0 24 24"
        width="30"
        height="30"
        fill="white"
        className="transition-transform group-hover:rotate-6"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.584 1.777.818 2.796.818 3.179 0 5.766-2.587 5.766-5.768 0-3.18-2.587-5.766-5.766-5.766zm9.969 5.768c0 5.485-4.484 9.969-9.969 9.969-1.745 0-3.385-.45-4.819-1.237l-5.212 1.367 1.391-5.086c-.886-1.488-1.391-3.235-1.391-5.013 0-5.485 4.484-9.969 9.969-9.969 5.485 0 9.969 4.484 9.969 9.969z" />
      </svg>
    </a>
  );
}
