import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiMapPin,
  FiPackage,
  FiShoppingBag,
} from "react-icons/fi";
import {
  fetchOrderById,
  clearError,
  clearCurrentOrder,
} from "../../store/slices/orderSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function OrderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    currentOrder,
    loading,
    error,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderById(id));

    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  if (loading) {
    return <LoadingSpinner text="Loading order..." />;
  }

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 mb-3">
              <FiPackage size={16} />
              ORDER DETAILS
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Order Not Found
            </h1>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-2xl shadow-sm py-20 px-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiPackage size={32} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Order not found
            </h2>

            <p className="mt-2 text-gray-500">
              We couldn't find the order you're looking for.
            </p>

            <Link
              to="/orders"
              className="inline-flex items-center gap-2 mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              <FiArrowLeft />
              Back to Orders
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const statusColors = {
    PENDING:
      "bg-yellow-50 text-yellow-700 border-yellow-200",
    CONFIRMED:
      "bg-blue-50 text-blue-700 border-blue-200",
    SHIPPED:
      "bg-purple-50 text-purple-700 border-purple-200",
    DELIVERED:
      "bg-green-50 text-green-700 border-green-200",
    CANCELLED:
      "bg-red-50 text-red-700 border-red-200",
    REFUNDED:
      "bg-gray-50 text-gray-700 border-gray-200",
  };

  const statusClass =
    statusColors[currentOrder.status] ||
    "bg-gray-50 text-gray-700 border-gray-200";

  const formattedDate = new Date(
    currentOrder.createdAt
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-6"
          >
            <FiArrowLeft />
            Back to Orders
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 mb-3">
                <FiPackage size={16} />
                ORDER DETAILS
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Order #{currentOrder.id}
              </h1>

              <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                <FiCalendar size={15} />
                {formattedDate}
              </div>
            </div>

            <span
              className={`inline-flex w-fit items-center px-4 py-2 rounded-full border text-sm font-semibold ${statusClass}`}
            >
              {currentOrder.status}
            </span>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FiMapPin size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Shipping Address
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Delivery address for this order
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {currentOrder.shippingAddress}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FiShoppingBag size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Order Items
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {currentOrder.items?.length || 0}{" "}
                    {currentOrder.items?.length === 1
                      ? "product"
                      : "products"}{" "}
                    in this order
                  </p>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {currentOrder.items?.map((item) => (
                  <div
                    key={item.id}
                    className="py-5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                          <FiPackage size={20} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {item.productName}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            ₹{Number(item.price).toFixed(2)} ×{" "}
                            {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="font-semibold text-indigo-600 whitespace-nowrap">
                        ₹
                        {Number(item.totalPrice).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/orders"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              <FiArrowLeft />
              Back to Orders
            </Link>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:sticky lg:top-6">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-indigo-600" />

                <h2 className="text-xl font-semibold text-gray-900">
                  Order Summary
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Order ID</span>

                  <span className="font-medium text-gray-900">
                    #{currentOrder.id}
                  </span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span>Status</span>

                  <span
                    className={`px-3 py-1 rounded-full border text-xs font-medium ${statusClass}`}
                  >
                    {currentOrder.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span>Order Date</span>

                  <span className="font-medium text-gray-900">
                    {formattedDate}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-indigo-600">
                      ₹
                      {Number(
                        currentOrder.totalAmount
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/products"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <FiShoppingBag />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}