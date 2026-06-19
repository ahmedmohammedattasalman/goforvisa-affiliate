import Link from "next/link";
import { 
  UserPlus, 
  LogIn, 
  UserCheck, 
  MailCheck, 
  UserX, 
  Users, 
  Settings, 
  HelpCircle, 
  Phone, 
  Mail, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRightLeft 
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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-primary-navy text-white shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GoForVisaLogo />
            <div>
              <div className="flex items-center gap-0.5" dir="ltr">
                <span className="font-black italic text-base tracking-wide text-white">GOFOR</span>
                <span className="font-black italic text-base tracking-wide text-[#00A8FF]">VISA</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[6.5px] text-slate-350 block tracking-[0.16em] font-extrabold" dir="ltr">VISA • TRAVEL • SUCCESS</span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span className="text-[9px] text-accent-gold font-extrabold">برنامج الشركاء</span>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-medium">
            <a href="#about" className="hover:text-accent-gold transition-colors duration-200">عن البرنامج</a>
            <a href="#how-it-works" className="hover:text-accent-gold transition-colors duration-200">كيف يعمل؟</a>
            <a href="#benefits" className="hover:text-accent-gold transition-colors duration-200">المميزات</a>
            <a href="#support" className="hover:text-accent-gold transition-colors duration-200">الدعم الفني</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold hover:text-accent-gold transition-colors duration-200"
            >
              <LogIn className="w-4 h-4" />
              <span>تسجيل الدخول</span>
            </Link>
            <Link 
              href="/register" 
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-accent-gold hover:bg-accent-gold-hover text-primary-navy rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>انضم كشريك</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-navy to-primary-navy-dark text-white py-24 px-4 overflow-hidden border-b border-accent-gold/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent-gold/10 border border-accent-gold/30 text-accent-gold px-5 py-2 rounded-full text-sm font-bold mb-8 animate-pulse">
            <DollarSign className="w-4 h-4" />
            <span>اربح 500 درهم عن كل ملف مكتمل بنجاح</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            بوابة شركاء <span className="text-accent-gold">GoForVisa</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
            أرسل عملاؤك إلى <span className="text-white font-semibold">GoForVisa</span>، ونحن نتكفل بجميع الإجراءات اللوجستية، تعبئة النماذج، مراجعة الملفات والمتابعة حتى الإنجاز الكامل لضمان قبولهم.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/register" 
              className="w-full sm:w-auto px-8 py-4 text-base font-bold bg-accent-gold hover:bg-accent-gold-hover text-primary-navy rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 text-center"
            >
              سجل حساب شريك جديد مجاناً
            </Link>
            <Link 
              href="/login" 
              className="w-full sm:w-auto px-8 py-4 text-base font-bold bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 text-center"
            >
              تسجيل دخول الأعضاء
            </Link>
          </div>
        </div>
      </section>

      {/* Program Flow Section */}
      <section id="how-it-works" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-accent-gold uppercase tracking-wider block mb-2">رحلة النجاح</span>
          <h2 className="text-3xl font-bold text-primary-navy">كيف يعمل برنامج شركاء GoForVisa؟</h2>
          <p className="text-slate-500 mt-3 max-w-2xl mx-auto">خطوات بسيطة تبدأ من التسجيل السريع وتنتهي باستلام أرباحك وعمولاتك بكل شفافية وسرعة.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md relative hover:shadow-lg transition-shadow duration-200">
            <div className="w-12 h-12 bg-accent-gold/10 text-accent-gold rounded-xl flex items-center justify-center font-bold text-xl mb-6">
              <UserPlus className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-primary-navy mb-3">1. التسجيل كشريك</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              تقوم بتسجيل حساب جديد من صفحة "اعمل معنا" وتعبئة بياناتك الشخصية والمهنية بدقة.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md relative hover:shadow-lg transition-shadow duration-200">
            <div className="w-12 h-12 bg-accent-gold/10 text-accent-gold rounded-xl flex items-center justify-center font-bold text-xl mb-6">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-primary-navy mb-3">2. مراجعة الحساب</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              يقوم فريق عمل GoForVisa بدراسة طلبك ومراجعته للتحقق من أهليتك للانضمام إلى شبكة الشركاء.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md relative hover:shadow-lg transition-shadow duration-200">
            <div className="w-12 h-12 bg-accent-gold/10 text-accent-gold rounded-xl flex items-center justify-center font-bold text-xl mb-6">
              <MailCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-primary-navy mb-3">3. تفعيل الحساب</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              بعد الموافقة المباشرة، يتم تفعيل حسابك وإشعارك فوراً عبر بريدك الإلكتروني لتبدأ العمل.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md relative hover:shadow-lg transition-shadow duration-200">
            <div className="w-12 h-12 bg-accent-gold/10 text-accent-gold rounded-xl flex items-center justify-center font-bold text-xl mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-primary-navy mb-3">4. إرسال عميل جديد</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              تقوم بإدخال بيانات عملائك المهتمين بطلب الفيزا السياحية من خلال استمارة سهلة داخل لوحة التحكم.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md relative hover:shadow-lg transition-shadow duration-200">
            <div className="w-12 h-12 bg-accent-gold/10 text-accent-gold rounded-xl flex items-center justify-center font-bold text-xl mb-6">
              <Settings className="w-6 h-6 animate-spin-slow" />
            </div>
            <h3 className="text-xl font-bold text-primary-navy mb-3">5. معالجة الملف</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              يتواصل فريق مستشارينا مع العميل ويتكفل بكافة إجراءات حجز المواعيد، التراجم، التأمين والتحضير.
            </p>
          </div>

          {/* Step 6 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md relative hover:shadow-lg transition-shadow duration-200">
            <div className="w-12 h-12 bg-accent-gold/10 text-accent-gold rounded-xl flex items-center justify-center font-bold text-xl mb-6">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-primary-navy mb-3">6. احتساب العمولات</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              بمجرد استكمال ملف الفيزا بنجاح واستلام الرسوم، تضاف عمولة 500 درهم تلقائياً إلى رصيد حسابك.
            </p>
          </div>
        </div>
      </section>

      {/* Program Benefits Section */}
      <section id="benefits" className="bg-slate-100 py-20 px-4 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-accent-gold uppercase tracking-wider block mb-2">لماذا نحن؟</span>
            <h2 className="text-3xl font-bold text-primary-navy">مزايا حصرية لشركائنا المعتمدين</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-primary-navy mb-2">عمولات مضمونة</h4>
              <p className="text-slate-500 text-xs leading-relaxed">أرباح 500 درهم تدفع بشكل دوري دون أي تأخير عند تسليم كل ملف.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-primary-navy mb-2">شفافية وتتبع فوري</h4>
              <p className="text-slate-500 text-xs leading-relaxed">تابع حالة معالجة ملفات عملائك وتفاصيل المدفوعات والعمولات لحظة بلحظة.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-primary-navy mb-2">مصداقية عالية</h4>
              <p className="text-slate-500 text-xs leading-relaxed">تجهيز احترافي لجميع التأشيرات (شنغن، بريطانيا، أمريكا، كندا، أستراليا) لضمان القبول.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowRightLeft className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-primary-navy mb-2">دعم كامل عن بعد</h4>
              <p className="text-slate-500 text-xs leading-relaxed">شراكة لوجستية مع CTM Messagerie تضمن استلام وتسليم الوثائق في جميع مدن المغرب.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <HelpCircle className="w-16 h-16 text-accent-gold mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-primary-navy mb-4">هل لديك أي استفسار؟ فريق الدعم في خدمتك</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">مستشارو الشركاء مستعدون لمساعدتك وإرشادك لتسريع وتيرة إرسال الملفات وجني العمولات.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-slate-700 font-semibold">
            <a href="tel:+212612345678" className="flex items-center justify-center gap-2 hover:text-accent-gold transition-colors duration-200">
              <Phone className="w-5 h-5 text-accent-gold" />
              <span dir="ltr">+212 6 12 34 56 78</span>
            </a>
            <a href="mailto:contact@goforvisa.ma" className="flex items-center justify-center gap-2 hover:text-accent-gold transition-colors duration-200">
              <Mail className="w-5 h-5 text-accent-gold" />
              <span>contact@goforvisa.ma</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-navy text-slate-400 py-12 px-4 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center font-bold text-primary-navy text-sm">
              GV
            </div>
            <div>
              <span className="font-bold text-white block">GoForVisa.ma</span>
              <span className="text-xs block -mt-1">شريكك الموثوق لتأشيرات السياحة</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-accent-gold" /> الإثنين - الجمعة : 9:00 - 18:00</span>
            <span>جميع الحقوق محفوظة. GoForVisa 2024 ©</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Custom simple helper type or styling class
interface ClipboardCheckProps {
  className?: string;
}

const ClipboardCheck = ({ className }: ClipboardCheckProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={2} 
    stroke="currentColor" 
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4" />
  </svg>
);
