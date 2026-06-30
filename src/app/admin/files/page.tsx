"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Search,
  Download,
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
  ChevronDown,
  X,
  Check,
  AlertTriangle,
  User,
  FileCheck
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

interface FileType {
  id: string;
  dbId?: string;
  clientName: string;
  clientId: string;
  email: string;
  phone: string;
  nationality: string;
  dob: string;
  passportType: string;
  visaType: string;
  visaIcon: any;
  visaIconColor: string;
  country: string;
  flag: React.ComponentType<any>;
  partner: string;
  travelersCount: number;
  additionalNotes?: string;
  depositDate: string;
  lastUpdateDate: string;
  lastUpdateTime: string;
  status: string;
  statusColor: string;
  city?: string;
  job?: string;
  cnss?: string;
  prevRejection?: string;
  created_at?: string;
}

export default function AdminFiles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [depositDateFilter, setDepositDateFilter] = useState("all");
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [drawerTab, setDrawerTab] = useState<"details" | "status">("details");

  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    processing: 0,
    completed: 0,
    total: 0
  });

  useEffect(() => {
    async function loadFilesData() {
      try {
        setLoading(true);

        // Fetch all clients joining with partners
        const { data: dbClients, error: clientsErr } = await supabase
          .from("clients")
          .select("*, partners(company, name)");

        if (clientsErr) {
          console.error("Supabase error fetching clients:", clientsErr);
          return;
        }

        const clients = dbClients || [];

        // DB statuses: 'تم الإنجاز', 'قيد المعالجة', 'في انتظار البيانات', 'ملغى'
        const total = clients.length;
        const completed = clients.filter(c => c.status === "تم الإنجاز").length;
        const processing = clients.filter(c => c.status === "قيد المعالجة" || c.status === "في انتظار البيانات").length;

        setStats({ total, completed, processing });

        const mapped: FileType[] = clients.map((c) => {
          // Status mapping
          let status = "قيد المعالجة";
          let statusColor = "bg-amber-55/10 text-amber-600 border-amber-100";
          if (c.status === "تم الإنجاز") {
            status = "مكتمل";
            statusColor = "bg-emerald-50 text-emerald-700 border-emerald-100";
          } else if (c.status === "ملغى") {
            status = "ملغى";
            statusColor = "bg-rose-50 text-rose-650 border-rose-100";
          } else if (c.status === "في انتظار البيانات") {
            status = "في انتظار البيانات";
            statusColor = "bg-blue-50 text-blue-600 border-blue-100";
          }

          // Visa icons and colors mapping
          let visaIcon: any = Palmtree;
          let visaIconColor = "text-emerald-500";
          if (c.visa_type === "زيارة عائلية") {
            visaIcon = Users2;
            visaIconColor = "text-indigo-500";
          } else if (c.visa_type === "دراسة") {
            visaIcon = GraduationCap;
            visaIconColor = "text-blue-650";
          } else if (c.visa_type === "عمرة") {
            visaIcon = KaabaIcon;
            visaIconColor = "text-slate-800";
          } else if (c.visa_type === "تجارية") {
            visaIcon = Briefcase;
            visaIconColor = "text-slate-650";
          }

          // Flag mapping
          let flag = MoroccoFlag;
          if (c.country === "الإمارات") flag = UaeFlag;
          else if (c.country === "تركيا") flag = TurkeyFlag;
          else if (c.country === "فرنسا") flag = FranceFlag;
          else if (c.country === "السعودية") flag = SaudiFlag;
          else if (c.country === "ألمانيا") flag = GermanyFlag;
          else if (c.country === "المغرب") flag = MoroccoFlag;
          else if (c.country === "إسبانيا") flag = SpainFlag;
          else if (c.country === "بريطانيا") flag = UkFlag;

          // Date formatting
          const dateObj = new Date(c.created_at || new Date());
          const depositDate = dateObj.toLocaleDateString("ar-EG", {
            day: "numeric",
            month: "long",
            year: "numeric"
          });
          const lastUpdateDate = depositDate;
          const lastUpdateTime = dateObj.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          });

          const partnerName = c.partners?.company || c.partners?.name || "شريك مسجل";
          const shortSeq = c.file_number.split("-").pop() || "000000";
          const clientId = `ID: C-${shortSeq}`;

          return {
            id: c.file_number,
            dbId: c.id,
            clientName: c.name,
            clientId,
            visaType: c.visa_type,
            visaIcon,
            visaIconColor,
            country: c.country,
            flag,
            partner: partnerName,
            email: c.email,
            phone: c.phone,
            nationality: c.nationality,
            dob: c.dob,
            passportType: "جواز سفر عادي",
            travelersCount: 1,
            additionalNotes: c.notes || "",
            depositDate,
            lastUpdateDate,
            lastUpdateTime,
            status,
            statusColor,
            city: c.city || "",
            job: c.job || "",
            cnss: c.cnss || "لا",
            prevRejection: c.prev_rejection || "لا",
            created_at: c.created_at
          } as any;
        });

        // Sort by deposit date descending
        mapped.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

        setFiles(mapped);

      } catch (err) {
        console.error("Error loading files:", err);
      } finally {
        setLoading(false);
      }
    }

    loadFilesData();

    // Subscribe to realtime database changes for files (clients table)
    const channel = supabase
      .channel("admin_files_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "clients" }, () => {
        console.log("Realtime change detected in clients table for admin files page.");
        loadFilesData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateFileStatus = async (fileId: string, newStatus: string) => {
    const targetFile = files.find(f => f.id === fileId);
    if (!targetFile) return;
    const dbId = (targetFile as any).dbId;

    // Map UI status back to DB status
    let dbStatus = newStatus;
    if (newStatus === "مكتمل") dbStatus = "تم الإنجاز";
    else if (newStatus === "قيد المعالجة") dbStatus = "قيد المعالجة";
    else if (newStatus === "ملغى") dbStatus = "ملغى";
    else if (newStatus === "في انتظار البيانات") dbStatus = "في انتظار البيانات";

    try {
      const { error } = await supabase
        .from("clients")
        .update({ status: dbStatus })
        .eq("id", dbId);

      if (error) {
        console.error("Error updating status in Supabase:", error);
        alert("حدث خطأ أثناء تحديث حالة الملف: " + error.message);
        return;
      }

      // Update local state files list
      setFiles(prev => prev.map(f => {
        if (f.id === fileId) {
          let statusColor = "bg-slate-50 text-slate-500 border-slate-200";
          if (newStatus === "مكتمل") {
            statusColor = "bg-emerald-50 text-emerald-700 border-emerald-100";
          } else if (newStatus === "قيد المعالجة") {
            statusColor = "bg-amber-55/10 text-amber-600 border-amber-100";
          } else if (newStatus === "ملغى") {
            statusColor = "bg-rose-50 text-rose-650 border-rose-100";
          } else if (newStatus === "في انتظار البيانات") {
            statusColor = "bg-blue-50 text-blue-600 border-blue-100";
          }
          const updatedFile = { ...f, status: newStatus, statusColor };
          if (selectedFile?.id === fileId) {
            setSelectedFile(updatedFile);
          }
          return updatedFile;
        }
        return f;
      }));

      // Update stats counters
      setStats(prev => {
        const updated = files.map(f => f.id === fileId ? { ...f, status: newStatus } : f);
        const total = updated.length;
        const completed = updated.filter(c => c.status === "مكتمل").length;
        const processing = updated.filter(c => c.status === "قيد المعالجة" || c.status === "في انتظار البيانات").length;
        return { total, completed, processing };
      });

    } catch (err) {
      console.error(err);
    }
  };
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#0054A6] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-bold">جاري تحميل بيانات الملفات...</p>
      </div>
    );
  }

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

  // Export to CSV function
  const handleExportCSV = () => {
    if (filteredFiles.length === 0) {
      alert("لا توجد بيانات لتصديرها.");
      return;
    }
    
    const headers = ["رقم الملف", "العميل", "نوع التأشيرة", "الدولة", "الشريك", "تاريخ الإيداع", "آخر تحديث", "الحالة"];
    const rows = filteredFiles.map(f => [
      `"${f.id.replace(/"/g, '""')}"`,
      `"${f.clientName.replace(/"/g, '""')}"`,
      `"${f.visaType.replace(/"/g, '""')}"`,
      `"${f.country.replace(/"/g, '""')}"`,
      `"${f.partner.replace(/"/g, '""')}"`,
      `"${f.depositDate.replace(/"/g, '""')}"`,
      `"${(f.lastUpdateDate + ' ' + f.lastUpdateTime).replace(/"/g, '""')}"`,
      `"${f.status.replace(/"/g, '""')}"`
    ]);
    
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `goforvisa_files_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter requests
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          file.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          file.clientId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                          (statusFilter === "completed" && file.status === "مكتمل") ||
                          (statusFilter === "processing" && file.status === "قيد المعالجة") ||
                          (statusFilter === "waiting" && file.status === "في انتظار البيانات") ||
                          (statusFilter === "canceled" && file.status === "ملغى");

    const matchesCountry = countryFilter === "all" || file.country === countryFilter;
    const matchesType = typeFilter === "all" || file.visaType === typeFilter;

    let matchesDate = true;
    if (depositDateFilter !== "all" && file.created_at) {
      const fDate = new Date(file.created_at);
      const today = new Date();
      if (depositDateFilter === "today") {
        matchesDate = fDate.toDateString() === today.toDateString();
      } else if (depositDateFilter === "thisMonth") {
        matchesDate = fDate.getMonth() === today.getMonth() && fDate.getFullYear() === today.getFullYear();
      } else if (depositDateFilter === "thisYear") {
        matchesDate = fDate.getFullYear() === today.getFullYear();
      }
    }

    return matchesSearch && matchesStatus && matchesCountry && matchesType && matchesDate;
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

      {/* KPI Cards (3 Cards) ordered from right to left (RTL) matching Screenshot:
          Processing -> Completed -> Total */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: قيد المعالجة (Processing) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">قيد المعالجة</span>
            <span className="text-2xl font-black text-amber-500 block mt-1.5 leading-none">{stats.processing}</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1.5">
              {stats.total > 0 ? ((stats.processing / stats.total) * 100).toFixed(1) : 0}% من الإجمالي
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100/50">
            <Clock className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Card 2: الملفات المكتملة (Completed) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">الملفات المكتملة</span>
            <span className="text-2xl font-black text-[#059669] block mt-1.5 leading-none">{stats.completed}</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1.5">
              {stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0}% من الإجمالي
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/50">
            <CheckCircle className="w-5.5 h-5.5" />
          </div>
        </div>

        {/* Card 3: إجمالي الملفات (Total) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">إجمالي الملفات</span>
            <span className="text-2xl font-black text-[#0054A6] block mt-1.5 leading-none">{stats.total}</span>
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
                value={depositDateFilter}
                onChange={(e) => setDepositDateFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-xs font-bold text-slate-650 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">تاريخ الإيداع</option>
                <option value="today">اليوم</option>
                <option value="thisMonth">هذا الشهر</option>
                <option value="thisYear">هذا العام</option>
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
                <option value="سياحة">سياحة</option>
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
                <option value="waiting">في انتظار البيانات</option>
                <option value="canceled">ملغى</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Left Side: Export Button (Blue color with download icon) */}
        <div className="flex items-center justify-end shrink-0 pt-4 xl:pt-0">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer h-[38px]"
          >
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
                <th className="py-4 text-right">الشريك</th>
                <th className="py-4 text-right">تاريخ الإيداع</th>
                <th className="py-4 text-right">آخر تحديث</th>
                <th className="py-4 text-right">الحالة</th>
                <th className="py-4 pl-6 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file, idx) => {
                  const Flag = file.flag;
                  const VisaIcon = file.visaIcon;
                  // Status badge dynamic colors
                  let badgeColor = "bg-slate-50 text-slate-500 border-slate-200";
                  let dotColor = "bg-slate-400";
                  if (file.status === "مكتمل") {
                    badgeColor = "bg-emerald-50 text-emerald-600 border-emerald-100";
                    dotColor = "bg-emerald-500";
                  } else if (file.status === "قيد المعالجة") {
                    badgeColor = "bg-amber-50 text-amber-600 border-amber-100";
                    dotColor = "bg-amber-500";
                  } else if (file.status === "ملغى") {
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

                      {/* Partner name */}
                      <td className="py-4 text-slate-750 font-bold text-xs">{file.partner}</td>

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

                      {/* Actions (Review button) */}
                      <td className="py-4 pl-6 text-left">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Review Button */}
                          <button 
                            onClick={() => setSelectedFile(file)}
                            className="px-2.5 py-1 bg-blue-50 text-[#0054A6] hover:bg-blue-100 hover:text-blue-900 border border-blue-200/60 rounded-lg flex items-center gap-1.5 transition-colors font-extrabold text-[10px] cursor-pointer shadow-3xs"
                            title="بدء مراجعة الملف والوثائق"
                          >
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>مراجعة</span>
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
            <span>عرض 1 - {filteredFiles.length} من {files.length} ملف</span>
          </div>
          
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

      {/* Interactive Sliding Drawer Detail Panel (Slides from the LEFT in RTL layout) */}
      {selectedFile && (
        <>
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity duration-300"
            onClick={() => setSelectedFile(null)}
          />

          {/* Sliding Panel */}
          <div className="fixed top-0 left-0 bottom-0 w-full sm:w-[500px] bg-[#F8FAFC] z-50 shadow-2xl flex flex-col border-r border-slate-200 transform transition-transform duration-300 ease-out text-right font-medium animate-in slide-in-from-left" dir="rtl">
            
            {/* Drawer Header */}
            <div className="bg-[#001B5B] text-white p-6 relative shrink-0">
              <button 
                onClick={() => setSelectedFile(null)}
                className="absolute top-6 left-6 text-slate-300 hover:text-white p-1 hover:bg-white/10 rounded-lg cursor-pointer transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3 mt-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-black text-white text-base shadow-inner">
                  {selectedFile.clientName.substring(0, 2)}
                </div>
                <div>
                  <h3 className="text-base font-black">{selectedFile.clientName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-300 font-bold" dir="ltr">{selectedFile.id}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black border ${
                      selectedFile.status === "مكتمل" ? "bg-emerald-500/20 text-emerald-250 border-emerald-500/40" : 
                      selectedFile.status === "قيد المعالجة" ? "bg-amber-500/20 text-amber-250 border-amber-500/40" : 
                      "bg-rose-500/20 text-rose-250 border-rose-500/40"
                    }`}>
                      {selectedFile.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation in Drawer */}
            <div className="bg-white border-b border-slate-100 flex items-center justify-around px-4 shrink-0">
              <button 
                onClick={() => setDrawerTab("details")}
                className={`py-3.5 text-xs font-black border-b-2 transition-all cursor-pointer ${
                  drawerTab === "details" ? "border-[#0054A6] text-[#0054A6]" : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                تفاصيل الملف
              </button>
              <button 
                onClick={() => setDrawerTab("status")}
                className={`py-3.5 text-xs font-black border-b-2 transition-all cursor-pointer ${
                  drawerTab === "status" ? "border-[#0054A6] text-[#0054A6]" : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                تحديث حالة الطلب
              </button>
            </div>

            {/* Drawer Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Tab 2: Details */}
              {drawerTab === "details" && (
                <div className="space-y-5">
                  {/* معلومات العميل Card */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-50 pb-3 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0054A6] flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <h4 className="font-extrabold text-slate-800 text-sm">معلومات العميل</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                      <div>
                        <span className="text-[10px] text-slate-400 font-extrabold block">الاسم الكامل</span>
                        <span className="text-xs font-bold text-slate-800 mt-1 block">{selectedFile.clientName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-extrabold block">رقم الهاتف</span>
                        <span className="text-xs font-bold text-slate-700 mt-1 block" dir="ltr">{selectedFile.phone}</span>
                      </div>
                      {selectedFile.email && (
                        <div>
                          <span className="text-[10px] text-slate-400 font-extrabold block">البريد الإلكتروني</span>
                          <span className="text-xs font-bold text-slate-700 mt-1 block break-all" dir="ltr">{selectedFile.email}</span>
                        </div>
                      )}
                      {selectedFile.city && (
                        <div>
                          <span className="text-[10px] text-slate-400 font-extrabold block">المدينة</span>
                          <span className="text-xs font-bold text-slate-700 mt-1 block">{selectedFile.city}</span>
                        </div>
                      )}
                      {selectedFile.job && (
                        <div className="col-span-2">
                          <span className="text-[10px] text-slate-400 font-extrabold block">طبيعة العمل الحالي</span>
                          <span className="text-xs font-bold text-slate-700 mt-1 block">{selectedFile.job}</span>
                        </div>
                      )}
                      {selectedFile.cnss && (
                        <div>
                          <span className="text-[10px] text-slate-400 font-extrabold block">تغطية الضمان الاجتماعي (CNSS)</span>
                          <span className="text-xs font-bold text-slate-700 mt-1 block">{selectedFile.cnss}</span>
                        </div>
                      )}
                      {selectedFile.prevRejection && (
                        <div>
                          <span className="text-[10px] text-slate-400 font-extrabold block">هل تم الرفض من قبل؟</span>
                          <span className="text-xs font-bold text-slate-700 mt-1 block">{selectedFile.prevRejection}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] text-slate-400 font-extrabold block">الجنسية</span>
                        <span className="text-xs font-bold text-slate-700 mt-1 block">{selectedFile.nationality}</span>
                      </div>
                      {selectedFile.dob && (
                        <div>
                          <span className="text-[10px] text-slate-400 font-extrabold block">تاريخ الميلاد</span>
                          <span className="text-xs font-bold text-slate-700 mt-1 block" dir="ltr">{selectedFile.dob}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] text-slate-400 font-extrabold block">نوع جواز السفر</span>
                        <span className="text-xs font-bold text-slate-700 mt-1 block">{selectedFile.passportType}</span>
                      </div>
                    </div>
                  </div>

                  {/* معلومات الطلب Card */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-50 pb-3 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0054A6] flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <h4 className="font-extrabold text-slate-800 text-sm">معلومات الطلب</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                      <div>
                        <span className="text-[10px] text-slate-400 font-extrabold block">الدولة المطلوبة</span>
                        <div className="flex items-center gap-1.5 mt-1 justify-start">
                          {React.createElement(selectedFile.flag)}
                          <span className="text-xs font-bold text-slate-800">{selectedFile.country}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-extrabold block">نوع التأشيرة</span>
                        <span className="text-xs font-bold text-slate-800 mt-1 block">{selectedFile.visaType}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-extrabold block">عدد المسافرين</span>
                        <span className="text-xs font-bold text-slate-700 mt-1 block">{selectedFile.travelersCount}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-extrabold block">تاريخ الإيداع</span>
                        <span className="text-xs font-bold text-slate-700 mt-1 block" dir="ltr">{selectedFile.depositDate}</span>
                      </div>
                    </div>

                    {selectedFile.additionalNotes && (
                      <div className="border-t border-slate-50 pt-3.5 mt-2">
                        <span className="text-[10px] text-slate-400 font-extrabold block mb-1">ملاحظات إضافية</span>
                        <p className="text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                          {selectedFile.additionalNotes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* الوكالة الشريكة Card */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs">
                    <span className="text-[10px] text-slate-400 font-extrabold block mb-2">الوكالة الشريكة المرسلة</span>
                    <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0054A6] flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-slate-750 block">{selectedFile.partner}</span>
                        <span className="text-[9px] text-slate-450 font-bold block mt-0.5">شريك مسجل بالمغرب</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Status override */}
              {drawerTab === "status" && (
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs space-y-4">
                  <h4 className="font-extrabold text-slate-800 text-xs border-b border-slate-50 pb-2 mb-3">تحديث حالة الطلب</h4>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => updateFileStatus(selectedFile.id, "مكتمل")}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-right transition-all cursor-pointer ${
                        selectedFile.status === "مكتمل" 
                          ? "bg-emerald-50 border-emerald-400 text-emerald-800 font-black shadow-2xs" 
                          : "bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-xs font-extrabold text-slate-800">مكتمل (تم الانتهاء والاعتماد)</span>
                      </div>
                      {selectedFile.status === "مكتمل" && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>

                    <button 
                      onClick={() => updateFileStatus(selectedFile.id, "قيد المعالجة")}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-right transition-all cursor-pointer ${
                        selectedFile.status === "قيد المعالجة" 
                          ? "bg-amber-50 border-amber-400 text-amber-800 font-black shadow-2xs" 
                          : "bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-xs font-extrabold text-slate-800">قيد المعالجة (تحت المتابعة والمراجعة)</span>
                      </div>
                      {selectedFile.status === "قيد المعالجة" && <Check className="w-4 h-4 text-amber-600" />}
                    </button>

                    <button 
                      onClick={() => updateFileStatus(selectedFile.id, "ملغى")}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-right transition-all cursor-pointer ${
                        selectedFile.status === "ملغى" 
                          ? "bg-rose-50 border-rose-400 text-rose-800 font-black shadow-2xs" 
                          : "bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span className="text-xs font-extrabold text-slate-800">ملغى (تم إلغاء الطلب أو تعذّر التواصل)</span>
                      </div>
                      {selectedFile.status === "ملغى" && <Check className="w-4 h-4 text-rose-600" />}
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Actions Footer */}
            <div className="p-4 border-t border-slate-200 bg-white grid grid-cols-3 gap-3 shrink-0">
              <button 
                onClick={() => setSelectedFile(null)}
                className="px-2 py-2.5 bg-slate-100 hover:bg-slate-150 text-slate-700 rounded-xl text-xs font-bold text-center transition-all cursor-pointer border border-slate-200"
              >
                إغلاق النافذة
              </button>
              <a 
                href={`https://wa.me/${selectedFile.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold text-center transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.729-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.906-6.99C16.257 1.83 13.785.799 11.147.798 5.714.798 1.3 5.218 1.297 10.655c-.001 1.748.477 3.454 1.385 4.962L1.75 20.89l5.35-1.402c1.558.85 3.328 1.298 5.093 1.298.001 0 0 0 0 0z" />
                </svg>
                <span>تواصل واتساب</span>
              </a>
              <button 
                onClick={() => setSelectedFile(null)}
                className="px-2 py-2.5 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold text-center transition-all shadow-xs cursor-pointer"
              >
                حفظ وإنهاء
              </button>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
