import { AnimatedBackground } from "@/components/landing/AnimatedBackground";
import { MouseGlow } from "@/components/landing/MouseGlow";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { Problem } from "@/components/landing/Problem";
import { Solution } from "@/components/landing/Solution";
import { FeaturePreviews } from "@/components/landing/FeaturePreviews";
import { AnalyticsPreview } from "@/components/landing/AnalyticsPreview";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen font-[family-name:var(--font-geist-sans)]">
      <AnimatedBackground />
      <MouseGlow />
      <Navbar />
      <Hero />
      <SocialProof />
      <Problem />
      <Solution />
      <FeaturePreviews />
      <AnalyticsPreview />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
