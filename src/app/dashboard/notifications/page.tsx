"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Clock,
  X
} from "lucide-react";

export default function NotificationsPage() {
  const { 
    notifications, 
    markAllAsRead, 
    deleteNotification 
  } = useApp();

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  return (
    <div className="space-y-6 font-sans max-w-4xl mx-auto">
      
      {/* Title & Top Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-gold-light text-accent-gold rounded-xl flex items-center justify-center shrink-0 border border-accent-gold/20 shadow-sm">
            <Bell className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h2 className="font-bold text-lg text-primary-navy">الإشعارات</h2>
            <p className="text-slate-400 text-xs font-medium">متابعة كافة التنبيهات، تحديثات الملفات وأخبار العمولات الخاصة بك</p>
          </div>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-slate-300 bg-white text-slate-600 hover:text-slate-800 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <CheckCheck className="w-4 h-4 text-green-500" />
            <span>تحديد الكل كمقروء</span>
          </button>
        )}
      </div>

      {/* Notifications List Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-2">
        <div className="divide-y divide-slate-50">
          {notifications.map((notif) => {
            const Icon = 
              notif.type === "success" ? CheckCircle : 
              notif.type === "warning" ? AlertTriangle : 
              Info;

            const iconColor = 
              notif.type === "success" ? "text-green-500 bg-green-50" : 
              notif.type === "warning" ? "text-amber-500 bg-amber-50" : 
              "text-blue-500 bg-blue-50";

            return (
              <div 
                key={notif.id}
                className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors relative ${
                  !notif.read ? "bg-accent-gold-light/10" : "hover:bg-slate-50/50"
                }`}
              >
                {/* Unread dot */}
                {!notif.read && (
                  <div className="absolute top-1/2 right-2 -translate-y-1/2 w-1.5 h-1.5 bg-accent-gold rounded-full"></div>
                )}

                <div className="flex items-start gap-4 pr-3">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 shadow-sm ${iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="space-y-1">
                    <p className={`text-slate-700 text-sm leading-relaxed ${!notif.read ? "font-semibold" : ""}`}>
                      {notif.text}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{notif.time}</span>
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-lg transition-all shrink-0"
                  title="حذف الإشعار"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}

          {notifications.length === 0 && (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-100 shadow-sm">
                <Bell className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-slate-700 text-sm">علبة الإشعارات فارغة</h4>
              <p className="text-slate-400 text-xs max-w-xs mx-auto leading-relaxed">لا توجد تنبيهات أو رسائل جديدة في الوقت الحالي.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
