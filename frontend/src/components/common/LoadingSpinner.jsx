export default function LoadingSpinner({ size = 'medium', text = 'Loading...' }) {
  const sizeClasses = size === 'small' ? 'h-6 w-6' : size === 'large' ? 'h-12 w-12' : 'h-8 w-8'

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`inline-block animate-spin rounded-full border-b-2 border-indigo-600 ${sizeClasses}`}></div>
      {text && <p className="mt-2 text-gray-600">{text}</p>}
    </div>
  )
}
