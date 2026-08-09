import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiSearch,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";

import {
  fetchProducts,
  fetchCategories,
  clearError,
} from "../../store/slices/productSlice";

import { toast } from "react-toastify";
import ProductCard from "../../components/product/ProductCard";

export default function Products() {
  const dispatch = useDispatch();

  const { products, categories, loading, error, pagination } = useSelector(
    (state) => state.products,
  );

  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        size: 12,
        keyword,
        categoryId: selectedCategory,
      }),
    );
  }, [dispatch, currentPage, keyword, selectedCategory]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSearch = (e) => {
    e?.preventDefault();

    setKeyword(searchInput.trim());
    setCurrentPage(0);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setSelectedCategory(value ? Number(value) : null);

    setCurrentPage(0);
  };

  const clearFilters = () => {
    setSearchInput("");
    setKeyword("");
    setSelectedCategory(null);
    setCurrentPage(0);
  };

  const totalPages = pagination?.totalPages || 1;

  const hasFilters = keyword.trim() !== "" || selectedCategory !== null;

  
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 mb-3">
            <FiShoppingBag size={16} />
            OUR COLLECTION
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Explore Products
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500 text-lg">
            Discover our collection of quality products, carefully selected for
            you.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FiFilter className="text-indigo-600" />

            <h2 className="font-semibold text-gray-900">Find Products</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <form onSubmit={handleSearch} className="relative flex-1">
              <FiSearch
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-xl bg-gray-50 border border-gray-200 py-3 pl-11 pr-11 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    setKeyword("");
                    setCurrentPage(0);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  <FiX />
                </button>
              )}
            </form>

            <select
              value={selectedCategory ?? ""}
              onChange={handleCategoryChange}
              className="lg:w-64 rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">All Categories</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleSearch}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700 active:bg-indigo-800"
            >
              <FiSearch />
              Search
            </button>
          </div>

          {hasFilters && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Active filters applied</p>

              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {!loading && (
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {hasFilters ? "Filtered Products" : "Products"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {pagination?.totalElements ?? 0} products found
              </p>
            </div>

            {totalPages > 1 && (
              <span className="hidden sm:block text-sm text-gray-500">
                Page {currentPage + 1} of {totalPages}
              </span>
            )}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-white shadow-sm animate-pulse"
              >
                <div className="h-64 bg-gray-200" />

                <div className="p-5 space-y-4">
                  <div className="h-3 w-20 rounded bg-gray-200" />
                  <div className="h-5 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-2/3 rounded bg-gray-200" />
                  <div className="h-10 w-full rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl bg-white shadow-sm py-20 px-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
              <FiShoppingBag size={32} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              No products found
            </h2>

            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              {hasFilters
                ? "No products match your current search or category."
                : "There are no products available at the moment."}
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => Math.max(0, page - 1))
                  }
                  disabled={currentPage === 0}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FiChevronLeft />
                  Previous
                </button>

                <div className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-sm">
                  Page{" "}
                  <span className="text-indigo-600">{currentPage + 1}</span> of{" "}
                  {totalPages}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages - 1, page + 1))
                  }
                  disabled={currentPage >= totalPages - 1}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <FiChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
