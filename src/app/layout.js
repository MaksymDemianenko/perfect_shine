import { Geist, Geist_Mono } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PerfectShine – Profesjonalne Sprzątanie w Krakowie",
  description:
    "Profesjonalne sprzątanie mieszkań, biur i lokali w Krakowie. Sprzątanie regularne, generalne, po remoncie. Szybka wycena online. Zadzwoń: +48 575 199 937.",
  keywords:
    "sprzątanie Kraków, sprzątanie mieszkań Kraków, sprzątanie generalne, sprzątanie po remoncie, PerfectShine",
  verification: {
    google: "KKD-dAIoUZxip3oLclCAmM_F-KwEQd7weV5gs9E_s6A",
  },
  openGraph: {
    title: "PerfectShine – Profesjonalne Sprzątanie w Krakowie",
    description:
      "Profesjonalne sprzątanie mieszkań i biur w Krakowie z efektem WOW. Szybka wycena online.",
    url: "https://perfectshine-krakow.pl",
    siteName: "PerfectShine",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}