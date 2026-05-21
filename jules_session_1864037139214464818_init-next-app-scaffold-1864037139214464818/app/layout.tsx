import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Link from 'next/link';

export const metadata: Metadata = {
  title: "AI-Powered Tutor",
  description: "Your personalized tutor for SSC, HSC, BCS, University Admission, and more.",
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
      <body className="min-h-full flex flex-col">
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">AITutor BD</Link>
            <div className="space-x-4">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <Link href="/exams" className="hover:underline">Exams</Link>
            </div>
          </div>
        </nav>
        <main className="flex-1 bg-gray-50">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
          &copy; {new Date().getFullYear()} AITutor BD. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
