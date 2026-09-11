// src/components/Loader.jsx

export default function Loader({ size = 'md', message = 'Loading...', fullScreen = false }) {
  // Size Mapping Dict
  const sizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  }

  // Base loader element
  const spinnerElement = (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <div 
        className={`${sizes[size]} animate-spin rounded-full border-gray-200 border-t-indigo-600`}
        role="status"
        aria-label="loading"
      />
      {message && (
        <p className="mt-3 text-sm font-medium text-gray-500 tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  )

  // Absolute screen block overlay variant
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/30 backdrop-blur-xs transition-opacity">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100/50 max-w-xs w-full">
          {spinnerElement}
        </div>
      </div>
    )
  }

  // Fall back to standard inline wrapper layout
  return spinnerElement
}