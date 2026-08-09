import { FiShield } from 'react-icons/fi'

export default function PasswordStrength({ password }) {
  const getStrength = (pwd) => {
    let score = 0
    if (pwd.length >= 8) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[a-z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    return score
  }

  const strength = getStrength(password || '')
  const labels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong']
  const colors = ['bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500']
  const color = colors[strength] || 'bg-gray-300'
  const label = labels[strength] || ''

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FiShield className="text-gray-400" />
          <span className="text-sm text-gray-500">Password Strength</span>
        </div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300 ease-out`}
          style={{ width: `${strength * 20}%` }}
        />
      </div>
    </div>
  )
}
