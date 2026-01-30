import type { Metadata } from "next";
import "./globals.css";
import "../styles/themes.css";

export const metadata: Metadata = {
  title: "Cascade - AI Presentation Platform",
  description: "Generate beautiful, AI-powered presentations from any URL. Transform web content into persuasive sales decks instantly.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Cascade - AI Presentation Platform",
    description: "Generate beautiful, AI-powered presentations from any URL",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cascade - AI Presentation Platform",
    description: "Generate beautiful, AI-powered presentations from any URL",
    images: ['/og-image.png'],
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
