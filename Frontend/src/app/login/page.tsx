
"use client";

import Toast from "@/components/toast";
import Link from "next/link";
import { FormEvent, useState } from "react";
import z from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";

// Zod
const loginSchema = z.object({
  email: z
    .string("it is not string")
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [login, setLogin] = useState<{ success: boolean } | null>(null);
  const [backendError, setBackendError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();


    setBackendError("");


    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrorEmail(formattedErrors.email?._errors.join('. ') || "");
      setErrorPassword(formattedErrors.password?._errors.join('. ') || "");
      setLogin(null);
      return;
    }


    setErrorEmail("");
    setErrorPassword("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/login`,
        {
          email,
          password,
        }
      );



      //localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));


      setEmail("");
      setPassword("");
      setLogin({ success: true });


      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);

      setBackendError(err.response?.data?.message || "Invalid email or password");
      setLogin(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>

        {backendError && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {backendError}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errorEmail ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''} outline-none transition-all`}
              placeholder="your@university.edu"
            />
            {errorEmail && (
              <div className="mt-2 p-1 bg-red-100 text-red-700 rounded-lg text-sm">
                {errorEmail}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errorPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''} outline-none transition-all`}
              placeholder="••••••••"
            />
            {errorPassword && (
              <div className="mt-2 p-1 bg-red-100 text-red-700 rounded-lg text-sm">
                {errorPassword}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link href="/forgotpassword" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <Link href="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</Link>
        </div>
      </div>

      {login?.success && <Toast />}
    </div>
  );
}
