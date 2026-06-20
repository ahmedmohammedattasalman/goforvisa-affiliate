"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ArrowUpRight, 
  Calendar, 
  ChevronDown, 
  Search, 
  Download, 
  Eye, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  RefreshCw,
  Building2,
  Wallet,
  ArrowUp,
  CreditCard
} from "lucide-react";

export default function AdminCommissions() {
  // Filters State
  const [partnerFilter, setPartnerFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");

  // Mock data for financial transactions matching Screenshot 3
  const transactionsData = [
    {
      code: "COM-2024-00125",
      partner: "Eagle Tourism LLC",
      partnerInitials: "ET",
      type: "عمولة طلب",
      requestNum: "WD-2024-000125",
      dateDay: "15 مايو 2024",
      dateTime: "14:30",
      baseAmount: "25,000.00",
      percentage: "10%",
      commission: "2,500.00",
      status: "مدفوعة",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      code: "COM-2024-00124",
      partner: "Nile Travel",
      partnerInitials: "NT",
      type: "عمولة طلب",
      requestNum: "WD-2024-000124",
      dateDay: "14 مايو 2024",
      dateTime: "11:20",
      baseAmount: "18,000.00",
      percentage: "10%",
      commission: "1,800.00",
      status: "مستحقة",
      statusColor: "bg-amber-50 text-amber-600 border-amber-100"
    },
    {
      code: "COM-2024-00123",
      partner: "رحلة العالم للسفر والسياحة",
      partnerInitials: "رو",
      type: "عمولة طلب",
      requestNum: "WD-2024-000123",
      dateDay: "14 مايو 2024",
      dateTime: "10:15",
      baseAmount: "15,000.00",
      percentage: "8%",
      commission: "1,200.00",
      status: "مدفوعة",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      code: "COM-2024-00122",
      partner: "شركة النور للخدمات",
      partnerInitials: "شن",
      type: "عمولة طلب",
      requestNum: "WD-2024-000122",
      dateDay: "13 مايو 2024",
      dateTime: "16:45",
      baseAmount: "25,000.00",
      percentage: "12%",
      commission: "3,000.00",
      status: "مدفوعة",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      code: "COM-2024-00121",
      partner: "Go Mosafer",
      partnerInitials: "GM",
      type: "عمولة طلب",
      requestNum: "WD-2024-000121",
      dateDay: "12 مايو 2024",
      dateTime: "09:30",
      baseAmount: "9,500.00",
      percentage: "10%",
      commission: "950.00",
      status: "مستحقة",
      statusColor: "bg-amber-50 text-amber-600 border-amber-100"
    },
    {
      code: "COM-2024-00120",
      partner: "Travel Anamer",
      partnerInitials: "TA",
      type: "عمولة طلب",
      requestNum: "WD-2024-000120",
      dateDay: "11 مايو 2024",
      dateTime: "13:10",
      baseAmount: "10,000.00",
      percentage: "7.5%",
      commission: "750.00",
      status: "مدفوعة",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100"
    }
  ];

  // Top partners matching list exactly
  const topPartners = [
    { name: "Eagle Tourism LLC", amount: "28,450.00 DH", files: 3, rank: 1, percent: "19% من الإجمالي" },
    { name: "Nile Travel", amount: "22,780.00 DH", files: 3, rank: 2, percent: "15% من الإجمالي" },
    { name: "رحلة العالم للسفر والسياحة", amount: "18,320.00 DH", files: 3, rank: 3, percent: "12% من الإجمالي" },
    { name: "شركة النور للخدمات", amount: "15,950.00 DH", files: 4, rank: 4, percent: "11% من الإجمالي" },
    { name: "Go Mosafer", amount: "11,250.00 DH", files: 5, rank: 5, percent: "7% من الإجمالي" }
  ];

  const handleResetFilters = () => {
    setPartnerFilter("all");
    setTypeFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
    setSelectedPeriod("this-month");
  };

  // Helper to render partner circular logos matching mockup
  const renderPartnerLogo = (partner: string) => {
    if (partner.includes("Eagle")) {
      return (
        <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center text-amber-500 shrink-0 shadow-2xs border border-slate-200/50">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
      );
    }
    if (partner.includes("Nile")) {
      return (
        <div className="w-8 h-8 rounded-full bg-[#ECFDF5] flex items-center justify-center shrink-0 border border-emerald-100 shadow-2xs">
          <span className="text-[#059669] font-black text-[9px]">NILE</span>
        </div>
      );
    }
    if (partner.includes("رحلة")) {
      return (
        <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100 shadow-2xs">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        </div>
      );
    }
    if (partner.includes("النور")) {
      return (
        <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0054A6] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
          <Building2 className="w-4 h-4" />
        </div>
      );
    }
    if (partner.includes("Mosafer")) {
      return (
        <div className="w-8 h-8 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
          <span className="text-[#0284C7] font-black text-[9px]">GO</span>
        </div>
      );
    }
    if (partner.includes("Anamer")) {
      return (
        <div className="w-8 h-8 rounded-full bg-[#0054A6] flex items-center justify-center text-white shrink-0 border border-slate-200/50 shadow-2xs">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M3.6 9h16.8M3.6 15h16.8" />
          </svg>
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-extrabold text-[10px] shrink-0 border border-slate-200 shadow-2xs">
        {partner.substring(0, 2)}
      </div>
    );
  };

  // Filtering Logic
  const filteredTransactions = transactionsData.filter((tx) => {
    const matchesSearch = tx.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.requestNum.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPartner = partnerFilter === "all" || 
                          (partnerFilter === "eagle" && tx.partner.includes("Eagle")) ||
                          (partnerFilter === "nile" && tx.partner.includes("Nile")) ||
                          (partnerFilter === "nour" && tx.partner.includes("النور"));
    
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;

    return matchesSearch && matchesPartner && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Breadcrumbs & Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-1.5">
          <Link href="/admin" className="hover:text-[#0054A6]">الرئيسية</Link>
          <span className="mx-1">/</span>
          <span>العمولات والأرباح</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800">العمولات والأرباح</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">نظرة عامة على أرباح الشركة والعمولات</p>
      </div>

      {/* KPI Cards Row (4 Cards) ordered from right to left (RTL) matching Screenshot:
          This Month's Profits -> Due Commissions -> Paid Commissions -> Total Profits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: أرباح هذا الشهر (This Month's Profits) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100/80 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block">أرباح هذا الشهر</span>
            <span className="text-2xl font-black text-[#7C3AED] block mt-1 leading-none" dir="ltr">18,450.00 DH</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[9px] text-slate-400 font-bold block">مايو 2024</span>
              <div className="flex items-center gap-0.5 text-emerald-650">
                <ArrowUp className="w-3 h-3 stroke-[3]" />
                <span className="text-[9px] font-black">22.1%+ عن الشهر الماضي</span>
              </div>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-650 flex items-center justify-center shrink-0 border border-purple-100/50">
            <TrendingUp className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Card 2: العمولات المستحقة (Due Commissions) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100/80 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block">العمولات المستحقة</span>
            <span className="text-2xl font-black text-[#F59E0B] block mt-1 leading-none" dir="ltr">32,600.00 DH</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[9px] text-slate-400 font-bold block">في انتظار الدفع</span>
              <div className="flex items-center gap-0.5 text-emerald-650">
                <ArrowUp className="w-3 h-3 stroke-[3]" />
                <span className="text-[9px] font-black">9.7%+ عن الفترة السابقة</span>
              </div>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100/50">
            <Clock className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Card 3: العمولات المدفوعة (Paid Commissions) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100/80 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block">العمولات المدفوعة</span>
            <span className="text-2xl font-black text-[#10B981] block mt-1 leading-none" dir="ltr">67,850.00 DH</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[9px] text-slate-400 font-bold block">إجمالي المدفوعات</span>
              <div className="flex items-center gap-0.5 text-emerald-650">
                <ArrowUp className="w-3 h-3 stroke-[3]" />
                <span className="text-[9px] font-black">15.4%+ عن الفترة السابقة</span>
              </div>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/50">
            <Wallet className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Card 4: إجمالي الأرباح (Total Profits) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100/80 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block">إجمالي الأرباح</span>
            <span className="text-2xl font-black text-[#0054A6] block mt-1 leading-none" dir="ltr">145,250.00 DH</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[9px] text-slate-400 font-bold block">منذ بداية العام</span>
              <div className="flex items-center gap-0.5 text-emerald-650">
                <ArrowUp className="w-3 h-3 stroke-[3]" />
                <span className="text-[9px] font-black">18.6%+ عن الفترة السابقة</span>
              </div>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/50">
            <CreditCard className="w-5.5 h-5.5" />
          </div>
        </div>

      </div>

      {/* Filter Row: Filters on Right, Export stacked on Left */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-end justify-between gap-4">
        
        {/* Right Side: Filters with labels ABOVE inputs (flows from right to left in RTL) */}
        <div className="flex flex-wrap items-end justify-start gap-4 flex-1">

          {/* 1. Select Period */}
          <div className="flex flex-col gap-1.5 min-w-[125px]">
            <label className="text-[11px] text-slate-550 font-bold">الفترة</label>
            <div className="relative">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-3 py-2 text-right text-xs font-bold text-slate-650 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="this-month">هذا الشهر</option>
                <option value="last-month">الشهر الماضي</option>
                <option value="this-year">هذه السنة</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-7.5 pointer-events-none" />
            </div>
          </div>

          {/* 2. Date range picker: إلى تاريخ */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-550 font-bold">إلى تاريخ</label>
            <div className="relative">
              <input 
                type="date" 
                defaultValue="2024-05-15"
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer text-slate-700 font-bold h-[38px] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
              />
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 3. Date range picker: من تاريخ */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-550 font-bold">من تاريخ</label>
            <div className="relative">
              <input 
                type="date" 
                defaultValue="2024-05-01"
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer text-slate-700 font-bold h-[38px] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
              />
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 4. Select Partner */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-550 font-bold">الشريك</label>
            <div className="relative">
              <select 
                value={partnerFilter}
                onChange={(e) => setPartnerFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-right text-xs font-bold text-slate-650 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">كل الشركاء</option>
                <option value="eagle">Eagle Tourism</option>
                <option value="nile">Nile Travel</option>
                <option value="nour">شركة النور</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* 5. Select Transaction Type */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-550 font-bold">نوع العملية</label>
            <div className="relative">
              <select 
                value={typeFilter} 
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-right text-xs font-bold text-slate-655 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">كل الأنواع</option>
                <option value="عمولة طلب">عمولة طلب</option>
                <option value="مكافأة">مكافأة ترويجية</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Left Side: Export Button (Outlined white with blue text/icon) */}
        <div className="flex items-center justify-end shrink-0 pt-4 md:pt-0">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#0054A6] hover:bg-blue-50/50 text-[#0054A6] rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer h-[38px]">
            <Download className="w-4 h-4 text-[#0054A6]" />
            <span>تصدير</span>
          </button>
        </div>

      </div>

      {/* Main Grid: Top Partners on the Right (first in HTML), line chart on the Left (second in HTML) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Right Column: Top Partners By Profits (spans 1 col, renders on right in RTL) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4 flex flex-col justify-between lg:col-span-1">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-800 text-sm">أفضل الشركاء حسب الأرباح</h3>
            <button className="text-xs text-[#0054A6] hover:underline font-bold transition-colors cursor-pointer bg-transparent border-none">عرض الكل</button>
          </div>

          <div className="flex-1 space-y-3.5 pt-1">
            {topPartners.map((partner, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 py-2 border-b border-slate-50/60 last:border-none" dir="ltr">
                
                {/* Right side: Rank index + circular logo + name */}
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-black text-slate-400 w-4 text-center">{partner.rank}</span>
                  {renderPartnerLogo(partner.name)}
                  <span className="text-xs font-extrabold text-slate-800 leading-tight">{partner.name}</span>
                </div>

                {/* Left side: Amount and Rank/Weight details */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-black text-slate-800 text-[11px] block" dir="ltr">{partner.amount}</span>
                    <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{partner.percent}</span>
                  </div>
                  <span className="text-xs font-black text-slate-400 w-4 text-right">{partner.files}</span>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Left Column: Monthly Earnings Line Chart (spans 2 cols, renders on left in RTL) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm">الأرباح الشهرية (DH)</h3>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">مقارنة أداء أرباح العمولات خلال العام</p>
            </div>
            <div className="relative">
              <button className="flex items-center gap-1 bg-slate-50 border border-slate-200/60 rounded-xl px-2.5 py-1 text-slate-500 text-[10px] font-bold cursor-pointer">
                <span>12 شهر</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>

          {/* SVG Monthly Earnings Chart */}
          <div className="py-2">
            <svg viewBox="0 0 800 250" width="100%" className="w-full h-64 overflow-visible">
              <defs>
                <linearGradient id="earnings-grad-3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0054A6" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#0054A6" stopOpacity="0"/>
                </linearGradient>
              </defs>

              {/* Horizontal grid lines */}
              <line x1="45" y1="20" x2="780" y2="20" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="45" y1="72" x2="780" y2="72" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="45" y1="125" x2="780" y2="125" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="45" y1="177" x2="780" y2="177" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="45" y1="204" x2="780" y2="204" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="45" y1="230" x2="780" y2="230" stroke="#E2E8F0" strokeWidth="1.2" />

              {/* Monthly X-Axis Labels (Left to Right) */}
              <text x="70" y="245" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">يونيو</text>
              <text x="133" y="245" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">يوليو</text>
              <text x="196" y="245" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">أغسطس</text>
              <text x="259" y="245" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">سبتمبر</text>
              <text x="322" y="245" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">أكتوبر</text>
              <text x="385" y="245" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">نوفمبر</text>
              <text x="448" y="245" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">ديسمبر</text>
              <text x="511" y="245" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">يناير</text>
              <text x="574" y="245" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">فبراير</text>
              <text x="637" y="245" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">مارس</text>
              <text x="700" y="245" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">أبريل</text>
              <text x="763" y="245" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">مايو</text>

              {/* Y-Axis scale tags (Left Aligned) */}
              <text x="30" y="23" textAnchor="end" className="text-[7px] fill-slate-355 font-bold">40K</text>
              <text x="30" y="75" textAnchor="end" className="text-[7px] fill-slate-355 font-bold">30K</text>
              <text x="30" y="128" textAnchor="end" className="text-[7px] fill-slate-355 font-bold">20K</text>
              <text x="30" y="180" textAnchor="end" className="text-[7px] fill-slate-355 font-bold">10K</text>
              <text x="30" y="207" textAnchor="end" className="text-[7px] fill-slate-355 font-bold">5K</text>
              <text x="30" y="233" textAnchor="end" className="text-[7px] fill-slate-355 font-bold">0</text>

              {/* Area filled underneath path */}
              <path 
                d="M 70,165 L 133,150 L 196,131 L 259,144 L 322,116 L 385,126 L 448,107 L 511,100 L 574,82 L 637,120 L 700,151 L 763,133 L 763,230 L 70,230 Z" 
                fill="url(#earnings-grad-3)" 
              />

              {/* Line stroke */}
              <path 
                d="M 70,165 L 133,150 L 196,131 L 259,144 L 322,116 L 385,126 L 448,107 L 511,100 L 574,82 L 637,120 L 700,151 L 763,133" 
                fill="none" 
                stroke="#0054A6" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />

              {/* Bullet Node Highlights */}
              <circle cx="70" cy="165" r="3" fill="#FFFFFF" stroke="#0054A6" strokeWidth="2" />
              <circle cx="133" cy="150" r="3" fill="#FFFFFF" stroke="#0054A6" strokeWidth="2" />
              <circle cx="196" cy="131" r="3" fill="#FFFFFF" stroke="#0054A6" strokeWidth="2" />
              <circle cx="259" cy="144" r="3" fill="#FFFFFF" stroke="#0054A6" strokeWidth="2" />
              <circle cx="322" cy="116" r="3" fill="#FFFFFF" stroke="#0054A6" strokeWidth="2" />
              <circle cx="385" cy="126" r="3" fill="#FFFFFF" stroke="#0054A6" strokeWidth="2" />
              <circle cx="448" cy="107" r="3" fill="#FFFFFF" stroke="#0054A6" strokeWidth="2" />
              <circle cx="511" cy="100" r="3" fill="#FFFFFF" stroke="#0054A6" strokeWidth="2" />
              <circle cx="574" cy="82" r="3" fill="#FFFFFF" stroke="#0054A6" strokeWidth="2" />
              <circle cx="637" cy="120" r="3" fill="#FFFFFF" stroke="#0054A6" strokeWidth="2" />
              <circle cx="700" cy="151" r="3" fill="#FFFFFF" stroke="#0054A6" strokeWidth="2" />
              <circle cx="763" cy="133" r="3" fill="#FFFFFF" stroke="#0054A6" strokeWidth="2" />

              {/* Tooltip values on nodes */}
              <text x="70" y="153" textAnchor="middle" fill="#0054A6" className="text-[7px] font-black">12,450</text>
              <text x="133" y="138" textAnchor="middle" fill="#0054A6" className="text-[7px] font-black">15,230</text>
              <text x="196" y="119" textAnchor="middle" fill="#0054A6" className="text-[7px] font-black">18,900</text>
              <text x="259" y="132" textAnchor="middle" fill="#0054A6" className="text-[7px] font-black">16,450</text>
              <text x="322" y="104" textAnchor="middle" fill="#0054A6" className="text-[7px] font-black">21,730</text>
              <text x="385" y="114" textAnchor="middle" fill="#0054A6" className="text-[7px] font-black">19,800</text>
              <text x="448" y="95" textAnchor="middle" fill="#0054A6" className="text-[7px] font-black">23,440</text>
              <text x="511" y="88" textAnchor="middle" fill="#0054A6" className="text-[7px] font-black">24,800</text>
              <text x="574" y="70" textAnchor="middle" fill="#0054A6" className="text-[7px] font-black">28,120</text>
              <text x="637" y="108" textAnchor="middle" fill="#0054A6" className="text-[7px] font-black">20,950</text>
              <text x="700" y="139" textAnchor="middle" fill="#0054A6" className="text-[7px] font-black">15,120</text>
              <text x="763" y="121" textAnchor="middle" fill="#0054A6" className="text-[7px] font-black">18,450</text>
            </svg>
          </div>
        </div>

      </div>

      {/* Financial Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        
        {/* Table Title Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="text-right">
            <h3 className="font-extrabold text-slate-800 text-sm">سجل العمليات المالية</h3>
            <p className="text-[10px] text-slate-400 font-bold block mt-0.5">تفاصيل العمولات المكتسبة والأرباح المقيدة في الحساب</p>
          </div>
          <span className="text-[10px] font-extrabold text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
            إجمالي {filteredTransactions.length} عملية مالية
          </span>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right text-slate-650 font-medium">
            <thead>
              <tr className="bg-slate-50/50 text-slate-550 font-bold border-b border-slate-100">
                <th className="py-4 pr-6 text-right">رقم العملية</th>
                <th className="py-4 text-right">الشريك</th>
                <th className="py-4 text-right">نوع العملية</th>
                <th className="py-4 text-right">رقم الطلب</th>
                <th className="py-4 text-right">تاريخ العملية</th>
                <th className="py-4 text-right">المبلغ (DH)</th>
                <th className="py-4 text-right">العمولة (%)</th>
                <th className="py-4 text-right">(العمولة DH)</th>
                <th className="py-4 text-right">الحالة</th>
                <th className="py-4 pl-6 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx, idx) => {
                  let badgeColor = "bg-slate-50 text-slate-500 border-slate-200";
                  if (tx.status === "مدفوعة") {
                    badgeColor = "bg-emerald-50 text-emerald-600 border-emerald-100";
                  } else if (tx.status === "مستحقة") {
                    badgeColor = "bg-amber-50 text-amber-600 border-amber-100";
                  }

                  return (
                    <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                      
                      {/* ID Code */}
                      <td className="py-4 pr-6 font-bold text-slate-800 text-[10px]">{tx.code}</td>
                      
                      {/* Partner name with circular logo */}
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {renderPartnerLogo(tx.partner)}
                          <span className="font-extrabold text-slate-700">{tx.partner}</span>
                        </div>
                      </td>

                      {/* Operation Type */}
                      <td className="py-4 text-slate-600 font-extrabold">{tx.type}</td>

                      {/* Order Reference */}
                      <td className="py-4 text-slate-600 font-bold text-[10px]">{tx.requestNum}</td>

                      {/* Date stamp (Stacked Day and Time) */}
                      <td className="py-4">
                        <div className="text-right">
                          <span className="text-slate-800 font-bold block text-[10px]">{tx.dateDay}</span>
                          <span className="text-slate-400 font-bold block text-[9px] mt-0.5">{tx.dateTime}</span>
                        </div>
                      </td>

                      {/* Base Amount */}
                      <td className="py-4 text-slate-700 font-extrabold" dir="ltr">{tx.baseAmount}</td>

                      {/* Commission percentage */}
                      <td className="py-4 text-slate-600 font-extrabold">{tx.percentage}</td>

                      {/* Earning Amount */}
                      <td className="py-4 text-[#0054A6] font-black" dir="ltr">{tx.commission}</td>

                      {/* Status Pill */}
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black border ${badgeColor} whitespace-nowrap`}>
                          {tx.status}
                        </span>
                      </td>

                      {/* Actions (White square buttons) */}
                      <td className="py-4 pl-6 text-left">
                        <div className="flex items-center justify-end gap-1.5">
                          <button className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-500 hover:bg-slate-50 hover:border-blue-200 transition-all cursor-pointer shadow-3xs" title="عرض التفاصيل">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 hover:border-slate-350 transition-all cursor-pointer shadow-3xs" title="خيارات إضافية">
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400 font-bold">
                    لا توجد عمليات مالية تطابق فلاتر البحث الحالية.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="bg-slate-50/30 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
          <div className="flex items-center gap-2">
            <span>عرض 1 - {filteredTransactions.length} من 248 عملية</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-6 pr-3 py-1 font-bold text-slate-600 outline-none cursor-pointer">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none" />
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            <button className="p-1 border border-slate-200 rounded-lg bg-white text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#0054A6] text-white flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors">2</button>
            <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors">3</button>
            <span className="px-1 text-slate-300">...</span>
            <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors">16</button>
            <button className="p-1 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
