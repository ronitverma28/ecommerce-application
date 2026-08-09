import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiPackage,
} from "react-icons/fi";

export default function OrderCard({ order }) {
  const statusColors = {
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
    CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
    SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
    DELIVERED: "bg-green-50 text-green-700 border-green-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",
    REFUNDED: "bg-gray-50 text-gray-700 border-gray-200",
  };

  const statusClass =
    statusColors[order.status] ||
    "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition hover:shadow-md">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FiPackage className="text-indigo-600" />

              <h2 className="text-lg font-semibold text-gray-900">
                Order #{order.id}
              </h2>
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <FiCalendar size={14} />

              <span>
                {new Date(
                  order.createdAt
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <span
            className={`inline-flex w-fit items-center px-3 py-1.5 rounded-full border text-sm font-medium ${statusClass}`}
          >
            {order.status}
          </span>
        </div>

        <div className="border-t border-gray-100 my-5" />

        <div className="space-y-4">
          {order.items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {item.productName}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  ₹{Number(item.price).toFixed(2)} ×{" "}
                  {item.quantity}
                </p>
              </div>

              <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                ₹{Number(item.totalPrice).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 mt-5 pt-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">
                Total Amount
              </p>

              <p className="text-2xl font-bold text-indigo-600 mt-1">
                ₹{Number(order.totalAmount).toFixed(2)}
              </p>
            </div>

            <Link
              to={`/orders/${order.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              View Details
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}