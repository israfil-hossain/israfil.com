// app/layout.tsx
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "@/provider/react-query-provider";
import { FloatingNavbar } from "@/components/floating-navbar";
import SocialLinks from "@/components/social-links/SocialLinks";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Israfil Hossain - Software Engineer",
  description:
    "Israfil Hossain is a Software Engineer, writer. He is a digital nomad and travels around the world while working remotely.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        className={twMerge(
          inter.className,
          "flex antialiased h-screen overflow-hidden bg-gray-100"
        )}
      >
        <ReactQueryProvider>
        <Sidebar />
        <Toaster position="top-right" />
        <div className="lg:pl-2 lg:pt-2 bg-gray-100 flex-1 overflow-y-auto">
          <div className="flex-1 bg-white min-h-screen lg:rounded-tl-xl border border-transparent lg:border-neutral-200 overflow-y-auto lg:mb-0 mb-10">
              {children}
              <Footer />
          </div>
        </div>
        
        <FloatingNavbar />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
