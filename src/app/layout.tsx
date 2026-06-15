import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Z Shop - Your One-Stop E-Commerce Destination",
  description: "Discover amazing deals on electronics, fashion, home goods, and more. Shop the best products at unbeatable prices with free shipping on orders over $50.",
  keywords: ["Z Shop", "e-commerce", "online shopping", "electronics", "fashion", "home goods"],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Z Shop - Your One-Stop E-Commerce Destination",
    description: "Discover amazing deals on electronics, fashion, home goods, and more.",
    siteName: "Z Shop",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
