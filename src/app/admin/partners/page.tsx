"use client";
import React, { useState, useEffect } from "react";
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

import { supabase } from "@/utils/supabase";

export default function AdminPartners() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("كل المدن");
  const [selectedType, setSelectedType] = useState("كل الأنواع");
  const [selectedStatus, setSelectedStatus] = useState("كل الحالات");
  const [joinDateFilter, setJoinDateFilter] = useState("all");

  const [partnersList, setPartnersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
  });

  useEffect(() => {
    async function loadPartnersData() {
      try {
        setLoading(true);

        // 1. Fetch all partners and admin users to filter out admins
        const [partnersRes, adminUsersRes] = await Promise.all([
          supabase.from("partners").select("*"),
          supabase.from("admin_users").select("email")
        ]);

        // 2. Fetch clients to compute stats
        const { data: dbClients, error: clientsErr } = await supabase
          .from("clients")
          .select("partner_id, commission, status");

        if (partnersRes.error || adminUsersRes.error || clientsErr) {
          console.error("Supabase error:", partnersRes.error, adminUsersRes.error, clientsErr);
          return;
        }

        const adminEmails = new Set((adminUsersRes.data || []).map(u => u.email.toLowerCase()));
        adminEmails.add("admin@goforvisa.ma"); // fallback

        const partners = (partnersRes.data || []).filter(p => p.email && !adminEmails.has(p.email.toLowerCase()));
        const clients = dbClients || [];

        // 3. Map partners to UI structure
        const mapped = partners.map((p) => {
          const partnerClients = clients.filter(c => c.partner_id === p.id);
          const filesCount = partnerClients.length;
          
          const totalCommission = partnerClients
            .filter(c => c.status !== "ملغى")
            .reduce((sum, c) => sum + Number(c.commission || 0), 0);

          // Initials logic
          const initials = p.company
            ? p.company.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
            : p.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

          return {
            id: p.id,
            name: p.name,
            email: p.email,
            company: p.company || "",
            phone: p.phone || "",
            type: "وكالة سفر", // Default type since it's not stored
            city: p.city || "الدار البيضاء",
            country: "المغرب",
            flag: MoroccoFlag,
            files: filesCount,
            commission: `${totalCommission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH`,
            status: "مفعل", // Default since they registered and we confirm all
            color: "bg-emerald-50 text-emerald-600 border-emerald-100",
            initials: initials || "ش",
            created_at: p.created_at
          };
        });

        // Sort by creation date descending
        mapped.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        setPartnersList(mapped);

        // Stats calculation
        const total = mapped.length;
        const active = mapped.filter(p => p.status === "مفعل").length;

        setStats({ total, active });

      } catch (err) {
        console.error("Error fetching partners data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPartnersData();

    // Subscribe to realtime changes in partners and clients
    const channel = supabase
      .channel("admin_partners_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "partners" }, () => {
        console.log("Realtime change in partners table detected on partners page.");
        loadPartnersData();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "clients" }, () => {
        console.log("Realtime change in clients table detected on partners page.");
        loadPartnersData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Export to CSV function
  const handleExportCSV = () => {
    if (filteredPartners.length === 0) {
      alert("لا توجد بيانات لتصديرها.");
      return;
    }
    
    // CSV headers (UTF-8 with BOM for correct Arabic rendering in Excel)
    const headers = ["الشريك", "البريد الإلكتروني", "نوع الشريك", "المدينة", "طلبات مستلمة", "عمولة مكتسبة", "الحالة"];
    const rows = filteredPartners.map(p => [
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.email.replace(/"/g, '""')}"`,
      `"${p.type.replace(/"/g, '""')}"`,
      `"${p.city.replace(/"/g, '""')}"`,
      p.files,
      `"${p.commission.replace(/"/g, '""')}"`,
      `"${p.status.replace(/"/g, '""')}"`
    ]);
    
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `goforvisa_partners_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#0054A6] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-bold">جاري تحميل بيانات الشركاء...</p>
      </div>
    );
  }

  const filteredPartners = partnersList
    .filter(p => {
      const q = searchTerm.toLowerCase().trim();
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) || 
        p.email.toLowerCase().includes(q) || 
        p.company.toLowerCase().includes(q)
      );
    })
    .filter(p => selectedCity === "كل المدن" || p.city === selectedCity)
    .filter(p => selectedType === "كل الأنواع" || p.type === selectedType)
    .filter(p => selectedStatus === "كل الحالات" || p.status === selectedStatus)
    .filter(p => {
      if (joinDateFilter === "all") return true;
      const pDate = new Date(p.created_at);
      const today = new Date();
      if (joinDateFilter === "today") {
        return pDate.toDateString() === today.toDateString();
      } else if (joinDateFilter === "thisMonth") {
        return pDate.getMonth() === today.getMonth() && pDate.getFullYear() === today.getFullYear();
      } else if (joinDateFilter === "thisYear") {
        return pDate.getFullYear() === today.getFullYear();
      }
      return true;
    });

  return (
    <div className="space-y-6">
      
      {/* Breadcrumbs */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-1.5 justify-start">
          <Link href="/admin" className="hover:text-[#0054A6]">الرئيسية</Link>
          <span>&gt;</span>
          <span>الشركاء</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800">الشركاء</h1>
        <p className="text-xs text-slate-500 font-medium">إدارة ومتابعة شركاء GoForVisa</p>
      </div>

      {/* KPI Cards (2 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Card 1: إجمالي الشركاء */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0054A6] flex items-center justify-center shrink-0 border border-blue-100/50">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-left flex-1">
            <span className="text-[10px] text-slate-400 font-extrabold block whitespace-nowrap">إجمالي الشركاء</span>
            <span className="text-2xl font-black text-slate-800 block mt-1 leading-none">{stats.total}</span>
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
            <span className="text-2xl font-black text-slate-800 block mt-1 leading-none">{stats.active}</span>
            <span className="text-[9px] text-emerald-600 font-bold block mt-1">
              {stats.total > 0 ? ((stats.active / stats.total) * 100).toFixed(1) : 0}% من الإجمالي
            </span>
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
            <select 
              value={joinDateFilter}
              onChange={(e) => setJoinDateFilter(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
            >
              <option value="all">تاريخ الانضمام</option>
              <option value="today">اليوم</option>
              <option value="thisMonth">هذا الشهر</option>
              <option value="thisYear">هذا العام</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
          </div>

          <div className="relative">
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
            >
              <option value="كل المدن">كل المدن</option>
              <option value="الدار البيضاء">الدار البيضاء</option>
              <option value="الرباط">الرباط</option>
              <option value="مراكش">مراكش</option>
              <option value="طنجة">طنجة</option>
              <option value="فاس">فاس</option>
              <option value="أكادير">أكادير</option>
              <option value="وجدة">وجدة</option>
              <option value="تطوان">تطوان</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
          </div>

          <div className="relative">
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
            >
              <option value="كل الأنواع">كل الأنواع</option>
              <option value="وكالة سفر">وكالة سفر</option>
              <option value="شركة سياحية">شركة سياحية</option>
              <option value="مستشار سفر">مستشار سفر</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
          </div>

          <div className="relative">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
            >
              <option value="كل الحالات">كل الحالات</option>
              <option value="مفعل">مفعل</option>
              <option value="قيد المراجعة">قيد المراجعة</option>
              <option value="مدعو">مدعو</option>
              <option value="موقوف">موقوف</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
          </div>

          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
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
                <th className="py-4 text-right">المدينة</th>
                <th className="py-4 text-right">طلبات مستلمة</th>
                <th className="py-4 text-right">عمولة مكتسبة</th>
                <th className="py-4 text-right">الحالة</th>
                <th className="py-4 pl-6 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {filteredPartners.length > 0 ? (
                filteredPartners.map((partner, idx) => {
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

                      {/* City & Country Flag */}
                      <td className="py-4">
                        <div className="flex items-center gap-1.5" dir="rtl">
                          <Flag />
                          <span className="text-[10px] text-slate-500 font-bold">{partner.city} ({partner.country})</span>
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
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-bold">
                    لا يوجد شركاء مسجلين يطابقون فلاتر البحث الحالية.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-slate-50/30 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
          <span>عرض 1 - {filteredPartners.length} من {partnersList.length} شريك</span>
          
          <div className="flex items-center gap-1.5">
            <button className="p-1 border border-slate-200 rounded-lg bg-white text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#0054A6] text-white flex items-center justify-center">1</button>
            <button className="p-1 border border-slate-200 rounded-lg bg-white text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

