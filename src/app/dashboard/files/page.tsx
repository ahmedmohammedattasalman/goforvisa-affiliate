"use client";

import React, { useState, useEffect } from "react";
import { useApp, ClientFile } from "@/context/AppContext";
import { supabase } from "@/utils/supabase";
import { 
  Search, 
  Filter, 
  Eye, 
  Files, 
  Calendar,
  X,
  Phone,
  Mail,
  User,
  Globe,
  DollarSign,
  MoreHorizontal,
  Edit3,
  Briefcase,
  ShieldCheck,
  ChevronDown
} from "lucide-react";

export default function FilesList() {
  const { clients, loading } = useApp();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClient, setSelectedClient] = useState<ClientFile | null>(null);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  // Edit Client States
  const [editClient, setEditClient] = useState<ClientFile | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editNationality, setEditNationality] = useState("");
  const [editDob, setEditDob] = useState("");
  const [editCountry, setEditCountry] = useState("");
  const [editVisaType, setEditVisaType] = useState("");
  const [editJob, setEditJob] = useState("");
  const [editCnss, setEditCnss] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);

  // Populate edit states
  useEffect(() => {
    if (editClient) {
      setEditName(editClient.name || "");
      setEditPhone(editClient.phone || "");
      setEditEmail(editClient.email || "");
      setEditNationality(editClient.nationality || "");
      setEditDob(editClient.dob || "");
      setEditCountry(editClient.country || "");
      setEditVisaType(editClient.visaType || "");
      setEditJob(editClient.job || "");
      setEditCnss(editClient.cnss || "");
      setEditNotes(editClient.notes || "");
    }
  }, [editClient]);

  // Status Filter options
  const statusOptions = [
    { value: "all", label: "عرض الكل" },
    { value: "تم الإنجاز", label: "تم الإنجاز" },
    { value: "قيد المعالجة", label: "قيد المعالجة" },
    { value: "في انتظار البيانات", label: "في انتظار البيانات" },
    { value: "ملغى", label: "ملغى" }
  ];

  // Filtering Logic
  const filteredClients = clients.filter((client) => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === "all" || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Status counts for summary cards (excluding "في انتظار البيانات")
  const totalFiles = clients.length;
  const completedFiles = clients.filter(c => c.status === "تم الإنجاز").length;
  const processingFiles = clients.filter(c => c.status === "قيد المعالجة").length;
  const cancelledFiles = clients.filter(c => c.status === "ملغى").length;
  const totalCommissions = clients
    .filter(c => c.status === "تم الإنجاز")
    .reduce((sum, c) => sum + c.commission, 0);

  // Close dropdown on click away
  useEffect(() => {
    const handleClickAway = () => setActiveDropdownId(null);
    if (typeof window !== "undefined") {
      window.addEventListener("click", handleClickAway);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("click", handleClickAway);
      }
    };
  }, []);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editClient) return;
    try {
      setSaving(true);
      const { error } = await supabase
        .from("clients")
        .update({
          name: editName,
          phone: editPhone,
          email: editEmail,
          nationality: editNationality,
          dob: editDob,
          country: editCountry,
          visa_type: editVisaType,
          job: editJob,
          cnss: editCnss,
          notes: editNotes
        })
        .eq("id", editClient.dbId);

      if (error) throw error;
      setEditClient(null);
    } catch (err) {
      console.error("Error updating client:", err);
      alert("حدث خطأ أثناء تعديل الملف.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#0054A6] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-bold">جاري تحميل الملفات...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans" dir="rtl">
      
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-accent-gold-light text-accent-gold rounded-xl flex items-center justify-center shrink-0 border border-accent-gold/20 shadow-sm">
          <Files className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <h2 className="font-bold text-lg text-primary-navy">قائمة الملفات</h2>
          <p className="text-slate-400 text-xs font-medium">متابعة وتتبع تفاصيل ملفات التأشيرات الخاصة بعملائك المحالين</p>
        </div>
      </div>

      {/* Dynamic Summary Cards (5 columns) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
          <span className="text-[10px] text-slate-400 font-bold block">إجمالي الملفات</span>
          <span className="text-2xl font-black text-slate-800 block mt-1">{totalFiles}</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm text-center">
          <span className="text-[10px] text-emerald-500 font-bold block">تم الإنجاز</span>
          <span className="text-2xl font-black text-emerald-600 block mt-1">{completedFiles}</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm text-center">
          <span className="text-[10px] text-blue-500 font-bold block">قيد المعالجة</span>
          <span className="text-2xl font-black text-blue-600 block mt-1">{processingFiles}</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-sm text-center">
          <span className="text-[10px] text-rose-500 font-bold block">ملغاة</span>
          <span className="text-2xl font-black text-rose-600 block mt-1">{cancelledFiles}</span>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm text-center col-span-2 sm:col-span-1">
          <span className="text-[10px] text-purple-500 font-bold block">إجمالي العمولات</span>
          <span className="text-lg font-black text-purple-600 block mt-1" dir="ltr">{totalCommissions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-[10px]">DH</span></span>
        </div>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث برقم الملف، اسم العميل، الدولة..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl pr-10 focus:border-accent-gold focus:bg-white text-sm transition-colors text-right"
          />
          <Search className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5" />
        </div>

        {/* Filter Dropdown */}
        <div className="relative w-full md:w-56">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 focus:border-accent-gold focus:bg-white text-sm transition-colors appearance-none cursor-pointer text-slate-700 font-semibold text-right"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <Filter className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5" />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-2">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right text-slate-600">
            <thead className="text-xs text-slate-400 font-extrabold uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th scope="col" className="px-6 py-3.5 text-right">رقم الملف</th>
                <th scope="col" className="px-6 py-3.5 text-right">اسم العميل</th>
                <th scope="col" className="px-6 py-3.5 text-right">الدولة الوجهة</th>
                <th scope="col" className="px-6 py-3.5 text-right">نوع التأشيرة</th>
                <th scope="col" className="px-6 py-3.5 text-right">تاريخ الإرسال</th>
                <th scope="col" className="px-6 py-3.5 text-right">الحالة</th>
                <th scope="col" className="px-6 py-3.5 text-right">العمولة</th>
                <th scope="col" className="px-6 py-3.5 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="bg-white border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 text-xs">{client.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{client.name}</td>
                  <td className="px-6 py-4">{client.country}</td>
                  <td className="px-6 py-4 text-xs font-semibold">{client.visaType}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">{client.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      client.status === "تم الإنجاز" ? "bg-green-50 text-green-600" :
                      client.status === "قيد المعالجة" ? "bg-blue-50 text-blue-600" :
                      client.status === "في انتظار البيانات" ? "bg-amber-50 text-amber-600" :
                      "bg-red-50 text-red-600"
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-extrabold text-accent-gold-hover text-xs" dir="ltr">
                    {client.commission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdownId(activeDropdownId === client.id ? null : client.id);
                        }}
                        className="p-1.5 text-slate-400 hover:text-[#0054A6] hover:bg-slate-150 rounded-lg transition-all cursor-pointer"
                        title="إجراءات"
                      >
                        <MoreHorizontal className="w-4.5 h-4.5" />
                      </button>
                      
                      {activeDropdownId === client.id && (
                        <div className="absolute left-0 mt-1.5 w-28 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 z-20 text-right animate-in fade-in slide-in-from-top-1 duration-150">
                          <button
                            onClick={() => {
                              setSelectedClient(client);
                              setActiveDropdownId(null);
                            }}
                            className="w-full text-right px-4 py-2 text-xs hover:bg-slate-50 flex items-center justify-end gap-2 text-slate-700 font-bold cursor-pointer"
                          >
                            <span>عرض</span>
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                          <button
                            onClick={() => {
                              setEditClient(client);
                              setActiveDropdownId(null);
                            }}
                            className="w-full text-right px-4 py-2 text-xs hover:bg-slate-50 flex items-center justify-end gap-2 text-[#0054A6] font-bold cursor-pointer"
                          >
                            <span>تعديل</span>
                            <Edit3 className="w-3.5 h-3.5 text-[#0054A6]" />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400 font-medium">
                    لا توجد ملفات تطابق معايير البحث الحالية.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setSelectedClient(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          ></div>
          
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative z-10 transition-all text-right animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedClient(null)}
              className="absolute top-4 left-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-extrabold text-lg text-primary-navy border-b border-slate-50 pb-4 mb-6">
              تفاصيل ملف العميل : <span className="text-accent-gold">{selectedClient.id}</span>
            </h3>

            <div className="space-y-4">
              
              {/* Client Profile */}
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 bg-accent-gold-light text-accent-gold rounded-xl flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-bold">الاسم الكامل:</span>
                  <span className="font-bold text-slate-700 text-sm">{selectedClient.name}</span>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">رقم الهاتف:</span>
                  <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mt-0.5" dir="ltr">
                    <Phone className="w-3.5 h-3.5 text-accent-gold" />
                    {selectedClient.phone}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">البريد الإلكتروني:</span>
                  <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mt-0.5 truncate" title={selectedClient.email}>
                    <Mail className="w-3.5 h-3.5 text-accent-gold" />
                    {selectedClient.email}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">الجنسية:</span>
                  <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mt-0.5">
                    <Globe className="w-3.5 h-3.5 text-accent-gold" />
                    {selectedClient.nationality}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">تاريخ الميلاد:</span>
                  <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                    {selectedClient.dob}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">البلد المطلوب:</span>
                  <span className="text-xs font-bold text-slate-700 block mt-0.5">{selectedClient.country}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">نوع الفيزا:</span>
                  <span className="text-xs font-bold text-slate-700 block mt-0.5">تأشيرة {selectedClient.visaType}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">تاريخ التقديم:</span>
                  <span className="text-xs text-slate-500 block mt-0.5">{selectedClient.date}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">العمولة المستحقة:</span>
                  <span className="text-xs font-extrabold text-accent-gold-hover flex items-center mt-0.5" dir="ltr">
                    <DollarSign className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                    {selectedClient.commission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
                  </span>
                </div>
              </div>

              {/* Financial Details */}
              <div className="border-t border-slate-50 pt-4 space-y-2">
                <span className="text-[10px] text-slate-400 block font-bold">التفاصيل المالية:</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[9px] text-slate-400 font-bold block">الرسوم الإجمالية</span>
                    <span className="text-xs font-black text-slate-700 block mt-0.5" dir="ltr">{selectedClient.totalFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[9px] text-slate-400 font-bold block">الدفعة الأولى</span>
                    <span className="text-xs font-black text-emerald-600 block mt-0.5" dir="ltr">{selectedClient.paid1st.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[9px] text-slate-400 font-bold block">الدفعة الثانية</span>
                    <span className="text-xs font-black text-emerald-600 block mt-0.5" dir="ltr">{selectedClient.paid2nd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[9px] text-slate-400 font-bold block">المبلغ المتبقي</span>
                    <span className="text-xs font-black text-amber-600 block mt-0.5" dir="ltr">{(selectedClient.totalFee - selectedClient.paid1st - selectedClient.paid2nd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH</span>
                  </div>
                </div>
              </div>

              {/* Additional notes */}
              {selectedClient.notes && (
                <div className="space-y-1.5 border-t border-slate-50 pt-4">
                  <span className="text-[10px] text-slate-400 block font-bold">ملاحظات إضافية:</span>
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed text-right">
                    {selectedClient.notes}
                  </p>
                </div>
              )}

              {/* Status pill */}
              <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-6">
                <span className="text-xs text-slate-400 font-bold">حالة الطلب الحالية:</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                  selectedClient.status === "تم الإنجاز" ? "bg-green-50 text-green-600" :
                  selectedClient.status === "قيد المعالجة" ? "bg-blue-50 text-blue-600" :
                  selectedClient.status === "في انتظار البيانات" ? "bg-amber-50 text-amber-600" :
                  "bg-red-50 text-red-600"
                }`}>
                  {selectedClient.status}
                </span>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {editClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setEditClient(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          ></div>
          
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative z-10 transition-all text-right animate-in fade-in zoom-in-95 duration-200">
            <button 
              type="button"
              onClick={() => setEditClient(null)}
              className="absolute top-4 left-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-extrabold text-lg text-primary-navy border-b border-slate-50 pb-4 mb-6">
              تعديل ملف العميل : <span className="text-accent-gold">{editClient.id}</span>
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">الاسم الكامل</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-250 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                    required
                  />
                  <User className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5" />
                </div>
              </div>

              {/* Grid 2-cols */}
              <div className="grid grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">الهاتف</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-250 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                      required
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5" />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">البريد الإلكتروني</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-250 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                      required
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5" />
                  </div>
                </div>

                {/* Nationality */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">الجنسية</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={editNationality}
                      onChange={(e) => setEditNationality(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-250 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                      required
                    />
                    <Globe className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5" />
                  </div>
                </div>

                {/* DOB */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">تاريخ الميلاد</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={editDob}
                      onChange={(e) => setEditDob(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-250 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                      placeholder="YYYY-MM-DD"
                      required
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5" />
                  </div>
                </div>

                {/* Destination Country */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">البلد المطلوب</label>
                  <div className="relative">
                    <select 
                      value={editCountry}
                      onChange={(e) => setEditCountry(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-250 rounded-xl pl-8 pr-10 py-2 text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold cursor-pointer"
                      required
                    >
                      <option value="المملكة المتحدة">المملكة المتحدة</option>
                      <option value="كندا">كندا</option>
                      <option value="الولايات المتحدة">الولايات المتحدة</option>
                      <option value="الدنمارك">الدنمارك</option>
                      <option value="أستراليا">أستراليا</option>
                    </select>
                    <Globe className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
                  </div>
                </div>

                {/* Visa Type */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">نوع الفيزا</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={editVisaType}
                      onChange={(e) => setEditVisaType(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-250 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                      required
                    />
                    <Files className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5" />
                  </div>
                </div>

                {/* Job */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">المهنة</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={editJob}
                      onChange={(e) => setEditJob(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-250 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                    />
                    <Briefcase className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5" />
                  </div>
                </div>

                {/* CNSS */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">الضمان الاجتماعي (CNSS)</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={editCnss}
                      onChange={(e) => setEditCnss(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-250 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                    />
                    <ShieldCheck className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5" />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">ملاحظات إضافية</label>
                <textarea 
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-250 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-50 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span>حفظ التعديلات</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setEditClient(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  إلغاء
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
