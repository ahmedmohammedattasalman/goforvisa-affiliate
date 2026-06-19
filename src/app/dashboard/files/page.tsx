"use client";

import React, { useState } from "react";
import { useApp, ClientFile } from "@/context/AppContext";
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
  DollarSign
} from "lucide-react";

export default function FilesList() {
  const { clients } = useApp();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClient, setSelectedClient] = useState<ClientFile | null>(null);

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

  return (
    <div className="space-y-6 font-sans">
      
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

      {/* Filters Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث برقم الملف، اسم العميل، الدولة..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl pr-10 focus:border-accent-gold focus:bg-white text-sm transition-colors"
          />
          <Search className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5" />
        </div>

        {/* Filter Dropdown */}
        <div className="relative w-full md:w-56">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 focus:border-accent-gold focus:bg-white text-sm transition-colors appearance-none cursor-pointer text-slate-700 font-semibold"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <Filter className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5" />
          {/* Select arrow */}
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
                <th scope="col" className="px-6 py-3.5">رقم الملف</th>
                <th scope="col" className="px-6 py-3.5">اسم العميل</th>
                <th scope="col" className="px-6 py-3.5">الدولة الوجهة</th>
                <th scope="col" className="px-6 py-3.5">نوع التأشيرة</th>
                <th scope="col" className="px-6 py-3.5">تاريخ الإرسال</th>
                <th scope="col" className="px-6 py-3.5">الحالة</th>
                <th scope="col" className="px-6 py-3.5">العمولة</th>
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
                  <td className="px-6 py-4 font-extrabold text-accent-gold-hover text-xs">
                    {client.commission} درهم
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedClient(client)}
                      className="p-1.5 text-slate-400 hover:text-primary-navy hover:bg-slate-100 rounded-lg transition-all"
                      title="عرض التفاصيل"
                    >
                      <Eye className="w-4.5 h-4.5" />
                    </button>
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
          {/* Backdrop */}
          <div 
            onClick={() => setSelectedClient(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative z-10 transition-all text-right animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedClient(null)}
              className="absolute top-4 left-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
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
                  <span className="text-xs font-extrabold text-accent-gold-hover flex items-center mt-0.5">
                    <DollarSign className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                    {selectedClient.commission} درهم
                  </span>
                </div>
              </div>

              {/* Additional notes */}
              {selectedClient.notes && (
                <div className="space-y-1.5 border-t border-slate-50 pt-4">
                  <span className="text-[10px] text-slate-400 block font-bold">ملاحظات إضافية:</span>
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {selectedClient.notes}
                  </p>
                </div>
              )}

              {/* Status pill inside modal */}
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

    </div>
  );
}
