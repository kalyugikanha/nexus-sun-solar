import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "SunTech - Vadodara's No.1 Solar Panel Cleaning Company",
  description:
    "SunTech is Vadodara's trusted leader in professional solar panel cleaning. Professional methods, expert team, 11+ years of experience. Book now!",
  keywords: "solar panel cleaning, solar cleaning Vadodara, solar maintenance, SunTech, solar panel service Gujarat",
  openGraph: {
    title: "SunTech - Vadodara's No.1 Solar Panel Cleaning Company",
    description: "Professional solar panel cleaning services in Vadodara. Boost your energy efficiency with SunTech.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import ClientProviders from "@/components/ClientProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <ClientProviders>
          <Header />
          <main className="flex-1 pt-[72px]">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ClientProviders>
      </body>
    </html>
  );
}
