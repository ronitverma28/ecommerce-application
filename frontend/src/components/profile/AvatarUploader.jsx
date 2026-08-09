import { FiUpload } from "react-icons/fi";

export default function AvatarUploader({ user }) {
  const initials =
    `${user?.firstName?.charAt(0) || ""}${user?.lastName?.charAt(0) || ""}`.toUpperCase();
 
  return (
    <div className="flex flex-col items-center group">
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-4 border-white bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg -mt-10 ">
          {initials || "U"}
        </div>

        <div className="absolute bottom-0 right-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <FiUpload
            className="text-gray-600"
          />
        </div>
      </div>
      <p className="mt-5 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
        Click to upload photo
      </p>
    </div>
  );
}
