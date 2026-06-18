"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  clearCartAction,
  updateCartQuantityAction,
} from "../../features/cart/actions";

export default function CartClient({
  cart,
  submitted,
  error,
}: {
  cart: any[];
  submitted?: string;
  error?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+216");
  const [address, setAddress] = useState("");

  const subtotal = useMemo(
    () => cart.reduce((s, i) => s + i.price * i.quantity, 0),
    [cart]
  );

  const orderLines = useMemo(
    () =>
      cart
        .map(
          (i) =>
            `• ${i.quantity} x ${i.name} — $${i.price * i.quantity}`
        )
        .join("\n"),
    [cart]
  );

  const whatsappText = useMemo(() => {
    return `🪑 MeublesF ORDER

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}

━━━━━━━━━━━━━━
🛒 ITEMS:
${orderLines || "No items"}

💰 TOTAL: $${subtotal}

━━━━━━━━━━━━━━`;
  }, [name, phone, address, orderLines, subtotal]);

  const whatsappHref = `https://wa.me/21697221218?text=${encodeURIComponent(
    whatsappText
  )}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 px-4 py-10">

      <div className="mx-auto max-w-6xl flex flex-col gap-10">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <p className="text-xs tracking-[0.4em] text-amber-700 uppercase">
            MeublesF Checkout
          </p>
          <h1 className="text-4xl font-semibold">
            Complete your order ✨
          </h1>
          <p className="text-stone-600">
            Everything you need in one beautiful summary
          </p>
        </div>

        {/* STATUS */}
        {submitted && (
          <div className="p-4 rounded-2xl bg-green-50 border text-green-700">
            Order ready ✔
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border text-red-700">
            Missing required info
          </div>
        )}

        {cart.length === 0 ? (
          <div className="p-10 bg-white border rounded-2xl text-center">
            Your cart is empty
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">

            {/* LEFT — CART ITEMS */}
            <section className="bg-white border rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between mb-5">
                <h2 className="font-semibold text-lg">Your Items</h2>

                <form action={clearCartAction}>
                  <button className="text-sm px-4 py-2 rounded-full bg-amber-100 hover:bg-amber-200">
                    Clear
                  </button>
                </form>
              </div>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 border rounded-2xl p-4"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100">
                      <Image
                        src={item.imageUrl || "/placeholder.png"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-stone-500">
                        ${item.price}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <form action={updateCartQuantityAction}>
                          <input type="hidden" name="productId" value={item.productId} />
                          <input type="hidden" name="quantity" value={item.quantity - 1} />
                          <button className="w-8 h-8 rounded-full border">−</button>
                        </form>

                        <span>{item.quantity}</span>

                        <form action={updateCartQuantityAction}>
                          <input type="hidden" name="productId" value={item.productId} />
                          <input type="hidden" name="quantity" value={item.quantity + 1} />
                          <button className="w-8 h-8 rounded-full border">+</button>
                        </form>

                        <form action={updateCartQuantityAction}>
                          <input type="hidden" name="productId" value={item.productId} />
                          <input type="hidden" name="quantity" value={0} />
                          <button className="ml-auto text-sm text-red-500">
                            Remove
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* RIGHT — UNIQUE CHECKOUT CARD */}
            <aside className="relative">

              <div className="sticky top-6 rounded-[2.5rem] bg-white/70 backdrop-blur-xl border shadow-2xl p-6 overflow-hidden">

                {/* ART BACKGROUND */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-300/30 blur-3xl rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-300/30 blur-3xl rounded-full" />

                <h2 className="text-lg font-semibold">
                  Final Step 
                </h2>

                <p className="text-sm text-stone-600 mb-4">
                  Fill details → send instantly
                </p>

                {/* TOTAL */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-stone-900 to-stone-700 text-white">
                  <p className="text-xs uppercase text-stone-300">
                    Total
                  </p>
                  <p className="text-2xl font-bold">
                    ${subtotal}
                  </p>
                </div>

                {/* FORM */}
                <div className="mt-5 space-y-3">

                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 rounded-xl border"
                  />

                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+216 phone number"
                    className="w-full px-3 py-2 rounded-xl border"
                  />

                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Delivery address"
                    className="w-full px-3 py-2 rounded-xl border"
                  />
                </div>

                {/* WHATSAPP BUTTON ONLY */}
                <a
                  href={whatsappHref}
                  target="_blank"
                  className="mt-6 flex items-center justify-center gap-2 rounded-2xl py-3 font-semibold text-white bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 hover:scale-[1.02] transition"
                >
                  🟢 Send Order via WhatsApp
                </a>

                <p className="text-xs text-center text-stone-500 mt-2">
                  Instant order confirmation
                </p>
              </div>
            </aside>

          </div>
        )}
      </div>
    </main>
  );
}