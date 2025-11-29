import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import KonamiCode from "@/components/KonamiCode";
import BackToTop from "@/components/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Viewport configuration for mobile
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0F23" },
  ],
};

export const metadata: Metadata = {
  title: "Ayaan Agarwal | Aspiring Developer",
  description: "Portfolio of Ayaan Agarwal, a 10th-grade student passionate about technology, coding, and AI.",
  keywords: ["Ayaan Agarwal", "Portfolio", "Web Developer", "Student", "Next.js", "React"],
  authors: [{ name: "Ayaan Agarwal" }],
  creator: "Ayaan Agarwal",
  openGraph: {
    title: "Ayaan Agarwal | Aspiring Developer",
    description: "Portfolio of Ayaan Agarwal, a 10th-grade student passionate about technology, coding, and AI.",
    url: "https://ayaanagarwal.com",
    siteName: "Ayaan Agarwal Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ayaan Agarwal Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayaan Agarwal | Aspiring Developer",
    description: "Portfolio of Ayaan Agarwal, a 10th-grade student passionate about technology, coding, and AI.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Apple-specific meta tags for better PWA support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-dark-bg text-foreground transition-colors duration-300`}
      >
        <Providers>
          <ScrollProgress />
          <CommandPalette />
          <KonamiCode />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
