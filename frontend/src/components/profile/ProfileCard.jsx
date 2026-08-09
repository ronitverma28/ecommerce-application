import { FiEdit2, FiMail } from "react-icons/fi";
import AvatarUploader from "./AvatarUploader";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function ProfileCard({ user, onEdit }) {

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200 overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500" />

      <div className="px-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-32 h-32  ">
              {/* {initials || 'U'}
              <AvatarUploader user={user} /> */}
              <AvatarUploader user={user} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {user?.firstName} {user?.lastName}
              </h2>

              <div className="flex items-center gap-2 mt-2 text-gray-500">
                <FiMail />
                <span>{user?.email}</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-2.5 py-1.5 mt-2 text-xs text-white shadow-lg">
                <div className="flex items-center justify-center rounded-full bg-white/20 backdrop-blur">
                  <RiVerifiedBadgeFill size={15} />
                </div>

                <span className="font-medium">Verified Account</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onEdit}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              <FiEdit2 size={18} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
