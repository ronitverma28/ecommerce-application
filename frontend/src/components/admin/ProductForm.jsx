import { useEffect, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";

export default function ProductForm({
  product,
  categories,
  loading,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    imageUrl: "",
    categoryId: "",
    isActive: true,
  });

  useEffect(() => {
    setForm({
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price?.toString() || "",
      stockQuantity: product?.stockQuantity?.toString() || "",
      imageUrl: product?.imageUrl || "",
      categoryId: product?.categoryId?.toString() || "",
      isActive: product?.isActive ?? true,
    });
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;
    if (!form.categoryId) return;
    if (Number(form.price) <= 0) return;
    if (Number(form.stockQuantity) < 0) return;

    onSubmit({
      name: form.name.trim(),
      slug: form.name.toLowerCase().trim().replace(/\s+/g, "-"),
      description: form.description.trim(),
      price: Number(form.price),
      stockQuantity: Number(form.stockQuantity),
      imageUrl: form.imageUrl.trim(),
      categoryId: Number(form.categoryId),
      isActive: form.isActive,
    });
  };
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  return (
    <div className="bg-white rounded-xl shadow-lg shadow-gray-500 p-6 mb-6 text-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {product ? "Update Product" : "Create Product"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Fill in the details below to {product ? "update" : "create"} a
            product.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>

            <input
              autoFocus
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Enter product name"
              className="w-full px-3 py-1.5 border rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>

            <select
              value={form.categoryId}
              onChange={(e) =>
                setForm({
                  ...form,
                  categoryId: e.target.value,
                })
              }
              className="w-full px-3 py-1.5 border rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
              placeholder="Enter price"
              className="w-full px-3 py-1.5 border rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Quantity
            </label>

            <input
              type="number"
              min="0"
              value={form.stockQuantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  stockQuantity: e.target.value,
                })
              }
              placeholder="Enter stock quantity"
              className="w-full px-3 py-1.5 border rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>

            <input
              value={form.imageUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  imageUrl: e.target.value,
                })
              }
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-1.5 border rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>

            <select
              value={form.isActive}
              onChange={(e) =>
                setForm({
                  ...form,
                  isActive: e.target.value === "true",
                })
              }
              className="w-full px-3 py-1.5 border rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {form.imageUrl && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Preview
              </label>

              <div className="flex justify-center rounded-xl border bg-gray-50 p-6">
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="h-48 w-48 rounded-xl object-cover shadow-md"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            <textarea
              rows={5}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              placeholder="Enter product description..."
              className="w-full px-3 py-1.5 border rounded-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 cursor-pointer rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`min-w-[170px] cursor-pointer px-3 py-2.5 rounded-lg font-medium text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                Saving...
              </span>
            ) : product ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
