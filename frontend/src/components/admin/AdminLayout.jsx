import { FiPackage, FiTag, FiShoppingBag } from "react-icons/fi";

export default function AdminLayout({ children, activeTab, onTabChange }) {
  const tabs = [
    { id: "products", label: "Products", icon: <FiPackage /> },
    { id: "categories", label: "Categories", icon: <FiTag /> },
    { id: "orders", label: "Orders", icon: <FiShoppingBag /> },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white shadow-lg shadow-gray-200 flex-shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Admin Panel</h2>
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-colors ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
