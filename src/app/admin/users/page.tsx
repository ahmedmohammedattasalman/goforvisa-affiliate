"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  UserCheck, 
  Crown, 
  Handshake, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  Calendar, 
  Eye, 
  Pencil, 
  Trash2, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  FileSpreadsheet,
  CheckCircle2
} from "lucide-react";

// Stylized Avatars matching mockup
const MaleAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
    <svg className="w-7 h-7 text-slate-500 mt-1" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  </div>
);

const FemaleAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-pink-50 border border-pink-100 overflow-hidden flex items-center justify-center shrink-0">
    <svg className="w-7 h-7 text-pink-400 mt-1" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  </div>
);

const InitialsAvatar = ({ initials }: { initials: string }) => (
  <div className="w-8 h-8 rounded-full bg-[#0054A6] text-white flex items-center justify-center shrink-0 font-extrabold text-xs">
    {initials}
  </div>
);

export default function AdminUsers() {
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // KPI Metrics Data
  const metrics = [
    {
      title: "إجمالي المستخدمين",
      value: "24",
      subtext: "جميع المستخدمين",
      icon: <Users className="w-5 h-5 text-[#0054A6]" />,
      colorClass: "bg-blue-50 text-[#0054A6] border-blue-100"
    },
    {
      title: "المستخدمون النشطون",
      value: "20",
      subtext: "نشط حالياً",
      icon: <UserCheck className="w-5 h-5 text-emerald-600" />,
      colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      title: "المدراء",
      value: "4",
      subtext: "مدير",
      icon: <Crown className="w-5 h-5 text-amber-600" />,
      colorClass: "bg-amber-50 text-amber-600 border-amber-100"
    },
    {
      title: "الموظفون",
      value: "16",
      subtext: "موظف",
      icon: <Users className="w-5 h-5 text-purple-700" />,
      colorClass: "bg-purple-50 text-purple-700 border-purple-100"
    },
    {
      title: "الشركاء",
      value: "4",
      subtext: "شريك",
      icon: <Handshake className="w-5 h-5 text-blue-600" />,
      colorClass: "bg-blue-50 text-blue-600 border-blue-100"
    }
  ];

  // Users List Data matching mockup exactly
  const users = [
    {
      id: 1,
      name: "أحمد الإدريسي",
      role: "المدير العام",
      email: "ahmed@goforvisa.com",
      roleBadge: "مدير عام",
      roleBadgeClass: "bg-amber-50 text-amber-600 border-amber-100",
      status: "نشط",
      statusColor: "text-emerald-600 bg-emerald-500",
      lastLogin: "2024-05-31 14:25",
      createdDate: "2024-01-10",
      avatar: <MaleAvatar />,
      isYou: true
    },
    {
      id: 2,
      name: "فاطمة الزهراء",
      role: "مدير العمليات",
      email: "fatima@goforvisa.com",
      roleBadge: "مدير",
      roleBadgeClass: "bg-blue-50 text-blue-600 border-blue-100",
      status: "نشط",
      statusColor: "text-emerald-600 bg-emerald-500",
      lastLogin: "2024-05-31 11:10",
      createdDate: "2024-02-15",
      avatar: <FemaleAvatar />,
      isYou: false
    },
    {
      id: 3,
      name: "محمد تقي",
      role: "مسؤول الملفات",
      email: "mohamed.taqi@goforvisa.com",
      roleBadge: "موظف",
      roleBadgeClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
      status: "نشط",
      statusColor: "text-emerald-600 bg-emerald-500",
      lastLogin: "2024-05-31 09:45",
      createdDate: "2024-02-20",
      avatar: <MaleAvatar />,
      isYou: false
    },
    {
      id: 4,
      name: "سارة بناني",
      role: "موظفة معالجة",
      email: "sara.benani@goforvisa.com",
      roleBadge: "موظف",
      roleBadgeClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
      status: "نشط",
      statusColor: "text-emerald-600 bg-emerald-500",
      lastLogin: "2024-05-30 16:30",
      createdDate: "2024-03-01",
      avatar: <FemaleAvatar />,
      isYou: false
    },
    {
      id: 5,
      name: "ياسين كمال",
      role: "دعم العملاء",
      email: "yassine.kamal@goforvisa.com",
      roleBadge: "موظف",
      roleBadgeClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
      status: "معطل",
      statusColor: "text-rose-600 bg-rose-500",
      lastLogin: "2024-05-28 10:20",
      createdDate: "2024-03-10",
      avatar: <MaleAvatar />,
      isYou: false
    },
    {
      id: 6,
      name: "عادل حميد",
      role: "شريك",
      email: "adel.hamid@atlastravel.com",
      roleBadge: "شريك",
      roleBadgeClass: "bg-purple-50 text-purple-600 border-purple-100",
      status: "نشط",
      statusColor: "text-emerald-600 bg-emerald-500",
      lastLogin: "2024-05-29 12:15",
      createdDate: "2024-04-01",
      avatar: <InitialsAvatar initials="AT" />,
      isYou: false
    }
  ];

  // Last Logins Data
  const lastLogins = [
    { name: "أحمد الإدريسي", role: "المدير العام", time: "2024-05-31 14:25", status: "نجح" },
    { name: "فاطمة الزهراء", role: "مدير العمليات", time: "2024-05-31 11:10", status: "نجح" },
    { name: "محمد تقي", role: "مسؤول الملفات", time: "2024-05-31 09:45", status: "نجح" }
  ];

  // Roles & Permissions summary data
  const rolesPermissions = [
    { title: "شريك", value: "4", desc: "صلاحيات الشركاء", icon: <Handshake className="w-4 h-4" />, color: "bg-purple-50 text-purple-600 border-purple-100" },
    { title: "موظف", value: "16", desc: "صلاحيات محدودة", icon: <Users className="w-4 h-4" />, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { title: "مدير", value: "4", desc: "صلاحيات إدارية", icon: <UserCheck className="w-4 h-4" />, color: "bg-blue-50 text-blue-600 border-blue-100" },
    { title: "مدير عام", value: "1", desc: "صلاحيات كاملة", icon: <Crown className="w-4 h-4" />, color: "bg-purple-50 text-purple-600 border-purple-100", hasCrown: true }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-1.5">
            <Link href="/admin" className="hover:text-[#0054A6]">الرئيسية</Link>
            <span className="mx-1">/</span>
            <span>إدارة المستخدمين</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-700 shadow-xs">
              <Users className="w-5 h-5 text-[#0054A6]" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800">إدارة المستخدمين</h1>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">إدارة جميع المستخدمين والصلاحيات في النظام</p>
        </div>
      </div>

      {/* KPI Cards Row (5 Cards) - Flows from Right-to-Left (RTL) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {metrics.map((card, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between h-[100px]">
            
            {/* Card Content */}
            <div className="flex items-center justify-between gap-3">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-extrabold block">{card.title}</span>
                <div className="flex items-baseline gap-1 mt-1 leading-none">
                  <span className="text-xl font-black text-slate-800" dir="ltr">{card.value}</span>
                </div>
              </div>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-slate-100/50 ${card.colorClass}`}>
                {card.icon}
              </div>
            </div>

            {/* Subtext */}
            <div className="flex items-center justify-start text-[9px] text-slate-400 font-bold mt-1">
              <span>{card.subtext}</span>
            </div>

          </div>
        ))}
      </div>

      {/* Filters Row */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-end justify-between gap-4">
        
        {/* Dropdowns, Search and Filter triggers (Right aligned in RTL) */}
        <div className="flex flex-wrap items-end justify-start gap-4 flex-1">
          
          {/* Action Buttons: Add User & Export */}
          <div className="flex flex-col gap-2 min-w-[130px]">
            <button className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer h-[38px] w-full">
              <Plus className="w-4 h-4" />
              <span>إضافة مستخدم جديد</span>
            </button>
            <div className="relative">
              <button className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors h-[38px] cursor-pointer">
                <div className="flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>تصدير</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-450" />
              </button>
            </div>
          </div>

          {/* User Role Select */}
          <div className="flex flex-col gap-1.5 min-w-[140px]">
            <label className="text-[11px] text-slate-500 font-bold">دور المستخدم</label>
            <div className="relative">
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">جميع الأدوار</option>
                <option value="admin-general">مدير عام</option>
                <option value="admin">مدير</option>
                <option value="employee">موظف</option>
                <option value="partner">شريك</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* Status Select */}
          <div className="flex flex-col gap-1.5 min-w-[140px]">
            <label className="text-[11px] text-slate-500 font-bold">الحالة</label>
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="disabled">معطل</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* Search Input */}
          <div className="flex flex-col gap-1.5 min-w-[200px] flex-1">
            <label className="text-[11px] text-slate-500 font-bold">بحث</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="بحث بالاسم أو البريد الإلكتروني..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-700 font-bold h-[38px]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Advanced Filter Trigger */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-transparent select-none">تصفية</span>
            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer h-[38px]">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>تصفية متقدمة</span>
            </button>
          </div>

          {/* Calendar Trigger */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-transparent select-none">تاريخ</span>
            <button className="flex items-center justify-center p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl transition-all shadow-xs cursor-pointer h-[38px] w-[38px]">
              <Calendar className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Users Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        
        {/* Card Header */}
        <div className="p-6 border-b border-slate-50 text-right">
          <h3 className="font-extrabold text-slate-800 text-sm">قائمة المستخدمين ({users.length})</h3>
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-slate-650 text-xs font-bold">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 font-bold border-b border-slate-100/60">
                <th className="py-3.5 pr-6 w-12">#</th>
                <th className="py-3.5">المستخدم</th>
                <th className="py-3.5">البريد الإلكتروني</th>
                <th className="py-3.5">الدور</th>
                <th className="py-3.5">الحالة</th>
                <th className="py-3.5">آخر تسجيل دخول</th>
                <th className="py-3.5">تاريخ الإنشاء</th>
                <th className="py-3.5 pl-6 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/40 transition-colors">
                  
                  {/* Serial Number */}
                  <td className="py-4 pr-6 text-slate-400 font-bold">{user.id}</td>

                  {/* User Profile Info */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {user.avatar}
                      <div className="text-right">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-xs text-slate-800">{user.name}</span>
                          {user.isYou && (
                            <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-[#0054A6] text-[8px] font-black border border-blue-100/40">أنت</span>
                          )}
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{user.role}</span>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-4 font-bold text-slate-600" dir="ltr">{user.email}</td>

                  {/* Role Badge */}
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded-lg border text-[9px] font-extrabold ${user.roleBadgeClass}`}>
                      {user.roleBadge}
                    </span>
                  </td>

                  {/* Status Indicator */}
                  <td className="py-4">
                    <div className="flex items-center gap-1.5 justify-start">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${user.statusColor.split(" ")[1]}`} />
                      <span className={`text-[10px] font-extrabold ${user.statusColor.split(" ")[0]}`}>{user.status}</span>
                    </div>
                  </td>

                  {/* Last Login */}
                  <td className="py-4 text-slate-500 font-bold" dir="ltr">{user.lastLogin}</td>

                  {/* Created Date */}
                  <td className="py-4 text-slate-400 font-bold" dir="ltr">{user.createdDate}</td>

                  {/* Actions Column */}
                  <td className="py-4 pl-6 text-left">
                    <div className="flex items-center gap-1.5 justify-start" dir="ltr">
                      
                      {/* More options button */}
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200/50 shadow-2xs cursor-pointer">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete button */}
                      <button className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200/50 shadow-2xs cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit button */}
                      <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg border border-blue-200/50 shadow-2xs cursor-pointer">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      {/* View button */}
                      <button className="p-1.5 text-[#0054A6] hover:text-blue-800 hover:bg-blue-50 rounded-lg border border-slate-200/50 shadow-2xs cursor-pointer">
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div className="p-6 border-t border-slate-50 flex items-center justify-between flex-wrap gap-4 text-xs font-bold text-slate-500">
          
          {/* Dropdown show entries count */}
          <div className="flex items-center gap-2">
            <span>عرض</span>
            <div className="relative">
              <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-6 pr-3 py-1 text-center font-bold text-slate-600 outline-none cursor-pointer h-[28px]">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute top-1/2 -translate-y-1/2 left-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Pagination numbers */}
          <div className="flex items-center gap-1.5">
            <button className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 cursor-pointer h-[28px] w-[28px] flex items-center justify-center">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded-lg bg-[#0054A6] text-white cursor-pointer h-[28px] w-[28px] flex items-center justify-center">1</button>
            <button className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer h-[28px] w-[28px] flex items-center justify-center">2</button>
            <button className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer h-[28px] w-[28px] flex items-center justify-center">3</button>
            <button className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 cursor-pointer h-[28px] w-[28px] flex items-center justify-center">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Showing entries status */}
          <div className="text-slate-400 font-medium">
            عرض 1 إلى 6 من أصل 24 مستخدم
          </div>

        </div>

      </div>

      {/* Bottom Grid: Last Logins & Roles summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Card 2: Last Logins (Left card in RTL layout -> width span 5) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between lg:col-span-5">
          <div className="pb-3 border-b border-slate-100 text-right">
            <h3 className="font-extrabold text-slate-800 text-sm">آخر عمليات تسجيل الدخول</h3>
          </div>

          <div className="flex-1 py-3 divide-y divide-slate-50">
            {lastLogins.map((login, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                
                {/* Status Badge */}
                <div className="flex items-center gap-1.5 justify-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-[10px] font-extrabold text-emerald-600">{login.status}</span>
                </div>

                {/* Date & Time */}
                <span className="text-[9px] text-slate-400 font-bold" dir="ltr">{login.time}</span>

                {/* User Info */}
                <div className="text-right">
                  <span className="font-extrabold text-xs text-slate-700 block">{login.name}</span>
                  <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{login.role}</span>
                </div>

              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-50 flex justify-center">
            <button 
              className="text-xs text-slate-450 font-bold flex items-center gap-1 cursor-default opacity-80"
              disabled
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>عرض جميع السجلات</span>
            </button>
          </div>
        </div>

        {/* Card 1: Roles & Permissions (Right card in RTL layout -> width span 7) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col lg:col-span-7">
          <div className="pb-3 border-b border-slate-100 text-right">
            <h3 className="font-extrabold text-slate-800 text-sm">الأدوار والصلاحيات</h3>
          </div>

          <div className="flex-1 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {rolesPermissions.map((role, idx) => (
              <div key={idx} className="bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-between gap-3 transition-all h-[130px] text-right relative">
                
                {/* Crown/Trophy Decoration */}
                {role.hasCrown && (
                  <div className="absolute top-2.5 left-2.5 text-amber-500">
                    <Crown className="w-4 h-4" />
                  </div>
                )}

                {/* Header Title & Icon */}
                <div className="flex items-center justify-between gap-2.5">
                  <div className="text-right">
                    <span className="font-extrabold text-xs text-slate-800 block">{role.title}</span>
                    <span className="text-[9px] text-slate-400 font-medium block mt-0.5">{role.desc}</span>
                  </div>
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border border-slate-100/50 ${role.color}`}>
                    {role.icon}
                  </div>
                </div>

                {/* Count Badge */}
                <div className="mt-auto flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-800">{role.value}</span>
                  <span className="text-[9px] text-slate-400 font-bold">مستخدم</span>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
