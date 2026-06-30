"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { 
  Home, 
  Users, 
  Files, 
  UserSquare2, 
  DollarSign, 
  CreditCard, 
  BarChart3, 
  Bell, 
  Settings, 
  UserCheck, 
  History, 
  Headphones, 
  LogOut, 
  Menu, 
  X,
  Search,
  MessageSquare,
  ChevronDown,
  Mail,
  Globe,
  User
} from "lucide-react";

// GoForVisa stylized real logo (Globe + plane swoosh)
const GoForVisaLogo = ({ light = false }: { light?: boolean }) => {
  const textColor = light ? "text-[#0F172A]" : "text-white";
  return (
    <div className={`relative shrink-0 flex items-center justify-center ${textColor}`}>
      <svg className="w-[60px] h-[36px] overflow-visible" viewBox="0 0 135 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="45" cy="40" r="24" fill="none" stroke="currentColor" strokeWidth="1.8"></circle>
        <g fill="currentColor" opacity="0.85">
          <path d="M 45,18 C 47,18 49,20 48,22 C 46,23 44,22 43,21 Z"></path>
          <path d="M 32,25 C 33,22 36,22 38,25 C 41,27 46,25 48,27 C 50,30 46,35 44,38 C 42,40 45,43 43,45 C 40,46 38,43 36,41 C 34,39 31,37 32,35 Z"></path>
          <path d="M 43,45 C 44,48 46,51 47,54 C 48,58 49,61 48,64 C 47,65 45,65 44,63 C 43,61 41,58 40,56 C 39,53 41,50 42,48 Z"></path>
          <path d="M 56,26 C 60,24 64,26 66,28 C 65,30 63,32 64,34 C 65,37 68,36 67,40 C 65,42 60,40 59,42 C 58,45 61,48 60,51 C 58,54 54,53 53,50 C 52,46 54,42 53,38 C 52,34 54,29 56,26 Z"></path>
        </g>
        <defs>
          <linearGradient id="swooshGradHeader" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0054A6"></stop>
            <stop offset="100%" stopColor="#00A8FF"></stop>
          </linearGradient>
        </defs>
        <path d="M 15,48 C 15,65 45,78 75,55 C 88,45 102,30 115,15 C 98,28 85,38 72,45 C 48,58 25,58 15,48 Z" fill="url(#swooshGradHeader)"></path>
        <g transform="translate(112, 17) rotate(40)" fill="currentColor">
          <path d="M -8,0 L -2,-1.5 L 4,-1.5 L 1,-5 L 3,-5 L 7,-1.5 L 11,-1.5 L 13,0 L 11,1.5 L 7,1.5 L 3,5 L 1,5 L 4,1.5 L -2,1.5 L -8,0 Z"></path>
        </g>
      </svg>
    </div>
  );
};

function AdminSearchBarInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchVal = searchParams.get("search") || "";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const val = e.target.value;
    if (val) {
      params.set("search", val);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="hidden lg:flex items-center relative w-96">
      <input
        type="text"
        value={searchVal}
        onChange={handleSearchChange}
        placeholder="بحث عن شريك، عميل، ملف..."
        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-2xl text-right text-xs focus:bg-white focus:border-[#0054A6] focus:ring-1 focus:ring-[#0054A6] transition-all text-slate-700 placeholder:text-slate-400 font-medium"
      />
      <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5" />
    </div>
  );
}

function AdminSearchBar() {
  return (
    <Suspense fallback={<div className="w-96 h-9 bg-slate-50 rounded-2xl animate-pulse"></div>}>
      <AdminSearchBarInner />
    </Suspense>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("employee");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const isAdminLogin = pathname === "/admin/login";

  useEffect(() => {
    async function checkAdminAuth() {
      if (isAdminLogin) {
        setAuthChecked(true);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) {
        localStorage.removeItem("adminUser");
        router.push("/admin/login");
        return;
      }

      const email = session.user.email || "";
      const userRoleMeta = session.user.app_metadata?.role;
      const isUserAdmin = email.endsWith("@goforvisa.ma") || 
                          userRoleMeta === "admin" || 
                          userRoleMeta === "super_admin" || 
                          userRoleMeta === "employee";
      if (!isUserAdmin) {
        await supabase.auth.signOut();
        localStorage.removeItem("adminUser");
        router.push("/admin/login");
        return;
      }

      // Query the user's role from admin_users
      const { data: adminUserRec, error: queryErr } = await supabase
        .from("admin_users")
        .select("role, name")
        .eq("email", email)
        .single();

      if (queryErr) {
        console.error("Error querying admin_users:", queryErr);
      }

      let role = adminUserRec?.role;
      if (!role) {
        if (email.toLowerCase() === "admin@goforvisa.ma") {
          role = "super_admin";
        } else if (email.toLowerCase() === "employee@goforvisa.ma") {
          role = "employee";
        } else {
          role = "employee"; // default fallback
        }
      }
      setUserRole(role);

      const adminName = adminUserRec?.name || session.user.user_metadata?.name || "المسؤول";
      setAdminUser(adminName);

      // If the role is employee and trying to access unauthorized pages, redirect to files
      if (role === "employee" && pathname !== "/admin/files" && pathname !== "/admin/profile") {
        router.push("/admin/files");
        return;
      }

      setAuthChecked(true);
    }

    checkAdminAuth();
  }, [pathname, router, isAdminLogin]);

  const fetchUnreadCount = async () => {
    try {
      const { count, error } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("read", false);
      if (!error && count !== null) {
        setUnreadCount(count);
      }
    } catch (err) {
      console.error("Error fetching unread notification count:", err);
    }
  };

  useEffect(() => {
    if (!authChecked || isAdminLogin) return;

    fetchUnreadCount();

    // Subscribe to realtime database changes for notifications
    const channel = supabase
      .channel("admin_layout_notifications_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, () => {
        fetchUnreadCount();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [authChecked, isAdminLogin]);

  if (isAdminLogin) {
    return <div className="min-h-screen bg-[#F4F6F9]">{children}</div>;
  }

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F4F6F9]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0EA5E9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <span className="text-slate-500 font-medium">جاري التحقق من هوية المسؤول...</span>
        </div>
      </div>
    );
  }

  const allNavLinks = [
    { name: "الرئيسية", href: "/admin", icon: Home },
    { name: "الشركاء", href: "/admin/partners", icon: Users },
    { name: "الملفات", href: "/admin/files", icon: Files },
    { name: "العملاء", href: "/admin/clients", icon: UserSquare2 },
    { name: "العمولات والأرباح", href: "/admin/commissions", icon: DollarSign },
    { name: "طلبات السحب", href: "/admin/withdrawals", icon: CreditCard },
    { name: "التقارير والإحصائيات", href: "/admin/reports", icon: BarChart3 },
    { name: "الإشعارات", href: "/admin/notifications", icon: Bell, badge: unreadCount },
    { name: "إدارة المستخدمين", href: "/admin/users", icon: UserCheck },
    { name: "الملف الشخصي", href: "/admin/profile", icon: User },
  ];

  const navLinks = allNavLinks.filter(link => {
    if (userRole === "employee") {
      return link.href === "/admin/files" || link.href === "/admin/profile";
    }
    return true;
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FB] font-sans" dir="rtl">
      
      {/* 1. Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#001B5B] text-white shrink-0 border-l border-white/5 relative z-30">
        {/* Brand Header */}
        <div className="h-20 border-b border-white/10 flex items-center px-6 gap-3">
          <GoForVisaLogo />
          <div>
            <div className="flex items-center gap-0.5" dir="ltr">
              <span className="font-black italic text-base tracking-wide text-white">GOFOR</span>
              <span className="font-black italic text-base tracking-wide text-[#00A8FF]">VISA</span>
            </div>
            <span className="text-xs text-slate-400 block -mt-1 font-medium text-right">لوحة التحكم</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-semibold ${
                  isActive 
                    ? "bg-[#0054A6] text-white shadow-md shadow-[#0054A6]/15" 
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-[#00A8FF] transition-colors"}`} />
                  <span>{link.name}</span>
                </div>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isActive ? "bg-white text-[#0054A6]" : "bg-red-500 text-white"
                  }`}>
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 bg-transparent border border-red-500/30 hover:bg-red-500/10 rounded-xl transition-all duration-200 cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 relative z-20 shadow-xs">
          {/* Mobile elements (menu trigger and logo on the right in RTL) */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <GoForVisaLogo light={true} />
              <div className="text-right">
                <div className="flex items-center gap-0.5 leading-none" dir="ltr">
                  <span className="font-black italic text-sm tracking-wide text-primary-navy">GOFOR</span>
                  <span className="font-black italic text-sm tracking-wide text-[#00A8FF]">VISA</span>
                </div>
                <span className="text-[9px] text-slate-400 block font-bold leading-none mt-0.5">لوحة التحكم</span>
              </div>
            </div>
          </div>

          {/* Desktop Right: User Profile dropdown */}
          <div className="hidden lg:block relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-3 select-none hover:bg-slate-50 p-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <div className="text-right">
                <span className="font-extrabold text-xs block text-slate-800 leading-tight">
                  {adminUser || "أحمد الإدريسي"}
                </span>
                <span className="text-[9px] text-slate-400 font-bold block mt-0.5">
                  {userRole === "super_admin" ? "المدير العام" : userRole === "admin" ? "مدير العمليات" : "مسؤول الملفات"}
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-slate-600 mt-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 z-30 text-right">
                <Link href="/admin/profile" onClick={() => setProfileDropdownOpen(false)} className="block text-right px-4 py-2 text-xs font-semibold hover:bg-slate-50 text-slate-700">الملف الشخصي</Link>
                <div className="h-px bg-slate-100 my-1"></div>
                <button onClick={() => { setProfileDropdownOpen(false); handleLogout(); }} className="w-full text-right px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50">تسجيل الخروج</button>
              </div>
            )}
          </div>

          {/* Desktop Center: Search Bar */}
          <AdminSearchBar />

          {/* Desktop Left: Support messages & notifications */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Global / Language selector */}
            <button 
              className="p-2 text-slate-500 hover:text-[#0054A6] hover:bg-slate-50 rounded-full transition-colors border border-slate-100 cursor-pointer"
              title="اللغة / الإعدادات العالمية"
            >
              <Globe className="w-5 h-5" />
            </button>

            {/* Messages button removed */}

            {/* Notification trigger icon */}
            <Link 
              href="/admin/notifications" 
              className="relative p-2 text-slate-500 hover:text-[#0054A6] hover:bg-slate-50 rounded-full transition-colors border border-slate-100"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 text-white font-extrabold text-[9px] rounded-full flex items-center justify-center border border-white">
                  {unreadCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Profile Photo (on the far left in RTL) */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-650 mt-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
        </header>

        {/* Dashboard Subpage Content Wrapper */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* 3. Mobile Navigation Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          ></div>

          <aside className="relative flex flex-col w-72 max-w-xs bg-[#001B5B] text-white h-full shadow-2xl relative z-10 transition-transform duration-300">
            <div className="h-20 px-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GoForVisaLogo />
                <div>
                  <div className="flex items-center gap-0.5" dir="ltr">
                    <span className="font-black italic text-base tracking-wide text-white">GOFOR</span>
                    <span className="font-black italic text-base tracking-wide text-[#00A8FF]">VISA</span>
                  </div>
                  <span className="text-xs text-slate-400 block -mt-1 font-medium">لوحة التحكم</span>
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-semibold ${
                      isActive 
                        ? "bg-[#0054A6] text-white shadow-md" 
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 shrink-0" />
                      <span>{link.name}</span>
                    </div>
                    {link.badge !== undefined && link.badge > 0 && (
                      <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10">
              <button
                onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 bg-transparent border border-red-500/30 hover:bg-red-500/10 rounded-xl transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
