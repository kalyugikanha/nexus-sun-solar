"use client";

import React, { useEffect, useState, useRef } from "react";
import { Sun, Zap, Users, Award } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  endVal: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: <Sun className="w-8 h-8" />,
    iconBg: "text-yellow-500",
    iconColor: "text-yellow-500",
    endVal: 7554,
    suffix: "+",
    label: "Panels Cleaned",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    iconBg: "text-blue-500",
    iconColor: "text-blue-500",
    endVal: 4034,
    suffix: "+",
    label: "kW's Serviced",
  },
  {
    icon: <Users className="w-8 h-8" />,
    iconBg: "text-green-500",
    iconColor: "text-green-500",
    endVal: 1912,
    suffix: "+",
    label: "Happy Customers",
  },
  {
    icon: <Award className="w-8 h-8" />,
    iconBg: "text-purple-500",
    iconColor: "text-purple-500",
    endVal: 11,
    suffix: "+",
    label: "Years Experience",
  },
];

export default function StatsCounter() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 40;
          const stepTime = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);

            setCounts(
              stats.map((s) => Math.round(s.endVal * easeOutProgress))
            );

            if (currentStep >= steps) {
              clearInterval(timer);
              setCounts(stats.map((s) => s.endVal));
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-[60px] bg-gradient-to-br from-blue-50 to-white">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((item, idx) => (
            <div key={item.label} className="text-center group">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-xl mb-6 mx-auto transition-transform duration-300 group-hover:scale-110 ${item.iconColor}`}
              >
                {item.icon}
              </div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
                {counts[idx].toLocaleString()}
                {item.suffix}
              </p>
              <p className="text-gray-500 font-medium mt-2 text-sm sm:text-base">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
