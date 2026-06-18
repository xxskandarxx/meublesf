import Link from "next/link";
import { getCart } from "../../features/cart/services";
import CartClient from "../components/CartClient";

export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string; error?: string }>;
}) {
  const { submitted, error } = await searchParams;
  const cart = await getCart();

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 px-4 py-10">

      <div className="mx-auto max-w-6xl flex flex-col gap-6">

        {/* HEADER */}
        <div className="flex flex-col gap-3">

          <div>
            <p className="text-xs tracking-[0.35em] text-amber-700 uppercase">
              Your cart
            </p>

            <h1 className="text-3xl font-semibold">
              Review your selected furniture
            </h1>
          </div>

          {/* 🌟 CONTINUE SHOPPING BUTTON (NEW) */}
          <Link
            href="/shop"
            className="group relative inline-flex w-fit items-center gap-2 px-5 py-2.5 rounded-full bg-white border shadow-sm overflow-hidden transition hover:shadow-md"
          >
            {/* glow background */}
            <span className="absolute inset-0 bg-gradient-to-r from-amber-200/40 via-orange-200/40 to-emerald-200/40 opacity-0 group-hover:opacity-100 transition" />

            {/* arrow */}
            <span className="relative text-stone-700 font-medium">
              ← Continue shopping
            </span>

            {/* small animated dot */}
            <span className="relative w-2 h-2 rounded-full bg-amber-500 group-hover:scale-125 transition" />
          </Link>
        </div>

        {/* CART CLIENT */}
        <CartClient cart={cart} submitted={submitted} error={error} />
      </div>
    </main>
  );
}