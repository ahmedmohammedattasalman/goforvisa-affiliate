"use client";

import React, { useState } from "react";
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
const FranceFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="1" height="2" fill="#002395" />
    <rect x="1" width="1" height="2" fill="#FFFFFF" />
    <rect x="2" width="1" height="2" fill="#ED2939" />
  </svg>
);

const SpainFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="3" height="2" fill="#C60B1E" />
    <rect y="0.5" width="3" height="1" fill="#FBE122" />
  </svg>
);

const ItalyFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="1" height="2" fill="#009246" />
    <rect x="1" width="1" height="2" fill="#F1F2F1" />
    <rect x="2" width="1" height="2" fill="#CE2B37" />
  </svg>
);

const TurkeyFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="3" height="2" fill="#E30A17" />
    <circle cx="1.1" cy="1" r="0.4" fill="#FFFFFF" />
    <circle cx="1.2" cy="1" r="0.32" fill="#E30A17" />
    <polygon points="1.6,1 1.45,1.07 1.48,0.9 1.35,0.8 1.52,0.8" fill="#FFFFFF" />
  </svg>
);

const GermanyFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="3" height="2" fill="#FFCF00" />
    <rect width="3" height="1.33" fill="#DD0000" />
    <rect width="3" height="0.67" fill="#000000" />
  </svg>
);

export default function DashboardOverview() {
  const { 
    partner, 
    currentBalance, 
    totalCommissions 
  } = useApp();

  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [lineFilterOpen, setLineFilterOpen] = useState(false);

  return (
    <div className="space-y-6 font-sans text-right pb-12" dir="rtl">
      
      {/* ROW 1: Greeting Banner & Calendar Dropdown (Full width) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Greeting Banner (Right side in RTL) */}
        <div className="space-y-1 py-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 flex items-center justify-start gap-2">
            مرحبًا بك، {partner?.name || "أحمد بن ياسين"} 👋
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
            <span>21 مايو 2024</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-2" />
          </button>
          {dateFilterOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-lg py-1.5 z-30 text-right">
              <button onClick={() => setDateFilterOpen(false)} className="w-full text-right px-4 py-2 text-xs font-bold hover:bg-slate-50 text-slate-700">21 مايو 2024 (اليوم)</button>
              <button onClick={() => setDateFilterOpen(false)} className="w-full text-right px-4 py-2 text-xs font-bold hover:bg-slate-50 text-slate-700">آخر 7 أيام</button>
              <button onClick={() => setDateFilterOpen(false)} className="w-full text-right px-4 py-2 text-xs font-bold hover:bg-slate-50 text-slate-700">هذا الشهر</button>
              <button onClick={() => setDateFilterOpen(false)} className="w-full text-right px-4 py-2 text-xs font-bold hover:bg-slate-50 text-slate-700">مايو 2024</button>
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
            <span className="text-[10px] text-slate-400 font-extrabold block whitespace-nowrap">قيد المراجعة</span>
            <span className="text-2xl font-black text-slate-800 block mt-1 leading-none">18</span>
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
            <span className="text-2xl font-black text-slate-800 block mt-1 leading-none">27</span>
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
            <span className="text-2xl font-black text-slate-800 block mt-1 leading-none">64</span>
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
            <span className="text-2xl font-black text-slate-800 block mt-1 leading-none">5</span>
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
                  12,500.00 <span className="text-xs font-bold text-emerald-600/80">DH</span>
                </span>
                <span className="text-[9px] text-slate-400 font-bold block">الرصيد المتاح للسحب</span>
              </div>
              <div className="space-y-0.5 text-left">
                <span className="text-[10px] text-slate-400 font-bold block">إجمالي الملفات</span>
                <span className="text-2xl font-black text-slate-800 block leading-tight">128</span>
                <span className="text-[9px] text-slate-400 font-bold block">كل الملفات</span>
              </div>
            </div>

            {/* Split pending & paid details */}
            <div className="flex gap-4">
              <div className="flex-1 bg-slate-50/50 border border-slate-100 rounded-2xl p-3.5 flex justify-between items-center gap-2">
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 font-bold block">مستحقة</span>
                  <span className="text-xs font-black text-slate-700 block mt-0.5">2,000.00 DH</span>
                </div>
                <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="flex-1 bg-slate-50/50 border border-slate-100 rounded-2xl p-3.5 flex justify-between items-center gap-2">
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 font-bold block">مدفوعة</span>
                  <span className="text-xs font-black text-slate-700 block mt-0.5">10,500.00 DH</span>
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
                <span className="text-xs font-extrabold text-slate-700" dir="ltr">25,500.00 DH</span>
              </div>

              {/* Row 2 */}
              <div className="flex justify-between items-center py-2 border-b border-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-500 font-bold">إجمالي الملفات المنجزة</span>
                </div>
                <span className="text-xs font-extrabold text-slate-700">64</span>
              </div>

              {/* Row 3 */}
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-500 font-bold">متوسط العمولة لكل ملف</span>
                </div>
                <span className="text-xs font-extrabold text-slate-700" dir="ltr">500.00 DH</span>
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
                    <span className="text-slate-400 font-medium">18 (14.1%)</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                      <span className="text-slate-500">قيد المراجعة</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">27 (21.1%)</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                      <span className="text-slate-500">قيد المعالجة</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">64 (50.0%)</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                      <span className="text-slate-500">تم الإنجاز</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">5 (3.9%)</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                      <span className="text-slate-500">ملغاة / مرفوضة</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">14 (10.9%)</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0"></span>
                      <span className="text-slate-500">أخرى</span>
                    </div>
                  </div>
                </div>

                {/* 2. Doughnut SVG (cx=50, cy=50, r=35, circumference=219.9) */}
                <div className="w-32 h-32 flex items-center justify-center shrink-0 relative">
                  
                  {/* Absolute overlay values in center */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none mt-1">
                    <span className="text-xl font-black text-slate-800 leading-none">128</span>
                    <span className="text-[7px] text-slate-400 font-bold block mt-1">إجمالي الملفات</span>
                  </div>

                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* Segment 1: Green (تم الإنجاز) - 50.0% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="#10B981"
                      strokeWidth="11"
                      strokeDasharray="110 219.9"
                      strokeDashoffset="0"
                    />
                    {/* Segment 2: Grey (أخرى) - 10.9% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="#94A3B8"
                      strokeWidth="11"
                      strokeDasharray="24 219.9"
                      strokeDashoffset="-110"
                    />
                    {/* Segment 3: Red (ملغاة / مرفوضة) - 3.9% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="#EF4444"
                      strokeWidth="11"
                      strokeDasharray="8.6 219.9"
                      strokeDashoffset="-134"
                    />
                    {/* Segment 4: Blue (قيد المراجعة) - 14.1% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="#3B82F6"
                      strokeWidth="11"
                      strokeDasharray="31 219.9"
                      strokeDashoffset="-142.6"
                    />
                    {/* Segment 5: Yellow (قيد المعالجة) - 21.1% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke="#F59E0B"
                      strokeWidth="11"
                      strokeDasharray="46.3 219.9"
                      strokeDashoffset="-173.6"
                    />
                  </svg>
                </div>

              </div>
            </div>
            
            {/* Chart 1: Line Chart "تطور الملفات" (Second in code so it renders on the left in RTL) */}
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
                      <button onClick={() => setLineFilterOpen(false)} className="w-full text-right px-3 py-1.5 text-[10px] font-bold hover:bg-slate-50 text-slate-700">آخر 6 أشهر</button>
                      <button onClick={() => setLineFilterOpen(false)} className="w-full text-right px-3 py-1.5 text-[10px] font-bold hover:bg-slate-50 text-slate-700">هذا العام</button>
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

                  {/* Vertical labels or grid lines */}
                  <text x="15" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">أبريل 22</text>
                  <text x="80" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">أبريل 29</text>
                  <text x="145" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">6 مايو</text>
                  <text x="210" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">13 مايو</text>
                  <text x="275" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">20 مايو</text>

                  {/* Left axes labels */}
                  <text x="295" y="112" textAnchor="end" className="text-[7px] fill-slate-300 font-bold">0</text>
                  <text x="295" y="88" textAnchor="end" className="text-[7px] fill-slate-300 font-bold">5</text>
                  <text x="295" y="63" textAnchor="end" className="text-[7px] fill-slate-300 font-bold">10</text>
                  <text x="295" y="38" textAnchor="end" className="text-[7px] fill-slate-300 font-bold">15</text>
                  <text x="295" y="13" textAnchor="end" className="text-[7px] fill-slate-300 font-bold">20</text>
                  <text x="295" y="3" textAnchor="end" className="text-[7px] fill-slate-300 font-bold">25</text>

                  {/* Curved path gradient fill */}
                  <path d="M 15 105 C 47.5 90, 47.5 90, 80 82 C 112.5 74, 112.5 50, 145 42 C 177.5 34, 177.5 54, 210 46 C 242.5 38, 242.5 22, 275 34 L 275 110 L 15 110 Z" fill="url(#blue-grad)" />

                  {/* Curve stroke */}
                  <path d="M 15 105 C 47.5 90, 47.5 90, 80 82 C 112.5 74, 112.5 50, 145 42 C 177.5 34, 177.5 54, 210 46 C 242.5 38, 242.5 22, 275 34" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Data points */}
                  <circle cx="15" cy="105" r="3.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                  <circle cx="80" cy="82" r="3.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                  <circle cx="145" cy="42" r="3.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                  <circle cx="210" cy="46" r="3.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                  <circle cx="275" cy="34" r="3.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
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
                  <span>قيد المراجعة</span>
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
                      
                      {/* Row 1 */}
                      <tr className="hover:bg-slate-50/40 transition-colors">
                        <td className="py-3 pr-1 font-bold text-slate-850 text-[10px]">GFV-2024-000123</td>
                        <td className="py-3 font-semibold text-slate-700">
                          <div className="flex items-center justify-between w-full pl-4">
                            <span>محمد علي</span>
                            <div className="flex items-center gap-1.5" dir="rtl">
                              <span className="text-[10px] text-slate-400 font-bold">فرنسا</span>
                              <FranceFlag />
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
                            تم الإنجاز
                          </span>
                        </td>
                        <td className="py-3 text-left font-bold text-slate-800">500 DH</td>
                      </tr>

                      {/* Row 2 */}
                      <tr className="hover:bg-slate-50/40 transition-colors">
                        <td className="py-3 pr-1 font-bold text-slate-850 text-[10px]">GFV-2024-000124</td>
                        <td className="py-3 font-semibold text-slate-700">
                          <div className="flex items-center justify-between w-full pl-4">
                            <span>فاطمة الزهراء</span>
                            <div className="flex items-center gap-1.5" dir="rtl">
                              <span className="text-[10px] text-slate-400 font-bold">إسبانيا</span>
                              <SpainFlag />
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50/70 text-amber-600 whitespace-nowrap">
                            قيد المعالجة
                          </span>
                        </td>
                        <td className="py-3 text-left font-medium text-slate-300">-</td>
                      </tr>

                      {/* Row 3 */}
                      <tr className="hover:bg-slate-50/40 transition-colors">
                        <td className="py-3 pr-1 font-bold text-slate-850 text-[10px]">GFV-2024-000125</td>
                        <td className="py-3 font-semibold text-slate-700">
                          <div className="flex items-center justify-between w-full pl-4">
                            <span>أحمد رضا</span>
                            <div className="flex items-center gap-1.5" dir="rtl">
                              <span className="text-[10px] text-slate-400 font-bold">إيطاليا</span>
                              <ItalyFlag />
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 text-blue-600 whitespace-nowrap">
                            قيد المراجعة
                          </span>
                        </td>
                        <td className="py-3 text-left font-medium text-slate-300">-</td>
                      </tr>

                      {/* Row 4 */}
                      <tr className="hover:bg-slate-50/40 transition-colors">
                        <td className="py-3 pr-1 font-bold text-slate-850 text-[10px]">GFV-2024-000126</td>
                        <td className="py-3 font-semibold text-slate-700">
                          <div className="flex items-center justify-between w-full pl-4">
                            <span>سارة بنت عبد الله</span>
                            <div className="flex items-center gap-1.5" dir="rtl">
                              <span className="text-[10px] text-slate-400 font-bold">تركيا</span>
                              <TurkeyFlag />
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-50 text-purple-600 whitespace-nowrap">
                            جاري التواصل
                          </span>
                        </td>
                        <td className="py-3 text-left font-medium text-slate-300">-</td>
                      </tr>

                      {/* Row 5 */}
                      <tr className="hover:bg-slate-50/40 transition-colors">
                        <td className="py-3 pr-1 font-bold text-slate-850 text-[10px]">GFV-2024-000127</td>
                        <td className="py-3 font-semibold text-slate-700">
                          <div className="flex items-center justify-between w-full pl-4">
                            <span>يوسف بلال</span>
                            <div className="flex items-center gap-1.5" dir="rtl">
                              <span className="text-[10px] text-slate-400 font-bold">ألمانيا</span>
                              <GermanyFlag />
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-orange-50 text-orange-600 whitespace-nowrap">
                            قيد إعداد الملف
                          </span>
                        </td>
                        <td className="py-3 text-left font-medium text-slate-300">-</td>
                      </tr>

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
                
                {/* Notification 1 */}
                <div className="flex items-start gap-3 relative pb-3.5 border-b border-slate-50/60 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-0.5 text-right">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-bold">منذ 10 دقائق</span>
                      <h4 className="text-[11px] font-extrabold text-slate-800">تم إنجاز الملف بنجاح</h4>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal font-medium">
                      تم إنجاز الملف رقم GFV-2024-000123 بنجاح وتم إضافة عمولتك.
                    </p>
                  </div>
                </div>

                {/* Notification 2 */}
                <div className="flex items-start gap-3 relative pb-3.5 border-b border-slate-50/60 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-0.5 text-right">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-bold">منذ 1 ساعة</span>
                      <h4 className="text-[11px] font-extrabold text-slate-800">تحديث حالة الملف</h4>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal font-medium">
                      تم تحديث حالة الملف رقم GFV-2024-000124 إلى قيد المعالجة.
                    </p>
                  </div>
                </div>

                {/* Notification 3 */}
                <div className="flex items-start gap-3 relative pb-3.5 border-b border-slate-50/60 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-0.5 text-right">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-bold">منذ 3 ساعات</span>
                      <h4 className="text-[11px] font-extrabold text-slate-800 text-amber-600">طلب معلومات إضافية</h4>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal font-medium">
                      يرجى التواصل مع العميل رقم GFV-2024-000125 لطلب معلومات إضافية.
                    </p>
                  </div>
                </div>

                {/* Notification 4 */}
                <div className="flex items-start gap-3 relative">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-0.5 text-right">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-bold">منذ 5 ساعات</span>
                      <h4 className="text-[11px] font-extrabold text-slate-800">ملف جديد</h4>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal font-medium">
                      تم استلام ملف جديد رقم GFV-2024-000126.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
