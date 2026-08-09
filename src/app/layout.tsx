import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import StructuredData from "@/components/StructuredData";
import { absoluteUrl, siteConfig } from "@/config/site";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Nabi Rahmani — Flutter Product Engineer",
    template: "%s | Muhammad Nabi Rahmani"
  },
  description:
    "Flutter product engineer with 3+ years of experience shipping dependable, offline-first mobile products from architecture to Play Store release.",
  keywords: ["Flutter Developer", "Mobile App Developer", "Dart", "Firebase", "codewithnabi", "Muhammad Nabi Rahmani", "App Development", "Mobile Development"],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: "Muhammad Nabi Rahmani",
  publisher: "Muhammad Nabi Rahmani",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    siteName: "codewithnabi",
    title: "Nabi Rahmani — Flutter Product Engineer",
    description:
      "3+ years shipping dependable Flutter products from architecture to Play Store release.",
    images: [
      {
        url: absoluteUrl('/og.png'),
        width: 1200,
        height: 630,
        alt: "Nabi Rahmani — Flutter Product Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nabirahmani_dev",
    creator: "@nabirahmani_dev",
    title: "Nabi Rahmani — Flutter Product Engineer",
    description:
      "3+ years shipping dependable Flutter products from architecture to Play Store release.",
    images: [absoluteUrl('/og.png')],
  },
  alternates: {
    canonical: siteConfig.siteUrl,
    types: {
      'application/rss+xml': absoluteUrl('/feed.xml'),
    },
  },
  manifest: absoluteUrl('/site.webmanifest'),
  verification: {
    google: "GAMk4x7JhaNoGl7qzjirxFruCq8shbJgCSZdCdJTz8M",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/assets/branding/profile.jpg', sizes: '192x192', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/assets/branding/profile.jpg', sizes: '512x512', type: 'image/jpeg', rel: 'mask-icon' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){document.documentElement.classList.toggle('dark',window.matchMedia('(prefers-color-scheme: dark)').matches)}})()`,
          }}
        />
        <StructuredData />
      </head>
      <body className="antialiased min-h-screen overflow-x-hidden">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
