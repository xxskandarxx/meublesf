import Image from "next/image";

import { clearCartAction, submitCartOrderAction, updateCartQuantityAction } from "../../features/cart/actions";
import { getCart } from "../../features/cart/services";

export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string; error?: string }>;
}) {
  const { submitted, error } = await searchParams;
  const cart = await getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderLines = cart
    .map((item) => `• ${item.quantity} x ${item.name} — $${item.price * item.quantity}`)
    .join("\n");
  const whatsappMessage = `Hello MeublesF! I would like to order:\n${orderLines || "No items selected"}\n\nTotal: $${subtotal}`;
  const whatsappHref = `https://wa.me/21697221218?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fffaf6_0%,#f8f1ea_45%,#f3ede6_100%)] px-4 py-10 text-stone-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-700">Your cart</p>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">Review your selected furniture</h1>
          <p className="text-stone-600">Adjust quantities, keep what you love, and continue shopping.</p>
        </header>

        {submitted && (
          <section className="rounded-3xl border border-emerald-200 bg-[linear-gradient(135deg,#ecfdf5_0%,#f0fdf4_100%)] p-4 text-emerald-800 shadow-sm">
            Your order request was received. We’ll review it in the admin dashboard later.
          </section>
        )}

        {error && (
          <section className="rounded-3xl border border-rose-200 bg-[linear-gradient(135deg,#fff1f2_0%,#fff7f8_100%)] p-4 text-rose-700 shadow-sm">
            Please complete all fields before submitting your order request.
          </section>
        )}

        {cart.length === 0 ? (
          <section className="rounded-3xl border border-stone-200 bg-white/90 p-8 shadow-sm">
            <p className="text-stone-600">Your cart is empty.</p>
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-3xl border border-stone-200 bg-white/90 p-4 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-stone-900">Items in your cart</h2>
                <form action={clearCartAction}>
                  <button type="submit" className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100">Clear cart</button>
                </form>
              </div>
              <div className="space-y-4">
                {cart.map((item) => (
                  <article key={item.productId} className="flex gap-4 rounded-2xl border border-stone-200 bg-[linear-gradient(135deg,#fffaf6_0%,#fff_100%)] p-4 shadow-sm">
                    <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-stone-200">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="80px"
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-base font-semibold text-stone-900">{item.name}</h2>
                          <p className="text-sm text-stone-500">${item.price} each</p>
                        </div>
                        <p className="text-sm font-semibold text-stone-900">${item.price * item.quantity}</p>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <form action={updateCartQuantityAction}>
                            <input type="hidden" name="productId" value={item.productId} />
                            <input type="hidden" name="quantity" value={item.quantity - 1} />
                            <button type="submit" className="h-8 w-8 rounded-full border border-stone-300 bg-white text-lg text-stone-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800">−</button>
                          </form>
                          <span className="min-w-8 text-center text-sm font-semibold text-stone-900">{item.quantity}</span>
                          <form action={updateCartQuantityAction}>
                            <input type="hidden" name="productId" value={item.productId} />
                            <input type="hidden" name="quantity" value={item.quantity + 1} />
                            <button type="submit" className="h-8 w-8 rounded-full border border-stone-300 bg-white text-lg text-stone-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800">+</button>
                          </form>
                        </div>
                        <form action={updateCartQuantityAction}>
                          <input type="hidden" name="productId" value={item.productId} />
                          <input type="hidden" name="quantity" value={0} />
                          <button type="submit" className="text-sm text-rose-500 transition hover:text-rose-700">Remove</button>
                        </form>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="rounded-3xl border border-stone-200 bg-[linear-gradient(180deg,#1f2937_0%,#111827_100%)] p-6 text-white shadow-sm">
              <h2 className="text-xl font-semibold">Order summary</h2>
              <p className="mt-2 text-sm text-stone-300">Add your contact details and send the order directly to our WhatsApp line.</p>

              <form action={submitCartOrderAction} className="mt-6 space-y-4 rounded-2xl border border-stone-700 bg-[linear-gradient(180deg,#111827_0%,#181f2b_100%)] p-4 text-sm text-stone-100 shadow-inner">
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-amber-200">Full name</label>
                  <input name="name" required className="w-full rounded-xl border border-stone-700 bg-stone-950/90 px-3 py-2 text-white placeholder:text-stone-400 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" />
                </div>
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-amber-200">Phone number</label>
                  <input type="tel" name="phone" required className="w-full rounded-xl border border-stone-700 bg-stone-950/90 px-3 py-2 text-white placeholder:text-stone-400 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" placeholder="+216 53 551 388" />
                </div>
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-amber-200">Address</label>
                  <input name="address" required className="w-full rounded-xl border border-stone-700 bg-stone-950/90 px-3 py-2 text-white placeholder:text-stone-400 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" placeholder="Your delivery address" />
                </div>
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-amber-200">Email</label>
                  <input type="email" name="email" required className="w-full rounded-xl border border-stone-700 bg-stone-950/90 px-3 py-2 text-white placeholder:text-stone-400 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" />
                </div>
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-amber-200">Notes</label>
                  <textarea name="message" rows={4} required className="w-full rounded-xl border border-stone-700 bg-stone-950/90 px-3 py-2 text-white placeholder:text-stone-400 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" placeholder="Tell us about your preferred finish, delivery needs, or special requests." />
                </div>
                <button type="submit" className="w-full rounded-full bg-[linear-gradient(135deg,#fbbf24_0%,#f59e0b_45%,#fb923c_100%)] px-4 py-3 text-sm font-semibold text-stone-950 shadow-sm transition hover:brightness-105">Submit order request</button>
              </form>

              <div className="mt-6 rounded-2xl border border-stone-700 bg-[linear-gradient(180deg,#1f2937_0%,#111827_100%)] p-4 text-sm text-stone-100 shadow-inner">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Contact us</h3>
                <div className="mt-3 space-y-3">
                  <a href="https://wa.me/21697221218" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-[linear-gradient(135deg,rgba(16,185,129,0.16),rgba(5,150,105,0.22))] px-3 py-3 text-emerald-100 transition hover:brightness-110">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-xl shadow-inner">💬</span>
                    <span>WhatsApp: +216 97 221 218</span>
                  </a>
                  <a href="https://instagram.com/meublesf" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-pink-400/30 bg-[linear-gradient(135deg,rgba(236,72,153,0.16),rgba(192,38,211,0.18))] px-3 py-3 text-pink-100 transition hover:brightness-110">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pink-400/15 text-xl shadow-inner">📸</span>
                    <span>Instagram: @meublesf</span>
                  </a>
                  <a href="https://facebook.com/meublesf" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-sky-400/30 bg-[linear-gradient(135deg,rgba(56,189,248,0.14),rgba(59,130,246,0.18))] px-3 py-3 text-sky-100 transition hover:brightness-110">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/15 text-xl shadow-inner">👍</span>
                    <span>Facebook: MeublesF</span>
                  </a>
                </div>
              </div>

              <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#34d399_0%,#10b981_45%,#059669_100%)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-105">
                <span>🟢</span>
                Send order summary on WhatsApp
              </a>
              <div className="mt-6 space-y-3 text-sm text-stone-200">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <strong>${subtotal}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <strong>Free</strong>
                </div>
              </div>
              <div className="mt-6 border-t border-stone-700 pt-4">
                <div className="flex items-center justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>${subtotal}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
