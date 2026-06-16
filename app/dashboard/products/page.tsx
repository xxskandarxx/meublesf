import { getProducts } from "@/features/products/services";
import { deleteProductAction } from "@/features/products/actions";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-stone-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Products</h1>

          <Link
            href="/dashboard/products/new"
            className="bg-black text-white px-4 py-2 rounded-lg text-center"
          >
            + Add Product
          </Link>
        </div>

        <div className="grid gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    className="w-14 h-14 object-cover rounded-lg border shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 bg-stone-200 rounded-lg flex items-center justify-center text-xs shrink-0">
                    No img
                  </div>
                )}

                <div className="min-w-0">
                  <p className="font-semibold break-words">{p.name}</p>
                  <p className="text-sm text-stone-500 break-words">
                    {p.category}
                  </p>
                  <p className="font-bold">{p.price} DT</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  href={`/dashboard/products/${p.id}`}
                  className="px-3 py-2 bg-stone-200 rounded text-center"
                >
                  Edit
                </Link>

                <form
                  action={async () => {
                    "use server";
                    await deleteProductAction(p.id);
                  }}
                  className="w-full sm:w-auto"
                >
                  <button className="w-full px-3 py-2 bg-red-500 text-white rounded">
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