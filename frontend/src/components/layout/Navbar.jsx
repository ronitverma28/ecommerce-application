import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiMenu, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import { logout } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-indigo-50 text-indigo-600"
        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                {/* {console.log(user)} */}
                <FiShoppingBag size={19} />
              </div>

              <span className="text-xl font-bold text-gray-900">
                E-Commerce
              </span>
            </Link>

            <div className="hidden md:flex items-center ml-8 gap-1">
              <NavLink to="/products" className={navLinkClass}>
                Products
              </NavLink>

              {isAuthenticated && (
                <>
                  <NavLink to="/cart" className={navLinkClass}>
                    Cart
                  </NavLink>

                  <NavLink to="/orders" className={navLinkClass}>
                    Orders
                  </NavLink>

                  <NavLink to="/profile" className={navLinkClass}>
                    Profile
                  </NavLink>

                  {user?.roles?.includes("ROLE_ADMIN") && (
                    <NavLink to="/admin" className={navLinkClass}>
                      Admin
                    </NavLink>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <FiUser size={17} />
                  </div>

                  <div className="hidden lg:block">
                    <p className="text-xs text-gray-500">Welcome</p>

                    <p className="text-sm font-semibold text-gray-900">
                      {user?.firstName || "User"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-xl transition ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                    }`
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition ${
                      isActive
                        ? "bg-indigo-700"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="space-y-1">
              <NavLink
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileNavLinkClass}
              >
                Products
              </NavLink>

              {isAuthenticated && (
                <>
                  <NavLink
                    to="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className={mobileNavLinkClass}
                  >
                    Cart
                  </NavLink>

                  <NavLink
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className={mobileNavLinkClass}
                  >
                    Orders
                  </NavLink>

                  <NavLink
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className={mobileNavLinkClass}
                  >
                    Profile
                  </NavLink>

                  {user?.roles?.includes("ROLE_ADMIN") && (
                    <NavLink
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileNavLinkClass}
                    >
                      Admin
                    </NavLink>
                  )}

                  <div className="border-t border-gray-100 mt-3 pt-3">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                        <FiUser size={17} />
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Welcome</p>

                        <p className="text-sm font-semibold text-gray-900">
                          {user?.firstName || "User"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}

              {!isAuthenticated && (
                <div className="border-t border-gray-100 mt-3 pt-3 space-y-1">
                  <NavLink
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={mobileNavLinkClass}
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
