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
import Script from "next/script";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, personSchema, websiteSchema } from "@/lib/seo";
import { getProfile } from "@/lib/query";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Israfil Hossain - Full-Stack Software Engineer & Writer",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} - Full-Stack Software Engineer & Writer`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Full-Stack Software Engineer & Writer`,
    description: SITE_DESCRIPTION,
    creator: "@mannupaaji",
    site: "@mannupaaji",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { WhatsAppButton } from "@/components/WhatsAppButton";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileData = await getProfile();
  const profile = profileData?.[0] || null;

  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
      <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="canonical" href={SITE_URL} />
      <body
        className={twMerge(
          inter.className,
          "flex antialiased h-screen overflow-hidden bg-gray-100"
        )}
      >
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@graph": [personSchema, websiteSchema],
            }),
          }}
        />
        <ReactQueryProvider>
        <Sidebar profileData={profile} />
        <Toaster position="top-right" />
        <main className="lg:pl-2 lg:pt-2 bg-gray-100 flex-1 overflow-y-auto w-full ">
          <div className="flex-1 bg-white min-h-screen lg:rounded-tl-xl border border-transparent lg:border-neutral-200 overflow-y-auto lg:mb-0 mb-10">
              {children}
              <Footer />
          </div>
        </main>
        
        <FloatingNavbar />
        <WhatsAppButton />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
