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
  CheckCircle,
  XCircle
} from "lucide-react";

// Brand Logo Components for Wafacash and Cash Plus
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

export default function PaymentsPage() {
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
  const [showAllRequests, setShowAllRequests] = useState(false);

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

  // Base paid is 5000 in mockup, dynamic updates will offset this
  const withdrawnBalance = 5000 + (withdrawals
    .filter(w => w.status === "تم التحويل" || w.status === "تم الدفع")
    .reduce((sum, w) => sum + w.amount, 0) - 5000);

  const availableBalance = currentBalance;
  
  // Total earnings = available + pending
  const totalActiveEarnings = availableBalance + pendingBalance;

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
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(res.message);
      }
    }, 800);
  };

  // Limit displayed withdrawals to 4 unless 'showAllRequests' is active
  const displayedWithdrawals = showAllRequests ? withdrawals : withdrawals.slice(0, 4);

  // Helper to format date with time wrapping
  const formatTableDate = (dateStr: string) => {
    if (!dateStr) return "";
    
    // If it contains space like "10 يونيو 2024 14:30"
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length >= 4) {
      const time = parts[parts.length - 1];
      const date = parts.slice(0, parts.length - 1).join(" ");
      return (
        <div className="flex flex-col text-slate-400 text-xs font-semibold leading-tight text-center">
          <span>{date}</span>
          <span className="text-[10px] text-slate-400/80 mt-0.5" dir="ltr">{time}</span>
        </div>
      );
    }
    
    return <span className="text-slate-400 text-xs font-semibold">{dateStr}</span>;
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
          <span className="text-blue-600">سحب الأرباح</span>
        </div>

        {/* Header Block */}
        <div className="flex items-center justify-start gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 border border-blue-100 shadow-xs">
            <Wallet className="w-6 h-6" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black text-slate-800">سحب الأرباح</h1>
            <p className="text-slate-400 text-xs font-semibold">اطلب سحب أرباحك بسهولة وأمان</p>
          </div>
        </div>

      </div>

      {/* Metrics Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: إجمالي المسحوب */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1 text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">إجمالي المسحوب</span>
            <span className="text-2xl font-black text-purple-600 block leading-tight" dir="ltr">
              {withdrawnBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-bold text-purple-600/80">DH</span>
            </span>
            <span className="text-[9px] text-slate-400 font-bold block">منذ إنشاء حسابك</span>
          </div>
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0 border border-purple-100/50">
            <CircleDollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: إجمالي الأرباح */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1 text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">إجمالي الأرباح</span>
            <span className="text-2xl font-black text-blue-600 block leading-tight" dir="ltr">
              {totalActiveEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-bold text-blue-600/80">DH</span>
            </span>
            <span className="text-[9px] text-slate-400 font-bold block">من جميع الملفات</span>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-100/50">
            <BarChart3 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: الأرباح قيد المراجعة */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1 text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">الأرباح قيد المراجعة</span>
            <span className="text-2xl font-black text-amber-500 block leading-tight" dir="ltr">
              {pendingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-bold text-amber-600/80">DH</span>
            </span>
            <span className="text-[9px] text-slate-400 font-bold block">قيد المراجعة</span>
          </div>
          <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center shrink-0 border border-amber-100/50">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: الرصيد المتاح للسحب */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1 text-right">
            <span className="text-[10px] text-slate-400 font-extrabold block">الرصيد المتاح للسحب</span>
            <span className="text-2xl font-black text-[#10B981] block leading-tight" dir="ltr">
              {availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-bold text-emerald-600/80">DH</span>
            </span>
            <span className="text-[9px] text-slate-400 font-bold block">جاهز للسحب</span>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100/50">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Split Grid (Withdraw Form on Right, Rules on Left) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* RIGHT COLUMN: Request Form (spans 2 on desktop, renders right in RTL) */}
        <div className="lg:col-span-2">
          
          {/* New Withdrawal Form */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6 space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-start gap-2.5 border-b border-slate-50 pb-4">
              <h3 className="font-extrabold text-slate-800 text-sm text-right">طلب سحب جديد</h3>
              <div className="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 border border-blue-100/30">
                <Wallet className="w-4.5 h-4.5" />
              </div>
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

            {/* Form */}
            <form onSubmit={handleWithdrawSubmit} className="space-y-5">
              
              {/* Payment Method Selector */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 block text-right">طريقة السحب</label>
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* Bank Transfer (First in code so it renders on the far right in RTL) */}
                  <div 
                    onClick={() => setSelectedMethod("تحويل بنكي")} 
                    className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all h-16 ${
                      selectedMethod === "تحويل بنكي" 
                        ? "border-blue-600 bg-blue-50/10 shadow-xs" 
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {selectedMethod === "تحويل بنكي" && (
                        <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                      <span className="text-xs font-extrabold text-slate-700">تحويل بنكي</span>
                    </div>
                    <Landmark className="w-5 h-5 text-slate-800 shrink-0" />
                  </div>

                  {/* Cash Plus (Middle in code/rendered layout) */}
                  <div 
                    onClick={() => setSelectedMethod("Cash Plus")} 
                    className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all h-16 ${
                      selectedMethod === "Cash Plus" 
                        ? "border-blue-600 bg-blue-50/10 shadow-xs" 
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {selectedMethod === "Cash Plus" && (
                        <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                      <div className="flex flex-col text-right">
                        <span className="text-xs font-extrabold text-slate-700">Cash Plus</span>
                        <span className="text-[9px] text-slate-400 font-medium">Cash Plus</span>
                      </div>
                    </div>
                    <CashPlusLogo size={24} />
                  </div>

                  {/* Wafacash (Last in code so it renders on the far left in RTL) */}
                  <div 
                    onClick={() => setSelectedMethod("Wafacash")} 
                    className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all h-16 ${
                      selectedMethod === "Wafacash" 
                        ? "border-blue-600 bg-blue-50/10 shadow-xs" 
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {selectedMethod === "Wafacash" && (
                        <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                      <div className="flex flex-col text-right">
                        <span className="text-xs font-extrabold text-slate-700">WafaCash</span>
                        <span className="text-[9px] text-slate-400 font-medium">Wafacash</span>
                      </div>
                    </div>
                    <WafacashLogo size={18} />
                  </div>

                </div>
              </div>

              {/* Amount */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 block text-right">المبلغ المطلوب</label>
                <div className="flex rounded-xl overflow-hidden border border-slate-200 focus-within:border-blue-600 bg-white" dir="ltr">
                  <div className="bg-slate-50 px-4 flex items-center border-r border-slate-200 text-slate-500 font-bold text-xs select-none">
                    DH
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-xs font-bold text-slate-800 text-right focus:outline-none bg-transparent"
                    placeholder="500"
                    required
                  />
                </div>
                <span className="text-[9px] text-[#A3AED0] font-bold block text-right">الحد الأدنى للسحب هو 500 درهم</span>
              </div>

              {/* Personal Info */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[11px] font-extrabold text-slate-800 text-right">معلومات الاستلام</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400">الاسم الكامل</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                        placeholder="أدخل الاسم الكامل"
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
                        placeholder="أدخل رقم الهاتف"
                        required
                      />
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute top-2.5 left-2.5" />
                    </div>
                  </div>

                </div>

                {/* Dynamic fields based on payment method */}
                {selectedMethod === "تحويل بنكي" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* RIB */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400">رقم الحساب البنكي</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={rib}
                          onChange={(e) => setRib(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:bg-white text-xs font-bold text-slate-800 text-right transition-colors"
                          placeholder="أدخل رقم الحساب البنكي"
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
                          <option value="البنك الشعبي">البنك الشعبي</option>
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
                        placeholder="أدخل رقم البطاقة الوطنية (CIN)"
                        required
                      />
                      <CreditCard className="w-3.5 h-3.5 text-slate-400 absolute top-2.5 left-2.5" />
                    </div>
                  </div>
                )}

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-750 text-white font-extrabold rounded-xl text-xs transition-colors shadow-sm disabled:opacity-75 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 rotate-180" />
                <span>طلب السحب</span>
              </button>

            </form>

          </div>

        </div>

        {/* LEFT COLUMN: Withdrawal Rules (spans 1 on desktop, renders left in RTL) */}
        <div className="lg:col-span-1">
          
          {/* Withdrawal Rules */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-start gap-2.5 border-b border-slate-50 pb-4">
              <h3 className="font-extrabold text-base text-slate-800 text-right">شروط سحب الأرباح</h3>
              <div className="w-7 h-7 bg-slate-50 text-slate-700 rounded-lg flex items-center justify-center shrink-0 border border-slate-200/40">
                <FileText className="w-4 h-4 text-slate-800" />
              </div>
            </div>

            <div className="space-y-4">
              
              {/* Rule 1 */}
              <div className="border border-slate-100 rounded-2xl p-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="w-11 h-11 bg-green-50 border border-green-100 text-green-600 rounded-full flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-extrabold leading-none">500</span>
                  <span className="text-[8px] font-extrabold leading-none mt-0.5">DH</span>
                </div>
                <div className="space-y-1 text-right flex-1 pr-3.5">
                  <h4 className="font-extrabold text-xs text-slate-800">عمولة ثابتة</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    تحصل على 500 درهم عن كل ملف يتم إنجازه بنجاح.
                  </p>
                </div>
              </div>

              {/* Rule 2 */}
              <div className="border border-slate-100 rounded-2xl p-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="w-11 h-11 bg-green-50 border border-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                  <ArrowDownUp className="w-4.5 h-4.5 stroke-[2.5]" />
                </div>
                <div className="space-y-1 text-right flex-1 pr-3.5">
                  <h4 className="font-extrabold text-xs text-slate-800">الحد الأدنى للسحب</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    الحد الأدنى لطلب السحب هو 500 درهم.
                  </p>
                </div>
              </div>

              {/* Rule 3 */}
              <div className="border border-slate-100 rounded-2xl p-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="w-11 h-11 bg-green-50 border border-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-4.5 h-4.5 stroke-[2.5]" />
                </div>
                <div className="space-y-1 text-right flex-1 pr-3.5">
                  <h4 className="font-extrabold text-xs text-slate-800">مدة معالجة الطلب</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    يتم معالجة طلب السحب خلال 24 إلى 72 ساعة عمل.
                  </p>
                </div>
              </div>

              {/* Rule 4 */}
              <div className="border border-slate-100 rounded-2xl p-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="w-11 h-11 bg-red-50 border border-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0">
                  <XCircle className="w-4.5 h-4.5 stroke-[2.5]" />
                </div>
                <div className="space-y-1 text-right flex-1 pr-3.5">
                  <h4 className="font-extrabold text-xs text-slate-800">حالات غير مؤهلة للسحب</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    لا يمكن سحب الأرباح للملفات الملغاة أو غير المكتملة.
                  </p>
                </div>
              </div>

              {/* Rule 5 */}
              <div className="border border-slate-100 rounded-2xl p-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="w-11 h-11 bg-blue-50 border border-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <Landmark className="w-4.5 h-4.5 stroke-[2.5]" />
                </div>
                <div className="space-y-1 text-right flex-1 pr-3.5">
                  <h4 className="font-extrabold text-xs text-slate-800">طريقة التحويل</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    سيتم تحويل المبلغ إلى الوسيلة المحددة من قبلك.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* BOTTOM SECTION: Request Log Table ("سجل طلبات السحب") */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-50 pb-4">
          <h3 className="font-extrabold text-base text-slate-800 text-right">سجل طلبات السحب</h3>
          <span className="text-slate-400 text-xs font-semibold">سجل السحوبات</span>
        </div>

        {/* Structured Grid Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
          <table className="w-full text-xs text-right text-slate-600 border-collapse">
            <thead className="text-[10px] text-slate-500 font-extrabold bg-slate-50/75 border-b border-slate-200">
              <tr>
                <th className="border-l border-slate-200 py-3 px-4 text-center whitespace-nowrap">رقم الطلب</th>
                <th className="border-l border-slate-200 py-3 px-4 text-center whitespace-nowrap">التاريخ</th>
                <th className="border-l border-slate-200 py-3 px-4 text-center whitespace-nowrap">طريقة السحب</th>
                <th className="border-l border-slate-200 py-3 px-4 text-center whitespace-nowrap">المبلغ</th>
                <th className="border-l border-slate-200 py-3 px-4 text-center whitespace-nowrap">الحالة</th>
                <th className="py-3 px-4 text-right pr-6 whitespace-nowrap">ملاحظات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {displayedWithdrawals.map((tx) => {
                const isPaid = tx.status === "تم التحويل" || tx.status === "تم الدفع";
                const isPending = tx.status === "قيد المراجعة";
                const isRejected = tx.status === "مرفوض";

                let noteText = tx.notes || "";
                if (!noteText) {
                  if (isPaid) noteText = "تم التحويل بنجاح";
                  else if (isPending) noteText = "جاري مراجعة الطلب";
                  else noteText = "بيانات الحساب غير صحيحة";
                }

                return (
                  <tr key={tx.id} className="bg-white hover:bg-slate-50/50 transition-colors">
                    
                    {/* رقم الطلب */}
                    <td className="border-l border-slate-200 py-3.5 px-4 text-center font-bold text-slate-800 text-[10px] whitespace-nowrap">
                      {tx.id}
                    </td>

                    {/* التاريخ */}
                    <td className="border-l border-slate-200 py-3.5 px-4 text-center whitespace-nowrap">
                      {formatTableDate(tx.date)}
                    </td>

                    {/* طريقة السحب */}
                    <td className="border-l border-slate-200 py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center gap-2 justify-center font-extrabold text-slate-700">
                        {tx.method.includes("Wafa") ? (
                          <>
                            <WafacashLogo size={14} />
                            <span>Wafa Cash</span>
                          </>
                        ) : tx.method.includes("Plus") ? (
                          <>
                            <CashPlusLogo size={20} />
                            <span>Cash Plus</span>
                          </>
                        ) : (
                          <>
                            <Landmark className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>تحويل بنكي</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* المبلغ */}
                    <td className="border-l border-slate-200 py-3.5 px-4 text-center font-black text-slate-800 whitespace-nowrap">
                      <span dir="ltr">
                        {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
                      </span>
                    </td>

                    {/* الحالة */}
                    <td className="border-l border-slate-200 py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex justify-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold border ${
                          isPaid 
                            ? "bg-green-50 text-green-600 border-green-100" 
                            : isPending
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : "bg-red-50 text-red-600 border-red-100"
                        }`}>
                          <span>{isPaid ? "تم الدفع" : isPending ? "قيد المراجعة" : "مرفوض"}</span>
                          {isPaid ? (
                            <Check className="w-3 h-3 stroke-[3] rounded-full border border-green-500 p-0.5 bg-green-500 text-white" />
                          ) : isPending ? (
                            <Clock className="w-3 h-3 text-amber-500" />
                          ) : (
                            <X className="w-3 h-3 rounded-full border border-red-500 p-0.5 bg-red-500 text-white" />
                          )}
                        </span>
                      </div>
                    </td>

                    {/* ملاحظات */}
                    <td className="py-3.5 px-4 text-right pr-6 whitespace-nowrap font-extrabold">
                      <div className="flex items-center gap-2 justify-start">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          isPaid ? "bg-green-500" : isPending ? "bg-amber-500" : "bg-red-500"
                        }`} />
                        <span className={
                          isPaid ? "text-green-600" : isPending ? "text-amber-600" : "text-red-600"
                        }>
                          {noteText}
                        </span>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Toggle Button */}
        {withdrawals.length > 4 && (
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setShowAllRequests(!showAllRequests)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-500 rounded-xl text-[10px] font-extrabold transition-all shadow-xs"
            >
              <span>{showAllRequests ? "عرض معاملات أقل" : "عرض جميع الطلبات"}</span>
              <List className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
