import dynamic from "next/dynamic";
import { DeferSplashCursorGate } from "@/components/landing/DeferSplashCursorGate";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { LazyWhenVisible } from "@/components/landing/LazyWhenVisible";

// Above-the-fold: Navbar + Hero (LCP). Below-the-fold: dynamic + LazyWhenVisible so they load only when in view.

const Problem = dynamic(
  () => import("@/components/landing/Problem").then((m) => ({ default: m.Problem })),
  { loading: () => <section className="min-h-[320px]" aria-hidden /> }
);

const FeaturePreviews = dynamic(
  () => import("@/components/landing/FeaturePreviews").then((m) => ({ default: m.FeaturePreviews })),
  { loading: () => <section className="min-h-[400px]" aria-hidden /> }
);

const ComparisonTable = dynamic(
  () => import("@/components/landing/ComparisonTable").then((m) => ({ default: m.ComparisonTable })),
  { loading: () => <section className="min-h-[360px]" aria-hidden /> }
);

const FAQ = dynamic(
  () => import("@/components/landing/FAQ").then((m) => ({ default: m.FAQ })),
  { loading: () => <section className="min-h-[300px]" aria-hidden /> }
);

const FinalCTA = dynamic(
  () => import("@/components/landing/FinalCTA").then((m) => ({ default: m.FinalCTA })),
  { loading: () => <section className="min-h-[480px]" aria-hidden /> }
);

const Footer = dynamic(
  () => import("@/components/landing/Footer").then((m) => ({ default: m.Footer })),
  { loading: () => <footer className="min-h-[200px]" aria-hidden /> }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-clip pb-[env(safe-area-inset-bottom)] md:pb-0 selection:bg-[#533fec]/30 selection:text-white">
      <DeferSplashCursorGate />
      <Navbar />
      <Hero />

      <LazyWhenVisible fallback={<section className="min-h-[320px]" aria-hidden />}>
        <Problem />
      </LazyWhenVisible>

      <LazyWhenVisible fallback={<section className="min-h-[400px]" aria-hidden />}>
        <FeaturePreviews />
      </LazyWhenVisible>

      <LazyWhenVisible fallback={<section className="min-h-[360px]" aria-hidden />}>
        <ComparisonTable />
      </LazyWhenVisible>

      <LazyWhenVisible fallback={<section className="min-h-[980px]" aria-hidden />}>
        <FAQ />
        <FinalCTA />
        <Footer />
      </LazyWhenVisible>
    </main>
  );
}
