"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { 
  User, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { registerPartner } = useApp();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Password Validation Checks
  const hasMinLength = password.length >= 8;
  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasUpperLower && hasNumber;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !phone || !email || !city || !password || !confirmPassword) {
      setError("الرجاء ملء جميع الحقول المطلوبة.");
      return;
    }

    if (!isPasswordValid) {
      setError("الرجاء استيفاء جميع متطلبات كلمة المرور.");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }

    if (!agreeTerms) {
      setError("الرجاء الموافقة على الشروط والأحكام وسياسة الخصوصية.");
      return;
    }

    setLoading(true);
    
    registerPartner({
      name,
      company: company || undefined,
      phone,
      email,
      city,
    }, password).then((res) => {
      setLoading(false);
      if (res.success) {
        router.push("/dashboard");
      } else {
        setError(res.error || "فشل إنشاء الحساب. الرجاء المحاولة مرة أخرى.");
      }
    });
  };

  const citiesList = [
    "الدار البيضاء",
    "الرباط",
    "مراكش",
    "طنجة",
    "أكادير",
    "فاس",
    "وجدة",
    "القنيطرة",
    "تطوان",
    "مكناس",
    "العيون",
    "الداخلة"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#07162c] justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* Background Graphic Decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center z-0">
        <svg className="w-full max-w-5xl h-auto text-white/30" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="500" cy="500" r="400" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="500" cy="500" r="300" stroke="currentColor" strokeWidth="1" />
          <circle cx="500" cy="500" r="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M100 500H900M500 100V900" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100/50 p-6 sm:p-10 relative overflow-hidden">
          
          <h1 className="text-2xl font-bold text-center text-[#0a2540] mb-2">إنشاء حساب شريك جديد</h1>
          <p className="text-slate-400 text-center text-xs mb-8">
            املأ المعلومات التالية لإنشاء حسابك كشريك في GoForVisa
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100 mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section 1 Divider: [Icon] [Text] [Line] in RTL order */}
            <div className="flex items-center gap-3 my-6">
              <div className="w-8 h-8 rounded-full bg-[#0a2540] flex items-center justify-center text-white shrink-0 shadow-sm">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#0a2540] whitespace-nowrap">معلومات الشخصية</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              {/* Full Name (Right column in RTL) */}
              <div className="space-y-1.5 text-right">
                <label className="text-xs font-bold text-slate-800 block">الاسم الكامل</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخل اسمك الكامل"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all text-slate-800 placeholder:text-slate-400"
                    required
                  />
                  <User className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Company Name (Left column in RTL) */}
              <div className="space-y-1.5 text-right">
                <label className="text-xs font-bold text-slate-800 block">اسم الشركة (اختياري)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="أدخل اسم الشركة"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all text-slate-800 placeholder:text-slate-400"
                  />
                  <FileText className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Phone (Right column in RTL) */}
              <div className="space-y-1.5 text-right">
                <label className="text-xs font-bold text-slate-800 block">رقم الهاتف</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="أدخل رقم هاتفك"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all text-slate-800 placeholder:text-slate-400"
                    required
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Email (Left column in RTL) */}
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

              {/* City (Centered in the bottom row, same size as a column field) */}
              <div className="md:col-span-2 flex justify-center">
                <div className="w-full md:w-[calc(50%-12px)] space-y-1.5 text-right">
                  <label className="text-xs font-bold text-slate-800 block">المدينة</label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all appearance-none cursor-pointer text-slate-800 placeholder:text-slate-400"
                      required
                    >
                      <option value="" disabled className="text-slate-400">اختر مدينتك</option>
                      {citiesList.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 Divider: [Icon] [Text] [Line] in RTL order */}
            <div className="flex items-center gap-3 my-6 pt-4">
              <div className="w-8 h-8 rounded-full bg-[#0a2540] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Lock className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#0a2540] whitespace-nowrap">معلومات الحساب</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              {/* Password (Right column in RTL) */}
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
              </div>

              {/* Confirm Password (Left column in RTL) */}
              <div className="space-y-1.5 text-right">
                <label className="text-xs font-bold text-slate-800 block">تأكيد كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="أعد إدخال كلمة المرور"
                    className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all text-slate-800 placeholder:text-slate-400"
                    required
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 px-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Password Requirements Box (Light blue background with custom dots) */}
              <div className="bg-[#f4f8fc] border border-[#e6effc] p-5 rounded-2xl md:col-span-2">
                <div className="flex items-center justify-center gap-2 text-[#0a2540] font-bold text-xs mb-3">
                  <svg className="w-4 h-4 text-[#0052cc] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>متطلبات كلمة المرور</span>
                </div>
                <div className="flex flex-col items-center">
                  <ul className="text-right text-[11px] text-slate-600 space-y-2 inline-block">
                    <li className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors shrink-0 ${hasMinLength ? "bg-green-500" : "bg-[#0052cc]"}`}></span>
                      <span className={`transition-colors ${hasMinLength ? "text-green-600 font-semibold" : "text-slate-500"}`}>
                        أن تكون الكلمة 8 أحرف على الأقل
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors shrink-0 ${hasUpperLower ? "bg-green-500" : "bg-[#0052cc]"}`}></span>
                      <span className={`transition-colors ${hasUpperLower ? "text-green-600 font-semibold" : "text-slate-500"}`}>
                        أن تحتوي على حرف كبير وحرف صغير
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors shrink-0 ${hasNumber ? "bg-green-500" : "bg-[#0052cc]"}`}></span>
                      <span className={`transition-colors ${hasNumber ? "text-green-600 font-semibold" : "text-slate-500"}`}>
                        أن تحتوي على رقم واحد على الأقل
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Terms Checkbox: Checkbox on the right, text on the left */}
            <div className="flex items-center justify-center gap-2.5 py-1">
              <label htmlFor="terms" className="text-xs text-[#0052cc] hover:underline cursor-pointer font-bold select-none">
                أوافق على الشروط والأحكام وسياسة الخصوصية
              </label>
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 text-[#0052cc] border-slate-300 rounded focus:ring-[#0052cc] cursor-pointer"
                required
              />
            </div>

            {/* Submit Button: Icon on the right of text in RTL */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#0a2540] hover:bg-[#06182c] text-white font-bold rounded-xl shadow-md transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-sm cursor-pointer"
            >
              <UserPlus className="w-4 h-4 shrink-0 text-white" />
              <span>{loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}</span>
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-xs text-slate-400">لديك حساب بالفعل؟ </span>
            <Link 
              href="/login" 
              className="text-xs text-[#0052cc] hover:underline font-semibold"
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

