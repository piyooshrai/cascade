import type { Metadata } from "next";
import "./globals.css";
import "../styles/themes.css";

export const metadata: Metadata = {
  title: "Cascade - AI-Powered Presentation Platform for Sales Teams",
  description: "Transform any URL into professional, persuasive sales presentations in seconds. No PowerPoint, no templates - just AI-generated slides ready to present. Choose from Executive, Minimal, or Tech themes designed for winning deals.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  openGraph: {
    title: "Cascade - AI-Powered Presentation Platform for Sales Teams",
    description: "Transform any URL into professional, persuasive sales presentations in seconds. No PowerPoint, no templates - just AI-generated slides ready to present.",
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Cascade - AI-Powered Presentations from Any URL'
    }],
    type: 'website',
    siteName: 'Cascade'
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cascade - AI-Powered Presentation Platform for Sales Teams",
    description: "Transform any URL into professional, persuasive sales presentations in seconds. No PowerPoint, no templates - just AI-generated slides ready to present.",
    images: [{
      url: '/og-image.png',
      alt: 'Cascade - AI-Powered Presentations from Any URL'
    }],
  },
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
