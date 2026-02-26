import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import StructuredData from "@/components/StructuredData";
import Navigation from "@/components/Navigation";
import LenisScroll from "@/components/LenisScroll";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://codewithnabi.dev'),
  title: {
    default: "Muhammad Nabi Rahmani - Flutter Developer | codewithnabi",
    template: "%s | Muhammad Nabi Rahmani"
  },
  description: "Flutter Developer crafting beautiful mobile experiences with clean code and intuitive design. Specializing in Flutter, Dart, Firebase, and mobile app development.",
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
    url: "https://codewithnabi.dev",
    siteName: "codewithnabi",
    title: "Muhammad Nabi Rahmani - Flutter Developer",
    description: "Flutter Developer crafting beautiful mobile experiences with clean code and intuitive design.",
    images: [
      {
        url: "https://codewithnabi.dev/assets/branding/profile.jpg",
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
    description: "Flutter Developer crafting beautiful mobile experiences with clean code and intuitive design.",
    images: ["https://codewithnabi.dev/assets/branding/profile.jpg"],
  },
  alternates: {
    canonical: "https://codewithnabi.dev",
  },
  verification: {
    google: "GAMk4x7JhaNoGl7qzjirxFruCq8shbJgCSZdCdJTz8M",
  },
  icons: {
    icon: [
      { url: '/assets/branding/profile.jpg' },
      { url: '/assets/branding/profile.jpg', sizes: '32x32', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/assets/branding/profile.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
        <StructuredData />
      </head>
      <body
        className={`${GeistSans.className} antialiased min-h-screen overflow-x-hidden`}
      >
        <LenisScroll />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
