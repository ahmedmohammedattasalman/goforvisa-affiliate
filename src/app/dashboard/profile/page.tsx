"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { 
  User, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Lock, 
  Eye, 
  EyeOff, 
  CreditCard,
  CheckCircle,
  AlertCircle,
  Calendar,
  Shield,
  Key,
  LogOut,
  HelpCircle,
  Headphones,
  BookOpen,
  Info,
  Globe,
  ChevronDown,
  Check,
  X
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { partner, bankInfo, updateProfile, saveBankInfo, logout } = useApp();
  const router = useRouter();

  // Personal Info Form State
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("المغرب");
  const [address, setAddress] = useState("شارع محمد الخامس، إقامة النخيل، الطابق 2، رقم 15، الدار البيضاء، المغرب");

  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  // Bank Info Form State
  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [rib, setRib] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("تحويل بنكي");
  const [bankSuccess, setBankSuccess] = useState("");
  const [bankError, setBankError] = useState("");
  const [bankLoading, setBankLoading] = useState(false);

  // Modals Visibility
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [twoFactorModalOpen, setTwoFactorModalOpen] = useState(false);
  const [helpCenterModalOpen, setHelpCenterModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  // Password Change Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passSuccess, setPassSuccess] = useState("");
  const [passError, setPassError] = useState("");
  const [passLoading, setPassLoading] = useState(false);

  // Sync state with Context on load
  useEffect(() => {
    if (partner) {
      setName(partner.name);
      setCompany(partner.company || "شركة الياسين للاستشارات");
      setPhone(partner.phone);
      setEmail(partner.email);
      setCity(partner.city);
    }
    if (bankInfo) {
      setBankName(bankInfo.bankName || "البنك الشعبي - الدار البيضاء");
      setHolderName(bankInfo.holderName || partner?.name || "أحمد بن ياسين");
      setRib(bankInfo.rib || "007 780 0001234567890123 67");
    }
  }, [partner, bankInfo]);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess("");
    setProfileError("");
    setProfileLoading(true);

    setTimeout(() => {
      updateProfile({
        name,
        company: company || undefined,
        phone,
        email,
        city
      });
      setProfileLoading(false);
      setProfileSuccess("تم تحديث معلومات الملف الشخصي بنجاح.");
      // Auto clear success alert after 3s
      setTimeout(() => setProfileSuccess(""), 3000);
    }, 600);
  };

  const handleBankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBankSuccess("");
    setBankError("");
    setBankLoading(true);

    if (!bankName || !holderName || !rib) {
      setBankError("الرجاء تعبئة كافة البيانات البنكية المطلوبة.");
      setBankLoading(false);
      return;
    }

    setTimeout(() => {
      saveBankInfo({
        bankName,
        holderName,
        rib
      });
      setBankLoading(false);
      setBankSuccess("تم حفظ البيانات البنكية بنجاح. سيتم استخدامها في تحويل أرباحك.");
      setTimeout(() => setBankSuccess(""), 3000);
    }, 600);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassSuccess("");
    setPassError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPassError("الرجاء ملء كافة حقول كلمة المرور.");
      return;
    }

    if (newPassword.length < 8) {
      setPassError("يجب أن تكون كلمة المرور الجديدة مكونة من 8 أحرف على الأقل.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError("كلمة المرور الجديدة وتأكيدها غير متطابقتين.");
      return;
    }

    setPassLoading(true);

    setTimeout(() => {
      setPassLoading(false);
      setPassSuccess("تم تحديث كلمة المرور الخاصة بك بنجاح.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setPassSuccess("");
        setPasswordModalOpen(false);
      }, 2000);
    }, 800);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
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
    "مكناس"
  ];

  return (
    <div className="space-y-6 font-sans text-right max-w-7xl mx-auto" dir="rtl">
      
      {/* Top Breadcrumb & Page Header */}
      <div className="space-y-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-start gap-1 text-[10px] text-slate-400 font-bold">
          <Globe className="w-3.5 h-3.5" />
          <span>الرئيسية</span>
          <span className="text-slate-300 mx-1">/</span>
          <span className="text-blue-600">الملف الشخصي</span>
        </div>

        {/* Header Block */}
        <div className="flex items-center justify-start gap-4">
          <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0 border border-slate-200/50 shadow-xs">
            <User className="w-6 h-6" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black text-slate-800">الملف الشخصي</h1>
            <p className="text-slate-400 text-xs font-semibold">إدارة معلومات حسابك وتفضيلاتك</p>
          </div>
        </div>

      </div>

      {/* Main Content 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* RIGHT COLUMN: Personal Info & Bank Info Forms (RTL: displays on the right side of the screen, span 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Personal Information */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-6">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-50">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                <h3 className="font-extrabold text-slate-800 text-sm">المعلومات الشخصية</h3>
              </div>
            </div>

            {profileSuccess && (
              <div className="bg-green-50 text-green-600 text-xs p-3 rounded-xl border border-green-100 text-center font-bold">
                {profileSuccess}
              </div>
            )}

            {profileError && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 text-center font-bold">
                {profileError}
              </div>
            )}

            {/* Inputs Form */}
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400">الاسم الكامل</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl pl-10 focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                      required
                    />
                    <User className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5" />
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400">اسم الشركة</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl pl-10 focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                    />
                    <Building className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5" />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400">رقم الهاتف</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl pl-10 focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                      required
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5" />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400">البريد الإلكتروني</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl pl-10 focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                      required
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5" />
                  </div>
                </div>

                {/* Country */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400">الدولة</label>
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl pl-10 focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors appearance-none cursor-pointer"
                    >
                      <option value="المغرب">المغرب</option>
                      <option value="تونس">تونس</option>
                      <option value="الجزائر">الجزائر</option>
                      <option value="فرنسا">فرنسا</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400">المدينة</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl pl-10 focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5" />
                  </div>
                </div>

                {/* Address (Full Width) */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-400">العنوان</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl pl-10 focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5" />
                  </div>
                </div>

              </div>

              {/* Submit btn */}
              <div className="flex justify-start pt-2">
                <button
                  type="submit"
                  disabled={profileLoading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-2 shadow-sm shadow-blue-600/10 disabled:opacity-70"
                >
                  <Check className="w-4 h-4" />
                  <span>{profileLoading ? "جاري الحفظ..." : "حفظ التغييرات"}</span>
                </button>
              </div>

            </form>

          </div>

          {/* Card 2: Payment Information */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-6">
            
            {/* Header */}
            <div className="space-y-1 pb-3 border-b border-slate-50 text-right">
              <h3 className="font-extrabold text-slate-800 text-sm">معلومات الدفع</h3>
              <p className="text-[10px] text-slate-400 font-semibold">معلومات الحساب البنكي لتحويل الأرباح</p>
            </div>

            {bankSuccess && (
              <div className="bg-green-50 text-green-600 text-xs p-3 rounded-xl border border-green-100 text-center font-bold">
                {bankSuccess}
              </div>
            )}

            {bankError && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 text-center font-bold">
                {bankError}
              </div>
            )}

            {/* Inputs Form */}
            <form onSubmit={handleBankSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Bank Account RIB */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400">رقم الحساب البنكي (RIB)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={rib}
                      onChange={(e) => setRib(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl pl-10 focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                      required
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5" />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400">طريقة الدفع</label>
                  <div className="relative">
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl pl-10 focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors appearance-none cursor-pointer"
                    >
                      <option value="تحويل بنكي">تحويل بنكي</option>
                      <option value="Cash Plus">Cash Plus</option>
                      <option value="Wafacash">Wafacash</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Bank Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400">اسم البنك</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl pl-10 focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                      required
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5" />
                  </div>
                </div>

                {/* Holder Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400">اسم صاحب الحساب</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={holderName}
                      onChange={(e) => setHolderName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl pl-10 focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                      required
                    />
                    <User className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5" />
                  </div>
                </div>

              </div>

              {/* Submit & Alert block */}
              <div className="space-y-4">
                
                {/* Submit button */}
                <div className="flex justify-start">
                  <button
                    type="submit"
                    disabled={bankLoading}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-2 shadow-sm shadow-blue-600/10 disabled:opacity-70"
                  >
                    <Check className="w-4 h-4" />
                    <span>{bankLoading ? "جاري الحفظ..." : "حفظ معلومات الدفع"}</span>
                  </button>
                </div>

                {/* Blue warning banner matching mockup */}
                <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 flex items-center gap-3 text-blue-700 text-[10px] font-extrabold leading-relaxed text-right">
                  <Info className="w-4.5 h-4.5 text-blue-500 shrink-0" />
                  <span>يجب أن تكون معلومات الدفع صحيحة لضمان وصول أرباحك في الوقت المحدد.</span>
                </div>

              </div>

            </form>

          </div>

        </div>

        {/* LEFT COLUMN: Account details, Security & Help widgets (RTL: displays on the left side of the screen, span 1) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Card 1: Account Information */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-800 text-sm pb-1 border-b border-slate-50">معلومات الحساب</h3>
            
            <div className="space-y-4">
              
              {/* Item 1 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 font-bold block">تاريخ إنشاء الحساب</span>
                  <span className="text-xs font-extrabold text-slate-700 block mt-0.5">15 مايو 2024</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 font-bold block">شريك معتمد</span>
                  <span className="text-xs font-extrabold text-slate-700 block mt-0.5">شريك معتمد</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 font-bold block">حالة الحساب</span>
                  <div className="mt-0.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-green-50 text-green-600 border border-green-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      <span>نشط</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 font-bold block">آخر تسجيل دخول</span>
                  <span className="text-xs font-extrabold text-slate-700 block mt-0.5">14:30 - مايو 2024</span>
                </div>
              </div>

            </div>

            {/* Logout Button */}
            <div className="pt-2">
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-blue-200/80 hover:bg-slate-50 text-blue-600 rounded-xl text-xs font-bold transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>تسجيل الخروج</span>
              </button>
            </div>

          </div>

          {/* Card 2: Account Security */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-800 text-sm pb-1 border-b border-slate-50">أمان الحساب</h3>
            
            <div className="space-y-2.5">
              
              {/* Change password click */}
              <div 
                onClick={() => setPasswordModalOpen(true)}
                className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex justify-between items-center cursor-pointer transition-colors"
              >
                <div className="text-right">
                  <span className="text-xs font-extrabold text-slate-700 block">تغيير كلمة المرور</span>
                  <span className="text-[9px] text-slate-400 font-medium block mt-0.5">قم بتحديث كلمة المرور الخاصة بك</span>
                </div>
                <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-slate-400 shrink-0 shadow-xs border border-slate-100">
                  <Lock className="w-4 h-4" />
                </div>
              </div>

              {/* 2FA click */}
              <div 
                onClick={() => setTwoFactorModalOpen(true)}
                className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex justify-between items-center cursor-pointer transition-colors"
              >
                <div className="text-right">
                  <span className="text-xs font-extrabold text-slate-700 block">المصادقة الثنائية</span>
                  <span className="text-[9px] text-slate-400 font-medium block mt-0.5">زيادة أمان حسابك</span>
                </div>
                <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-slate-400 shrink-0 shadow-xs border border-slate-100">
                  <Key className="w-4 h-4" />
                </div>
              </div>

            </div>
          </div>

          {/* Card 3: Help and Support */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-800 text-sm pb-1 border-b border-slate-50">المساعدة والدعم</h3>
            
            <div className="space-y-2.5">
              
              {/* Help Center */}
              <div 
                onClick={() => setHelpCenterModalOpen(true)}
                className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex justify-between items-center cursor-pointer transition-colors"
              >
                <div className="text-right">
                  <span className="text-xs font-extrabold text-slate-700 block">مركز المساعدة</span>
                  <span className="text-[9px] text-slate-400 font-medium block mt-0.5">الأسئلة الشائعة والدروس</span>
                </div>
                <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-slate-400 shrink-0 shadow-xs border border-slate-100">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>

              {/* Contact Support */}
              <div 
                onClick={() => setSupportModalOpen(true)}
                className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex justify-between items-center cursor-pointer transition-colors"
              >
                <div className="text-right">
                  <span className="text-xs font-extrabold text-slate-700 block">تواصل مع الدعم</span>
                  <span className="text-[9px] text-slate-400 font-medium block mt-0.5">فريق الدعم جاهز لمساعدتك</span>
                </div>
                <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-slate-400 shrink-0 shadow-xs border border-slate-100">
                  <Headphones className="w-4 h-4" />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ==================== MODALS SECTION ==================== */}

      {/* 1. Change Password Modal */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setPasswordModalOpen(false)}></div>
          <div className="bg-white rounded-3xl p-6 max-w-md w-full relative z-10 space-y-4 border border-slate-100 shadow-xl text-right">
            
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <button onClick={() => setPasswordModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50">
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-500" />
                <span>تغيير كلمة المرور</span>
              </h3>
            </div>

            {passSuccess && (
              <div className="bg-green-50 text-green-600 text-xs p-3 rounded-xl border border-green-100 text-center font-bold">
                {passSuccess}
              </div>
            )}

            {passError && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 text-center font-bold">
                {passError}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              
              {/* Current Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 block">كلمة المرور الحالية</label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور الحالية"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute inset-y-0 left-0 px-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 block">كلمة المرور الجديدة</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور الجديدة (8 أحرف كحد أدنى)"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute inset-y-0 left-0 px-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 block">تأكيد كلمة المرور الجديدة</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="تأكيد كلمة المرور الجديدة"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute inset-y-0 left-0 px-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={passLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm disabled:opacity-75"
              >
                {passLoading ? "جاري التحديث..." : "تحديث كلمة المرور"}
              </button>

            </form>
          </div>
        </div>
      )}

      {/* 2. Two-Factor Authentication Modal */}
      {twoFactorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setTwoFactorModalOpen(false)}></div>
          <div className="bg-white rounded-3xl p-6 max-w-md w-full relative z-10 space-y-4 border border-slate-100 shadow-xl text-right">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <button onClick={() => setTwoFactorModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50">
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-500" />
                <span>المصادقة الثنائية (2FA)</span>
              </h3>
            </div>
            
            <div className="py-4 text-center space-y-3">
              <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-slate-800 text-xs">ميزة المصادقة الثنائية قيد الإعداد</h4>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">
                نحن نعمل حاليًا على توفير ميزة المصادقة الثنائية لشركائنا لتعزيز مستويات الأمان. سيتم إشعارك فور تفعيلها في حسابك.
              </p>
            </div>

            <button
              onClick={() => setTwoFactorModalOpen(false)}
              className="w-full py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
            >
              فهمت ذلك
            </button>
          </div>
        </div>
      )}

      {/* 3. Help Center Modal */}
      {helpCenterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setHelpCenterModalOpen(false)}></div>
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full relative z-10 space-y-4 border border-slate-100 shadow-xl text-right overflow-y-auto max-h-[85vh]">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <button onClick={() => setHelpCenterModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50">
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span>مركز المساعدة</span>
              </h3>
            </div>
            
            <div className="space-y-4 py-2">
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800">كيف يتم احتساب أرباحي كشريك؟</h4>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">
                  يتم احتساب عمولة ثابتة قدرها 500 درهم عن كل ملف تأشيرة يتم تقديمه بنجاح وسداد رسومه من قبل العميل المحال من طرفكم.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800">متى يمكنني تقديم طلب سحب العمولات؟</h4>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">
                  يمكنك تقديم طلب السحب بمجرد بلوغ رصيدك المتاح للسحب الحد الأدنى (أو أي مبلغ معتمد) عبر Cash Plus أو Wafacash أو التحويل البنكي المباشر.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-xs text-slate-800">كم تستغرق معالجة ملفات العملاء؟</h4>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">
                  يقوم مستشارونا بالتواصل مع العميل في غضون 15 دقيقة لبدء المعالجة، وتعتمد فترة التحضير النهائية على استجابة العميل وتجهيز وثائقه المطلوبة.
                </p>
              </div>
            </div>

            <button
              onClick={() => setHelpCenterModalOpen(false)}
              className="w-full py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* 4. Contact Support Modal */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setSupportModalOpen(false)}></div>
          <div className="bg-white rounded-3xl p-6 max-w-md w-full relative z-10 space-y-4 border border-slate-100 shadow-xl text-right">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <button onClick={() => setSupportModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50">
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <Headphones className="w-4 h-4 text-blue-500" />
                <span>تواصل مع الدعم الفني</span>
              </h3>
            </div>
            
            <div className="py-2 space-y-4">
              <p className="text-[10px] text-slate-400 font-bold leading-normal">
                فريق دعم شركاء GoForVisa في خدمتكم دائمًا لحل أي استفسار أو مشكلة تقنية:
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl text-xs font-semibold">
                  <span className="text-blue-600 font-extrabold" dir="ltr">+212 6 00 00 00 00</span>
                  <span className="text-slate-500">عبر واتساب</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl text-xs font-semibold">
                  <span className="text-blue-600 font-extrabold">support@goforvisa.ma</span>
                  <span className="text-slate-500">البريد الإلكتروني</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSupportModalOpen(false)}
              className="w-full py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
