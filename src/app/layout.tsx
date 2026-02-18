import type { Metadata } from "next";
import { Inter, Geist_Mono, Cormorant, Plus_Jakarta_Sans, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LowTierProvider } from "@/hooks/useLowTierDevice";
import { SmoothScroll } from "@/components/landing/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-uni",
  subsets: ["latin"],
  display: "swap",
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
        className={`${inter.variable} ${geistMono.variable} ${cormorant.variable} ${plusJakartaSans.variable} ${outfit.variable} antialiased`}
      >
        <ThemeProvider>
          <LowTierProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </LowTierProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
