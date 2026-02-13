"use client";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base background — adapts to theme */}
      <div className="absolute inset-0 bg-background" />

      {/* Slow drifting gradient mesh — creates depth */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] animate-gradient-drift"
        style={{
          background:
            "linear-gradient(135deg, rgba(90,53,248,0.4) 0%, transparent 30%, rgba(139,108,249,0.3) 50%, transparent 70%, rgba(99,102,241,0.2) 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Aurora orb 1 — brand purple */}
      <div
        className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-15 dark:opacity-20 animate-aurora"
        style={{
          background:
            "radial-gradient(circle, rgba(90,53,248,0.4) 0%, transparent 70%)",
        }}
      />

      {/* Aurora orb 2 — lighter purple */}
      <div
        className="absolute top-1/3 -right-20 h-[500px] w-[500px] rounded-full opacity-10 dark:opacity-15 animate-aurora"
        style={{
          background:
            "radial-gradient(circle, rgba(139,108,249,0.35) 0%, transparent 70%)",
          animationDelay: "-7s",
          animationDuration: "25s",
        }}
      />

      {/* Aurora orb 3 — indigo accent */}
      <div
        className="absolute -bottom-40 left-1/3 h-[450px] w-[450px] rounded-full opacity-8 dark:opacity-10 animate-aurora"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
          animationDelay: "-13s",
          animationDuration: "22s",
        }}
      />

      {/* Floating dot particles — varied sizes and speeds */}
      <div className="absolute top-1/4 left-1/4 h-1 w-1 rounded-full bg-[#5a35f8]/30 animate-float-drift" />
      <div
        className="absolute top-2/3 right-1/3 h-1.5 w-1.5 rounded-full bg-[#5a35f8]/20 animate-float-drift"
        style={{ animationDelay: "-3s", animationDuration: "14s" }}
      />
      <div
        className="absolute top-1/2 left-2/3 h-1 w-1 rounded-full bg-[#8b6cf9]/25 animate-float-drift"
        style={{ animationDelay: "-5s", animationDuration: "16s" }}
      />
      <div
        className="absolute top-[15%] right-[20%] h-0.5 w-0.5 rounded-full bg-[#5a35f8]/20 animate-float-drift"
        style={{ animationDelay: "-8s", animationDuration: "18s" }}
      />
      <div
        className="absolute top-[80%] left-[15%] h-1 w-1 rounded-full bg-[#8b6cf9]/15 animate-float-drift"
        style={{ animationDelay: "-2s", animationDuration: "15s" }}
      />

      {/* Rising particles — subtle vertical drift */}
      <div
        className="absolute bottom-0 left-[20%] h-1 w-1 rounded-full bg-[#5a35f8]/15 dark:bg-[#5a35f8]/20 animate-particle-rise"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute bottom-0 left-[50%] h-0.5 w-0.5 rounded-full bg-[#8b6cf9]/15 dark:bg-[#8b6cf9]/20 animate-particle-rise"
        style={{ animationDelay: "-6s", animationDuration: "22s" }}
      />
      <div
        className="absolute bottom-0 right-[25%] h-1 w-1 rounded-full bg-[#5a35f8]/10 dark:bg-[#5a35f8]/15 animate-particle-rise"
        style={{ animationDelay: "-12s", animationDuration: "20s" }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(90,53,248,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(90,53,248,0.15) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top/bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  );
}
