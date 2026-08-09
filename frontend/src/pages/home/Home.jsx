import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiArrowRight,
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";
import { fetchProducts } from "../../store/slices/productSlice";
import { toast } from "react-toastify";
import ProductCard from "../../components/product/ProductCard";

export default function Home() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ page: 0, size: 8 }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[520px] flex items-center">
            <div className="max-w-3xl py-20">

              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm mb-6">
                <FiShoppingBag size={16} />
                Discover something amazing
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Shop smarter.
                <span className="block text-indigo-200">
                  Live better.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-8 text-indigo-100">
                Discover premium products, unbeatable prices, and
                everything you need delivered right to your doorstep.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-indigo-700 shadow-lg transition hover:bg-gray-100 hover:-translate-y-0.5"
                >
                  Shop Now
                  <FiArrowRight />
                </Link>

                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Explore Products
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-indigo-100">
                <div className="flex items-center gap-2">
                  <FiShield className="text-white" />
                  Secure Shopping
                </div>

                <div className="flex items-center gap-2">
                  <FiTruck className="text-white" />
                  Fast Delivery
                </div>

                <div className="flex items-center gap-2">
                  <FiRefreshCw className="text-white" />
                  Easy Returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative -mt-10 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/60 p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <FiTruck size={23} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Fast Delivery
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Quick and reliable delivery
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/60 p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <FiShield size={23} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Secure Payments
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Your payments are always protected
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/60 p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <FiRefreshCw size={23} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Easy Returns
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Shop confidently with easy returns
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">

          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 mb-2">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />
              OUR COLLECTION
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Featured Products
            </h2>

            <p className="mt-2 text-gray-500">
              Handpicked products you might love.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700 transition"
          >
            View All Products
            <FiArrowRight />
          </Link>

        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse"
              >
                <div className="h-64 bg-gray-200" />

                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}

          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group transition duration-300 hover:-translate-y-1"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white shadow-sm p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <FiShoppingBag size={28} />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-gray-900">
              No products available
            </h3>

            <p className="mt-2 text-gray-500">
              We couldn't find any products right now.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 transition"
            >
              Browse Products
              <FiArrowRight />
            </Link>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            to="/products"
            className="group inline-flex items-center gap-3 rounded-xl bg-gray-900 px-7 py-3.5 font-semibold text-white shadow-lg transition hover:bg-indigo-600"
          >
            Explore All Products
            <FiArrowRight className="transition group-hover:translate-x-1" />
          </Link>
        </div>

      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-14 sm:px-12">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative text-center max-w-2xl mx-auto">

            <FiShoppingBag
              className="mx-auto text-white/80 mb-5"
              size={38}
            />

            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to find your next favorite?
            </h2>

            <p className="mt-4 text-indigo-100">
              Explore our complete collection and discover
              products made for you.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-8 rounded-xl bg-white px-7 py-3.5 font-semibold text-indigo-700 shadow-lg hover:bg-gray-100 transition"
            >
              Start Shopping
              <FiArrowRight />
            </Link>

          </div>
        </div>
      </section>

    </div>
  );
}