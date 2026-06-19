"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { 
  User, 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  FileText, 
  Send,
  UserPlus,
  Info,
  Headphones,
  Bell,
  Coins,
  X,
  ClipboardList,
  Flag,
  Users
} from "lucide-react";

export default function SendNewClient() {
  const router = useRouter();
  const { addClient } = useApp();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState("مغربية");
  const [dob, setDob] = useState("");
  const [passportType, setPassportType] = useState("عادي");
  
  const [country, setCountry] = useState("");
  const [visaType, setVisaType] = useState("سياحة");
  const [travelersCount, setTravelersCount] = useState("1");
  const [notes, setNotes] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !phone || !nationality || !country || !visaType) {
      setError("الرجاء ملء جميع الحقول المطلوبة التي تحتوي على علامة (*)");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      addClient({
        name,
        phone,
        email: email || "",
        nationality,
        dob: dob || "",
        country,
        visaType,
        notes: `عدد المسافرين: ${travelersCount} | نوع جواز السفر: ${passportType}${notes ? ` | ملاحظات: ${notes}` : ""}`
      });
      setLoading(false);
      router.push("/dashboard/files");
    }, 800);
  };

  const countriesList = [
    "فرنسا",
    "ألمانيا",
    "بلجيكا",
    "إيطاليا",
    "هولندا",
    "النمسا",
    "إسبانيا",
    "الدنمارك",
    "المملكة المتحدة",
    "الولايات المتحدة الأمريكية",
    "كندا",
    "أستراليا",
    "الإمارات العربية المتحدة",
    "المملكة العربية السعودية"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans max-w-6xl mx-auto px-2">
      {/* Right Column: Main Form (takes 2 columns on lg) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Breadcrumb & Header */}
        <div className="space-y-1 text-right">
          <div className="text-[10px] text-slate-400 font-medium">الرئيسية / إرسال عميل جديد</div>
          <div className="flex items-center gap-2 mt-2">
            <h1 className="text-xl font-bold text-[#0a2540]">إرسال عميل جديد</h1>
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 bg-white">
              <UserPlus className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-slate-400 text-[11px]">أرسل عميل جديداً وسنقوم بالتواصل معه ومتابعة ملفه حتى الإنجاز</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card 1: Client Info */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <User className="w-4 h-4 text-[#0052cc]" />
              <h3 className="font-bold text-slate-800 text-sm">معلومات العميل</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5 text-right">
                <label className="text-[11px] font-bold text-slate-700 block">الاسم الكامل <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخل الاسم الكامل"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all text-slate-800 placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5 text-right">
                <label className="text-[11px] font-bold text-slate-700 block">رقم الهاتف <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="أدخل رقم الهاتف"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all text-slate-800 placeholder:text-slate-400"
                    required
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5 text-right">
                <label className="text-[11px] font-bold text-slate-700 block">البريد الإلكتروني</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all text-slate-800 placeholder:text-slate-400"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Nationality */}
              <div className="space-y-1.5 text-right">
                <label className="text-[11px] font-bold text-slate-700 block">الجنسية <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all appearance-none cursor-pointer text-slate-800"
                    required
                  >
                    <option value="مغربية">مغربية</option>
                    <option value="جزائرية">جزائرية</option>
                    <option value="تونسية">تونسية</option>
                    <option value="مصرية">مصرية</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                  <Globe className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-1.5 text-right">
                <label className="text-[11px] font-bold text-slate-700 block">تاريخ الميلاد</label>
                <div className="relative">
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all text-slate-800 cursor-pointer"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Passport Type */}
              <div className="space-y-1.5 text-right">
                <label className="text-[11px] font-bold text-slate-700 block">نوع جواز السفر</label>
                <div className="relative">
                  <select
                    value={passportType}
                    onChange={(e) => setPassportType(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all appearance-none cursor-pointer text-slate-800"
                  >
                    <option value="عادي">جواز سفر عادي</option>
                    <option value="دبلوماسي">جواز سفر دبلوماسي</option>
                    <option value="خدمة">جواز سفر خدمة</option>
                  </select>
                  <FileText className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Request Info */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <ClipboardList className="w-4 h-4 text-[#0052cc]" />
              <h3 className="font-bold text-slate-800 text-sm">معلومات الطلب</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Target Country */}
              <div className="space-y-1.5 text-right">
                <label className="text-[11px] font-bold text-slate-700 block">الدولة المطلوبة <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all appearance-none cursor-pointer text-slate-800"
                    required
                  >
                    <option value="">اختر الدولة</option>
                    {countriesList.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <Flag className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Visa Type */}
              <div className="space-y-1.5 text-right">
                <label className="text-[11px] font-bold text-slate-700 block">نوع التأشيرة <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all appearance-none cursor-pointer text-slate-800"
                    required
                  >
                    <option value="سياحة">تأشيرة سياحة</option>
                    <option value="عمل">تأشيرة عمل</option>
                    <option value="دراسة">تأشيرة دراسة</option>
                    <option value="زيارة عائلية">زيارة عائلية</option>
                  </select>
                  <FileText className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Travelers Count */}
              <div className="space-y-1.5 text-right">
                <label className="text-[11px] font-bold text-slate-700 block">عدد المسافرين</label>
                <div className="relative">
                  <select
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all appearance-none cursor-pointer text-slate-800"
                  >
                    <option value="1">1 مسافر</option>
                    <option value="2">2 مسافرين</option>
                    <option value="3">3 مسافرين</option>
                    <option value="4">4 مسافرين</option>
                    <option value="5+">5 مسافرين أو أكثر</option>
                  </select>
                  <Users className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5 text-right col-span-1 md:col-span-3">
                <label className="text-[11px] font-bold text-slate-700 block">ملاحظات إضافية (اختياري)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="اكتب أي معلومات إضافية تود مشاركتها حول طلب العميل..."
                  rows={4}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] text-right text-xs transition-all text-slate-800 resize-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Buttons Row (Submit on the right, Cancel on the left of group, aligned left on the card) */}
          <div className="flex items-center gap-3 justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 bg-[#0052cc] hover:bg-[#0042a3] text-white font-bold rounded-xl shadow-md transition-colors text-xs flex items-center gap-2 cursor-pointer disabled:opacity-75"
            >
              <Send className="w-4 h-4 shrink-0 text-white" />
              <span>{loading ? "جاري الإرسال..." : "إرسال العميل"}</span>
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors text-xs flex items-center gap-2 cursor-pointer"
            >
              <X className="w-4 h-4 shrink-0 text-slate-600" />
              <span>إلغاء</span>
            </button>
          </div>

          <p className="text-center text-[10px] text-slate-400 mt-4 leading-relaxed">
            بإرسال هذا النموذج، فإنك توافق على أن GoForVisa ستتواصل مع هذا العميل بخصوص طلبه.
          </p>
        </form>
      </div>

      {/* Left Column: Sidebar Info (1/3 width on lg) */}
      <div className="space-y-6">
        
        {/* Card 1: Important Info */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Info className="w-4 h-4 text-[#0052cc]" />
            <h3 className="font-bold text-slate-800 text-sm">معلومات مهمة</h3>
          </div>

          <div className="bg-blue-50/50 border border-blue-100/50 p-4 rounded-2xl text-[11px] text-blue-700 font-medium text-right leading-relaxed">
            بعد إرسال العميل، سيتواصل فريق GoForVisa مع العميل خلال 24 ساعة كحد أقصى.
          </div>

          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0052cc] flex items-center justify-center shrink-0 mt-0.5 shadow-sm border border-blue-100/30">
                <Coins className="w-4 h-4" />
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-800 block">عمولة ثابتة</span>
                <span className="text-[10px] text-slate-500 block mt-0.5 leading-relaxed">اربح 500 درهم عن كل ملف مكتمل بنجاح.</span>
              </div>
            </div>
            {/* Item 2 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0052cc] flex items-center justify-center shrink-0 mt-0.5 shadow-sm border border-blue-100/30">
                <Headphones className="w-4 h-4" />
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-800 block">متابعة كاملة</span>
                <span className="text-[10px] text-slate-500 block mt-0.5 leading-relaxed">نحن نتكفل بجميع الإجراءات والتواصل مع العميل.</span>
              </div>
            </div>
            {/* Item 3 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0052cc] flex items-center justify-center shrink-0 mt-0.5 shadow-sm border border-blue-100/30">
                <Bell className="w-4 h-4" />
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-800 block">تحديثات مستمرة</span>
                <span className="text-[10px] text-slate-500 block mt-0.5 leading-relaxed">ستصلك إشعارات بكل جديد يخص ملف العميل.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: File Processing Stages */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <ClipboardList className="w-4 h-4 text-[#0052cc]" />
            <h3 className="font-bold text-slate-800 text-sm">مراحل معالجة الملف</h3>
          </div>

          <div className="relative pr-4 border-r border-slate-200 mr-2 py-1 space-y-6 text-right">
            {/* Stage 1 */}
            <div className="relative">
              <span className="absolute -right-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#0052cc] ring-4 ring-blue-50"></span>
              <span className="text-xs font-bold text-[#0052cc] block">تم استلام الطلب</span>
            </div>
            {/* Stage 2 */}
            <div className="relative">
              <span className="absolute -right-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              <span className="text-xs text-slate-500 block">جاري التواصل مع العميل</span>
            </div>
            {/* Stage 3 */}
            <div className="relative">
              <span className="absolute -right-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              <span className="text-xs text-slate-500 block">قيد إعداد الملف</span>
            </div>
            {/* Stage 4 */}
            <div className="relative">
              <span className="absolute -right-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              <span className="text-xs text-slate-500 block">قيد المعالجة</span>
            </div>
            {/* Stage 5 */}
            <div className="relative">
              <span className="absolute -right-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              <span className="text-xs text-slate-500 block">تم الإنجاز</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
