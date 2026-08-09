import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import LoadingSpinner from "../common/LoadingSpinner";

export default function CategoryForm({
  category,
  categories,
  loading,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    parentId: "",
    isActive: "true",
  });

  useEffect(() => {
    setForm({
      name: category?.name || "",
      slug: category?.slug || "",
      description: category?.description || "",
      parentId: category?.parentId?.toString() || "",
      isActive: category?.isActive !== undefined ? String(category.isActive) : "true",
    });
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: form.name.trim(),
      slug: form.slug.trim() || form.name.toLowerCase().trim().replace(/\s+/g, "-"),
      description: form.description.trim(),
      parentId: form.parentId ? Number(form.parentId) : null,
      isActive: form.isActive === "true",
    });
  };

  useEffect(() => {
    const esc = () => onCancel?.();
    const handleEsc = (e) => {
      if (e.key === "Escape") esc();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  return (
    <div className="bg-white rounded-xl shadow-lg shadow-gray-200 p-6 mb-6 text-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {category ? "Update Category" : "Create Category"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the details below to {category ? "update" : "create"} a category.
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
        >
          <FiX size={22} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter category name"
              className="w-full px-2.5 py-2 rounded-md border transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="category-slug"
              className="w-full px-2.5 py-2 rounded-md border transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parent Category
            </label>
            <select
              value={form.parentId}
              onChange={(e) => setForm({ ...form, parentId: e.target.value })}
              className="w-full px-2.5 py-2 rounded-md border transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">No Parent</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.value })}
              className="w-full px-2.5 py-2 rounded-md border transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Enter category description..."
              rows={4}
              className="w-full px-2.5 py-2 rounded-md border transition focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`min-w-[170px] rounded-xl py-3 text-white font-medium ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner size="small" />
                Saving...
              </span>
            ) : category ? (
              "Update Category"
            ) : (
              "Create Category"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
