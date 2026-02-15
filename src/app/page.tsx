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
        <main className="min-h-screen bg-[var(--bg-primary)] overflow-x-clip selection:bg-[#5a35f8]/30 selection:text-white">
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
        </main>
    );
}
