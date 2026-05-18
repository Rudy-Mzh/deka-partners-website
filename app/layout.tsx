import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "./components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEKA Partners | Investissement Immobilier & Conseil Patrimonial",
  description: "Spécialistes en acquisition, valorisation et cession immobilière à La Rochelle et Littoral Atlantique. Conseil en investissement immobilier et arbitrage patrimonial.",
  keywords: "investissement immobilier, La Rochelle, acquisition immobilière, cession, conseil patrimonial",
  openGraph: {
    title: "DEKA Partners",
    description: "Spécialistes en investissement immobilier et conseil patrimonial",
    url: "https://deka-partners.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
