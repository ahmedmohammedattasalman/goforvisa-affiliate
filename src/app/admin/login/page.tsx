"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, UserSquare2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("adminUser");
      if (user) {
        router.push("/admin");
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("الرجاء إدخال البريد الإلكتروني وكلمة المرور.");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      // Allow any login for demo purposes
      localStorage.setItem("adminUser", JSON.stringify("أحمد الإدريسي"));
      setLoading(false);
      router.push("/admin");
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] justify-between font-sans" dir="rtl">
      <div className="h-8"></div>

      <div className="w-full max-w-md mx-auto px-4 my-auto">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100/80 p-8 sm:p-10 relative overflow-hidden">
          
          {/* Admin User Circle Icon */}
          <div className="w-20 h-20 bg-sky-50 text-[#0054A6] rounded-full flex items-center justify-center mx-auto mb-6 border border-sky-100">
            <UserSquare2 className="w-10 h-10" />
          </div>

          <h1 className="text-2xl font-bold text-center text-slate-800 mb-2">لوحة تحكم المسؤول</h1>
          <p className="text-slate-400 text-center text-xs mb-8">
            الرجاء تسجيل الدخول للوصول إلى لوحة الإدارة والمتابعة لـ GoForVisa
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-bold text-slate-800 block">البريد الإلكتروني</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@goforvisa.ma"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-[#0054A6] focus:ring-1 focus:ring-[#0054A6] text-right text-xs transition-all text-slate-800 placeholder:text-slate-400"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-bold text-slate-800 block">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:border-[#0054A6] focus:ring-1 focus:ring-[#0054A6] text-right text-xs transition-all text-slate-800 placeholder:text-slate-400"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>تسجيل الدخول كمسؤول</span>
              )}
            </button>
          </form>

        </div>
      </div>

      <div className="h-8"></div>
    </div>
  );
}
