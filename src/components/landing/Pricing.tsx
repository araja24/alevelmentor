"use client";

import { RevealSection } from "./RevealSection";
import { GlowButton } from "./GlowButton";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Get started with the basics. Perfect for trying the platform.",
    features: [
      { text: "Smart roadmap (1 subject)", included: true },
      { text: "Basic performance tracking", included: true },
      { text: "Exam countdown timer", included: true },
      { text: "Community access", included: true },
      { text: "AI mentor", included: false },
      { text: "Past paper engine", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "\u00A39",
    period: "/month",
    description: "The serious A* package. Everything you need to outperform.",
    features: [
      { text: "Smart roadmap (unlimited subjects)", included: true },
      { text: "Advanced analytics & weak area detection", included: true },
      { text: "AI mentor (unlimited questions)", included: true },
      { text: "Past paper engine (full access)", included: true },
      { text: "Grade predictor", included: true },
      { text: "UCAT/BMAT integration", included: true },
      { text: "Priority support", included: false },
    ],
    cta: "Join Waitlist",
    popular: true,
  },
  {
    name: "Ultimate",
    price: "\u00A319",
    period: "/month",
    description: "For students who want every possible advantage.",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "1-on-1 study plan reviews", included: true },
      { text: "Priority support (24h response)", included: true },
      { text: "Early access to new features", included: true },
      { text: "Custom revision schedules", included: true },
      { text: "Parent progress reports", included: true },
      { text: "Exam technique masterclasses", included: true },
    ],
    cta: "Join Waitlist",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-28 px-6 relative">
      <div className="mx-auto max-w-6xl">
        <RevealSection className="text-center mb-16">
          <p className="text-xs text-[#5a35f8] uppercase tracking-wider font-semibold mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Invest in your grades
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Less than the cost of a single tutor session. Cancel anytime.
          </p>
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="relative rounded-2xl p-px overflow-hidden h-full"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Gradient border for popular */}
                {plan.popular && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#5a35f8] via-[#7c5cf9] to-[#5a35f8] opacity-100" />
                )}

                <div
                  className={`relative rounded-2xl p-7 h-full flex flex-col ${
                    plan.popular
                      ? "bg-card"
                      : "bg-card border border-border"
                  }`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-px left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-[#5a35f8] to-[#7c5cf9] text-white text-[11px] font-semibold px-4 py-1 rounded-b-lg">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className={`flex flex-col flex-1 ${plan.popular ? "pt-4" : ""}`}>
                    <h3 className="text-lg font-semibold">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 mb-5">
                      {plan.description}
                    </p>

                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-bold">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-sm text-muted-foreground">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    <div className="space-y-3 flex-1">
                      {plan.features.map((feature, fi) => (
                        <div
                          key={fi}
                          className="flex items-center gap-3 text-sm"
                        >
                          {feature.included ? (
                            <Check className="h-4 w-4 text-[#5a35f8] shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                          )}
                          <span
                            className={
                              feature.included
                                ? "text-foreground/80"
                                : "text-muted-foreground/60"
                            }
                          >
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-7">
                      <GlowButton
                        href="#join"
                        variant={plan.popular ? "primary" : "secondary"}
                        className="w-full justify-center text-sm"
                      >
                        {plan.cta}
                      </GlowButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
