import Image from "next/image";
import { addToCartAction } from "../../features/cart/actions";
import { getProducts } from "../../features/products/services"
import "./shop.css";

const Shop = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) => {
  const { category } = await searchParams
  const allProducts = await getProducts()

  const categories = Array.from(new Set(allProducts.map((p) => p.category)))
  const selectedCategory = category || "all"
  const products =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory)

  return (
    <div className="shop-container">
      {/* Header */}
      <header className="shop-header">
        <div className="header-content">
          <h1>Our Premium Furniture Collection</h1>
          <p>Discover the perfect pieces for your home</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="shop-main">
        {/* Category Filter */}
        <section className="filter-section">
          <h2>Shop by Category</h2>
          <div className="filter-buttons">
            <a
              href="?category=all"
              className={`filter-btn ${selectedCategory === "all" ? "active" : ""}`}
            >
              All  
            </a>
            {categories.map((c) => (
              <a
                key={c}
                href={`?category=${c}`}
                className={`filter-btn ${selectedCategory === c ? "active" : ""}`}
              >
                {c}
              </a>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="products-section">
          <h2 className="section-title">
            {selectedCategory === "all"
              ? "All Products"
              : `${selectedCategory}`}
          </h2>

          {products.length === 0 ? (
            <div className="empty-state">
              <p>No products found in this category.</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  {/* Product Image */}
                  <div className="product-image">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl.trim()}
                        alt={product.name}
                        fill
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                        className="product-image__img"
                      />
                    ) : (
                      <div className="placeholder-image">No Image</div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="product-info">
                    {/* <span className="category-badge">{product.category}</span> */}
                    <h2 className="product-name">{product.name}</h2>

                    {/* {product.description && (
                      <p className="product-description">{product.description}</p>
                    )} */}

                    <div className="product-price">${product.price}</div>

                    {/* Action Buttons */}
                    <div className="product-actions">
                      <form action={addToCartAction} className="w-full">
                        <input type="hidden" name="productId" value={product.id} />
                        <button type="submit" className="btn-primary w-full">Add to Cart</button>
                      </form>
                      <button type="button" className="btn-secondary">♥</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
export default Shop
