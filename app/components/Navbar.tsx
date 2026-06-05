"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white shadow-sm backdrop-blur">
      <div className="flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold tracking-wide"
        >
          MeublesF
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-black text-neutral-600">Home</Link>
          <Link href="/shop" className="hover:text-black text-neutral-600">Shop</Link>
          <Link href="/contact" className="hover:text-black text-neutral-600">Contact</Link>
          <Link href="/about" className="hover:text-black text-neutral-600">About</Link>
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="flex flex-col gap-4 border-t border-neutral-200 bg-white px-4 pb-4 md:hidden sm:px-6">
          <Link onClick={() => setOpen(false)} href="/">Home</Link>
          <Link onClick={() => setOpen(false)} href="/shop">Shop</Link>
          <Link onClick={() => setOpen(false)} href="/contact">Contact</Link>
          <Link onClick={() => setOpen(false)} href="/about">About</Link>
        </div>
      )}
    </header>
  );
}