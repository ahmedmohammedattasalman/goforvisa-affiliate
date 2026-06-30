"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
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
  CreditCard,
  X
} from "lucide-react";

export default function AdminCommissions() {
  // Filters State
  const [partnerFilter, setPartnerFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");

  const [transactionsData, setTransactionsData] = useState<any[]>([]);
  const [topPartners, setTopPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    thisMonthProfits: 0,
    dueCommissions: 0,
    paidCommissions: 0,
    totalCommissions: 0
  });

  // Modal State
  const [selectedTx, setSelectedTx] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formCommission, setFormCommission] = useState(0);
  const [formStatus, setFormStatus] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // List of unique partners derived from transactions
  const [uniquePartners, setUniquePartners] = useState<string[]>([]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTx) return;

    try {
      setActionLoading(true);
      const { error } = await supabase
        .from("clients")
        .update({
          commission: formCommission,
          status: formStatus
        })
        .eq("file_number", selectedTx.requestNum);

      if (error) throw error;

      setIsModalOpen(false);
      setSelectedTx(null);
      setIsEditing(false);
      await loadCommissionsData();
    } catch (err: any) {
      alert(err.message || "حدث خطأ أثناء حفظ التغييرات.");
    } finally {
      setActionLoading(false);
    }
  };

  async function loadCommissionsData() {
    try {
      setLoading(true);

      // 1. Fetch clients with partner details
      const { data: dbClients, error: clientsErr } = await supabase
        .from("clients")
        .select("*, partners(name, company)")
        .order("created_at", { ascending: false });

      // 2. Fetch payouts
      const { data: dbPayouts, error: payoutsErr } = await supabase
        .from("payouts")
        .select("*");

      if (clientsErr || payoutsErr) {
        console.error(clientsErr, payoutsErr);
        return;
      }

      const clientsList = (dbClients || []).filter((c: any) => {
        const partnerName = c.partners?.company || c.partners?.name || "شريك عام";
        return partnerName !== "GoForVisa Admin";
      });
      const payoutsList = dbPayouts || [];

      // Calculate KPI statistics (respecting 0 commission and not falling back to 500)
      const totalCommissionsVal = clientsList
        .filter(c => c.status !== "ملغى")
        .reduce((sum, c) => sum + Number(c.commission !== null && c.commission !== undefined ? c.commission : 500), 0);

      const paidCommissionsVal = payoutsList
        .filter(w => w.status === "تم التحويل" || w.status === "تم الدفع")
        .reduce((sum, w) => sum + Number(w.amount || 0), 0);

      const pendingCommissionsVal = payoutsList
        .filter(w => w.status === "قيد المراجعة")
        .reduce((sum, w) => sum + Number(w.amount || 0), 0);

      const dueCommissionsVal = totalCommissionsVal - paidCommissionsVal - pendingCommissionsVal;

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const thisMonthProfitsVal = clientsList
        .filter(c => {
          if (c.status === "ملغى" || !c.created_at) return false;
          const d = new Date(c.created_at);
          return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        })
        .reduce((sum, c) => sum + Number(c.commission !== null && c.commission !== undefined ? c.commission : 500), 0);

      setStats({
        thisMonthProfits: thisMonthProfitsVal,
        dueCommissions: dueCommissionsVal,
        paidCommissions: paidCommissionsVal,
        totalCommissions: totalCommissionsVal
      });

      // Map Transactions
      const txMapped = clientsList.map((c: any) => {
        const partnerName = c.partners?.company || c.partners?.name || "شريك عام";
        const initials = c.partners?.company 
          ? c.partners.company.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
          : c.partners?.name ? c.partners.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase() : "ش";

        let status = "مستحقة";
        let statusColor = "bg-amber-50 text-amber-600 border-amber-100";
        if (c.status === "تم الإنجاز") {
          status = "مدفوعة";
          statusColor = "bg-emerald-50 text-emerald-600 border-emerald-100";
        } else if (c.status === "ملغى") {
          status = "ملغى";
          statusColor = "bg-rose-50 text-rose-600 border-rose-100";
        }

        const dateObj = new Date(c.created_at);
        const dateDay = dateObj.toLocaleDateString("ar-EG", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });
        const dateTime = dateObj.toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit"
        });

        const baseAmount = Number(c.total_fee !== null && c.total_fee !== undefined ? c.total_fee : 3000);
        const commissionVal = Number(c.commission !== null && c.commission !== undefined ? c.commission : 500);
        const percentage = baseAmount > 0 ? Math.round((commissionVal / baseAmount) * 100) + "%" : "0%";

        return {
          code: c.file_number ? c.file_number.replace("GFV", "COM") : "COM-NEW",
          partner: partnerName,
          partnerInitials: initials,
          type: "عمولة طلب",
          requestNum: c.file_number || "",
          dateDay,
          dateTime,
          rawDate: c.created_at,
          baseAmount: baseAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          percentage,
          commission: commissionVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          commissionNum: commissionVal,
          status,
          statusColor
        };
      });

      setTransactionsData(txMapped);

      // Extract unique partners
      const pNames = Array.from(new Set(txMapped.map(t => t.partner))).filter(Boolean);
      setUniquePartners(pNames);

      // Top partners mapping (respecting 0 commission and not falling back to 500)
      const partnerCommissionsMap: Record<string, { amount: number; files: number; name: string }> = {};
      clientsList.forEach((c: any) => {
        if (c.status === "ملغى") return;
        const partnerName = c.partners?.company || c.partners?.name || "شريك عام";
        if (!partnerCommissionsMap[partnerName]) {
          partnerCommissionsMap[partnerName] = { amount: 0, files: 0, name: partnerName };
        }
        partnerCommissionsMap[partnerName].amount += Number(c.commission !== null && c.commission !== undefined ? c.commission : 500);
        partnerCommissionsMap[partnerName].files += 1;
      });

      const totalAllCommissions = Object.values(partnerCommissionsMap).reduce((sum, p) => sum + p.amount, 0) || 1;

      const topP = Object.values(partnerCommissionsMap)
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5)
        .map((p, idx) => {
          const percent = Math.round((p.amount / totalAllCommissions) * 100) + "% من الإجمالي";
          return {
            name: p.name,
            amount: `${p.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH`,
            files: p.files,
            rank: idx + 1,
            percent
          };
        });

      setTopPartners(topP);

    } catch (err) {
      console.error("Error loading commissions data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCommissionsData();

    // Subscribe to realtime database changes
    const channel = supabase
      .channel("admin_commissions_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "clients" }, () => {
        loadCommissionsData();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "payouts" }, () => {
        loadCommissionsData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleResetFilters = () => {
    setPartnerFilter("all");
    setTypeFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
    setSelectedPeriod("this-month");
  };

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      alert("لا توجد بيانات لتصديرها.");
      return;
    }
    
    const headers = ["رقم العملية", "الشريك", "نوع العملية", "رقم الطلب", "التاريخ", "المبلغ الأساسي (DH)", "العمولة (%)", "قيمة العمولة (DH)", "الحالة"];
    const rows = filteredTransactions.map(t => [
      `"${t.code}"`,
      `"${t.partner.replace(/"/g, '""')}"`,
      `"${t.type}"`,
      `"${t.requestNum}"`,
      `"${t.dateDay} ${t.dateTime}"`,
      `"${t.baseAmount}"`,
      `"${t.percentage}"`,
      `"${t.commission}"`,
      `"${t.status}"`
    ]);
    
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `goforvisa_commissions_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#0054A6] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-bold">جاري تحميل بيانات العمولات...</p>
      </div>
    );
  }

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
    
    const matchesPartner = partnerFilter === "all" || tx.partner === partnerFilter;
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;

    let matchesPeriod = true;
    if (selectedPeriod !== "all" && tx.rawDate) {
      const txDate = new Date(tx.rawDate);
      const today = new Date();
      if (selectedPeriod === "this-month") {
        matchesPeriod = txDate.getMonth() === today.getMonth() && txDate.getFullYear() === today.getFullYear();
      } else if (selectedPeriod === "last-month") {
        const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
        const lastMonthYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
        matchesPeriod = txDate.getMonth() === lastMonth && txDate.getFullYear() === lastMonthYear;
      } else if (selectedPeriod === "this-year") {
        matchesPeriod = txDate.getFullYear() === today.getFullYear();
      }
    }

    return matchesSearch && matchesPartner && matchesType && matchesStatus && matchesPeriod;
  });

  // Calculate monthly profits for the last 12 months dynamically
  const monthNames = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  const last12Months: { year: number; month: number; label: string; key: string }[] = [];
  const tempDate = new Date();
  
  // Create last 12 months array (ending with current month)
  for (let i = 11; i >= 0; i--) {
    const d = new Date(tempDate.getFullYear(), tempDate.getMonth() - i, 1);
    const y = d.getFullYear();
    const m = d.getMonth();
    const label = monthNames[m];
    const key = `${y}-${String(m + 1).padStart(2, '0')}`;
    last12Months.push({ year: y, month: m, label, key });
  }

  // Calculate profits per month
  const monthlyProfits: Record<string, number> = {};
  last12Months.forEach(m => {
    monthlyProfits[m.key] = 0;
  });

  transactionsData.forEach(tx => {
    if (!tx.rawDate || tx.status === "ملغى") return;
    const d = new Date(tx.rawDate);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (monthlyProfits[key] !== undefined) {
      const val = tx.commissionNum !== undefined ? tx.commissionNum : Number(tx.commission.replace(/,/g, ''));
      monthlyProfits[key] += val;
    }
  });

  const maxVal = Math.max(...last12Months.map(m => monthlyProfits[m.key]), 1000);
  const maxScale = Math.ceil(maxVal / 5000) * 5000;

  // X start at 70, ends at 763. Spacing = 63.
  const chartPoints = last12Months.map((m, idx) => {
    const val = monthlyProfits[m.key];
    const x = 70 + idx * 63;
    // Y range: 20 (maxScale) to 230 (0). Height = 210.
    const y = 230 - (val / maxScale) * 210;
    return { x, y, val, label: m.label };
  });

  const linePath = chartPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L ${chartPoints[chartPoints.length - 1].x},230 L ${chartPoints[0].x},230 Z`;

  const formatYLabel = (val: number) => {
    if (val >= 1000) {
      return (val / 1000).toFixed(0) + "K";
    }
    return val.toString();
  };

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
            <span className="text-2xl font-black text-[#7C3AED] block mt-1 leading-none" dir="ltr">
              {stats.thisMonthProfits.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
            </span>
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
            <span className="text-2xl font-black text-[#F59E0B] block mt-1 leading-none" dir="ltr">
              {stats.dueCommissions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
            </span>
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
            <span className="text-2xl font-black text-[#10B981] block mt-1 leading-none" dir="ltr">
              {stats.paidCommissions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
            </span>
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
            <span className="text-2xl font-black text-[#0054A6] block mt-1 leading-none" dir="ltr">
              {stats.totalCommissions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
            </span>
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
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-right text-xs font-bold text-slate-655 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">كل الشركاء</option>
                {uniquePartners.map((p, idx) => (
                  <option key={idx} value={p}>{p}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* 5. Select Transaction Type */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-555 font-bold">نوع العملية</label>
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
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#0054A6] hover:bg-blue-50/50 text-[#0054A6] rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer h-[38px]"
          >
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
              {chartPoints.map((p, idx) => (
                <text key={idx} x={p.x} y="245" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">
                  {p.label}
                </text>
              ))}

              {/* Y-Axis scale tags (Left Aligned) */}
              <text x="30" y="23" textAnchor="end" className="text-[7px] fill-slate-500 font-bold">{formatYLabel(maxScale)}</text>
              <text x="30" y="75" textAnchor="end" className="text-[7px] fill-slate-500 font-bold">{formatYLabel(maxScale * 0.75)}</text>
              <text x="30" y="128" textAnchor="end" className="text-[7px] fill-slate-500 font-bold">{formatYLabel(maxScale * 0.5)}</text>
              <text x="30" y="180" textAnchor="end" className="text-[7px] fill-slate-500 font-bold">{formatYLabel(maxScale * 0.25)}</text>
              <text x="30" y="207" textAnchor="end" className="text-[7px] fill-slate-500 font-bold">{formatYLabel(maxScale * 0.125)}</text>
              <text x="30" y="233" textAnchor="end" className="text-[7px] fill-slate-500 font-bold">0</text>

              {/* Area filled underneath path */}
              {chartPoints.length > 0 && (
                <path 
                  d={areaPath} 
                  fill="url(#earnings-grad-3)" 
                />
              )}

              {/* Line stroke */}
              {chartPoints.length > 0 && (
                <path 
                  d={linePath} 
                  fill="none" 
                  stroke="#0054A6" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              )}

              {/* Bullet Node Highlights */}
              {chartPoints.map((p, idx) => (
                <circle key={idx} cx={p.x} cy={p.y} r="3" fill="#FFFFFF" stroke="#0054A6" strokeWidth="2" />
              ))}

              {/* Tooltip values on nodes */}
              {chartPoints.map((p, idx) => (
                <text key={idx} x={p.x} y={p.y - 12} textAnchor="middle" fill="#0054A6" className="text-[7px] font-black">
                  {p.val > 0 ? p.val.toLocaleString('en-US', { maximumFractionDigits: 0 }) : "0"}
                </text>
              ))}
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

                      {/* Actions (White square button) */}
                      <td className="py-4 pl-6 text-left">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => { 
                              setSelectedTx(tx); 
                              setFormCommission(Number(tx.commission.replace(/,/g, ''))); 
                              setFormStatus(tx.status === 'مدفوعة' ? 'تم الإنجاز' : tx.status === 'ملغى' ? 'ملغى' : 'قيد المعالجة'); 
                              setIsEditing(true); 
                              setIsModalOpen(true); 
                            }}
                            className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-650 hover:bg-slate-50 hover:border-slate-350 transition-all cursor-pointer shadow-3xs" 
                            title="تعديل وإجراءات"
                          >
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

      {/* Transaction Details & Quick Edit Modal */}
      {isModalOpen && selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md text-right" dir="rtl">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <button 
                onClick={() => { setIsModalOpen(false); setSelectedTx(null); setIsEditing(false); }}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#0054A6]" />
                <span>{isEditing ? "تعديل وإجراءات العملية المالية" : "تفاصيل العملية المالية"}</span>
              </h3>
            </div>

            <form onSubmit={handleSaveChanges} className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-xs text-slate-500 font-bold">رقم العملية</span>
                  <span className="text-xs font-black text-slate-800" dir="ltr">{selectedTx.code}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-xs text-slate-500 font-bold">الشريك</span>
                  <span className="text-xs font-black text-slate-800">{selectedTx.partner}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-xs text-slate-500 font-bold">نوع العملية</span>
                  <span className="text-xs font-bold text-slate-700">{selectedTx.type}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-xs text-slate-500 font-bold">رقم طلب الملف</span>
                  <span className="text-xs font-black text-[#0054A6]" dir="ltr">{selectedTx.requestNum}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-xs text-slate-500 font-bold">تاريخ العملية</span>
                  <span className="text-xs font-bold text-slate-700">{selectedTx.dateDay} - {selectedTx.dateTime}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-xs text-slate-500 font-bold">المبلغ الأساسي للخدمة</span>
                  <span className="text-xs font-black text-slate-800">{selectedTx.baseAmount} DH</span>
                </div>

                {/* Earning / Commission Input */}
                <div className="py-2 border-b border-slate-50">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-bold">عمولة الشريك المخصصة</span>
                    {!isEditing ? (
                      <span className="text-xs font-black text-[#0054A6]">{selectedTx.commission} DH ({selectedTx.percentage})</span>
                    ) : (
                      <div className="relative w-32">
                        <input 
                          type="number"
                          value={formCommission}
                          onChange={(e) => setFormCommission(Number(e.target.value))}
                          className="w-full pl-8 pr-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                          required
                        />
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold">DH</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Selection */}
                <div className="py-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-bold">حالة الدفع (من حالة الملف)</span>
                    {!isEditing ? (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black border ${selectedTx.statusColor}`}>
                        {selectedTx.status}
                      </span>
                    ) : (
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value)}
                        className="w-40 appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-6 pr-2 py-1 text-right text-xs font-bold text-slate-655 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
                      >
                        <option value="قيد المعالجة">مستحقة (قيد المعالجة)</option>
                        <option value="تم الإنجاز">مدفوعة (تم الإنجاز)</option>
                        <option value="ملغى">ملغى</option>
                      </select>
                    )}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3">
                {isEditing ? (
                  <>
                    <button 
                      type="submit"
                      disabled={actionLoading}
                      className="flex-1 py-2 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {actionLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <span>حفظ التغييرات</span>
                      )}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-655 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      إلغاء
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="flex-1 py-2 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
                    >
                      تعديل العملية
                    </button>
                    <button 
                      type="button"
                      onClick={() => { setIsModalOpen(false); setSelectedTx(null); }}
                      className="flex-1 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-655 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      إغلاق
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
