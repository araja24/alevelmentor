import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { DashboardPreviewSection } from "@/components/landing/DashboardPreviewSection";
import { Problem } from "@/components/landing/Problem";
import { SystemBridge } from "@/components/landing/SystemBridge";
import { ImpactStats } from "@/components/landing/ImpactStats";
import { FeaturePreviews } from "@/components/landing/FeaturePreviews";
import { MoreFeatures } from "@/components/landing/MoreFeatures";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-[var(--bg-primary)] overflow-x-clip selection:bg-indigo-500/30 selection:text-white">
            <Navbar />
            <Hero />
            <DashboardPreviewSection />
            <Problem />
            <SystemBridge />
            <FeaturePreviews />
            <MoreFeatures />
            <ComparisonTable />
            <ImpactStats />
            <FAQ />
            <FinalCTA />
            <Footer />
        </main>
    );
}
