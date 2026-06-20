"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  CheckCircle, 
  Clock, 
  UserPlus,
  Search,
  Download,
  Eye,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  ChevronDown
} from "lucide-react";

// Crisp SVG Flags
const MoroccoFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="3" height="2" fill="#C1272D" />
    <polygon points="1.5,0.7 1.6,1.1 1.25,0.85 1.75,0.85 1.4,1.1" fill="none" stroke="#006233" strokeWidth="0.15" />
  </svg>
);

const UaeFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="3" height="2" fill="#00732F" />
    <rect y="0.67" width="3" height="0.67" fill="#FFFFFF" />
    <rect y="1.33" width="3" height="0.67" fill="#000000" />
    <rect width="0.75" height="2" fill="#FF0000" />
  </svg>
);

const SaudiFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="3" height="2" fill="#006C35" />
    <line x1="0.6" y1="1.3" x2="2.4" y2="1.3" stroke="#FFFFFF" strokeWidth="0.15" />
    <polygon points="1.5,0.6 1.7,0.9 1.3,0.9" fill="#FFFFFF" />
  </svg>
);

const EgyptFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="3" height="0.67" fill="#C8102E" />
    <rect y="0.67" width="3" height="0.67" fill="#FFFFFF" />
    <rect y="1.33" width="3" height="0.67" fill="#000000" />
    <polygon points="1.5,0.9 1.6,1.1 1.4,1.1" fill="#C5A059" />
  </svg>
);

const JordanFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="3" height="0.67" fill="#000000" />
    <rect y="0.67" width="3" height="0.67" fill="#FFFFFF" />
    <rect y="1.33" width="3" height="0.67" fill="#138808" />
    <polygon points="0,0 0.8,1 0,2" fill="#E00000" />
    <circle cx="0.3" cy="1" r="0.1" fill="#FFFFFF" />
  </svg>
);

const TunisiaFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="3" height="2" fill="#E20917" />
    <circle cx="1.5" cy="1" r="0.5" fill="#FFFFFF" />
    <path d="M 1.5 0.7 A 0.3 0.3 0 0 0 1.5 1.3 A 0.25 0.25 0 0 1 1.5 0.7 Z" fill="#E20917" />
    <polygon points="1.6,1 1.8,1.05 1.7,0.9 1.9,0.8 1.6,0.85" fill="#E20917" transform="rotate(15 1.6 0.95)" />
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

const FranceFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="1" height="2" fill="#002395" />
    <rect x="1" width="1" height="2" fill="#FFFFFF" />
    <rect x="2" width="1" height="2" fill="#ED2939" />
  </svg>
);

export default function AdminPartners() {
  const [searchTerm, setSearchTerm] = useState("");

  const partnersData = [
    {
      name: "شركة أبو العمران للسفريات",
      email: "info@aboulomrane.com",
      type: "وكالة سفر",
      country: "المغرب",
      flag: MoroccoFlag,
      files: 312,
      commission: "15,420.00 DH",
      status: "مفعل",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      initials: "أع"
    },
    {
      name: "Eagle Tourism LLC",
      email: "contact@eagletourism.ae",
      type: "شركة سياحية",
      country: "الإمارات",
      flag: UaeFlag,
      files: 198,
      commission: "9,850.00 DH",
      status: "مفعل",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      initials: "ET"
    },
    {
      name: "رحالة العالم للسفر",
      email: "hello@rahalt.com",
      type: "مستشار سفر",
      country: "السعودية",
      flag: SaudiFlag,
      files: 87,
      commission: "5,600.00 DH",
      status: "قيد المراجعة",
      color: "bg-amber-50 text-amber-600 border-amber-100",
      initials: "رو"
    },
    {
      name: "Nile Travel",
      email: "info@niletravel.com",
      type: "وكالة سفر",
      country: "مصر",
      flag: EgyptFlag,
      files: 64,
      commission: "4,250.00 DH",
      status: "مفعل",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      initials: "NT"
    },
    {
      name: "Jordan Trips",
      email: "contact@jordantrips.com",
      type: "مستشار سفر",
      country: "الأردن",
      flag: JordanFlag,
      files: 0,
      commission: "0.00 DH",
      status: "مدعو",
      color: "bg-slate-100 text-slate-500 border-slate-200",
      initials: "JT"
    },
    {
      name: "Tunis Voyages",
      email: "info@tunisvoyages.tn",
      type: "شركة سياحية",
      country: "تونس",
      flag: TunisiaFlag,
      files: 52,
      commission: "3,730.00 DH",
      status: "مفعل",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      initials: "TV"
    },
    {
      name: "Istanbul Travel",
      email: "info@istanbultravel.com",
      type: "وكالة سفر",
      country: "تركيا",
      flag: TurkeyFlag,
      files: 18,
      commission: "1,200.00 DH",
      status: "موقوف",
      color: "bg-rose-50 text-rose-600 border-rose-100",
      initials: "IT"
    },
    {
      name: "Paris Travel Advisor",
      email: "contact@paristravel.fr",
      type: "مستشار سفر",
      country: "فرنسا",
      flag: FranceFlag,
      files: 41,
      commission: "2,900.00 DH",
      status: "مفعل",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      initials: "PT"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Breadcrumbs */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-1.5">
          <Link href="/admin" className="hover:text-[#0054A6]">الرئيسية</Link>
          <span>&gt;</span>
          <span>الشركاء</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800">الشركاء</h1>
        <p className="text-xs text-slate-500 font-medium">إدارة ومتابعة شركاء شركة GoForVisa</p>
      </div>

      {/* KPI Cards (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: إجمالي الشركاء */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0054A6] flex items-center justify-center shrink-0 border border-blue-100/50">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-left flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block whitespace-nowrap">إجمالي الشركاء</span>
            <span className="text-2xl font-black text-slate-800 block mt-1 leading-none">128</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1">شريك مسجل</span>
          </div>
        </div>

        {/* Card 2: الشركاء المفعلون */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/50">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="text-left flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block whitespace-nowrap">الشركاء المفعلون</span>
            <span className="text-2xl font-black text-slate-800 block mt-1 leading-none">112</span>
            <span className="text-[9px] text-emerald-600 font-bold block mt-1">87.5% من الإجمالي</span>
          </div>
        </div>

        {/* Card 3: قيد المراجعة */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100/50">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-left flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block whitespace-nowrap">قيد المراجعة</span>
            <span className="text-2xl font-black text-slate-800 block mt-1 leading-none">8</span>
            <span className="text-[9px] text-amber-600 font-bold block mt-1">6.3% من الإجمالي</span>
          </div>
        </div>

        {/* Card 4: تمت دعوتهم */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100/50">
            <UserPlus className="w-5 h-5" />
          </div>
          <div className="text-left flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block whitespace-nowrap">تمت دعوتهم</span>
            <span className="text-2xl font-black text-slate-800 block mt-1 leading-none">8</span>
            <span className="text-[9px] text-purple-600 font-bold block mt-1">6.3% من الإجمالي</span>
          </div>
        </div>

      </div>

      {/* Filter Row */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="بحث عن شريك..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] focus:ring-1 focus:ring-[#0054A6] transition-all text-slate-700 placeholder:text-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5" />
        </div>

        {/* Filters and export */}
        <div className="flex flex-wrap items-center gap-3">
          
          <div className="relative">
            <select className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer">
              <option>تاريخ الانضمام</option>
              <option>من - إلى</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer">
              <option>كل الدول</option>
              <option>المغرب</option>
              <option>السعودية</option>
              <option>الإمارات</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer">
              <option>كل الأنواع</option>
              <option>وكالة سفر</option>
              <option>شركة سياحية</option>
              <option>مستشار سفر</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer">
              <option>كل الحالات</option>
              <option>مفعل</option>
              <option>قيد المراجعة</option>
              <option>موقوف</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
          </div>

          <button className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            <span>تصدير</span>
          </button>

        </div>

      </div>

      {/* Partners Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right text-slate-600">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 font-bold border-b border-slate-100">
                <th className="py-4 pr-6 text-right">الشريك</th>
                <th className="py-4 text-right">نوع الشريك</th>
                <th className="py-4 text-right">الدولة</th>
                <th className="py-4 text-right">طلبات مستلمة</th>
                <th className="py-4 text-right">عمولة مكتسبة</th>
                <th className="py-4 text-right">الحالة</th>
                <th className="py-4 pl-6 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {partnersData
                .filter(p => p.name.includes(searchTerm) || p.email.includes(searchTerm))
                .map((partner, idx) => {
                  const Flag = partner.flag;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                      
                      {/* Name & Logo */}
                      <td className="py-4 pr-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 font-extrabold text-slate-600 text-xs shadow-xs">
                            {partner.initials}
                          </div>
                          <div className="text-right">
                            <h4 className="font-extrabold text-slate-800 text-xs">{partner.name}</h4>
                            <span className="text-[10px] text-slate-400 block mt-0.5">{partner.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Partner Type */}
                      <td className="py-4 text-slate-500">{partner.type}</td>

                      {/* Country Flag */}
                      <td className="py-4">
                        <div className="flex items-center gap-1.5" dir="rtl">
                          <Flag />
                          <span className="text-[10px] text-slate-500 font-bold">{partner.country}</span>
                        </div>
                      </td>

                      {/* Received Files */}
                      <td className="py-4 text-slate-700 font-bold">{partner.files}</td>

                      {/* Commission */}
                      <td className="py-4 text-slate-800 font-black" dir="ltr">{partner.commission}</td>

                      {/* Status */}
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${partner.color} whitespace-nowrap`}>
                          {partner.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 pl-6 text-left">
                        <div className="flex items-center justify-end gap-1.5">
                          <button className="p-1.5 text-slate-400 hover:text-[#0054A6] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-slate-50/30 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
          <span>عرض 1 - 8 من 128 شريك</span>
          
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
