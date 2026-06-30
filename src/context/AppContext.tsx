"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

// Types
export interface Partner {
  name: string;
  company?: string;
  phone: string;
  email: string;
  city: string;
}

export interface ClientFile {
  id: string; // Map file_number (e.g. GFV-2024-000123) to id for UI compat
  dbId: string; // The database UUID
  name: string;
  phone: string;
  email: string;
  nationality: string;
  dob: string;
  country: string;
  visaType: string;
  date: string;
  status: "تم الإنجاز" | "قيد المعالجة" | "في انتظار البيانات" | "ملغى";
  commission: number;
  totalFee: number;
  paid1st: number;
  paid2nd: number;
  notes?: string;
  city?: string;
  job?: string;
  cnss?: string;
  prevRejection?: string;
}

export interface PayoutTransaction {
  id: string;
  date: string;
  method: string;
  amount: number;
  status: "تم التحويل" | "قيد المراجعة" | "مرفوض" | "تم الدفع" | "قيد المعالجة";
  notes?: string;
}

export interface NotificationItem {
  id: string;
  text: string;
  time: string;
  type: "success" | "info" | "warning";
  read: boolean;
}

export interface BankInfo {
  bankName: string;
  holderName: string;
  rib: string;
}

interface AppContextProps {
  partner: Partner | null;
  clients: ClientFile[];
  withdrawals: PayoutTransaction[];
  notifications: NotificationItem[];
  bankInfo: BankInfo;
  currentBalance: number;
  totalCommissions: number;
  pendingCommissions: number;
  paidCommissions: number;
  totalSales: number;
  receivedPayments: number;
  remainingPayments: number;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  registerPartner: (partner: Partner, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  addClient: (client: Omit<ClientFile, "id" | "dbId" | "date" | "status" | "commission" | "totalFee" | "paid1st" | "paid2nd">) => Promise<void>;
  requestWithdrawal: (amount: number, method: string) => Promise<{ success: boolean; message: string }>;
  updateProfile: (profile: Partner) => Promise<void>;
  saveBankInfo: (info: BankInfo) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const DEFAULT_BANK: BankInfo = {
  bankName: "",
  holderName: "",
  rib: ""
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [clients, setClients] = useState<ClientFile[]>([]);
  const [withdrawals, setWithdrawals] = useState<PayoutTransaction[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [bankInfo, setBankInfo] = useState<BankInfo>(DEFAULT_BANK);
  const [loading, setLoading] = useState(true);

  // Load data for the active user
  const fetchAllData = async (userId: string) => {
    try {
      // 1. Fetch partner profile
      const { data: partnerData, error: partnerErr } = await supabase
        .from("partners")
        .select("*")
        .eq("id", userId)
        .single();
      
      if (partnerErr) {
        // eslint-disable-next-line no-console
        console.warn("Error fetching partner profile:", partnerErr.message);
      } else if (partnerData) {
        setPartner({
          name: partnerData.name,
          company: partnerData.company || undefined,
          phone: partnerData.phone,
          email: partnerData.email,
          city: partnerData.city
        });
      }

      // 2. Fetch bank info
      const { data: bankData } = await supabase
        .from("bank_info")
        .select("*")
        .eq("partner_id", userId)
        .maybeSingle();

      if (bankData) {
        setBankInfo({
          bankName: bankData.bank_name,
          holderName: bankData.holder_name,
          rib: bankData.rib
        });
      } else {
        setBankInfo(DEFAULT_BANK);
      }

      // 3. Fetch client files
      const { data: clientsData } = await supabase
        .from("clients")
        .select("*")
        .eq("partner_id", userId)
        .order("created_at", { ascending: false });

      if (clientsData) {
        setClients(
          clientsData.map((c: any) => ({
            id: c.file_number,
            dbId: c.id,
            name: c.name,
            phone: c.phone,
            email: c.email,
            nationality: c.nationality,
            dob: c.dob,
            country: c.country,
            visaType: c.visa_type,
            date: c.created_at.split("T")[0],
            status: c.status,
            commission: Number(c.commission),
            totalFee: Number(c.total_fee),
            paid1st: Number(c.paid_1st),
            paid2nd: Number(c.paid_2nd),
            notes: c.notes || undefined,
            city: c.city || undefined,
            job: c.job || undefined,
            cnss: c.cnss || undefined,
            prevRejection: c.prev_rejection || undefined
          }))
        );
      }

      // 4. Fetch payout requests
      const { data: payoutsData } = await supabase
        .from("payouts")
        .select("*")
        .eq("partner_id", userId)
        .order("created_at", { ascending: false });

      if (payoutsData) {
        setWithdrawals(
          payoutsData.map((p: any) => ({
            id: p.id,
            date: new Date(p.created_at).toLocaleString("ar-EG", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }),
            method: p.method,
            amount: Number(p.amount),
            status: p.status,
            notes: p.notes || undefined
          }))
        );
      }

      // 5. Fetch notifications
      const { data: notifData } = await supabase
        .from("notifications")
        .select("*")
        .eq("partner_id", userId)
        .order("created_at", { ascending: false });

      if (notifData) {
        setNotifications(
          notifData.map((n: any) => ({
            id: n.id,
            text: n.text,
            time: new Date(n.created_at).toLocaleDateString("ar-EG", {
              month: "short",
              day: "numeric"
            }),
            type: n.type,
            read: n.read
          }))
        );
      }

    } catch (err) {
      console.error("Error loading application state:", err);
    }
  };

  // Auth session subscriber
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSessionUser(session.user);
        fetchAllData(session.user.id).then(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSessionUser(session.user);
        fetchAllData(session.user.id);
      } else {
        setSessionUser(null);
        setPartner(null);
        setClients([]);
        setWithdrawals([]);
        setNotifications([]);
        setBankInfo(DEFAULT_BANK);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Realtime subscription subscriber
  useEffect(() => {
    if (!sessionUser?.id) return;

    const userId = sessionUser.id;

    // Listen to changes on clients, payouts, notifications, bank_info, and partners
    const channel = supabase
      .channel(`realtime_db_changes_${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "clients",
          filter: `partner_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Realtime update for clients:", payload);
          fetchAllData(userId);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "payouts",
          filter: `partner_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Realtime update for payouts:", payload);
          fetchAllData(userId);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `partner_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Realtime update for notifications:", payload);
          fetchAllData(userId);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "partners",
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          console.log("Realtime update for partners:", payload);
          fetchAllData(userId);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bank_info",
          filter: `partner_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Realtime update for bank_info:", payload);
          fetchAllData(userId);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionUser?.id]);

  // Derived financial summaries
  const totalSales = clients.reduce((sum, c) => sum + c.totalFee, 0);
  const receivedPayments = clients.reduce((sum, c) => sum + c.paid1st + c.paid2nd, 0);
  const remainingPayments = totalSales - receivedPayments;

  const totalCommissions = clients
    .filter(c => c.status !== "ملغى")
    .reduce((sum, c) => sum + c.commission, 0);

  const availableCommissions = clients
    .filter(c => c.status === "تم الإنجاز")
    .reduce((sum, c) => sum + c.commission, 0);

  const pendingCommissions = clients
    .filter(c => c.status === "قيد المعالجة" || c.status === "في انتظار البيانات")
    .reduce((sum, c) => sum + c.commission, 0);

  const paidCommissions = withdrawals
    .filter(w => w.status === "تم التحويل" || w.status === "تم الدفع")
    .reduce((sum, w) => sum + w.amount, 0);

  const pendingWithdrawalSum = withdrawals
    .filter(w => w.status === "قيد المراجعة")
    .reduce((sum, w) => sum + w.amount, 0);

  const currentBalance = Math.max(0, availableCommissions - paidCommissions - pendingWithdrawalSum);

  // Actions
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const registerPartner = async (partnerData: Partner, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: partnerData.email,
        password,
        options: {
          data: {
            name: partnerData.name,
            phone: partnerData.phone,
            city: partnerData.city,
            company: partnerData.company || ""
          }
        }
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const addClient = async (clientData: Omit<ClientFile, "id" | "dbId" | "date" | "status" | "commission" | "totalFee" | "paid1st" | "paid2nd">) => {
    if (!sessionUser) return;
    try {
      // 1. Insert new client record (sequential GFV file_number auto-generated by DB trigger)
      const { error: clientErr } = await supabase
        .from("clients")
        .insert({
          partner_id: sessionUser.id,
          name: clientData.name,
          phone: clientData.phone,
          email: clientData.email,
          nationality: clientData.nationality,
          dob: clientData.dob,
          country: clientData.country,
          visa_type: clientData.visaType,
          city: clientData.city,
          job: clientData.job,
          cnss: clientData.cnss,
          prev_rejection: clientData.prevRejection,
          notes: clientData.notes
        });

      if (clientErr) throw clientErr;

      // 2. Insert notification
      await supabase
        .from("notifications")
        .insert({
          partner_id: sessionUser.id,
          text: `تم تسجيل الملف الجديد للعميل ${clientData.name} بنجاح تحت المعالجة`,
          type: "info"
        });

      // 3. Refresh application state
      await fetchAllData(sessionUser.id);
    } catch (err) {
      console.error("Error adding client file:", err);
    }
  };

  const requestWithdrawal = async (amount: number, method: string): Promise<{ success: boolean; message: string }> => {
    if (!sessionUser) return { success: false, message: "مستخدم غير مسجل." };
    if (amount <= 0) {
      return { success: false, message: "الرجاء إدخال مبلغ صحيح أكبر من الصفر." };
    }
    if (amount > currentBalance) {
      return { success: false, message: "عذراً، الرصيد الحالي غير كافٍ لإتمام عملية السحب." };
    }

    try {
      // 1. Insert payout request
      const { error: payoutErr } = await supabase
        .from("payouts")
        .insert({
          partner_id: sessionUser.id,
          amount,
          method,
          status: "قيد المراجعة",
          notes: "جاري مراجعة الطلب"
        });

      if (payoutErr) throw payoutErr;

      // 2. Insert notification
      await supabase
        .from("notifications")
        .insert({
          partner_id: sessionUser.id,
          text: `تم إرسال طلب سحب بقيمة ${amount} درهم عبر ${method} وهو قيد المراجعة`,
          type: "info"
        });

      // 3. Refresh state
      await fetchAllData(sessionUser.id);
      
      return { success: true, message: "تم إرسال طلب السحب بنجاح. سيتم مراجعته وتحويله قريباً." };
    } catch (err) {
      console.error("Error requesting withdrawal:", err);
      return { success: false, message: "حدث خطأ غير متوقع أثناء إرسال الطلب." };
    }
  };

  const updateProfile = async (profileData: Partner) => {
    if (!sessionUser) return;
    try {
      const { error } = await supabase
        .from("partners")
        .update({
          name: profileData.name,
          phone: profileData.phone,
          city: profileData.city,
          company: profileData.company || ""
        })
        .eq("id", sessionUser.id);

      if (error) throw error;
      await fetchAllData(sessionUser.id);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const saveBankInfo = async (info: BankInfo) => {
    if (!sessionUser) return;
    try {
      const { error } = await supabase
        .from("bank_info")
        .upsert({
          partner_id: sessionUser.id,
          bank_name: info.bankName,
          holder_name: info.holderName,
          rib: info.rib
        });

      if (error) throw error;
      await fetchAllData(sessionUser.id);
    } catch (err) {
      console.error("Error saving bank info:", err);
    }
  };

  const markAllAsRead = async () => {
    if (!sessionUser) return;
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("partner_id", sessionUser.id)
        .eq("read", false);

      if (error) throw error;
      await fetchAllData(sessionUser.id);
    } catch (err) {
      console.error("Error marking notifications read:", err);
    }
  };

  const deleteNotification = async (id: string) => {
    if (!sessionUser) return;
    try {
      const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", id)
        .eq("partner_id", sessionUser.id);

      if (error) throw error;
      await fetchAllData(sessionUser.id);
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        partner,
        clients,
        withdrawals,
        notifications,
        bankInfo,
        currentBalance,
        totalCommissions,
        pendingCommissions,
        paidCommissions,
        totalSales,
        receivedPayments,
        remainingPayments,
        loading,
        login,
        registerPartner,
        logout,
        addClient,
        requestWithdrawal,
        updateProfile,
        saveBankInfo,
        markAllAsRead,
        deleteNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
