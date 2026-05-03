import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/client/Header';
import SearchResults from '@/components/client/SearchResults';
import WaiterButton from '@/components/client/WaiterButton';
import MenuDataProvider from '@/providers/MenuDataProvider';
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Appetite | Digital Menu",
  description: "Experience the finest flavors at Mechinagar Resort",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        {/* 
            FIXED: Everything using useSearchParams (Provider, WaiterButton, etc.)
            must be inside this boundary to fix the build error.
        */}
        <Suspense fallback={
          <div className="h-screen w-screen flex flex-col items-center justify-center bg-black gap-4">
            <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <div className="animate-pulse text-primary font-black uppercase tracking-[0.3em] text-[10px]">
              Loading Menu...
            </div>
          </div>
        }>
          <MenuDataProvider>
            <Header />
            <SearchResults />
            
            {/* The main content of your pages */}
            <main className="flex-grow">
              {children}
            </main>

            {/* Floating Action Button */}
            <WaiterButton />
          </MenuDataProvider>
        </Suspense>
      </body>
    </html>
  );
}