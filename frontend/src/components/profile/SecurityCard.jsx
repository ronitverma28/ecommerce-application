import { IoShieldCheckmark } from "react-icons/io5";

export default function SecurityCard({ onChangePassword }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Security
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage your password and account security.
          </p>
        </div>

        <IoShieldCheckmark  size={30} className="text-indigo-600" />
      </div>

      <div className="border-b border-gray-100 pb-6 mb-6">
        <p className="text-sm text-gray-500">Password</p>
        <h3 className="text-xl tracking-[8px] mt-2">
          ••••••••
        </h3>
        <p className="text-xs text-gray-400 mt-2">
          Keep your password secure.
        </p>
      </div>

      <button
        onClick={onChangePassword}
        className="w-full rounded-xl bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 transition"
      >
        Change Password
      </button>
    </div>
  )
}
