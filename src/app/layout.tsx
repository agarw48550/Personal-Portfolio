import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

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
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a12" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Ayaan Agarwal | Full-Stack Developer",
    template: "%s | Ayaan Agarwal"
  },
  description: "Interactive OS-style portfolio of Ayaan Agarwal. A passionate full-stack developer specializing in React, Next.js, and modern web technologies. Explore my projects, skills, and journey.",
  keywords: [
    "Ayaan Agarwal", 
    "Portfolio", 
    "Full-Stack Developer", 
    "Web Developer", 
    "React Developer",
    "Next.js", 
    "TypeScript",
    "Singapore Developer",
    "UWCSEA",
    "Student Developer",
    "Creative Portfolio",
    "Interactive Portfolio"
  ],
  authors: [{ name: "Ayaan Agarwal", url: "https://ayaanagarwal.dev" }],
  creator: "Ayaan Agarwal",
  publisher: "Ayaan Agarwal",
  metadataBase: new URL("https://ayaanagarwal.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ayaan Agarwal | Full-Stack Developer",
    description: "Interactive OS-style portfolio showcasing projects in React, Next.js, and AI. Explore the matrix!",
    url: "https://ayaanagarwal.dev",
    siteName: "Ayaan Agarwal Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ayaan Agarwal - Full-Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayaan Agarwal | Full-Stack Developer",
    description: "Interactive OS-style portfolio showcasing projects in React, Next.js, and AI.",
    images: ["/images/og-image.png"],
    creator: "@ayaanagarwal",
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
  verification: {
    // Add your verification codes when you have them
    // google: "your-google-verification-code",
  },
  category: "technology",
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ayaan Agarwal",
  url: "https://ayaanagarwal.dev",
  image: "https://ayaanagarwal.dev/images/avatar.jpg",
  sameAs: [
    "https://github.com/agarw48550",
    "https://linkedin.com/in/ayaanagarwal",
  ],
  jobTitle: "Student Developer",
  worksFor: {
    "@type": "EducationalOrganization",
    name: "UWCSEA"
  },
  knowsAbout: ["React", "Next.js", "TypeScript", "Python", "Web Development", "AI"],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "UWC South East Asia"
  }
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
        
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-dark-bg text-foreground transition-colors duration-300`}
      >
        <Providers>
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
