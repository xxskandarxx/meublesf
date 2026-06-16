"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/dashboard" },
  { name: "Products", href: "/dashboard/products" },
  
  
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "flex h-10 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100",
              {
                "bg-gray-200 text-black": isActive,
                "text-gray-600": !isActive,
              }
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}