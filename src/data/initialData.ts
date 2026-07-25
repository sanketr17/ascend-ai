import { UserProfile, SkillNode, Flashcard, InterviewSession } from "../types";

export const initialUserProfile: UserProfile = {
  name: "Alex Rivera",
  targetRole: "Senior/Staff Frontend Engineer",
  companyTier: "Tier 1 Big Tech (Apple, Stripe, Google)",
  targetDate: "2026-09-15",
  readinessScore: 84,
  weeklyGoalHours: 12,
  completedHoursThisWeek: 8.5,
  currentStreakDays: 14,
  targetMetrics: {
    systemDesign: 82,
    codingAlgorithms: 88,
    behavioralSTAR: 85,
    domainArchitecture: 86,
    communicationClarity: 89,
  },
};

export const initialSkillNodes: SkillNode[] = [
  {
    id: "sn-1",
    title: "Distributed Rate Limiting Algorithms",
    category: "System Design",
    masteryLevel: 88,
    status: "Mastered",
    lastReviewedDaysAgo: 2,
    estMinutesToReview: 10,
    description: "Designing sub-millisecond multi-region rate limiters using Token Bucket, Sliding Window Log, and Redis Atomic Scripts.",
    keyTakeaways: [
      "Sliding Window Counter offers optimal balance of memory vs accuracy over Sliding Window Log.",
      "Local node batching with asynchronous sync reduces cross-region Redis roundtrips.",
      "Graceful degradation: fallback to local memory estimation when Redis partition occurs."
    ],
    codeOrStructureSnippet: `// Sliding Window Counter Memory Formula
const currentWindowWeight = 1 - (currentTime - windowStart) / windowSize;
const estimatedRequests = previousWindowCount * currentWindowWeight + currentWindowCount;
if (estimatedRequests > maxAllowed) return 429;`,
    sampleQuestion: "How do you handle rate limiter state synchronization across 3 global regions with <5ms latency requirements?"
  },
  {
    id: "sn-2",
    title: "Browser Rendering Pipeline & Web Vitals (INP/LCP)",
    category: "Frontend/Performance",
    masteryLevel: 92,
    status: "Mastered",
    lastReviewedDaysAgo: 1,
    estMinutesToReview: 8,
    description: "Optimizing DOM reflow, composite layers, Interaction to Next Paint (INP), and main thread yields using Scheduler API.",
    keyTakeaways: [
      "INP measures time from user interaction to visual frame present; long tasks (>50ms) degrade INP.",
      "Use window.scheduler.postTask() or MessageChannel to yield main thread long computations.",
      "Avoid layout thrashing caused by interleaved DOM reads (e.g. offsetHeight) and writes."
    ],
    codeOrStructureSnippet: `async function yieldToMainThread() {
  if ('scheduler' in window && 'postTask' in scheduler) {
    return scheduler.postTask(() => {}, { priority: 'user-visible' });
  }
  return new Promise(resolve => {
    const channel = new MessageChannel();
    channel.port1.onmessage = resolve;
    channel.port2.postMessage(null);
  });
}`,
    sampleQuestion: "Walk me through how you isolated and eliminated a 200ms INP bottleneck in a heavy real-time data table."
  },
  {
    id: "sn-3",
    title: "Consensus Protocols (Raft & Paxos)",
    category: "System Design",
    masteryLevel: 68,
    status: "In Progress",
    lastReviewedDaysAgo: 5,
    estMinutesToReview: 15,
    description: "Distributed state replication, leader election cycles, log compaction, and split-brain resolution.",
    keyTakeaways: [
      "Raft splits consensus into Leader Election, Log Replication, and Safety guarantees.",
      "Majority quorum (N/2 + 1) guarantees overlapping nodes across successive term elections.",
      "Joint consensus allows smooth membership changes without halting cluster operations."
    ],
    sampleQuestion: "What happens during a Raft election if network isolation creates two candidate partitions?"
  },
  {
    id: "sn-4",
    title: "Behavioral Leadership: Conflict Resolution & Directional Pushback",
    category: "Behavioral Leadership",
    masteryLevel: 85,
    status: "Mastered",
    lastReviewedDaysAgo: 3,
    estMinutesToReview: 12,
    description: "Framing technical disagreements using data-driven prototypes and non-confrontational STAR frameworks.",
    keyTakeaways: [
      "STAR framework: Situation (15%), Task (10%), Action (50%), Result (25%).",
      "Focus heavily on specific actions YOU took to de-risk decisions and build alignment.",
      "Quantify impact with business metrics (% reduction in latency, engineering hours saved, cost impact)."
    ],
    sampleQuestion: "Describe a situation where an executive requested a feature with severe technical debt implications. How did you handle it?"
  },
  {
    id: "sn-5",
    title: "Database Indexing & Query Planner Internals",
    category: "Domain Architecture",
    masteryLevel: 58,
    status: "Needs Review",
    lastReviewedDaysAgo: 9,
    estMinutesToReview: 18,
    description: "B-Tree vs LSM Trees, Index-Only scans, query optimization, and lock contention under high concurrency.",
    keyTakeaways: [
      "B-Trees optimize for read-heavy workloads with random access; LSM-Trees optimize for write-heavy append workloads.",
      "Composite index order matters: equality conditions first, range conditions second.",
      "Watch for implicit type casting in query predicates which invalidates index usage."
    ],
    sampleQuestion: "Why does an EXPLAIN ANALYZE show a Sequential Scan even when a B-Tree index exists on a filtered column?"
  },
  {
    id: "sn-6",
    title: "Micro-Frontend State Hydration & Module Federation",
    category: "Frontend/Performance",
    masteryLevel: 45,
    status: "Decay Risk",
    lastReviewedDaysAgo: 14,
    estMinutesToReview: 20,
    description: "Shared state management across independent bundle deployments, version skew, and SSR stream hydration.",
    keyTakeaways: [
      "Module Federation uses runtime container resolution with shared vendor singletons.",
      "Selective hydration allows critical UI interactive islands to hydrate before non-critical footers/sidebars."
    ],
    sampleQuestion: "How do you prevent global CSS style leaking and duplicate dependency versions across federated remote apps?"
  }
];

export const initialFlashcards: Flashcard[] = [
  {
    id: "fc-101",
    topic: "System Architecture",
    question: "What is the primary trade-off between a Two-Phase Commit (2PC) protocol and the Saga Pattern for distributed transactions?",
    answer: "2PC provides strict ACID compliance via synchronous blocking locks across databases, creating high latency and single-point-of-failure risks. Saga provides Eventual Consistency through asynchronous local transactions with compensating rollback steps, favoring availability and throughput over immediate consistency.",
    keyTakeaway: "Use Saga for microservice resilience; reserve 2PC for tightly-coupled transactional storage.",
    difficulty: "Hard",
    intervalDays: 4,
    nextReviewDate: "2026-07-26",
    history: [
      { date: "2026-07-21", rating: "Good" }
    ]
  },
  {
    id: "fc-102",
    topic: "Frontend / Browser",
    question: "How does React 18 Concurrent Rendering prioritize urgent vs non-urgent state updates?",
    answer: "Urgent updates (e.g. typing in an input, button clicks) run immediately with continuous user input priority. Non-urgent updates (e.g. filtering a long list) wrapped in startTransition() or useDeferredValue() can be interrupted by fresh user events, keeping the main thread responsive.",
    keyTakeaway: "useTransition keeps the input frame rate high during heavy re-renders.",
    difficulty: "Medium",
    intervalDays: 7,
    nextReviewDate: "2026-07-27",
    history: [
      { date: "2026-07-20", rating: "Easy" }
    ]
  },
  {
    id: "fc-103",
    topic: "Database Internals",
    question: "What causes Write Amplification in Log-Structured Merge (LSM) trees?",
    answer: "Write Amplification occurs when data is written multiple times during compaction processes across SSTable levels (L0 to Lmax). While LSM trees achieve high write throughput initially, cascading compactions create background I/O spikes.",
    keyTakeaway: "Tune compaction strategies (Leveled vs Size-Tiered) based on write vs read access ratios.",
    difficulty: "Hard",
    intervalDays: 2,
    nextReviewDate: "2026-07-25",
    history: [
      { date: "2026-07-23", rating: "Hard" }
    ]
  }
];

export const initialInterviewSessions: InterviewSession[] = [
  {
    id: "is-901",
    date: "Yesterday, 4:15 PM",
    role: "Senior/Staff Frontend Engineer",
    companyTier: "Tier 1 Big Tech (Apple, Stripe, Google)",
    mode: "System Architecture",
    question: "Design an end-to-end real-time collaborative document editor (like Google Docs/Figma) supporting offline edits, conflict resolution, and low latency syncing for 50k concurrent users.",
    userAnswer: "I would utilize Operational Transformation (OT) or Conflict-Free Replicated Data Types (CRDTs) over WebSockets with a fallback to SSE. Local edits append to an IndexedDB state log with a vector clock. On reconnect, state vectors reconcile via state-based CRDT merges. On the server side, a Node.js/Go gateway broadcasts ops to Redis Pub/Sub.",
    overallScore: 88,
    breakdown: {
      clarityAndStructure: 92,
      technicalDepth: 86,
      problemDecomposition: 88,
      edgeCaseCoverage: 84
    },
    strengths: [
      "Accurate evaluation of CRDT vs OT trade-offs regarding memory overhead vs central server trust.",
      "Clear client-side persistence strategy using IndexedDB for offline log replay."
    ],
    gaps: [
      "Could have elaborated on memory pruning strategies for historical CRDT tombstones.",
      "Missed details on operational telemetry for WebSocket reconnection storms."
    ],
    suggestedUpgrade: "Mention how garbage collection of deleted CRDT nodes (tombstones) prevents memory bloat over months of edit history.",
    durationSeconds: 245
  },
  {
    id: "is-902",
    date: "3 days ago",
    role: "Senior/Staff Frontend Engineer",
    companyTier: "Fintech & Quant (Jane Street, Citadel, Stripe)",
    mode: "Behavioral STAR",
    question: "Tell me about a time you identified a critical flaw in production architecture right before a major product launch. How did you de-risk it without delaying the launch?",
    userAnswer: "Two weeks before launching our checkout redesign, I realized our payment state sync didn't handle idempotent retries on weak mobile networks, risking duplicate charges. I built a quick feature-flagged proxy middleware that generated client idempotency keys, wrote a synthetic test suite, and presented metrics to the PM. We launched on schedule with 0 duplicate charge incidents.",
    overallScore: 91,
    breakdown: {
      clarityAndStructure: 94,
      technicalDepth: 90,
      problemDecomposition: 90,
      edgeCaseCoverage: 89
    },
    strengths: [
      "Excellent framing with crisp Situation-Action-Result flow.",
      "Clear business impact with zero downtime and financial risk de-risking."
    ],
    gaps: [
      "Could mention team communication or post-mortem culture creation after launch."
    ],
    suggestedUpgrade: "Conclude by mentioning how you converted this fix into an automated lint/CI rule to prevent future regressions.",
    durationSeconds: 190
  }
];

export const sampleResumeText = `Alex Rivera
Senior Frontend & Systems Engineer
Contact: alex.rivera@example.com | San Francisco, CA

SUMMARY
Senior Engineer with 7+ years of experience building scalable web applications, real-time dashboards, and micro-frontend frameworks. Experienced in performance tuning, React architecture, and distributed state management.

EXPERIENCE
Staff Engineer Lead @ CloudScale Systems (2023 - Present)
- Led frontend architecture for cloud observability platform serving 150k monthly active developers.
- Reduced core dashboard load times from 3.2s to 0.9s by re-architecting data fetching and implementing Web Workers for chart calculation.
- Built micro-frontend infrastructure using Webpack Module Federation, enabling 6 cross-functional engineering teams to deploy independently.

Senior Frontend Engineer @ FinTech Dynamics (2020 - 2023)
- Built high-frequency trading visualization dashboard using Canvas 2D and WebSockets, rendering 60fps tick updates under heavy load.
- Designed idempotency middleware for checkout API, preventing double-charge edge cases across 2M daily transactions.
- Mentored 5 junior/mid-level engineers and established team coding guidelines.

SKILLS
JavaScript (ES2023), TypeScript, React, Next.js, Node.js, WebSockets, Web Workers, Vite, Tailwind CSS, Jest, Playwright, CI/CD, Distributed Systems basics.`;

export const sampleJobDescription = `Senior / Staff Frontend Engineer - Core Infrastructure (Stripe)

About the Role:
We are looking for a Senior / Staff Frontend Engineer to lead our Core Web Experience infrastructure. You will design and maintain low-latency frontend architectures, developer tooling, and core UI engines used by millions of global businesses.

Key Responsibilities:
- Architect high-performance, resilient Web applications with sub-100ms response targets.
- Design developer frameworks, state management patterns, and shared component design systems.
- Partner with product leads and backend systems architects on real-time API contract design (gRPC / GraphQL / REST).
- Mentor senior engineers and drive technical standards across the organization.

Requirements:
- 6+ years of production experience with TypeScript, React, and modern browser internals.
- Deep understanding of Web Vitals (INP, LCP, CLS), rendering engines, and main-thread optimization.
- Proven track record of architecting large-scale systems handling high throughput.
- Exceptional communication skills and STAR-driven technical leadership experience.`;
