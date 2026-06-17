import Image from "next/image";
import Link from "next/link";

import { getProducts } from "../features/products/services";
import HeroSlider from "./components/HeroSlider";

const Home = async () => {
  const products = await getProducts();

  return (
    <div className="space-y-16">
      <HeroSlider />

      {/* HERO SECTION */}
      <section className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_50px_120px_-55px_rgba(15,23,42,0.2)]">
        <div className="grid gap-10 px-6 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-16">

          <div className="flex flex-col justify-center gap-6">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
              New collection
            </span>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
                Elegant furniture for modern homes, designed to feel warm and effortless.
              </h1>

              <p className="max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
                Discover handpicked home products built for comfort, style, and sustainable living.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            <div className="relative overflow-hidden rounded-[1.5rem] bg-stone-950 p-6 text-white">
              <div className="absolute inset-x-0 top-0 h-24 bg-orange-400/20 blur-3xl" />
              <div className="relative space-y-4">
                <h3 className="text-2xl font-semibold">Fast home delivery</h3>
                <p className="text-sm leading-6 text-stone-200">
                  Receive your order quickly with safe packaging.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] bg-stone-950 p-6 text-white">
              <div className="absolute inset-x-0 top-0 h-24 bg-orange-400/20 blur-3xl" />
              <div className="relative space-y-4">
                <h3 className="text-2xl font-semibold">Beautiful details</h3>
                <p className="text-sm leading-6 text-stone-200">
                  Curated materials and clean design.
                </p>
              </div>
            </div>
            

          </div>

        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_35px_100px_-60px_rgba(15,23,42,0.15)] sm:p-10">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-amber-600">
              Featured products
            </p>
            <h3 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
              Shop our top-rated furniture
            </h3>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white hover:bg-stone-700"
          >
            Browse products
          </Link>
        </div>

        {/* PRODUCT GRID */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

          {products.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-stone-50 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="mb-4 overflow-hidden rounded-[1.4rem] bg-stone-100">

                {/* ✅ FIXED IMAGE SAFETY */}
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={600}
                    height={400}
                    unoptimized
                    className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-44 w-full flex items-center justify-center bg-stone-200 text-stone-500 text-sm">
                    No image
                  </div>
                )}

              </div>

              <div className="space-y-2 px-1 pb-1">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-700">
                  {product.category}
                </p>
                <h3 className="text-lg font-semibold text-stone-950">
                  {product.name}
                </h3>
                <p className="text-sm font-semibold text-stone-900">
                  ${product.price}
                </p>
              </div>

            </article>
          ))}

        </div>

      </section>
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-stone-50 to-white px-6 py-20 sm:px-10">

  {/* soft background glow */}
  <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-200/30 blur-3xl" />
  <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-orange-200/20 blur-3xl" />

  <div className="relative mx-auto max-w-6xl">

    {/* header */}
    <div className="text-center space-y-5 mb-14">
      <p className="text-sm uppercase tracking-[0.35em] text-amber-600">
        Why choose us
      </p>

      <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-stone-950">
        Crafted for comfort & modern living
      </h2>

      <p className="mx-auto max-w-2xl text-stone-600 leading-7">
        We don’t just sell furniture — we design spaces that feel warm, minimal, and timeless.
      </p>
    </div>

    {/* feature layout (asymmetrical, modern) */}
    <div className="grid gap-6 lg:grid-cols-3">

      {/* big highlight card */}
      <div className="lg:col-span-2 rounded-[2rem] bg-stone-950 p-10 text-white shadow-xl">
        <h3 className="text-2xl font-semibold">Built for everyday living</h3>
        <p className="mt-4 text-stone-300 leading-7">
          Every product is carefully selected to balance comfort, durability, and aesthetic harmony in your home.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-white/10 p-5">
            <p className="font-semibold">Premium materials</p>
            <p className="text-sm text-stone-300 mt-1">
              Wood, fabric & finishes chosen for longevity.
            </p>
          </div>

          <div className="rounded-xl bg-white/10 p-5">
            <p className="font-semibold">Minimal design</p>
            <p className="text-sm text-stone-300 mt-1">
              Clean aesthetics that fit any interior.
            </p>
          </div>
        </div>
      </div>

      {/* side info stack */}
      <div className="flex flex-col gap-6">

        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-600">
            Fast delivery
          </p>
          <p className="mt-3 text-stone-700">
            Delivered quickly and safely to your doorstep.
          </p>
        </div>

        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <p className="text-sm uppercase tracking-[0.2em] text-orange-600">
            Trusted quality
          </p>
          <p className="mt-3 text-stone-700">
            Every product is tested for durability and comfort.
          </p>
        </div>

        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-600">
            Support
          </p>
          <p className="mt-3 text-stone-700">
            Friendly help whenever you need assistance.
          </p>
        </div>

      </div>

    </div>
  </div>
</section>
<section className="relative overflow-hidden bg-white px-6 py-24 sm:px-10">

  {/* soft abstract background */}
  <div className="absolute inset-0">
    <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
    <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-6xl grid gap-12 lg:grid-cols-2 lg:items-center">

    {/* LEFT TEXT SIDE */}
    <div className="space-y-6">

      <p className="text-sm uppercase tracking-[0.35em] text-amber-600">
        Start today
      </p>

      <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-stone-950 leading-tight">
        Build a home that feels like you
      </h2>

      <p className="text-stone-600 leading-7 max-w-xl">
        Explore modern furniture designed to bring balance, comfort, and personality into every room of your home.
      </p>

      {/* CTA BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">

        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-full bg-stone-950 px-7 py-3 text-sm font-semibold text-white hover:bg-stone-800 transition"
        >
          Shop collection
        </Link>

        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-full border border-stone-300 px-7 py-3 text-sm font-semibold text-stone-900 hover:bg-stone-100 transition"
        >
          Browse all products
        </Link>

      </div>

      {/* small trust line */}
      <p className="text-xs text-stone-400 pt-2">
        Free delivery • Secure payment • Premium quality
      </p>

    </div>

    {/* RIGHT VISUAL SIDE */}
    <div className="relative">

      <div className="grid gap-5 sm:grid-cols-2">

        {/* floating card 1 */}
        <div className="rounded-[2rem] bg-stone-950 p-6 text-white shadow-xl hover:-translate-y-1 transition">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-400">
            Minimal design
          </p>
          <p className="mt-3 text-sm text-stone-300">
            Clean aesthetics that fit any modern space.
          </p>
        </div>

        {/* floating card 2 */}
        <div className="rounded-[2rem] bg-white border border-stone-200 p-6 shadow-sm hover:-translate-y-1 transition">
          <p className="text-sm uppercase tracking-[0.2em] text-orange-600">
            Built to last
          </p>
          <p className="mt-3 text-sm text-stone-600">
            Durable materials for everyday use.
          </p>
        </div>

        {/* floating card 3 (full width feel) */}
        <div className="sm:col-span-2 rounded-[2rem] bg-amber-50 p-6 shadow-sm hover:-translate-y-1 transition">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-700">
            Fast delivery
          </p>
          <p className="mt-3 text-sm text-stone-700">
            Get your furniture delivered safely and quickly to your home.
          </p>
        </div>

      </div>

    </div>

  </div>
</section>
<section className="relative overflow-hidden bg-white px-6 py-20 sm:px-10">

  {/* background */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_60%)]" />
  <div className="absolute -top-40 left-10 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl" />
  <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl" />

  <div className="relative mx-auto max-w-6xl space-y-12">

    {/* HEADER */}
    <div className="text-center space-y-4">
      <h2 className="text-3xl sm:text-4xl font-semibold text-stone-950">
        Let’s stay connected
      </h2>
      <p className="text-stone-600 max-w-xl mx-auto">
        Reach us instantly or follow for updates, offers, and inspiration.
      </p>
    </div>

    {/* GRID */}
    <div className="grid gap-6 md:grid-cols-3">

      {/* WHATSAPP */}
      <a
        href="https://wa.me/21697221218"
        target="_blank"
        className="group relative overflow-hidden rounded-[2rem] bg-green-500 p-8 text-white shadow-xl hover:-translate-y-2 transition"
      >
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        {/* ICON */}
        <div className="flex items-center gap-3">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.52 3.48A11.91 11.91 0 0 0 12.06 0C5.51 0 .17 5.34.17 11.9c0 2.09.55 4.14 1.59 5.93L0 24l6.34-1.66a11.88 11.88 0 0 0 5.72 1.46h.01c6.55 0 11.89-5.34 11.89-11.9a11.8 11.8 0 0 0-3.44-8.42z"/>
          </svg>
          <p className="text-sm uppercase tracking-[0.25em] opacity-90">
            WhatsApp
          </p>
        </div>

        <h3 className="mt-4 text-xl font-semibold">Instant contact</h3>
        <p className="mt-2 text-sm text-white/80">
          Chat with us directly for fast support.
        </p>
      </a>

      {/* FACEBOOK */}
      <a
        href="https://www.facebook.com/profile.php?id=100064099626744"
        target="_blank"
        className="group relative overflow-hidden rounded-[2rem] bg-blue-600 p-8 text-white shadow-lg hover:-translate-y-2 transition"
      >
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        {/* ICON */}
        <div className="flex items-center gap-3">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12a10 10 0 1 0-11.56 9.87v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.88h-2.34v6.99A10 10 0 0 0 22 12z"/>
          </svg>
          <p className="text-sm uppercase tracking-[0.25em] opacity-90">
            Facebook
          </p>
        </div>

        <h3 className="mt-4 text-xl font-semibold">Community updates</h3>
        <p className="mt-2 text-sm text-white/80">
          See posts, offers and announcements.
        </p>
      </a>

      {/* INSTAGRAM */}
      <a
        href="https://www.instagram.com/"
        target="_blank"
        className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 p-8 text-white shadow-lg hover:-translate-y-2 transition"
      >
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        {/* ICON */}
        <div className="flex items-center gap-3">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zm0 2A3.76 3.76 0 0 0 4 7.75v8.5A3.76 3.76 0 0 0 7.75 20h8.5A3.76 3.76 0 0 0 20 16.25v-8.5A3.76 3.76 0 0 0 16.25 4h-8.5z"/>
            <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
            <circle cx="17.5" cy="6.5" r="1.2"/>
          </svg>
          <p className="text-sm uppercase tracking-[0.25em] opacity-90">
            Instagram
          </p>
        </div>

        <h3 className="mt-4 text-xl font-semibold">Inspiration feed</h3>
        <p className="mt-2 text-sm text-white/80">
          Discover new styles and ideas daily.
        </p>
      </a>

    </div>

  </div>
</section>

    </div>
  );
};

export default Home;