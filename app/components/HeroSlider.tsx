"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    title: "Elegant furniture for modern homes",
    subtitle: "Designed for comfort, simplicity, and beauty.",
    image:"/hero/slide1.jpg"
  },
  {
    title: "Build your dream living space",
    subtitle: "Premium furniture made for everyday life.",
    image:"/hero/slide2.jpg"
  },
  {
    title: "Minimal design. Maximum comfort.",
    subtitle: "Discover curated home essentials.",
    image:"/hero/slide3.jpg"
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      
      {/* Background */}
      <Image
  src={slides[index].image}
  alt={slides[index].title}
  fill
  priority
  className="object-cover"
/>
<div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center text-center px-6 text-white">
        
        <h1 className="text-3xl font-semibold sm:text-5xl max-w-3xl transition-all duration-700">
          {slides[index].title}
        </h1>

        <p className="mt-4 text-sm sm:text-lg text-stone-200 max-w-xl">
          {slides[index].subtitle}
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-stone-900 hover:bg-stone-200 transition"
        >
          Shop Now
        </Link>
      </div>

      {/* dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}