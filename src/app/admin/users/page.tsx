"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import { 
  Users, 
  UserCheck, 
  Handshake, 
  Plus, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  X,
  Lock,
  Mail,
  User,
  Shield,
  Pencil,
  Trash2
} from "lucide-react";

// Stylized Avatars matching mockup
const MaleAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
    <svg className="w-7 h-7 text-slate-500 mt-1" viewBox="0 0 24 24" fill="currentColor">
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

  const [rawAdminUsers, setRawAdminUsers] = useState<any[]>([]);
  const [rawPartners, setRawPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  // Form states
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("employee");

  const [editUserName, setEditUserName] = useState("");
  const [editUserRole, setEditUserRole] = useState("");

  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUserEmail(session.user.email || "");
      }

      const { data: adminUsersData, error: adminErr } = await supabase
        .from("admin_users")
        .select("*");
      
      const { data: partnersData, error: partnersErr } = await supabase
        .from("partners")
        .select("*");

      if (adminErr) console.error("Error fetching admin users:", adminErr);
      if (partnersErr) console.error("Error fetching partners:", partnersErr);

      setRawAdminUsers(adminUsersData || []);
      setRawPartners(partnersData || []);
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setActionLoading(true);

    if (!newUserName || !newUserEmail || !newUserPassword) {
      setErrorMsg("الرجاء ملء جميع الحقول المطلوبة.");
      setActionLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.rpc("create_admin_user", {
        user_email: newUserEmail,
        user_password: newUserPassword,
        user_name: newUserName,
        user_role: newUserRole
      });

      if (error) throw error;

      setSuccessMsg("تم إضافة المستخدم بنجاح!");
      setNewUserName("");
      setNewUserEmail("");
      setNewUserPassword("");
      setNewUserRole("employee");
      setIsAddModalOpen(false);
      
      // Refresh list
      await fetchUsers();
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ أثناء إضافة المستخدم.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setActionLoading(true);

    if (!editUserName) {
      setErrorMsg("الاسم مطلوب.");
      setActionLoading(false);
      return;
    }

    try {
      if (editingUser.dbTable === "admin_users") {
        const { error } = await supabase
          .from("admin_users")
          .update({
            name: editUserName,
            role: editUserRole
          })
          .eq("id", editingUser.id);

        if (error) throw error;
      } else {
        // Partners
        const { error } = await supabase
          .from("partners")
          .update({
            name: editUserName
          })
          .eq("id", editingUser.id);

        if (error) throw error;
      }

      setSuccessMsg("تم تحديث بيانات المستخدم بنجاح!");
      setIsEditModalOpen(false);
      setEditingUser(null);
      
      // Refresh list
      await fetchUsers();
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ أثناء تحديث بيانات المستخدم.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (user: any) => {
    if (!window.confirm(`هل أنت متأكد من حذف المستخدم "${user.name}"؟`)) {
      return;
    }

    try {
      if (user.dbTable === "admin_users") {
        const { error } = await supabase.rpc("delete_admin_user", {
          target_user_id: user.id
        });
        if (error) throw error;
      } else {
        // Delete partner
        const { error } = await supabase
          .from("partners")
          .delete()
          .eq("id", user.id);
        if (error) throw error;
      }

      setSuccessMsg("تم حذف المستخدم بنجاح!");
      await fetchUsers();
    } catch (err: any) {
      alert(err.message || "حدث خطأ أثناء حذف المستخدم.");
    }
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setEditUserName(user.name);
    setEditUserRole(user.rawRole);
    setIsEditModalOpen(true);
  };

  // Combine users and de-duplicate by email (prioritizing admin_users over partners)
  const adminUsersMapped = rawAdminUsers.map((u) => {
    let roleBadge = "موظف";
    let roleBadgeClass = "bg-emerald-50 text-emerald-600 border-emerald-100";
    
    if (u.role === "super_admin") {
      roleBadge = "مدير عام";
      roleBadgeClass = "bg-amber-50 text-amber-600 border-amber-100";
    } else if (u.role === "admin") {
      roleBadge = "مدير";
      roleBadgeClass = "bg-blue-50 text-blue-600 border-blue-100";
    }

    return {
      id: u.id,
      dbTable: "admin_users",
      name: u.name,
      email: u.email,
      role: u.role === "super_admin" ? "المدير العام" : u.role === "admin" ? "مدير العمليات" : "مسؤول الملفات",
      roleBadge,
      roleBadgeClass,
      status: "نشط",
      statusColor: "text-emerald-600 bg-emerald-500",
      lastLogin: "نشط الآن",
      createdDate: u.created_at ? new Date(u.created_at).toISOString().split("T")[0] : "2026-06-29",
      avatar: <MaleAvatar />,
      isYou: u.email === currentUserEmail,
      rawRole: u.role
    };
  });

  const adminEmails = new Set(adminUsersMapped.map(u => u.email.toLowerCase()));

  const partnersMapped = rawPartners
    .filter(p => p.email && !adminEmails.has(p.email.toLowerCase()))
    .map((p) => ({
      id: p.id,
      dbTable: "partners",
      name: p.name,
      email: p.email,
      role: p.company || "شريك",
      roleBadge: "شريك",
      roleBadgeClass: "bg-purple-50 text-purple-600 border-purple-100",
      status: "نشط",
      statusColor: "text-emerald-600 bg-emerald-500",
      lastLogin: "غير متوفر",
      createdDate: p.created_at ? new Date(p.created_at).toISOString().split("T")[0] : "2026-06-29",
      avatar: <InitialsAvatar initials={(p.company || p.name || "SH").slice(0, 2).toUpperCase()} />,
      isYou: false,
      rawRole: "partner"
    }));

  const combinedUsers = [...adminUsersMapped, ...partnersMapped];

  // Filtering
  const filteredUsers = combinedUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesRole = true;
    if (roleFilter === "admin-general") {
      matchesRole = user.rawRole === "super_admin";
    } else if (roleFilter === "admin") {
      matchesRole = user.rawRole === "admin";
    } else if (roleFilter === "employee") {
      matchesRole = user.rawRole === "employee" || user.rawRole === "staff";
    } else if (roleFilter === "partner") {
      matchesRole = user.rawRole === "partner";
    }

    let matchesStatus = true;
    if (statusFilter === "active") {
      matchesStatus = user.status === "نشط";
    } else if (statusFilter === "disabled") {
      matchesStatus = user.status === "معطل";
    }

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  // KPI Metrics Data (Only 3 Cards remaining after removing المدراء and الموظفون)
  const metrics = [
    {
      title: "إجمالي الشركاء",
      value: partnersMapped.length.toString(),
      subtext: "جميع الشركاء بالمنصة",
      icon: <Users className="w-5 h-5 text-[#0054A6]" />,
      colorClass: "bg-blue-50 text-[#0054A6] border-blue-100"
    },
    {
      title: "الشركاء النشطون",
      value: partnersMapped.filter(u => u.status === "نشط").length.toString(),
      subtext: "نشط حالياً",
      icon: <UserCheck className="w-5 h-5 text-emerald-600" />,
      colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      title: "الشركاء المسجلين",
      value: partnersMapped.length.toString(),
      subtext: "الشركاء المسجلين",
      icon: <Handshake className="w-5 h-5 text-purple-600" />,
      colorClass: "bg-purple-50 text-purple-600 border-purple-100"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#0054A6] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-bold">جاري تحميل المستخدمين...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12" dir="rtl">
      
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-right">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-1.5 justify-start">
            <Link href="/admin" className="hover:text-[#0054A6]">الرئيسية</Link>
            <span className="mx-1">/</span>
            <span>إدارة المستخدمين</span>
          </div>
          <div className="flex items-center gap-3 justify-start">
            <div className="w-9 h-9 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-700 shadow-xs">
              <Users className="w-5 h-5 text-[#0054A6]" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800">إدارة المستخدمين</h1>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">إدارة جميع المستخدمين والصلاحيات في النظام</p>
        </div>
      </div>

      {/* Success/Error Alerts */}
      {successMsg && (
        <div className="bg-emerald-50 text-emerald-600 text-xs p-3.5 rounded-2xl border border-emerald-100 text-right">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-50 text-red-600 text-xs p-3.5 rounded-2xl border border-red-100 text-right">
          {errorMsg}
        </div>
      )}

      {/* KPI Cards Row (3 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {metrics.map((card, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between h-[100px]">
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
            <div className="flex items-center justify-start text-[9px] text-slate-400 font-bold mt-1">
              <span>{card.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Row */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-wrap items-end justify-start gap-4 flex-1">
          
          {/* Action Buttons: Add User */}
          <div className="flex flex-col gap-2 min-w-[150px]">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer h-[38px] w-full"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مستخدم جديد</span>
            </button>
          </div>

          {/* User Role Select */}
          <div className="flex flex-col gap-1.5 min-w-[140px]">
            <label className="text-[11px] text-slate-500 font-bold text-right block">دور المستخدم</label>
            <div className="relative">
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">جميع الأدوار</option>
                <option value="admin-general">مدير عام</option>
                <option value="employee">موظف</option>
                <option value="partner">شريك</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* Status Select */}
          <div className="flex flex-col gap-1.5 min-w-[140px]">
            <label className="text-[11px] text-slate-500 font-bold text-right block">الحالة</label>
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
            <label className="text-[11px] text-slate-500 font-bold text-right block">بحث</label>
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

        </div>
      </div>

      {/* Users Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        
        {/* Card Header */}
        <div className="p-6 border-b border-slate-50 text-right">
          <h3 className="font-extrabold text-slate-800 text-sm">قائمة المستخدمين ({filteredUsers.length})</h3>
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
                <th className="py-3.5">تاريخ الإنشاء</th>
                <th className="py-3.5 pl-6 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50">
              {paginatedUsers.map((user, index) => (
                <tr key={user.id || index} className="hover:bg-slate-50/40 transition-colors">
                  <td className="py-4 pr-6 text-slate-400 font-bold">{startIndex + index + 1}</td>
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
                  <td className="py-4 font-bold text-slate-600 text-right" dir="ltr">{user.email}</td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded-lg border text-[9px] font-extrabold ${user.roleBadgeClass}`}>
                      {user.roleBadge}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1.5 justify-start">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${user.statusColor.split(" ")[1]}`} />
                      <span className={`text-[10px] font-extrabold ${user.statusColor.split(" ")[0]}`}>{user.status}</span>
                    </div>
                  </td>
                  <td className="py-4 text-slate-400 font-bold" dir="ltr">{user.createdDate}</td>
                  <td className="py-4 pl-6 text-left">
                    <div className="flex items-center gap-1.5 justify-start" dir="ltr">
                      {!user.isYou && (
                        <>
                          <button 
                            onClick={() => handleDeleteUser(user)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200/50 shadow-2xs cursor-pointer"
                            title="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => openEditModal(user)}
                            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg border border-blue-200/50 shadow-2xs cursor-pointer"
                            title="تعديل"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs font-bold">لا يوجد مستخدمين مطابقين لخيارات التصفية.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div className="p-6 border-t border-slate-50 flex items-center justify-between flex-wrap gap-4 text-xs font-bold text-slate-500">
          <div className="flex items-center gap-2">
            <span>عرض</span>
            <div className="relative">
              <select 
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-6 pr-3 py-1 text-center font-bold text-slate-600 outline-none cursor-pointer h-[28px]"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute top-1/2 -translate-y-1/2 left-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 cursor-pointer h-[28px] w-[28px] flex items-center justify-center disabled:opacity-50"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`p-1 rounded-lg h-[28px] w-[28px] flex items-center justify-center cursor-pointer ${currentPage === i + 1 ? "bg-[#0054A6] text-white" : "border border-slate-200 hover:bg-slate-50 text-slate-650"}`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 cursor-pointer h-[28px] w-[28px] flex items-center justify-center disabled:opacity-50"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-slate-400 font-medium">
            عرض {startIndex + 1} إلى {Math.min(startIndex + pageSize, totalUsers)} من أصل {totalUsers} مستخدم
          </div>
        </div>

      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden text-right">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <Users className="w-5 h-5 text-[#0054A6]" />
                <span>إضافة مستخدم جديد</span>
              </h3>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">الاسم الكامل</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="أحمد الإدريسي"
                    className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                    required
                  />
                  <User className="w-4 h-4 text-slate-450 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">البريد الإلكتروني</label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="user@goforvisa.ma"
                    className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                    required
                  />
                  <Mail className="w-4 h-4 text-slate-450 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">كلمة المرور</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                    required
                  />
                  <Lock className="w-4 h-4 text-slate-450 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">دور المستخدم</label>
                <div className="relative">
                  <select 
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-10 py-2.5 text-right text-xs font-bold text-slate-655 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
                  >
                    <option value="employee">موظف</option>
                  </select>
                  <Shield className="w-4 h-4 text-slate-450 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2 flex gap-3">
                <button 
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 py-3 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span>تأكيد الإضافة</span>
                  )}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-650 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden text-right">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <button 
                onClick={() => { setIsEditModalOpen(false); setEditingUser(null); }}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <Pencil className="w-4 h-4 text-[#0054A6]" />
                <span>تعديل بيانات المستخدم</span>
              </h3>
            </div>

            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">الاسم الكامل</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={editUserName}
                    onChange={(e) => setEditUserName(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                    required
                  />
                  <User className="w-4 h-4 text-slate-450 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Email (Readonly) */}
              <div className="space-y-1.5 opacity-60">
                <label className="text-xs font-bold text-slate-700 block">البريد الإلكتروني (غير قابل للتعديل)</label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={editingUser.email}
                    className="w-full pl-3 pr-10 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-right text-xs outline-none text-slate-500 font-bold cursor-not-allowed"
                    disabled
                  />
                  <Mail className="w-4 h-4 text-slate-450 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Role (Only for admin_users) */}
              {editingUser.dbTable === "admin_users" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">دور المستخدم</label>
                  <div className="relative">
                    <select 
                      value={editUserRole}
                      onChange={(e) => setEditUserRole(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-10 py-2.5 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
                    >
                      <option value="super_admin">مدير عام</option>
                      <option value="employee">موظف</option>
                    </select>
                    <Shield className="w-4 h-4 text-slate-450 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Submit */}
              <div className="pt-2 flex gap-3">
                <button 
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 py-3 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span>حفظ التعديلات</span>
                  )}
                </button>
                <button 
                  type="button"
                  onClick={() => { setIsEditModalOpen(false); setEditingUser(null); }}
                  className="flex-1 py-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-650 rounded-xl text-xs font-bold transition-all cursor-pointer"
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
