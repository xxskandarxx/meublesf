import { createProductAction } from "@/features/products/actions";

export default function NewProductPage() {
  return (
    <main className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          Add Product
        </h1>

        <form action={createProductAction} className="space-y-4">

          <input
            name="name"
            placeholder="Product name"
            className="w-full border p-2 rounded"
          />

          <input
            name="category"
            placeholder="Category"
            className="w-full border p-2 rounded"
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            className="w-full border p-2 rounded"
          />

          <input
            name="imageUrl"
            placeholder="Image URL"
            className="w-full border p-2 rounded"
          />

          <button
            className="w-full bg-black text-white p-2 rounded"
          >
            Create Product
          </button>

        </form>

      </div>
    </main>
  );
}