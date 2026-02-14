import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { Solution } from "@/components/landing/Solution";
import { ImpactStats } from "@/components/landing/ImpactStats";

import { FeaturePreviews } from "@/components/landing/FeaturePreviews";
import { AppPreview } from "@/components/landing/AppPreview";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="dark relative min-h-screen bg-[#09090b] font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <ImpactStats />

      <FeaturePreviews />
      <AppPreview />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
