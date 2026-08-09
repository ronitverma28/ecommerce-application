import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiCreditCard,
  FiMapPin,
  FiShoppingBag,
} from "react-icons/fi";
import { clearCart } from "../../store/slices/cartSlice";
import { placeOrder } from "../../store/slices/orderSlice";
import { toast } from "react-toastify";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.orders);

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState("Credit Card");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shippingAddress.trim()) {
      toast.error("Please enter your shipping address");
      return;
    }

    try {
      const result = await dispatch(
        placeOrder({
          shippingAddress: shippingAddress.trim(),
          paymentMethod,
        })
      ).unwrap();

      dispatch(clearCart());

      toast.success("Order placed successfully!");

      navigate(`/orders/${result.id}`);
    } catch (err) {
      toast.error(err || "Failed to place order");
    }
  };

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 mb-3">
              <FiShoppingBag size={16} />
              CHECKOUT
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Checkout
            </h1>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-2xl shadow-sm py-20 px-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
              <FiShoppingBag size={32} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Add some products to your cart before proceeding
              to checkout.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              <FiArrowLeft />
              Continue Shopping
            </Link>
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
            <FiCheckCircle size={16} />
            SECURE CHECKOUT
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Complete your order by providing your shipping and
            payment information.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FiMapPin size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Shipping Information
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <label
                htmlFor="shippingAddress"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Shipping Address
              </label>

              <textarea
                id="shippingAddress"
                rows="5"
                value={shippingAddress}
                onChange={(e) =>
                  setShippingAddress(e.target.value)
                }
                className="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="Enter your full shipping address"
                required
              />

              <p className="mt-2 text-xs text-gray-500">
                Include house number, street, city, state and
                PIN code.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FiCreditCard size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Payment Method
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Select your preferred payment method.
                  </p>
                </div>
              </div>

              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Payment Method
              </label>

              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
                className="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="Credit Card">
                  Credit Card
                </option>

                <option value="Debit Card">
                  Debit Card
                </option>

                <option value="PayPal">
                  PayPal
                </option>

                <option value="Cash on Delivery">
                  Cash on Delivery
                </option>
              </select>
            </div>

            <Link
              to="/cart"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              <FiArrowLeft />
              Back to Cart
            </Link>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:sticky lg:top-6">
              <div className="flex items-center gap-2">
                <FiShoppingBag className="text-indigo-600" />

                <h2 className="text-xl font-semibold text-gray-900">
                  Order Summary
                </h2>
              </div>

              <div className="mt-6 space-y-5">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.productName}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        ₹
                        {Number(item.priceAtAdd).toFixed(2)}
                        {" × "}
                        {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                      ₹
                      {Number(item.totalPrice).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-6 pt-5 space-y-4">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Total Items</span>

                  <span className="font-medium text-gray-900">
                    {cart.totalItems}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-indigo-600">
                    ₹{Number(cart.totalPrice).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Processing..."
                  : `Place Order • ₹${Number(
                      cart.totalPrice
                    ).toFixed(2)}`}
              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                By placing your order, you agree to our terms
                and conditions.
              </p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}