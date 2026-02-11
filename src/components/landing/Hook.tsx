"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./FadeIn";
import Link from "next/link";

const subjects = ["Chemistry", "Physics", "Mathematics", "Biology", "Economics", "Psychology"];
const boards = ["AQA", "OCR", "Edexcel", "WJEC", "CIE"];
const grades = ["A*", "A", "B"];

export function Hook() {
  const [step, setStep] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [showResult, setShowResult] = useState(false);

  function handleNext() {
    if (step < 2) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  }

  return (
    <section className="py-24 px-6 bg-zinc-50/50">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="text-center mb-16">
          <p className="text-xs text-violet-600 uppercase tracking-wider font-semibold mb-3">Preview Your Plan</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-900 tracking-tight">
            See your future results — before<br className="hidden sm:block" /> you even revise
          </h2>
          <p className="text-zinc-500 mt-4 max-w-md mx-auto">
            Answer three questions and watch your personalized roadmap come to life.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto max-w-xl">
            <div className="rounded-2xl border border-zinc-200/60 bg-white shadow-lg shadow-zinc-200/20 overflow-hidden">
              {/* Progress bar */}
              <div className="h-1 bg-zinc-100">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                  animate={{ width: showResult ? "100%" : `${((step + 1) / 3) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {!showResult ? (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step === 0 && (
                        <div>
                          <p className="text-sm font-medium text-zinc-900 mb-4">Select your subject</p>
                          <div className="grid grid-cols-2 gap-2.5">
                            {subjects.map((s) => (
                              <button
                                key={s}
                                onClick={() => setSelectedSubject(s)}
                                className={`rounded-xl border px-4 py-3 text-sm transition-all ${
                                  selectedSubject === s
                                    ? "border-violet-500 bg-violet-50 text-violet-700 font-medium"
                                    : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 1 && (
                        <div>
                          <p className="text-sm font-medium text-zinc-900 mb-4">Exam board</p>
                          <div className="grid grid-cols-3 gap-2.5">
                            {boards.map((b) => (
                              <button
                                key={b}
                                onClick={() => setSelectedBoard(b)}
                                className={`rounded-xl border px-4 py-3 text-sm transition-all ${
                                  selectedBoard === b
                                    ? "border-violet-500 bg-violet-50 text-violet-700 font-medium"
                                    : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                                }`}
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div>
                          <p className="text-sm font-medium text-zinc-900 mb-4">Target grade</p>
                          <div className="flex gap-3">
                            {grades.map((g) => (
                              <button
                                key={g}
                                onClick={() => setSelectedGrade(g)}
                                className={`flex-1 rounded-xl border px-4 py-4 text-lg font-semibold transition-all ${
                                  selectedGrade === g
                                    ? "border-violet-500 bg-violet-50 text-violet-700"
                                    : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                                }`}
                              >
                                {g}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={handleNext}
                        disabled={
                          (step === 0 && !selectedSubject) ||
                          (step === 1 && !selectedBoard) ||
                          (step === 2 && !selectedGrade)
                        }
                        className="mt-6 w-full rounded-xl bg-zinc-900 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        {step === 2 ? "Generate Preview" : "Continue"}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 mb-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span className="text-xs font-medium text-emerald-700">Roadmap generated</span>
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-900">
                          {selectedSubject} — {selectedBoard}
                        </h3>
                        <p className="text-sm text-zinc-500 mt-1">Target: {selectedGrade} • 47 days remaining</p>
                      </div>

                      {/* Animated prediction chart */}
                      <div className="rounded-xl border border-zinc-100 p-5 mb-5">
                        <p className="text-xs font-medium text-zinc-500 mb-3">Predicted grade trajectory</p>
                        <svg viewBox="0 0 280 90" className="w-full h-20" fill="none">
                          <defs>
                            <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.12" />
                              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          {/* Grid lines */}
                          <line x1="0" y1="22" x2="280" y2="22" stroke="#f4f4f5" strokeWidth="1" />
                          <line x1="0" y1="45" x2="280" y2="45" stroke="#f4f4f5" strokeWidth="1" />
                          <line x1="0" y1="68" x2="280" y2="68" stroke="#f4f4f5" strokeWidth="1" />
                          {/* Labels */}
                          <text x="0" y="18" fontSize="8" fill="#a1a1aa">A*</text>
                          <text x="0" y="42" fontSize="8" fill="#a1a1aa">A</text>
                          <text x="0" y="65" fontSize="8" fill="#a1a1aa">B</text>
                          {/* Curve */}
                          <motion.path
                            d="M20 70 Q70 65 100 55 Q140 42 180 32 Q220 22 270 15"
                            stroke="#8b5cf6"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.3 }}
                          />
                          <motion.path
                            d="M20 70 Q70 65 100 55 Q140 42 180 32 Q220 22 270 15 L270 90 L20 90 Z"
                            fill="url(#predGrad)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                          />
                          {/* Current point */}
                          <motion.circle
                            cx="20" cy="70" r="3.5" fill="#ef4444"
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            transition={{ delay: 0.3 }}
                          />
                          {/* Target point */}
                          <motion.circle
                            cx="270" cy="15" r="3.5" fill="#8b5cf6"
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            transition={{ delay: 1.5 }}
                          />
                          <motion.text
                            x="252" y="10" fontSize="9" fontWeight="600" fill="#8b5cf6"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ delay: 1.7 }}
                          >{selectedGrade}</motion.text>
                        </svg>
                        <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                          <span>Today</span>
                          <span>Exam Day</span>
                        </div>
                      </div>

                      <p className="text-center text-sm text-zinc-500 mb-5">
                        Students using Alevelmentor improve by <span className="font-semibold text-violet-600">an average of 18%</span>
                      </p>

                      <Link
                        href="/signup"
                        className="block w-full rounded-xl bg-zinc-900 py-3 text-sm font-medium text-white text-center transition-all hover:bg-zinc-800"
                      >
                        Sign up to unlock your full A* plan
                      </Link>

                      <button
                        onClick={() => { setShowResult(false); setStep(0); setSelectedSubject(""); setSelectedBoard(""); setSelectedGrade(""); }}
                        className="mt-3 w-full text-center text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
                      >
                        Try another subject
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
