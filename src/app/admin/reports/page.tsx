"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  Filter, 
  Calendar, 
  ChevronDown, 
  ChevronLeft,
  DollarSign,
  Users,
  Folder,
  CreditCard,
  Handshake,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  FileDown,
  FileSpreadsheet,
  TrendingUp,
  Trophy,
  ArrowUpRight
} from "lucide-react";

// Flag wrappers matching page.tsx design
const FlagWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-slate-200/60 shadow-xs">
    <div className="w-7 h-5 shrink-0 flex items-center justify-center">
      {children}
    </div>
  </div>
);

const SpainFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#C60B1E" />
      <rect y="0.5" width="3" height="1" fill="#FBE122" />
    </svg>
  </FlagWrapper>
);

const FranceFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 3 2">
      <rect width="1" height="2" fill="#002395" />
      <rect x="1" width="1" height="2" fill="#FFFFFF" />
      <rect x="2" width="1" height="2" fill="#ED2939" />
    </svg>
  </FlagWrapper>
);

const CanadaFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#FF0000" />
      <rect x="0.75" width="1.5" height="2" fill="#FFFFFF" />
      <path d="M 1.5,0.6 L 1.6,0.9 L 1.9,0.8 L 1.7,1.1 L 1.9,1.3 L 1.6,1.2 L 1.5,1.5 L 1.4,1.2 L 1.1,1.3 L 1.3,1.1 L 1.1,0.8 L 1.4,0.9 Z" fill="#FF0000" />
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

const PortugalFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#FF0000" />
      <rect width="1.2" height="2" fill="#006600" />
      <circle cx="1.2" cy="1" r="0.25" fill="#FFFF00" />
      <rect x="1.15" y="0.9" width="0.1" height="0.2" fill="#0000FF" />
    </svg>
  </FlagWrapper>
);

export default function AdminReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");

  // KPI Metrics with exact mockup data in RTL order (Index 0 is far right: Withdrawals)
  const metrics = [
    {
      title: "إجمالي طلبات السحب",
      value: "75",
      suffix: "طلب",
      change: "+9.4% عن الشهر الماضي",
      icon: <CreditCard className="w-5 h-5" />,
      colorClass: "bg-blue-50 text-[#0054A6] border-blue-100"
    },
    {
      title: "إجمالي الأرباح",
      value: "145,250.00",
      suffix: "DH",
      change: "+15.8% عن الشهر الماضي",
      icon: <DollarSign className="w-5 h-5" />,
      colorClass: "bg-amber-50 text-amber-600 border-amber-100"
    },
    {
      title: "إجمالي الشركاء",
      value: "128",
      suffix: "شريك",
      change: "+8.7% عن الشهر الماضي",
      icon: <Handshake className="w-5 h-5" />,
      colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      title: "إجمالي العملاء",
      value: "842",
      suffix: "عميل",
      change: "+10.3% عن الشهر الماضي",
      icon: <Users className="w-5 h-5" />,
      colorClass: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "إجمالي الملفات",
      value: "1,248",
      suffix: "ملف",
      change: "+12.5% عن الشهر الماضي",
      icon: <Folder className="w-5 h-5" />,
      colorClass: "bg-purple-50 text-purple-700 border-purple-100"
    }
  ];

  // Best Performing Partners data
  const topPartners = [
    { rank: 1, name: "Travel Anamer", files: 312, earnings: "28,450.00" },
    { rank: 2, name: "Go Mosafer", files: 198, earnings: "22,780.00" },
    { rank: 3, name: "Eagle Tourism", files: 165, earnings: "18,320.00" },
    { rank: 4, name: "Nile Travel", files: 141, earnings: "15,900.00" },
    { rank: 5, name: "Atlas Travel", files: 96, earnings: "11,250.00" }
  ];

  // Available Reports to export
  const availableReports = [
    { 
      title: "تقرير الأداء الشهري", 
      desc: "ملخص شامل للأداء الشهري",
      icon: <BarChart3 className="w-5 h-5" />,
      colorClass: "bg-purple-50 text-purple-600 border-purple-100"
    },
    { 
      title: "تقرير طلبات السحب", 
      desc: "تفاصيل طلبات السحب والمدفوعات",
      icon: <CreditCard className="w-5 h-5" />,
      colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    { 
      title: "تقرير الملفات", 
      desc: "حالة الملفات والإحصائيات",
      icon: <Folder className="w-5 h-5" />,
      colorClass: "bg-purple-50 text-purple-600 border-purple-100"
    },
    { 
      title: "تقرير العملاء", 
      desc: "إحصائيات العملاء الجدد والناشطين",
      icon: <Users className="w-5 h-5" />,
      colorClass: "bg-blue-50 text-blue-600 border-blue-100"
    },
    { 
      title: "تقرير الشركاء", 
      desc: "أداء الشركاء والعمولات",
      icon: <Handshake className="w-5 h-5" />,
      colorClass: "bg-blue-50 text-[#0054A6] border-blue-100"
    },
    { 
      title: "تقرير الأرباح", 
      desc: "تفاصيل الأرباح والعمولات",
      icon: <DollarSign className="w-5 h-5" />,
      colorClass: "bg-amber-50 text-amber-600 border-amber-100"
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-1.5">
            <Link href="/admin" className="hover:text-[#0054A6]">الرئيسية</Link>
            <span className="mx-1">/</span>
            <span>التقارير والإحصائيات</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-700 shadow-xs">
              <BarChart3 className="w-5 h-5 text-[#0054A6]" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800">التقارير والإحصائيات</h1>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">نظرة عامة على أداء النظام</p>
        </div>
      </div>

      {/* Filter Row: Filter Button, From Date, To Date, Period (flows RTL) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-wrap items-end justify-start gap-4 flex-1">
          
          {/* Period Selection */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-500 font-bold">الفترة</label>
            <div className="relative">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-2 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="this-month">هذا الشهر</option>
                <option value="last-month">الشهر الماضي</option>
                <option value="six-months">آخر 6 أشهر</option>
                <option value="this-year">هذه السنة</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-7.5 pointer-events-none" />
            </div>
          </div>

          {/* Date Picker: إلى تاريخ */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-500 font-bold">إلى تاريخ</label>
            <div className="relative">
              <input 
                type="date" 
                defaultValue="2024-05-31"
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer text-slate-700 font-bold h-[38px] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
              />
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Date Picker: من تاريخ */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-500 font-bold">من تاريخ</label>
            <div className="relative">
              <input 
                type="date" 
                defaultValue="2024-05-01"
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer text-slate-700 font-bold h-[38px] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
              />
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Filter Trigger */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-transparent select-none">تصفية</span>
            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer h-[38px]">
              <Filter className="w-3.5 h-3.5" />
              <span>تصفية</span>
            </button>
          </div>

        </div>
      </div>

      {/* KPI Cards Row (5 Cards) - Flows from Right-to-Left (RTL) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {metrics.map((card, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between h-[100px]">
            
            {/* Card Content Top */}
            <div className="flex items-center justify-between gap-3">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-extrabold block">{card.title}</span>
                <div className="flex items-baseline gap-1 mt-1 leading-none">
                  <span className="text-xl font-black text-slate-800" dir="ltr">{card.value}</span>
                  {card.suffix && <span className="text-[10px] text-slate-400 font-bold">{card.suffix}</span>}
                </div>
              </div>
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100/50 ${card.colorClass}`}>
                {card.icon}
              </div>
            </div>

            {/* Card Info Bottom */}
            <div className="flex items-center justify-start gap-1 text-[9px] mt-1.5">
              <span className="text-emerald-600 font-extrabold">{card.change.split(" ")[0]}</span>
              <span className="text-slate-400 font-bold">{card.change.split(" ").slice(1).join(" ")}</span>
            </div>

          </div>
        ))}
      </div>

      {/* Middle Row Charts (3 Cards) - Flowing RTL: Withdrawals (Right), Visa Types (Middle), Monthly Profits (Left) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 3: طلبات السحب (Doughnut Chart with Center text - Right) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-800 text-sm text-right">طلبات السحب</h3>
          </div>

          <div className="py-4 flex-1 flex items-center justify-between gap-4">
            
            {/* Legend on the right side of the card in RTL */}
            <div className="flex-1 space-y-2.5 text-right">
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0" dir="ltr">60.9%</span>
                <span className="text-slate-700 font-black text-left w-20 shrink-0" dir="ltr">88,450 DH</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">تم الدفع</span>
                  <span className="w-2 h-2 rounded-[2px] bg-[#10B981] shrink-0"></span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0" dir="ltr">16.7%</span>
                <span className="text-slate-700 font-black text-left w-20 shrink-0" dir="ltr">24,300 DH</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">قيد المعالجة</span>
                  <span className="w-2 h-2 rounded-[2px] bg-[#3B82F6] shrink-0"></span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0" dir="ltr">22.4%</span>
                <span className="text-slate-700 font-black text-left w-20 shrink-0" dir="ltr">32,500 DH</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">قيد المراجعة</span>
                  <span className="w-2 h-2 rounded-[2px] bg-[#F59E0B] shrink-0"></span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0" dir="ltr">3.4%</span>
                <span className="text-slate-700 font-black text-left w-20 shrink-0" dir="ltr">5,000 DH</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">مرفوضة</span>
                  <span className="w-2 h-2 rounded-[2px] bg-[#EF4444] shrink-0"></span>
                </div>
              </div>
            </div>

            {/* Doughnut SVG with center label */}
            <div className="relative w-28 h-28 shrink-0">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <g transform="rotate(-90 50 50)">
                  {/* تم الدفع 60.9%: length = 153.06 */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10B981" strokeWidth="12" strokeDasharray="153.06 251.33" strokeDashoffset="0" />
                  {/* قيد المراجعة 22.4%: length = 56.3 */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F59E0B" strokeWidth="12" strokeDasharray="56.3 251.33" strokeDashoffset="-153.06" />
                  {/* قيد المعالجة 16.7%: length = 41.97 */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3B82F6" strokeWidth="12" strokeDasharray="41.97 251.33" strokeDashoffset="-209.36" />
                  {/* مرفوضة 3.4%: length = 8.55 */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EF4444" strokeWidth="12" strokeDasharray="8.55 251.33" strokeDashoffset="-251.33" />
                </g>
              </svg>
              {/* Center hole content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full m-[18px] shadow-2xs text-center p-1">
                <span className="text-[7px] text-slate-400 font-extrabold leading-none">المجموع</span>
                <span className="text-[9px] text-[#0054A6] font-black mt-1 leading-tight">145,250 DH</span>
              </div>
            </div>

          </div>
        </div>

        {/* Chart 2: توزيع الملفات حسب نوع التأشيرة (Doughnut Chart - Middle) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-800 text-sm text-right">توزيع الملفات حسب نوع التأشيرة</h3>
          </div>

          <div className="py-4 flex-1 flex items-center justify-between gap-4">
            
            {/* Legend on the right side of the card in RTL */}
            <div className="flex-1 space-y-2.5 text-right">
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0">45%</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">سياحة</span>
                  <span className="w-2 h-2 rounded-[2px] bg-blue-600 shrink-0"></span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0">25%</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">دراسة</span>
                  <span className="w-2 h-2 rounded-[2px] bg-emerald-500 shrink-0"></span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0">15%</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">عمل</span>
                  <span className="w-2 h-2 rounded-[2px] bg-amber-500 shrink-0"></span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0">10%</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">لم الشمل</span>
                  <span className="w-2 h-2 rounded-[2px] bg-purple-500 shrink-0"></span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0">5%</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">أخرى</span>
                  <span className="w-2 h-2 rounded-[2px] bg-slate-400 shrink-0"></span>
                </div>
              </div>
            </div>

            {/* Doughnut SVG */}
            <div className="relative w-28 h-28 shrink-0">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Circumference is 251.33 (2 * pi * r=40)
                    Rotated to start at 12 o'clock (-90 deg) */}
                <g transform="rotate(-90 50 50)">
                  {/* السياحة 45%: length = 113.1 */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2563EB" strokeWidth="12" strokeDasharray="113.1 251.33" strokeDashoffset="0" />
                  {/* الدراسة 25%: length = 62.83 */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10B981" strokeWidth="12" strokeDasharray="62.83 251.33" strokeDashoffset="-113.1" />
                  {/* العمل 15%: length = 37.7 */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F59E0B" strokeWidth="12" strokeDasharray="37.7 251.33" strokeDashoffset="-175.93" />
                  {/* لم الشمل 10%: length = 25.13 */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8B5CF6" strokeWidth="12" strokeDasharray="25.13 251.33" strokeDashoffset="-213.63" />
                  {/* أخرى 5%: length = 12.57 */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#94A3B8" strokeWidth="12" strokeDasharray="12.57 251.33" strokeDashoffset="-238.76" />
                </g>
              </svg>
              {/* Center hole content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full m-[18px] shadow-2xs">
                <span className="text-[8px] text-slate-400 font-bold leading-none">إجمالي</span>
                <span className="text-[10px] text-slate-800 font-black mt-0.5 leading-none">1,248</span>
              </div>
            </div>

          </div>
        </div>

        {/* Chart 1: تطور الأرباح الشهرية (Line Chart - Left in RTL, spans 1 column) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          
          {/* Header info */}
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div className="text-right">
              <h3 className="font-extrabold text-slate-800 text-sm">تطور الأرباح الشهرية</h3>
            </div>
            <div className="relative">
              <button className="flex items-center gap-1 bg-slate-50 border border-slate-200/60 rounded-lg px-2 py-0.5 text-slate-500 text-[10px] font-bold cursor-pointer">
                <span>6 أشهر</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="py-4 flex-1 flex items-center justify-center">
            <svg viewBox="0 0 300 150" className="w-full h-44 overflow-visible">
              {/* Horizontal grid lines */}
              <line x1="30" y1="20" x2="290" y2="20" stroke="#F1F5F9" strokeWidth="0.8" />
              <line x1="30" y1="50" x2="290" y2="50" stroke="#F1F5F9" strokeWidth="0.8" />
              <line x1="30" y1="80" x2="290" y2="80" stroke="#F1F5F9" strokeWidth="0.8" />
              <line x1="30" y1="110" x2="290" y2="110" stroke="#F1F5F9" strokeWidth="0.8" />
              <line x1="30" y1="130" x2="290" y2="130" stroke="#E2E8F0" strokeWidth="1" />

              {/* Y Axis labels */}
              <text x="22" y="23" textAnchor="end" className="text-[6px] fill-slate-350 font-bold">40K</text>
              <text x="22" y="53" textAnchor="end" className="text-[6px] fill-slate-350 font-bold">30K</text>
              <text x="22" y="83" textAnchor="end" className="text-[6px] fill-slate-350 font-bold">20K</text>
              <text x="22" y="113" textAnchor="end" className="text-[6px] fill-slate-350 font-bold">10K</text>
              <text x="22" y="133" textAnchor="end" className="text-[6px] fill-slate-350 font-bold">0</text>

              {/* X Axis labels */}
              <text x="50" y="142" textAnchor="middle" className="text-[6px] fill-slate-400 font-bold">يناير</text>
              <text x="95" y="142" textAnchor="middle" className="text-[6px] fill-slate-400 font-bold">فبراير</text>
              <text x="140" y="142" textAnchor="middle" className="text-[6px] fill-slate-400 font-bold">مارس</text>
              <text x="185" y="142" textAnchor="middle" className="text-[6px] fill-slate-400 font-bold">أبريل</text>
              <text x="230" y="142" textAnchor="middle" className="text-[6px] fill-slate-400 font-bold">مايو</text>
              <text x="275" y="142" textAnchor="middle" className="text-[6px] fill-slate-400 font-bold">يونيو</text>

              {/* Line Stroke */}
              <path
                d="M 50,115 L 95,98 L 140,85 L 185,93 L 230,70 L 275,59"
                fill="none"
                stroke="#0054A6"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Nodes and tooltip values */}
              <circle cx="50" cy="115" r="2" fill="#FFFFFF" stroke="#0054A6" strokeWidth="1.5" />
              <text x="50" y="108" textAnchor="middle" fill="#0054A6" className="text-[5.5px] font-black">12,500</text>

              <circle cx="95" cy="98" r="2" fill="#FFFFFF" stroke="#0054A6" strokeWidth="1.5" />
              <text x="95" y="91" textAnchor="middle" fill="#0054A6" className="text-[5.5px] font-black">18,200</text>

              <circle cx="140" cy="85" r="2" fill="#FFFFFF" stroke="#0054A6" strokeWidth="1.5" />
              <text x="140" y="78" textAnchor="middle" fill="#0054A6" className="text-[5.5px] font-black">22,400</text>

              <circle cx="185" cy="93" r="2" fill="#FFFFFF" stroke="#0054A6" strokeWidth="1.5" />
              <text x="185" y="86" textAnchor="middle" fill="#0054A6" className="text-[5.5px] font-black">19,800</text>

              <circle cx="230" cy="70" r="2" fill="#FFFFFF" stroke="#0054A6" strokeWidth="1.5" />
              <text x="230" y="63" textAnchor="middle" fill="#0054A6" className="text-[5.5px] font-black">27,350</text>

              <circle cx="275" cy="59" r="2" fill="#FFFFFF" stroke="#0054A6" strokeWidth="1.5" />
              <text x="275" y="52" textAnchor="middle" fill="#0054A6" className="text-[5.5px] font-black">31,000</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Grid Row (4 Cards) - Flowing RTL: Employee (Right), Files, Clients, Partners (Left) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 4: أداء الموظفين (Far Right) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between h-[300px]">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-800 text-xs text-right">أداء الموظفين</h3>
          </div>

          <div className="flex-1 py-3 flex flex-col justify-between gap-4">
            
            {/* Top Employee block */}
            <div className="flex items-center justify-between gap-2.5">
              <div className="text-right">
                <span className="text-[8px] text-slate-400 font-bold block">أفضل موظف هذا الشهر</span>
                <span className="font-extrabold text-xs block text-slate-800 mt-0.5">محمد الإدريسي</span>
                <div className="flex items-center gap-1 text-[9px] text-[#0054A6] font-bold mt-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>185 ملف مكتمل</span>
                </div>
              </div>

              {/* Avatar circle */}
              <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                <svg className="w-10 h-10 text-slate-600 mt-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>

            {/* General metrics */}
            <div className="space-y-2 text-[10px] font-bold text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-medium">إجمالي الملفات المعالجة</span>
                <span className="text-slate-800 font-black">842</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-medium">متوسط الإنجاز اليومي</span>
                <span className="text-slate-800 font-black">28 ملف</span>
              </div>
              
              {/* Progress bar ratio */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[9px]">
                  <span className="text-slate-400 font-medium">نسبة الإنجاز</span>
                  <span className="text-[#0054A6] font-black">92%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#0054A6] h-full rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Card 3: إحصائيات الملفات (Middle Right) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between h-[300px]">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-800 text-xs text-right">إحصائيات الملفات</h3>
          </div>

          <div className="flex-1 py-4 flex flex-col justify-between gap-2.5">
            
            {/* Completed */}
            <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-xl border border-slate-100 transition-colors">
              <span className="text-sm font-black text-emerald-600">842</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-600 font-extrabold">الملفات المكتملة</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/50">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* In Progress */}
            <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-xl border border-slate-100 transition-colors">
              <span className="text-sm font-black text-blue-600">252</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-600 font-extrabold">الملفات قيد المعالجة</span>
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/50">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Pending */}
            <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-xl border border-slate-100 transition-colors">
              <span className="text-sm font-black text-amber-500">154</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-600 font-extrabold">الملفات قيد الانتظار</span>
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100/50">
                  <AlertCircle className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Rejected */}
            <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-xl border border-slate-100 transition-colors">
              <span className="text-sm font-black text-rose-600">32</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-600 font-extrabold">الملفات المرفوضة</span>
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100/50">
                  <XCircle className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Card 2: إحصائيات العملاء (Middle Left - Split Layout) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between h-[300px]">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-800 text-xs text-right">إحصائيات العملاء</h3>
          </div>

          <div className="flex-1 py-3 flex items-stretch gap-4">
            
            {/* Right Part in layout: New Clients count + sparkline (first in code -> renders right) */}
            <div className="flex-1 flex flex-col justify-between text-right">
              <div>
                <span className="text-[9px] text-slate-400 font-extrabold block">عملاء جدد هذا الشهر</span>
                <span className="text-3xl font-black text-[#0054A6] block mt-1">124</span>
                <div className="flex items-center justify-start gap-1 mt-1">
                  <span className="text-[9px] text-emerald-600 font-black">+14.6%</span>
                  <span className="text-[8px] text-slate-400 font-bold">عن الشهر الماضي</span>
                </div>
              </div>

              {/* Mini sparkline */}
              <div className="h-12 w-full mt-auto">
                <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path
                    d="M 0,25 L 15,22 L 30,24 L 45,15 L 60,20 L 75,10 L 90,14 L 100,5"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Vertical separator */}
            <div className="w-px bg-slate-100 self-stretch"></div>

            {/* Left Part in layout: Top Countries list (second in code -> renders left) */}
            <div className="flex-1 flex flex-col justify-between">
              <span className="text-[9px] text-slate-400 font-extrabold block text-right mb-2">أكثر الدول طلباً</span>
              <div className="space-y-2">
                <div className="flex items-center gap-3 py-1 border-b border-slate-50 last:border-none">
                  <span className="text-[9px] font-bold text-slate-400 min-w-[8px]">1</span>
                  <div className="flex items-center gap-1.5">
                    <SpainFlag />
                    <span className="text-[10px] text-slate-700 font-bold">إسبانيا</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-1 border-b border-slate-50 last:border-none">
                  <span className="text-[9px] font-bold text-slate-400 min-w-[8px]">2</span>
                  <div className="flex items-center gap-1.5">
                    <FranceFlag />
                    <span className="text-[10px] text-slate-700 font-bold">فرنسا</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-1 border-b border-slate-50 last:border-none">
                  <span className="text-[9px] font-bold text-slate-400 min-w-[8px]">3</span>
                  <div className="flex items-center gap-1.5">
                    <CanadaFlag />
                    <span className="text-[10px] text-slate-700 font-bold">كندا</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-1 border-b border-slate-50 last:border-none">
                  <span className="text-[9px] font-bold text-slate-400 min-w-[8px]">4</span>
                  <div className="flex items-center gap-1.5">
                    <GermanyFlag />
                    <span className="text-[10px] text-slate-700 font-bold">ألمانيا</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-1 border-b border-slate-50 last:border-none">
                  <span className="text-[9px] font-bold text-slate-400 min-w-[8px]">5</span>
                  <div className="flex items-center gap-1.5">
                    <PortugalFlag />
                    <span className="text-[10px] text-slate-700 font-bold">البرتغال</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Card 1: أفضل الشركاء أداءً (Far Left) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between h-[300px]">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-800 text-xs text-right">أفضل الشركاء أداءً</h3>
          </div>

          {/* Simple table list */}
          <div className="flex-1 py-2 overflow-y-auto">
            <table className="w-full text-[10px] text-right text-slate-600 font-bold">
              <thead>
                <tr className="text-slate-400 font-bold border-b border-slate-50">
                  <th className="py-1.5 pr-1 text-right">#</th>
                  <th className="py-1.5 text-right">الشريك</th>
                  <th className="py-1.5 text-center">عدد الملفات</th>
                  <th className="py-1.5 pl-1 text-left">الأرباح (DH)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50/50">
                {topPartners.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30">
                    <td className="py-2.5 pr-1 font-bold text-slate-400">{p.rank}</td>
                    <td className="py-2.5 font-extrabold text-slate-700">{p.name}</td>
                    <td className="py-2.5 text-center font-bold text-slate-500">{p.files}</td>
                    <td className="py-2.5 pl-1 text-left font-black text-slate-800" dir="ltr">{p.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-50 flex justify-center">
            <Link 
              href="/admin/partners" 
              className="text-[10px] text-[#0054A6] hover:underline font-bold transition-all flex items-center gap-1"
            >
              <ChevronLeft className="w-3 h-3" />
              <span>عرض جميع الشركاء</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Footer Row: التقارير المتاحة */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5">
        <div className="pb-2 border-b border-slate-100 text-right">
          <h3 className="font-extrabold text-slate-800 text-sm">التقارير المتاحة</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {availableReports.map((report, idx) => (
            <div key={idx} className="bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 rounded-2xl p-4 border border-slate-200/60 flex flex-col justify-between gap-3 transition-all h-[142px]">
              
              <div className="flex items-start justify-between gap-2.5">
                <div className="text-right flex-1">
                  <span className="font-extrabold text-xs text-slate-800 block leading-snug">{report.title}</span>
                  <span className="text-[9px] text-slate-400 font-medium block mt-1 leading-relaxed">{report.desc}</span>
                </div>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-slate-100/50 ${report.colorClass}`}>
                  {report.icon}
                </div>
              </div>

              {/* Action Buttons: PDF (Red) and Excel (Green) */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                
                <button className="flex items-center justify-center gap-1.5 py-1 px-2 border border-emerald-500 hover:bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black transition-all cursor-pointer">
                  <FileSpreadsheet className="w-3 h-3" />
                  <span>Excel</span>
                </button>

                <button className="flex items-center justify-center gap-1.5 py-1 px-2 border border-red-500 hover:bg-red-50 text-red-600 rounded-lg text-[9px] font-black transition-all cursor-pointer">
                  <FileDown className="w-3 h-3" />
                  <span>PDF</span>
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
