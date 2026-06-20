"use client";
import React, { useState } from "react";
import Link from "next/link";
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
const FranceFlag = () => (
  <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200/60 inline-flex shrink-0">
    <svg viewBox="0 0 3 2" className="w-full h-full object-cover">
      <rect width="1" height="2" fill="#002395" />
      <rect x="1" width="1" height="2" fill="#FFFFFF" />
      <rect x="2" width="1" height="2" fill="#ED2939" />
    </svg>
  </div>
);

const CanadaFlag = () => (
  <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200/60 inline-flex shrink-0">
    <svg viewBox="0 0 2 1" className="w-full h-full object-cover">
      <rect width="2" height="1" fill="#FF0000" />
      <rect x="0.5" width="1" height="1" fill="#FFFFFF" />
      <path d="M 1,0.2 L 1.08,0.38 L 1.25,0.35 L 1.15,0.48 L 1.3,0.58 L 1.1,0.58 L 1,0.8 L 0.9,0.58 L 0.7,0.58 L 0.85,0.48 L 0.75,0.35 L 0.92,0.38 Z" fill="#FF0000" />
    </svg>
  </div>
);

const SpainFlag = () => (
  <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200/60 inline-flex shrink-0">
    <svg viewBox="0 0 3 2" className="w-full h-full object-cover">
      <rect width="3" height="2" fill="#C1272D" />
      <rect y="0.5" width="3" height="1" fill="#FCD116" />
      <rect x="0.8" y="0.7" width="0.2" height="0.4" fill="#C1272D" />
    </svg>
  </div>
);

const UkFlag = () => (
  <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200/60 inline-flex shrink-0">
    <svg viewBox="0 0 60 30" className="w-full h-full object-cover">
      <clipPath id="t">
        <path d="M0,0 v30 h60 v-30 z"/>
      </clipPath>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#012169" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  </div>
);

const ItalyFlag = () => (
  <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200/60 inline-flex shrink-0">
    <svg viewBox="0 0 3 2" className="w-full h-full object-cover">
      <rect width="1" height="2" fill="#009246" />
      <rect x="1" width="1" height="2" fill="#F1F2F1" />
      <rect x="2" width="1" height="2" fill="#CE2B37" />
    </svg>
  </div>
);

const GermanyFlag = () => (
  <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200/60 inline-flex shrink-0">
    <svg viewBox="0 0 5 3" className="w-full h-full object-cover">
      <rect width="5" height="1" fill="#000000" />
      <rect y="1" width="5" height="1" fill="#DD0000" />
      <rect y="2" width="5" height="1" fill="#FFCC00" />
    </svg>
  </div>
);

const TurkeyFlag = () => (
  <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200/60 inline-flex shrink-0">
    <svg viewBox="0 0 3 2" className="w-full h-full object-cover">
      <rect width="3" height="2" fill="#E30A17" />
      <circle cx="1.1" cy="1" r="0.4" fill="#FFFFFF" />
      <circle cx="1.2" cy="1" r="0.32" fill="#E30A17" />
      <polygon points="1.6,1 1.45,1.07 1.48,0.9 1.35,0.8 1.52,0.8" fill="#FFFFFF" />
    </svg>
  </div>
);

interface ClientType {
  id: string;
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
  commission: number;
  status: string;
  statusColorClass: string;
  date: string;
  passportNum: string;
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

  // KPI Metrics data
  const metrics = [
    {
      title: "إجمالي العملاء",
      value: "842",
      subtext: "جميع العملاء المسجلين",
      icon: <Users className="w-5 h-5 text-[#0054A6]" />,
      colorClass: "bg-blue-50 text-[#0054A6] border-blue-100"
    },
    {
      title: "الملفات المكتملة",
      value: "512",
      subtext: "تأشيرات تم إنجازها",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      title: "تحت المعالجة",
      value: "185",
      subtext: "ملفات قيد الدراسة",
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      colorClass: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "في انتظار البيانات",
      value: "123",
      subtext: "نقص مستندات أو صور",
      icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
      colorClass: "bg-amber-50 text-amber-600 border-amber-100"
    },
    {
      title: "طلبات ملغاة",
      value: "22",
      subtext: "ملفات مرفوضة/ملغاة",
      icon: <XCircle className="w-5 h-5 text-rose-600" />,
      colorClass: "bg-rose-50 text-rose-600 border-rose-100"
    }
  ];

  // High fidelity Clients mock data representing realistic database
  const clientsData: ClientType[] = [
    {
      id: "GFV-2024-000123",
      name: "زكرياء بنجلون",
      email: "zakaria.b@gmail.com",
      phone: "+212 661 234 567",
      nationality: "مغربية",
      dob: "1994-08-12",
      country: "فرنسا",
      flag: FranceFlag,
      visaType: "سياحة (C)",
      partner: "شركة أبو العمران للسفريات",
      totalFee: 3000,
      paidAmount: 3000,
      commission: 500,
      status: "تم الإنجاز",
      statusColorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
      date: "2024-06-15",
      passportNum: "AB123456",
      filesChecklist: [
        { name: "جواز السفر (صلاحية 6 أشهر)", completed: true },
        { name: "صور شخصية بخلفية بيضاء", completed: true },
        { name: "كشف حساب بنكي (3 أشهر)", completed: true },
        { name: "شهادة العمل / التسجيل التجاري", completed: true },
        { name: "تأمين سفر صالح للشنغن", completed: true }
      ],
      timeline: [
        { title: "تم تسليم التأشيرة", time: "2024-06-15 14:00", desc: "استلم العميل الجواز مع التأشيرة المطبوعة بنجاح", done: true },
        { title: "تمت الموافقة من القنصلية", time: "2024-06-12 10:30", desc: "تم إصدار التأشيرة بنجاح من القنصلية الفرنسية", done: true },
        { title: "تقديم الملف في القنصلية", time: "2024-06-01 09:00", desc: "تم تقديم البصمات والمستندات لدى مركز التأشيرات", done: true },
        { title: "حجز موعد البيومترية", time: "2024-05-20 11:00", desc: "تم تأكيد موعد البصمات في مركز TLS contact", done: true }
      ]
    },
    {
      id: "GFV-2024-000124",
      name: "مريم الإدريسي",
      email: "meriem.edr@hotmail.com",
      phone: "+212 662 987 654",
      nationality: "مغربية",
      dob: "1990-03-22",
      country: "كندا",
      flag: CanadaFlag,
      visaType: "دراسة",
      partner: "Eagle Tourism LLC",
      totalFee: 5000,
      paidAmount: 2500,
      commission: 800,
      status: "قيد المعالجة",
      statusColorClass: "text-[#0054A6] bg-blue-50 border-blue-100",
      date: "2024-06-16",
      passportNum: "CD789012",
      filesChecklist: [
        { name: "خطاب القبول الجامعي الكندي", completed: true },
        { name: "شهادة القدرة المالية وتغطية التكاليف", completed: true },
        { name: "جواز السفر والترجمة المعتمدة", completed: true },
        { name: "اختبار فحص طبي معتمد", completed: false },
        { name: "خطاب الغرض من الدراسة (SOP)", completed: true }
      ],
      timeline: [
        { title: "جاري مراجعة الملحقات", time: "2024-06-18 16:15", desc: "جاري التدقيق في الوثائق الإضافية والشهادة المالية", done: true },
        { title: "إرسال طلب التأشيرة إلكترونياً", time: "2024-06-16 11:00", desc: "تم رفع الملف عبر بوابة الهجرة الكندية IRCC", done: true },
        { title: "سداد الرسوم والضمان", time: "2024-06-15 15:30", desc: "تم استلام الشطر الأول وسداد رسوم الحكومة الكندية", done: true }
      ]
    },
    {
      id: "GFV-2024-000125",
      name: "عبد الرزاق الصفريوي",
      email: "abderrazzak@outlook.fr",
      phone: "+212 671 445 566",
      nationality: "مغربية",
      dob: "1985-11-05",
      country: "إسبانيا",
      flag: SpainFlag,
      visaType: "سياحة",
      partner: "رحالة العالم للسفر",
      totalFee: 3000,
      paidAmount: 1500,
      commission: 500,
      status: "في انتظار البيانات",
      statusColorClass: "text-amber-600 bg-amber-50 border-amber-100",
      date: "2024-06-17",
      passportNum: "EF345678",
      filesChecklist: [
        { name: "جواز سفر الأصلي", completed: true },
        { name: "كشف حساب البنك لـ 3 أشهر الأخيرة", completed: false },
        { name: "حجز فندق مؤكد وتذاكر الطائرة المبدئية", completed: true },
        { name: "شهادة العمل وآخر 3 بيانات الأجر", completed: true },
        { name: "شهادة التسجيل في الصندوق الوطني للضمان الاجتماعي", completed: false }
      ],
      timeline: [
        { title: "إخطار الشريك بنواقص المستندات", time: "2024-06-17 14:00", desc: "تم الاتصال بالوكيل لطلب كشف الحساب البنكي المحدث وشهادة الضمان الاجتماعي", done: true },
        { title: "إنشاء الملف في النظام", time: "2024-06-17 09:30", desc: "تم فتح ملف للعميل واستلام الوثائق الأولية", done: true }
      ]
    },
    {
      id: "GFV-2024-000126",
      name: "محمد العلمي",
      email: "m.alami@yahoo.com",
      phone: "+212 663 112 233",
      nationality: "مغربية",
      dob: "1978-05-19",
      country: "المملكة المتحدة",
      flag: UkFlag,
      visaType: "عمل",
      partner: "شركة أبو العمران للسفريات",
      totalFee: 6000,
      paidAmount: 0,
      commission: 0,
      status: "ملغى",
      statusColorClass: "text-rose-600 bg-rose-50 border-rose-100",
      date: "2024-06-18",
      passportNum: "GH901234",
      filesChecklist: [
        { name: "عقد عمل رسمي معتمد من الكفيل البريطاني", completed: true },
        { name: "شهادة رعاية معتمدة (CoS)", completed: true },
        { name: "اختبار إتقان اللغة الإنجليزية (IELTS)", completed: false },
        { name: "كشف الخلو من السل الطبي", completed: false }
      ],
      timeline: [
        { title: "إلغاء الطلب من طرف الشريك", time: "2024-06-18 17:00", desc: "طلب الوكيل إلغاء المعاملة لعدم قدرة العميل على توفير شهادة اللغة واسترداد الشطر الأول", done: true },
        { title: "إنشاء الملف وتحديث الرسوم", time: "2024-06-18 10:15", desc: "تم تسجيل الطلب وتحديد المتطلبات", done: true }
      ]
    },
    {
      id: "GFV-2024-000127",
      name: "نهى بناني",
      email: "nouha.benani@gmail.com",
      phone: "+212 654 889 001",
      nationality: "مغربية",
      dob: "1997-04-30",
      country: "إيطاليا",
      flag: ItalyFlag,
      visaType: "سياحة",
      partner: "Tunis Voyages",
      totalFee: 3000,
      paidAmount: 3000,
      commission: 500,
      status: "تم الإنجاز",
      statusColorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
      date: "2024-06-19",
      passportNum: "JK567890",
      filesChecklist: [
        { name: "جواز السفر الأصلي", completed: true },
        { name: "صور شخصية بيومترية", completed: true },
        { name: "كشوفات الحساب البنكي الرسمية", completed: true },
        { name: "شهادة العمل وشهادة الأجر", completed: true },
        { name: "حجز طيران وتأمين سفر شنغن", completed: true }
      ],
      timeline: [
        { title: "تسليم جواز السفر للعميل", time: "2024-06-21 11:30", desc: "تم تسليم جواز السفر بنجاح عبر الشريك", done: true },
        { title: "استلام الجواز من مركز التأشيرات", time: "2024-06-20 15:45", desc: "تم تسلم الظرف المختوم المحتوي على الجواز والتأشيرة", done: true },
        { title: "جاري اتخاذ القرار في القنصلية", time: "2024-06-10 09:00", desc: "تم إرسال الملف للدراسة في القنصلية الإيطالية بالدار البيضاء", done: true }
      ]
    },
    {
      id: "GFV-2024-000128",
      name: "خالد منصور",
      email: "khalid.mansour@gmail.com",
      phone: "+971 50 123 4567",
      nationality: "إماراتية",
      dob: "1988-12-14",
      country: "ألمانيا",
      flag: GermanyFlag,
      visaType: "عمل",
      partner: "Eagle Tourism LLC",
      totalFee: 6000,
      paidAmount: 3000,
      commission: 1000,
      status: "قيد المعالجة",
      statusColorClass: "text-[#0054A6] bg-blue-50 border-blue-100",
      date: "2024-06-20",
      passportNum: "LM234567",
      filesChecklist: [
        { name: "عقد عمل رسمي معتمد في ألمانيا", completed: true },
        { name: "شهادة الاعتراف بالشهادة الأكاديمية (Anabin)", completed: true },
        { name: "تأمين صحي مؤقت للعمل", completed: true },
        { name: "السيرة الذاتية وخطاب الحافز بالألمانية", completed: false }
      ],
      timeline: [
        { title: "موعد السفارة الألمانية بدبي", time: "2024-06-20 09:00", desc: "حضور العميل لموعد المقابلة وتقديم البصمات والوثائق الأصلية", done: true },
        { title: "حجز موعد المستندات", time: "2024-06-12 11:30", desc: "تم تأكيد موعد المقابلة بنجاح", done: true }
      ]
    },
    {
      id: "GFV-2024-000129",
      name: "ياسمين صبري",
      email: "yasmine.sabri@yahoo.com",
      phone: "+20 100 123 4567",
      nationality: "مصرية",
      dob: "1992-06-25",
      country: "إسبانيا",
      flag: SpainFlag,
      visaType: "سياحة",
      partner: "Nile Travel",
      totalFee: 3000,
      paidAmount: 1500,
      commission: 500,
      status: "في انتظار البيانات",
      statusColorClass: "text-amber-600 bg-amber-50 border-amber-100",
      date: "2024-06-20",
      passportNum: "NP345678",
      filesChecklist: [
        { name: "جواز السفر وتصوير كامل الصفحات", completed: true },
        { name: "شهادة قيد بنكي موثقة من بنك معتمد بمصر", completed: false },
        { name: "كشف حركات الحساب لـ 6 أشهر الأخيرة", completed: false },
        { name: "خطاب الموارد البشرية (HR Letter)", completed: true }
      ],
      timeline: [
        { title: "تعديل حجز موعد التقديم", time: "2024-06-20 14:00", desc: "تحديث موعد التقديم في مكتب BLS ليتناسب مع تأخر كشف الحساب", done: true },
        { title: "إنشاء الملف واستلام الدفعة الأولى", time: "2024-06-19 11:20", desc: "تم تسجيل المعاملة في لوحة التحكم", done: true }
      ]
    },
    {
      id: "GFV-2024-000130",
      name: "عمر الفاروق",
      email: "omar.farooq@outlook.sa",
      phone: "+966 55 123 4567",
      nationality: "سعودية",
      dob: "1983-09-02",
      country: "تركيا",
      flag: TurkeyFlag,
      visaType: "سياحة",
      partner: "رحالة العالم للسفر",
      totalFee: 3000,
      paidAmount: 3000,
      commission: 500,
      status: "تم الإنجاز",
      statusColorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
      date: "2024-06-21",
      passportNum: "RS901234",
      filesChecklist: [
        { name: "جواز السفر وصورة الهوية الوطنية", completed: true },
        { name: "خطاب تعريف بالراتب موثق", completed: true },
        { name: "كشف حساب بنكي (3 أشهر)", completed: true },
        { name: "تأمين سفر سياحي دولي", completed: true }
      ],
      timeline: [
        { title: "إصدار التأشيرة الإلكترونية المطبوعة", time: "2024-06-21 15:30", desc: "تم إرسال ملف التأشيرة التركية بصيغة PDF للعميل والشريك", done: true },
        { title: "رفع الطلب في البوابة الإلكترونية", time: "2024-06-21 12:00", desc: "تم إدخال كافة بيانات العميل للحصول على الفيزا الإلكترونية لتركيا", done: true }
      ]
    }
  ];

  // Distinct arrays for filters
  const partnersList = [
    "شركة أبو العمران للسفريات",
    "Eagle Tourism LLC",
    "رحالة العالم للسفر",
    "Nile Travel",
    "Tunis Voyages"
  ];

  const destinationsList = [
    "فرنسا",
    "كندا",
    "إسبانيا",
    "المملكة المتحدة",
    "إيطاليا",
    "ألمانيا",
    "تركيا"
  ];

  const filteredClients = clientsData.filter(client => {
    const matchesSearch = client.name.includes(searchQuery) || 
                          client.email.includes(searchQuery) || 
                          client.id.includes(searchQuery) ||
                          client.phone.includes(searchQuery);

    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    const matchesCountry = countryFilter === "all" || client.country === countryFilter;
    const matchesPartner = partnerFilter === "all" || client.partner === partnerFilter;

    return matchesSearch && matchesStatus && matchesCountry && matchesPartner;
  });

  return (
    <div className="space-y-6 pb-12 relative">
      
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-1.5">
            <Link href="/admin" className="hover:text-[#0054A6]">الرئيسية</Link>
            <span className="mx-1">&gt;</span>
            <span>العملاء</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-700 shadow-xs">
              <UserSquare2 className="w-5 h-5 text-[#0054A6]" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800">إدارة العملاء</h1>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">إدارة وتتبع ملفات وتأشيرات العملاء المقدمة عبر الشركاء</p>
        </div>
      </div>

      {/* KPI Cards Row (5 Cards) - Flows from Right-to-Left (RTL) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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
        
        {/* Dropdowns, Search and Filter triggers (Right aligned in RTL) */}
        <div className="flex flex-wrap items-end justify-start gap-4 flex-1">
          
          {/* Action Buttons: Add Client & Export */}
          <div className="flex flex-col gap-2 min-w-[130px]">
            <button className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer h-[38px] w-full">
              <Plus className="w-4 h-4" />
              <span>إضافة عميل جديد</span>
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors h-[38px] cursor-pointer">
              <div className="flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>تصدير البيانات</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Partner Agency Filter */}
          <div className="flex flex-col gap-1.5 min-w-[150px]">
            <label className="text-[11px] text-slate-500 font-bold">الوكالة الشريكة</label>
            <div className="relative">
              <select 
                value={partnerFilter}
                onChange={(e) => setPartnerFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">جميع الشركاء</option>
                {partnersList.map((p, i) => (
                  <option key={i} value={p}>{p}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* Destination Country Filter */}
          <div className="flex flex-col gap-1.5 min-w-[120px]">
            <label className="text-[11px] text-slate-500 font-bold">وجهة السفر</label>
            <div className="relative">
              <select 
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
              >
                <option value="all">جميع الوجهات</option>
                {destinationsList.map((d, i) => (
                  <option key={i} value={d}>{d}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none" />
            </div>
          </div>

          {/* Status Select */}
          <div className="flex flex-col gap-1.5 min-w-[120px]">
            <label className="text-[11px] text-slate-500 font-bold">حالة الملف</label>
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-right text-xs font-bold text-slate-600 focus:bg-white focus:border-[#0054A6] outline-none cursor-pointer h-[38px]"
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
            <label className="text-[11px] text-slate-500 font-bold">بحث سريع</label>
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

          {/* Advanced Filter Trigger */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-transparent select-none">تصفية</span>
            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer h-[38px]">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>خيارات إضافية</span>
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
              {filteredClients.map((client) => {
                const Flag = client.flag;
                const paidPercent = Math.round((client.paidAmount / client.totalFee) * 100);
                
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
                        <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-black text-[11px]">
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
                    <td className="py-4 text-slate-500">{client.visaType}</td>

                    {/* Payments Progress */}
                    <td className="py-4 font-bold text-slate-700">
                      <div className="flex flex-col gap-1 items-start w-32" dir="ltr">
                        <span className="text-[10px] text-slate-500">
                          {client.paidAmount.toLocaleString()} / {client.totalFee.toLocaleString()}
                        </span>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              paidPercent === 100 ? "bg-emerald-500" : paidPercent > 0 ? "bg-blue-500" : "bg-slate-300"
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
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200/50 shadow-2xs cursor-pointer">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200/50 shadow-2xs cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg border border-blue-200/50 shadow-2xs cursor-pointer">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => { setSelectedClient(client); setDrawerTab("info"); }}
                          className="p-1.5 text-[#0054A6] hover:text-blue-800 hover:bg-blue-50 rounded-lg border border-slate-200/50 shadow-2xs cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div className="p-6 border-t border-slate-50 flex items-center justify-between flex-wrap gap-4 text-xs font-bold text-slate-500">
          
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

          <div className="text-slate-400 font-medium">
            عرض 1 إلى {filteredClients.length} من أصل {filteredClients.length} عميل
          </div>

        </div>

      </div>

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
                      <span className="text-xs font-bold text-slate-700 mt-1 block" dir="ltr">{selectedClient.email}</span>
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
              <button className="px-4 py-2.5 bg-[#0054A6] hover:bg-[#003B75] text-white rounded-xl text-xs font-bold text-center transition-all shadow-xs cursor-pointer">
                تحديث حالة الملف
              </button>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
