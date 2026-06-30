"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Wallet, 
  Clock, 
  BarChart3, 
  CircleDollarSign,
  Landmark,
  Check,
  User,
  Phone,
  CreditCard,
  Building,
  ChevronDown,
  Send,
  X,
  ArrowDownUp,
  FileText,
  List,
  Percent,
  Calendar,
  Globe,
  Plus,
  CheckCircle
} from "lucide-react";

// Custom country flag SVG components for crisp cross-platform rendering (including Windows!)
const UkFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 50 30">
    <rect width="50" height="30" fill="#012169" />
    <path d="M 0,0 L 50,30 M 0,30 L 50,0" stroke="#FFFFFF" strokeWidth="6" />
    <path d="M 0,0 L 50,30 M 0,30 L 50,0" stroke="#C8102E" strokeWidth="4" />
    <path d="M 25,0 L 25,30 M 0,15 L 50,15" stroke="#FFFFFF" strokeWidth="10" />
    <path d="M 25,0 L 25,30 M 0,15 L 50,15" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const CanadaFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 240 120">
    <rect width="60" height="120" fill="#D80027" />
    <rect x="60" width="120" height="120" fill="#FFFFFF" />
    <rect x="180" width="60" height="120" fill="#D80027" />
    <path d="M 120,32 L 123,43 L 131,39 L 128,48 L 137,49 L 128,55 L 132,66 L 123,61 L 122,85 L 118,85 L 117,61 L 108,66 L 112,55 L 103,49 L 112,48 L 109,39 L 117,43 Z" fill="#D80027" />
  </svg>
);

const UsaFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 76 40">
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
);

const DenmarkFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 37 28">
    <rect width="37" height="28" fill="#C8102E" />
    <rect x="12" width="4" height="28" fill="#FFFFFF" />
    <rect y="12" width="37" height="4" fill="#FFFFFF" />
  </svg>
);

const AustraliaFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 80 40">
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
);

const getCountryFlag = (countryName: string) => {
  if (countryName.includes("المملكة المتحدة") || countryName.includes("بريطانيا") || countryName.includes("UK") || countryName.includes("Uk")) return <UkFlag />;
  if (countryName.includes("كندا")) return <CanadaFlag />;
  if (countryName.includes("الولايات المتحدة") || countryName.includes("أمريكا") || countryName.includes("USA") || countryName.includes("Usa")) return <UsaFlag />;
  if (countryName.includes("الدنمارك")) return <DenmarkFlag />;
  if (countryName.includes("أستراليا")) return <AustraliaFlag />;
  return <UsaFlag />;
};

// Brand Logo Components
const WafacashLogo = ({ size = 24 }: { size?: number }) => (
  <div className="flex items-center justify-center shrink-0">
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="wafacashCircleComm">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
      <g clipPath="url(#wafacashCircleComm)">
        {/* Right yellow half */}
        <rect x="50" y="0" width="50" height="100" fill="#FFF200" />
        {/* Left grey half */}
        <rect x="0" y="0" width="50" height="100" fill="#C2C8CD" />
        {/* Black Chevron dividing them */}
        <path d="M33.3 0L72.5 50L33.3 100H46.5L85.7 50L46.5 0H33.3Z" fill="#1A1718" />
        {/* Black square in the left half */}
        <rect x="26" y="44" width="12" height="12" fill="#1A1718" />
      </g>
    </svg>
  </div>
);

const CashPlusLogo = ({ size = 28 }: { size?: number }) => (
  <div className="flex items-center justify-center shrink-0">
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="cashplusCircleComm">
        <circle cx="50" cy="50" r="48" />
      </clipPath>
      <circle cx="50" cy="50" r="48" fill="#00979C" stroke="#FFFFFF" strokeWidth="2" />
      <g clipPath="url(#cashplusCircleComm)">
        {/* Orange/yellow gradient curve at the bottom */}
        <path d="M0 65C12 85 32 96 56 96C75 96 90 85 96 65C82 78 62 84 42 82C22 80 10 72 0 65Z" fill="#F9A01B" />
        
        {/* White loop and arrow */}
        <path d="M18 56C17 40 28 29 42 27C48 26 55 28 59 30L55 33L71 34L67 18L63 22C57 19 49 17 40 18C22 20 8 35 9 53C10 71 23 79 39 80" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" fill="none" />
        
        {/* White loop on the right */}
        <path d="M52 81C60 80 64 76 67 70C72 58 83 49 91 49C96 49 97 54 93 60C88 68 79 76 71 79C65 81 58 82 52 81Z" fill="#FFFFFF" />
      </g>
    </svg>
  </div>
);

export default function CommissionsPage() {
  const { 
    partner,
    bankInfo,
    currentBalance, 
    pendingCommissions,
    withdrawals, 
    requestWithdrawal,
    clients
  } = useApp();

  // Form State for Withdrawal Request
  const [selectedMethod, setSelectedMethod] = useState("تحويل بنكي");
  const [amount, setAmount] = useState("500");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [rib, setRib] = useState("");
  const [bank, setBank] = useState("");
  const [cin, setCin] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // UI state
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [statusFilterOpen, setStatusFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [lineFilterOpen, setLineFilterOpen] = useState(false);
  const [showAllCommissions, setShowAllCommissions] = useState(false);

  // Pre-populate fields from context
  useEffect(() => {
    if (partner) {
      setFullName(partner.name || "");
      setPhone(partner.phone || "");
    }
    if (bankInfo) {
      setRib(bankInfo.rib || "");
      setBank(bankInfo.bankName || "");
    }
  }, [partner, bankInfo]);

  // Financial calculations from database values
  const pendingWithdrawalSum = withdrawals
    .filter(w => w.status === "قيد المراجعة")
    .reduce((sum, w) => sum + w.amount, 0);

  const pendingBalance = pendingWithdrawalSum + pendingCommissions;

  const paidBalance = withdrawals
    .filter(w => w.status === "تم التحويل" || w.status === "تم الدفع")
    .reduce((sum, w) => sum + w.amount, 0);

  const availableBalance = currentBalance;
  const totalProfits = availableBalance + pendingBalance + paidBalance;

  // Dynamic RLS & Postgres optimized helper variables
  const totalCompletedFiles = clients.filter(c => c.status === "تم الإنجاز").length;

  const paidSum = paidBalance;
  const pendingSum = pendingBalance;
  const availableSum = availableBalance;
  const cancelledSum = clients
    .filter(c => c.status === "ملغى")
    .reduce((sum, c) => sum + c.commission, 0);

  const totalSum = paidSum + pendingSum + availableSum + cancelledSum;
  const totalSumDivisor = totalSum || 1;

  const pctPaid = ((paidSum / totalSumDivisor) * 100).toFixed(1);
  const pctPending = ((pendingSum / totalSumDivisor) * 100).toFixed(1);
  const pctAvailable = ((availableSum / totalSumDivisor) * 100).toFixed(1);
  const pctCancelled = ((cancelledSum / totalSumDivisor) * 100).toFixed(1);

  const lenPaid = (paidSum / totalSumDivisor) * 219.9;
  const lenPending = (pendingSum / totalSumDivisor) * 219.9;
  const lenAvailable = (availableSum / totalSumDivisor) * 219.9;
  const lenCancelled = (cancelledSum / totalSumDivisor) * 219.9;

  const offsetPaid = 0;
  const offsetPending = -lenPaid;
  const offsetAvailable = -(lenPaid + lenPending);
  const offsetCancelled = -(lenPaid + lenPending + lenAvailable);

  // Line Chart monthly data
  const getMonthlyCommission = (monthsAgo: number) => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() - monthsAgo);
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();

    return clients
      .filter(c => {
        if (c.status === "ملغى") return false;
        const d = new Date(c.date);
        return d.getFullYear() === targetYear && d.getMonth() === targetMonth;
      })
      .reduce((sum, c) => sum + c.commission, 0);
  };

  const last6MonthsData = [
    getMonthlyCommission(5),
    getMonthlyCommission(4),
    getMonthlyCommission(3),
    getMonthlyCommission(2),
    getMonthlyCommission(1),
    getMonthlyCommission(0)
  ];

  const maxVal = Math.max(...last6MonthsData, 500);
  const getY = (val: number) => 110 - (val / maxVal) * 90;

  const y0 = getY(last6MonthsData[0]);
  const y1 = getY(last6MonthsData[1]);
  const y2 = getY(last6MonthsData[2]);
  const y3 = getY(last6MonthsData[3]);
  const y4 = getY(last6MonthsData[4]);
  const y5 = getY(last6MonthsData[5]);

  const pathD = `M 25 ${y0} L 75 ${y1} L 125 ${y2} L 175 ${y3} L 225 ${y4} L 275 ${y5}`;
  const fillD = `${pathD} L 275 110 L 25 110 Z`;

  const getMonthLabel = (monthsAgo: number) => {
    const d = new Date();
    d.setMonth(d.getMonth() - monthsAgo);
    return d.toLocaleDateString("ar-EG", { month: "long" });
  };

  // Commission status mapping for client files
  const completedClients = clients
    .filter(c => c.status === "تم الإنجاز")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let currentPaidSum = 0;
  let currentPendingSum = 0;

  const commissionStatuses = new Map<string, "مدفوعة" | "قيد المراجعة" | "متاحة للسحب" | "ملغاة" | "قيد الانتظار">();

  completedClients.forEach(client => {
    const comm = client.commission || 500;
    if (currentPaidSum + comm <= paidBalance) {
      commissionStatuses.set(client.dbId, "مدفوعة");
      currentPaidSum += comm;
    } else if (currentPaidSum + currentPendingSum + comm <= paidBalance + pendingBalance) {
      commissionStatuses.set(client.dbId, "قيد المراجعة");
      currentPendingSum += comm;
    } else {
      commissionStatuses.set(client.dbId, "متاحة للسحب");
    }
  });

  clients.forEach(client => {
    if (client.status === "ملغى") {
      commissionStatuses.set(client.dbId, "ملغاة");
    } else if (client.status !== "تم الإنجاز") {
      commissionStatuses.set(client.dbId, "قيد الانتظار");
    }
  });

  const filteredStatementClients = clients.filter(c => {
    const status = commissionStatuses.get(c.dbId);
    if (statusFilter === "الكل") return true;
    if (statusFilter === "مدفوعة") return status === "مدفوعة";
    if (statusFilter === "متاحة") return status === "متاحة للسحب";
    if (statusFilter === "مراجعة") return status === "قيد المراجعة";
    return true;
  });

  const sortedStatementClients = [...filteredStatementClients].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const displayedCommissions = showAllCommissions 
    ? sortedStatementClients 
    : sortedStatementClients.slice(0, 5);

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const val = Number(amount);
    if (!amount || isNaN(val) || val <= 0) {
      setError("الرجاء إدخال مبلغ صحيح أكبر من الصفر.");
      return;
    }

    if (val < 500) {
      setError("عذراً، الحد الأدنى لطلب السحب هو 500 درهم.");
      return;
    }

    if (val > currentBalance) {
      setError("عذراً، المبلغ المطلوب أكبر من رصيدك المتاح للسحب.");
      return;
    }

    if (!fullName.trim() || !phone.trim()) {
      setError("الرجاء إدخال الاسم الكامل ورقم الهاتف.");
      return;
    }

    if (selectedMethod === "تحويل بنكي") {
      if (!rib.trim() || rib.length < 10) {
        setError("الرجاء إدخال رقم حساب بنكي (RIB) صحيح.");
        return;
      }
      if (!bank.trim()) {
        setError("الرجاء اختيار البنك.");
        return;
      }
    } else {
      if (!cin.trim()) {
        setError("الرجاء إدخال رقم البطاقة الوطنية (CIN).");
        return;
      }
    }

    setLoading(true);

    setTimeout(async () => {
      const detailsText = selectedMethod === "تحويل بنكي" 
        ? `${selectedMethod} - ${bank}` 
        : `${selectedMethod} (CIN: ${cin})`;

      try {
        const res = await requestWithdrawal(val, detailsText);
        setLoading(false);
        
        if (res.success) {
          setSuccess("تم إرسال طلب السحب بنجاح وهو قيد المراجعة.");
          setAmount("500");
          if (selectedMethod !== "تحويل بنكي") {
            setCin("");
          }
          setTimeout(() => {
            setSuccess("");
            setWithdrawModalOpen(false);
          }, 1800);
        } else {
          setError(res.message);
        }
      } catch (err: any) {
        setLoading(false);
        setError("حدث خطأ أثناء معالجة الطلب.");
      }
    }, 800);
  };

  return (
    <div className="space-y-6 font-sans text-right pb-12" dir="rtl">
      
      {/* Top Breadcrumb & Page Header */}
      <div className="space-y-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-start gap-1 text-[10px] text-slate-400 font-bold">
          <Globe className="w-3.5 h-3.5" />
          <span>الرئيسية</span>
          <span className="text-slate-300 mx-1">/</span>
          <span className="text-blue-600">الأرباح والعمولات</span>
        </div>

        {/* Header Block */}
        <div className="flex items-center justify-start gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0 border border-purple-100 shadow-xs">
            <CircleDollarSign className="w-6 h-6" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black text-slate-800">الأرباح والعمولات</h1>
            <p className="text-slate-400 text-xs font-semibold">عرض تفاصيل أرباحك وعمولاتك</p>
          </div>
        </div>

      </div>

      {/* Metrics Row (4 Cards in precise mockup layout order) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 (Rightmost): إجمالي الأرباح */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1 text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">إجمالي الأرباح</span>
            <span className="text-2xl font-black text-purple-600 block leading-tight" dir="ltr">
              {totalProfits.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-bold text-purple-600/80">DH</span>
            </span>
            <span className="text-[9px] text-slate-400 font-bold block">من جميع الملفات</span>
          </div>
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0 border border-purple-100/50">
            <BarChart3 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: الأرباح المتاحة للسحب */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1 text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">الأرباح المتاحة للسحب</span>
            <span className="text-2xl font-black text-blue-600 block leading-tight" dir="ltr">
              {availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-bold text-blue-600/80">DH</span>
            </span>
            <span className="text-[9px] text-slate-400 font-bold block">جاهز للسحب الآن</span>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-100/50">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: الأرباح قيد المراجعة */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1 text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">الأرباح قيد المراجعة</span>
            <span className="text-2xl font-black text-amber-500 block leading-tight" dir="ltr">
              {pendingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-bold text-amber-600/80">DH</span>
            </span>
            <span className="text-[9px] text-slate-400 font-bold block">قيد المراجعة من الإدارة</span>
          </div>
          <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center shrink-0 border border-amber-100/50">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4 (Leftmost): الأرباح المدفوعة */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1 text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">الأرباح المدفوعة</span>
            <span className="text-2xl font-black text-[#10B981] block leading-tight" dir="ltr">
              {paidBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-bold text-emerald-600/80">DH</span>
            </span>
            <span className="text-[9px] text-slate-400 font-bold block">إجمالي ما تم دفع لك</span>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100/50">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Middle Row Section (Swapped Column Order: Info on the Right, Charts on the Left) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. RIGHT SIDEBAR BLOCK: Commission Info (spans 1 on desktop, renders right in RTL) */}
        <div className="lg:col-span-1">
          
          {/* Card: Commission Info */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5">
            <h3 className="font-extrabold text-slate-800 text-sm pb-1 border-b border-slate-50">معلومات العمولة</h3>
            
            <div className="space-y-4">
              
              {/* Row 1 (Icon on the right, Text in the middle, Value LTR on the left) */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">سعر الخدمة للملف</span>
                </div>
                <span className="text-xs font-black text-slate-700" dir="ltr">3,000.00 DH</span>
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <Wallet className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">عمولة الشريك لكل مكتمل</span>
                </div>
                <span className="text-xs font-black text-slate-700" dir="ltr">500.00 DH</span>
              </div>

              {/* Row 3 */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <Percent className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">نسبة العمولة</span>
                </div>
                <span className="text-xs font-black text-slate-700">16.67%</span>
              </div>

            </div>

            {/* Blue Withdraw Button triggering form modal */}
            <div className="pt-2">
              <button 
                onClick={() => setWithdrawModalOpen(true)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition-all shadow-sm shadow-blue-600/10"
              >
                <Wallet className="w-4 h-4" />
                <span>سحب الأرباح</span>
              </button>
            </div>

          </div>

        </div>

        {/* 2. LEFT MAIN BLOCK: Charts (spans 2 on desktop, renders left in RTL) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Chart 2 (Middle of screen): Doughnut Chart "توزيع العمولات حسب الحالة" */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4 flex flex-col justify-between">
            <h3 className="font-extrabold text-slate-800 text-sm">توزيع العمولات حسب الحالة</h3>

            <div className="flex items-center justify-between gap-4 py-1">
              
              {/* Legend on right */}
              <div className="flex-1 space-y-2 text-right">
                <div className="flex items-center justify-between text-[9px] font-bold">
                  <span className="text-slate-400 font-medium">{paidBalance.toLocaleString()} DH ({pctPaid}%)</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">مدفوعة</span>
                    <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0"></span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[9px] font-bold">
                  <span className="text-slate-400 font-medium">{pendingBalance.toLocaleString()} DH ({pctPending}%)</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">قيد المراجعة</span>
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[9px] font-bold">
                  <span className="text-slate-400 font-medium">{availableBalance.toLocaleString()} DH ({pctAvailable}%)</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">متاحة للسحب</span>
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[9px] font-bold">
                  <span className="text-slate-400 font-medium">{cancelledSum.toLocaleString()} DH ({pctCancelled}%)</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">ملغاة</span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0"></span>
                  </div>
                </div>
              </div>

              {/* Doughnut SVG */}
              <div className="w-32 h-32 flex items-center justify-center shrink-0 relative">
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none mt-1">
                  <span className="text-xl font-black text-slate-800 leading-none">{totalCompletedFiles}</span>
                  <span className="text-[7px] text-slate-400 font-bold block mt-1">ملف مكتمل</span>
                </div>

                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {/* Segment 1: Green (مدفوعة) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="11"
                    strokeDasharray={`${lenPaid} 219.9`}
                    strokeDashoffset={offsetPaid}
                  />
                  {/* Segment 2: Yellow (قيد المراجعة) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="#F59E0B"
                    strokeWidth="11"
                    strokeDasharray={`${lenPending} 219.9`}
                    strokeDashoffset={offsetPending}
                  />
                  {/* Segment 3: Blue (متاحة للسحب) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="#3B82F6"
                    strokeWidth="11"
                    strokeDasharray={`${lenAvailable} 219.9`}
                    strokeDashoffset={offsetAvailable}
                  />
                  {/* Segment 4: Grey (ملغاة) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="#94A3B8"
                    strokeWidth="11"
                    strokeDasharray={`${lenCancelled} 219.9`}
                    strokeDashoffset={offsetCancelled}
                  />
                </svg>
              </div>

            </div>
          </div>

          {/* Chart 1 (Leftmost edge): Line Chart "الأرباح الأشهر" */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-800 text-sm">الأرباح الأشهر</h3>
              
              <div className="relative z-10">
                <button 
                  onClick={() => setLineFilterOpen(!lineFilterOpen)}
                  className="flex items-center gap-1 bg-slate-50 border border-slate-200/60 rounded-xl px-2.5 py-1 text-slate-500 text-[10px] font-bold"
                >
                  <span>آخر 6 أشهر</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {lineFilterOpen && (
                  <div className="absolute left-0 mt-2 w-32 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-30 text-right">
                    <button onClick={() => setLineFilterOpen(false)} className="w-full text-right px-3 py-1.5 text-[10px] font-bold hover:bg-slate-50 text-slate-700">آخر 6 أشهر</button>
                    <button onClick={() => setLineFilterOpen(false)} className="w-full text-right px-3 py-1.5 text-[10px] font-bold hover:bg-slate-50 text-slate-700">آخر سنة</button>
                  </div>
                )}
              </div>
            </div>

            {/* Line SVG Chart (Low on left, climbs to right) */}
            <div className="py-2">
              <svg viewBox="0 0 300 130" width="100%" className="w-full h-32 overflow-visible">
                <defs>
                  <linearGradient id="purple-grad-fill-2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"/>
                  </linearGradient>
                </defs>

                {/* Horizontal grids */}
                <line x1="0" y1="10" x2="280" y2="10" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="30" x2="280" y2="30" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="50" x2="280" y2="50" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="70" x2="280" y2="70" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="90" x2="280" y2="90" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="110" x2="280" y2="110" stroke="#F1F5F9" strokeWidth="1" />

                {/* Vertical labels */}
                <text x="25" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">{getMonthLabel(5)}</text>
                <text x="75" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">{getMonthLabel(4)}</text>
                <text x="125" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">{getMonthLabel(3)}</text>
                <text x="175" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">{getMonthLabel(2)}</text>
                <text x="225" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">{getMonthLabel(1)}</text>
                <text x="275" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">{getMonthLabel(0)}</text>

                {/* Left labels */}
                <text x="295" y="113" textAnchor="end" className="text-[7px] fill-slate-350 font-bold">0</text>
                <text x="295" y="93" textAnchor="end" className="text-[7px] fill-slate-350 font-bold">{Math.round(maxVal * 0.17)}</text>
                <text x="295" y="73" textAnchor="end" className="text-[7px] fill-slate-350 font-bold">{Math.round(maxVal * 0.33)}</text>
                <text x="295" y="53" textAnchor="end" className="text-[7px] fill-slate-350 font-bold">{Math.round(maxVal * 0.5)}</text>
                <text x="295" y="33" textAnchor="end" className="text-[7px] fill-slate-350 font-bold">{Math.round(maxVal * 0.67)}</text>
                <text x="295" y="13" textAnchor="end" className="text-[7px] fill-slate-350 font-bold">{Math.round(maxVal * 0.83)}</text>
                <text x="295" y="3" textAnchor="end" className="text-[7px] fill-slate-350 font-bold">{maxVal}</text>

                {/* Gradient area */}
                <path d={fillD} fill="url(#purple-grad-fill-2)" />

                {/* Stroke curve */}
                <path d={pathD} fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />

                {/* Dots */}
                <circle cx="25" cy={y0} r="3.5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
                <circle cx="75" cy={y1} r="3.5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
                <circle cx="125" cy={y2} r="3.5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
                <circle cx="175" cy={y3} r="3.5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
                <circle cx="225" cy={y4} r="3.5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
                <circle cx="275" cy={y5} r="3.5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Legend at bottom */}
            <div className="flex justify-center items-center gap-1.5 text-[8px] text-slate-400 font-bold pt-2 border-t border-slate-50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></span>
              <span>الأرباح (DH)</span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Row Card: Commissions Statement ("كشف العمولات") */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-50">
          <h3 className="font-extrabold text-slate-800 text-sm">كشف العمولات</h3>
          
          {/* Status Dropdown */}
          <div className="relative z-10">
            <button 
              onClick={() => setStatusFilterOpen(!statusFilterOpen)}
              className="flex items-center gap-1 bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-1.5 text-slate-500 text-[10px] font-bold"
            >
              <span>جميع الحالات</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
            </button>
            {statusFilterOpen && (
              <div className="absolute left-0 mt-2 w-32 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 z-30 text-right">
                <button onClick={() => { setStatusFilter("الكل"); setStatusFilterOpen(false); }} className="w-full text-right px-3.5 py-1.5 text-[10px] font-bold hover:bg-slate-50 text-slate-700">الكل</button>
                <button onClick={() => { setStatusFilter("مدفوعة"); setStatusFilterOpen(false); }} className="w-full text-right px-3.5 py-1.5 text-[10px] font-bold hover:bg-slate-50 text-slate-700">مدفوعة</button>
                <button onClick={() => { setStatusFilter("متاحة"); setStatusFilterOpen(false); }} className="w-full text-right px-3.5 py-1.5 text-[10px] font-bold hover:bg-slate-50 text-slate-700">متاحة للسحب</button>
                <button onClick={() => { setStatusFilter("مراجعة"); setStatusFilterOpen(false); }} className="w-full text-right px-3.5 py-1.5 text-[10px] font-bold hover:bg-slate-50 text-slate-700">قيد المراجعة</button>
              </div>
            )}
          </div>
        </div>

        {/* statement table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
          <table className="w-full text-xs text-right text-slate-600 border-collapse">
            <thead className="text-[10px] text-slate-500 font-extrabold bg-slate-50/75 border-b border-slate-200">
              <tr>
                <th className="border-l border-slate-200 py-3 px-4 text-center whitespace-nowrap">رقم الملف</th>
                <th className="border-l border-slate-200 py-3 px-4 text-right pr-6 whitespace-nowrap">اسم العميل</th>
                <th className="border-l border-slate-200 py-3 px-4 text-center whitespace-nowrap">الدولة</th>
                <th className="border-l border-slate-200 py-3 px-4 text-center whitespace-nowrap">تاريخ الإكمال</th>
                <th className="border-l border-slate-200 py-3 px-4 text-center whitespace-nowrap">قيمة العمولة</th>
                <th className="border-l border-slate-200 py-3 px-4 text-center whitespace-nowrap">الحالة</th>
                <th className="py-3 px-4 text-center whitespace-nowrap">تاريخ الإضافة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {displayedCommissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-bold">
                    لا توجد عمولات متوفرة حالياً.
                  </td>
                </tr>
              ) : (
                displayedCommissions.map((client) => {
                  const commStatus = commissionStatuses.get(client.dbId);
                  let badgeClass = "bg-slate-100 text-slate-500 border-slate-200";
                  if (commStatus === "مدفوعة") badgeClass = "bg-green-50 text-green-600 border-green-100";
                  else if (commStatus === "متاحة للسحب") badgeClass = "bg-blue-50 text-blue-600 border-blue-100";
                  else if (commStatus === "قيد المراجعة") badgeClass = "bg-amber-50 text-amber-600 border-amber-100";
                  else if (commStatus === "ملغاة") badgeClass = "bg-red-50 text-red-600 border-red-100";

                  return (
                    <tr key={client.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="border-l border-slate-200 py-3.5 px-4 text-center font-bold text-slate-800 text-[10px]">{client.id}</td>
                      <td className="border-l border-slate-200 py-3.5 px-4 text-right pr-6 font-semibold text-slate-700">{client.name}</td>
                      <td className="border-l border-slate-200 py-3.5 px-4 text-center font-bold text-slate-700">
                        <div className="flex items-center gap-1.5 justify-center">
                          <span>{client.country}</span>
                          {getCountryFlag(client.country)}
                        </div>
                      </td>
                      <td className="border-l border-slate-200 py-3.5 px-4 text-center text-slate-400 font-bold">{client.status === "تم الإنجاز" ? client.date : "-"}</td>
                      <td className="border-l border-slate-200 py-3.5 px-4 text-center font-black text-slate-800" dir="ltr">{(client.commission || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })} DH</td>
                      <td className="border-l border-slate-200 py-3.5 px-4 text-center">
                        <div className="flex justify-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border ${badgeClass}`}>
                            {commStatus || "قيد الانتظار"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-400 font-semibold">{client.date}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* View more btn */}
        {sortedStatementClients.length > 5 && (
          <div className="pt-2 flex justify-center">
            <button 
              onClick={() => setShowAllCommissions(!showAllCommissions)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl text-[10px] font-extrabold transition-all shadow-xs"
            >
              <span>{showAllCommissions ? "عرض أقل" : "عرض المزيد"}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showAllCommissions ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}

      </div>

      {/* ==================== WITHDRAWAL REQUEST FORM MODAL ==================== */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setWithdrawModalOpen(false)}></div>
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full relative z-10 space-y-5 border border-slate-100 shadow-xl text-right overflow-y-auto max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <button onClick={() => setWithdrawModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50">
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <Wallet className="w-4 h-4 text-blue-500" />
                <span>طلب سحب جديد</span>
              </h3>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 text-center font-bold">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-600 text-xs p-3 rounded-xl border border-green-100 text-center font-bold">
                {success}
              </div>
            )}

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              
              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 block text-right">طريقة السحب</label>
                <div className="grid grid-cols-3 gap-3">
                  
                  {/* Wafacash */}
                  <div 
                    onClick={() => setSelectedMethod("Wafacash")} 
                    className={`border rounded-xl p-2.5 flex flex-col items-center justify-between cursor-pointer transition-all gap-1 text-center h-16 ${
                      selectedMethod === "Wafacash" 
                        ? "border-blue-600 bg-blue-50/10 shadow-xs" 
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <WafacashLogo size={14} />
                    <span className="text-[10px] font-extrabold text-slate-700 mt-1">Wafacash</span>
                  </div>

                  {/* Cash Plus */}
                  <div 
                    onClick={() => setSelectedMethod("Cash Plus")} 
                    className={`border rounded-xl p-2.5 flex flex-col items-center justify-between cursor-pointer transition-all gap-1 text-center h-16 ${
                      selectedMethod === "Cash Plus" 
                        ? "border-blue-600 bg-blue-50/10 shadow-xs" 
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <CashPlusLogo size={20} />
                    <span className="text-[10px] font-extrabold text-slate-700 mt-1">Cash Plus</span>
                  </div>

                  {/* Bank Transfer */}
                  <div 
                    onClick={() => setSelectedMethod("تحويل بنكي")} 
                    className={`border rounded-xl p-2.5 flex flex-col items-center justify-between cursor-pointer transition-all gap-1 text-center h-16 ${
                      selectedMethod === "تحويل بنكي" 
                        ? "border-blue-600 bg-blue-50/10 shadow-xs" 
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <Landmark className="w-5 h-5 text-slate-800 shrink-0" />
                    <span className="text-[10px] font-extrabold text-slate-700 mt-1">تحويل بنكي</span>
                  </div>

                </div>
              </div>

              {/* Amount */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 block text-right">المبلغ المطلوب</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                    placeholder="500"
                    required
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-[10px]">DH</span>
                </div>
                <span className="text-[8px] text-slate-400 font-bold block text-right">الحد الأدنى للسحب هو 500 درهم</span>
              </div>

              {/* Receiver Info */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[9px] font-extrabold text-slate-400 text-right uppercase tracking-wider">معلومات الاستلام</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400">الاسم الكامل</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                        required
                      />
                      <User className="w-3.5 h-3.5 text-slate-400 absolute top-2.5 left-2.5" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400">رقم الهاتف</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                        required
                      />
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute top-2.5 left-2.5" />
                    </div>
                  </div>

                </div>

                {/* Dynamic Payment field */}
                {selectedMethod === "تحويل بنكي" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* RIB */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400">رقم الحساب البنكي (RIB)</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={rib}
                          onChange={(e) => setRib(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                          required
                        />
                        <CreditCard className="w-3.5 h-3.5 text-slate-400 absolute top-2.5 left-2.5" />
                      </div>
                    </div>

                    {/* Bank Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400">البنك</label>
                      <div className="relative">
                        <select
                          value={bank === "أخرى" || !["", "البنك الشعبي", "البنك الشعبي - الدار البيضاء", "التجاري وفا بنك", "بنك إفريقيا", "CIH Bank"].includes(bank) ? "أخرى" : bank}
                          onChange={(e) => {
                            if (e.target.value === "أخرى") {
                              setBank("أخرى");
                            } else {
                              setBank(e.target.value);
                            }
                          }}
                          className="w-full pl-8 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-700 text-right transition-colors appearance-none cursor-pointer"
                          required
                        >
                          <option value="">اختر البنك</option>
                          <option value="البنك الشعبي - الدار البيضاء">البنك الشعبي</option>
                          <option value="التجاري وفا بنك">التجاري وفا بنك</option>
                          <option value="بنك إفريقيا">بنك إفريقيا</option>
                          <option value="CIH Bank">CIH Bank</option>
                          <option value="أخرى">أخرى</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-2.5 left-2.5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Custom Bank Name Input */}
                    {(bank === "أخرى" || (bank !== "" && !["البنك الشعبي", "البنك الشعبي - الدار البيضاء", "التجاري وفا بنك", "بنك إفريقيا", "CIH Bank"].includes(bank))) && (
                      <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                        <label className="text-[10px] font-bold text-slate-400">اسم البنك الآخر</label>
                        <input
                          type="text"
                          value={bank === "أخرى" ? "" : bank}
                          onChange={(e) => setBank(e.target.value)}
                          className="w-full pl-3 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                          placeholder="أدخل اسم البنك الخاص بك"
                          required
                        />
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400">رقم البطاقة الوطنية (CIN)</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cin}
                        onChange={(e) => setCin(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                        placeholder="مثال: AB123456"
                        required
                      />
                      <CreditCard className="w-3.5 h-3.5 text-slate-400 absolute top-2.5 left-2.5" />
                    </div>
                  </div>
                )}

              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs transition-colors shadow-sm disabled:opacity-75"
              >
                {loading ? "جاري الإرسال..." : "إرسال طلب السحب"}
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
