/**
 * Root layout
 * Pattern: static-webapp-scaffold - Next.js App Router layout
 */

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

/**
 * Site configuration
 * Pattern: static-webapp-scaffold - Centralized metadata config
 */
const siteConfig = {
  name: "Static Web App Template",
  title: "Static Web App Template | Next.js + TypeScript + Jotai",
  description:
    "A template for building static web applications with Next.js, React 19, TypeScript, Jotai, and Tailwind CSS. Includes patterns for state management, theming, and type safety.",
  url: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || "http://localhost:3000",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Jotai",
    "Tailwind CSS",
    "Template",
    "Static Site",
    "Web App",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
