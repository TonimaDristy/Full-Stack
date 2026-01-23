import Link from "next/link";

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-6">
                    RESET YOUR PASSWORD
                </h1>
                <form className="space-y-4 text-black">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="input input-bordered w-full bg-white/90"
                    />
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                        Send Reset Link
                    </button>
                </form>
                <p className="text-sm text-center mt-6">
                    Remembered your password?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}