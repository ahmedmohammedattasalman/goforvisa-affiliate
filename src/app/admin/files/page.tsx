"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Search,
  Download,
  Eye,
  ArrowDownToLine,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  Palmtree,
  Users2,
  GraduationCap,
  Sparkles,
  Briefcase,
  Building2,
  Calendar,
  ChevronDown
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
const MoroccoFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#C1272D" />
      <polygon points="1.5,0.7 1.6,1.1 1.25,0.85 1.75,0.85 1.4,1.1" fill="none" stroke="#006233" strokeWidth="0.15" />
    </svg>
  </FlagWrapper>
);

const UaeFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#00732F" />
      <rect y="0.67" width="3" height="0.67" fill="#FFFFFF" />
      <rect y="1.33" width="3" height="0.67" fill="#000000" />
      <rect width="0.75" height="2" fill="#FF0000" />
    </svg>
  </FlagWrapper>
);

const SaudiFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#006C35" />
      <line x1="0.6" y1="1.3" x2="2.4" y2="1.3" stroke="#FFFFFF" strokeWidth="0.15" />
      <polygon points="1.5,0.6 1.7,0.9 1.3,0.9" fill="#FFFFFF" />
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

const GermanyFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#FFCF00" />
      <rect width="3" height="1.33" fill="#DD0000" />
      <rect width="3" height="0.67" fill="#000000" />
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

const FranceFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 3 2">
      <rect width="1" height="2" fill="#002395" />
      <rect x="1" width="1" height="2" fill="#FFFFFF" />
      <rect x="2" width="1" height="2" fill="#ED2939" />
    </svg>
  </FlagWrapper>
);

const UkFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 50 30">
      <rect width="50" height="30" fill="#012169" />
      <path d="M 0,0 L 50,30 M 0,30 L 50,0" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M 0,0 L 50,30 M 0,30 L 50,0" stroke="#C8102E" strokeWidth="4" />
      <path d="M 25,0 L 25,30 M 0,15 L 50,15" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M 25,0 L 25,30 M 0,15 L 50,15" stroke="#C8102E" strokeWidth="6" />
    </svg>
  </FlagWrapper>
);

// Stylized Custom Kaaba Icon for Umrah Visa Type
const KaabaIcon = () => (
  <svg className="w-4 h-4 text-slate-800 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="6" width="16" height="14" rx="2" fill="#1E293B" />
    <rect x="4" y="9" width="16" height="2.5" fill="#EAB308" />
    <rect x="11" y="13" width="4" height="7" rx="0.5" fill="#EAB308" />
    <line x1="13" y1="13" x2="13" y2="20" stroke="#1E293B" strokeWidth="0.5" />
  </svg>
);

export default function AdminFiles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filesData = [
    {
      id: "VF-2024-00125",
      clientName: "محمد العبدالله",
      clientId: "ID: C-000125",
      visaType: "سياحية",
      visaIcon: Palmtree,
      visaIconColor: "text-emerald-500",
      country: "الإمارات",
      flag: UaeFlag,
      depositDate: "10 مايو 2024",
      lastUpdateDate: "15 مايو 2024",
      lastUpdateTime: "14:30",
      status: "مكتمل",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
      docs: "12 / 12",
      docsColor: "text-emerald-600"
    },
    {
      id: "VF-2024-00124",
      clientName: "سارة اليعقوبي",
      clientId: "ID: C-000126",
      visaType: "زيارة عائلية",
      visaIcon: Users2,
      visaIconColor: "text-indigo-500",
      country: "تركيا",
      flag: TurkeyFlag,
      depositDate: "09 مايو 2024",
      lastUpdateDate: "14 مايو 2024",
      lastUpdateTime: "10:15",
      status: "قيد المعالجة",
      statusColor: "bg-amber-55/10 text-amber-600 border-amber-100",
      docs: "8 / 12",
      docsColor: "text-amber-500"
    },
    {
      id: "VF-2024-00123",
      clientName: "أحمد المنصوري",
      clientId: "ID: C-000127",
      visaType: "دراسة",
      visaIcon: GraduationCap,
      visaIconColor: "text-blue-650",
      country: "فرنسا",
      flag: FranceFlag,
      depositDate: "08 مايو 2024",
      lastUpdateDate: "13 مايو 2024",
      lastUpdateTime: "16:45",
      status: "ناقص",
      statusColor: "bg-rose-50 text-rose-600 border-rose-100",
      docs: "5 / 12",
      docsColor: "text-rose-500"
    },
    {
      id: "VF-2024-00122",
      clientName: "فاطمة الزهراء",
      clientId: "ID: C-000128",
      visaType: "عمرة",
      visaIcon: KaabaIcon,
      visaIconColor: "text-slate-800",
      country: "السعودية",
      flag: SaudiFlag,
      depositDate: "07 مايو 2024",
      lastUpdateDate: "12 مايو 2024",
      lastUpdateTime: "11:20",
      status: "قيد المعالجة",
      statusColor: "bg-amber-55/10 text-amber-600 border-amber-100",
      docs: "11 / 12",
      docsColor: "text-amber-500"
    },
    {
      id: "VF-2024-00121",
      clientName: "يوسف السالم",
      clientId: "ID: C-000129",
      visaType: "سياحية",
      visaIcon: Palmtree,
      visaIconColor: "text-emerald-500",
      country: "ألمانيا",
      flag: GermanyFlag,
      depositDate: "06 مايو 2024",
      lastUpdateDate: "11 مايو 2024",
      lastUpdateTime: "09:40",
      status: "مكتمل",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
      docs: "12 / 12",
      docsColor: "text-emerald-600"
    },
    {
      id: "VF-2024-00120",
      clientName: "شركة النور للتجارة",
      clientId: "ID: C-000130",
      visaType: "تجارية",
      visaIcon: Briefcase,
      visaIconColor: "text-slate-650",
      country: "المغرب",
      flag: MoroccoFlag,
      depositDate: "05 مايو 2024",
      lastUpdateDate: "10 مايو 2024",
      lastUpdateTime: "15:30",
      status: "ناقص",
      statusColor: "bg-rose-50 text-rose-600 border-rose-100",
      docs: "7 / 12",
      docsColor: "text-rose-500"
    },
    {
      id: "VF-2024-00119",
      clientName: "نورة الشريف",
      clientId: "ID: C-000131",
      visaType: "دراسة",
      visaIcon: GraduationCap,
      visaIconColor: "text-blue-650",
      country: "إسبانيا",
      flag: SpainFlag,
      depositDate: "04 مايو 2024",
      lastUpdateDate: "09 مايو 2024",
      lastUpdateTime: "12:20",
      status: "مكتمل",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
      docs: "12 / 12",
      docsColor: "text-emerald-600"
    },
    {
      id: "VF-2024-00118",
      clientName: "خالد الراشد",
      clientId: "ID: C-000132",
      visaType: "سياحية",
      visaIcon: Palmtree,
      visaIconColor: "text-emerald-500",
      country: "بريطانيا",
      flag: UkFlag,
      depositDate: "03 مايو 2024",
      lastUpdateDate: "08 مايو 2024",
      lastUpdateTime: "17:05",
      status: "ناقص",
      statusColor: "bg-rose-50 text-rose-600 border-rose-100",
      docs: "6 / 12",
      docsColor: "text-rose-500"
    }
  ];

  // Helper to render client circle avatars matching Screenshot
  const renderClientAvatar = (name: string, idx: number) => {
    const colors = [
      "bg-blue-50 text-[#0054A6]",
      "bg-purple-50 text-purple-650",
      "bg-teal-50 text-teal-650",
      "bg-pink-50 text-pink-650",
      "bg-blue-50 text-[#0054A6]",
      "bg-violet-50 text-violet-650",
      "bg-amber-50 text-amber-650",
      "bg-emerald-50 text-emerald-650"
    ];
    const color = colors[idx % colors.length];
    
    if (name.includes("شركة")) {
      return (
        <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center shrink-0 shadow-2xs`}>
          <Building2 className="w-4 h-4" />
        </div>
      );
    }
    
    return (
      <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center shrink-0 shadow-2xs`}>
        <svg className="w-5 h-5 mt-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
    );
  };

  // Filter requests
  const filteredFiles = filesData.filter(file => {
    const matchesSearch = file.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          file.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          file.clientId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                          (statusFilter === "completed" && file.status === "مكتمل") ||
                          (statusFilter === "processing" && file.status === "قيد المعالجة") ||
                          (statusFilter === "incomplete" && file.status === "ناقص");

    const matchesCountry = countryFilter === "all" || file.country === countryFilter;
    const matchesType = typeFilter === "all" || file.visaType === typeFilter;

    return matchesSearch && matchesStatus && matchesCountry && matchesType;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-1.5">
            <Link href="/admin" className="hover:text-[#0054A6]">الرئيسية</Link>
            <span className="mx-1">/</span>
            <span>الملفات</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800">الملفات</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">إدارة ومتابعة جميع ملفات طلبات التأشيرة</p>
        </div>
      </div>

      {/* KPI Cards (4 Cards) ordered from right to left (RTL) matching Screenshot:
          Incomplete -> Processing -> Completed -> Total */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: الملفات الناقصة (Incomplete) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">الملفات الناقصة</span>
            <span className="text-2xl font-black text-rose-600 block mt-1.5 leading-none">154</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1.5">12.2% من الإجمالي</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100/50">
            <AlertCircle className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Card 2: قيد المعالجة (Processing) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">قيد المعالجة</span>
            <span className="text-2xl font-black text-amber-500 block mt-1.5 leading-none">412</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1.5">33.0% من الإجمالي</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100/50">
            <Clock className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Card 3: الملفات المكتملة (Completed) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">الملفات المكتملة</span>
            <span className="text-2xl font-black text-[#059669] block mt-1.5 leading-none">682</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1.5">54.8% من الإجمالي</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/50">
            <CheckCircle className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Card 4: إجمالي الملفات (Total) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">إجمالي الملفات</span>
            <span className="text-2xl font-black text-[#0054A6] block mt-1.5 leading-none">1,248</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1.5">كل الملفات المسجلة</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#0054A6] flex items-center justify-center shrink-0 border border-blue-100/50">
            <FileText className="w-5.5 h-5.5" />
          </div>
        </div>

      </div>

      {/* Filter Row: Filters on Right, Export stacked on Left */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col xl:flex-row items-stretch xl:items-end justify-between gap-4">
        
        {/* Right Side: Filters with labels ABOVE inputs (flows from right to left in RTL) */}
        <div className="flex flex-wrap items-end justify-start gap-4 flex-1">
          
          {/* 1. Main Search Bar */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-[240px]">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="بحث عن رقم ملف، عميل، رقم ملف..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none transition-all text-slate-700 placeholder:text-slate-400 font-bold h-[38px]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5" />
            </div>
          </div>

          {/* 2. Date picker: تاريخ الإيداع */}
          <div className="flex flex-col gap-1.5 min-w-[140px]">
            <label className="text-[11px] text-slate-550 font-bold">تاريخ الإيداع</label>
            <div className="relative">
              <select 
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-xs font-bold text-slate-650 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option>من - إلى</option>
              </select>
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* 3. Country filter */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-550 font-bold">الدولة</label>
            <div className="relative">
              <select 
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">كل الدول</option>
                <option value="الإمارات">الإمارات</option>
                <option value="تركيا">تركيا</option>
                <option value="فرنسا">فرنسا</option>
                <option value="السعودية">السعودية</option>
                <option value="ألمانيا">ألمانيا</option>
                <option value="المغرب">المغرب</option>
                <option value="إسبانيا">إسبانيا</option>
                <option value="بريطانيا">بريطانيا</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* 4. Visa Type filter */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-550 font-bold">نوع التأشيرة</label>
            <div className="relative">
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-xs font-bold text-slate-650 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">كل الأنواع</option>
                <option value="سياحية">سياحية</option>
                <option value="زيارة عائلية">زيارة عائلية</option>
                <option value="دراسة">دراسة</option>
                <option value="عمرة">عمرة</option>
                <option value="تجارية">تجارية</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* 5. Status filter */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-550 font-bold">الحالة</label>
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-xs font-bold text-slate-650 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">كل الحالات</option>
                <option value="completed">مكتمل</option>
                <option value="processing">قيد المعالجة</option>
                <option value="incomplete">ناقص</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Left Side: Export Button (Blue color with download icon) */}
        <div className="flex items-center justify-end shrink-0 pt-4 xl:pt-0">
          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer h-[38px]">
            <Download className="w-4 h-4" />
            <span>تصدير</span>
          </button>
        </div>

      </div>

      {/* Files Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right text-slate-600 font-medium">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 font-bold border-b border-slate-100">
                <th className="py-4 pr-6 text-right">رقم الملف</th>
                <th className="py-4 text-right">العميل</th>
                <th className="py-4 text-right">نوع التأشيرة</th>
                <th className="py-4 text-right">الدولة</th>
                <th className="py-4 text-right">تاريخ الإيداع</th>
                <th className="py-4 text-right">آخر تحديث</th>
                <th className="py-4 text-right">الحالة</th>
                <th className="py-4 text-right">المستندات</th>
                <th className="py-4 pl-6 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file, idx) => {
                  const Flag = file.flag;
                  const VisaIcon = file.visaIcon;
                  const isCompleteDocs = file.docs === "12 / 12";

                  // Status badge dynamic colors
                  let badgeColor = "bg-slate-50 text-slate-500 border-slate-200";
                  let dotColor = "bg-slate-400";
                  if (file.status === "مكتمل") {
                    badgeColor = "bg-emerald-50 text-emerald-600 border-emerald-100";
                    dotColor = "bg-emerald-500";
                  } else if (file.status === "قيد المعالجة") {
                    badgeColor = "bg-amber-50 text-amber-600 border-amber-100";
                    dotColor = "bg-amber-500";
                  } else if (file.status === "ناقص") {
                    badgeColor = "bg-rose-50 text-rose-600 border-rose-100";
                    dotColor = "bg-rose-500";
                  }

                  return (
                    <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                      
                      {/* File ID */}
                      <td className="py-4 pr-6 font-bold text-slate-800 text-[10px]">{file.id}</td>

                      {/* Client Avatar, Name & ID */}
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          {renderClientAvatar(file.clientName, idx)}
                          <div className="text-right">
                            <h4 className="font-extrabold text-slate-800 text-xs">{file.clientName}</h4>
                            <span className="text-[9px] text-slate-400 block mt-0.5">{file.clientId}</span>
                          </div>
                        </div>
                      </td>

                      {/* Visa Type with Stylized Icon */}
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg bg-slate-50 ${file.visaIconColor}`}>
                            <VisaIcon />
                          </div>
                          <span className="text-slate-700 font-extrabold text-xs">{file.visaType}</span>
                        </div>
                      </td>

                      {/* Circular Country Flag & Text */}
                      <td className="py-4">
                        <div className="flex items-center gap-2.5">
                          <Flag />
                          <span className="text-[11px] text-slate-700 font-extrabold">{file.country}</span>
                        </div>
                      </td>

                      {/* Deposit Date */}
                      <td className="py-4 text-slate-800 font-bold text-[10px]">{file.depositDate}</td>

                      {/* Last Update (Stacked vertically: Date on top, Time below) */}
                      <td className="py-4">
                        <div className="text-right">
                          <span className="text-slate-800 font-bold block text-[10px]">{file.lastUpdateDate}</span>
                          <span className="text-slate-400 font-bold block text-[9px] mt-0.5">{file.lastUpdateTime}</span>
                        </div>
                      </td>

                      {/* Status Badge with Dot */}
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black border ${badgeColor} whitespace-nowrap`}>
                          <span className={`w-1 h-1 rounded-full ${dotColor} ml-1.5`}></span>
                          {file.status}
                        </span>
                      </td>

                      {/* Documents Plain bold color styling */}
                      <td className="py-4">
                        <span className={`font-black text-xs ${file.docsColor}`}>
                          {file.docs}
                        </span>
                      </td>

                      {/* Actions (Three square white buttons with border) */}
                      <td className="py-4 pl-6 text-left">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Eye button */}
                          <button className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-500 hover:bg-slate-50 hover:border-blue-200 transition-all cursor-pointer shadow-3xs" title="عرض التفاصيل">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {/* Download button */}
                          <button className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-slate-50 hover:border-blue-200 transition-all cursor-pointer shadow-3xs" title="تنزيل الملفات">
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          {/* More button */}
                          <button className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-3xs" title="خيارات إضافية">
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400 font-bold">
                    لا توجد ملفات مطابقة لفلاتر البحث الحالية.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Card Footer */}
        <div className="bg-slate-50/30 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
          <div className="flex items-center gap-2">
            <span>عرض 1 - 10 من 1,248 ملف</span>
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
