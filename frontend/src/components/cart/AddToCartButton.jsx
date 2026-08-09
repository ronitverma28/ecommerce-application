import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { addToCart } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";

export default function AddToCartButton({
  productId,
  stockQuantity,
  productName,
}) {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.cart
  );

  const stock = Number(stockQuantity) || 0;

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(current + 1, stock)
    );
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(current - 1, 1)
    );
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);

    if (!value || value < 1) {
      setQuantity(1);
      return;
    }

    setQuantity(Math.min(value, stock));
  };

  const handleAddToCart = async () => {
    if (stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    try {
      await dispatch(
        addToCart({
          productId,
          quantity,
        })
      ).unwrap();

      toast.success(
        `${productName} added to cart`
      );

      setQuantity(1);
    } catch (err) {
      toast.error(
        typeof err === "string"
          ? err
          : err?.message || "Failed to add to cart"
      );
    }
  };

  if (stock <= 0) {
    return (
      <button
        type="button"
        disabled
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-200 py-3 font-semibold text-gray-500 cursor-not-allowed"
      >
        <FiShoppingCart size={18} />
        Out of Stock
      </button>
    );
  }

  return (
    <div className="flex w-full gap-2">

      {/* Quantity Selector */}
      <div className="flex h-10 shrink-0 items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">

        <button
          type="button"
          onClick={decreaseQuantity}
          disabled={quantity <= 1 || loading}
          className="flex px-2 items-center justify-center text-gray-500 transition hover:bg-gray-100 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiMinus size={15} />
        </button>

        <input
          type="number"
          min="1"
          max={stock}
          value={quantity}
          onChange={handleQuantityChange}
          disabled={loading}
          className="h-full w-8 border-x border-gray-200 bg-transparent text-center text-sm font-semibold text-gray-900 outline-none disabled:opacity-50"
        />

        <button
          type="button"
          onClick={increaseQuantity}
          disabled={quantity >= stock || loading}
          className="flex px-2 items-center justify-center text-gray-500 transition hover:bg-gray-100 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiPlus size={15} />
        </button>

      </div>

      {/* Add To Cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={loading}
        className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Adding...
          </>
        ) : (
          <>
            <FiShoppingCart size={17} />
            Add to Cart
          </>
        )}
      </button>

    </div>
  );
}