"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { 
  User, 
  Lock, 
  Mail, 
  Shield, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle
} from "lucide-react";

export default function AdminProfile() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Profile data
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // Password fields
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Feedback
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUserId(session.user.id);
          setEmail(session.user.email || "");
          setName(session.user.user_metadata?.name || "المسؤول");

          // Fetch role from admin_users table
          const { data: adminData } = await supabase
            .from("admin_users")
            .select("role")
            .eq("id", session.user.id)
            .single();
          
          if (adminData) {
            let roleLabel = "موظف";
            if (adminData.role === "super_admin") {
              roleLabel = "مدير عام";
            } else if (adminData.role === "admin") {
              roleLabel = "مدير";
            }
            setRole(roleLabel);
          }
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setActionLoading(true);

    if (!name || !email) {
      setErrorMsg("الرجاء ملء حقل الاسم والبريد الإلكتروني.");
      setActionLoading(false);
      return;
    }

    try {
      // 1. Update Auth User Metadata and Email
      const { error: authError } = await supabase.auth.updateUser({
        email: email,
        data: { name: name }
      });

      if (authError) throw authError;

      // 2. Update public.admin_users profile table
      const { error: dbError } = await supabase
        .from("admin_users")
        .update({
          name: name,
          email: email
        })
        .eq("id", userId);

      if (dbError) throw dbError;

      // Update local storage name
      localStorage.setItem("adminUser", JSON.stringify(name));

      setSuccessMsg("تم تحديث معلومات الحساب بنجاح! إذا قمت بتغيير البريد الإلكتروني، يرجى تأكيد الرابط المرسل لبريدك الجديد.");
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ أثناء تحديث المعلومات.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setActionLoading(true);

    if (!password) {
      setErrorMsg("الرجاء إدخال كلمة المرور الجديدة.");
      setActionLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("كلمات المرور غير متطابقة.");
      setActionLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      setSuccessMsg("تم تغيير كلمة المرور بنجاح!");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ أثناء تغيير كلمة المرور.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#0054A6] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-bold">جاري تحميل الملف الشخصي...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 text-right" dir="rtl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800">الملف الشخصي</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">تعديل معلومات تسجيل الدخول وتغيير كلمة المرور الخاصة بك</p>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="bg-emerald-50 text-emerald-600 text-xs p-4 rounded-2xl border border-emerald-100 flex items-center gap-2 justify-start">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-50 text-red-600 text-xs p-4 rounded-2xl border border-red-100 flex items-center gap-2 justify-start">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Card 1: Account Information */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100 flex items-center gap-2 justify-start">
            <User className="w-5 h-5 text-[#0054A6]" />
            <h3 className="font-extrabold text-slate-850 text-sm">معلومات الحساب</h3>
          </div>

          <form onSubmit={handleUpdateInfo} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">الاسم الكامل</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">البريد الإلكتروني</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Role (Read-only) */}
            <div className="space-y-1.5 opacity-60">
              <label className="text-xs font-bold text-slate-700 block">الدور وصلاحيات النظام</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={role}
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-right text-xs outline-none text-slate-500 font-bold cursor-not-allowed"
                  disabled
                />
                <Shield className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Submit */}
            <button 
              type="submit"
              disabled={actionLoading}
              className="w-full py-3 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {actionLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>حفظ التغييرات</span>
              )}
            </button>
          </form>
        </div>

        {/* Card 2: Change Password */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100 flex items-center gap-2 justify-start">
            <KeyRound className="w-5 h-5 text-[#0054A6]" />
            <h3 className="font-extrabold text-slate-855 text-sm">تغيير كلمة المرور</h3>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">كلمة المرور الجديدة</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">تأكيد كلمة المرور الجديدة</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Submit */}
            <button 
              type="submit"
              disabled={actionLoading}
              className="w-full py-3 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {actionLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>تحديث كلمة المرور</span>
              )}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
