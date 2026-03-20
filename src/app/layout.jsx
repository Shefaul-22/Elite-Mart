import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar"; 
import NextAuthProvider from "@/provider/NextAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Elite Mart | Your One-Stop Shop",
  description: "Experience premium shopping with Elite Mart",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* NextAuthProvider  */}
        <NextAuthProvider>
          {/* Navbar */}
          <Navbar />
          
          {/* main  */}
          <main className="flex-grow">
            {children}
          </main>
          
    
        </NextAuthProvider>
      </body>
    </html>
  );
}