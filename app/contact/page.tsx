import { submitContactFormAction } from "../../features/contact/actions";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { sent, error } = await searchParams;

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-amber-700">Contact us</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">We’re happy to help with design advice, orders, and special requests.</h1>
          <p className="max-w-2xl text-lg text-stone-600">Send us a message and we’ll review it for the upcoming admin dashboard workflow.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-stone-950">Reach us</h2>
            <div className="mt-6 space-y-4 text-stone-600">
              <p>Phone: +212 6 00 00 00 00</p>
              <p>Email: hello@meublesf.com</p>
              <p>Address: 14 Rue de la Modernité, Casablanca</p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-stone-200 bg-stone-900 p-6 text-white shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold">Send a message</h2>
            <form action={submitContactFormAction} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1 block text-stone-200">Full name</span>
                  <input name="name" required className="w-full rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3 text-white outline-none" />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-stone-200">Email</span>
                  <input type="email" name="email" required className="w-full rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3 text-white outline-none" />
                </label>
              </div>
              <label className="block text-sm">
                <span className="mb-1 block text-stone-200">Subject</span>
                <input name="subject" required className="w-full rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3 text-white outline-none" />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-stone-200">Message</span>
                <textarea name="message" rows={5} required className="w-full rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3 text-white outline-none" />
              </label>
              <button type="submit" className="w-full rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-300">Send inquiry</button>
              {sent && <p className="text-sm text-emerald-300">Thanks — your inquiry is ready to be reviewed in the admin dashboard later.</p>}
              {error && <p className="text-sm text-rose-300">Please complete all fields before submitting your inquiry.</p>}
            </form>
          </article>
        </div>
      </section>
    </main>
  );
}
