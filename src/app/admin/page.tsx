"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
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

import { useSearchParams } from "next/navigation";

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activePartners: 0,
    completedFiles: 0,
    totalFiles: 0,
    dueCommissions: 0,
    totalRevenue: 0,
    totalCommissions: 0,
    paidCommissions: 0,
    pendingCommissions: 0,
  });
  
  const [rawClients, setRawClients] = useState<any[]>([]);
  const [rawPayouts, setRawPayouts] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<"today" | "7days" | "thisMonth" | "30days" | "all">("30days");
  const [dateFilterOpen, setDateFilterOpen] = useState(false);

  const [recentFiles, setRecentFiles] = useState<any[]>([]);
  const [recentPartners, setRecentPartners] = useState<any[]>([]);
  const [statusBreakdownState, setStatusBreakdownState] = useState({
    completed: 0,
    processing: 0,
    pendingData: 0,
    cancelled: 0,
  });
  const [dateRange, setDateRange] = useState("");
  const [monthlyData, setMonthlyData] = useState<{ totals: number[]; completed: number[]; labels: string[] }>({ totals: [0,0,0,0,0,0], completed: [0,0,0,0,0,0], labels: [] });
  const [adminName, setAdminName] = useState("أحمد");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("adminUser");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setAdminName(parsed);
        } catch {
          setAdminName("أحمد");
        }
      }
    }

    // Set dynamic date range (30 days ago to today)
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const formatDate = (d: Date) => {
      return d.toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    };
    setDateRange(`${formatDate(thirtyDaysAgo)} - ${formatDate(today)}`);

    async function loadAdminData() {
      try {
        setLoading(true);

        // 1. Fetch all partners and admin users to filter out admins
        const [partnersRes, adminUsersRes] = await Promise.all([
          supabase.from("partners").select("*"),
          supabase.from("admin_users").select("email")
        ]);

        const adminEmails = new Set((adminUsersRes.data || []).map(u => u.email.toLowerCase()));
        adminEmails.add("admin@goforvisa.ma"); // fallback

        const realPartners = (partnersRes.data || []).filter(p => p.email && !adminEmails.has(p.email.toLowerCase()));
        const partnersCount = realPartners.length;

        // 2. Fetch clients data
        const { data: clientsData, error: clientsErr } = await supabase
          .from("clients")
          .select("*, partners(company, name)");

        // 3. Fetch payouts data
        const { data: payoutsData, error: payoutsErr } = await supabase
          .from("payouts")
          .select("*");

        if (clientsErr || payoutsErr) {
          console.error(clientsErr, payoutsErr);
          return;
        }

        const clientsList = clientsData || [];
        const payoutsList = payoutsData || [];

        // Monthly file counts for the line chart (last 6 months - based on raw data)
        const monthlyTotals: number[] = [];
        const monthlyCompleted: number[] = [];
        const monthLabels: string[] = [];
        for (let i = 5; i >= 0; i--) {
          const d = new Date();
          d.setMonth(d.getMonth() - i);
          const tYear = d.getFullYear();
          const tMonth = d.getMonth();
          monthLabels.push(d.toLocaleDateString("ar-EG", { month: "long" }));
          monthlyTotals.push(clientsList.filter(c => {
            const cd = new Date(c.created_at);
            return cd.getFullYear() === tYear && cd.getMonth() === tMonth;
          }).length);
          monthlyCompleted.push(clientsList.filter(c => {
            if (c.status !== "تم الإنجاز") return false;
            const cd = new Date(c.created_at);
            return cd.getFullYear() === tYear && cd.getMonth() === tMonth;
          }).length);
        }

        // Recent Files (limit 5)
        const sortedRecentFiles = [...clientsList]
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5);

        // Fetch recent partners (limit 5) and filter out admin/employees
        const realRecentPartners = realPartners
          .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
          .slice(0, 5);

        setStats(prev => ({
          ...prev,
          activePartners: partnersCount
        }));
        
        setRawClients(clientsList);
        setRawPayouts(payoutsList);
        setRecentFiles(sortedRecentFiles);
        setRecentPartners(realRecentPartners);
        setMonthlyData({ totals: monthlyTotals, completed: monthlyCompleted, labels: monthLabels });

      } catch (err) {
        console.error("Error loading admin dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();

    // Subscribe to realtime database changes
    const channel = supabase
      .channel("admin_dashboard_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "clients" }, () => {
        console.log("Realtime change detected in clients table for admin dashboard.");
        loadAdminData();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "payouts" }, () => {
        console.log("Realtime change detected in payouts table for admin dashboard.");
        loadAdminData();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "partners" }, () => {
        console.log("Realtime change detected in partners table for admin dashboard.");
        loadAdminData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getCountryFlag = (countryName: string) => {
    if (countryName.includes("المملكة المتحدة") || countryName.includes("بريطانيا") || countryName.includes("UK") || countryName.includes("Uk")) return <UkFlag />;
    if (countryName.includes("كندا")) return <CanadaFlag />;
    if (countryName.includes("الولايات المتحدة") || countryName.includes("أمريكا") || countryName.includes("USA") || countryName.includes("Usa")) return <UsaFlag />;
    if (countryName.includes("الدنمارك")) return <DenmarkFlag />;
    if (countryName.includes("أستراليا")) return <AustraliaFlag />;
    return <UsaFlag />;
  };

  // Filter clients based on timeRange
  const filteredClients = rawClients.filter(c => {
    if (!c.created_at) return true;
    const createdDate = new Date(c.created_at);
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
    if (timeRange === "30days") {
      const thirtyDaysAgo = new Date(todayZero);
      thirtyDaysAgo.setDate(todayZero.getDate() - 30);
      return createdZero >= thirtyDaysAgo;
    }
    return true; // "all"
  });

  const filteredPayouts = rawPayouts.filter(w => {
    if (!w.created_at) return true;
    const createdDate = new Date(w.created_at);
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
    if (timeRange === "30days") {
      const thirtyDaysAgo = new Date(todayZero);
      thirtyDaysAgo.setDate(todayZero.getDate() - 30);
      return createdZero >= thirtyDaysAgo;
    }
    return true; // "all"
  });

  // Dynamic Calculations based on filtered data
  const totalFiles = filteredClients.length;
  const completedFiles = filteredClients.filter(c => c.status === "تم الإنجاز").length;
  const activePartners = stats.activePartners;

  const totalRevenue = filteredClients.reduce((sum, c) => sum + Number(c.total_fee || 0), 0);
  
  const totalCommissions = filteredClients
    .filter(c => c.status === "تم الإنجاز")
    .reduce((sum, c) => sum + Number(c.commission || 0), 0);

  const paidCommissions = filteredPayouts
    .filter(w => w.status === "تم التحويل" || w.status === "تم الدفع")
    .reduce((sum, w) => sum + Number(w.amount || 0), 0);

  const pendingCommissions = filteredPayouts
    .filter(w => w.status === "قيد المراجعة")
    .reduce((sum, w) => sum + Number(w.amount || 0), 0);

  const dueCommissions = totalCommissions - paidCommissions - pendingCommissions;

  const statusBreakdown = {
    completed: filteredClients.filter(c => c.status === "تم الإنجاز").length,
    processing: filteredClients.filter(c => c.status === "قيد المعالجة").length,
    pendingData: filteredClients.filter(c => c.status === "في انتظار البيانات").length,
    cancelled: filteredClients.filter(c => c.status === "ملغى").length,
  };

  const total = totalFiles || 1;
  const pctCompleted = (statusBreakdown.completed / total) * 100;
  const pctProcessing = (statusBreakdown.processing / total) * 100;
  const pctPendingData = (statusBreakdown.pendingData / total) * 100;
  const pctCancelled = (statusBreakdown.cancelled / total) * 100;

  const lenCompleted = (statusBreakdown.completed / total) * 219.9;
  const lenProcessing = (statusBreakdown.processing / total) * 219.9;
  const lenPendingData = (statusBreakdown.pendingData / total) * 219.9;
  const lenCancelled = (statusBreakdown.cancelled / total) * 219.9;

  const offsetCompleted = 0;
  const offsetProcessing = -lenCompleted;
  const offsetPending = -(lenCompleted + lenProcessing);
  const offsetCancelled = -(lenCompleted + lenProcessing + lenPendingData);

  // Search Filtered Lists
  const filteredRecentFiles = recentFiles.filter(file => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return (
      (file.name || "").toLowerCase().includes(term) ||
      (file.file_number || "").toLowerCase().includes(term) ||
      (file.partners?.name || "").toLowerCase().includes(term) ||
      (file.partners?.company || "").toLowerCase().includes(term)
    );
  });

  const filteredRecentPartners = recentPartners.filter(partner => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return (
      (partner.name || "").toLowerCase().includes(term) ||
      (partner.company || "").toLowerCase().includes(term) ||
      (partner.email || "").toLowerCase().includes(term)
    );
  });

  const getSelectedLabel = () => {
    const today = new Date();
    const formatDate = (d: Date) => {
      return d.toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    };

    if (timeRange === "today") {
      return `اليوم (${formatDate(today)})`;
    }
    if (timeRange === "7days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      return `${formatDate(sevenDaysAgo)} - ${formatDate(today)}`;
    }
    if (timeRange === "thisMonth") {
      const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      return `${formatDate(firstOfMonth)} - ${formatDate(today)}`;
    }
    if (timeRange === "30days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      return `${formatDate(thirtyDaysAgo)} - ${formatDate(today)}`;
    }
    return "كل الأوقات";
  };

  // Dynamic Line Chart coordinates
  const chartMaxVal = Math.max(...monthlyData.totals, 1);
  const xPositions = [48, 94, 140, 186, 232, 280];
  const getChartY = (val: number) => 110 - (val / chartMaxVal) * 100;

  const totalPoints = monthlyData.totals.map((v, i) => `${xPositions[i]} ${getChartY(v)}`);
  const completedPoints = monthlyData.completed.map((v, i) => `${xPositions[i]} ${getChartY(v)}`);

  const totalPathD = `M ${totalPoints.join(" L ")}`;
  const totalFillD = `${totalPathD} L 280 110 L 48 110 Z`;
  const completedPathD = `M ${completedPoints.join(" L ")}`;
  const completedFillD = `${completedPathD} L 280 110 L 48 110 Z`;

  // Y-axis label values
  const yAxisStep = chartMaxVal / 4;
  const yAxisLabels = [0, Math.round(yAxisStep), Math.round(yAxisStep * 2), Math.round(yAxisStep * 3), Math.round(chartMaxVal)];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#0054A6] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-bold">جاري تحميل بيانات لوحة التحكم...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-right">
          <h1 className="text-2xl font-black text-slate-800">مرحباً {adminName}، أهلاً بك في لوحة التحكم</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">إليك ملخص شامل لأداء المنصة اليوم</p>
        </div>

        {/* Date Selector */}
        <div className="relative shrink-0 z-20">
          <button 
            onClick={() => setDateFilterOpen(!dateFilterOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200/80 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 text-xs font-bold shadow-xs cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{getSelectedLabel()}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
          </button>
          {dateFilterOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 z-30 text-right">
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
              <button 
                onClick={() => { setTimeRange("30days"); setDateFilterOpen(false); }} 
                className={`w-full text-right px-4 py-2 text-xs font-bold hover:bg-slate-50 ${timeRange === "30days" ? "text-blue-600 bg-blue-50/50" : "text-slate-700"}`}
              >
                آخر 30 يوم
              </button>
            </div>
          )}
        </div>
      </div>

      {/* KPI Cards Row (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        
        {/* Card 1: الشركاء النشطين */}
        <div className="bg-white rounded-3xl p-5 lg:p-4 xl:p-5 border border-slate-100/80 shadow-xs flex items-center justify-between gap-3 min-w-0">
          <div className="text-right flex-1 min-w-0">
            <span className="text-[10px] text-slate-400 font-extrabold block truncate">الشركاء النشطين</span>
            <span className="text-xl xl:text-2xl font-black text-slate-800 block mt-1 leading-none">{activePartners}</span>
            <div className="flex items-center gap-1 mt-1.5 text-emerald-600">
              <ArrowUp className="w-3 h-3 stroke-[3]" />
              <span className="text-[9px] font-black">شريك مسجل بالكامل</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100/50">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: الملفات المنجزة */}
        <div className="bg-white rounded-3xl p-5 lg:p-4 xl:p-5 border border-slate-100/80 shadow-xs flex items-center justify-between gap-3 min-w-0">
          <div className="text-right flex-1 min-w-0">
            <span className="text-[10px] text-slate-400 font-extrabold block truncate">الملفات المنجزة</span>
            <span className="text-xl xl:text-2xl font-black text-[#059669] block mt-1 leading-none">{completedFiles}</span>
            <div className="flex items-center gap-1 mt-1.5 text-emerald-600">
              <ArrowUp className="w-3 h-3 stroke-[3]" />
              <span className="text-[9px] font-black">
                {totalFiles > 0 ? ((completedFiles / totalFiles) * 100).toFixed(1) : 0}% من الإجمالي
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/50">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: إجمالي الملفات */}
        <div className="bg-white rounded-3xl p-5 lg:p-4 xl:p-5 border border-slate-100/80 shadow-xs flex items-center justify-between gap-3 min-w-0">
          <div className="text-right flex-1 min-w-0">
            <span className="text-[10px] text-slate-400 font-extrabold block truncate">إجمالي الملفات</span>
            <span className="text-xl xl:text-2xl font-black text-[#0054A6] block mt-1 leading-none">{totalFiles}</span>
            <div className="flex items-center gap-1 mt-1.5 text-emerald-600">
              <ArrowUp className="w-3 h-3 stroke-[3]" />
              <span className="text-[9px] font-black">ملف مسجل بالمنصة</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/50">
            <Files className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: العمولات العادية/المستحقة */}
        <div className="bg-white rounded-3xl p-5 lg:p-4 xl:p-5 border border-slate-100/80 shadow-xs flex items-center justify-between gap-3 min-w-0">
          <div className="text-right flex-1 min-w-0">
            <span className="text-[10px] text-slate-400 font-extrabold block truncate">العمولات المستحقة</span>
            <span className="text-base sm:text-lg lg:text-sm xl:text-base 2xl:text-lg font-black text-amber-500 block mt-1 leading-none" dir="ltr">
              {dueCommissions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
            </span>
            <div className="flex items-center gap-1 mt-1.5 text-emerald-600">
              <ArrowUp className="w-3 h-3 stroke-[3]" />
              <span className="text-[9px] font-black">متبقية للدفع</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100/50">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 5: إجمالي الإيرادات */}
        <div className="bg-white rounded-3xl p-5 lg:p-4 xl:p-5 border border-slate-100/80 shadow-xs flex items-center justify-between gap-3 min-w-0">
          <div className="text-right flex-1 min-w-0">
            <span className="text-[10px] text-slate-400 font-extrabold block truncate">إجمالي الإيرادات</span>
            <span className="text-base sm:text-lg lg:text-sm xl:text-base 2xl:text-lg font-black text-emerald-600 block mt-1 leading-none" dir="ltr">
              {totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
            </span>
            <div className="flex items-center gap-1 mt-1.5 text-emerald-600">
              <ArrowUp className="w-3 h-3 stroke-[3]" />
              <span className="text-[9px] font-black">قيمة جميع الملفات</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/50">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chart 1: Doughnut Chart */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4 flex flex-col justify-between">
              <h3 className="font-extrabold text-slate-800 text-sm">توزيع الملفات حسب الحالة</h3>

              <div className="flex items-center justify-between gap-4 py-1">
                
                {/* Legend */}
                <div className="flex-1 space-y-1.5 text-right">
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">
                      {statusBreakdown.completed} ({pctCompleted.toFixed(1)}%)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500">تم الإنجاز</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">
                      {statusBreakdown.processing} ({pctProcessing.toFixed(1)}%)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500">قيد المعالجة</span>
                      <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0"></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">
                      {statusBreakdown.pendingData} ({pctPendingData.toFixed(1)}%)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500">في انتظار البيانات</span>
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold">
                    <span className="text-slate-400 font-medium">
                      {statusBreakdown.cancelled} ({pctCancelled.toFixed(1)}%)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500">ملغى</span>
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                    </div>
                  </div>
                </div>

                {/* Doughnut SVG */}
                <div className="w-28 h-28 flex items-center justify-center shrink-0 relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none mt-1">
                    <span className="text-lg font-black text-slate-800 leading-none">
                      {totalFiles.toLocaleString()}
                    </span>
                    <span className="text-[6px] text-slate-400 font-bold block mt-1">إجمالي الملفات</span>
                  </div>

                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* Emerald (تم الإنجاز) */}
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#10B981" strokeWidth="11" strokeDasharray={`${lenCompleted} 219.9`} strokeDashoffset={offsetCompleted} />
                    {/* Purple (قيد المعالجة) */}
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#A855F7" strokeWidth="11" strokeDasharray={`${lenProcessing} 219.9`} strokeDashoffset={offsetProcessing} />
                    {/* Amber (في انتظار البيانات) */}
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#F59E0B" strokeWidth="11" strokeDasharray={`${lenPendingData} 219.9`} strokeDashoffset={offsetPending} />
                    {/* Rose (ملغى) */}
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#EF4444" strokeWidth="11" strokeDasharray={`${lenCancelled} 219.9`} strokeDashoffset={offsetCancelled} />
                  </svg>
                </div>

              </div>
            </div>

            {/* Chart 2: Line Chart */}
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

                  {/* Left Axes Labels - dynamic */}
                  <text x="18" y="113" textAnchor="end" className="text-[8px] fill-slate-350 font-bold">{yAxisLabels[0]}</text>
                  <text x="18" y="88" textAnchor="end" className="text-[8px] fill-slate-350 font-bold">{yAxisLabels[1]}</text>
                  <text x="18" y="63" textAnchor="end" className="text-[8px] fill-slate-350 font-bold">{yAxisLabels[2]}</text>
                  <text x="18" y="38" textAnchor="end" className="text-[8px] fill-slate-350 font-bold">{yAxisLabels[3]}</text>
                  <text x="18" y="13" textAnchor="end" className="text-[8px] fill-slate-350 font-bold">{yAxisLabels[4]}</text>

                  {/* X-axis labels - dynamic month names */}
                  {monthlyData.labels.map((label, i) => (
                    <text key={i} x={xPositions[i]} y="126" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">{label}</text>
                  ))}

                  {/* Dynamic total files path */}
                  <path d={totalFillD} fill="url(#blue-grad-3)" />
                  <path d={totalPathD} fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Dynamic completed files path */}
                  <path d={completedFillD} fill="url(#green-grad-3)" />
                  <path d={completedPathD} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Dots on each data point */}
                  {monthlyData.totals.map((v, i) => (
                    <circle key={`t-${i}`} cx={xPositions[i]} cy={getChartY(v)} r="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                  ))}
                  {monthlyData.completed.map((v, i) => (
                    <circle key={`c-${i}`} cx={xPositions[i]} cy={getChartY(v)} r="3" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
                  ))}
                </svg>
              </div>

              {/* Legends */}
              <div className="flex justify-center items-center gap-4 text-[9px] text-slate-400 font-bold pt-2 border-t border-slate-50">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>إجمالي الملفات</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>الملفات المنجزة</span>
                </div>
              </div>
            </div>

          </div>

          {/* Table Card */}
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
              <div className="overflow-x-auto font-medium">
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
                    {filteredRecentFiles.map((file, idx) => {
                      const company = file.partners?.company || file.partners?.name || "شريك عام";
                      const dateStr = new Date(file.created_at).toLocaleDateString("ar-EG", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      });
                      
                      let statusBg = "bg-slate-50 text-slate-500 border border-slate-200";
                      if (file.status === "تم الإنجاز") statusBg = "bg-emerald-50 text-emerald-600";
                      else if (file.status === "قيد المعالجة") statusBg = "bg-purple-50 text-purple-650";
                      else if (file.status === "في انتظار البيانات") statusBg = "bg-amber-50 text-amber-600";
                      else if (file.status === "ملغى") statusBg = "bg-rose-50 text-rose-600 border border-rose-100";

                      return (
                        <tr key={file.id || idx} className="hover:bg-slate-50/40 transition-colors">
                          <td className="py-4 pr-1 font-bold text-slate-800 text-[10px]">{file.file_number}</td>
                          <td className="py-4 text-slate-850 font-extrabold">{file.name}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-1.5" dir="rtl">
                              {getCountryFlag(file.country)}
                              <span className="text-[10px] text-slate-500 font-bold">{file.country}</span>
                            </div>
                          </td>
                          <td className="py-4 text-slate-500 text-[10px] font-bold">{company}</td>
                          <td className="py-4 text-slate-400 text-[10px]">{dateStr}</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black whitespace-nowrap ${statusBg}`}>
                              {file.status}
                            </span>
                          </td>
                          <td className="py-4 text-left">
                            <Link href="/admin/files" className="px-3 py-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg inline-block transition-colors font-bold text-[10px] shadow-3xs">
                              عرض
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredRecentFiles.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400 text-xs font-bold">لا توجد ملفات حالياً.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Bottom Centered Link */}
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

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Card 1: العمولات والأرباح */}
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
                <span className="text-xs font-black text-slate-800" dir="ltr">
                  {(paidCommissions + dueCommissions + pendingCommissions).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
                </span>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs text-slate-500 font-bold">إجمالي العمولات</span>
                  <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-3xs border border-purple-100/50">
                    <CreditCard className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Row 2: مدفوعة */}
              <div className="flex items-center justify-between py-2.5 border-b border-slate-50">
                <span className="text-xs font-black text-emerald-600" dir="ltr">
                  {paidCommissions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
                </span>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs text-slate-500 font-bold">مدفوعة</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-3xs border border-emerald-100/50">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Row 3: قيد المراجعة */}
              <div className="flex items-center justify-between py-2.5 border-b border-slate-50">
                <span className="text-xs font-black text-amber-500" dir="ltr">
                  {pendingCommissions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
                </span>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs text-slate-500 font-bold">قيد المراجعة</span>
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 shadow-3xs border border-amber-100/50">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Row 4: المتبقية للدفع */}
              <div className="flex items-center justify-between py-2.5">
                <span className="text-xs font-black text-[#0054A6]" dir="ltr">
                  {dueCommissions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
                </span>
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
              {filteredRecentPartners.map((p, idx) => {
                const partnerDate = new Date(p.created_at).toLocaleDateString("ar-EG", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                });
                return (
                  <div key={p.id || idx} className="flex items-center justify-between relative py-1">
                    <span className="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">نشط</span>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <h4 className="text-xs font-extrabold text-slate-850">{p.company || p.name}</h4>
                        <span className="text-[9px] text-slate-400 font-bold block mt-0.5">انضم في {partnerDate}</span>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#0054A6] flex items-center justify-center shrink-0 border border-purple-100/50 font-bold text-sm">
                        <Building2 className="w-5 h-5 text-[#0054A6]" />
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredRecentPartners.length === 0 && (
                <div className="py-4 text-center text-slate-400 text-xs font-bold">لا يوجد شركاء حالياً.</div>
              )}
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
