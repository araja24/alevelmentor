# Engine animation: dot movement timings

This document specifies how dots move in the **A Level Engine** diagram (input → AI processing core → output). Use it when building or updating similar diagrams so timings stay consistent.

---

## Overview

- **Phase 1 — Moving in:** Dots travel from the **left** nodes (inputs) to the **left edge** of the AI processing core. Three input lanes, staggered.
- **Phase 2 — Engine:** Dots are considered “in” the core. **Output dots do not start until all three input dots have reached the core.**
- **Phase 3 — Moving out:** Dots travel from the **right edge** of the core to the **right** nodes (outputs). Three output lanes, staggered, starting only after the last input has arrived.

All motion is **linear** along SVG paths (Bezier curves). Animation **loops** infinitely.

---

## Constants (source of truth)

| Constant | Value | Meaning |
|----------|--------|---------|
| `inputDuration` | **2.5** s | Time for one dot to travel input path (node → engine) |
| `inputDelayStep` | **0.22** s | Delay between starting each successive input dot |
| `outputDuration` | **2.6** s | Time for one dot to travel output path (engine → node) |
| `outputDelayStep` | **0.24** s | Delay between starting each successive output dot |
| `INPUTS.length` | **3** | Number of input lanes |
| `OUTPUTS.length` | **3** | Number of output lanes |

---

## Phase 1: Moving in (input lanes)

Each input dot starts after a delay, then moves along its path for `inputDuration` seconds.

| Lane index | Label | Color (hex) | Start delay | Duration | Arrival at engine |
|------------|--------|-------------|-------------|----------|-------------------|
| 0 | Target Grades | `#f59e0b` | 0 s | 2.5 s | **2.50** s |
| 1 | Exam Date | `#fbbf24` | 0.22 s | 2.5 s | **2.72** s |
| 2 | Struggles | `#ef4444` | 0.44 s | 2.5 s | **2.94** s |

**Formula:** `inputDelay(idx) = idx * inputDelayStep`  
**Arrival time for lane `i`:** `inputDelay(i) + inputDuration`

The **last** input dot (lane 2) reaches the engine at:

```
lastInputArrival = (INPUTS.length - 1) * inputDelayStep + inputDuration
                = 2 * 0.22 + 2.5
                = 2.94 s
```

---

## Phase 2: Engine (gate for outputs)

- Dots are “in” the core when they finish the input path.
- **Output dots must not start until all input dots have arrived.**  
  So the **earliest** time any output dot can start is `lastInputArrival` = **2.94 s**.

---

## Phase 3: Moving out (output lanes)

Each output dot starts at `lastInputArrival` plus a per-lane stagger, then moves for `outputDuration` seconds.

| Lane index | Label | Color (hex) | Start delay | Duration | Arrival at node |
|------------|--------|-------------|-------------|----------|-----------------|
| 0 | Weekly Schedule | `#22c55e` | 2.94 s | 2.6 s | **5.54** s |
| 1 | Adaptive Plan | `#14b8a6` | 3.18 s | 2.6 s | **5.78** s |
| 2 | Past Paper Engine | `#3ed6ff` | 3.42 s | 2.6 s | **6.02** s |

**Formula:** `outputDelay(idx) = lastInputArrival + idx * outputDelayStep`  
**Arrival time at output node for lane `i`:** `outputDelay(i) + outputDuration`

---

## Timeline (one full cycle)

Times in seconds. “In” = dot is moving along input path; “Out” = dot is moving along output path.

| Time (s) | Input 0 | Input 1 | Input 2 | Output 0 | Output 1 | Output 2 |
|----------|---------|---------|---------|-----------|-----------|-----------|
| 0.00 | In (start) | — | — | — | — | — |
| 0.22 | In | In (start) | — | — | — | — |
| 0.44 | In | In | In (start) | — | — | — |
| 2.50 | **Arrive** | In | In | — | — | — |
| 2.72 | — | **Arrive** | In | — | — | — |
| 2.94 | — | — | **Arrive** | Out (start) | — | — |
| 3.18 | — | — | — | Out | Out (start) | — |
| 3.42 | — | — | — | Out | Out | Out (start) |
| 5.54 | — | — | — | **Arrive** | Out | Out |
| 5.78 | — | — | — | — | **Arrive** | Out |
| 6.02 | — | — | — | — | — | **Arrive** |

After the last output arrives, the animation **loops**: input dots start again from 0 s (with the same stagger). So the effective cycle length is determined by the slowest path; in practice the loop is continuous.

---

## Implementation notes for future diagrams

1. **Path geometry**  
   Paths are Bezier curves: `M from.x from.y C c1x from.y, c2x to.y, to.x to.y` with curve strength `max(40, |Δx| * 0.42)`.

2. **Dot position**  
   Position along path is driven by a motion value that animates from `0` to `path.getTotalLength()` over the lane’s `duration`, with `ease: "linear"`. Use `path.getPointAtLength(progress)` to place the dot.

3. **Restart on path change**  
   When path geometry changes (e.g. resize), depend the animation effect on the path `d` (or a signature) so the dot restarts from 0 on the new path and doesn’t jump.

4. **Output gate**  
   Always compute output delays as `lastInputArrival + idx * outputDelayStep` where `lastInputArrival = (numInputs - 1) * inputDelayStep + inputDuration`. Do not release output dots before `lastInputArrival`.

5. **Loop**  
   Use `repeat: Number.POSITIVE_INFINITY` and `repeatType: "loop"` so the cycle repeats without a pause.

---

## EngineAnimationLarge: downstream and feedback paths

The **large** engine diagram ([EngineAnimationLarge.tsx](../src/components/engine/EngineAnimationLarge.tsx)) extends the same timing rules to a full network:

- **Inputs → core** and **core → first-tier branches** use the same constants and gate as above. The five branch lanes use `outputDelay(idx) = lastInputArrival + idx * outputDelayStep` (idx 0–4), duration `outputDuration` (2.6 s).

- **Downstream chain** (Past Paper Engine → Mark in Seconds → Mark Scheme Comparison → Track Progress → Live Predicted Grade): each segment’s dot **starts when the previous segment’s dot arrives**. So delay for segment N = delay of segment N−1 + `outputDuration`. Duration for each segment is `outputDuration` (2.6 s).

- **Feedback path** (Live Predicted Grade → core): delay = arrival time of the dot at Live Predicted Grade (i.e. end of the downstream chain), duration 2.6 s. The loop then continues (input dots start again from 0 s).

| Path type | Delay rule | Duration |
|-----------|------------|----------|
| Input → core | `idx * inputDelayStep` | 2.5 s |
| Core → branch | `lastInputArrival + idx * outputDelayStep` | 2.6 s |
| Downstream segment | previous segment delay + previous duration | 2.6 s |
| Feedback (Live Grade → core) | when downstream dot arrives at Live Grade | 2.6 s |

---

## Summary

| Phase | When | Rule |
|-------|------|------|
| Moving in | 0 s, 0.22 s, 0.44 s start; 2.5 s each | Staggered start, same duration |
| Engine | 2.50 s, 2.72 s, 2.94 s (arrivals) | Last input arrives at 2.94 s |
| Moving out | Start at 2.94 s, 3.18 s, 3.42 s; 2.6 s each | **Only after all three inputs have arrived** |

Sources: [EngineAnimation.tsx](../src/components/engine/EngineAnimation.tsx), [EngineAnimationLarge.tsx](../src/components/engine/EngineAnimationLarge.tsx)
