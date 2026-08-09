import { FiUser, FiMail, FiPhone } from 'react-icons/fi'
import ProfileField from './ProfileField'

export default function PersonalInfoCard({ user }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Personal Information
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Your personal account details.
        </p>
      </div>

      <div className="space-y-0">
        <ProfileField
          label="First Name"
          value={user?.firstName}
          icon={<FiUser />}
        />
        <ProfileField
          label="Last Name"
          value={user?.lastName}
          icon={<FiUser />}
        />
        <ProfileField
          label="Email Address"
          value={user?.email}
          icon={<FiMail />}
        />
        <ProfileField
          label="Phone Number"
          value={user?.phoneNumber}
          icon={<FiPhone />}
        />
      </div>
    </div>
  )
}
