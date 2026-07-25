import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import Navigation from "@/components/Navigation";
import LenisScroll from "@/components/LenisScroll";
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

const playfairDisplay = Playfair_Display({
  weight: ["700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.codewithnabi.dev'),
  title: {
    default: "Nabi Rahmani — Flutter Product Engineer",
    template: "%s | Muhammad Nabi Rahmani"
  },
  description:
    "Flutter product engineer with 3+ years of experience shipping dependable, offline-first mobile products from architecture to Play Store release.",
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
    title: "Nabi Rahmani — Flutter Product Engineer",
    description:
      "3+ years shipping dependable Flutter products from architecture to Play Store release.",
    images: [
      {
        url: "https://www.codewithnabi.dev/og.png",
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
    images: ["https://www.codewithnabi.dev/og.png"],
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
    <html lang="en" className={`${instrumentSans.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t==='dark')}catch(e){document.documentElement.classList.remove('dark')}})()`,
          }}
        />
        <StructuredData />
      </head>
      <body className="antialiased min-h-screen overflow-x-hidden">
        <LenisScroll />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
