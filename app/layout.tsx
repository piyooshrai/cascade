import type { Metadata } from "next";
import "./globals.css";
import "../styles/themes.css";

export const metadata: Metadata = {
  title: "Cascade - Presentation Platform",
  description: "Transform any URL into professional sales presentations in seconds. No PowerPoint, no templates - just results.",
  metadataBase: new URL('https://cascade-gray.vercel.app'),
  openGraph: {
    title: "Cascade - Presentation Platform",
    description: "Transform any URL into professional sales presentations in seconds. No PowerPoint, no templates - just results.",
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Cascade - Professional Presentations from Any URL'
    }],
    type: 'website',
    siteName: 'Cascade'
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cascade - Presentation Platform",
    description: "Transform any URL into professional sales presentations in seconds. No PowerPoint, no templates - just results.",
    images: [{
      url: '/og-image.jpg',
      alt: 'Cascade - Professional Presentations from Any URL'
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
