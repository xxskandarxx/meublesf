import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { db } from "@/db";
import { products } from "@/features/products/schema";
import { count } from "drizzle-orm";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  const [productSummary] = await db
    .select({ total: count() })
    .from(products);

  return (
    <main className="min-h-screen bg-stone-100">

      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <h1 className="text-2xl font-bold text-stone-900">
            Admin Dashboard
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Overview of your store activity
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-8 space-y-8">

        {/* STATS SECTION */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white border rounded-xl p-6">
            <p className="text-sm text-stone-500">Total Products</p>
            <p className="text-3xl font-bold text-stone-900 mt-2">
              {productSummary.total}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <p className="text-sm text-stone-500">System Status</p>
            <p className="text-green-600 font-semibold mt-2">
              ● Online
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <p className="text-sm text-stone-500">Account</p>
            <p className="text-stone-900 font-medium mt-2 truncate">
              {session.user.email}
            </p>
          </div>

        </div>

        {/* OWNER SECTION (separate visual block) */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">
            Owner
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500">Logged in as</p>
              <p className="font-medium text-stone-900">
                {session.user.email}
              </p>
            </div>

            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              Authenticated
            </div>
          </div>
        </div>

        {/* ACTIONS SECTION */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">
            Quick Actions
          </h2>

          <div className="flex gap-4 flex-wrap">

            <Link
              href="/admin/products"
              className="px-5 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800"
            >
              Manage Products
            </Link>

            <Link
              href="/admin/products/new"
              className="px-5 py-2 border rounded-lg hover:bg-stone-50"
            >
              + Add Product
            </Link>

          </div>
        </div>

      </div>
    </main>
  );
}