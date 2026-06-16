import Image from "next/image";
import { addToCartAction } from "../../features/cart/actions";
import { getProducts } from "../../features/products/services";
import "./shop.css";

const Shop = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const { category } = await searchParams;

  const allProducts = await getProducts();

  const categories = Array.from(
    new Set(allProducts.map((p) => p.category))
  );

  const selectedCategory = category || "all";

  const products =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="shop-container">
      {/* HEADER */}
      <header className="shop-header">
        <div className="header-content">
          <h1>Our Premium Furniture Collection</h1>
          <p>Discover elegant pieces for modern living</p>
        </div>
      </header>

      {/* FILTERS */}
      <section className="filter-section">
        <h2>Shop by Category</h2>

        <div className="filter-buttons">
          <a
            href="?category=all"
            className={`filter-btn ${
              selectedCategory === "all" ? "active" : ""
            }`}
          >
            All
          </a>

          {categories.map((c) => (
            <a
              key={c}
              href={`?category=${c}`}
              className={`filter-btn ${
                selectedCategory === c ? "active" : ""
              }`}
            >
              {c}
            </a>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-4 md:px-8 py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-stone-800">
          {selectedCategory === "all"
            ? "All Products"
            : selectedCategory}
        </h2>

        {products.length === 0 ? (
          <div className="text-center py-20 text-stone-500">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition flex flex-col overflow-hidden"
              >
                {/* CLICKABLE PRODUCT AREA */}
                <a href={`/shop/${product.id}`}>
                  {/* IMAGE (SAFE FIX) */}
                  <div className="relative w-full aspect-[4/5] bg-stone-100 overflow-hidden">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        priority={index < 4}
                        className="object-cover hover:scale-105 transition duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-stone-400 text-sm">
                        No image
                      </div>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="p-3 md:p-4">
                    <h3 className="text-sm md:text-base font-semibold text-stone-800 line-clamp-1 hover:text-amber-600 transition">
                      {product.name}
                    </h3>

                    <p className="text-sm md:text-base font-bold text-amber-600 mt-1">
                      ${product.price}
                    </p>
                  </div>
                </a>

                {/* ACTIONS */}
                <div className="p-3 pt-0 mt-auto">
                  <form action={addToCartAction}>
                    <input
                      type="hidden"
                      name="productId"
                      value={product.id}
                    />

                    <button className="w-full bg-stone-900 text-white text-sm py-2 rounded-lg hover:bg-amber-600 transition">
                      Add to Cart
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Shop;