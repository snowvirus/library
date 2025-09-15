import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import Providers from "./Providers";
import AdminRedirect from "@/components/AdminRedirect";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CityLibrary - Your Gateway to Knowledge",
  description: "Discover thousands of books, digital resources, and learning opportunities at your local library. Join our community of readers and lifelong learners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        <AdminRedirect />
        <Header/>
        {children}
        <Footer/>
        </Providers>
      </body>
    </html>
  );
}
