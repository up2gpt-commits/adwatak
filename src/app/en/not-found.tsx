import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-7xl mb-4">🔧</div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        Page Not Found
      </h1>
      <p className="text-gray-500 mb-8 max-w-md">
        Sorry, the page you&apos;re looking for doesn&apos;t exist. It may have been moved or the URL is incorrect.
      </p>
      <div className="flex gap-4">
        <Link
          href="/en"
          className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl no-underline hover:bg-blue-700 transition-colors"
        >
          ⬅️ Back to Home
        </Link>
        <Link
          href="/en/tools"
          className="bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-xl no-underline hover:bg-gray-200 transition-colors"
        >
          🗂️ All Tools
        </Link>
      </div>
    </div>
  );
}
