"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
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
  Trophy
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

const CanadaFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 240 120">
      <rect width="60" height="120" fill="#D80027" />
      <rect x="60" width="120" height="120" fill="#FFFFFF" />
      <rect x="180" width="60" height="120" fill="#D80027" />
      <path d="M 120,32 L 123,43 L 131,39 L 128,48 L 137,49 L 128,55 L 132,66 L 123,61 L 122,85 L 118,85 L 117,61 L 108,66 L 112,55 L 103,49 L 112,48 L 109,39 L 117,43 Z" fill="#D80027" />
    </svg>
  </FlagWrapper>
);

const UsaFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 76 40">
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
  </FlagWrapper>
);

const DenmarkFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 37 28">
      <rect width="37" height="28" fill="#C8102E" />
      <rect x="12" width="4" height="28" fill="#FFFFFF" />
      <rect y="12" width="37" height="4" fill="#FFFFFF" />
    </svg>
  </FlagWrapper>
);

const AustraliaFlag = () => (
  <FlagWrapper>
    <svg className="w-7 h-5" viewBox="0 0 80 40">
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
  </FlagWrapper>
);

export default function AdminReports() {
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filterRange, setFilterRange] = useState({ from: "", to: "" });

  const [rawClients, setRawClients] = useState<any[]>([]);
  const [rawPartners, setRawPartners] = useState<any[]>([]);
  const [rawPayouts, setRawPayouts] = useState<any[]>([]);
  const [rawAdminUsers, setRawAdminUsers] = useState<any[]>([]);

  // Initialize date range and load data
  useEffect(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const fromStr = formatDate(firstDay);
    const toStr = formatDate(today);
    setDateFrom(fromStr);
    setDateTo(toStr);
    setFilterRange({ from: fromStr, to: toStr });

    async function loadData() {
      try {
        setLoading(true);
        const [
          { data: clients },
          { data: partners },
          { data: payouts },
          { data: adminUsers }
        ] = await Promise.all([
          supabase.from("clients").select("*"),
          supabase.from("partners").select("*"),
          supabase.from("payouts").select("*"),
          supabase.from("admin_users").select("*")
        ]);

        setRawClients(clients || []);
        setRawPartners(partners || []);
        setRawPayouts(payouts || []);
        setRawAdminUsers(adminUsers || []);
      } catch (err) {
        console.error("Error loading reports data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    const today = new Date();
    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    let fromStr = "";
    let toStr = formatDate(today);

    if (period === "this-month") {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      fromStr = formatDate(firstDay);
    } else if (period === "last-month") {
      const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      fromStr = formatDate(firstDayLastMonth);
      toStr = formatDate(lastDayLastMonth);
    } else if (period === "six-months") {
      const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);
      fromStr = formatDate(sixMonthsAgo);
    } else if (period === "this-year") {
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      fromStr = formatDate(firstDayOfYear);
    }

    setDateFrom(fromStr);
    setDateTo(toStr);
    setFilterRange({ from: fromStr, to: toStr });
  };

  const applyFilter = () => {
    setFilterRange({ from: dateFrom, to: dateTo });
  };

  // 1. Filtered Data based on selected date range
  const filteredClients = rawClients.filter((c) => {
    if (!c.created_at) return false;
    const date = c.created_at.split("T")[0];
    if (filterRange.from && date < filterRange.from) return false;
    if (filterRange.to && date > filterRange.to) return false;
    return true;
  });

  const filteredPayouts = rawPayouts.filter((p) => {
    if (!p.created_at) return false;
    const date = p.created_at.split("T")[0];
    if (filterRange.from && date < filterRange.from) return false;
    if (filterRange.to && date > filterRange.to) return false;
    return true;
  });

  // 2. Previous Period Range for MoM comparisons
  const getPreviousPeriodRange = () => {
    if (!filterRange.from || !filterRange.to) return { from: "", to: "" };
    const fromDate = new Date(filterRange.from);
    const toDate = new Date(filterRange.to);
    const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const prevFromDate = new Date(fromDate);
    prevFromDate.setDate(fromDate.getDate() - diffDays);
    const prevToDate = new Date(toDate);
    prevToDate.setDate(toDate.getDate() - diffDays);

    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    return { from: formatDate(prevFromDate), to: formatDate(prevToDate) };
  };

  const prevRange = getPreviousPeriodRange();

  const prevClients = rawClients.filter((c) => {
    if (!c.created_at) return false;
    const date = c.created_at.split("T")[0];
    if (prevRange.from && date < prevRange.from) return false;
    if (prevRange.to && date > prevRange.to) return false;
    return true;
  });

  const prevPayouts = rawPayouts.filter((p) => {
    if (!p.created_at) return false;
    const date = p.created_at.split("T")[0];
    if (prevRange.from && date < prevRange.from) return false;
    if (prevRange.to && date > prevRange.to) return false;
    return true;
  });

  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? "+100%" : "0%";
    const change = ((current - previous) / previous) * 100;
    return change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  };

  // 3. KPI Calculations
  const currentRevenue = filteredClients.reduce((sum, c) => sum + Number(c.total_fee || 0), 0);
  const prevRevenue = prevClients.reduce((sum, c) => sum + Number(c.total_fee || 0), 0);

  // Filter out partners that are actually admin users
  const adminEmails = new Set(rawAdminUsers.map(u => u.email.toLowerCase()));
  const realPartners = rawPartners.filter(p => p.email && !adminEmails.has(p.email.toLowerCase()) && p.email.toLowerCase() !== "admin@goforvisa.ma");

  const currentPartnersCreated = realPartners.filter((p) => {
    if (!p.created_at) return false;
    const date = p.created_at.split("T")[0];
    return date >= filterRange.from && date <= filterRange.to;
  }).length;
  const prevPartnersCreated = realPartners.filter((p) => {
    if (!p.created_at) return false;
    const date = p.created_at.split("T")[0];
    return date >= prevRange.from && date <= prevRange.to;
  }).length;

  const metrics = [
    {
      title: "إجمالي طلبات السحب",
      value: filteredPayouts.length.toLocaleString(),
      suffix: "طلب",
      change: `${getPercentageChange(filteredPayouts.length, prevPayouts.length)} عن الفترة السابقة`,
      icon: <CreditCard className="w-5 h-5" />,
      colorClass: "bg-blue-50 text-[#0054A6] border-blue-100"
    },
    {
      title: "إجمالي الأرباح",
      value: currentRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      suffix: "DH",
      change: `${getPercentageChange(currentRevenue, prevRevenue)} عن الفترة السابقة`,
      icon: <DollarSign className="w-5 h-5" />,
      colorClass: "bg-amber-50 text-amber-600 border-amber-100"
    },
    {
      title: "إجمالي الشركاء",
      value: realPartners.length.toLocaleString(),
      suffix: "شريك",
      change: `${getPercentageChange(currentPartnersCreated, prevPartnersCreated)} عن الفترة السابقة`,
      icon: <Handshake className="w-5 h-5" />,
      colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      title: "إجمالي العملاء",
      value: filteredClients.length.toLocaleString(),
      suffix: "عميل",
      change: `${getPercentageChange(filteredClients.length, prevClients.length)} عن الفترة السابقة`,
      icon: <Users className="w-5 h-5" />,
      colorClass: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "إجمالي الملفات",
      value: filteredClients.length.toLocaleString(),
      suffix: "ملف",
      change: `${getPercentageChange(filteredClients.length, prevClients.length)} عن الفترة السابقة`,
      icon: <Folder className="w-5 h-5" />,
      colorClass: "bg-purple-50 text-purple-700 border-purple-100"
    }
  ];

  // 4. Doughnut Chart 1: Withdrawals Status Breakdown
  const totalPayoutsCount = filteredPayouts.length || 1;
  const paidCount = filteredPayouts.filter(p => p.status === "تم الدفع" || p.status === "تم التحويل").length;
  const processingCount = filteredPayouts.filter(p => p.status === "قيد المعالجة").length;
  const reviewCount = filteredPayouts.filter(p => p.status === "قيد المراجعة").length;
  const rejectedCount = filteredPayouts.filter(p => p.status === "مرفوض" || p.status === "مرفوضة").length;

  const paidPct = (paidCount / totalPayoutsCount) * 100;
  const processingPct = (processingCount / totalPayoutsCount) * 100;
  const reviewPct = (reviewCount / totalPayoutsCount) * 100;
  const rejectedPct = (rejectedCount / totalPayoutsCount) * 100;

  const C = 251.33; // 2 * pi * r=40
  const paidDash = (paidPct / 100) * C;
  const processingDash = (processingPct / 100) * C;
  const reviewDash = (reviewPct / 100) * C;
  const rejectedDash = (rejectedPct / 100) * C;

  const paidOffset = 0;
  const reviewOffset = -paidDash;
  const processingOffset = -(paidDash + reviewDash);
  const rejectedOffset = -(paidDash + reviewDash + processingDash);

  const totalPayoutsAmount = filteredPayouts.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  // 5. Doughnut Chart 2: Visa Types Distribution
  const totalVisaClients = filteredClients.length || 1;
  const tourismCount = filteredClients.filter(c => (c.visa_type || "").includes("سياحة")).length;
  const studyCount = filteredClients.filter(c => (c.visa_type || "").includes("دراسة")).length;
  const workCount = filteredClients.filter(c => (c.visa_type || "").includes("عمل")).length;
  const familyCount = filteredClients.filter(c => (c.visa_type || "").includes("لم الشمل")).length;
  const otherCount = Math.max(0, filteredClients.length - (tourismCount + studyCount + workCount + familyCount));

  const tourismPct = (tourismCount / totalVisaClients) * 100;
  const studyPct = (studyCount / totalVisaClients) * 100;
  const workPct = (workCount / totalVisaClients) * 100;
  const familyPct = (familyCount / totalVisaClients) * 100;
  const otherPct = (otherCount / totalVisaClients) * 100;

  const tourismDash = (tourismPct / 100) * C;
  const studyDash = (studyPct / 100) * C;
  const workDash = (workPct / 100) * C;
  const familyDash = (familyPct / 100) * C;
  const otherDash = (otherPct / 100) * C;

  const tourismOffset = 0;
  const studyOffset = -tourismDash;
  const workOffset = -(tourismDash + studyDash);
  const familyOffset = -(tourismDash + studyDash + workDash);
  const otherOffset = -(tourismDash + studyDash + workDash + familyDash);

  // 6. Line Chart: Monthly Profits (Last 6 Months)
  const last6Months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    last6Months.push({
      year: d.getFullYear(),
      month: d.getMonth(),
      label: d.toLocaleDateString("ar-EG", { month: "long" })
    });
  }

  const monthlyProfits = last6Months.map((m) => {
    const monthClients = rawClients.filter((c) => {
      if (!c.created_at) return false;
      const cd = new Date(c.created_at);
      return cd.getFullYear() === m.year && cd.getMonth() === m.month;
    });
    return monthClients.reduce((sum, c) => sum + Number(c.total_fee || 0), 0);
  });

  const maxProfit = Math.max(...monthlyProfits, 1000);
  const chartPoints = monthlyProfits.map((val, idx) => {
    const x = 50 + idx * 45;
    const y = 130 - (val / maxProfit) * 110;
    return { x, y, val };
  });

  const linePathD = chartPoints.map((pt, idx) => `${idx === 0 ? "M" : "L"} ${pt.x},${pt.y}`).join(" ");

  // 7. Bottom Grid Row calculations
  // Employee Performance (deterministically assigned for demonstration, only including real employees)
  const employeesOnly = rawAdminUsers.filter(u => u.role === "employee");
  const employeeStats = employeesOnly.map((user, uIdx) => {
    const userClients = filteredClients.filter((_, idx) => idx % Math.max(1, employeesOnly.length) === uIdx);
    const completedCount = userClients.filter(c => c.status === "تم الإنجاز").length;
    return {
      name: user.name,
      role: "موظف",
      processed: userClients.length,
      completed: completedCount,
      pct: userClients.length > 0 ? Math.round((completedCount / userClients.length) * 100) : 100
    };
  });

  const topEmployee = [...employeeStats].sort((a, b) => b.completed - a.completed)[0] || {
    name: "حميد الموظف",
    role: "موظف",
    processed: 0,
    completed: 0,
    pct: 100
  };

  // Files Statistics
  const completedCountAll = filteredClients.filter(c => c.status === "تم الإنجاز").length;
  const processingCountAll = filteredClients.filter(c => c.status === "قيد المعالجة").length;
  const pendingCountAll = filteredClients.filter(c => c.status === "في انتظار البيانات").length;
  const cancelledCountAll = filteredClients.filter(c => c.status === "ملغى").length;

  // Client Statistics (morocco, spain, etc.)
  const today = new Date();
  const currentMonthNewClients = rawClients.filter((c) => {
    if (!c.created_at) return false;
    const cd = new Date(c.created_at);
    return cd.getFullYear() === today.getFullYear() && cd.getMonth() === today.getMonth();
  }).length;
  const prevMonthNewClients = rawClients.filter((c) => {
    if (!c.created_at) return false;
    const cd = new Date(c.created_at);
    const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    return cd.getFullYear() === prevMonth.getFullYear() && cd.getMonth() === prevMonth.getMonth();
  }).length;

  // Group by country
  const countryCounts = filteredClients.reduce((acc: any, c) => {
    const country = (c.country || "أخرى").trim();
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  const getCountryFlag = (countryName: string) => {
    if (countryName.includes("المملكة المتحدة") || countryName.includes("بريطانيا") || countryName.includes("UK") || countryName.includes("Uk")) return <UkFlag />;
    if (countryName.includes("كندا")) return <CanadaFlag />;
    if (countryName.includes("الولايات المتحدة") || countryName.includes("أمريكا") || countryName.includes("USA") || countryName.includes("Usa")) return <UsaFlag />;
    if (countryName.includes("الدنمارك")) return <DenmarkFlag />;
    if (countryName.includes("أستراليا")) return <AustraliaFlag />;
    return <UsaFlag />;
  };

  const topCountries = Object.keys(countryCounts)
    .map((name) => ({ name, count: countryCounts[name] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Top Performing Partners
  const topPartners = Array.from(
    new Set(filteredClients.map((c) => c.partner_id).filter(Boolean))
  ).map((pId) => {
    const partner = rawPartners.find((p) => p.id === pId);
    const partnerClients = filteredClients.filter((c) => c.partner_id === pId);
    const completedClients = partnerClients.filter((c) => c.status === "تم الإنجاز");
    const earnings = completedClients.reduce((sum, c) => sum + Number(c.total_fee || 0), 0);
    
    return {
      name: partner?.company || partner?.name || "شريك غير معروف",
      files: partnerClients.length,
      earnings: earnings
    };
  })
  .sort((a, b) => b.earnings - a.earnings)
  .map((p, idx) => ({ ...p, rank: idx + 1 }))
  .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#0054A6] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12" dir="rtl">
      
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

      {/* Filter Row: Period Dropdown, From Date, To Date, Filter Button */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-wrap items-end justify-start gap-4 flex-1">
          
          {/* Period Selection */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-500 font-bold">الفترة</label>
            <div className="relative">
              <select 
                value={selectedPeriod}
                onChange={(e) => handlePeriodChange(e.target.value)}
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

          {/* Date Picker: من تاريخ */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-500 font-bold">من تاريخ</label>
            <div className="relative">
              <input 
                type="date" 
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer text-slate-700 font-bold h-[38px]"
              />
            </div>
          </div>

          {/* Date Picker: إلى تاريخ */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-500 font-bold">إلى تاريخ</label>
            <div className="relative">
              <input 
                type="date" 
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer text-slate-700 font-bold h-[38px]"
              />
            </div>
          </div>

          {/* Filter Trigger */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-transparent select-none">تصفية</span>
            <button 
              onClick={applyFilter}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer h-[38px]"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>تصفية</span>
            </button>
          </div>

        </div>
      </div>

      {/* KPI Cards Row (5 Cards) */}
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
              <span className={`font-extrabold ${card.change.startsWith("-") ? "text-rose-600" : "text-emerald-600"}`}>
                {card.change.split(" ")[0]}
              </span>
              <span className="text-slate-400 font-bold">{card.change.split(" ").slice(1).join(" ")}</span>
            </div>

          </div>
        ))}
      </div>

      {/* Middle Row Charts (3 Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 3: طلبات السحب */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-800 text-sm text-right">طلبات السحب</h3>
          </div>

          <div className="py-4 flex-1 flex items-center justify-between gap-4">
            
            {/* Legend */}
            <div className="flex-1 space-y-2.5 text-right">
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0" dir="ltr">{paidPct.toFixed(1)}%</span>
                <span className="text-slate-700 font-black text-left w-20 shrink-0" dir="ltr">{paidCount} طلب</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">تم الدفع</span>
                  <span className="w-2 h-2 rounded-[2px] bg-[#10B981] shrink-0"></span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0" dir="ltr">{processingPct.toFixed(1)}%</span>
                <span className="text-slate-700 font-black text-left w-20 shrink-0" dir="ltr">{processingCount} طلب</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">قيد المعالجة</span>
                  <span className="w-2 h-2 rounded-[2px] bg-[#3B82F6] shrink-0"></span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0" dir="ltr">{reviewPct.toFixed(1)}%</span>
                <span className="text-slate-700 font-black text-left w-20 shrink-0" dir="ltr">{reviewCount} طلب</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">قيد المراجعة</span>
                  <span className="w-2 h-2 rounded-[2px] bg-[#F59E0B] shrink-0"></span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0" dir="ltr">{rejectedPct.toFixed(1)}%</span>
                <span className="text-slate-700 font-black text-left w-20 shrink-0" dir="ltr">{rejectedCount} طلب</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">مرفوضة</span>
                  <span className="w-2 h-2 rounded-[2px] bg-[#EF4444] shrink-0"></span>
                </div>
              </div>
            </div>

            {/* Doughnut SVG */}
            <div className="relative w-28 h-28 shrink-0">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <g transform="rotate(-90 50 50)">
                  {paidDash > 0 && (
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10B981" strokeWidth="12" strokeDasharray={`${paidDash} ${C}`} strokeDashoffset={paidOffset} />
                  )}
                  {reviewDash > 0 && (
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F59E0B" strokeWidth="12" strokeDasharray={`${reviewDash} ${C}`} strokeDashoffset={reviewOffset} />
                  )}
                  {processingDash > 0 && (
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3B82F6" strokeWidth="12" strokeDasharray={`${processingDash} ${C}`} strokeDashoffset={processingOffset} />
                  )}
                  {rejectedDash > 0 && (
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EF4444" strokeWidth="12" strokeDasharray={`${rejectedDash} ${C}`} strokeDashoffset={rejectedOffset} />
                  )}
                </g>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full m-[18px] shadow-2xs text-center p-1">
                <span className="text-[7px] text-slate-400 font-extrabold leading-none">المجموع</span>
                <span className="text-[9px] text-[#0054A6] font-black mt-1 leading-tight">{totalPayoutsAmount.toLocaleString()} DH</span>
              </div>
            </div>

          </div>
        </div>

        {/* Chart 2: توزيع الملفات حسب نوع التأشيرة */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-800 text-sm text-right">توزيع الملفات حسب نوع التأشيرة</h3>
          </div>

          <div className="py-4 flex-1 flex items-center justify-between gap-4">
            
            {/* Legend */}
            <div className="flex-1 space-y-2.5 text-right">
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0">{tourismPct.toFixed(0)}%</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">سياحة</span>
                  <span className="w-2 h-2 rounded-[2px] bg-blue-600 shrink-0"></span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0">{studyPct.toFixed(0)}%</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">دراسة</span>
                  <span className="w-2 h-2 rounded-[2px] bg-emerald-500 shrink-0"></span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0">{workPct.toFixed(0)}%</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">عمل</span>
                  <span className="w-2 h-2 rounded-[2px] bg-amber-500 shrink-0"></span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0">{familyPct.toFixed(0)}%</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">لم الشمل</span>
                  <span className="w-2 h-2 rounded-[2px] bg-purple-500 shrink-0"></span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold gap-2">
                <span className="text-slate-400 font-medium text-left w-12 shrink-0">{otherPct.toFixed(0)}%</span>
                <div className="flex-1 flex items-center gap-1.5 justify-end">
                  <span className="text-slate-600">أخرى</span>
                  <span className="w-2 h-2 rounded-[2px] bg-slate-400 shrink-0"></span>
                </div>
              </div>
            </div>

            {/* Doughnut SVG */}
            <div className="relative w-28 h-28 shrink-0">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <g transform="rotate(-90 50 50)">
                  {tourismDash > 0 && (
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2563EB" strokeWidth="12" strokeDasharray={`${tourismDash} ${C}`} strokeDashoffset={tourismOffset} />
                  )}
                  {studyDash > 0 && (
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10B981" strokeWidth="12" strokeDasharray={`${studyDash} ${C}`} strokeDashoffset={studyOffset} />
                  )}
                  {workDash > 0 && (
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F59E0B" strokeWidth="12" strokeDasharray={`${workDash} ${C}`} strokeDashoffset={workOffset} />
                  )}
                  {familyDash > 0 && (
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8B5CF6" strokeWidth="12" strokeDasharray={`${familyDash} ${C}`} strokeDashoffset={familyOffset} />
                  )}
                  {otherDash > 0 && (
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#94A3B8" strokeWidth="12" strokeDasharray={`${otherDash} ${C}`} strokeDashoffset={otherOffset} />
                  )}
                </g>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full m-[18px] shadow-2xs">
                <span className="text-[8px] text-slate-400 font-bold leading-none">إجمالي</span>
                <span className="text-[10px] text-slate-800 font-black mt-0.5 leading-none">{filteredClients.length}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Chart 1: تطور الأرباح الشهرية */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div className="text-right">
              <h3 className="font-extrabold text-slate-800 text-sm">تطور الأرباح الشهرية</h3>
            </div>
            <div className="relative">
              <span className="bg-slate-50 border border-slate-200/60 rounded-lg px-2 py-0.5 text-slate-500 text-[10px] font-bold">
                آخر 6 أشهر
              </span>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="py-4 flex-1 flex items-center justify-center">
            <svg viewBox="0 0 300 150" className="w-full h-44 overflow-visible">
              <line x1="30" y1="20" x2="290" y2="20" stroke="#F1F5F9" strokeWidth="0.8" />
              <line x1="30" y1="50" x2="290" y2="50" stroke="#F1F5F9" strokeWidth="0.8" />
              <line x1="30" y1="80" x2="290" y2="80" stroke="#F1F5F9" strokeWidth="0.8" />
              <line x1="30" y1="110" x2="290" y2="110" stroke="#F1F5F9" strokeWidth="0.8" />
              <line x1="30" y1="130" x2="290" y2="130" stroke="#E2E8F0" strokeWidth="1" />

              {/* Y Axis labels */}
              <text x="22" y="23" textAnchor="end" className="text-[6px] fill-slate-350 font-bold">{(maxProfit * 0.8).toFixed(0)}</text>
              <text x="22" y="53" textAnchor="end" className="text-[6px] fill-slate-350 font-bold">{(maxProfit * 0.6).toFixed(0)}</text>
              <text x="22" y="83" textAnchor="end" className="text-[6px] fill-slate-350 font-bold">{(maxProfit * 0.4).toFixed(0)}</text>
              <text x="22" y="113" textAnchor="end" className="text-[6px] fill-slate-350 font-bold">{(maxProfit * 0.2).toFixed(0)}</text>
              <text x="22" y="133" textAnchor="end" className="text-[6px] fill-slate-350 font-bold">0</text>

              {/* X Axis labels */}
              {last6Months.map((m, idx) => (
                <text key={idx} x={50 + idx * 45} y="142" textAnchor="middle" className="text-[6px] fill-slate-400 font-bold">
                  {m.label}
                </text>
              ))}

              {/* Line Stroke */}
              <path
                d={linePathD}
                fill="none"
                stroke="#0054A6"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Nodes and values */}
              {chartPoints.map((pt, idx) => (
                <g key={idx}>
                  <circle cx={pt.x} cy={pt.y} r="2" fill="#FFFFFF" stroke="#0054A6" strokeWidth="1.5" />
                  <text x={pt.x} y={pt.y - 7} textAnchor="middle" fill="#0054A6" className="text-[5.5px] font-black">
                    {pt.val.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Grid Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 4: أداء الموظفين */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between h-[300px]">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-800 text-xs text-right">أداء الموظفين</h3>
          </div>

          <div className="flex-1 py-3 flex flex-col justify-between gap-4">
            
            {/* Top Employee block */}
            <div className="flex items-center justify-between gap-2.5">
              <div className="text-right">
                <span className="text-[8px] text-slate-400 font-bold block">الموظف الأكثر نشاطاً</span>
                <span className="font-extrabold text-xs block text-slate-800 mt-0.5">{topEmployee.name}</span>
                <div className="flex items-center gap-1 text-[9px] text-[#0054A6] font-bold mt-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>{topEmployee.completed} ملف مكتمل</span>
                </div>
              </div>

              {/* Avatar */}
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
                <span className="text-slate-800 font-black">{topEmployee.processed}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-medium">نسبة الإنجاز</span>
                <span className="text-slate-800 font-black">{topEmployee.pct}%</span>
              </div>
              
              {/* Progress bar */}
              <div className="space-y-1.5 pt-1">
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#0054A6] h-full rounded-full" style={{ width: `${topEmployee.pct}%` }}></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Card 3: إحصائيات الملفات */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between h-[300px]">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-800 text-xs text-right">إحصائيات الملفات</h3>
          </div>

          <div className="flex-1 py-4 flex flex-col justify-between gap-2.5">
            
            {/* Completed */}
            <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-xl border border-slate-100 transition-colors">
              <span className="text-sm font-black text-emerald-600">{completedCountAll}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-600 font-extrabold">الملفات المكتملة</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/50">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* In Progress */}
            <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-xl border border-slate-100 transition-colors">
              <span className="text-sm font-black text-blue-600">{processingCountAll}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-600 font-extrabold">الملفات قيد المعالجة</span>
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/50">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Pending */}
            <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-xl border border-slate-100 transition-colors">
              <span className="text-sm font-black text-amber-500">{pendingCountAll}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-600 font-extrabold">الملفات قيد الانتظار</span>
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100/50">
                  <AlertCircle className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Rejected */}
            <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-xl border border-slate-100 transition-colors">
              <span className="text-sm font-black text-rose-600">{cancelledCountAll}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-600 font-extrabold">الملفات الملغاة</span>
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100/50">
                  <XCircle className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Card 2: إحصائيات العملاء */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between h-[300px]">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-800 text-xs text-right">إحصائيات العملاء</h3>
          </div>

          <div className="flex-1 py-3 flex items-stretch gap-4">
            
            {/* New clients */}
            <div className="flex-1 flex flex-col justify-start text-right">
              <div>
                <span className="text-[9px] text-slate-400 font-extrabold block">عملاء جدد هذا الشهر</span>
                <span className="text-3xl font-black text-[#0054A6] block mt-1">{currentMonthNewClients}</span>
                <div className="flex items-center justify-start gap-1 mt-1">
                  <span className="text-[9px] text-emerald-600 font-black">
                    {getPercentageChange(currentMonthNewClients, prevMonthNewClients)}
                  </span>
                  <span className="text-[8px] text-slate-400 font-bold">عن الشهر الماضي</span>
                </div>
              </div>
            </div>

            {/* Vertical separator */}
            <div className="w-px bg-slate-100 self-stretch"></div>

            {/* Top Countries */}
            <div className="flex-1 flex flex-col justify-start">
              <span className="text-[9px] text-slate-400 font-extrabold block text-right mb-2">أكثر الدول طلباً</span>
              <div className="space-y-2">
                {topCountries.map((c, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-1 border-b border-slate-50 last:border-none">
                    <span className="text-[9px] font-bold text-slate-400 min-w-[8px]">{idx + 1}</span>
                    <div className="flex items-center gap-1.5">
                      {getCountryFlag(c.name)}
                      <span className="text-[10px] text-slate-700 font-bold">{c.name}</span>
                    </div>
                  </div>
                ))}
                {topCountries.length === 0 && (
                  <div className="text-center text-slate-400 text-[10px] py-4">لا توجد بيانات</div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Card 1: أفضل الشركاء أداءً */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between h-[300px]">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-800 text-xs text-right">أفضل الشركاء أداءً</h3>
          </div>

          <div className="flex-1 py-2 overflow-y-auto">
            <table className="w-full text-[10px] text-right text-slate-600 font-bold">
              <thead>
                <tr className="text-slate-400 font-bold border-b border-slate-50">
                  <th className="py-1.5 pr-1 text-right">#</th>
                  <th className="py-1.5 text-right">الشريك</th>
                  <th className="py-1.5 text-center">عدد الملف</th>
                  <th className="py-1.5 pl-1 text-left">الأرباح (DH)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50/50">
                {topPartners.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30">
                    <td className="py-2.5 pr-1 font-bold text-slate-400">{p.rank}</td>
                    <td className="py-2.5 font-extrabold text-slate-700">{p.name}</td>
                    <td className="py-2.5 text-center font-bold text-slate-500">{p.files}</td>
                    <td className="py-2.5 pl-1 text-left font-black text-slate-800" dir="ltr">
                      {p.earnings.toLocaleString()}
                    </td>
                  </tr>
                ))}
                {topPartners.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-slate-400 py-8">لا توجد بيانات</td>
                  </tr>
                )}
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

    </div>
  );
}
