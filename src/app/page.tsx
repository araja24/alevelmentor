import dynamic from "next/dynamic";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";

const DashboardPreviewSection = dynamic(
  () => import("@/components/landing/DashboardPreviewSection").then((m) => ({ default: m.DashboardPreviewSection })),
  { ssr: true, loading: () => <section className="min-h-[400px] md:min-h-[500px]" aria-hidden /> }
);

const Problem = dynamic(
  () => import("@/components/landing/Problem").then((m) => ({ default: m.Problem })),
  { ssr: true, loading: () => <section className="min-h-[320px]" aria-hidden /> }
);

const SystemBridge = dynamic(
  () => import("@/components/landing/SystemBridge").then((m) => ({ default: m.SystemBridge })),
  { ssr: true, loading: () => <section className="min-h-[280px]" aria-hidden /> }
);

const FeaturePreviews = dynamic(
  () => import("@/components/landing/FeaturePreviews").then((m) => ({ default: m.FeaturePreviews })),
  { ssr: true, loading: () => <section className="min-h-[400px]" aria-hidden /> }
);

const MoreFeatures = dynamic(
  () => import("@/components/landing/MoreFeatures").then((m) => ({ default: m.MoreFeatures })),
  { ssr: true, loading: () => <section className="min-h-[320px]" aria-hidden /> }
);

const ComparisonTable = dynamic(
  () => import("@/components/landing/ComparisonTable").then((m) => ({ default: m.ComparisonTable })),
  { ssr: true, loading: () => <section className="min-h-[360px]" aria-hidden /> }
);

const ImpactStats = dynamic(
  () => import("@/components/landing/ImpactStats").then((m) => ({ default: m.ImpactStats })),
  { ssr: true, loading: () => <section className="min-h-[200px]" aria-hidden /> }
);

const FAQ = dynamic(
  () => import("@/components/landing/FAQ").then((m) => ({ default: m.FAQ })),
  { ssr: true, loading: () => <section className="min-h-[300px]" aria-hidden /> }
);

const FinalCTA = dynamic(
  () => import("@/components/landing/FinalCTA").then((m) => ({ default: m.FinalCTA })),
  { ssr: true, loading: () => <section className="min-h-[480px]" aria-hidden /> }
);

const Footer = dynamic(
  () => import("@/components/landing/Footer").then((m) => ({ default: m.Footer })),
  { ssr: true, loading: () => <footer className="min-h-[200px]" aria-hidden /> }
);

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
