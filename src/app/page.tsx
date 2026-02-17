import { Suspense } from "react";
import dynamic from "next/dynamic";
import { SplashCursorGate } from "@/components/landing/SplashCursorGate";

const Navbar = dynamic(
  () => import("@/components/landing/Navbar").then((m) => ({ default: m.Navbar })),
  {
    ssr: true,
    loading: () => (
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
        <div className="mx-auto max-w-[1200px] flex items-center justify-between">
          <div className="h-5 w-[120px]" />
          <div className="hidden xl:flex items-center gap-8">
            <div className="h-4 w-16" />
            <div className="h-4 w-20" />
            <div className="h-4 w-14" />
            <div className="h-4 w-10" />
          </div>
          <div className="hidden xl:flex items-center gap-4">
            <div className="h-9 w-[120px] rounded-full" />
          </div>
        </div>
      </header>
    ),
  }
);

const Hero = dynamic(
  () => import("@/components/landing/Hero").then((m) => ({ default: m.Hero })),
  {
    ssr: true,
    loading: () => (
      <section className="relative flex flex-col items-center justify-center pt-24 pb-16 lg:pt-28 lg:pb-20 min-h-[520px]" />
    ),
  }
);

const DashboardPreviewSection = dynamic(
  () => import("@/components/landing/DashboardPreviewSection").then((m) => ({ default: m.DashboardPreviewSection })),
  { ssr: true, loading: () => <section className="min-h-[400px] md:min-h-[500px]" aria-hidden /> }
);

const Problem = dynamic(
  () => import("@/components/landing/Problem").then((m) => ({ default: m.Problem })),
  { ssr: true, loading: () => <section className="min-h-[320px]" aria-hidden /> }
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
      <SplashCursorGate />
      <Navbar />
      <Hero />
      <DashboardPreviewSection />

      <Suspense fallback={<section className="min-h-[600px]" aria-hidden />}>
        <Problem />
      </Suspense>

      <Suspense fallback={<section className="min-h-[720px]" aria-hidden />}>
        <FeaturePreviews />
        <MoreFeatures />
      </Suspense>

      <Suspense fallback={<section className="min-h-[360px]" aria-hidden />}>
        <ComparisonTable />
      </Suspense>

      <Suspense fallback={<section className="min-h-[980px]" aria-hidden />}>
        <FAQ />
        <FinalCTA />
        <Footer />
      </Suspense>
    </main>
  );
}
