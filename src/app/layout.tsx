import type { Metadata } from "next";
import { Caveat, Inter, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LowTierProvider } from "@/hooks/useLowTierDevice";
import { SmoothScroll } from "@/components/landing/SmoothScroll";
import { AnalyticsInit } from "@/components/AnalyticsInit";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap", // Don’t block LCP on font; use system fallback if not cached
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap", // Don’t block LCP; hero can paint with fallback immediately
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-caveat",
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
    <html lang="en" suppressHydrationWarning className={caveat.variable}>
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
