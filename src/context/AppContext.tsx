"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export interface Partner {
  name: string;
  company?: string;
  phone: string;
  email: string;
  city: string;
}

export interface ClientFile {
  id: string; // e.g. GFV-2024-000123
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
}

export interface PayoutTransaction {
  id: string;
  date: string;
  method: string;
  amount: number;
  status: "تم التحويل" | "قيد المراجعة" | "مرفوض" | "تم الدفع";
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
  paidCommissions: number;
  totalSales: number;
  receivedPayments: number;
  remainingPayments: number;
  login: (email: string, name?: string) => boolean;
  registerPartner: (partner: Partner) => void;
  logout: () => void;
  addClient: (client: Omit<ClientFile, "id" | "date" | "status" | "commission" | "totalFee" | "paid1st" | "paid2nd">) => void;
  requestWithdrawal: (amount: number, method: string) => { success: boolean; message: string };
  updateProfile: (profile: Partner) => void;
  saveBankInfo: (info: BankInfo) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// Initial Mock Data
const INITIAL_CLIENTS: ClientFile[] = [
  {
    id: "GFV-2024-000123",
    name: "زكرياء بنجلون",
    phone: "+212 6 61 23 45 67",
    email: "zakaria@gmail.com",
    nationality: "مغربية",
    dob: "1994-08-12",
    country: "الدنمارك",
    visaType: "سياحة",
    date: "2024-06-15",
    status: "تم الإنجاز",
    commission: 500,
    totalFee: 3000,
    paid1st: 1500,
    paid2nd: 1500,
  },
  {
    id: "GFV-2024-000124",
    name: "مريم الإدريسي",
    phone: "+212 6 62 98 76 54",
    email: "meriem.edr@hotmail.com",
    nationality: "مغربية",
    dob: "1990-03-22",
    country: "المملكة المتحدة",
    visaType: "سياحة",
    date: "2024-06-16",
    status: "قيد المعالجة",
    commission: 500,
    totalFee: 3000,
    paid1st: 1500,
    paid2nd: 0,
  },
  {
    id: "GFV-2024-000125",
    name: "عبد الرزاق الصفريوي",
    phone: "+212 6 71 44 55 66",
    email: "abderrazzak@outlook.fr",
    nationality: "مغربية",
    dob: "1985-11-05",
    country: "فرنسا",
    visaType: "سياحة",
    date: "2024-06-17",
    status: "في انتظار البيانات",
    commission: 500,
    totalFee: 3000,
    paid1st: 0,
    paid2nd: 0,
  },
  {
    id: "GFV-2024-000126",
    name: "محمد العلمي",
    phone: "+212 6 63 11 22 33",
    email: "m.alami@yahoo.com",
    nationality: "مغربية",
    dob: "1978-05-19",
    country: "كندا",
    visaType: "سياحة",
    date: "2024-06-18",
    status: "ملغى",
    commission: 0,
    totalFee: 3000,
    paid1st: 0,
    paid2nd: 0,
  }
];

const INITIAL_WITHDRAWALS: PayoutTransaction[] = [
  {
    id: "WD-2024-00015",
    date: "10 يونيو 2024 14:30",
    method: "تحويل بنكي",
    amount: 500,
    status: "تم الدفع",
    notes: "تم التحويل بنجاح"
  },
  {
    id: "WD-2024-00014",
    date: "01 يونيو 2024 10:15",
    method: "Cash Plus",
    amount: 1000,
    status: "تم الدفع",
    notes: "تم التحويل بنجاح"
  },
  {
    id: "WD-2024-00013",
    date: "25 مايو 2024 16:45",
    method: "Wafa Cash",
    amount: 500,
    status: "قيد المراجعة",
    notes: "جاري مراجعة الطلب"
  },
  {
    id: "WD-2024-00012",
    date: "15 مايو 2024 09:20",
    method: "تحويل بنكي",
    amount: 500,
    status: "مرفوض",
    notes: "بيانات الحساب غير صحيحة"
  },
  {
    id: "WD-2024-00011",
    date: "05 مايو 2024 11:30",
    method: "تحويل بنكي",
    amount: 2000,
    status: "تم الدفع",
    notes: "تم التحويل بنجاح"
  },
  {
    id: "WD-2024-00010",
    date: "25 أبريل 2024 14:00",
    method: "تحويل بنكي",
    amount: 1500,
    status: "تم الدفع",
    notes: "تم التحويل بنجاح"
  }
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    text: "تم تغيير حالة الملف رقم GFV-2024-000123 إلى تم الإنجاز",
    time: "منذ ساعتين",
    type: "success",
    read: false
  },
  {
    id: "notif-2",
    text: "تمت إضافة عمولة 500 درهم إلى رصيدك المعلق",
    time: "منذ يوم",
    type: "info",
    read: false
  },
  {
    id: "notif-3",
    text: "ملف العميل عبد الرزاق الصفريوي في انتظار كشف الحساب البنكي لتأكيد الطلب",
    time: "منذ يومين",
    type: "warning",
    read: false
  }
];

const INITIAL_BANK: BankInfo = {
  bankName: "البنك الشعبي (Banque Populaire)",
  holderName: "أحمد بن ياسين",
  rib: "123456789012345678901234"
};

const DEFAULT_PARTNER: Partner = {
  name: "أحمد بن ياسين",
  company: "شريك معتمد",
  phone: "+212 6 12 34 56 78",
  email: "partner@goforvisa.ma",
  city: "الدار البيضاء"
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [partner, setPartner] = useState<Partner | null>(null);
  const [clients, setClients] = useState<ClientFile[]>([]);
  const [withdrawals, setWithdrawals] = useState<PayoutTransaction[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [bankInfo, setBankInfo] = useState<BankInfo>(INITIAL_BANK);
  
  // Financial summaries computed based on lists + balance
  const [currentBalance, setCurrentBalance] = useState(2500);
  const [totalCommissions, setTotalCommissions] = useState(3000); // balance + pending
  const [paidCommissions, setPaidCommissions] = useState(5000);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPartner = localStorage.getItem("gfv_partner");
      const storedClients = localStorage.getItem("gfv_clients");
      const storedWithdrawals = localStorage.getItem("gfv_withdrawals");
      const storedNotifications = localStorage.getItem("gfv_notifications");
      const storedBank = localStorage.getItem("gfv_bank");
      const storedBalance = localStorage.getItem("gfv_balance");

      if (storedPartner) {
        setPartner(JSON.parse(storedPartner));
      } else {
        // Default login for easier demo navigation
        setPartner(DEFAULT_PARTNER);
        localStorage.setItem("gfv_partner", JSON.stringify(DEFAULT_PARTNER));
      }

      if (storedClients) {
        setClients(JSON.parse(storedClients));
      } else {
        setClients(INITIAL_CLIENTS);
        localStorage.setItem("gfv_clients", JSON.stringify(INITIAL_CLIENTS));
      }

      let needsMigration = false;
      if (storedWithdrawals) {
        const parsed = JSON.parse(storedWithdrawals);
        if (parsed.some((w: any) => w.id && w.id.startsWith("TXN-"))) {
          needsMigration = true;
          setWithdrawals(INITIAL_WITHDRAWALS);
          localStorage.setItem("gfv_withdrawals", JSON.stringify(INITIAL_WITHDRAWALS));
        } else {
          setWithdrawals(parsed);
        }
      } else {
        setWithdrawals(INITIAL_WITHDRAWALS);
        localStorage.setItem("gfv_withdrawals", JSON.stringify(INITIAL_WITHDRAWALS));
      }

      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      } else {
        setNotifications(INITIAL_NOTIFICATIONS);
        localStorage.setItem("gfv_notifications", JSON.stringify(INITIAL_NOTIFICATIONS));
      }

      if (storedBank) {
        setBankInfo(JSON.parse(storedBank));
      } else {
        setBankInfo(INITIAL_BANK);
        localStorage.setItem("gfv_bank", JSON.stringify(INITIAL_BANK));
      }

      if (storedBalance && !needsMigration && Number(storedBalance) !== 12000) {
        setCurrentBalance(Number(storedBalance));
      } else {
        setCurrentBalance(2500);
        localStorage.setItem("gfv_balance", "2500");
      }
    }
  }, []);

  // Update summaries when lists change
  useEffect(() => {
    // Paid commissions sum
    const paidSum = withdrawals
      .filter(w => w.status === "تم التحويل" || w.status === "تم الدفع")
      .reduce((sum, w) => sum + w.amount, 0);
    setPaidCommissions(paidSum);

    // Total commissions = current balance + pending withdrawals
    const pendingWithdrawalSum = withdrawals
      .filter(w => w.status === "قيد المراجعة")
      .reduce((sum, w) => sum + w.amount, 0);

    const totalCalculated = currentBalance + pendingWithdrawalSum;
    setTotalCommissions(totalCalculated);
    
    // Save state to localStorage on updates
    if (typeof window !== "undefined" && clients.length > 0) {
      localStorage.setItem("gfv_clients", JSON.stringify(clients));
      localStorage.setItem("gfv_withdrawals", JSON.stringify(withdrawals));
      localStorage.setItem("gfv_notifications", JSON.stringify(notifications));
      localStorage.setItem("gfv_balance", String(currentBalance));
    }
  }, [clients, withdrawals, notifications, currentBalance]);

  // Derived financials
  const totalSales = clients.length * 3000; // Mock service value 3000 DH per file
  const receivedPayments = clients.reduce((sum, c) => sum + c.paid1st + c.paid2nd, 0);
  const remainingPayments = totalSales - receivedPayments;

  // Actions
  const login = (email: string, name?: string): boolean => {
    const updatedPartner: Partner = {
      name: name || DEFAULT_PARTNER.name,
      company: DEFAULT_PARTNER.company,
      phone: DEFAULT_PARTNER.phone,
      email: email,
      city: DEFAULT_PARTNER.city,
    };
    setPartner(updatedPartner);
    if (typeof window !== "undefined") {
      localStorage.setItem("gfv_partner", JSON.stringify(updatedPartner));
    }
    return true;
  };

  const registerPartner = (partnerData: Partner) => {
    setPartner(partnerData);
    if (typeof window !== "undefined") {
      localStorage.setItem("gfv_partner", JSON.stringify(partnerData));
    }
  };

  const logout = () => {
    setPartner(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("gfv_partner");
    }
  };

  const addClient = (clientData: Omit<ClientFile, "id" | "date" | "status" | "commission" | "totalFee" | "paid1st" | "paid2nd">) => {
    const nextNum = 123 + clients.length;
    const fileId = `GFV-2024-000${nextNum}`;
    const newClient: ClientFile = {
      ...clientData,
      id: fileId,
      date: new Date().toISOString().split("T")[0],
      status: "قيد المعالجة",
      commission: 500,
      totalFee: 3000,
      paid1st: 1500, // assume first deposit paid
      paid2nd: 0,
    };

    const newNotification: NotificationItem = {
      id: `notif-${Date.now()}`,
      text: `تم تسجيل الملف الجديد للعميل ${clientData.name} بنجاح تحت المعالجة`,
      time: "منذ ثوانٍ",
      type: "info",
      read: false
    };

    setClients([newClient, ...clients]);
    setNotifications([newNotification, ...notifications]);
  };

  const requestWithdrawal = (amount: number, method: string): { success: boolean; message: string } => {
    if (amount <= 0) {
      return { success: false, message: "الرجاء إدخال مبلغ صحيح أكبر من الصفر." };
    }
    if (amount > currentBalance) {
      return { success: false, message: "عذراً، الرصيد الحالي غير كافٍ لإتمام عملية السحب." };
    }

    const nextNum = 10 + withdrawals.length;
    const nextId = `WD-2024-${String(nextNum).padStart(5, "0")}`;
    
    const now = new Date();
    const months = [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    const formattedDate = `${String(now.getDate()).padStart(2, "0")} ${months[now.getMonth()]} ${now.getFullYear()} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newTx: PayoutTransaction = {
      id: nextId,
      date: formattedDate,
      method: method,
      amount: amount,
      status: "قيد المراجعة",
      notes: "جاري مراجعة الطلب"
    };

    const newNotification: NotificationItem = {
      id: `notif-${Date.now()}`,
      text: `تم إرسال طلب سحب بقيمة ${amount} درهم عبر ${method} وهو قيد المراجعة`,
      time: "منذ ثوانٍ",
      type: "info",
      read: false
    };

    setWithdrawals([newTx, ...withdrawals]);
    setCurrentBalance(currentBalance - amount);
    setNotifications([newNotification, ...notifications]);
    
    return { success: true, message: "تم إرسال طلب السحب بنجاح. سيتم مراجعته وتحويله قريباً." };
  };

  const updateProfile = (profileData: Partner) => {
    setPartner(profileData);
    if (typeof window !== "undefined") {
      localStorage.setItem("gfv_partner", JSON.stringify(profileData));
    }
  };

  const saveBankInfo = (info: BankInfo) => {
    setBankInfo(info);
    if (typeof window !== "undefined") {
      localStorage.setItem("gfv_bank", JSON.stringify(info));
    }
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
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
        paidCommissions,
        totalSales,
        receivedPayments,
        remainingPayments,
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
