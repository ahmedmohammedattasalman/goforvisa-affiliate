"use client";
import React from "react";
import Link from "next/link";
import { 
  Users, 
  CheckCircle, 
  Files, 
  Clock, 
  Wallet,
  ChevronLeft,
  ChevronDown,
  Calendar,
  Eye,
  Building2,
  TrendingUp,
  ArrowUpRight,
  DollarSign,
  ChevronRight,
  FolderOpen,
  CreditCard,
  RefreshCw,
  MoreVertical,
  Activity,
  Award,
  ArrowUp
} from "lucide-react";

// Flag wrapper to render circular flags matching Screenshot
const FlagWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-slate-200/60 shadow-xs">
    <div className="w-7 h-5 shrink-0 flex items-center justify-center">
      {children}
    </div>
  </div>
);

// Crisp SVG Flags
const FranceFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 3 2">
      <rect width="1" height="2" fill="#002395" />
      <rect x="1" width="1" height="2" fill="#FFFFFF" />
      <rect x="2" width="1" height="2" fill="#ED2939" />
    </svg>
  </FlagWrapper>
);

const SpainFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#C60B1E" />
      <rect y="0.5" width="3" height="1" fill="#FBE122" />
    </svg>
  </FlagWrapper>
);

const ItalyFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 3 2">
      <rect width="1" height="2" fill="#009246" />
      <rect x="1" width="1" height="2" fill="#F1F2F1" />
      <rect x="2" width="1" height="2" fill="#CE2B37" />
    </svg>
  </FlagWrapper>
);

const TurkeyFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#E30A17" />
      <circle cx="1.1" cy="1" r="0.4" fill="#FFFFFF" />
      <circle cx="1.2" cy="1" r="0.32" fill="#E30A17" />
      <polygon points="1.6,1 1.45,1.07 1.48,0.9 1.35,0.8 1.52,0.8" fill="#FFFFFF" />
    </svg>
  </FlagWrapper>
);

const GermanyFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#FFCF00" />
      <rect width="3" height="1.33" fill="#DD0000" />
      <rect width="3" height="0.67" fill="#000000" />
    </svg>
  </FlagWrapper>
);

export default function AdminDashboard() {
  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Area matching Screenshot 5 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-right">
          <h1 className="text-2xl font-black text-slate-800">مرحباً أحمد، أهلاً بك في لوحة التحكم</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">إليك ملخص شامل لأداء المنصة اليوم</p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200/80 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 text-xs font-bold shadow-xs cursor-pointer">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>15 مايو 2024 - 15 يونيو 2024</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards Row (5 Cards) ordered from right to left (RTL) matching Screenshot:
          Active Partners -> Completed Files -> Total Files -> Due Commissions -> Total Revenue */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        
        {/* Card 1: الشركاء النشطين (Active Partners) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100/80 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block">الشركاء النشطين</span>
            <span className="text-2xl font-black text-slate-800 block mt-1 leading-none">342</span>
            <div className="flex items-center gap-1 mt-1.5 text-emerald-600">
              <ArrowUp className="w-3 h-3 stroke-[3]" />
              <span className="text-[9px] font-black">10.2%+ عن الفترة السابقة</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100/50">
            <Users className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Card 2: الملفات المنجزة (Completed Files) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100/80 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block">الملفات المنجزة</span>
            <span className="text-2xl font-black text-[#059669] block mt-1 leading-none">856</span>
            <div className="flex items-center gap-1 mt-1.5 text-emerald-600">
              <ArrowUp className="w-3 h-3 stroke-[3]" />
              <span className="text-[9px] font-black">18.3%+ عن الفترة السابقة</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/50">
            <CheckCircle className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Card 3: إجمالي الملفات (Total Files) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100/80 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block">إجمالي الملفات</span>
            <span className="text-2xl font-black text-[#0054A6] block mt-1 leading-none">1,248</span>
            <div className="flex items-center gap-1 mt-1.5 text-emerald-600">
              <ArrowUp className="w-3 h-3 stroke-[3]" />
              <span className="text-[9px] font-black">15.7%+ عن الفترة السابقة</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/50">
            <Files className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Card 4: العمولات المستحقة (Due Commissions) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100/80 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block">العمولات المستحقة</span>
            <span className="text-xl font-black text-amber-500 block mt-1 leading-none" dir="ltr">45,250.00 DH</span>
            <div className="flex items-center gap-1 mt-1.5 text-emerald-600">
              <ArrowUp className="w-3 h-3 stroke-[3]" />
              <span className="text-[9px] font-black">8.3%+ عن الفترة السابقة</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100/50">
            <Clock className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Card 5: إجمالي الإيرادات (Total Revenue) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100/80 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block">إجمالي الإيرادات</span>
            <span className="text-xl font-black text-emerald-600 block mt-1 leading-none" dir="ltr">120,450.00 DH</span>
            <div className="flex items-center gap-1 mt-1.5 text-emerald-600">
              <ArrowUp className="w-3 h-3 stroke-[3]" />
              <span className="text-[9px] font-black">12.5%+ عن الفترة السابقة</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/50">
            <Wallet className="w-5.5 h-5.5" />
          </div>
        </div>

      </div>

      {/* Main Grid Layout: Left Column (Wide) & Right Column (Narrow) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Charts & Tables (spans 2 on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Charts Row: Doughnut on the Right (first in HTML), Line Chart on the Left (second in HTML) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chart 1: Doughnut Chart "توزيع الملفات حسب الحالة" (aligned to right in RTL) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4 flex flex-col justify-between">
              <h3 className="font-extrabold text-slate-800 text-sm">توزيع الملفات حسب الحالة</h3>

              <div className="flex items-center justify-between gap-4 py-1">
                
                {/* Legend on the right */}
                <div className="flex-1 space-y-1.5 text-right">
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">278 (22.3%)</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                      <span className="text-slate-500">جديد</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">192 (15.4%)</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0"></span>
                      <span className="text-slate-500">تم التواصل مع العميل</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">256 (20.5%)</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                      <span className="text-slate-500">قيد إعداد الملف</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">410 (32.9%)</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-50 shrink-0"></span>
                      <span className="text-slate-500">قيد المعالجة</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">86 (6.9%)</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-50 shrink-0"></span>
                      <span className="text-slate-500">تم الإنجاز</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">26 (2.0%)</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                      <span className="text-slate-500">مرفوض</span>
                    </div>
                  </div>
                </div>

                {/* Doughnut SVG on the left */}
                <div className="w-28 h-28 flex items-center justify-center shrink-0 relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none mt-1">
                    <span className="text-lg font-black text-slate-800 leading-none">1,248</span>
                    <span className="text-[6px] text-slate-400 font-bold block mt-1">إجمالي الملفات</span>
                  </div>

                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* Blue (جديد) - 22.3% */}
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#3B82F6" strokeWidth="11" strokeDasharray="49 219.9" strokeDashoffset="0" />
                    {/* Sky (تم التواصل) - 15.4% */}
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#38BDF8" strokeWidth="11" strokeDasharray="33.8 219.9" strokeDashoffset="-49" />
                    {/* Amber (قيد الإعداد) - 20.5% */}
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#F59E0B" strokeWidth="11" strokeDasharray="45 219.9" strokeDashoffset="-82.8" />
                    {/* Purple (قيد المعالجة) - 32.9% */}
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#A855F7" strokeWidth="11" strokeDasharray="72.3 219.9" strokeDashoffset="-127.8" />
                    {/* Emerald (تم الإنجاز) - 6.9% */}
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#10B981" strokeWidth="11" strokeDasharray="15.2 219.9" strokeDashoffset="-200.1" />
                    {/* Rose (مرفوض) - 2.0% */}
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#EF4444" strokeWidth="11" strokeDasharray="4.6 219.9" strokeDashoffset="-215.3" />
                  </svg>
                </div>

              </div>
            </div>

            {/* Chart 2: Line Chart "الملفات خلال الأشهر السنة الماضية" (aligned to left in RTL) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-slate-800 text-sm">الملفات خلال الأشهر السنة الماضية</h3>
                <div className="relative">
                  <button className="flex items-center gap-1 bg-slate-50 border border-slate-200/60 rounded-xl px-2.5 py-1 text-slate-500 text-[10px] font-bold cursor-pointer">
                    <span>6 أشهر</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Multi-Line SVG Chart */}
              <div className="py-2 relative">
                <svg viewBox="0 0 300 130" width="100%" className="w-full h-32 overflow-visible">
                  <defs>
                    <linearGradient id="blue-grad-3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15"/>
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="green-grad-3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.15"/>
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="25" y1="10" x2="285" y2="10" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="25" y1="35" x2="285" y2="35" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="25" y1="60" x2="285" y2="60" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="25" y1="85" x2="285" y2="85" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="25" y1="110" x2="285" y2="110" stroke="#F1F5F9" strokeWidth="1" />

                  {/* Left Axes Labels (aligned properly) */}
                  <text x="18" y="113" textAnchor="end" className="text-[8px] fill-slate-350 font-bold">0</text>
                  <text x="18" y="88" textAnchor="end" className="text-[8px] fill-slate-350 font-bold">100</text>
                  <text x="18" y="63" textAnchor="end" className="text-[8px] fill-slate-350 font-bold">200</text>
                  <text x="18" y="38" textAnchor="end" className="text-[8px] fill-slate-350 font-bold">300</text>
                  <text x="18" y="13" textAnchor="end" className="text-[8px] fill-slate-350 font-bold">400</text>

                  {/* X-axis labels */}
                  <text x="30" y="126" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">ديسمبر</text>
                  <text x="90" y="126" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">فبراير</text>
                  <text x="150" y="126" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">فرانس</text>
                  <text x="210" y="126" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">مارس</text>
                  <text x="250" y="126" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">أبريل</text>
                  <text x="280" y="126" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">مايو</text>

                  {/* Path 1: Total Files (Blue) */}
                  <path d="M 30 70.7 L 90 52.7 L 150 50.5 L 210 37.0 L 250 28.0 L 280 20 L 280 110 L 30 110 Z" fill="url(#blue-grad-3)" />
                  <path d="M 30 70.7 L 90 52.7 L 150 50.5 L 210 37.0 L 250 28.0 L 280 20" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Path 2: Completed Files (Green) */}
                  <path d="M 30 86.5 L 90 75.2 L 150 75.2 L 210 50.5 L 250 48.2 L 280 40 L 280 110 L 30 110 Z" fill="url(#green-grad-3)" />
                  <path d="M 30 86.5 L 90 75.2 L 150 75.2 L 210 50.5 L 250 48.2 L 280 40" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Data points dots */}
                  <circle cx="280" cy="20" r="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                  <circle cx="280" cy="40" r="3" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
                </svg>
              </div>

              {/* Legends */}
              <div className="flex justify-center items-center gap-4 text-[9px] text-slate-400 font-bold pt-2 border-t border-slate-50">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>إجمالي الملفات</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-550"></span>
                  <span>الملفات المنجزة</span>
                </div>
              </div>
            </div>

          </div>

          {/* Table Card: آخر الملفات المرسلة */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                <h3 className="font-extrabold text-slate-800 text-sm">آخر الملفات المرسلة</h3>
                <Link href="/admin/files" className="text-xs text-[#0054A6] hover:text-[#003B75] transition-colors font-bold flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>عرض جميع الملفات</span>
                </Link>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right text-slate-650 font-medium">
                  <thead>
                    <tr className="text-slate-400 font-bold border-b border-slate-100">
                      <th className="py-2.5 pb-3 pr-1 text-right">رقم الملف</th>
                      <th className="py-2.5 pb-3 text-right">اسم العميل</th>
                      <th className="py-2.5 pb-3 text-right">الدولة</th>
                      <th className="py-2.5 pb-3 text-right">الشريك</th>
                      <th className="py-2.5 pb-3 text-right">تاريخ الإرسال</th>
                      <th className="py-2.5 pb-3 text-right">الحالة</th>
                      <th className="py-2.5 pb-3 text-left">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    
                    {/* Row 1 */}
                    <tr className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-4 pr-1 font-bold text-slate-800 text-[10px]">GFV-2024-001248</td>
                      <td className="py-4 text-slate-850 font-extrabold">محمد علي</td>
                      <td className="py-4">
                        <div className="flex items-center gap-1.5" dir="rtl">
                          <FranceFlag />
                          <span className="text-[10px] text-slate-500 font-bold">فرنسا</span>
                        </div>
                      </td>
                      <td className="py-4 text-slate-500 text-[10px] font-bold">شركة الياسمين</td>
                      <td className="py-4 text-slate-400 text-[10px]">15 مايو 2024 - 14:30</td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black bg-purple-50 text-purple-650 whitespace-nowrap">
                          جاري المعالجة
                        </span>
                      </td>
                      <td className="py-4 text-left">
                        <Link href="/admin/files" className="px-3 py-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg inline-block transition-colors font-bold text-[10px] shadow-3xs">
                          عرض
                        </Link>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-4 pr-1 font-bold text-slate-800 text-[10px]">GFV-2024-001247</td>
                      <td className="py-4 text-slate-850 font-extrabold">فاطمة الزهراء</td>
                      <td className="py-4">
                        <div className="flex items-center gap-1.5" dir="rtl">
                          <SpainFlag />
                          <span className="text-[10px] text-slate-500 font-bold">إسبانيا</span>
                        </div>
                      </td>
                      <td className="py-4 text-slate-500 text-[10px] font-bold">أبو بكر لخدمات السفر</td>
                      <td className="py-4 text-slate-400 text-[10px]">15 مايو 2024 - 13:15</td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black bg-blue-50 text-[#0054A6] whitespace-nowrap">
                          قيد إعداد الملف
                        </span>
                      </td>
                      <td className="py-4 text-left">
                        <Link href="/admin/files" className="px-3 py-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg inline-block transition-colors font-bold text-[10px] shadow-3xs">
                          عرض
                        </Link>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-4 pr-1 font-bold text-slate-800 text-[10px]">GFV-2024-001246</td>
                      <td className="py-4 text-slate-850 font-extrabold">أحمد رضا</td>
                      <td className="py-4">
                        <div className="flex items-center gap-1.5" dir="rtl">
                          <ItalyFlag />
                          <span className="text-[10px] text-slate-500 font-bold">إيطاليا</span>
                        </div>
                      </td>
                      <td className="py-4 text-slate-500 text-[10px] font-bold">شركة الياسمين</td>
                      <td className="py-4 text-slate-400 text-[10px]">15 مايو 2024 - 11:20</td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black bg-amber-50 text-amber-600 whitespace-nowrap">
                          تم التواصل مع العميل
                        </span>
                      </td>
                      <td className="py-4 text-left">
                        <Link href="/admin/files" className="px-3 py-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg inline-block transition-colors font-bold text-[10px] shadow-3xs">
                          عرض
                        </Link>
                      </td>
                    </tr>

                    {/* Row 4 */}
                    <tr className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-4 pr-1 font-bold text-slate-800 text-[10px]">GFV-2024-001245</td>
                      <td className="py-4 text-slate-850 font-extrabold">سارة بنت عبد الله</td>
                      <td className="py-4">
                        <div className="flex items-center gap-1.5" dir="rtl">
                          <TurkeyFlag />
                          <span className="text-[10px] text-slate-500 font-bold">تركيا</span>
                        </div>
                      </td>
                      <td className="py-4 text-slate-500 text-[10px] font-bold">رحال للسياحة</td>
                      <td className="py-4 text-slate-400 text-[10px]">15 مايو 2024 - 10:05</td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-50 text-emerald-600 whitespace-nowrap">
                          تم الإنجاز
                        </span>
                      </td>
                      <td className="py-4 text-left">
                        <Link href="/admin/files" className="px-3 py-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg inline-block transition-colors font-bold text-[10px] shadow-3xs">
                          عرض
                        </Link>
                      </td>
                    </tr>

                    {/* Row 5 */}
                    <tr className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-4 pr-1 font-bold text-slate-800 text-[10px]">GFV-2024-001244</td>
                      <td className="py-4 text-slate-850 font-extrabold">يوسف بلال</td>
                      <td className="py-4">
                        <div className="flex items-center gap-1.5" dir="rtl">
                          <GermanyFlag />
                          <span className="text-[10px] text-slate-500 font-bold">ألمانيا</span>
                        </div>
                      </td>
                      <td className="py-4 text-slate-500 text-[10px] font-bold">أبو بكر لخدمات السفر</td>
                      <td className="py-4 text-slate-400 text-[10px]">15 مايو 2024 - 09:40</td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black bg-slate-50 text-slate-500 border border-slate-200 whitespace-nowrap">
                          جديد
                        </span>
                      </td>
                      <td className="py-4 text-left">
                        <Link href="/admin/files" className="px-3 py-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg inline-block transition-colors font-bold text-[10px] shadow-3xs">
                          عرض
                        </Link>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

              {/* Bottom Centered "عرض جميع الملفات" Trigger */}
              <div className="pt-2 border-t border-slate-50 flex justify-center">
                <Link 
                  href="/admin/files" 
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
                  <span>عرض جميع الملفات</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Mini stats and new partner list */}
        <div className="space-y-6">
          
          {/* Card 1: العمولات والأرباح Summary */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-800 text-sm">العمولات والأرباح</h3>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 shadow-3xs">
                <DollarSign className="w-4 h-4 text-[#0054A6]" />
              </div>
            </div>

            <div className="space-y-3.5 pt-1">
              
              {/* Row 1: إجمالي العمولات */}
              <div className="flex items-center justify-between py-2.5 border-b border-slate-50">
                <span className="text-xs font-black text-slate-800" dir="ltr">60,750.00 DH</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs text-slate-500 font-bold">إجمالي العمولات</span>
                  <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-3xs border border-purple-100/50">
                    <CreditCard className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Row 2: مدفوعة */}
              <div className="flex items-center justify-between py-2.5 border-b border-slate-50">
                <span className="text-xs font-black text-emerald-600" dir="ltr">15,500.00 DH</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs text-slate-500 font-bold">مدفوعة</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-3xs border border-emerald-100/50">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Row 3: قيد المراجعة */}
              <div className="flex items-center justify-between py-2.5 border-b border-slate-50">
                <span className="text-xs font-black text-amber-500" dir="ltr">20,000.00 DH</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs text-slate-500 font-bold">قيد المراجعة</span>
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 shadow-3xs border border-amber-100/50">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Row 4: المتبقية للدفع */}
              <div className="flex items-center justify-between py-2.5">
                <span className="text-xs font-black text-[#0054A6]" dir="ltr">25,250.00 DH</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs text-slate-500 font-bold">المتبقية للدفع</span>
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0054A6] flex items-center justify-center shrink-0 shadow-3xs border border-blue-100/50">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>

            <Link 
              href="/admin/commissions" 
              className="w-full mt-4 py-2.5 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-white" />
              <span>إدارة العمولات</span>
            </Link>
          </div>

          {/* Card 2: الشركاء الجدد */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-800 text-sm">الشركاء الجدد</h3>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 shadow-3xs">
                <Users className="w-4 h-4 text-slate-600" />
              </div>
            </div>

            <div className="space-y-4 pt-1">
              
              {/* Partner 1 */}
              <div className="flex items-center justify-between relative py-1">
                <span className="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">نشط</span>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <h4 className="text-xs font-extrabold text-slate-850">شركة الرحال للسياحة</h4>
                    <span className="text-[9px] text-slate-400 font-bold block mt-0.5">انضم في 15 مايو 2024</span>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#0054A6] flex items-center justify-center shrink-0 border border-purple-100/50 font-bold text-sm">
                    <Building2 className="w-5 h-5 text-[#0054A6]" />
                  </div>
                </div>
              </div>

              {/* Partner 2 */}
              <div className="flex items-center justify-between relative py-1">
                <span className="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">نشط</span>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <h4 className="text-xs font-extrabold text-slate-850">سفريات الأندلس</h4>
                    <span className="text-[9px] text-slate-400 font-bold block mt-0.5">انضم في 14 مايو 2024</span>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#0054A6] flex items-center justify-center shrink-0 border border-purple-100/50 font-bold text-sm">
                    <Building2 className="w-5 h-5 text-[#0054A6]" />
                  </div>
                </div>
              </div>

              {/* Partner 3 */}
              <div className="flex items-center justify-between relative py-1">
                <span className="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">نشط</span>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <h4 className="text-xs font-extrabold text-slate-850">شركة الأفق للسفر</h4>
                    <span className="text-[9px] text-slate-400 font-bold block mt-0.5">انضم في 13 مايو 2024</span>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#0054A6] flex items-center justify-center shrink-0 border border-purple-100/50 font-bold text-sm">
                    <Building2 className="w-5 h-5 text-[#0054A6]" />
                  </div>
                </div>
              </div>

            </div>

            <Link 
              href="/admin/partners" 
              className="w-full mt-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
              <span>عرض جميع الشركاء</span>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
