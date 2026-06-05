import Image from "next/image";
import Link from "next/link"

import { getProducts } from "../features/products/services"

import HeroSlider from "./components/HeroSlider";

const Home = async () => {
  const products = await getProducts();

  return (
    <div className="space-y-16">
      <HeroSlider />
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
                Discover handpicked home products built for comfort, style, and sustainable living. Shop curated seating, tables, lighting, and decor for every room.
              </p>
            </div>

            
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
           
            <div className="grid gap-5">
              
              
              
              <div className="relative overflow-hidden rounded-[1.5rem] bg-stone-950 p-6 text-white">
              <div className="absolute inset-x-0 top-0 h-24 bg-orange-400/20 blur-3xl" />
              <div className="relative space-y-4">
                
                <h3 className="text-2xl font-semibold">Fast home delivery</h3>
                <p className="text-sm leading-6 text-stone-200">
                   Receive your order quickly with careful packaging and reliable shipping across the country.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[1.5rem] bg-stone-950 p-6 text-white">
              <div className="absolute inset-x-0 top-0 h-24 bg-orange-400/20 blur-3xl" />
              <div className="relative space-y-4">
                
                <h3 className="text-2xl font-semibold">Beautiful details</h3>
                <p className="text-sm leading-6 text-stone-200">
                  Curated materials, crisp lines, and finishes that elevate every room.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[1.5rem] bg-stone-950 p-6 text-white">
              <div className="absolute inset-x-0 top-0 h-24 bg-orange-400/20 blur-3xl" />
              <div className="relative space-y-4">
                
                <h3 className="text-2xl font-semibold">Comfort first</h3>
                <p className="text-sm leading-6 text-stone-200">
                  Soft shapes, durable materials, and designs that feel relaxed from day one.
                </p>
              </div>
            </div>
              
              
              
            </div>
          </div>
        </div>
      </section>

      

      <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_35px_100px_-60px_rgba(15,23,42,0.15)] sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-amber-600">Featured products</p>
            <h3 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">Shop our top-rated furniture for a premium home look.</h3>
            <p className="text-base leading-7 text-stone-600">
              From modern lounge chairs to sculptural lighting, each item is picked to create a cohesive and inspiring interior.
            </p>
          </div>
          <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700">
            Browse products
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article key={product.name} className="group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-stone-50 p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 overflow-hidden rounded-[1.4rem] bg-stone-100">
                <Image
                  src={product.imageUrl.trim()}
                  alt={product.name}
                  width={600}
                  height={400}
                  unoptimized
                  className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2 px-1 pb-1">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-700">{product.category}</p>
                <h3 className="text-lg font-semibold text-stone-950">{product.name}</h3>
                <p className="text-sm font-semibold text-stone-900">${product.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
