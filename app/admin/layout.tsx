import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-stone-900 text-white p-6">
        <h1 className="text-xl font-bold mb-6">
          Admin Panel
        </h1>

        <nav className="flex flex-col sm:flex-row md:flex-col gap-3">
          <Link
            href="/admin"
            className="hover:text-stone-300"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="hover:text-stone-300"
          >
            Products
          </Link>

          <Link
            href="/admin/products/new"
            className="hover:text-stone-300"
          >
            Add Product
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 bg-stone-100 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}