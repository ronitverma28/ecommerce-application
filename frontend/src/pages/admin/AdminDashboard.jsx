import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../store/slices/productSlice";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../store/slices/orderSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminProductTable from "../../components/admin/AdminProductTable";
import AdminCategoryTable from "../../components/admin/AdminCategoryTable";
import AdminOrderTable from "../../components/admin/AdminOrderTable";
import ProductForm from "../../components/admin/ProductForm";
import CategoryForm from "../../components/admin/CategoryForm";
import { FiPackage, FiShoppingBag, FiTag } from "react-icons/fi";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { products, categories, loading } = useSelector(
    (state) => state.products,
  );
  const { orders, loading: ordersLoading } = useSelector(
    (state) => state.orders,
  );
  const [activeTab, setActiveTab] = useState("products");
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [orderStatusUpdating, setOrderStatusUpdating] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts({ page: 0, size: 100 }));
    dispatch(fetchCategories());
    dispatch(fetchAllOrders({ page: 0, size: 100 }));
  }, [dispatch]);

  const stats = {
    products: products.length,
    categories: categories.length,
    orders: orders.length || 0,
  };

  const handleProductSubmit = async (productData) => {
    try {
      if (editingProduct) {
        await dispatch(
          updateProduct({ id: editingProduct.id, product: productData }),
        ).unwrap();
        toast.success("Product updated");
      } else {
        await dispatch(createProduct(productData)).unwrap();
        toast.success("Product created");
      }
      setShowProductForm(false);
      setEditingProduct(null);
    } catch (err) {
      toast.error(err || "Failed to save product");
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        toast.success("Product deleted");
      } catch (err) {
        toast.error(err || "Failed to delete product");
      }
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await dispatch(deleteCategory(id)).unwrap();
        toast.success("Category deleted");
      } catch (err) {
        toast.error(err || "Failed to delete category");
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    setOrderStatusUpdating(orderId);
    try {
      await dispatch(
        updateOrderStatus({ id: orderId, status: newStatus }),
      ).unwrap();
      toast.success("Order status updated");
    } catch (err) {
      toast.error(err || "Failed to update order status");
    } finally {
      setOrderStatusUpdating(null);
    }
  };

  const handleCategorySubmit = async (categoryData) => {
    try {
      if (editingCategory) {
        await dispatch(
          updateCategory({ id: editingCategory.id, category: categoryData }),
        ).unwrap();
        toast.success("Category updated");
      } else {
        await dispatch(createCategory(categoryData)).unwrap();
        toast.success("Category created");
      }
      setEditingCategory(null);
    } catch (err) {
      toast.error(err || "Failed to save category");
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FiPackage />
              Total Products
            </h3>
            <p className="text-4xl font-bold text-indigo-600">
              {stats.products}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FiTag />
              Total Categories
            </h3>
            <p className="text-4xl font-bold text-indigo-600">
              
              {stats.categories}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FiShoppingBag />
              Total Orders
            </h3>
            <p className="text-4xl font-bold text-indigo-600">{stats.orders}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          {activeTab === "products" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Products</h2>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setShowProductForm(true);
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Add Product
                </button>
              </div>
              {showProductForm && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                  onClick={() => {
                    setEditingProduct(null);
                    setShowProductForm(false);
                  }}
                >
                  <div
                    className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ProductForm
                      product={editingProduct}
                      categories={categories}
                      loading={loading}
                      onSubmit={handleProductSubmit}
                      onCancel={() => {
                        setEditingProduct(null);
                        setShowProductForm(false);
                      }}
                    />
                  </div>
                </div>
              )}
              <AdminProductTable
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            </div>
          )}

          {activeTab === "categories" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Categories</h2>
                <button
                  onClick={() => {setEditingCategory(null)
                    setShowCategoryForm(true)
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Add Category
                </button>
              </div>
              {showCategoryForm && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                  onClick={() => {
                    setEditingCategory(null);
                    setShowCategoryForm(false);
                  }}
                >
                  <div
                    className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CategoryForm
                      category={editingCategory}
                      categories={categories}
                      loading={loading}
                      onSubmit={handleCategorySubmit}
                      onCancel={() => {
                        setEditingCategory(null);
                        setShowCategoryForm(false);
                      }}
                    />
                  </div>
                </div>
              )}
              <AdminCategoryTable
                categories={categories}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
              />
            </div>
          )}

          {activeTab === "orders" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Orders</h2>
              {ordersLoading ? (
                <LoadingSpinner text="Loading orders..." />
              ) : (
                <AdminOrderTable
                  orders={orders}
                  onStatusChange={handleUpdateOrderStatus}
                  statusUpdating={orderStatusUpdating}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
