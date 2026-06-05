export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-amber-700">About us</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">Crafted furniture, warm interiors, and a thoughtful shopping experience.</h1>
          <p className="max-w-2xl text-lg text-stone-600">MeublesF is a contemporary furniture store focused on comfort, simplicity, and premium materials for modern homes.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-stone-950">Our story</h2>
            <p className="mt-4 text-stone-600">We combine practical design, durable finishes, and a calm visual style so every room feels welcoming without losing its personality.</p>
            <ul className="mt-6 space-y-3 text-stone-700">
              <li>• Curated pieces for living rooms, bedrooms, and entryways.</li>
              <li>• A balance of modern silhouettes and timeless comfort.</li>
              <li>• Clear shopping flow with fast support and easy order tracking.</li>
            </ul>
          </article>

          <article className="rounded-[2rem] border border-stone-200 bg-stone-900 p-6 text-white shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold">Why customers choose us</h2>
            <div className="mt-6 space-y-4">
              {[
                ["Quality materials", "We prioritize durable, tactile finishes that feel premium and last."],
                ["Comfort-first design", "Each collection is selected to bring softness, utility, and balance to a room."],
                ["Easy shopping journey", "From browsing to checkout, every step is designed to feel simple and clear."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-stone-700 bg-stone-800 p-4">
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-stone-200">{text}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
