"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  Bell, 
  Settings, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  Users, 
  Handshake, 
  Folder, 
  CreditCard,
  Check,
  Trash2
} from "lucide-react";

export default function AdminNotifications() {
  const [toggles, setToggles] = useState({
    files: true,
    withdrawals: true,
    clients: true,
    partners: true,
    earnings: true,
    reports: true
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "تسجيل شريك جديد",
      desc: "قام شريك جديد بالتسجيل في المنصة: Travel Anamer",
      time: "منذ 5 دقائق",
      type: "partner",
      unread: true,
      icon: <Handshake className="w-4 h-4 text-emerald-600" />,
      bgClass: "bg-emerald-50 border-emerald-100"
    },
    {
      id: 2,
      title: "طلب سحب جديد",
      desc: "طلب سحب جديد بقيمة 4,500.00 DH من الشريك Go Mosafer",
      time: "منذ 15 دقيقة",
      type: "withdrawal",
      unread: true,
      icon: <CreditCard className="w-4 h-4 text-blue-600" />,
      bgClass: "bg-blue-50 border-blue-100"
    },
    {
      id: 3,
      title: "تحديث حالة ملف",
      desc: "تم تحديث حالة الملف #2024-085 إلى مكتمل بواسطة النظام",
      time: "منذ 1 ساعة",
      type: "file",
      unread: true,
      icon: <Folder className="w-4 h-4 text-purple-600" />,
      bgClass: "bg-purple-50 border-purple-100"
    },
    {
      id: 4,
      title: "تسجيل عميل جديد",
      desc: "عميل جديد تم تسجيله بواسطة الشريك Eagle Tourism",
      time: "منذ 2 ساعتين",
      type: "client",
      unread: true,
      icon: <Users className="w-4 h-4 text-blue-600" />,
      bgClass: "bg-blue-50 border-blue-100"
    },
    {
      id: 5,
      title: "دفع عمولة",
      desc: "تم دفع عمولة الشريك Nile Travel بقيمة 2,800.00 DH بنجاح",
      time: "منذ 5 ساعات",
      type: "earnings",
      unread: false,
      icon: <DollarSign className="w-4 h-4 text-amber-600" />,
      bgClass: "bg-amber-50 border-amber-100"
    },
    {
      id: 6,
      title: "تنبيه طلب سحب معلق",
      desc: "طلب سحب للشريك Atlas Travel قيد الانتظار لأكثر من 48 ساعة",
      time: "منذ يوم واحد",
      type: "alert",
      unread: false,
      icon: <AlertCircle className="w-4 h-4 text-rose-600" />,
      bgClass: "bg-rose-50 border-rose-100"
    },
    {
      id: 7,
      title: "تحديث إعدادات النظام",
      desc: "تم تحديث إعدادات الأمان ونظام العمولات بواسطة المدير العام أحمد الإدريسي",
      time: "منذ يومين",
      type: "settings",
      unread: false,
      icon: <Settings className="w-4 h-4 text-slate-600" />,
      bgClass: "bg-slate-50 border-slate-100"
    },
    {
      id: 8,
      title: "تصدير تقرير شهري",
      desc: "تم إصدار التقرير الشهري للأداء بنجاح وجاهز للتحميل",
      time: "منذ 3 أيام",
      type: "report",
      unread: false,
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      bgClass: "bg-emerald-50 border-emerald-100"
    }
  ]);

  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-1.5">
            <Link href="/admin" className="hover:text-[#0054A6]">الرئيسية</Link>
            <span className="mx-1">/</span>
            <span>الإشعارات</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-700 shadow-xs">
              <Bell className="w-5 h-5 text-[#0054A6]" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800">الإشعارات</h1>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">إدارة إعدادات وسجل التنبيهات الخاصة بالنظام</p>
        </div>
      </div>

      {/* Grid: Notifications settings and Notification list */}
      <div className="space-y-6">
        
        {/* Settings Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-6">
          <div className="pb-3 border-b border-slate-100 text-right">
            <h3 className="font-extrabold text-slate-800 text-sm">إعدادات الإشعارات</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            
            {/* Right Column in RTL: Files, Withdrawals, Clients */}
            <div className="space-y-6">
              
              {/* Setting 1: Files */}
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="text-right">
                  <span className="font-extrabold text-xs text-slate-800 block">إشعارات الملفات الجديدة</span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">تلقي إشعار عند إضافة ملف جديد</span>
                </div>
                <button 
                  onClick={() => setToggles({ ...toggles, files: !toggles.files })}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 outline-none ${
                    toggles.files ? "bg-[#0054A6] justify-end" : "bg-slate-200 justify-start"
                  }`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200" />
                </button>
              </div>

              {/* Setting 2: Withdrawals */}
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="text-right">
                  <span className="font-extrabold text-xs text-slate-800 block">إشعارات طلبات السحب</span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">تلقي إشعار عند وصول طلب سحب جديد</span>
                </div>
                <button 
                  onClick={() => setToggles({ ...toggles, withdrawals: !toggles.withdrawals })}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 outline-none ${
                    toggles.withdrawals ? "bg-[#0054A6] justify-end" : "bg-slate-200 justify-start"
                  }`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200" />
                </button>
              </div>

              {/* Setting 3: Clients */}
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="text-right">
                  <span className="font-extrabold text-xs text-slate-800 block">إشعارات العملاء</span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">تلقي إشعار عند إضافة عميل جديد</span>
                </div>
                <button 
                  onClick={() => setToggles({ ...toggles, clients: !toggles.clients })}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 outline-none ${
                    toggles.clients ? "bg-[#0054A6] justify-end" : "bg-slate-200 justify-start"
                  }`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200" />
                </button>
              </div>

            </div>

            {/* Left Column in RTL: Partners, Earnings, Reports */}
            <div className="space-y-6">

              {/* Setting 4: Partners */}
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="text-right">
                  <span className="font-extrabold text-xs text-slate-800 block">إشعارات الشركاء</span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">تلقي إشعار عند إضافة شريك جديد</span>
                </div>
                <button 
                  onClick={() => setToggles({ ...toggles, partners: !toggles.partners })}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 outline-none ${
                    toggles.partners ? "bg-[#0054A6] justify-end" : "bg-slate-200 justify-start"
                  }`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200" />
                </button>
              </div>

              {/* Setting 5: Earnings */}
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="text-right">
                  <span className="font-extrabold text-xs text-slate-800 block">إشعارات الأرباح والعمولات</span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">تلقي إشعار عند تحديث الأرباح والعمولات</span>
                </div>
                <button 
                  onClick={() => setToggles({ ...toggles, earnings: !toggles.earnings })}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 outline-none ${
                    toggles.earnings ? "bg-[#0054A6] justify-end" : "bg-slate-200 justify-start"
                  }`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200" />
                </button>
              </div>

              {/* Setting 6: Reports */}
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="text-right">
                  <span className="font-extrabold text-xs text-slate-800 block">التقارير الدورية</span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">استلام التقارير الدورية عبر البريد الإلكتروني</span>
                </div>
                <button 
                  onClick={() => setToggles({ ...toggles, reports: !toggles.reports })}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 outline-none ${
                    toggles.reports ? "bg-[#0054A6] justify-end" : "bg-slate-200 justify-start"
                  }`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Notifications List Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div className="flex gap-2">
              <button 
                onClick={handleClearAll}
                className="text-xs font-bold text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
              >
                حذف الكل
              </button>
              <span className="text-slate-200">|</span>
              <button 
                onClick={handleMarkAllRead}
                className="text-xs font-bold text-[#0054A6] hover:underline cursor-pointer transition-colors"
              >
                تحديد الكل كمقروء
              </button>
            </div>
            <h3 className="font-extrabold text-slate-800 text-sm">سجل الأنشطة والإشعارات</h3>
          </div>

          <div className="divide-y divide-slate-50">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs font-medium">
                لا توجد إشعارات حالياً.
              </div>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className={`py-4 flex items-center justify-between gap-4 transition-colors ${notif.unread ? "bg-slate-50/40 px-3 rounded-2xl border border-slate-100/50 mb-1" : "px-3 rounded-2xl border border-transparent mb-1"}`}>
                  
                  {/* Actions: Mark as Read & Delete */}
                  <div className="flex items-center gap-2">
                    {notif.unread && (
                      <button 
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="p-1.5 text-slate-400 hover:text-[#0054A6] hover:bg-white rounded-lg border border-slate-200/50 shadow-2xs cursor-pointer"
                        title="تحديد كمقروء"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(notif.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg border border-slate-200/50 shadow-2xs cursor-pointer"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {notif.unread && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      )}
                      <span className="font-extrabold text-xs text-slate-800">{notif.title}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium mt-1 leading-relaxed">{notif.desc}</p>
                    <span className="text-[8px] text-slate-400 font-bold block mt-1.5">{notif.time}</span>
                  </div>

                  {/* Icon Container */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-slate-100/50 ${notif.bgClass}`}>
                    {notif.icon}
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
