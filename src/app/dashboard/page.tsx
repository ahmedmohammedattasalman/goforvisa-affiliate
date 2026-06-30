"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { 
  DollarSign, 
  CheckCircle, 
  Clock, 
  ChevronLeft, 
  Calendar, 
  Bell, 
  Settings, 
  ChevronDown, 
  XCircle,
  Gift
} from "lucide-react";

// Custom country flag SVG components for crisp cross-platform rendering (including Windows!)
const UkFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 50 30">
    <rect width="50" height="30" fill="#012169" />
    <path d="M 0,0 L 50,30 M 0,30 L 50,0" stroke="#FFFFFF" strokeWidth="6" />
    <path d="M 0,0 L 50,30 M 0,30 L 50,0" stroke="#C8102E" strokeWidth="4" />
    <path d="M 25,0 L 25,30 M 0,15 L 50,15" stroke="#FFFFFF" strokeWidth="10" />
    <path d="M 25,0 L 25,30 M 0,15 L 50,15" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const CanadaFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 240 120">
    <rect width="60" height="120" fill="#D80027" />
    <rect x="60" width="120" height="120" fill="#FFFFFF" />
    <rect x="180" width="60" height="120" fill="#D80027" />
    <path d="M 120,32 L 123,43 L 131,39 L 128,48 L 137,49 L 128,55 L 132,66 L 123,61 L 122,85 L 118,85 L 117,61 L 108,66 L 112,55 L 103,49 L 112,48 L 109,39 L 117,43 Z" fill="#D80027" />
  </svg>
);

const UsaFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 76 40">
    <rect width="76" height="40" fill="#FFFFFF" />
    <rect width="76" height="3.08" fill="#B22234" />
    <rect y="6.15" width="76" height="3.08" fill="#B22234" />
    <rect y="12.31" width="76" height="3.08" fill="#B22234" />
    <rect y="18.46" width="76" height="3.08" fill="#B22234" />
    <rect y="24.62" width="76" height="3.08" fill="#B22234" />
    <rect y="30.77" width="76" height="3.08" fill="#B22234" />
    <rect y="36.92" width="76" height="3.08" fill="#B22234" />
    <rect width="30.4" height="21.54" fill="#3C3B6E" />
    <circle cx="5" cy="4" r="1" fill="#FFFFFF" />
    <circle cx="10" cy="4" r="1" fill="#FFFFFF" />
    <circle cx="15" cy="4" r="1" fill="#FFFFFF" />
    <circle cx="20" cy="4" r="1" fill="#FFFFFF" />
    <circle cx="25" cy="4" r="1" fill="#FFFFFF" />
    <circle cx="7.5" cy="8" r="1" fill="#FFFFFF" />
    <circle cx="12.5" cy="8" r="1" fill="#FFFFFF" />
    <circle cx="17.5" cy="8" r="1" fill="#FFFFFF" />
    <circle cx="22.5" cy="8" r="1" fill="#FFFFFF" />
    <circle cx="5" cy="12" r="1" fill="#FFFFFF" />
    <circle cx="10" cy="12" r="1" fill="#FFFFFF" />
    <circle cx="15" cy="12" r="1" fill="#FFFFFF" />
    <circle cx="20" cy="12" r="1" fill="#FFFFFF" />
    <circle cx="25" cy="12" r="1" fill="#FFFFFF" />
    <circle cx="7.5" cy="16" r="1" fill="#FFFFFF" />
    <circle cx="12.5" cy="16" r="1" fill="#FFFFFF" />
    <circle cx="17.5" cy="16" r="1" fill="#FFFFFF" />
    <circle cx="22.5" cy="16" r="1" fill="#FFFFFF" />
  </svg>
);

const DenmarkFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 37 28">
    <rect width="37" height="28" fill="#C8102E" />
    <rect x="12" width="4" height="28" fill="#FFFFFF" />
    <rect y="12" width="37" height="4" fill="#FFFFFF" />
  </svg>
);

const AustraliaFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 80 40">
    <rect width="80" height="40" fill="#012169" />
    <g transform="scale(0.8)">
      <rect width="50" height="25" fill="#012169" />
      <path d="M 0,0 L 50,25 M 0,25 L 50,0" stroke="#FFFFFF" strokeWidth="5" />
      <path d="M 0,0 L 50,25 M 0,25 L 50,0" stroke="#C8102E" strokeWidth="3" />
      <path d="M 25,0 L 25,25 M 0,12.5 L 50,12.5" stroke="#FFFFFF" strokeWidth="8" />
      <path d="M 25,0 L 25,25 M 0,12.5 L 50,12.5" stroke="#C8102E" strokeWidth="5" />
    </g>
    <polygon points="20,26 21,30 25,30 22,33 23,37 20,35 17,37 18,33 15,30 19,30" fill="#FFFFFF" />
    <circle cx="60" cy="8" r="1.5" fill="#FFFFFF" />
    <circle cx="70" cy="16" r="1.5" fill="#FFFFFF" />
    <circle cx="60" cy="24" r="1.5" fill="#FFFFFF" />
    <circle cx="50" cy="18" r="1.5" fill="#FFFFFF" />
    <circle cx="65" cy="30" r="1" fill="#FFFFFF" />
  </svg>
);

export default function DashboardOverview() {
  const { 
    partner, 
    clients,
    withdrawals,
    notifications,
    currentBalance, 
    totalCommissions,
    paidCommissions,
    loading
  } = useApp();

  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [lineFilterOpen, setLineFilterOpen] = useState(false);
  const [currentDateLabel, setCurrentDateLabel] = useState("");
  const [timeRange, setTimeRange] = useState<"today" | "7days" | "thisMonth" | "all">("all");

  // Filter clients based on timeRange
  const filteredClients = clients.filter(c => {
    if (!c.date) return true;
    const createdDate = new Date(c.date);
    const today = new Date();
    
    const createdZero = new Date(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate());
    const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (timeRange === "today") {
      return createdZero.getTime() === todayZero.getTime();
    }
    if (timeRange === "7days") {
      const sevenDaysAgo = new Date(todayZero);
      sevenDaysAgo.setDate(todayZero.getDate() - 7);
      return createdZero >= sevenDaysAgo;
    }
    if (timeRange === "thisMonth") {
      return createdZero.getMonth() === todayZero.getMonth() && createdZero.getFullYear() === todayZero.getFullYear();
    }
    return true; // "all"
  });

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    setCurrentDateLabel(formatted);
  }, []);

  const getCountryFlag = (countryName: string) => {
    if (countryName.includes("المملكة المتحدة") || countryName.includes("بريطانيا") || countryName.includes("UK") || countryName.includes("Uk")) return <UkFlag />;
    if (countryName.includes("كندا")) return <CanadaFlag />;
    if (countryName.includes("الولايات المتحدة") || countryName.includes("أمريكا") || countryName.includes("USA") || countryName.includes("Usa")) return <UsaFlag />;
    if (countryName.includes("الدنمارك")) return <DenmarkFlag />;
    if (countryName.includes("أستراليا")) return <AustraliaFlag />;
    return <UsaFlag />;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#0054A6] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-bold">جاري تحميل بيانات لوحة التحكم...</p>
      </div>
    );
  }

  // Stats Calculations
  const totalFiles = filteredClients.length;
  const completedFiles = filteredClients.filter(c => c.status === "تم الإنجاز").length;
  const processingFiles = filteredClients.filter(c => c.status === "قيد المعالجة").length;
  const underReviewFiles = filteredClients.filter(c => c.status === "في انتظار البيانات").length;
  const cancelledFiles = filteredClients.filter(c => c.status === "ملغى").length;

  const pendingWithdrawalSum = withdrawals
    .filter(w => w.status === "قيد المراجعة")
    .reduce((sum, w) => sum + w.amount, 0);

  const avgCommission = totalFiles > 0 ? (totalCommissions / totalFiles) : 500;

  // Doughnut segments calculations
  const totalF = totalFiles || 1;
  const lenCompleted = (completedFiles / totalF) * 219.9;
  const lenPending = (underReviewFiles / totalF) * 219.9;
  const lenProcessing = (processingFiles / totalF) * 219.9;
  const lenCancelled = (cancelledFiles / totalF) * 219.9;

  const otherFiles = totalFiles - (completedFiles + underReviewFiles + processingFiles + cancelledFiles);
  const lenOther = (otherFiles / totalF) * 219.9;

  const offsetCompleted = 0;
  const offsetOther = -lenCompleted;
  const offsetCancelled = -(lenCompleted + lenOther);
  const offsetPending = -(lenCompleted + lenOther + lenCancelled);
  const offsetProcessing = -(lenCompleted + lenOther + lenCancelled + lenPending);

  // Line Chart week buckets
  const now = new Date();
  const getBucketCount = (daysMin: number, daysMax: number) => {
    return filteredClients.filter(c => {
      const createdDate = new Date(c.date);
      const diffTime = now.getTime() - createdDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays >= daysMin && diffDays < daysMax;
    }).length;
  };

  const buckets = [
    getBucketCount(24, 30),
    getBucketCount(18, 24),
    getBucketCount(12, 18),
    getBucketCount(6, 12),
    getBucketCount(0, 6)
  ];

  const maxBucketVal = Math.max(...buckets, 5);
  const getY = (val: number) => 110 - (val / maxBucketVal) * 90;

  const y0 = getY(buckets[0]);
  const y1 = getY(buckets[1]);
  const y2 = getY(buckets[2]);
  const y3 = getY(buckets[3]);
  const y4 = getY(buckets[4]);

  const pathD = `M 15 ${y0} C 47.5 ${y0}, 47.5 ${y1}, 80 ${y1} C 112.5 ${y1}, 112.5 ${y2}, 145 ${y2} C 177.5 ${y2}, 177.5 ${y3}, 210 ${y3} C 242.5 ${y3}, 242.5 ${y4}, 275 ${y4}`;
  const fillD = `${pathD} L 275 110 L 15 110 Z`;

  const getArabicDateLabel = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString("ar-EG", { month: "short", day: "numeric" });
  };

  const getSelectedLabel = () => {
    if (timeRange === "today") return `اليوم (${currentDateLabel})`;
    if (timeRange === "7days") return "آخر 7 أيام";
    if (timeRange === "thisMonth") return "هذا الشهر";
    return "كل الأوقات";
  };

  const recentFilesList = [...filteredClients].slice(0, 5);
  const recentNotifications = [...notifications].slice(0, 4);

  return (
    <div className="space-y-6 font-sans text-right pb-12" dir="rtl">
      
      {/* ROW 1: Greeting Banner & Calendar Dropdown (Full width) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Greeting Banner (Right side in RTL) */}
        <div className="space-y-1 py-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 flex items-center justify-start gap-2">
            مرحبًا بك، {partner?.name || "أحمد"} 👋
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
            تابع أداء ملفاتك وأرباحك بسهولة من لوحة التحكم
          </p>
        </div>

        {/* Calendar Selector Pill (Left side in RTL) */}
        <div className="relative shrink-0 z-20">
          <button 
            onClick={() => setDateFilterOpen(!dateFilterOpen)}
            className="flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-slate-200/60 rounded-2xl hover:bg-slate-50 transition-colors text-slate-600 text-xs font-bold shadow-xs w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{getSelectedLabel()}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-2" />
          </button>
          {dateFilterOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-lg py-1.5 z-30 text-right">
              <button 
                onClick={() => { setTimeRange("all"); setDateFilterOpen(false); }} 
                className={`w-full text-right px-4 py-2 text-xs font-bold hover:bg-slate-50 ${timeRange === "all" ? "text-blue-600 bg-blue-50/50" : "text-slate-700"}`}
              >
                كل الأوقات
              </button>
              <button 
                onClick={() => { setTimeRange("today"); setDateFilterOpen(false); }} 
                className={`w-full text-right px-4 py-2 text-xs font-bold hover:bg-slate-50 ${timeRange === "today" ? "text-blue-600 bg-blue-50/50" : "text-slate-700"}`}
              >
                اليوم
              </button>
              <button 
                onClick={() => { setTimeRange("7days"); setDateFilterOpen(false); }} 
                className={`w-full text-right px-4 py-2 text-xs font-bold hover:bg-slate-50 ${timeRange === "7days" ? "text-blue-600 bg-blue-50/50" : "text-slate-700"}`}
              >
                آخر 7 أيام
              </button>
              <button 
                onClick={() => { setTimeRange("thisMonth"); setDateFilterOpen(false); }} 
                className={`w-full text-right px-4 py-2 text-xs font-bold hover:bg-slate-50 ${timeRange === "thisMonth" ? "text-blue-600 bg-blue-50/50" : "text-slate-700"}`}
              >
                هذا الشهر
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ROW 2: The 4 Metrics Cards (Full width grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" dir="rtl">
        
        {/* Card 1: قيد المراجعة */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4" dir="rtl">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100/50">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-left flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block whitespace-nowrap">في انتظار البيانات</span>
            <span className="text-2xl font-black text-slate-800 block mt-1 leading-none">{underReviewFiles}</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1">ملف</span>
          </div>
        </div>

        {/* Card 2: قيد المعالجة */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4" dir="rtl">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0 border border-purple-100/50">
            <Settings className="w-5 h-5" />
          </div>
          <div className="text-left flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block whitespace-nowrap">قيد المعالجة</span>
            <span className="text-2xl font-black text-slate-800 block mt-1 leading-none">{processingFiles}</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1">ملف</span>
          </div>
        </div>

        {/* Card 3: تم الإنجاز */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4" dir="rtl">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-100/50">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="text-left flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block whitespace-nowrap">تم الإنجاز</span>
            <span className="text-2xl font-black text-slate-800 block mt-1 leading-none">{completedFiles}</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1">ملف</span>
          </div>
        </div>

        {/* Card 4: ملفات / مرفوضة */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4" dir="rtl">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 border border-rose-100/50">
            <XCircle className="w-5 h-5" />
          </div>
          <div className="text-left flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block whitespace-nowrap">ملغاة / مرفوضة</span>
            <span className="text-2xl font-black text-slate-800 block mt-1 leading-none">{cancelledFiles}</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1">ملفات</span>
          </div>
        </div>

      </div>

      {/* ROW 3: Split Grid (Right widgets, Left charts & tables) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Right Column: Greeting & Summary Cards (spans 1 on desktop) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Current Balance Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5">
            {/* Header info */}
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div className="space-y-0.5 text-right">
                <span className="text-[10px] text-slate-400 font-bold block">الرصيد الحالي</span>
                <span className="text-2xl font-black text-emerald-600 block leading-tight">
                  {currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-bold text-emerald-600/80">DH</span>
                </span>
                <span className="text-[9px] text-slate-400 font-bold block">الرصيد المتاح للسحب</span>
              </div>
              <div className="space-y-0.5 text-left">
                <span className="text-[10px] text-slate-400 font-bold block">إجمالي الملفات</span>
                <span className="text-2xl font-black text-slate-800 block leading-tight">{totalFiles}</span>
                <span className="text-[9px] text-slate-400 font-bold block">كل الملفات</span>
              </div>
            </div>

            {/* Split pending & paid details */}
            <div className="flex gap-4">
              <div className="flex-1 bg-slate-50/50 border border-slate-100 rounded-2xl p-3.5 flex justify-between items-center gap-2">
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 font-bold block">مستحقة</span>
                  <span className="text-xs font-black text-slate-700 block mt-0.5">
                    {pendingWithdrawalSum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
                  </span>
                </div>
                <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="flex-1 bg-slate-50/50 border border-slate-100 rounded-2xl p-3.5 flex justify-between items-center gap-2">
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 font-bold block">مدفوعة</span>
                  <span className="text-xs font-black text-slate-700 block mt-0.5">
                    {paidCommissions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
                  </span>
                </div>
                <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500 shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Withdraw CTA Button */}
            <Link 
              href="/dashboard/payments"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#0F172A] hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition-all shadow-sm"
            >
              <DollarSign className="w-4 h-4 text-amber-500" />
              <span>سحب الأرباح</span>
            </Link>
          </div>

          {/* Referral Call to Action Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs text-center space-y-4">
            <h3 className="font-extrabold text-slate-800 text-sm">إرسال عميل جديد</h3>
            <p className="text-xs text-slate-400 leading-normal font-medium px-4">
              أرسل عميلاً جديداً وابدأ رحلتك نحو المزيد من الأرباح
            </p>
            <Link 
              href="/dashboard/new-client"
              className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition-all shadow-sm shadow-blue-600/10"
            >
              <DollarSign className="w-4 h-4" />
              <span>إرسال عميل جديد</span>
            </Link>
          </div>

          {/* Earnings Summary Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-800 text-sm pb-1 border-b border-slate-50">ملخص الأرباح</h3>
            <div className="space-y-1.5">
              
              {/* Row 1 */}
              <div className="flex justify-between items-center py-2 border-b border-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                    <Gift className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-500 font-bold">إجمالي الأرباح</span>
                </div>
                <span className="text-xs font-extrabold text-slate-700" dir="ltr">
                  {totalCommissions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
                </span>
              </div>

              {/* Row 2 */}
              <div className="flex justify-between items-center py-2 border-b border-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-500 font-bold">إجمالي الملفات المنجزة</span>
                </div>
                <span className="text-xs font-extrabold text-slate-700">{completedFiles}</span>
              </div>

              {/* Row 3 */}
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-500 font-bold">متوسط العمولة لكل ملف</span>
                </div>
                <span className="text-xs font-extrabold text-slate-700" dir="ltr">
                  {avgCommission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Left Column: Charts & Tables (spans 2 on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Chart 2: Doughnut Chart "توزيع الملفات حسب الحالة" (First in code so it renders on the right in RTL) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4 flex flex-col justify-between">
              <h3 className="font-extrabold text-slate-800 text-sm">توزيع الملفات حسب الحالة</h3>

              {/* Doughnut SVG and Legend row */}
              <div className="flex items-center justify-between gap-4 py-1">
                
                {/* 1. Legend layout on the right side of charts (RTL: leftmost of block) */}
                <div className="flex-1 space-y-2 text-right">
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">
                      {underReviewFiles} ({totalFiles > 0 ? ((underReviewFiles / totalFiles) * 100).toFixed(1) : 0}%)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500">في انتظار البيانات</span>
                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">
                      {processingFiles} ({totalFiles > 0 ? ((processingFiles / totalFiles) * 100).toFixed(1) : 0}%)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500">قيد المعالجة</span>
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">
                      {completedFiles} ({totalFiles > 0 ? ((completedFiles / totalFiles) * 100).toFixed(1) : 0}%)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500">تم الإنجاز</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">
                      {cancelledFiles} ({totalFiles > 0 ? ((cancelledFiles / totalFiles) * 100).toFixed(1) : 0}%)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500">ملغاة / مرفوضة</span>
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">
                      {otherFiles} ({totalFiles > 0 ? ((otherFiles / totalFiles) * 100).toFixed(1) : 0}%)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500">أخرى</span>
                      <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0"></span>
                    </div>
                  </div>
                </div>

                {/* 2. Doughnut SVG (cx=50, cy=50, r=35, circumference=219.9) */}
                <div className="w-32 h-32 flex items-center justify-center shrink-0 relative">
                  
                  {/* Absolute overlay values in center */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none mt-1">
                    <span className="text-xl font-black text-slate-800 leading-none">{totalFiles}</span>
                    <span className="text-[7px] text-slate-400 font-bold block mt-1">إجمالي الملفات</span>
                  </div>

                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* Segment 1: Green (تم الإنجاز) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="#10B981"
                      strokeWidth="11"
                      strokeDasharray={`${lenCompleted} 219.9`}
                      strokeDashoffset="0"
                    />
                    {/* Segment 2: Grey (أخرى) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="#94A3B8"
                      strokeWidth="11"
                      strokeDasharray={`${lenOther} 219.9`}
                      strokeDashoffset={offsetOther}
                    />
                    {/* Segment 3: Red (ملغاة / مرفوضة) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="#EF4444"
                      strokeWidth="11"
                      strokeDasharray={`${lenCancelled} 219.9`}
                      strokeDashoffset={offsetCancelled}
                    />
                    {/* Segment 4: Blue (في انتظار البيانات) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="#3B82F6"
                      strokeWidth="11"
                      strokeDasharray={`${lenPending} 219.9`}
                      strokeDashoffset={offsetPending}
                    />
                    {/* Segment 5: Yellow (قيد المعالجة) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="#F59E0B"
                      strokeWidth="11"
                      strokeDasharray={`${lenProcessing} 219.9`}
                      strokeDashoffset={offsetProcessing}
                    />
                  </svg>
                </div>

              </div>
            </div>
            
            {/* Chart 1: Line Chart "تطور الملفات" */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-slate-800 text-sm">تطور الملفات</h3>
                
                {/* Duration Filter Dropdown */}
                <div className="relative z-10">
                  <button 
                    onClick={() => setLineFilterOpen(!lineFilterOpen)}
                    className="flex items-center gap-1 bg-slate-50 border border-slate-200/60 rounded-xl px-2.5 py-1 text-slate-500 text-[10px] font-bold"
                  >
                    <span>آخر 30 يوم</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>
                  {lineFilterOpen && (
                    <div className="absolute left-0 mt-2 w-32 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-30 text-right">
                      <button onClick={() => setLineFilterOpen(false)} className="w-full text-right px-3 py-1.5 text-[10px] font-bold hover:bg-slate-50 text-slate-700">آخر 30 يوم</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Curved Line SVG Chart */}
              <div className="py-2">
                <svg viewBox="0 0 300 130" width="100%" className="w-full h-32 overflow-visible">
                  <defs>
                    <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25"/>
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="0" y1="10" x2="300" y2="10" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="35" x2="300" y2="35" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="60" x2="300" y2="60" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="85" x2="300" y2="85" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="110" x2="300" y2="110" stroke="#F1F5F9" strokeWidth="1" />

                  {/* Vertical labels */}
                  <text x="15" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">{getArabicDateLabel(24)}</text>
                  <text x="80" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">{getArabicDateLabel(18)}</text>
                  <text x="145" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">{getArabicDateLabel(12)}</text>
                  <text x="210" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">{getArabicDateLabel(6)}</text>
                  <text x="275" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">{getArabicDateLabel(0)}</text>

                  {/* Left axes labels */}
                  <text x="295" y="112" textAnchor="end" className="text-[7px] fill-slate-300 font-bold">0</text>
                  <text x="295" y="88" textAnchor="end" className="text-[7px] fill-slate-300 font-bold">{Math.round(maxBucketVal * 0.25)}</text>
                  <text x="295" y="63" textAnchor="end" className="text-[7px] fill-slate-300 font-bold">{Math.round(maxBucketVal * 0.5)}</text>
                  <text x="295" y="38" textAnchor="end" className="text-[7px] fill-slate-300 font-bold">{Math.round(maxBucketVal * 0.75)}</text>
                  <text x="295" y="13" textAnchor="end" className="text-[7px] fill-slate-300 font-bold">{maxBucketVal}</text>

                  {/* Curved path gradient fill */}
                  <path d={`M 15 ${y0} C 47.5 ${y0}, 47.5 ${y1}, 80 ${y1} C 112.5 ${y1}, 112.5 ${y2}, 145 ${y2} C 177.5 ${y2}, 177.5 ${y3}, 210 ${y3} C 242.5 ${y3}, 242.5 ${y4}, 275 ${y4} L 275 110 L 15 110 Z`} fill="url(#blue-grad)" />

                  {/* Curve stroke */}
                  <path d={`M 15 ${y0} C 47.5 ${y0}, 47.5 ${y1}, 80 ${y1} C 112.5 ${y1}, 112.5 ${y2}, 145 ${y2} C 177.5 ${y2}, 177.5 ${y3}, 210 ${y3} C 242.5 ${y3}, 242.5 ${y4}, 275 ${y4}`} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Data points */}
                  <circle cx="15" cy={y0} r="3.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                  <circle cx="80" cy={y1} r="3.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                  <circle cx="145" cy={y2} r="3.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                  <circle cx="210" cy={y3} r="3.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                  <circle cx="275" cy={y4} r="3.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                </svg>
              </div>

              {/* Legends below */}
              <div className="flex justify-center items-center gap-4 text-[9px] text-slate-400 font-bold pt-2 border-t border-slate-50">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>تم الإنجاز</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>قيد المعالجة</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>في انتظار البيانات</span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Grid: Recent Files Table & Recent Notifications List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Recent Files Table ("آخر الملفات") */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <h3 className="font-extrabold text-slate-800 text-sm">آخر الملفات</h3>
                  <Link 
                    href="/dashboard/files"
                    className="text-xs text-blue-600 hover:text-blue-700 transition-colors font-bold"
                  >
                    عرض الكل
                  </Link>
                </div>

                {/* Table representation */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-right text-slate-600">
                    <thead>
                      <tr className="text-slate-400 font-bold border-b border-slate-100">
                        <th className="py-2 pb-3 pr-1 text-right">رقم الملف</th>
                        <th className="py-2 pb-3 text-right">اسم العميل</th>
                        <th className="py-2 pb-3 text-right">الحالة</th>
                        <th className="py-2 pb-3 text-left">العمولة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {recentFilesList.length > 0 ? (
                        recentFilesList.map((file, idx) => {
                          // Badge color
                          let badgeColor = "bg-slate-50 text-slate-500 border-slate-200";
                          if (file.status === "تم الإنجاز") {
                            badgeColor = "bg-emerald-50 text-emerald-600";
                          } else if (file.status === "قيد المعالجة") {
                            badgeColor = "bg-amber-50/70 text-amber-600";
                          } else if (file.status === "ملغى") {
                            badgeColor = "bg-rose-50 text-rose-600";
                          } else if (file.status === "في انتظار البيانات") {
                            badgeColor = "bg-blue-50 text-blue-600";
                          }
                          
                          return (
                            <tr key={file.dbId || idx} className="hover:bg-slate-50/40 transition-colors">
                              <td className="py-3 pr-1 font-bold text-slate-850 text-[10px]">{file.id}</td>
                              <td className="py-3 font-semibold text-slate-700">
                                <div className="flex items-center justify-between w-full pl-4">
                                  <span>{file.name}</span>
                                  <div className="flex items-center gap-1.5" dir="rtl">
                                    <span className="text-[10px] text-slate-400 font-bold">{file.country}</span>
                                    {getCountryFlag(file.country)}
                                  </div>
                                </div>
                              </td>
                              <td className="py-3">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold ${badgeColor} whitespace-nowrap`}>
                                  {file.status}
                                </span>
                              </td>
                              <td className="py-3 text-left font-bold text-slate-800">
                                {file.status === "تم الإنجاز" ? `${file.commission} DH` : "-"}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-slate-400 font-bold">
                            لا توجد ملفات حالياً.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Center Button */}
              <div className="pt-4 flex justify-center">
                <Link 
                  href="/dashboard/files"
                  className="px-5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl text-[10px] font-bold transition-all shadow-xs"
                >
                  عرض جميع الملفات
                </Link>
              </div>

            </div>

            {/* Recent Notifications List ("آخر الإشعارات") */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
              
              {/* Header */}
              <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                <h3 className="font-extrabold text-slate-800 text-sm">آخر الإشعارات</h3>
                <Link 
                  href="/dashboard/notifications"
                  className="text-xs text-blue-600 hover:text-blue-700 transition-colors font-bold"
                >
                  عرض الكل
                </Link>
              </div>

              {/* Notifications List */}
              <div className="space-y-3.5">
                {recentNotifications.length > 0 ? (
                  recentNotifications.map((notif) => {
                    let badgeColor = "bg-blue-50 text-blue-500";
                    if (notif.type === "success") {
                      badgeColor = "bg-emerald-50 text-emerald-500";
                    } else if (notif.type === "warning") {
                      badgeColor = "bg-amber-50 text-amber-500";
                    }

                    return (
                      <div key={notif.id} className="flex items-start gap-3 relative pb-3.5 border-b border-slate-50/60 last:border-0 last:pb-0">
                        <div className={`w-8 h-8 rounded-xl ${badgeColor} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Bell className="w-4 h-4" />
                        </div>
                        <div className="flex-1 space-y-0.5 text-right">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400 font-bold">{notif.time}</span>
                            <h4 className="text-[11px] font-extrabold text-slate-800">إشعار شريك</h4>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-normal font-medium">
                            {notif.text}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-xs text-slate-400 font-bold py-8">
                    لا توجد إشعارات حالياً.
                  </p>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

