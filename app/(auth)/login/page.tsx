"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!username || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      await fetch("/api/auth/me");

      router.replace("/products");
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center lg:justify-end overflow-hidden bg-gradient-to-br from-[#FFF9DB] via-[#FFED7D] to-[#FFEC96] px-6 sm:px-10 lg:px-40">
      <div className="hidden lg:block absolute left-28 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#FDE047] to-[#F59E0B] z-0" />
      <img
        src="/rider_loginpage.png"
        alt="Rider"
        className="hidden lg:block absolute left-40 top-1/2 -translate-y-1/2 w-[650px] z-10 pointer-events-none select-none"
      />

      <div className="relative z-20 w-full max-w-sm bg-white/20 backdrop-blur-2xl border border-white/40 shadow-[0_25px_80px_rgba(255,215,0,0.25)] rounded-[32px] p-8 sm:p-10 lg:p-12  text-gray-800  overflow-hidden">
        {/* Glossy Top Shine */}
        <div className="absolute top-0 left-0 w-full h-1/2  bg-gradient-to-b from-white/40 to-transparent rounded-t-[32px] pointer-events-none" />

        {/* Soft Inner Border */}
        <div className="absolute inset-0 rounded-[32px] border border-white/30 pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1 text-center  bg-gradient-to-r from-yellow-400 to-orange-500  bg-clip-text text-transparent">
            Unlock Your Experience
          </h2>
          <p className="text-sm text-gray-600 mb-8 text-center">
            Sign in and continue your journey
          </p>

          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
            <div>
              <label className="text-base text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full mt-1 p-2 rounded-xl bg-white/10 border border-white/50 backdrop-blur-sm text-gray-800 placeholder-grey-300 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="text-base text-gray-700">Password</label>

              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full p-2 pr-10 rounded-xl 
            bg-white/10 
            border border-white/50 
            backdrop-blur-sm 
            text-gray-800 
            placeholder:text-gray-300 
            placeholder:text-sm
            focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                {/* Ant Design Eye Icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-yellow-500 transition"
                >
                  {showPassword ? (
                    <EyeInvisibleOutlined className="text-lg" />
                  ) : (
                    <EyeOutlined className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#FACC15] to-[#F59E0B] text-white hover:scale-105 shadow-lg"
              }`}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
