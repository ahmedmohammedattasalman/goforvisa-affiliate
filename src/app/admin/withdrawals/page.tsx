"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Wallet, 
  Search, 
  Download, 
  Eye, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  RefreshCw,
  Calendar,
  ChevronDown,
  Building2,
  FileSpreadsheet,
  FileDown,
  MessageSquarePlus,
  AlertCircle
} from "lucide-react";

export default function AdminWithdrawals() {
  // Tabs State (All, Review, Processing, Paid, Rejected)
  const [activeTab, setActiveTab] = useState("all");
  
  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [partnerFilter, setPartnerFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("2024-05-01");
  const [dateTo, setDateTo] = useState("2024-05-31");

  // Mock withdrawal requests list matching Screenshot 4
  const [requests, setRequests] = useState([
    {
      id: "WD-2026-001",
      partner: "Travel Anamer",
      partnerInitials: "TA",
      email: "contact@travelanamer.com",
      phone: "+212 6 12 34 56 78",
      availableBalance: "6,850.00 DH",
      amount: "2,500.00 DH",
      method: "تحويل بنكي",
      methodCode: "bank",
      fee: "10.00 DH",
      netAmount: "2,490.00 DH",
      status: "قيد المراجعة",
      statusKey: "review",
      date: "2026-06-20 14:35",
      accountName: "محمد الإدريسي",
      accountNumber: "230 450 1234567890 4587",
      partnerNotes: "أرجو التسريع في العملية",
      adminNotes: "-"
    },
    {
      id: "WD-2026-002",
      partner: "Go Mosafer",
      partnerInitials: "GM",
      email: "finance@gomosafer.com",
      phone: "+212 6 98 76 54 32",
      availableBalance: "3,500.00 DH",
      amount: "1,200.00 DH",
      method: "Cash Plus",
      methodCode: "cashplus",
      fee: "10.00 DH",
      netAmount: "1,190.00 DH",
      status: "قيد المعالجة",
      statusKey: "processing",
      date: "2026-06-20 11:20",
      accountName: "سفيان بن علي",
      accountNumber: "CIN: AB123456 - CashPlus Ref: N/A",
      partnerNotes: "شكراً لفريق العمل",
      adminNotes: "-"
    },
    {
      id: "WD-2026-003",
      partner: "Eagle Tourism",
      partnerInitials: "ET",
      email: "accounts@eagletourism.ae",
      phone: "+971 4 123 4567",
      availableBalance: "12,400.00 DH",
      amount: "5,000.00 DH",
      method: "Wafa Cash",
      methodCode: "wafacash",
      fee: "20.00 DH",
      netAmount: "4,980.00 DH",
      status: "تم الدفع",
      statusKey: "paid",
      date: "2026-06-19 16:45",
      accountName: "شركة إيجل توريزم",
      accountNumber: "Wafacash Code: 987654321",
      partnerNotes: "",
      adminNotes: "تم تحويل المبلغ بنجاح عبر خدمة وفاء كاش"
    },
    {
      id: "WD-2026-004",
      partner: "Nile Travel",
      partnerInitials: "NT",
      email: "billing@niletravel.com",
      phone: "+20 2 3456 7890",
      availableBalance: "1,500.00 DH",
      amount: "800.00 DH",
      method: "تحويل بنكي",
      methodCode: "bank",
      fee: "10.00 DH",
      netAmount: "790.00 DH",
      status: "مرفوض",
      statusKey: "rejected",
      date: "2026-06-18 09:30",
      accountName: "أحمد النيل",
      accountNumber: "EG93 0002 0124 5556 7890",
      partnerNotes: "سحب أرباح الأسبوع الماضي",
      adminNotes: "الحساب البنكي المقدم غير مطابق لبيانات الشريك المعتمدة"
    },
    {
      id: "WD-2026-005",
      partner: "Atlas Travel",
      partnerInitials: "AT",
      email: "contact@atlastravel.ma",
      phone: "+212 5 22 45 67 89",
      availableBalance: "8,900.00 DH",
      amount: "3,000.00 DH",
      method: "Cash Plus",
      methodCode: "cashplus",
      fee: "10.00 DH",
      netAmount: "2,990.00 DH",
      status: "قيد المراجعة",
      statusKey: "review",
      date: "2026-06-18 13:15",
      accountName: "ياسين الأطلسي",
      accountNumber: "CIN: CD987654",
      partnerNotes: "",
      adminNotes: "-"
    },
    {
      id: "WD-2026-006",
      partner: "Visa Expert",
      partnerInitials: "VE",
      email: "withdraw@visaexpert.com",
      phone: "+212 6 55 99 88 77",
      availableBalance: "4,200.00 DH",
      amount: "2,000.00 DH",
      method: "تحويل بنكي",
      methodCode: "bank",
      fee: "20.00 DH",
      netAmount: "1,980.00 DH",
      status: "تم الدفع",
      statusKey: "paid",
      date: "2026-06-17 15:40",
      accountName: "أنس الفيزا",
      accountNumber: "181 240 9876543210 1122",
      partnerNotes: "سحب عمولة ملفات مايو",
      adminNotes: "تم التحويل بنجاح"
    }
  ]);

  // Selected Request State (defaults to first item)
  const [selectedId, setSelectedId] = useState("WD-2026-001");
  const selectedRequest = requests.find((r) => r.id === selectedId) || requests[0];
  const [adminNoteInput, setAdminNoteInput] = useState(selectedRequest?.adminNotes || "");

  // Update administrative notes when selected request changes
  React.useEffect(() => {
    if (selectedRequest) {
      setAdminNoteInput(selectedRequest.adminNotes);
    }
  }, [selectedId]);

  // Handle status updates
  const handleUpdateStatus = (id: string, newStatus: string, statusKey: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        return { 
          ...req, 
          status: newStatus, 
          statusKey: statusKey,
          adminNotes: adminNoteInput 
        };
      }
      return req;
    }));
  };

  const handleSaveNotes = () => {
    setRequests(prev => prev.map(req => {
      if (req.id === selectedId) {
        return { ...req, adminNotes: adminNoteInput };
      }
      return req;
    }));
    alert("تم حفظ ملاحظات الإدارة بنجاح");
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setPartnerFilter("all");
    setMethodFilter("all");
    setDateFrom("2024-05-01");
    setDateTo("2024-05-31");
  };

  // Tab Filtering & Query Filtering
  const filteredRequests = requests.filter((req) => {
    // 1. Tab filter
    if (activeTab === "review" && req.statusKey !== "review") return false;
    if (activeTab === "processing" && req.statusKey !== "processing") return false;
    if (activeTab === "paid" && req.statusKey !== "paid") return false;
    if (activeTab === "rejected" && req.statusKey !== "rejected") return false;

    // 2. Query filters
    const matchesSearch = req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.partner.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPartner = partnerFilter === "all" || 
                          (partnerFilter === "travelanamer" && req.partner.includes("Anamer")) ||
                          (partnerFilter === "gomosafer" && req.partner.includes("Mosafer")) ||
                          (partnerFilter === "eagle" && req.partner.includes("Eagle")) ||
                          (partnerFilter === "nile" && req.partner.includes("Nile"));

    const matchesMethod = methodFilter === "all" || 
                          (methodFilter === "bank" && req.methodCode === "bank") ||
                          (methodFilter === "cashplus" && req.methodCode === "cashplus") ||
                          (methodFilter === "wafacash" && req.methodCode === "wafacash");

    return matchesSearch && matchesPartner && matchesMethod;
  });

  // Stylized partner logo helper matching Screenshot 4
  const renderPartnerLogo = (partner: string) => {
    if (partner === "Travel Anamer") {
      return (
        <div className="w-8 h-8 rounded-full bg-[#0054A6] flex items-center justify-center text-white shrink-0 overflow-hidden shadow-xs">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M3.6 9h16.8M3.6 15h16.8" />
            <path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" />
          </svg>
        </div>
      );
    }
    if (partner === "Go Mosafer") {
      return (
        <div className="w-8 h-8 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0 border border-blue-100 shadow-xs">
          <span className="text-[#0284C7] font-black text-xs">GO</span>
        </div>
      );
    }
    if (partner === "Eagle Tourism") {
      return (
        <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center text-amber-500 shrink-0 shadow-xs">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
      );
    }
    if (partner === "Nile Travel") {
      return (
        <div className="w-8 h-8 rounded-full bg-[#ECFDF5] flex items-center justify-center shrink-0 border border-emerald-100 shadow-xs">
          <span className="text-[#059669] font-black text-xs">NILE</span>
        </div>
      );
    }
    if (partner === "Atlas Travel") {
      return (
        <div className="w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center text-slate-800 shrink-0 border border-slate-200 shadow-xs">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        </div>
      );
    }
    if (partner === "Visa Expert") {
      return (
        <div className="w-8 h-8 rounded-full bg-[#EEF2F6] flex items-center justify-center shrink-0 border border-[#0054A6]/20 shadow-xs">
          <span className="text-[#0054A6] font-black text-xs">VE</span>
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-extrabold text-xs shrink-0 border border-slate-200 shadow-xs">
        {partner.substring(0, 2)}
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-1.5">
            <Link href="/admin" className="hover:text-[#0054A6]">الرئيسية</Link>
            <span className="mx-1">/</span>
            <span>طلبات السحب</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-700 shadow-xs">
              <CreditCard className="w-5 h-5 text-[#0054A6]" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800">طلبات السحب</h1>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">إدارة جميع طلبات سحب الأرباح من الشركاء</p>
        </div>
      </div>

      {/* KPI Cards Row (5 Cards) ordered from right to left (RTL): 
          Rejected -> Paid -> Processing -> Review -> Total */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        
        {/* Card 1: مرفوضة (Rejected) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">مرفوضة</span>
            <span className="text-lg font-black text-rose-600 block mt-1" dir="ltr">5,000.00 DH</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1">6 طلبات</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100/50">
            <XCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: تم الدفع (Paid) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">تم الدفع</span>
            <span className="text-lg font-black text-emerald-600 block mt-1" dir="ltr">88,450.00 DH</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1">95 عملية</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/50">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: قيد المعالجة (Processing) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">قيد المعالجة</span>
            <span className="text-lg font-black text-blue-600 block mt-1" dir="ltr">24,300.00 DH</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1">12 طلب</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/50">
            <RefreshCw className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: قيد المراجعة (Review) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">قيد المراجعة</span>
            <span className="text-lg font-black text-amber-500 block mt-1" dir="ltr">32,500.00 DH</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1">18 طلب</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100/50">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 5: إجمالي طلبات السحب (Total) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">إجمالي طلبات السحب</span>
            <span className="text-lg font-black text-slate-800 block mt-1" dir="ltr">145,250.00 DH</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1">إجمالي 65 طلب</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-slate-50 text-[#0054A6] flex items-center justify-center shrink-0 border border-slate-100">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Filter Row Panel: Filters on Right, Export stacked on Left */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col xl:flex-row items-stretch xl:items-end justify-between gap-4">
        
        {/* Right Side: Filters with labels ABOVE inputs (flows from right to left in RTL) */}
        <div className="flex flex-wrap items-end justify-start gap-4 flex-1">
          
          {/* 1. Main Filter CTA */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-transparent select-none">فلترة</span>
            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer h-[38px]">
              <Filter className="w-3.5 h-3.5" />
              <span>فلترة</span>
            </button>
          </div>

          {/* 2. Refresh filters */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-transparent select-none">إعادة</span>
            <button 
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 px-3 py-2.5 border border-slate-200 text-slate-650 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-xs font-bold h-[38px]"
              title="إعادة تعيين"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>إعادة تعيين</span>
            </button>
          </div>

          {/* 3. Request ID text search */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
            <label className="text-[11px] text-slate-550 font-bold">رقم الطلب</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث برقم الطلب..."
                className="w-full pl-3 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none transition-all text-slate-700 placeholder:text-slate-400 font-bold h-[38px]"
              />
            </div>
          </div>

          {/* 4. Partner filter */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-550 font-bold">اسم الشريك</label>
            <div className="relative">
              <select 
                value={partnerFilter}
                onChange={(e) => setPartnerFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">كل الشركاء</option>
                <option value="travelanamer">Travel Anamer</option>
                <option value="gomosafer">Go Mosafer</option>
                <option value="eagle">Eagle Tourism</option>
                <option value="nile">Nile Travel</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* 5. Withdrawal method filter */}
          <div className="flex flex-col gap-1.5 min-w-[120px]">
            <label className="text-[11px] text-slate-550 font-bold">طريقة السحب</label>
            <div className="relative">
              <select 
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-xs font-bold text-slate-650 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">كل الطرق</option>
                <option value="bank">تحويل بنكي</option>
                <option value="cashplus">Cash Plus</option>
                <option value="wafacash">Wafa Cash</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* 6. Status filter */}
          <div className="flex flex-col gap-1.5 min-w-[120px]">
            <label className="text-[11px] text-slate-550 font-bold">حالة الطلب</label>
            <div className="relative">
              <select 
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-xs font-bold text-slate-650 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">كل الحالات</option>
                <option value="review">قيد المراجعة</option>
                <option value="processing">قيد المعالجة</option>
                <option value="paid">تم الدفع</option>
                <option value="rejected">مرفوضة</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* 7. Date picker: إلى تاريخ */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-550 font-bold">إلى تاريخ</label>
            <div className="relative">
              <input 
                type="date" 
                value={dateTo} 
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer text-slate-700 font-bold h-[38px]"
              />
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 right-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 8. Date picker: من تاريخ */}
          <div className="flex flex-col gap-1.5 min-w-[130px]">
            <label className="text-[11px] text-slate-550 font-bold">من تاريخ</label>
            <div className="relative">
              <input 
                type="date" 
                value={dateFrom} 
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer text-slate-700 font-bold h-[38px]"
              />
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 right-2.5 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Left Side: Export actions stacked vertically (rendered on Left in RTL) */}
        <div className="flex flex-col gap-2 shrink-0 justify-end pt-5 xl:pt-0">
          <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-emerald-500 hover:bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>تصدير Excel</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-red-500 hover:bg-red-50 text-red-600 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap">
            <FileDown className="w-3.5 h-3.5" />
            <span>تصدير PDF</span>
          </button>
        </div>

      </div>

      {/* Main Grid Layout: Request Detail Card is on the RIGHT (comes first in HTML),
          Requests Table is on the LEFT (comes second in HTML) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Right Column: Sticky Request Detail Panel (spans 1 col, renders on right in RTL) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5 lg:col-span-1">
          
          {/* Card Header Title */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0054A6]"></span>
              <h3 className="font-extrabold text-slate-800 text-sm">تفاصيل الطلب</h3>
            </div>
            <span className="text-[10px] font-black text-[#0054A6] bg-blue-550/10 px-2 py-0.5 rounded-lg tracking-wide">
              {selectedRequest?.id}
            </span>
          </div>

          {selectedRequest ? (
            <div className="space-y-4 text-xs font-semibold text-slate-650">
              
              {/* Information Rows matching layout columns order */}
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[10px] text-slate-400 font-extrabold">رقم الطلب</span>
                  <span className="text-slate-800 font-bold">{selectedRequest.id}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[10px] text-slate-400 font-extrabold">اسم الشريك</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-800 font-bold">{selectedRequest.partner}</span>
                    {renderPartnerLogo(selectedRequest.partner)}
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[10px] text-slate-400 font-extrabold">البريد الإلكتروني</span>
                  <span className="text-slate-700 font-bold" dir="ltr">{selectedRequest.email}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[10px] text-slate-400 font-extrabold">رقم الهاتف</span>
                  <span className="text-slate-700 font-bold" dir="ltr">{selectedRequest.phone}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[10px] text-slate-400 font-extrabold">الرصيد المتاح</span>
                  <span className="text-[#059669] font-black" dir="ltr">{selectedRequest.availableBalance}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[10px] text-slate-400 font-extrabold">مبلغ السحب</span>
                  <span className="text-[#0054A6] font-black text-sm" dir="ltr">{selectedRequest.amount}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[10px] text-slate-400 font-extrabold">طريقة السحب</span>
                  <span className="text-slate-700 font-bold">{selectedRequest.method}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[10px] text-slate-400 font-extrabold">اسم صاحب الحساب</span>
                  <span className="text-slate-700 font-bold">{selectedRequest.accountName}</span>
                </div>
                
                {/* Bank / RIB detail card */}
                <div className="py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[9px] text-slate-400 font-extrabold block">رقم الحساب / RIB / تفاصيل الدفع</span>
                  <span className="text-[10px] text-slate-750 font-black tracking-wide block text-left" dir="ltr">
                    {selectedRequest.accountNumber}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[10px] text-slate-400 font-extrabold">تاريخ الطلب</span>
                  <span className="text-slate-500 font-bold" dir="ltr">{selectedRequest.date}</span>
                </div>

                {/* Partner notes */}
                {selectedRequest.partnerNotes && (
                  <div className="py-2 px-3 bg-blue-50/40 border border-blue-100/50 rounded-xl text-[10px] text-right">
                    <span className="font-extrabold text-blue-700 block mb-0.5">ملاحظات الشريك:</span>
                    <p className="text-slate-650 leading-relaxed font-medium">{selectedRequest.partnerNotes}</p>
                  </div>
                )}

                {/* Admin notes edit form */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[10px] text-slate-400 font-extrabold block">ملاحظات الإدارة</label>
                  <textarea
                    rows={2}
                    value={adminNoteInput}
                    onChange={(e) => setAdminNoteInput(e.target.value)}
                    placeholder="اكتب ملاحظات الإدارة هنا..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] focus:ring-1 focus:ring-[#0054A6] outline-none transition-all text-slate-700 font-medium leading-relaxed resize-none"
                  />
                </div>

              </div>

              {/* Status Action Buttons (Stacked Vertically) */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                
                {/* 1. قبول الطلب */}
                <button 
                  onClick={() => handleUpdateStatus(selectedRequest.id, "قيد المعالجة", "processing")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#10B981] hover:bg-[#0D9488] text-white font-bold rounded-xl transition-all shadow-xs cursor-pointer text-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>قبول الطلب</span>
                </button>

                {/* 2. تأكيد الدفع */}
                <button 
                  onClick={() => handleUpdateStatus(selectedRequest.id, "تم الدفع", "paid")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0054A6] hover:bg-[#003B75] text-white font-bold rounded-xl transition-all shadow-xs cursor-pointer text-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد الدفع</span>
                </button>

                {/* 3. رفض الطلب */}
                <button 
                  onClick={() => handleUpdateStatus(selectedRequest.id, "مرفوض", "rejected")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-600 hover:bg-rose-750 text-white font-bold rounded-xl transition-all shadow-xs cursor-pointer text-xs"
                >
                  <X className="w-4 h-4" />
                  <span>رفض الطلب</span>
                </button>

                {/* 4. إضافة ملاحظة */}
                <button 
                  onClick={handleSaveNotes}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all cursor-pointer text-xs"
                >
                  <MessageSquarePlus className="w-4 h-4 text-slate-450" />
                  <span>إضافة ملاحظة</span>
                </button>

              </div>

              {/* Status Notice Indicator */}
              <div className="pt-2 text-center flex items-center justify-center gap-1.5 bg-slate-50/50 py-1.5 rounded-xl border border-slate-100">
                <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[9px] text-slate-400 font-bold">
                  حالة الطلب الحالية:
                </span>
                <span className="text-[9px] font-black text-slate-700">
                  {selectedRequest.status}
                </span>
              </div>

            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 font-bold">
              الرجاء تحديد طلب سحب لعرض التفاصيل.
            </div>
          )}

        </div>

        {/* Left Column: Wide Requests Table (spans 2 cols, renders on left in RTL) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden flex flex-col">
          
          {/* Status filter tabs (flows Right-to-Left in RTL) */}
          <div className="flex border-b border-slate-100 overflow-x-auto bg-slate-50/30">
            <button 
              onClick={() => setActiveTab("all")}
              className={`px-5 py-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === "all" ? "border-[#0054A6] text-[#0054A6] bg-white font-extrabold" : "border-transparent text-slate-400 hover:text-slate-650"
              }`}
            >
              الكل (65)
            </button>
            <button 
              onClick={() => setActiveTab("review")}
              className={`px-5 py-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === "review" ? "border-amber-500 text-amber-600 bg-white font-extrabold" : "border-transparent text-slate-400 hover:text-slate-650"
              }`}
            >
              قيد المراجعة (18)
            </button>
            <button 
              onClick={() => setActiveTab("processing")}
              className={`px-5 py-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === "processing" ? "border-blue-500 text-blue-600 bg-white font-extrabold" : "border-transparent text-slate-400 hover:text-slate-650"
              }`}
            >
              قيد المعالجة (12)
            </button>
            <button 
              onClick={() => setActiveTab("paid")}
              className={`px-5 py-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === "paid" ? "border-emerald-500 text-emerald-600 bg-white font-extrabold" : "border-transparent text-slate-400 hover:text-slate-650"
              }`}
            >
              تم الدفع (95)
            </button>
            <button 
              onClick={() => setActiveTab("rejected")}
              className={`px-5 py-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === "rejected" ? "border-rose-500 text-rose-600 bg-white font-extrabold" : "border-transparent text-slate-400 hover:text-slate-650"
              }`}
            >
              مرفوضة (6)
            </button>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-xs text-right text-slate-600">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 font-bold border-b border-slate-100">
                  <th className="py-4 pr-6 text-right">رقم الطلب</th>
                  <th className="py-4 text-right">الشريك</th>
                  <th className="py-4 text-right">المبلغ</th>
                  <th className="py-4 text-right">طريقة السحب</th>
                  <th className="py-4 text-right">الرسوم</th>
                  <th className="py-4 text-right">المبلغ المستلم</th>
                  <th className="py-4 text-right">الحالة</th>
                  <th className="py-4 text-right">تاريخ الطلب</th>
                  <th className="py-4 pl-6 text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => {
                    const isSelected = req.id === selectedId;
                    
                    // Render status pill styling dynamically
                    let badgeColor = "bg-slate-100 text-slate-500 border-slate-200";
                    if (req.statusKey === "review") badgeColor = "bg-amber-50 text-amber-600 border-amber-100";
                    else if (req.statusKey === "processing") badgeColor = "bg-blue-50 text-blue-600 border-blue-100";
                    else if (req.statusKey === "paid") badgeColor = "bg-emerald-50 text-emerald-600 border-emerald-100";
                    else if (req.statusKey === "rejected") badgeColor = "bg-rose-50 text-rose-600 border-rose-100";

                    return (
                      <tr 
                        key={req.id} 
                        onClick={() => setSelectedId(req.id)}
                        className={`hover:bg-slate-50/40 transition-colors cursor-pointer ${
                          isSelected ? "bg-slate-50/80 border-r-4 border-r-[#0054A6]" : ""
                        }`}
                      >
                        
                        {/* Request ID */}
                        <td className="py-4 pr-6 font-bold text-slate-800 text-[10px]">{req.id}</td>

                        {/* Partner Name with Stylized Logo */}
                        <td className="py-4">
                          <div className="flex items-center gap-2.5">
                            {renderPartnerLogo(req.partner)}
                            <span className="font-extrabold text-slate-700">{req.partner}</span>
                          </div>
                        </td>

                        {/* Amount Requested */}
                        <td className="py-4 text-slate-800 font-bold" dir="ltr">{req.amount}</td>

                        {/* Withdrawal channel */}
                        <td className="py-4">
                          <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/50 px-2 py-0.5 rounded-lg text-[9px] font-bold text-slate-650">
                            {req.method === "تحويل بنكي" ? (
                              <Building2 className="w-3 h-3 text-[#0054A6]" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            )}
                            {req.method}
                          </span>
                        </td>

                        {/* Fee */}
                        <td className="py-4 text-slate-400" dir="ltr">{req.fee}</td>

                        {/* Net Earning received */}
                        <td className="py-4 text-[#0054A6] font-black" dir="ltr">{req.netAmount}</td>

                        {/* Status Pills */}
                        <td className="py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${badgeColor} whitespace-nowrap`}>
                            {req.status}
                          </span>
                        </td>

                        {/* Date Requested */}
                        <td className="py-4 text-slate-450 text-[10px] whitespace-nowrap">{req.date}</td>

                        {/* Selection & Quick decision triggers */}
                        <td className="py-4 pl-6 text-left" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Details Trigger (Eye icon inside blue container) */}
                            <button 
                              onClick={() => setSelectedId(req.id)}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isSelected ? "bg-[#0054A6] text-white" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                              }`}
                              title="عرض التفاصيل"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            
                            {/* Accept/Process Trigger (Green check icon inside green container) */}
                            <button 
                              onClick={() => handleUpdateStatus(req.id, "قيد المعالجة", "processing")}
                              className="p-1.5 text-emerald-600 hover:text-white hover:bg-emerald-600 border border-emerald-100 hover:border-emerald-600 rounded-lg transition-colors cursor-pointer"
                              title="قبول ومعالجة"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>

                            {/* Reject Trigger (Red cross icon inside red container) */}
                            <button 
                              onClick={() => handleUpdateStatus(req.id, "مرفوض", "rejected")}
                              className="p-1.5 text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-100 hover:border-rose-600 rounded-lg transition-colors cursor-pointer"
                              title="رفض الطلب"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-400 font-bold">
                      لا توجد طلبات سحب أرباح تطابق فلاتر البحث الحالية.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="bg-slate-50/30 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
            <div className="flex items-center gap-2">
              <span>عرض 1 - 10 من {filteredRequests.length} طلب</span>
              <div className="relative">
                <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-6 pr-3 py-1 font-bold text-slate-600 outline-none cursor-pointer">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none" />
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
              <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors">7</button>
              <button className="p-1 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
