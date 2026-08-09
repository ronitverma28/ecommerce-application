import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiShoppingCart,
  FiTag,
} from "react-icons/fi";
import AddToCartButton from "../cart/AddToCartButton";

export default function ProductCard({ product }) {
  const isOutOfStock =
    !product.stockQuantity ||
    product.stockQuantity <= 0;

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm shadow-gray-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}
      <Link
        to={`/products/${product.id}`}
        className="relative block overflow-hidden bg-gray-100"
      >
        <div className="aspect-[4/3] overflow-hidden">

          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x450?text=No+Image";
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <FiShoppingCart size={40} />
            </div>
          )}

        </div>

        {/* Category */}
        {product.categoryName && (
          <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur-sm">
            <FiTag
              size={12}
              className="text-indigo-600"
            />
            {product.categoryName}
          </div>
        )}

        {/* Stock */}
        {isOutOfStock ? (
          <div className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white">
            Out of Stock
          </div>
        ) : product.stockQuantity <= 5 ? (
          <div className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white">
            Only {product.stockQuantity} left
          </div>
        ) : null}
      </Link>

      {/* Content */}
      <div className="p-5">

        <Link to={`/products/${product.id}`}>
          <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 transition group-hover:text-indigo-600">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-500">
          {product.description ||
            "Discover this amazing product from our collection."}
        </p>

        {/* Price */}
        <div className="mt-4 flex items-end justify-between">

          <div>
            <p className="text-xs text-gray-400">
              Price
            </p>

            <p className="mt-0.5 text-2xl font-bold text-indigo-600">
              ${Number(product.price).toFixed(2)}
            </p>
          </div>

          {!isOutOfStock && (
            <span className="text-xs font-medium text-green-600">
              In Stock
            </span>
          )}

        </div>

        {/* Actions */}
        <div className="mt-5 space-y-2">

          {!isOutOfStock && (
            <div className="w-full">
              <AddToCartButton
                productId={product.id}
                stockQuantity={product.stockQuantity}
                productName={product.name}
              />
            </div>
          )}

          <Link
            to={`/products/${product.id}`}
            className="group/details flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
          >
            View Details
            <FiArrowRight
              size={15}
              className="transition-transform group-hover/details:translate-x-1"
            />
          </Link>

        </div>
      </div>
    </div>
  );
}