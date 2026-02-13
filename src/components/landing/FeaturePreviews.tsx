"use client";

import { RevealSection } from "./RevealSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Brain, Map, BarChart3, FileText, TrendingUp, Check, ArrowRight } from "lucide-react";

function AppWindow({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg card-hover">
      <div className="px-5 py-3 border-b border-border bg-muted/30 flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#5a35f8]" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function AIMentorPreview() {
  const msgs = [
    { role: "user", text: "Why do transition metals form coloured compounds?" },
    { role: "ai", text: "When light hits a transition metal complex, d-d transitions occur. Electrons absorb specific wavelengths and jump between split d-orbitals. The colour we see is the complementary colour." },
    { role: "tip", text: "Exam tip: For AQA, always mention crystal field splitting and the d-d electron transition in your answer." },
  ];

  return (
    <AppWindow title="AI Mentor" icon={Brain}>
      <div className="space-y-3 min-h-[260px]">
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div className={`rounded-2xl px-4 py-2.5 text-sm max-w-[80%] leading-relaxed ${
              m.role === "user"
                ? "bg-[#5a35f8] text-white rounded-br-md"
                : "bg-muted rounded-bl-md"
            }`}>
              {m.role === "tip" && <span className="text-[#5a35f8] font-medium">Exam tip: </span>}
              {m.role === "tip" ? m.text.replace("Exam tip: ", "") : m.text}
            </div>
          </motion.div>
        ))}
      </div>
    </AppWindow>
  );
}

function RoadmapPreview() {
  const weeks = [
    { week: "Week 1", topics: ["Atomic Structure", "Bonding", "Energetics"], progress: 100 },
    { week: "Week 2", topics: ["Kinetics", "Equilibria", "Redox"], progress: 60 },
    { week: "Week 3", topics: ["Organic Chemistry", "Mechanisms"], progress: 0 },
  ];

  return (
    <AppWindow title="Smart Roadmap" icon={Map}>
      <div className="space-y-4 min-h-[260px]">
        {weeks.map((w, i) => (
          <motion.div
            key={w.week}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-border p-4 bg-muted/20"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">{w.week}</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                w.progress === 100
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : w.progress > 0
                    ? "bg-[#5a35f8]/10 text-[#5a35f8]"
                    : "bg-muted text-muted-foreground"
              }`}>
                {w.progress === 100 ? "Complete" : w.progress > 0 ? "In progress" : "Upcoming"}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {w.topics.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#5a35f8]"
                initial={{ width: 0 }}
                whileInView={{ width: `${w.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </AppWindow>
  );
}

function AnalyticsPreviewMini() {
  const bars = [
    { label: "Chem P1", score: 82, color: "bg-emerald-500" },
    { label: "Chem P2", score: 68, color: "bg-[#5a35f8]" },
    { label: "Bio P1", score: 75, color: "bg-emerald-500" },
    { label: "Bio P2", score: 54, color: "bg-amber-500" },
    { label: "Maths P1", score: 91, color: "bg-emerald-500" },
  ];

  return (
    <AppWindow title="Performance Analytics" icon={BarChart3}>
      <div className="space-y-4 min-h-[260px]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Recent paper scores</span>
          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Avg: 74%</span>
        </div>
        <div className="space-y-3">
          {bars.map((b, i) => (
            <div key={b.label} className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-16 shrink-0">{b.label}</span>
              <div className="flex-1 h-4 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${b.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${b.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs font-medium w-8 text-right">{b.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}

function PastPaperPreview() {
  const questions = [
    { q: "Explain the bonding in BF\u2083 using hybridisation.", marks: 4, difficulty: "Medium", topic: "Bonding" },
    { q: "Calculate the enthalpy change for...", marks: 6, difficulty: "Hard", topic: "Energetics" },
    { q: "Draw the mechanism for nucleophilic addition.", marks: 3, difficulty: "Easy", topic: "Organic" },
  ];

  return (
    <AppWindow title="Past Paper Engine" icon={FileText}>
      <div className="space-y-3 min-h-[260px]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5a35f8]/10 text-[#5a35f8] font-medium">AQA Chemistry</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">2024 Paper 1</span>
        </div>
        {questions.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.01 }}
            className="group rounded-xl border border-border p-3.5 bg-muted/20 hover:border-[#5a35f8]/20 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm leading-relaxed flex-1">{q.q}</p>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0 mt-1 group-hover:text-[#5a35f8] transition-colors" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] text-muted-foreground">[{q.marks} marks]</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                q.difficulty === "Hard" ? "bg-red-500/10 text-red-500" : q.difficulty === "Medium" ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"
              }`}>
                {q.difficulty}
              </span>
              <span className="text-[10px] text-muted-foreground">{q.topic}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </AppWindow>
  );
}

function GradePredictorPreview() {
  return (
    <AppWindow title="Grade Predictor" icon={TrendingUp}>
      <div className="flex flex-col items-center justify-center min-h-[260px] space-y-6">
        {/* Gauge */}
        <div className="relative">
          <svg width="180" height="100" viewBox="0 0 180 100">
            {/* Background arc */}
            <path
              d="M 15 90 A 75 75 0 0 1 165 90"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-muted"
              strokeLinecap="round"
            />
            {/* Filled arc */}
            <motion.path
              d="M 15 90 A 75 75 0 0 1 165 90"
              fill="none"
              stroke="#5a35f8"
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 0.82 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
            <motion.span
              className="text-4xl font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              A*
            </motion.span>
            <span className="text-[10px] text-muted-foreground">predicted</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full">
          {[
            { label: "Chemistry", grade: "A*", prob: "82%" },
            { label: "Biology", grade: "A", prob: "71%" },
            { label: "Maths", grade: "A*", prob: "89%" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center rounded-xl border border-border p-3 bg-muted/20"
            >
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
              <p className="text-lg font-bold mt-0.5">{s.grade}</p>
              <p className="text-[10px] text-[#5a35f8] font-medium">{s.prob}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}

export function FeaturePreviews() {
  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="mx-auto max-w-5xl">
        <RevealSection className="text-center mb-12">
          <p className="text-xs text-[#5a35f8] uppercase tracking-wider font-semibold mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to hit A*
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Not another generic study app. Built from the ground up for A-Level
            students who refuse to leave their grades to chance.
          </p>
        </RevealSection>

        <RevealSection delay={0.1}>
          <Tabs defaultValue="mentor" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-1 bg-transparent h-auto mb-8">
              <TabsTrigger value="mentor" className="gap-1.5 data-[state=active]:bg-[#5a35f8]/10 data-[state=active]:text-[#5a35f8]">
                <Brain className="h-3.5 w-3.5" /> AI Mentor
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="gap-1.5 data-[state=active]:bg-[#5a35f8]/10 data-[state=active]:text-[#5a35f8]">
                <Map className="h-3.5 w-3.5" /> Roadmap
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-1.5 data-[state=active]:bg-[#5a35f8]/10 data-[state=active]:text-[#5a35f8]">
                <BarChart3 className="h-3.5 w-3.5" /> Analytics
              </TabsTrigger>
              <TabsTrigger value="papers" className="gap-1.5 data-[state=active]:bg-[#5a35f8]/10 data-[state=active]:text-[#5a35f8]">
                <FileText className="h-3.5 w-3.5" /> Past Papers
              </TabsTrigger>
              <TabsTrigger value="predictor" className="gap-1.5 data-[state=active]:bg-[#5a35f8]/10 data-[state=active]:text-[#5a35f8]">
                <TrendingUp className="h-3.5 w-3.5" /> Grade Predictor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mentor"><AIMentorPreview /></TabsContent>
            <TabsContent value="roadmap"><RoadmapPreview /></TabsContent>
            <TabsContent value="analytics"><AnalyticsPreviewMini /></TabsContent>
            <TabsContent value="papers"><PastPaperPreview /></TabsContent>
            <TabsContent value="predictor"><GradePredictorPreview /></TabsContent>
          </Tabs>
        </RevealSection>
      </div>
    </section>
  );
}
