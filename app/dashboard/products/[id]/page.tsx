import { getProductById } from "@/features/products/services";
import { updateProductAction } from "@/features/products/actions";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const productId = parseInt(id, 10);

  if (isNaN(productId)) return notFound();

  const product = await getProductById(productId);

  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          Edit Product
        </h1>

        <form
          action={async (formData) => {
            "use server";
            await updateProductAction(product.id, formData);
          }}
          className="space-y-4"
        >

          <input
            name="name"
            defaultValue={product.name}
            className="w-full border p-2 rounded"
          />

          <input
            name="category"
            defaultValue={product.category}
            className="w-full border p-2 rounded"
          />

          <input
            name="price"
            type="number"
            defaultValue={product.price}
            className="w-full border p-2 rounded"
          />

          <input
            name="imageUrl"
            defaultValue={product.imageUrl}
            className="w-full border p-2 rounded"
          />

          <button
            className="w-full bg-black text-white p-2 rounded"
          >
            Update Product
          </button>

        </form>

      </div>
    </main>
  );
}