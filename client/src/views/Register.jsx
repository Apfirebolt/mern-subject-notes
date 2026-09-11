import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppStore } from "../store"; // 1. Import your central unified store hook
import { Field, Label, Input } from "@headlessui/react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const registerUser = useAppStore((state) => state.registerUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    await registerUser(name, email, password)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        setError(err.message || "Registration failed. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Start managing subscriptions quickly
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            <Field className="space-y-1">
              <Label className="block text-sm font-medium text-gray-700">
                Full name
              </Label>
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none transition"
                placeholder="Your name"
              />
            </Field>

            <Field className="space-y-1">
              <Label className="block text-sm font-medium text-gray-700">
                Email address
              </Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none transition"
                placeholder="you@example.com"
              />
            </Field>

            <Field className="space-y-1">
              <Label className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none transition"
                placeholder="At least 6 characters"
              />
            </Field>

            <Field className="space-y-1">
              <Label className="block text-sm font-medium text-gray-700">
                Confirm password
              </Label>
              <Input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none transition"
                placeholder="Re-enter password"
              />
            </Field>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 transition"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>

            <div className="text-sm text-center">
              <p>
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
