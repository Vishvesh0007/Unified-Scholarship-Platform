import "./globals.css";
import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import Jago from "@/components/Jago";
import SwRegister from "@/components/SwRegister";

export const metadata: Metadata = {
  title: "Unified Scholarship Platform — One Profile, Every Scholarship",
  description:
    "A unified student-centric platform connecting NSP, MoTA, DigiLocker and DBT/PFMS. One profile, one document wallet, one status timeline for every tribal scholarship. Prototype by Team Vecood.",
  manifest: "/manifest.json",
  keywords: ["scholarship", "tribal students", "NSP", "MoTA", "DigiLocker", "DBT", "SIH", "unified platform", "Team Vecood"],
};

export const viewport: Viewport = { themeColor: "#1a365d" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-bg antialiased">
        <Nav />
        <div className="flex-1">
          {children}
        </div>
        <Jago />
        <SwRegister />
      </body>
    </html>
  );
}
