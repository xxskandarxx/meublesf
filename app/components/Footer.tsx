"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 bg-neutral-900 text-neutral-300">
      <div className="mx-auto w-full px-3 py-10 sm:px-5 lg:px-6">

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

          {/* Brand */}
          <div>
            <h2 className="text-white text-lg font-bold mb-2">
              MeublesF
            </h2>
            <p className="text-sm text-neutral-400 max-w-xs">
              Modern furniture shopping experience built for comfort and style.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-white font-semibold mb-2">Quick Links</p>
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/shop" className="hover:text-white">Shop</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/about" className="hover:text-white">About</Link>
          </div>

          
          {/* <div className="flex flex-col gap-2 text-sm">
            <p className="text-white font-semibold mb-2">Legal</p>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div> */}
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-700 mt-8 pt-6 text-center text-xs text-neutral-500">
          © 2026 MeublesF. All rights reserved.
        </div>
      </div>
    </footer>
  );
}