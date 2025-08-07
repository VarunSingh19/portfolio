'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800 mb-4">500</h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Something went wrong!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
