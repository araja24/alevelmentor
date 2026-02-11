import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Hook } from "@/components/landing/Hook";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SmartRoadmap } from "@/components/landing/SmartRoadmap";
import { DataAnalysis } from "@/components/landing/DataAnalysis";
import { AIMentor } from "@/components/landing/AIMentor";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <Hero />
      <Hook />
      <HowItWorks />
      <SmartRoadmap />
      <DataAnalysis />
      <AIMentor />
      <DashboardPreview />
      <FinalCTA />
      <Footer />
    </div>
  );
}
