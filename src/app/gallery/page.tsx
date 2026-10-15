import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Sun, ArrowRight, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery & Videos | SunTech Solar",
  description:
    "Browse SunTech solar panel cleaning project gallery and watch our professional cleaning videos from Vadodara.",
};

const projects = [
  {
    title: "Industrial Solar Farm",
    desc: "Large scale commercial installation",
    src: "/images/IMG_5257-1170x658-1.jpg",
  },
  {
    title: "Rooftop Residential",
    desc: "Home solar panel cleaning",
    src: "/images/IMG_5255-1536x864-1.jpg",
  },
  {
    title: "Commercial Building",
    desc: "Office complex solar maintenance",
    src: "/images/IMG_5247-2048x1152-1.jpg",
  },
  {
    title: "Solar Array Cleaning",
    desc: "Professional Professional cleaning",
    src: "/images/IMG_5243-2048x1031-1.jpg",
  },
  {
    title: "Ground Mount System",
    desc: "Ground-mounted solar installation",
    src: "/images/IMG_5242-1536x858-1.jpg",
  },
  {
    title: "Residential Rooftop",
    desc: "Before and after cleaning service",
    src: "/images/IMG_5232-1536x1152-1.jpg",
  },
  {
    title: "Team at Work",
    desc: "SunTech professionals in action",
    src: "/images/WhatsApp-Image-2023-05-04-at-11.35.54-1.jpeg",
  },
  {
    title: "Solar Panel Wash",
    desc: "Thorough panel washing process",
    src: "/images/WhatsApp-Image-2023-05-04-at-11.35.55-1.jpeg",
  },
  {
    title: "Large Installation",
    desc: "Industrial solar array maintenance",
    src: "/images/WhatsApp-Image-2023-05-23-at-13.09.17-1.jpeg",
  },
  {
    title: "Completed Project",
    desc: "Spotless panels post-cleaning",
    src: "/images/WhatsApp-Image-2024-01-09-at-5.22.20-PM-1170x658-1.jpeg",
  },
  {
    title: "Solar Site Visit",
    desc: "Pre-cleaning assessment and inspection",
    src: "/images/IMG_4052-scaled.jpg",
  },
  {
    title: "Panel Maintenance",
    desc: "Regular maintenance service",
    src: "/images/2-1024x461-1.jpg",
  },
];

const videos = [
  {
    ytId: "F92gBXGelHA",
    title: "Solar Installed But Bill Same Why?",
    desc: "Dirty panels silently drain your solar returns. Find out why generation drops.",
  },
  {
    ytId: "GrGUj3lFCao",
    title: "Regular Cleaning = Better Generation",
    desc: "How professional cleaning extends panel life and maximises power output.",
  },
  {
    ytId: "l_lGwahHfE4",
    title: "SunTech vs Other Cleaners",
    desc: "See what sets SunTech apart from ordinary solar cleaning providers.",
  },
  {
    ytId: "aaDYHHTNqM0",
    title: "Dirty Panels = Low Power Generation",
    desc: "Dust and grime cut output drastically here's what you're losing every day.",
  },
  {
    ytId: "5PrAWqg1-Ig",
    title: "Rain vs Manual Cleaning",
    desc: "Rainfall alone cannot clean your panels. Watch the real difference.",
  },
  {
    ytId: "sRIczpJdmUI",
    title: "Does Rain Clean Solar Panels?",
    desc: "The myth busted why rainwater leaves panels dirtier than before.",
  },
  {
    ytId: "A4UHRyBKLkM",
    title: "Rain & Sprinklers Only Wet, Not Clean",
    desc: "Water without the right technique leaves residue and reduces efficiency.",
  },
  {
    ytId: "DSSFlKNXlN8",
    title: "Wrong Cleaning Can Damage Your System",
    desc: "Cleaning is essential, but the wrong method can harm your solar investment.",
  },
  {
    ytId: "XWs4xGma5mk",
    title: "Bird Droppings Damage Solar Panels",
    desc: "How bird droppings create hot spots and reduce panel performance over time.",
  },
  {
    ytId: "OQS9UkPgQN4",
    title: "Dirty Panels = Dead Investment",
    desc: "Don't let grime destroy the ROI on your solar system.",
  },
  {
    ytId: "cyGbZQY7jxw",
    title: "Sprinkler Solar Cleaning Smart Solution",
    desc: "A time-saving sprinkler-based cleaning solution for large solar arrays.",
  },
  {
    ytId: "leLNysDAGG0",
    title: "Dirty Panels = Low Output (Like a Dirty AC)",
    desc: "Just like an AC loses cooling when dirty, solar panels lose power clean them regularly.",
  },
  {
    ytId: "buPZ9bYUWRg",
    title: "Book Solar Cleaning in 3 Taps",
    desc: "Your entire solar cleaning journey made simple with the SunTech app.",
  },
  {
    ytId: "cTqnhabyfes",
    title: "BOGO Offer Download the App",
    desc: "Exclusive Buy-One-Get-One offer for Vadodara customers on the SunTech app.",
  },
  {
    ytId: "tcSysTSdP1k",
    title: "Rain vs Manual Cleaning Part 2",
    desc: "Another look at why manual cleaning always beats waiting for rain to do the job.",
  },
];

export default function GalleryPage() {
  return (
    <div>
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Gallery &amp; Videos</h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-blue-200">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-yellow-400 font-semibold">Gallery &amp; Videos</span>
          </nav>
        </div>
      </section>

      {/* 2. Cleaning Projects Across Vadodara */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="section-badge justify-center">
              <Sun className="w-4 h-4 text-primary" /> Visual Portfolio
            </span>
            <h2 className="section-title">Cleaning Projects Across Vadodara</h2>
            <p className="section-subtitle">
              Take a look at our recent rooftop, commercial, and industrial panel wash operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.title}
                className="gallery-item group rounded-2xl overflow-hidden shadow-md relative aspect-[4/3]"
              >
                <img
                  alt={proj.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={proj.src}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent flex flex-col justify-end p-5">
                  <h4 className="text-white font-bold text-lg mb-1">{proj.title}</h4>
                  <p className="text-blue-200 text-xs sm:text-sm">{proj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Promo Video */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="rounded-3xl overflow-hidden shadow-xl max-w-4xl mx-auto ring-1 ring-gray-200">
            <video
              src="/images/Promo-Final-1.mp4"
              controls
              playsInline
              poster="/images/IMG_5255-768x432-1.jpg"
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. SunTech Videos Section (15 YouTube Embeds) */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="section-badge justify-center">
              <Sun className="w-4 h-4 text-primary" /> Educational &amp; Live Action
            </span>
            <h2 className="section-title">SunTech Videos</h2>
            <p className="section-subtitle">
              Learn why solar panel maintenance is essential and watch our team deliver peak performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((vid) => (
              <div
                key={vid.ytId}
                className="card overflow-hidden flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <div>
                  <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100">
                    <iframe
                      src={`https://www.youtube.com/embed/${vid.ytId}`}
                      title={vid.title}
                      className="w-full h-full"
                      allowFullScreen
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg leading-snug">
                    {vid.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {vid.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Banner */}
      <section className="py-20 bg-primary-dark text-white text-center">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Boost Your Solar Efficiency?
          </h2>
          <p className="text-blue-200 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Book a cleaning appointment with Vadodara&apos;s No.1 trusted team today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link
              href="/contact-us"
              className="bg-yellow-400 text-primary-dark px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition-colors flex items-center gap-2 shadow-lg"
            >
              <span>Book An Appointment</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+919998546315"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call +91 9998546315</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
