import type { Metadata } from "next";
import { Inter, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LowTierProvider } from "@/hooks/useLowTierDevice";
import { SmoothScroll } from "@/components/landing/SmoothScroll";
import { AnalyticsInit } from "@/components/AnalyticsInit";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "optional", // Don’t block LCP on font; use system fallback if not cached
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "optional",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "optional", // Don’t block LCP; hero can paint with fallback immediately
  preload: false,
});

export const metadata: Metadata = {
  title: "A Level Mentor — Your Personal Revision Mentor",
  description:
    "Personalised revision plan that adapts to real life — topic tests, sick days, lazy days. We manage everything so you can follow worry-free. Built by A-Level students at UBC, Warwick, Nottingham, McGill. Ace your A-Levels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <ThemeProvider>
          <LowTierProvider>
            <SmoothScroll>{children}</SmoothScroll>
            <AnalyticsInit />
          </LowTierProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
