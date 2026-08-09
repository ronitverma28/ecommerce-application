import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  clearError,
} from "../../store/slices/cartSlice";
import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function Cart() {
  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      return;
    }

    try {
      await dispatch(
        updateCartItem({
          cartItemId: itemId,
          quantity,
        })
      ).unwrap();
    } catch (err) {
      toast.error(err || "Failed to update cart");
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await dispatch(removeFromCart(itemId)).unwrap();
      toast.success("Item removed from cart");
    } catch (err) {
      toast.error(err || "Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    if (
      window.confirm(
        "Are you sure you want to clear your cart?"
      )
    ) {
      try {
        await dispatch(clearCart()).unwrap();
        toast.success("Cart cleared");
      } catch (err) {
        toast.error(err || "Failed to clear cart");
      }
    }
  };

  if (loading && !cart) {
    return <LoadingSpinner text="Loading cart..." />;
  }

  const isEmpty = !cart || cart.items?.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 mb-3">
            <FiShoppingBag size={16} />
            YOUR CART
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Review your items and proceed to checkout.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isEmpty ? (
          <div className="bg-white rounded-2xl shadow-sm py-20 px-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
              <FiShoppingBag size={32} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Looks like you haven't added anything to your
              cart yet.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              <FiArrowLeft />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Cart Items
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {cart.totalItems}{" "}
                    {cart.totalItems === 1
                      ? "item"
                      : "items"}{" "}
                    in your cart
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClearCart}
                  className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition"
                >
                  <FiTrash2 size={16} />
                  Clear Cart
                </button>
              </div>

              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm p-5 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {item.productName}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        ₹{Number(item.priceAtAdd).toFixed(2)} per item
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Subtotal:{" "}
                        <span className="font-semibold text-gray-700">
                          ₹{Number(item.totalPrice).toFixed(2)}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="inline-flex items-center rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1 || loading}
                          className="flex h-10 w-10 items-center justify-center text-gray-600 transition hover:bg-gray-100 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <FiMinus size={16} />
                        </button>

                        <span className="flex h-10 min-w-12 items-center justify-center border-x border-gray-200 bg-white px-3 text-sm font-semibold text-gray-900">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          disabled={loading}
                          className="flex h-10 w-10 items-center justify-center text-gray-600 transition hover:bg-gray-100 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>

                      <p className="text-lg font-bold text-indigo-600 whitespace-nowrap">
                        ₹{Number(item.totalPrice).toFixed(2)}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleRemove(item.id)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100 hover:text-red-700"
                        title="Remove item"
                      >
                        <FiTrash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <Link
                to="/products"
                className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                <FiArrowLeft />
                Continue Shopping
              </Link>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 lg:sticky lg:top-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Total Items</span>
                    <span className="font-medium text-gray-900">
                      {cart.totalItems}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ₹{Number(cart.totalPrice).toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>

                      <span className="text-2xl font-bold text-indigo-600">
                        ₹{Number(cart.totalPrice).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="mt-6 flex w-full items-center justify-center rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-700"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/products"
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}