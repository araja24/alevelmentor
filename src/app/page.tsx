import dynamic from "next/dynamic";
import { DeferSplashCursorGate } from "@/components/landing/DeferSplashCursorGate";
import { LazyWhenVisible } from "@/components/landing/LazyWhenVisible";

const Navbar = dynamic(
  () => import("@/components/landing/Navbar").then((m) => ({ default: m.Navbar })),
  {
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
    loading: () => (
      <section className="relative flex flex-col items-center justify-center pt-24 pb-16 lg:pt-28 lg:pb-20 min-h-[520px]" />
    ),
  }
);

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
