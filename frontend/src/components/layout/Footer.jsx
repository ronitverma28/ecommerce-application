import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiMail,
  FiShoppingBag,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600">
                <FiShoppingBag size={18} />
              </div>

              <h2 className="text-xl font-bold">
                E-Commerce
              </h2>
            </div>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              Your one-stop shop for all your needs. Discover
              quality products and enjoy a simple shopping
              experience.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>

            <div className="space-y-3">
              <Link
                to="/products"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition"
              >
                Products
                <FiArrowRight size={14} />
              </Link>

              <Link
                to="/cart"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition"
              >
                Cart
                <FiArrowRight size={14} />
              </Link>

              <Link
                to="/orders"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition"
              >
                Orders
                <FiArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Contact
            </h3>

            <a
              href="mailto:support@ecommerce.com"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <FiMail size={17} />
              support@ecommerce.com
            </a>

            <p className="mt-4 text-sm text-gray-500">
              We're here to help with your shopping experience.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} E-Commerce
            Application. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Built for a better shopping experience.
          </p>
        </div>
      </div>
    </footer>
  );
}