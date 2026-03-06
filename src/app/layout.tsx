import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Placement Portal | Centralized Management",
  description: "AI-Powered College Placement Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-cyan-500/30 flex overflow-hidden`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
