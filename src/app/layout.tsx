import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "بوابة شركاء GoForVisa | برنامج التسويق بالعمولة والتسجيل كشريك",
  description: "انضم إلى برنامج شركاء GoForVisa واربح عمولات مجزية عن كل ملف تأشيرة مكتمل بنجاح. أرسل عملاءك ونحن نتكفل بكافة إجراءات الفيزا والمتابعة.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-bg-light text-primary-navy">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

