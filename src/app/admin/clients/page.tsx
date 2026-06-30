"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  Calendar, 
  FileSpreadsheet, 
  Eye, 
  Pencil, 
  Trash2, 
  MoreHorizontal, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown,
  UserSquare2,
  X,
  Phone,
  Mail,
  User,
  MapPin,
  Globe,
  Briefcase,
  FileText,
  DollarSign,
  FileCheck,
  Building
} from "lucide-react";

// Crisp Circular SVG Flags matching premium design system
const UkFlag = () => (
  <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200/60 inline-flex shrink-0">
    <svg viewBox="0 0 50 30" className="w-full h-full object-cover">
      <rect width="50" height="30" fill="#012169" />
      <path d="M 0,0 L 50,30 M 0,30 L 50,0" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M 0,0 L 50,30 M 0,30 L 50,0" stroke="#C8102E" strokeWidth="4" />
      <path d="M 25,0 L 25,30 M 0,15 L 50,15" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M 25,0 L 25,30 M 0,15 L 50,15" stroke="#C8102E" strokeWidth="6" />
    </svg>
  </div>
);

const CanadaFlag = () => (
  <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200/60 inline-flex shrink-0">
    <svg viewBox="0 0 240 120" className="w-full h-full object-cover">
      <rect width="60" height="120" fill="#D80027" />
      <rect x="60" width="120" height="120" fill="#FFFFFF" />
      <rect x="180" width="60" height="120" fill="#D80027" />
      <path d="M 120,32 L 123,43 L 131,39 L 128,48 L 137,49 L 128,55 L 132,66 L 123,61 L 122,85 L 118,85 L 117,61 L 108,66 L 112,55 L 103,49 L 112,48 L 109,39 L 117,43 Z" fill="#D80027" />
    </svg>
  </div>
);

const UsaFlag = () => (
  <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200/60 inline-flex shrink-0">
    <svg viewBox="0 0 76 40" className="w-full h-full object-cover">
      <rect width="76" height="40" fill="#FFFFFF" />
      <rect width="76" height="3.08" fill="#B22234" />
      <rect y="6.15" width="76" height="3.08" fill="#B22234" />
      <rect y="12.31" width="76" height="3.08" fill="#B22234" />
      <rect y="18.46" width="76" height="3.08" fill="#B22234" />
      <rect y="24.62" width="76" height="3.08" fill="#B22234" />
      <rect y="30.77" width="76" height="3.08" fill="#B22234" />
      <rect y="36.92" width="76" height="3.08" fill="#B22234" />
      <rect width="30.4" height="21.54" fill="#3C3B6E" />
      <circle cx="5" cy="4" r="1" fill="#FFFFFF" />
      <circle cx="10" cy="4" r="1" fill="#FFFFFF" />
      <circle cx="15" cy="4" r="1" fill="#FFFFFF" />
      <circle cx="20" cy="4" r="1" fill="#FFFFFF" />
      <circle cx="25" cy="4" r="1" fill="#FFFFFF" />
      <circle cx="7.5" cy="8" r="1" fill="#FFFFFF" />
      <circle cx="12.5" cy="8" r="1" fill="#FFFFFF" />
      <circle cx="17.5" cy="8" r="1" fill="#FFFFFF" />
      <circle cx="22.5" cy="8" r="1" fill="#FFFFFF" />
      <circle cx="5" cy="12" r="1" fill="#FFFFFF" />
      <circle cx="10" cy="12" r="1" fill="#FFFFFF" />
      <circle cx="15" cy="12" r="1" fill="#FFFFFF" />
      <circle cx="20" cy="12" r="1" fill="#FFFFFF" />
      <circle cx="25" cy="12" r="1" fill="#FFFFFF" />
      <circle cx="7.5" cy="16" r="1" fill="#FFFFFF" />
      <circle cx="12.5" cy="16" r="1" fill="#FFFFFF" />
      <circle cx="17.5" cy="16" r="1" fill="#FFFFFF" />
      <circle cx="22.5" cy="16" r="1" fill="#FFFFFF" />
    </svg>
  </div>
);

const DenmarkFlag = () => (
  <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200/60 inline-flex shrink-0">
    <svg viewBox="0 0 37 28" className="w-full h-full object-cover">
      <rect width="37" height="28" fill="#C8102E" />
      <rect x="12" width="4" height="28" fill="#FFFFFF" />
      <rect y="12" width="37" height="4" fill="#FFFFFF" />
    </svg>
  </div>
);

const AustraliaFlag = () => (
  <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200/60 inline-flex shrink-0">
    <svg viewBox="0 0 80 40" className="w-full h-full object-cover">
      <rect width="80" height="40" fill="#012169" />
      <g transform="scale(0.8)">
        <rect width="50" height="25" fill="#012169" />
        <path d="M 0,0 L 50,25 M 0,25 L 50,0" stroke="#FFFFFF" strokeWidth="5" />
        <path d="M 0,0 L 50,25 M 0,25 L 50,0" stroke="#C8102E" strokeWidth="3" />
        <path d="M 25,0 L 25,25 M 0,12.5 L 50,12.5" stroke="#FFFFFF" strokeWidth="8" />
        <path d="M 25,0 L 25,25 M 0,12.5 L 50,12.5" stroke="#C8102E" strokeWidth="5" />
      </g>
      <polygon points="20,26 21,30 25,30 22,33 23,37 20,35 17,37 18,33 15,30 19,30" fill="#FFFFFF" />
      <circle cx="60" cy="8" r="1.5" fill="#FFFFFF" />
      <circle cx="70" cy="16" r="1.5" fill="#FFFFFF" />
      <circle cx="60" cy="24" r="1.5" fill="#FFFFFF" />
      <circle cx="50" cy="18" r="1.5" fill="#FFFFFF" />
      <circle cx="65" cy="30" r="1" fill="#FFFFFF" />
    </svg>
  </div>
);

interface ClientType {
  id: string;
  dbId: string;
  partnerId: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  dob: string;
  country: string;
  flag: React.ComponentType;
  visaType: string;
  partner: string;
  totalFee: number;
  paidAmount: number;
  paid1st: number;
  paid2nd: number;
  commission: number;
  status: string;
  statusColorClass: string;
  date: string;
  passportNum: string;
  city: string;
  job: string;
  cnss: string;
  prevRejection: string;
  notes: string;
  filesChecklist: { name: string; completed: boolean }[];
  timeline: { title: string; time: string; desc: string; done: boolean }[];
}

export default function AdminClients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [partnerFilter, setPartnerFilter] = useState("all");
  
  // Drawer Detail Panel state
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);
  const [drawerTab, setDrawerTab] = useState<"info" | "documents" | "financial">("info");

  // Database Data
  const [clientsData, setClientsData] = useState<ClientType[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientType | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Form Fields State
  const [formPartnerId, setFormPartnerId] = useState("");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formNationality, setFormNationality] = useState("مغربي");
  const [formDob, setFormDob] = useState("");
  const [formCountry, setFormCountry] = useState("الولايات المتحدة");
  const [formVisaType, setFormVisaType] = useState("سياحة");
  const [formCity, setFormCity] = useState("الدار البيضاء");
  const [formJob, setFormJob] = useState("");
  const [formCnss, setFormCnss] = useState("لا");
  const [formPrevRejection, setFormPrevRejection] = useState("لا");
  const [formTotalFee, setFormTotalFee] = useState(3500);
  const [formPaid1st, setFormPaid1st] = useState(0);
  const [formPaid2nd, setFormPaid2nd] = useState(0);
  const [formCommission, setFormCommission] = useState(500);
  const [formStatus, setFormStatus] = useState("قيد المعالجة");
  const [formNotes, setFormNotes] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getCountryFlag = (countryName: string) => {
    if (countryName.includes("المملكة المتحدة") || countryName.includes("بريطانيا") || countryName.includes("UK") || countryName.includes("Uk")) return UkFlag;
    if (countryName.includes("كندا")) return CanadaFlag;
    if (countryName.includes("الولايات المتحدة") || countryName.includes("أمريكا") || countryName.includes("USA") || countryName.includes("Usa")) return UsaFlag;
    if (countryName.includes("الدنمارك")) return DenmarkFlag;
    if (countryName.includes("أستراليا")) return AustraliaFlag;
    return UsaFlag;
  };

  async function loadData() {
    try {
      setLoading(true);
      setErrorMsg("");

      // 1. Fetch Partners
      const { data: dbPartners, error: partnersErr } = await supabase
        .from("partners")
        .select("*")
        .order("name");

      if (partnersErr) console.error("Error fetching partners:", partnersErr);
      setPartners(dbPartners || []);
      if (dbPartners && dbPartners.length > 0 && !formPartnerId) {
        setFormPartnerId(dbPartners[0].id);
      }

      // 2. Fetch Clients
      const { data: dbClients, error: clientsErr } = await supabase
        .from("clients")
        .select("*, partners(name, company)")
        .order("created_at", { ascending: false });

      if (clientsErr) {
        console.error("Error fetching clients:", clientsErr);
        return;
      }

      const mapped: ClientType[] = (dbClients || []).map((c: any) => {
        let statusColorClass = "text-slate-500 bg-slate-50 border-slate-200";
        if (c.status === "تم الإنجاز") {
          statusColorClass = "text-emerald-600 bg-emerald-55/15 border-emerald-100";
        } else if (c.status === "قيد المعالجة") {
          statusColorClass = "text-[#0054A6] bg-blue-50 border-blue-100";
        } else if (c.status === "في انتظار البيانات") {
          statusColorClass = "text-amber-600 bg-amber-50 border-amber-100";
        } else if (c.status === "ملغى") {
          statusColorClass = "text-rose-600 bg-rose-50 border-rose-100";
        }

        const partnerName = c.partners?.company || c.partners?.name || "شريك عام";

        return {
          id: c.file_number,
          dbId: c.id,
          partnerId: c.partner_id,
          name: c.name,
          email: c.email || "",
          phone: c.phone,
          nationality: c.nationality,
          dob: c.dob || "",
          country: c.country,
          flag: getCountryFlag(c.country),
          visaType: c.visa_type,
          partner: partnerName,
          totalFee: Number(c.total_fee || 3500),
          paidAmount: Number(c.paid_1st || 0) + Number(c.paid_2nd || 0),
          paid1st: Number(c.paid_1st || 0),
          paid2nd: Number(c.paid_2nd || 0),
          commission: Number(c.commission || 500),
          status: c.status,
          statusColorClass,
          date: c.created_at ? c.created_at.split("T")[0] : "",
          passportNum: "جواز سفر عادي",
          city: c.city || "",
          job: c.job || "",
          cnss: c.cnss || "لا",
          prevRejection: c.prev_rejection || "لا",
          notes: c.notes || "",
          filesChecklist: [
            { name: "جواز السفر (صلاحية 6 أشهر)", completed: true },
            { name: "صور شخصية بخلفية بيضاء", completed: true },
            { name: "كشف حساب بنكي (3 أشهر)", completed: c.cnss === "نعم" },
            { name: "شهادة العمل / التسجيل التجاري", completed: !!c.job },
            { name: "تأمين سفر صالح للملف", completed: true }
          ],
          timeline: [
            { title: "تم إنشاء الملف", time: c.created_at ? new Date(c.created_at).toLocaleString("ar-EG") : "", desc: "تم فتح ملف للعميل بنجاح", done: true }
          ]
        };
      });

      setClientsData(mapped);
    } catch (err) {
      console.error("Error loading clients screen data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();

    // Subscribe to realtime database changes
    const channel = supabase
      .channel("admin_clients_screen_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "clients" }, () => {
        loadData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const isGoForVisaAdmin = () => {
    const selectedPartner = partners.find(p => p.id === formPartnerId);
    return !!(selectedPartner && (selectedPartner.company === "GoForVisa Admin" || selectedPartner.name === "GoForVisa Admin"));
  };

  useEffect(() => {
    if (isGoForVisaAdmin()) {
      setFormTotalFee(0);
      setFormCommission(0);
      setFormPaid1st(0);
      setFormPaid2nd(0);
    }
  }, [formPartnerId, partners]);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setActionLoading(true);

    if (!formName || !formPhone || !formPartnerId) {
      setErrorMsg("الرجاء ملء الحقول الإلزامية (اسم العميل، الهاتف، الشريك).");
      setActionLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("clients")
        .insert({
          partner_id: formPartnerId,
          name: formName,
          phone: formPhone,
          email: formEmail || null,
          nationality: formNationality,
          dob: formDob || null,
          country: formCountry,
          visa_type: formVisaType,
          city: formCity,
          job: formJob || null,
          cnss: formCnss,
          prev_rejection: formPrevRejection,
          total_fee: formTotalFee,
          paid_1st: formPaid1st,
          paid_2nd: formPaid2nd,
          commission: formCommission,
          status: formStatus,
          notes: formNotes || null
        });

      if (error) throw error;

      setSuccessMsg("تم إضافة العميل بنجاح!");
      setIsAddModalOpen(false);
      resetForm();
      await loadData();
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ أثناء إضافة العميل.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setActionLoading(true);

    if (!editingClient || !formName || !formPhone) {
      setErrorMsg("بيانات غير مكتملة.");
      setActionLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("clients")
        .update({
          partner_id: formPartnerId,
          name: formName,
          phone: formPhone,
          email: formEmail || null,
          nationality: formNationality,
          dob: formDob || null,
          country: formCountry,
          visa_type: formVisaType,
          city: formCity,
          job: formJob || null,
          cnss: formCnss,
          prev_rejection: formPrevRejection,
          total_fee: formTotalFee,
          paid_1st: formPaid1st,
          paid_2nd: formPaid2nd,
          commission: formCommission,
          status: formStatus,
          notes: formNotes || null
        })
        .eq("id", editingClient.dbId);

      if (error) throw error;

      setSuccessMsg("تم تعديل بيانات العميل بنجاح!");
      setIsEditModalOpen(false);
      setEditingClient(null);
      resetForm();
      await loadData();
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ أثناء تعديل بيانات العميل.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteClient = async (client: ClientType) => {
    if (!window.confirm(`هل أنت متأكد من حذف ملف العميل "${client.name}" بشكل نهائي؟`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", client.dbId);

      if (error) throw error;

      setSuccessMsg("تم حذف العميل بنجاح!");
      if (selectedClient?.dbId === client.dbId) {
        setSelectedClient(null);
      }
      await loadData();
    } catch (err: any) {
      alert(err.message || "حدث خطأ أثناء حذف العميل.");
    }
  };

  const handleExportCSV = () => {
    if (filteredClients.length === 0) {
      alert("لا توجد بيانات لتصديرها.");
      return;
    }

    const headers = ["رقم الملف", "العميل", "الهاتف", "البريد الإلكتروني", "الشريك", "الوجهة", "التأشيرة", "الرسوم الإجمالية (DH)", "المبلغ المدفوع (DH)", "العمولة (DH)", "الحالة", "تاريخ التسجيل"];
    const rows = filteredClients.map(c => [
      `"${c.id}"`,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.phone}"`,
      `"${c.email.replace(/"/g, '""')}"`,
      `"${c.partner.replace(/"/g, '""')}"`,
      `"${c.country.replace(/"/g, '""')}"`,
      `"${c.visaType.replace(/"/g, '""')}"`,
      c.totalFee,
      c.paidAmount,
      c.commission,
      `"${c.status.replace(/"/g, '""')}"`,
      `"${c.date}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `goforvisa_clients_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openEditModal = (client: ClientType) => {
    setEditingClient(client);
    setFormPartnerId(client.partnerId);
    setFormName(client.name);
    setFormPhone(client.phone);
    setFormEmail(client.email);
    setFormNationality(client.nationality);
    setFormDob(client.dob);
    setFormCountry(client.country);
    setFormVisaType(client.visaType);
    setFormCity(client.city);
    setFormJob(client.job);
    setFormCnss(client.cnss);
    setFormPrevRejection(client.prevRejection);
    setFormTotalFee(client.totalFee);
    setFormPaid1st(client.paid1st);
    setFormPaid2nd(client.paid2nd);
    setFormCommission(client.commission);
    setFormStatus(client.status);
    setFormNotes(client.notes);
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormName("");
    setFormPhone("");
    setFormEmail("");
    setFormNationality("مغربي");
    setFormDob("");
    setFormCountry("الولايات المتحدة");
    setFormVisaType("سياحة");
    setFormCity("الدار البيضاء");
    setFormJob("");
    setFormCnss("لا");
    setFormPrevRejection("لا");
    setFormTotalFee(3500);
    setFormPaid1st(0);
    setFormPaid2nd(0);
    setFormCommission(500);
    setFormStatus("قيد المعالجة");
    setFormNotes("");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#0054A6] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-bold">جاري تحميل بيانات العملاء...</p>
      </div>
    );
  }

  // KPI Metrics calculations
  const totalClients = clientsData.length;
  const completedCount = clientsData.filter(c => c.status === "تم الإنجاز").length;
  const processingCount = clientsData.filter(c => c.status === "قيد المعالجة").length;
  const underReviewCount = clientsData.filter(c => c.status === "في انتظار البيانات").length;
  const cancelledCount = clientsData.filter(c => c.status === "ملغى").length;

  const metrics = [
    {
      title: "إجمالي العملاء",
      value: totalClients.toString(),
      subtext: "جميع العملاء المسجلين",
      icon: <Users className="w-5 h-5 text-[#0054A6]" />,
      colorClass: "bg-blue-50 text-[#0054A6] border-blue-100"
    },
    {
      title: "الملفات المكتملة",
      value: completedCount.toString(),
      subtext: "تأشيرات تم إنجازها",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      title: "تحت المعالجة",
      value: processingCount.toString(),
      subtext: "ملفات قيد الدراسة",
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      colorClass: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "طلبات ملغاة",
      value: cancelledCount.toString(),
      subtext: "ملفات مرفوضة/ملغاة",
      icon: <XCircle className="w-5 h-5 text-rose-600" />,
      colorClass: "bg-rose-50 text-rose-600 border-rose-100"
    }
  ];

  // Distinct filter options
  const uniquePartnersList = Array.from(new Set(clientsData.map(c => c.partner))).filter(Boolean);
  const uniqueDestinationsList = Array.from(new Set(clientsData.map(c => c.country))).filter(Boolean);

  // Filter clients
  const filteredClients = clientsData.filter(client => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
                          client.name.toLowerCase().includes(q) || 
                          client.email.toLowerCase().includes(q) || 
                          client.id.toLowerCase().includes(q) ||
                          client.phone.toLowerCase().includes(q);

    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    const matchesCountry = countryFilter === "all" || client.country === countryFilter;
    const matchesPartner = partnerFilter === "all" || client.partner === partnerFilter;

    return matchesSearch && matchesStatus && matchesCountry && matchesPartner;
  });

  // Paginated list
  const totalPages = Math.ceil(filteredClients.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + pageSize);

  return (
    <div className="space-y-6 pb-12 relative text-right" dir="rtl">
      
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-1.5 justify-start">
            <Link href="/admin" className="hover:text-[#0054A6]">الرئيسية</Link>
            <span className="mx-1">&gt;</span>
            <span>العملاء</span>
          </div>
          <div className="flex items-center gap-3 justify-start">
            <div className="w-9 h-9 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-700 shadow-xs">
              <UserSquare2 className="w-5 h-5 text-[#0054A6]" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800">إدارة العملاء</h1>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">إدارة وتتبع ملفات وتأشيرات العملاء المقدمة عبر الشركاء</p>
        </div>
      </div>

      {/* Success & Error messages */}
      {successMsg && (
        <div className="bg-emerald-50 text-emerald-600 text-xs p-3.5 rounded-2xl border border-emerald-100">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-50 text-red-600 text-xs p-3.5 rounded-2xl border border-red-100">
          {errorMsg}
        </div>
      )}

      {/* KPI Cards Row (4 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          
          {/* Action Buttons: Add Client & Export */}
          <div className="flex flex-col gap-2 min-w-[130px]">
            <button 
              onClick={() => { resetForm(); setIsAddModalOpen(true); }}
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer h-[38px] w-full"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة عميل جديد</span>
            </button>
            <button 
              onClick={handleExportCSV}
              className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors h-[38px] cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>تصدير البيانات</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Partner Agency Filter */}
          <div className="flex flex-col gap-1.5 min-w-[150px]">
            <label className="text-[11px] text-slate-550 font-bold text-right block">الوكالة الشريكة</label>
            <div className="relative">
              <select 
                value={partnerFilter}
                onChange={(e) => setPartnerFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">جميع الشركاء</option>
                {uniquePartnersList.map((p, i) => (
                  <option key={i} value={p}>{p}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* Destination Country Filter */}
          <div className="flex flex-col gap-1.5 min-w-[120px]">
            <label className="text-[11px] text-slate-555 font-bold text-right block">وجهة السفر</label>
            <div className="relative">
              <select 
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">جميع الوجهات</option>
                {uniqueDestinationsList.map((d, i) => (
                  <option key={i} value={d}>{d}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* Status Select */}
          <div className="flex flex-col gap-1.5 min-w-[120px]">
            <label className="text-[11px] text-slate-550 font-bold text-right block">حالة الملف</label>
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-right text-xs font-bold text-slate-650 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">جميع الحالات</option>
                <option value="تم الإنجاز">تم الإنجاز</option>
                <option value="قيد المعالجة">قيد المعالجة</option>
                <option value="في انتظار البيانات">في انتظار البيانات</option>
                <option value="ملغى">ملغى</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* Search Input */}
          <div className="flex flex-col gap-1.5 min-w-[200px] flex-1">
            <label className="text-[11px] text-slate-550 font-bold text-right block">بحث سريع</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="بحث بالاسم، رقم الملف، الهاتف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-700 font-bold h-[38px]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3.5 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* Clients Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        
        {/* Card Header */}
        <div className="p-6 border-b border-slate-50 text-right">
          <h3 className="font-extrabold text-slate-800 text-sm">قائمة ملفات العملاء ({filteredClients.length})</h3>
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-slate-650 text-xs font-bold">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 font-bold border-b border-slate-100/60">
                <th className="py-3.5 pr-6 w-32">رقم الملف</th>
                <th className="py-3.5">العميل</th>
                <th className="py-3.5">الشريك</th>
                <th className="py-3.5">الوجهة</th>
                <th className="py-3.5">التأشيرة</th>
                <th className="py-3.5">الدفوعات (DH)</th>
                <th className="py-3.5">الحالة</th>
                <th className="py-3.5">تاريخ التسجيل</th>
                <th className="py-3.5 pl-6 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50">
              {paginatedClients.map((client) => {
                const Flag = client.flag;
                const isGFVAdmin = client.partner === "GoForVisa Admin";
                const displayPaidAmount = (!isGFVAdmin && client.status === "تم الإنجاز") ? client.totalFee : client.paidAmount;
                const displayTotalFee = client.totalFee;
                const paidPercent = displayTotalFee > 0 ? Math.round((displayPaidAmount / displayTotalFee) * 100) : 0;
                
                return (
                  <tr 
                    key={client.id} 
                    className="hover:bg-slate-50/40 transition-colors cursor-pointer group"
                    onClick={() => { setSelectedClient(client); setDrawerTab("info"); }}
                  >
                    
                    {/* File ID */}
                    <td className="py-4 pr-6">
                      <span className="font-extrabold text-xs text-[#0054A6] hover:underline" dir="ltr">
                        {client.id}
                      </span>
                    </td>

                    {/* Client Name & Profile */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-slate-650 font-black text-[11px]">
                          {client.name.substring(0, 2)}
                        </div>
                        <div className="text-right">
                          <span className="font-extrabold text-xs text-slate-800 group-hover:text-[#0054A6] transition-colors">{client.name}</span>
                          <span className="text-[9px] text-slate-400 font-medium block mt-0.5" dir="ltr">{client.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Partner Agency */}
                    <td className="py-4 text-slate-600 max-w-[150px] truncate">{client.partner}</td>

                    {/* Destination Flag & Country */}
                    <td className="py-4">
                      <div className="flex items-center gap-1.5 justify-start">
                        <Flag />
                        <span className="text-[10px] text-slate-500 font-bold">{client.country}</span>
                      </div>
                    </td>

                    {/* Visa Type */}
                    <td className="py-4 text-slate-550">{client.visaType}</td>

                    {/* Payments Progress */}
                    <td className="py-4 font-bold text-slate-700">
                      <div className="flex flex-col gap-1 items-start w-32" dir="ltr">
                        <span className="text-[10px] text-slate-500">
                          {displayPaidAmount.toLocaleString()} / {displayTotalFee.toLocaleString()}
                        </span>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              paidPercent >= 100 ? "bg-emerald-500" : paidPercent > 0 ? "bg-blue-500" : "bg-slate-300"
                            }`} 
                            style={{ width: `${paidPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border ${client.statusColorClass}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                        {client.status}
                      </span>
                    </td>

                    {/* Created Date */}
                    <td className="py-4 text-slate-400 font-bold" dir="ltr">{client.date}</td>

                    {/* Actions Column */}
                    <td className="py-4 pl-6 text-left" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1.5 justify-start" dir="ltr">
                        <button 
                          onClick={() => handleDeleteClient(client)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200/50 shadow-2xs cursor-pointer"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => openEditModal(client)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg border border-blue-200/50 shadow-2xs cursor-pointer"
                          title="تعديل"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => { setSelectedClient(client); setDrawerTab("info"); }}
                          className="p-1.5 text-[#0054A6] hover:text-blue-850 hover:bg-blue-50 rounded-lg border border-slate-200/50 shadow-2xs cursor-pointer"
                          title="عرض"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
              {paginatedClients.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400 font-bold">
                    لا يوجد عملاء يطابقون فلاتر البحث الحالية.
                  </td>
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
            عرض {startIndex + 1} إلى {Math.min(startIndex + pageSize, filteredClients.length)} من أصل {filteredClients.length} عميل
          </div>

        </div>

      </div>

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto text-right">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-10">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <UserSquare2 className="w-5 h-5 text-[#0054A6]" />
                <span>إضافة عميل جديد</span>
              </h3>
            </div>

            <form onSubmit={handleCreateClient} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Partner Agency selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">الوكالة الشريكة</label>
                  <div className="relative">
                    <select 
                      value={formPartnerId}
                      onChange={(e) => setFormPartnerId(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-10 py-2.5 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
                      required
                    >
                      {partners.map((p) => (
                        <option key={p.id} value={p.id}>{p.company || p.name}</option>
                      ))}
                    </select>
                    <Building className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">اسم العميل بالكامل</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="محمد بن عبد الله"
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                      required
                    />
                    <User className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">رقم الهاتف</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+212 600-000000"
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                      required
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">البريد الإلكتروني</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="client@email.com"
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Nationality */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">الجنسية</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formNationality}
                      onChange={(e) => setFormNationality(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                      required
                    />
                    <Globe className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* DOB */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">تاريخ الميلاد</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formDob}
                      onChange={(e) => setFormDob(e.target.value)}
                      placeholder="1990-05-15"
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Destination Country */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">وجهة السفر (الدولة)</label>
                  <div className="relative">
                    <select 
                      value={formCountry}
                      onChange={(e) => setFormCountry(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-10 py-2.5 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
                    >
                      <option value="المملكة المتحدة">المملكة المتحدة</option>
                      <option value="كندا">كندا</option>
                      <option value="الولايات المتحدة">الولايات المتحدة</option>
                      <option value="الدنمارك">الدنمارك</option>
                      <option value="أستراليا">أستراليا</option>
                    </select>
                    <MapPin className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
                  </div>
                </div>

                {/* Visa Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">نوع التأشيرة</label>
                  <div className="relative">
                    <select 
                      value={formVisaType}
                      onChange={(e) => setFormVisaType(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-10 py-2.5 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
                    >
                      <option value="سياحة">سياحة</option>
                      <option value="زيارة عائلية">زيارة عائلية</option>
                      <option value="دراسة">دراسة</option>
                      <option value="عمرة">عمرة</option>
                      <option value="تجارية">تجارية</option>
                    </select>
                    <FileText className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
                  </div>
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">المدينة</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Job */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">الوظيفة</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formJob}
                      onChange={(e) => setFormJob(e.target.value)}
                      placeholder="موظف بشركة خاصة / تاجر"
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                    />
                    <Briefcase className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* CNSS */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">هل مسجل في الضمان الاجتماعي (CNSS)؟</label>
                  <div className="relative">
                    <select 
                      value={formCnss}
                      onChange={(e) => setFormCnss(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-10 py-2.5 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
                    >
                      <option value="لا">لا</option>
                      <option value="نعم">نعم</option>
                    </select>
                    <FileCheck className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
                  </div>
                </div>

                {/* Previous Rejection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">هل تعرّض لرفض تأشيرة سابق؟</label>
                  <div className="relative">
                    <select 
                      value={formPrevRejection}
                      onChange={(e) => setFormPrevRejection(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-10 py-2.5 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
                    >
                      <option value="لا">لا</option>
                      <option value="نعم">نعم</option>
                    </select>
                    <XCircle className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
                  </div>
                </div>

                {/* Total Fee */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">التكلفة الإجمالية للخدمة (DH)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formTotalFee}
                      onChange={(e) => setFormTotalFee(Number(e.target.value))}
                      disabled={isGoForVisaAdmin()}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold disabled:bg-slate-100 disabled:text-slate-400"
                      required
                    />
                    <DollarSign className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Paid 1st */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">الدفعة الأولى المدفوعة (DH)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formPaid1st}
                      onChange={(e) => setFormPaid1st(Number(e.target.value))}
                      disabled={isGoForVisaAdmin()}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold disabled:bg-slate-100 disabled:text-slate-400"
                    />
                    <DollarSign className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Paid 2nd */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">الدفعة الثانية المدفوعة (DH)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formPaid2nd}
                      onChange={(e) => setFormPaid2nd(Number(e.target.value))}
                      disabled={isGoForVisaAdmin()}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold disabled:bg-slate-100 disabled:text-slate-400"
                    />
                    <DollarSign className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Commission */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">عمولة الشريك المخصصة (DH)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formCommission}
                      onChange={(e) => setFormCommission(Number(e.target.value))}
                      disabled={isGoForVisaAdmin()}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold disabled:bg-slate-100 disabled:text-slate-400"
                      required
                    />
                    <DollarSign className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">حالة ملف العميل</label>
                  <div className="relative">
                    <select 
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-10 py-2.5 text-right text-xs font-bold text-slate-650 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
                    >
                      <option value="قيد المعالجة">قيد المعالجة</option>
                      <option value="تم الإنجاز">تم الإنجاز</option>
                      <option value="في انتظار البيانات">في انتظار البيانات</option>
                      <option value="ملغى">ملغى</option>
                    </select>
                    <Clock className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block">ملاحظات إضافية</label>
                  <textarea 
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="اكتب أي ملاحظات خاصة بملف العميل هنا..."
                    rows={3}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-850 font-bold"
                  />
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

      {/* Edit Client Modal */}
      {isEditModalOpen && editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto text-right">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-10">
              <button 
                onClick={() => { setIsEditModalOpen(false); setEditingClient(null); }}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <Pencil className="w-4 h-4 text-[#0054A6]" />
                <span>تعديل ملف العميل</span>
              </h3>
            </div>

            <form onSubmit={handleUpdateClient} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Partner Agency selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">الوكالة الشريكة</label>
                  <div className="relative">
                    <select 
                      value={formPartnerId}
                      onChange={(e) => setFormPartnerId(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-10 py-2.5 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
                      required
                    >
                      {partners.map((p) => (
                        <option key={p.id} value={p.id}>{p.company || p.name}</option>
                      ))}
                    </select>
                    <Building className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">اسم العميل بالكامل</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                      required
                    />
                    <User className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">رقم الهاتف</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                      required
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">البريد الإلكتروني</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Nationality */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">الجنسية</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formNationality}
                      onChange={(e) => setFormNationality(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                      required
                    />
                    <Globe className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* DOB */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">تاريخ الميلاد</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formDob}
                      onChange={(e) => setFormDob(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Destination Country */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">وجهة السفر (الدولة)</label>
                  <div className="relative">
                    <select 
                      value={formCountry}
                      onChange={(e) => setFormCountry(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-10 py-2.5 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
                    >
                      <option value="المملكة المتحدة">المملكة المتحدة</option>
                      <option value="كندا">كندا</option>
                      <option value="الولايات المتحدة">الولايات المتحدة</option>
                      <option value="الدنمارك">الدنمارك</option>
                      <option value="أستراليا">أستراليا</option>
                    </select>
                    <MapPin className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
                  </div>
                </div>

                {/* Visa Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">نوع التأشيرة</label>
                  <div className="relative">
                    <select 
                      value={formVisaType}
                      onChange={(e) => setFormVisaType(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-10 py-2.5 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
                    >
                      <option value="سياحة">سياحة</option>
                      <option value="زيارة عائلية">زيارة عائلية</option>
                      <option value="دراسة">دراسة</option>
                      <option value="عمرة">عمرة</option>
                      <option value="تجارية">تجارية</option>
                    </select>
                    <FileText className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
                  </div>
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">المدينة</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Job */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">الوظيفة</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formJob}
                      onChange={(e) => setFormJob(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold"
                    />
                    <Briefcase className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* CNSS */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">هل مسجل في الضمان الاجتماعي (CNSS)؟</label>
                  <div className="relative">
                    <select 
                      value={formCnss}
                      onChange={(e) => setFormCnss(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-10 py-2.5 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
                    >
                      <option value="لا">لا</option>
                      <option value="نعم">نعم</option>
                    </select>
                    <FileCheck className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
                  </div>
                </div>

                {/* Previous Rejection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">هل تعرّض لرفض تأشيرة سابق؟</label>
                  <div className="relative">
                    <select 
                      value={formPrevRejection}
                      onChange={(e) => setFormPrevRejection(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-10 py-2.5 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
                    >
                      <option value="لا">لا</option>
                      <option value="نعم">نعم</option>
                    </select>
                    <XCircle className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
                  </div>
                </div>

                {/* Total Fee */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">التكلفة الإجمالية للخدمة (DH)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formTotalFee}
                      onChange={(e) => setFormTotalFee(Number(e.target.value))}
                      disabled={isGoForVisaAdmin()}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold disabled:bg-slate-100 disabled:text-slate-400"
                      required
                    />
                    <DollarSign className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Paid 1st */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">الدفعة الأولى المدفوعة (DH)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formPaid1st}
                      onChange={(e) => setFormPaid1st(Number(e.target.value))}
                      disabled={isGoForVisaAdmin()}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold disabled:bg-slate-100 disabled:text-slate-400"
                    />
                    <DollarSign className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Paid 2nd */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">الدفعة الثانية المدفوعة (DH)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formPaid2nd}
                      onChange={(e) => setFormPaid2nd(Number(e.target.value))}
                      disabled={isGoForVisaAdmin()}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold disabled:bg-slate-100 disabled:text-slate-400"
                    />
                    <DollarSign className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Commission */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">عمولة الشريك المخصصة (DH)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formCommission}
                      onChange={(e) => setFormCommission(Number(e.target.value))}
                      disabled={isGoForVisaAdmin()}
                      className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-800 font-bold disabled:bg-slate-100 disabled:text-slate-400"
                      required
                    />
                    <DollarSign className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">حالة ملف العميل</label>
                  <div className="relative">
                    <select 
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-10 py-2.5 text-right text-xs font-bold text-slate-650 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer"
                    >
                      <option value="قيد المعالجة">قيد المعالجة</option>
                      <option value="تم الإنجاز">تم الإنجاز</option>
                      <option value="في انتظار البيانات">في انتظار البيانات</option>
                      <option value="ملغى">ملغى</option>
                    </select>
                    <Clock className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block">ملاحظات إضافية</label>
                  <textarea 
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs focus:bg-white focus:border-[#0054A6] outline-none text-slate-850 font-bold"
                  />
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
                    <span>حفظ التعديلات</span>
                  )}
                </button>
                <button 
                  type="button"
                  onClick={() => { setIsEditModalOpen(false); setEditingClient(null); }}
                  className="flex-1 py-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-650 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Sliding Drawer Detail Panel (Slides from the LEFT in RTL layout) */}
      {selectedClient && (
        <>
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity duration-300"
            onClick={() => setSelectedClient(null)}
          />

          {/* Sliding Panel */}
          <div className="fixed top-0 left-0 bottom-0 w-full sm:w-[500px] bg-[#F8FAFC] z-50 shadow-2xl flex flex-col border-r border-slate-200 transform transition-transform duration-300 ease-out text-right" dir="rtl">
            
            {/* Drawer Header */}
            <div className="bg-[#001B5B] text-white p-6 relative">
              <button 
                onClick={() => setSelectedClient(null)}
                className="absolute top-6 left-6 text-slate-300 hover:text-white p-1 hover:bg-white/10 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3 mt-4">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-black text-white text-base">
                  {selectedClient.name.substring(0, 2)}
                </div>
                <div>
                  <h3 className="text-lg font-black">{selectedClient.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-300 font-bold" dir="ltr">{selectedClient.id}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border ${selectedClient.statusColorClass.replace("bg-", "bg-white/10 ").replace("text-", "text-white ")}`}>
                      {selectedClient.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation in Drawer */}
            <div className="bg-white border-b border-slate-100 flex items-center justify-around px-4">
              <button 
                onClick={() => setDrawerTab("info")}
                className={`py-3.5 text-xs font-black border-b-2 transition-all cursor-pointer ${
                  drawerTab === "info" ? "border-[#0054A6] text-[#0054A6]" : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                المعلومات الشخصية
              </button>
              <button 
                onClick={() => setDrawerTab("documents")}
                className={`py-3.5 text-xs font-black border-b-2 transition-all cursor-pointer ${
                  drawerTab === "documents" ? "border-[#0054A6] text-[#0054A6]" : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                وثائق الملف ({selectedClient.filesChecklist.filter(f => f.completed).length}/{selectedClient.filesChecklist.length})
              </button>
              <button 
                onClick={() => setDrawerTab("financial")}
                className={`py-3.5 text-xs font-black border-b-2 transition-all cursor-pointer ${
                  drawerTab === "financial" ? "border-[#0054A6] text-[#0054A6]" : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                المالية والعمولات
              </button>
            </div>

            {/* Drawer Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Tab 1: Personal Info */}
              {drawerTab === "info" && (
                <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs">
                  <h4 className="font-extrabold text-slate-800 text-xs border-b border-slate-50 pb-2 mb-3">تفاصيل الحساب والهوية</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 font-extrabold block">رقم جواز السفر</span>
                      <span className="text-xs font-bold text-slate-700 mt-1 block" dir="ltr">{selectedClient.passportNum}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-extrabold block">الجنسية</span>
                      <span className="text-xs font-bold text-slate-700 mt-1 block">{selectedClient.nationality}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-extrabold block">تاريخ الميلاد</span>
                      <span className="text-xs font-bold text-slate-700 mt-1 block" dir="ltr">{selectedClient.dob}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-extrabold block">البريد الإلكتروني</span>
                      <span className="text-xs font-bold text-slate-700 mt-1 block break-all" dir="ltr">{selectedClient.email}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-extrabold block">رقم الهاتف</span>
                      <span className="text-xs font-bold text-slate-700 mt-1 block" dir="ltr">{selectedClient.phone}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-extrabold block">تاريخ التسجيل</span>
                      <span className="text-xs font-bold text-slate-700 mt-1 block" dir="ltr">{selectedClient.date}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-50 pt-4 mt-2">
                    <span className="text-[10px] text-slate-400 font-extrabold block">الوكالة الشريكة المسؤولة</span>
                    <div className="flex items-center gap-2 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <Building className="w-4 h-4 text-[#0054A6]" />
                      <div className="text-right">
                        <span className="text-xs font-black text-slate-700 block">{selectedClient.partner}</span>
                        <span className="text-[9px] text-slate-400 font-bold block mt-0.5">شريك مسجل بالمغرب</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Document Checklist & Progress */}
              {drawerTab === "documents" && (
                <div className="space-y-6">
                  
                  {/* Checklist Widget */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs space-y-3">
                    <h4 className="font-extrabold text-slate-800 text-xs border-b border-slate-50 pb-2 mb-3">قائمة تدقيق الوثائق الأساسية</h4>
                    {selectedClient.filesChecklist.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                        <span className="text-xs font-extrabold text-slate-600">{file.name}</span>
                        {file.completed ? (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-black border border-emerald-100/50 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            مكتمل
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[10px] font-black border border-amber-100/50 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            معلق
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Visual Application Timeline */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs space-y-4">
                    <h4 className="font-extrabold text-slate-800 text-xs border-b border-slate-50 pb-2">خطوات المعالجة والمواعيد</h4>
                    
                    <div className="relative border-r-2 border-slate-100 pr-4 mr-2 space-y-6">
                      {selectedClient.timeline.map((step, idx) => (
                        <div key={idx} className="relative">
                          {/* Dot marker */}
                          <span className={`absolute -right-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ring-4 ${
                            step.done ? "bg-[#0054A6] ring-blue-50" : "bg-slate-300 ring-slate-50"
                          }`} />
                          
                          <div className="text-right">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-slate-800">{step.title}</span>
                              <span className="text-[9px] text-slate-400 font-bold" dir="ltr">{step.time}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 font-medium mt-1 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* Tab 3: Financial Details & Commission */}
              {drawerTab === "financial" && (
                <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs">
                  <h4 className="font-extrabold text-slate-800 text-xs border-b border-slate-50 pb-2 mb-3">التكاليف والعمولة المالية</h4>
                  
                  <div className="space-y-3.5">
                    
                    {/* Total cost */}
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500 font-bold">التكلفة الإجمالية للخدمة</span>
                      <span className="text-sm font-black text-slate-800">{selectedClient.totalFee.toLocaleString()} DH</span>
                    </div>

                    {/* Paid cost */}
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500 font-bold">المبلغ المدفوع حتى الآن</span>
                      <span className="text-sm font-black text-emerald-600">{selectedClient.paidAmount.toLocaleString()} DH</span>
                    </div>

                    {/* Remaining */}
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-xs text-slate-500 font-bold">المبلغ المتبقي بذمته</span>
                      <span className="text-sm font-black text-slate-700">{(selectedClient.totalFee - selectedClient.paidAmount).toLocaleString()} DH</span>
                    </div>

                    {/* Partner Commission */}
                    <div className="flex justify-between items-center py-2 bg-slate-50/50 px-3 rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-600 font-bold">عمولة الشريك المخصصة</span>
                      <span className="text-sm font-black text-[#0054A6]">{selectedClient.commission.toLocaleString()} DH</span>
                    </div>

                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-extrabold">حالة الدفعة</span>
                    {selectedClient.paidAmount === selectedClient.totalFee ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black border border-emerald-100 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        مدفوع بالكامل
                      </span>
                    ) : selectedClient.paidAmount > 0 ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black border border-blue-100 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        دفعة جزئية
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-black border border-rose-100 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" />
                        لم يتم الدفع
                      </span>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Actions Footer */}
            <div className="p-4 border-t border-slate-150 bg-white grid grid-cols-2 gap-3">
              <button 
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold text-center transition-all cursor-pointer"
              >
                إغلاق النافذة
              </button>
              <button 
                onClick={() => { const target = selectedClient; setSelectedClient(null); openEditModal(target); }}
                className="px-4 py-2.5 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold text-center transition-all shadow-xs cursor-pointer"
              >
                تعديل العميل
              </button>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
