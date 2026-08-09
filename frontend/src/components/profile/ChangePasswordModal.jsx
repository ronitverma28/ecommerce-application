import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiEye, FiEyeOff, FiLock, FiX } from 'react-icons/fi'
import PasswordStrength from './PasswordStrength'
import LoadingSpinner from '../common/LoadingSpinner'

export default function ChangePasswordModal({ open, loading, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const newPassword = watch('newPassword', '')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }

    const handleClickOutside = (e) => {
      if (e.target.closest('.modal-content') === null) {
        onClose()
      }
    }

    if (open) {
      window.addEventListener('keydown', handleEsc)
      window.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      window.removeEventListener('keydown', handleEsc)
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      reset()
      setShowCurrent(false)
      setShowNew(false)
      setShowConfirm(false)
    }
  }, [open, reset])

  if (!open) return null

  const passwordRules = [
    { label: 'At least 8 characters', regex: /.{8,}/ },
    { label: 'At least one uppercase letter', regex: /[A-Z]/ },
    { label: 'At least one lowercase letter', regex: /[a-z]/ },
    { label: 'At least one number', regex: /[0-9]/ },
    { label: 'At least one special character', regex: /[^A-Za-z0-9]/ },
  ]

  const passedRules = passwordRules.filter(rule => rule.regex.test(newPassword))
  const allValid = newPassword.length > 0 && passedRules.length === passwordRules.length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content w-full max-w-xl bg-white rounded-2xl shadow-xl"
      >
        <div className="flex items-center justify-between border-b px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Change Password
            </h2>
            <p className="mt-1 text-gray-500">
              Choose a strong password to keep your account secure.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition"
          >
            <FiX size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 text-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showCurrent ? 'text' : 'password'}
                {...register('currentPassword', { required: 'Current password is required' })}
                className={`w-full pl-11 pr-12 py-2 rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrent ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showNew ? 'text' : 'password'}
                {...register('newPassword', {
                  required: 'New password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  validate: {
                    hasUppercase: (v) => /[A-Z]/.test(v) || 'Must contain an uppercase letter',
                    hasLowercase: (v) => /[a-z]/.test(v) || 'Must contain a lowercase letter',
                    hasNumber: (v) => /[0-9]/.test(v) || 'Must contain a number',
                    hasSpecialChar: (v) => /[^A-Za-z0-9]/.test(v) || 'Must contain a special character',
                  },
                })}
                className={`w-full pl-11 pr-12 py-2 rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNew ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
            )}

            <PasswordStrength password={newPassword} />

            {newPassword && (
              <div className="mt-3 space-y-1">
                {passwordRules.map((rule) => {
                  const passed = rule.regex.test(newPassword)
                  return (
                    <div key={rule.label} className="flex items-center gap-2 text-sm">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          passed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {passed && <span className="text-xs">✓</span>}
                      </div>
                      <span className={passed ? 'text-green-600' : 'text-gray-500'}>
                        {rule.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirm ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === newPassword || 'Passwords do not match',
                })}
                className={`w-full pl-11 pr-12 py-2 rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !allValid}
              className={`min-w-[180px] rounded-xl py-3 text-white font-medium transition ${
                loading || !allValid
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="small" />
                  Updating...
                </span>
              ) : (
                'Update Password'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
