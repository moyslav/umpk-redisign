import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const themeScript = `(function(){try{var t=localStorage.getItem('umpk-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var d=document.documentElement;d.setAttribute('data-theme',t);var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',t==='dark'?'#1c1c1e':'#f5f5f7');}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://umpk.example.ru"),
  title: {
    default: "ГБПОУ УМПК — Уфимский многопрофильный профессиональный колледж",
    template: "%s — ГБПОУ УМПК",
  },
  description:
    "Официальный сайт ГБПОУ «Уфимский многопрофильный профессиональный колледж». Приёмная комиссия, направления подготовки, студентам, сведения об образовательной организации.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#f5f5f7" suppressHydrationWarning />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#content">
          К содержанию
        </a>
        <Header />
        <div id="content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
