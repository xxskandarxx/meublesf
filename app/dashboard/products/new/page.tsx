import { createProductAction } from "@/features/products/actions";

export default function NewProductPage() {
  return (
    <main className="min-h-screen bg-stone-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-xl mx-auto space-y-6">

        {/* Title */}
        <h1 className="text-2xl font-bold">
          Add Product
        </h1>

        {/* Card */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">

          <form
            action={async (formData) => {
              "use server";
              await createProductAction(formData);
            }}
            className="space-y-4"
          >

            {/* Name */}
            <input
              name="name"
              placeholder="Product name"
              className="w-full border p-2 rounded"
              required
            />

            {/* Category */}
            <input
              name="category"
              placeholder="Category"
              className="w-full border p-2 rounded"
              required
            />

            {/* Price */}
            <input
              name="price"
              type="number"
              placeholder="Price"
              className="w-full border p-2 rounded"
              required
            />

            {/* Image */}
            <input
              name="imageUrl"
              placeholder="Image URL"
              className="w-full border p-2 rounded"
            />

            {/* Button */}
            <button
              className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
            >
              Create Product
            </button>

          </form>

        </div>
      </div>
    </main>
  );
}