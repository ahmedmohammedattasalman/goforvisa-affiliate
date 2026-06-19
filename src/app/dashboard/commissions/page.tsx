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
const FranceFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="1" height="2" fill="#002395" />
    <rect x="1" width="1" height="2" fill="#FFFFFF" />
    <rect x="2" width="1" height="2" fill="#ED2939" />
  </svg>
);

const SpainFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="3" height="2" fill="#C60B1E" />
    <rect y="0.5" width="3" height="1" fill="#FBE122" />
  </svg>
);

const ItalyFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="1" height="2" fill="#009246" />
    <rect x="1" width="1" height="2" fill="#F1F2F1" />
    <rect x="2" width="1" height="2" fill="#CE2B37" />
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

const GermanyFlag = () => (
  <svg className="w-5 h-3.5 rounded-sm shadow-xs border border-slate-200/60 inline-block align-middle" viewBox="0 0 3 2">
    <rect width="3" height="2" fill="#FFCF00" />
    <rect width="3" height="1.33" fill="#DD0000" />
    <rect width="3" height="0.67" fill="#000000" />
  </svg>
);

// Brand Logo Components
const WafacashLogo = ({ size = 20 }: { size?: number }) => (
  <div className="flex items-center justify-center shrink-0">
    <svg width={size * 1.5} height={size} viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4L14 12L6 20" stroke="#1E1E1E" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 4L24 12L16 20" stroke="#FFCC00" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const CashPlusLogo = ({ size = 28 }: { size?: number }) => (
  <div className="flex items-center justify-center shrink-0">
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="#0E4A8A" />
      <rect x="5.5" y="11" width="21" height="10" rx="5" fill="#39B54A" />
      <text x="16" y="18.5" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">Plus</text>
    </svg>
  </div>
);

export default function CommissionsPage() {
  const { 
    partner,
    bankInfo,
    currentBalance, 
    withdrawals, 
    requestWithdrawal 
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

  // Financial calculations adjusted to baseline mockup values dynamically
  const pendingBalance = withdrawals
    .filter(w => w.status === "قيد المراجعة")
    .reduce((sum, w) => sum + w.amount, 0);

  // Base paid is 7500 in mockup, dynamic updates will offset this
  const paidBalance = 7500 + (withdrawals
    .filter(w => w.status === "تم التحويل" || w.status === "تم الدفع")
    .reduce((sum, w) => sum + w.amount, 0) - 5000);

  const availableBalance = currentBalance;
  const totalProfits = availableBalance + pendingBalance + paidBalance;

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

    setTimeout(() => {
      const detailsText = selectedMethod === "تحويل بنكي" 
        ? `${selectedMethod} - ${bank}` 
        : `${selectedMethod} (CIN: ${cin})`;

      const res = requestWithdrawal(val, detailsText);
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
                  <span className="text-slate-400 font-medium">15 (71.4%)</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0"></span>
                    <span className="text-slate-500">مدفوعة</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[9px] font-bold">
                  <span className="text-slate-400 font-medium">3 (14.3%)</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                    <span className="text-slate-500">قيد المراجعة</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[9px] font-bold">
                  <span className="text-slate-400 font-medium">2 (9.5%)</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                    <span className="text-slate-500">متاحة للسحب</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[9px] font-bold">
                  <span className="text-slate-400 font-medium">1 (4.8%)</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0"></span>
                    <span className="text-slate-500">ملغاة</span>
                  </div>
                </div>
              </div>

              {/* Doughnut SVG */}
              <div className="w-32 h-32 flex items-center justify-center shrink-0 relative">
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none mt-1">
                  <span className="text-xl font-black text-slate-800 leading-none">21</span>
                  <span className="text-[7px] text-slate-400 font-bold block mt-1">ملف مكتمل</span>
                </div>

                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {/* Segment 1: Green (71.4%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="11"
                    strokeDasharray="157 219.9"
                    strokeDashoffset="0"
                  />
                  {/* Segment 2: Yellow (14.3%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="#F59E0B"
                    strokeWidth="11"
                    strokeDasharray="31.4 219.9"
                    strokeDashoffset="-157"
                  />
                  {/* Segment 3: Blue (9.5%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="#3B82F6"
                    strokeWidth="11"
                    strokeDasharray="20.9 219.9"
                    strokeDashoffset="-188.4"
                  />
                  {/* Segment 4: Grey (4.8%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="transparent"
                    stroke="#94A3B8"
                    strokeWidth="11"
                    strokeDasharray="10.6 219.9"
                    strokeDashoffset="-209.3"
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
                <text x="25" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">ديسمبر</text>
                <text x="75" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">نوفمبر</text>
                <text x="125" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">أكتوبر</text>
                <text x="175" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">سبتمبر</text>
                <text x="225" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">أغسطس</text>
                <text x="275" y="125" textAnchor="middle" className="text-[8px] fill-slate-400 font-bold">يوليو</text>

                {/* Left labels */}
                <text x="295" y="113" textAnchor="end" className="text-[7px] fill-slate-350 font-bold">0</text>
                <text x="295" y="93" textAnchor="end" className="text-[7px] fill-slate-350 font-bold">500</text>
                <text x="295" y="73" textAnchor="end" className="text-[7px] fill-slate-350 font-bold">1k</text>
                <text x="295" y="53" textAnchor="end" className="text-[7px] fill-slate-350 font-bold">1.5k</text>
                <text x="295" y="33" textAnchor="end" className="text-[7px] fill-slate-350 font-bold">2k</text>
                <text x="295" y="13" textAnchor="end" className="text-[7px] fill-slate-350 font-bold">2.5k</text>
                <text x="295" y="3" textAnchor="end" className="text-[7px] fill-slate-350 font-bold">3k</text>

                {/* Gradient area */}
                <path d="M 25 105 Q 50 95, 75 90 T 125 90 T 175 65 T 225 50 T 275 30 L 275 110 L 25 110 Z" fill="url(#purple-grad-fill-2)" />

                {/* Stroke curve */}
                <path d="M 25 105 Q 50 95, 75 90 T 125 90 T 175 65 T 225 50 T 275 30" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />

                {/* Dots */}
                <circle cx="25" cy="105" r="3.5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
                <circle cx="75" cy="90" r="3.5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
                <circle cx="125" cy="90" r="3.5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
                <circle cx="175" cy="65" r="3.5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
                <circle cx="225" cy="50" r="3.5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
                <circle cx="275" cy="30" r="3.5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
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
              
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="border-l border-slate-200 py-3.5 px-4 text-center font-bold text-slate-800 text-[10px]">GFV-2024-000125</td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-right pr-6 font-semibold text-slate-700">محمد علي</td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center font-bold text-slate-700">
                  <div className="flex items-center gap-1.5 justify-center">
                    <span>فرنسا</span>
                    <FranceFlag />
                  </div>
                </td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center text-slate-400 font-bold">20 مايو 2024</td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center font-black text-slate-800">
                  <span dir="ltr">500.00 DH</span>
                </td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-green-50 text-green-600 border border-green-100">
                      مدفوعة
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center text-slate-400 font-semibold">21 مايو 2024 - 10:30</td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="border-l border-slate-200 py-3.5 px-4 text-center font-bold text-slate-800 text-[10px]">GFV-2024-000124</td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-right pr-6 font-semibold text-slate-700">فاطمة الزهراء</td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center font-bold text-slate-700">
                  <div className="flex items-center gap-1.5 justify-center">
                    <span>إسبانيا</span>
                    <SpainFlag />
                  </div>
                </td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center text-slate-400 font-bold">18 مايو 2024</td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center font-black text-slate-800">
                  <span dir="ltr">500.00 DH</span>
                </td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-green-50 text-green-600 border border-green-100">
                      مدفوعة
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center text-slate-400 font-semibold">19 مايو 2024 - 09:15</td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="border-l border-slate-200 py-3.5 px-4 text-center font-bold text-slate-800 text-[10px]">GFV-2024-000123</td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-right pr-6 font-semibold text-slate-700">أحمد رضا</td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center font-bold text-slate-700">
                  <div className="flex items-center gap-1.5 justify-center">
                    <span>إيطاليا</span>
                    <ItalyFlag />
                  </div>
                </td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center text-slate-400 font-bold">16 مايو 2024</td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center font-black text-slate-800">
                  <span dir="ltr">500.00 DH</span>
                </td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-50 text-blue-600 border border-blue-100">
                      متاحة للسحب
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center text-slate-400 font-semibold">17 مايو 2024 - 14:45</td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="border-l border-slate-200 py-3.5 px-4 text-center font-bold text-slate-800 text-[10px]">GFV-2024-000122</td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-right pr-6 font-semibold text-slate-700">سارة بنت عبد الله</td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center font-bold text-slate-700">
                  <div className="flex items-center gap-1.5 justify-center">
                    <span>تركيا</span>
                    <TurkeyFlag />
                  </div>
                </td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center text-slate-400 font-bold">14 مايو 2024</td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center font-black text-slate-800">
                  <span dir="ltr">500.00 DH</span>
                </td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-50 text-amber-600 border border-amber-100">
                      قيد المراجعة
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center text-slate-400 font-semibold">11 مايو 2024 - 11:20</td>
              </tr>

              {/* Row 5 */}
              <tr className="hover:bg-slate-50/40 transition-colors">
                <td className="border-l border-slate-200 py-3.5 px-4 text-center font-bold text-slate-800 text-[10px]">GFV-2024-000121</td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-right pr-6 font-semibold text-slate-700">يوسف بلال</td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center font-bold text-slate-700">
                  <div className="flex items-center gap-1.5 justify-center">
                    <span>ألمانيا</span>
                    <GermanyFlag />
                  </div>
                </td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center text-slate-400 font-bold">10 مايو 2024</td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center font-black text-slate-800">
                  <span dir="ltr">500.00 DH</span>
                </td>
                <td className="border-l border-slate-200 py-3.5 px-4 text-center">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-slate-100 text-slate-500 border border-slate-200">
                      ملغاة
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center text-slate-400 font-semibold">11 مايو 2024 - 16:10</td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* View more btn */}
        <div className="pt-2 flex justify-center">
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl text-[10px] font-extrabold transition-all shadow-xs">
            <span>عرض المزيد</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

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
                          value={bank}
                          onChange={(e) => setBank(e.target.value)}
                          className="w-full pl-8 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-700 text-right transition-colors appearance-none cursor-pointer"
                          required
                        >
                          <option value="">اختر البنك</option>
                          <option value="البنك الشعبي - الدار البيضاء">البنك الشعبي</option>
                          <option value="التجاري وفا بنك">التجاري وفا بنك</option>
                          <option value="بنك إفريقيا">بنك إفريقيا</option>
                          <option value="CIH Bank">CIH Bank</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-2.5 left-2.5 pointer-events-none" />
                      </div>
                    </div>

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
