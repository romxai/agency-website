import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const redHatDisplay = localFont({
  src: "../../public/RedHatDisplay-VariableFont_wght.ttf",
  variable: "--font-red-hat-display",
  weight: "300 900",
});

const monestaSemibold = localFont({
  src: "../../public/monesta-semibold.otf",
  variable: "--font-monesta-semibold",
  weight: "600",
});

export const metadata: Metadata = {
  title: "DevAgency - Modern Software Development",
  description:
    "Premium software development agency specializing in web applications, mobile apps, AI agents, and UX/UI design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${redHatDisplay.variable} ${monestaSemibold.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-[#030712] text-white font-red-hat-display`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
