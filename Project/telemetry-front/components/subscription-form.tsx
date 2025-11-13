"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CheckCircle2, XCircle } from "lucide-react";

export function SubscriptionForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    teamName: "",
    vehicleType: "",
    planType: "Free",
  });

  const [isSignup, setIsSignup] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const endpoint = isSignup ? "signup" : "login";
      const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, form);

      // Save token for session persistence
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Redirect to dashboard/home after success
      router.push("/");

    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-slate-800 w-full max-w-md mx-auto text-center space-y-6">
      <h2 className="text-3xl font-bold text-cyan-400 neon-text">
        {isSignup ? "Telemetrix Subscription Signup" : "Welcome Back — Login"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-black/40 text-white border border-slate-700 focus:border-cyan-400 focus:outline-none"
              required
            />
            <input
              type="text"
              name="teamName"
              placeholder="Team / Organization Name"
              value={form.teamName}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-black/40 text-white border border-slate-700 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="text"
              name="vehicleType"
              placeholder="Vehicle Type (e.g., Formula EV)"
              value={form.vehicleType}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-black/40 text-white border border-slate-700 focus:border-cyan-400 focus:outline-none"
            />
            <select
              name="planType"
              value={form.planType}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-black/40 text-white border border-slate-700 focus:border-cyan-400 focus:outline-none"
            >
              <option value="Free">Free</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-black/40 text-white border border-slate-700 focus:border-cyan-400 focus:outline-none"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-black/40 text-white border border-slate-700 focus:border-cyan-400 focus:outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition-all disabled:opacity-50"
        >
          {loading ? "Processing..." : isSignup ? "Sign Up & Enter Dashboard" : "Login to Dashboard"}
        </button>
      </form>

      {message && (
        <div className="flex items-center justify-center text-green-400 space-x-2">
          <CheckCircle2 className="h-5 w-5" />
          <span>{message}</span>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center text-red-400 space-x-2">
          <XCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      <p className="text-slate-400 text-sm">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsSignup(false)}
              className="text-cyan-400 hover:underline"
            >
              Login
            </button>
          </>
        ) : (
          <>
            New to Telemetrix?{" "}
            <button
              type="button"
              onClick={() => setIsSignup(true)}
              className="text-cyan-400 hover:underline"
            >
              Sign Up
            </button>
          </>
        )}
      </p>
    </div>
  );
}
