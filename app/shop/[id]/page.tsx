import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById } from "@/features/products/services";
import { addToCartAction } from "@/features/cart/actions";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ FIX: await params
  const { id } = await params;

  const productId = Number(id);

  if (!productId || Number.isNaN(productId)) {
    notFound();
  }

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-stone-500 mb-6">
        Shop / {product.category} /{" "}
        <span className="text-stone-900 font-medium">
          {product.name}
        </span>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="relative aspect-square border rounded-2xl overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority
            className="object-cover"
            unoptimized
          />
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold mt-4">
            ${product.price}
          </p>

          <p className="mt-6 text-stone-600 leading-7">
            Premium furniture designed for modern living spaces.
          </p>

          {/* ACTIONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <form action={addToCartAction}>
              <input
                type="hidden"
                name="productId"
                value={product.id}
              />
              <button className="bg-black text-white px-6 py-3 rounded-xl w-full">
                Add to Cart
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}