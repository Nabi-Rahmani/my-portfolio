import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import Navigation from "@/components/Navigation";
import LenisScroll from "@/components/LenisScroll";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.codewithnabi.dev'),
  title: {
    default: "Muhammad Nabi Rahmani - Flutter Developer | codewithnabi",
    template: "%s | Muhammad Nabi Rahmani"
  },
  description:
    "Muhammad Nabi Rahmani — Flutter / mobile engineer in Ankara. Shipped apps, clean architecture, available for freelance and full-time remote.",
  keywords: ["Flutter Developer", "Mobile App Developer", "Dart", "Firebase", "codewithnabi", "Muhammad Nabi Rahmani", "App Development", "Mobile Development"],
  authors: [{ name: "Muhammad Nabi Rahmani", url: "https://codewithnabi.dev" }],
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
    url: "https://www.codewithnabi.dev",
    siteName: "codewithnabi",
    title: "Muhammad Nabi Rahmani - Flutter Developer",
    description:
      "Flutter / mobile engineer in Ankara — shipped products, honest proof, available for freelance and full-time remote.",
    images: [
      {
        url: "https://www.codewithnabi.dev/assets/branding/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Nabi Rahmani - Flutter Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nabirahmani_dev",
    creator: "@nabirahmani_dev",
    title: "Muhammad Nabi Rahmani - Flutter Developer",
    description:
      "Flutter / mobile engineer in Ankara — shipped products, honest proof, available for freelance and full-time remote.",
    images: ["https://www.codewithnabi.dev/assets/branding/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.codewithnabi.dev",
  },
  manifest: "https://www.codewithnabi.dev/site.webmanifest",
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <StructuredData />
      </head>
      <body
        className={`${GeistSans.className} antialiased min-h-screen overflow-x-hidden`}
      >
        <LenisScroll />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
