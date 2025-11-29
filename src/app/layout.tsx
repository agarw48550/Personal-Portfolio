import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import KonamiCode from "@/components/KonamiCode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayaan Agarwal | Aspiring Developer",
  description: "Portfolio of Ayaan Agarwal, a 10th-grade student passionate about technology, coding, and AI.",
  keywords: ["Ayaan Agarwal", "Portfolio", "Web Developer", "Student", "Next.js", "React"],
  openGraph: {
    title: "Ayaan Agarwal | Aspiring Developer",
    description: "Portfolio of Ayaan Agarwal, a 10th-grade student passionate about technology, coding, and AI.",
    url: "https://ayaanagarwal.com",
    siteName: "Ayaan Agarwal Portfolio",
    images: [
      {
        url: "/images/og-image.png", // Placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-dark-bg text-foreground transition-colors duration-300`}
      >
        <Providers>
          <ScrollProgress />
          <CommandPalette />
          <KonamiCode />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
