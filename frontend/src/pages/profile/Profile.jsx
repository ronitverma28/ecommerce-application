import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  fetchUserProfile,
  updateUserProfile,
  changePassword,
  clearError,
} from '../../store/slices/userSlice'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ProfileHeader from '../../components/profile/ProfileHeader'
import ProfileCard from '../../components/profile/ProfileCard'
import PersonalInfoCard from '../../components/profile/PersonalInfoCard'
import SecurityCard from '../../components/profile/SecurityCard'
import EditProfileModal from '../../components/profile/EditProfileModal'
import ChangePasswordModal from '../../components/profile/ChangePasswordModal'

export default function Profile() {
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state) => state.user)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleUpdateProfile = async (data) => {
    try {
      await dispatch(updateUserProfile(data)).unwrap()
      toast.success('Profile updated successfully')
      setEditModalOpen(false)
    } catch (err) {
      toast.error(err || 'Failed to update profile')
    }
  }

  const handleChangePassword = async (data) => {
    try {
      await dispatch(changePassword(data)).unwrap()
      toast.success('Password changed successfully')
      setChangePasswordModalOpen(false)
    } catch (err) {
      toast.error(err || 'Failed to change password')
    }
  }

  if (loading && !user) {
    return <LoadingSpinner text="Loading profile..." />
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <ProfileHeader />

      <div className="grid gap-8 mt-10">


        <div className="lg:col-span-2 space-y-6">
          <ProfileCard user={user} onEdit={() => setEditModalOpen(true)} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PersonalInfoCard user={user} />
            <SecurityCard onChangePassword={() => setChangePasswordModalOpen(true)} />
          </div>
        </div>
      </div>

      <EditProfileModal
        open={editModalOpen}
        user={user}
        loading={loading}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleUpdateProfile}
      />

      <ChangePasswordModal
        open={changePasswordModalOpen}
        loading={loading}
        onClose={() => setChangePasswordModalOpen(false)}
        onSubmit={handleChangePassword}
      />
    </div>
  )
}
