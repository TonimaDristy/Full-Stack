import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-4">Page not found</p>
      <Link href="/dashboard" className="text-indigo-600 underline">
        Go back to Dashboard
      </Link>
    </div>
  );
}
