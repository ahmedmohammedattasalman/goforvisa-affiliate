"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { 
  Home, 
  UserPlus, 
  Files, 
  DollarSign, 
  CreditCard, 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  X,
  Compass,
  BarChart3,
  Settings,
  Headphones,
  ChevronDown,
  Globe
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

// Profile photo avatar placeholder
const UserAvatar = () => (
  <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 overflow-hidden flex items-center justify-center shrink-0">
    <svg className="w-7 h-7 text-amber-600 mt-1" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  </div>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { partner, logout, notifications, loading } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading) {
      if (!partner) {
        router.push("/login");
      } else {
        setAuthChecked(true);
      }
    }
  }, [partner, loading, router]);

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-light">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-navy border-t-accent-gold rounded-full animate-spin mx-auto mb-4"></div>
          <span className="text-slate-500 font-medium">جاري التحقق من الهوية...</span>
        </div>
      </div>
    );
  }

  // Navigation Links matching mockup exactly
  const navLinks = [
    {
      name: "الرئيسية",
      href: "/dashboard",
      icon: Home
    },
    {
      name: "إرسال عميل جديد",
      href: "/dashboard/new-client",
      icon: UserPlus
    },
    {
      name: "قائمة الملفات",
      href: "/dashboard/files",
      icon: Files
    },
    {
      name: "الأرباح والعمولات",
      href: "/dashboard/commissions",
      icon: DollarSign
    },
    {
      name: "سحب الأرباح",
      href: "/dashboard/payments",
      icon: CreditCard
    },
    {
      name: "الإشعارات",
      href: "/dashboard/notifications",
      icon: Bell,
      badge: notifications.filter(n => !n.read).length
    },
    {
      name: "الملف الشخصي",
      href: "/dashboard/profile",
      icon: User
    }
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-bg-light" dir="rtl">
      
      {/* 1. Sidebar for Desktop (Right side in RTL) */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#0F172A] text-white shrink-0 border-l border-white/5 relative z-30">
        {/* Brand Header */}
        <div className="h-20 border-b border-white/10 flex items-center px-6 gap-3">
          <GoForVisaLogo />
          <div>
            <div className="flex items-center gap-0.5" dir="ltr">
              <span className="font-black italic text-base tracking-wide text-white">GOFOR</span>
              <span className="font-black italic text-base tracking-wide text-[#00A8FF]">VISA</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[6.5px] text-slate-400 block tracking-[0.16em] font-extrabold" dir="ltr">VISA • TRAVEL • SUCCESS</span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <span className="text-[9px] text-blue-400 font-extrabold">بوابة الشركاء</span>
            </div>
          </div>
        </div>

        {/* Sidebar Nav links */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-semibold ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/15" 
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-amber-500 transition-colors"}`} />
                  <span>{link.name}</span>
                </div>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isActive ? "bg-blue-800 text-white" : "bg-red-500 text-white"
                  }`}>
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Support Help Card */}
        <div className="p-4 mx-4 mb-4 bg-slate-800/40 border border-slate-700/30 rounded-2xl space-y-3">
          <div className="space-y-1">
            <span className="font-extrabold text-xs block text-white text-right">تحتاج مساعدة؟</span>
            <span className="text-[10px] text-slate-400 block text-right leading-normal font-medium">فريق الدعم متاح لمساعدتك</span>
          </div>
          <Link
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>تواصل معنا</span>
          </Link>
        </div>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-400 hover:bg-white/5 hover:text-red-300 rounded-xl transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 relative z-20 shadow-sm">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo only on mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <GoForVisaLogo light={true} />
            <div className="text-right">
              <div className="flex items-center gap-0.5 leading-none" dir="ltr">
                <span className="font-black italic text-sm tracking-wide text-primary-navy">GOFOR</span>
                <span className="font-black italic text-sm tracking-wide text-[#00A8FF]">VISA</span>
              </div>
              <span className="text-[7.5px] text-slate-400 block font-bold leading-none mt-0.5">بوابة الشركاء</span>
            </div>
          </div>

          {/* Left/Empty space for alignment on Desktop */}
          <div className="hidden lg:block"></div>

          {/* Top Navbar Left Actions (RTL: renders on the left side of header) */}
          <div className="flex items-center gap-4">
            
            {/* Notification trigger icon */}
            <Link 
              href="/dashboard/notifications" 
              className="relative p-2 text-slate-500 hover:text-primary-navy hover:bg-slate-50 rounded-full transition-colors border border-slate-100"
            >
              <Bell className="w-5 h-5" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-red-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center border-2 border-white">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </Link>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200/60 rounded-xl hover:bg-slate-100 transition-colors text-slate-700 text-xs font-bold"
              >
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                <span>العربية</span>
                <Globe className="w-4 h-4 text-slate-500" />
              </button>
              {langDropdownOpen && (
                <div className="absolute left-0 mt-2 w-32 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-30 text-right">
                  <button onClick={() => setLangDropdownOpen(false)} className="w-full text-right px-4 py-2 text-xs font-semibold hover:bg-slate-50 text-slate-700">العربية</button>
                  <button onClick={() => setLangDropdownOpen(false)} className="w-full text-right px-4 py-2 text-xs font-semibold hover:bg-slate-50 text-slate-700">English</button>
                  <button onClick={() => setLangDropdownOpen(false)} className="w-full text-right px-4 py-2 text-xs font-semibold hover:bg-slate-50 text-slate-700">Français</button>
                </div>
              )}
            </div>

            {/* Vertically split divider */}
            <div className="h-6 w-px bg-slate-200"></div>

            {/* User Profile dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 select-none hover:bg-slate-50 p-1.5 rounded-xl transition-colors"
              >
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                <div className="hidden sm:block text-right">
                  <span className="font-extrabold text-xs block text-slate-800 leading-tight">
                    {partner?.name || "أحمد بن ياسين"}
                  </span>
                  <span className="text-[9px] text-slate-400 font-bold block mt-0.5">
                    {partner?.company || "شريك معتمد"}
                  </span>
                </div>
                <UserAvatar />
              </button>
              {profileDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 z-30 text-right">
                  <Link href="/dashboard/profile" onClick={() => setProfileDropdownOpen(false)} className="block text-right px-4 py-2 text-xs font-semibold hover:bg-slate-50 text-slate-700">الملف الشخصي</Link>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <button onClick={() => { setProfileDropdownOpen(false); handleLogout(); }} className="w-full text-right px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50">تسجيل الخروج</button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Dashboard Subpage Content Wrapper */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* 3. Slide-over Mobile Navigation Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          ></div>

          <aside className="relative flex flex-col w-72 max-w-xs bg-[#0F172A] text-white h-full shadow-2xl relative z-10 transition-transform duration-300">
            <div className="h-20 px-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GoForVisaLogo />
                <div>
                  <div className="flex items-center gap-0.5" dir="ltr">
                    <span className="font-black italic text-base tracking-wide text-white">GOFOR</span>
                    <span className="font-black italic text-base tracking-wide text-[#00A8FF]">VISA</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[6.5px] text-slate-400 block tracking-[0.16em] font-extrabold" dir="ltr">VISA • TRAVEL • SUCCESS</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                    <span className="text-[9px] text-blue-400 font-extrabold">بوابة الشركاء</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
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
                        ? "bg-blue-600 text-white shadow-md" 
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 shrink-0" />
                      <span>{link.name}</span>
                    </div>
                    {link.badge !== undefined && link.badge > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        isActive ? "bg-blue-800 text-white" : "bg-red-500 text-white"
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Support Card */}
            <div className="p-4 mx-4 mb-4 bg-slate-800/40 border border-slate-700/30 rounded-2xl space-y-3">
              <div className="space-y-1">
                <span className="font-extrabold text-xs block text-white text-right">تحتاج مساعدة؟</span>
                <span className="text-[10px] text-slate-400 block text-right leading-normal font-medium">فريق الدعم متاح لمساعدتك</span>
              </div>
              <Link
                href="https://wa.me/212600000000"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>تواصل معنا</span>
              </Link>
            </div>

            <div className="p-4 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-400 hover:bg-white/5 hover:text-red-300 rounded-xl"
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
