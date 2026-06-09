import { getProducts } from "@/features/products/services";
import { deleteProductAction } from "@/features/products/actions";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Products
          </h1>

          <Link
            href="/admin/products/new"
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            + Add Product
          </Link>
        </div>

        {/* List */}
        <div className="grid gap-4">

          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl shadow flex items-center justify-between"
            >

              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">

                {/* IMAGE (FIXED PART) */}
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-14 h-14 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-14 h-14 bg-stone-200 rounded-lg flex items-center justify-center text-xs text-stone-500">
                    No img
                  </div>
                )}

                {/* TEXT */}
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-stone-500">
                    {p.category}
                  </p>
                  <p className="font-bold">
                    {p.price} DT
                  </p>
                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-3">

                <Link
                  href={`/admin/products/${p.id}`}
                  className="px-3 py-1 bg-stone-200 rounded"
                >
                  Edit
                </Link>

                <form
                  action={async () => {
                    "use server";
                    await deleteProductAction(p.id);
                  }}
                >
                  <button className="px-3 py-1 bg-red-500 text-white rounded">
                    Delete
                  </button>
                </form>

              </div>

            </div>
          ))}

        </div>
      </div>
    </main>
  );
}