"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Mail, Lock, Eye, EyeOff, Headphones, Phone, Clock, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("الرجاء إدخال البريد الإلكتروني وكلمة المرور.");
      return;
    }

    if (!email.includes("@")) {
      setError("الرجاء إدخال بريد إلكتروني صحيح.");
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Mock login check
      login(email);
      setLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] justify-between font-sans">
      {/* Spacer */}
      <div className="h-8"></div>

      {/* Main Login Card */}
      <div className="w-full max-w-md mx-auto px-4 my-auto">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100/80 p-8 sm:p-10 relative overflow-hidden">
          
          {/* User Icon Circle */}
          <div className="w-20 h-20 bg-[#EEF2F6] text-[#0a2540] rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10" />
          </div>

          <h1 className="text-2xl font-bold text-center text-[#0a2540] mb-2">تسجيل دخول الشريك</h1>
          <p className="text-slate-400 text-center text-xs mb-8">
            مرحباً بك، قم بتسجيل الدخول إلى حسابك لمتابعة أعمالك
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-bold text-slate-800 block">البريد الإلكتروني</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all text-slate-800 placeholder:text-slate-400"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-bold text-slate-800 block">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all text-slate-800 placeholder:text-slate-400"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-right">
                <Link 
                  href="#" 
                  className="text-[11px] text-[#0052cc] hover:underline transition-colors font-bold block mt-1"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
            </div>

            {/* Login Button (Gold bg, Lock icon on the right in RTL) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-accent-gold hover:bg-accent-gold-hover text-white font-bold rounded-xl shadow-md transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-sm cursor-pointer"
            >
              <Lock className="w-4 h-4 text-white" />
              <span>{loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="px-3 text-xs text-slate-400 font-semibold bg-white">أو</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Register Link (Centered, Outline button, ~60-70% width) */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-slate-400 mb-2.5">ليس لديك حساب؟</span>
            <Link
              href="/register"
              className="px-8 py-2.5 bg-white border border-[#0052cc]/50 hover:bg-[#0052cc]/5 text-[#0052cc] font-bold rounded-xl transition-colors duration-200 text-xs w-full max-w-[280px] text-center"
            >
              تسجيل حساب جديد
            </Link>
          </div>
        </div>
      </div>

      {/* Support Details Footer (Light Background, Vertical borders, RTL layout) */}
      <footer className="w-full bg-[#F4F6F9] py-8 px-4 mt-12 border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs sm:text-sm">
          
          {/* Column 1: Clock */}
          <div className="flex items-start gap-3 w-full md:w-auto">
            <Clock className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
            <div className="text-right">
              <span className="text-xs font-bold text-slate-700 block">أوقات العمل</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">الإثنين - الجمعة : 9:00 - 18:00</span>
            </div>
          </div>

          {/* Column 2: Email (With border-r on md screens) */}
          <div className="flex items-start gap-3 w-full md:w-auto md:border-r md:border-slate-200 md:pr-8">
            <Mail className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
            <div className="text-right">
              <span className="text-xs font-bold text-slate-700 block">البريد الإلكتروني</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">contact@goforvisa.ma</span>
            </div>
          </div>

          {/* Column 3: Customer Support (With border-r on md screens) */}
          <div className="flex items-start gap-3 w-full md:w-auto md:border-r md:border-slate-200 md:pr-8">
            <Headphones className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
            <div className="text-right">
              <span className="text-xs font-bold text-slate-700 block">دعم العملاء</span>
              <span dir="ltr" className="text-[11px] text-slate-500 block mt-0.5">+212 6 12 34 56 78</span>
            </div>
          </div>
          
          {/* Copyright Section */}
          <div className="text-slate-400 text-xs w-full md:w-auto text-center md:text-left mt-4 md:mt-0">
            <span>جميع الحقوق محفوظة. GoForVisa. 2024 ©</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

