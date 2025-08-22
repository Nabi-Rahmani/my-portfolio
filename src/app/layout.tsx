import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
        url: "https://codewithnabi.dev/assets/images/myimage.JPG",
        width: 1200,
        height: 630,
        alt: "Muhammad Nabi Rahmani - Flutter Developer",
      },
      {
        url: "https://codewithnabi.dev/assets/logo/Youtub-logo.png",
        width: 512,
        height: 512,
        alt: "codewithnabi logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nabirahmani_dev",
    creator: "@nabirahmani_dev",
    title: "Muhammad Nabi Rahmani - Flutter Developer",
    description: "Flutter Developer crafting beautiful mobile experiences with clean code and intuitive design.",
    images: ["https://codewithnabi.dev/assets/images/myimage.JPG"],
  },
  alternates: {
    canonical: "https://codewithnabi.dev",
  },
  verification: {
    google: "your-google-verification-code", // We'll add this later
  },
  icons: {
    icon: [
      { url: '/assets/logo/Youtub-logo.png' },
      { url: '/assets/logo/Youtub-logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/logo/Youtub-logo.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/logo/Youtub-logo.png' },
      { url: '/assets/logo/Youtub-logo.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/assets/logo/Youtub-logo.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
