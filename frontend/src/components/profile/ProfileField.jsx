export default function ProfileField({ label, value, icon }) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-100 last:border-none">
      <div className="flex items-center gap-3">
        {icon && <span className="text-indigo-600">{icon}</span>}
        <span className="text-sm text-gray-500">{label}</span>
      </div>

      <span className="text-gray-900 font-medium">
        {value || '—'}
      </span>
    </div>
  )
}
