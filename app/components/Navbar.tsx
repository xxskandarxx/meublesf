"use client";

import { useState } from "react";
import Link from "next/link";

function getCartCountFromCookie() {
  if (typeof document === "undefined") return 0;

  const match = document.cookie.match(/(?:^|;\s*)cartCount=(\d+)/);
  return match ? Number(match[1]) : 0;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const cartCount = getCartCountFromCookie();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white shadow-sm backdrop-blur">
      <div className="mx-auto flex h-20 w-full items-center justify-between px-3 sm:px-5 lg:px-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold tracking-wide"
        >
          MeublesF
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-black text-neutral-600">Home</Link>
          <Link href="/shop" className="hover:text-black text-neutral-600">Shop</Link>
          <Link href="/contact" className="hover:text-black text-neutral-600">Contact</Link>
          <Link href="/about" className="hover:text-black text-neutral-600">About</Link>
          <Link href="/cart" className="relative ml-2 inline-flex items-center text-neutral-700 hover:text-black" aria-label="Cart">
            🛒
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-600 px-1 text-[11px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Button */}
        <div className="flex items-center gap-3 md:hidden">
          <Link href="/cart" className="relative inline-flex items-center text-xl" aria-label="Cart">
            🛒
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-600 px-1 text-[11px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
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