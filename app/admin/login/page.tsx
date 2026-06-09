"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid owner email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fffaf6_0%,#f3ede6_100%)] px-4 py-10 text-stone-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 rounded-[2rem] border border-stone-200 bg-white/90 p-6 shadow-sm sm:p-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-700">Owner Access</p>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">Admin login</h1>
          <p className="text-stone-600">Use the owner credentials from your environment to enter the protected dashboard.</p>
        </header>

        <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-5 shadow-sm sm:max-w-md">
          <label className="grid gap-1 text-sm text-stone-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </label>

          <label className="grid gap-1 text-sm text-stone-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </label>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-[linear-gradient(135deg,#fbbf24_0%,#f59e0b_45%,#fb923c_100%)] px-4 py-3 text-sm font-semibold text-stone-950 shadow-sm transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
