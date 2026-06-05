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
    <main className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-700">Your cart</p>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">Review your selected furniture</h1>
          <p className="text-stone-600">Adjust quantities, keep what you love, and continue shopping.</p>
        </header>

        {submitted && (
          <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 shadow-sm">
            Your order request was received. We’ll review it in the admin dashboard later.
          </section>
        )}

        {error && (
          <section className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-rose-700 shadow-sm">
            Please complete all fields before submitting your order request.
          </section>
        )}

        {cart.length === 0 ? (
          <section className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
            <p className="text-stone-600">Your cart is empty.</p>
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-stone-900">Items in your cart</h2>
                <form action={clearCartAction}>
                  <button type="submit" className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100">Clear cart</button>
                </form>
              </div>
              <div className="space-y-4">
                {cart.map((item) => (
                  <article key={item.productId} className="flex gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4">
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
                            <button type="submit" className="h-8 w-8 rounded-full border border-stone-300 bg-white text-lg text-stone-700 hover:bg-stone-100">−</button>
                          </form>
                          <span className="min-w-8 text-center text-sm font-semibold text-stone-900">{item.quantity}</span>
                          <form action={updateCartQuantityAction}>
                            <input type="hidden" name="productId" value={item.productId} />
                            <input type="hidden" name="quantity" value={item.quantity + 1} />
                            <button type="submit" className="h-8 w-8 rounded-full border border-stone-300 bg-white text-lg text-stone-700 hover:bg-stone-100">+</button>
                          </form>
                        </div>
                        <form action={updateCartQuantityAction}>
                          <input type="hidden" name="productId" value={item.productId} />
                          <input type="hidden" name="quantity" value={0} />
                          <button type="submit" className="text-sm text-rose-600 hover:text-rose-700">Remove</button>
                        </form>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="rounded-3xl border border-stone-200 bg-stone-900 p-6 text-white shadow-sm">
              <h2 className="text-xl font-semibold">Order summary</h2>
              <p className="mt-2 text-sm text-stone-300">Add your contact details and send the order directly to our WhatsApp line.</p>

              <form action={submitCartOrderAction} className="mt-6 space-y-4 rounded-2xl border border-stone-700 bg-stone-800 p-4 text-sm text-stone-100">
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-stone-300">Full name</label>
                  <input name="name" required className="w-full rounded-xl border border-stone-600 bg-stone-900 px-3 py-2 text-white outline-none ring-0" />
                </div>
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-stone-300">Phone number</label>
                  <input type="tel" name="phone" required className="w-full rounded-xl border border-stone-600 bg-stone-900 px-3 py-2 text-white outline-none ring-0" placeholder="+216 97 221 218" />
                </div>
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-stone-300">Address</label>
                  <input name="address" required className="w-full rounded-xl border border-stone-600 bg-stone-900 px-3 py-2 text-white outline-none ring-0" placeholder="Your delivery address" />
                </div>
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-stone-300">Email</label>
                  <input type="email" name="email" required className="w-full rounded-xl border border-stone-600 bg-stone-900 px-3 py-2 text-white outline-none ring-0" />
                </div>
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-stone-300">Notes</label>
                  <textarea name="message" rows={4} required className="w-full rounded-xl border border-stone-600 bg-stone-900 px-3 py-2 text-white outline-none ring-0" placeholder="Tell us about your preferred finish, delivery needs, or special requests." />
                </div>
                <button type="submit" className="w-full rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-400">Submit order request</button>
              </form>

              <div className="mt-6 rounded-2xl border border-stone-700 bg-stone-800 p-4 text-sm text-stone-100">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Contact us</h3>
                <div className="mt-3 space-y-3">
                  <a href="https://wa.me/21697221218" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-3 text-emerald-100 transition hover:bg-emerald-500/20">
                    <span className="text-xl">💬</span>
                    <span>WhatsApp: +216 97 221 218</span>
                  </a>
                  <a href="https://instagram.com/meublesf" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-pink-500/30 bg-pink-500/10 px-3 py-3 text-pink-100 transition hover:bg-pink-500/20">
                    <span className="text-xl">📸</span>
                    <span>Instagram: @meublesf</span>
                  </a>
                  <a href="https://facebook.com/meublesf" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-3 py-3 text-blue-100 transition hover:bg-blue-500/20">
                    <span className="text-xl">👍</span>
                    <span>Facebook: MeublesF</span>
                  </a>
                </div>
              </div>

              <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400">
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
