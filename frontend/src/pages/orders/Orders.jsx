import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { fetchMyOrders } from "../../store/slices/orderSlice";
import { toast } from "react-toastify";
import OrderCard from "../../components/order/OrderCard";

export default function Orders() {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchMyOrders({ page: 0, size: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />

            <div className="mt-4 h-12 w-56 bg-gray-200 rounded-lg animate-pulse" />

            <div className="mt-4 h-5 w-96 max-w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="space-y-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm p-6 animate-pulse"
              >
                <div className="flex justify-between">
                  <div className="space-y-3">
                    <div className="h-5 w-32 bg-gray-200 rounded" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                  </div>

                  <div className="h-8 w-24 bg-gray-200 rounded-full" />
                </div>

                <div className="border-t border-gray-100 my-5" />

                <div className="space-y-4">
                  <div className="h-4 w-64 bg-gray-200 rounded" />
                  <div className="h-4 w-48 bg-gray-200 rounded" />
                </div>

                <div className="border-t border-gray-100 mt-5 pt-5">
                  <div className="h-10 w-32 bg-gray-200 rounded-xl ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 mb-3">
            <FiShoppingBag size={16} />
            ORDER HISTORY
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Track and manage all your orders in one place.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm py-20 px-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
              <FiShoppingBag size={32} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              You haven't placed any orders yet. Start
              shopping to see your orders here.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              Start Shopping
              <FiArrowRight />
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Orders
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {orders.length}{" "}
                  {orders.length === 1
                    ? "order"
                    : "orders"}{" "}
                  found
                </p>
              </div>
            </div>

            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}