export interface InterviewQuestionItem {
  id: string;
  number: number;
  question: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Adaptive";
  estimatedMinutes: number;
  interviewerPersona: {
    name: string;
    title: string;
    company: string;
    avatarUrl?: string;
  };
  keyTakeaways: string[];
  initialHint: string;
  defaultTranscriptSample: string;
}

export interface DetailedEvaluation {
  overallScore: number;
  technicalAccuracy: number;
  communicationScore: number;
  confidenceScore: number;
  explanationQuality: number;
  missingConcepts: string[];
  aiSuggestions: string[];
  betterSampleAnswer: string;
  strengths: string[];
  weaknesses: string[];
  nextDifficultyRecommendation: string;
}

export interface MockSessionRecord {
  id: string;
  date: string;
  role: string;
  companyTier: string;
  type: "Technical" | "Behavioral" | "Mixed" | "HR" | "Coding";
  difficulty: "Easy" | "Medium" | "Hard" | "Adaptive";
  durationMinutes: number;
  totalQuestions: number;
  answeredQuestions: number;
  skippedQuestions: number;
  avgResponseTimeSeconds: number;
  overallScore: number;
  readinessVerdict: "Strong Hire" | "Hire" | "Leaning Hire" | "Needs Review";
  categoryScores: {
    systemArchitecture: number;
    codingAlgorithms: number;
    behavioralSTAR: number;
    communication: number;
    problemDecomposition: number;
  };
  questionsList: {
    id: string;
    question: string;
    category: string;
    score: number;
    responseTimeSeconds: number;
    skipped: boolean;
    userAnswer: string;
    feedback: string;
  }[];
  strengths: string[];
  weaknesses: string[];
  recommendedLearningPath: string[];
}

export const initialInterviewHistory: MockSessionRecord[] = [
  {
    id: "int-101",
    date: "2026-07-24",
    role: "Senior/Staff Frontend Engineer",
    companyTier: "Tier 1 Big Tech (Apple, Stripe, Google)",
    type: "Technical",
    difficulty: "Adaptive",
    durationMinutes: 30,
    totalQuestions: 4,
    answeredQuestions: 4,
    skippedQuestions: 0,
    avgResponseTimeSeconds: 142,
    overallScore: 92,
    readinessVerdict: "Strong Hire",
    categoryScores: {
      systemArchitecture: 94,
      codingAlgorithms: 90,
      behavioralSTAR: 88,
      communication: 95,
      problemDecomposition: 93,
    },
    questionsList: [
      {
        id: "q1",
        question: "Design a client-side offline storage engine with optimistic UI updates and real-time conflict resolution.",
        category: "Frontend System Architecture",
        score: 95,
        responseTimeSeconds: 150,
        skipped: false,
        userAnswer: "I would structure the architecture using IndexedDB as the primary persistent layer paired with an in-memory Zustand store. Write operations update local state immediately and queue mutations into a FIFO sync table with UUID idempotency keys.",
        feedback: "Exceptional structure. You correctly identified vector clocks and operational transformation for offline conflict resolution.",
      },
      {
        id: "q2",
        question: "How does React 18 Concurrent Rendering handle fiber prioritization and selective hydration?",
        category: "Core Web Architecture",
        score: 90,
        responseTimeSeconds: 120,
        skipped: false,
        userAnswer: "React 18 uses a lane-based priority scheduler. High-priority lanes like discrete user inputs interrupt lower-priority background transitions.",
        feedback: "Very accurate explaining startTransition vs useDeferredValue. Could expand slightly on selective hydration boundary streaming.",
      },
      {
        id: "q3",
        question: "Describe a time you navigated a contentious technical design debate with principal architects.",
        category: "Behavioral Leadership",
        score: 88,
        responseTimeSeconds: 160,
        skipped: false,
        userAnswer: "At my previous scaleup, our architecture team was divided between GraphQL and gRPC for internal microservices. I built a automated benchmark prototype measuring p99 latency and payload sizes.",
        feedback: "Solid STAR format. Quantified outcome well by showing 35% reduced payload overhead.",
      },
      {
        id: "q4",
        question: "How do you mitigate layout instability (CLS) and memory leaks in web canvas visualizers?",
        category: "Performance & Rendering",
        score: 93,
        responseTimeSeconds: 138,
        skipped: false,
        userAnswer: "CLS is minimized by reserving layout aspect-ratio containers. For canvas visualizers, I maintain explicit reference pools and detach listeners during unmount.",
        feedback: "Crisp answer covering garbage collection cycles and explicit resize observers.",
      },
    ],
    strengths: [
      "Outstanding system decomposition and offline storage queue design",
      "Deep understanding of React 18 concurrent scheduling and lane prioritization",
      "Data-driven conflict management approach in team scenarios",
    ],
    weaknesses: [
      "Could elaborate more on CRDTs (Conflict-free Replicated Data Types) for collaborative state",
      "Ensure edge-case memory profiling tools (Chrome DevTools Heap Snapshots) are explicitly cited",
    ],
    recommendedLearningPath: [
      "Master Conflict-free Replicated Data Types (CRDTs) & Yjs integration",
      "Review Web Workers background thread serialization overhead formulas",
    ],
  },
  {
    id: "int-102",
    date: "2026-07-21",
    role: "Software Engineer (Fullstack/Backend)",
    companyTier: "Fintech & Quant (Jane Street, Citadel, Stripe)",
    type: "Coding",
    difficulty: "Hard",
    durationMinutes: 45,
    totalQuestions: 3,
    answeredQuestions: 3,
    skippedQuestions: 0,
    avgResponseTimeSeconds: 210,
    overallScore: 85,
    readinessVerdict: "Hire",
    categoryScores: {
      systemArchitecture: 88,
      codingAlgorithms: 89,
      behavioralSTAR: 80,
      communication: 82,
      problemDecomposition: 86,
    },
    questionsList: [
      {
        id: "q21",
        question: "Implement a distributed rate limiter supporting sliding-window counter logic with Redis lua scripting.",
        category: "Distributed Systems",
        score: 88,
        responseTimeSeconds: 240,
        skipped: false,
        userAnswer: "We use Lua scripts executed inside Redis to make key checks and counter increments atomic, preventing race conditions under high concurrency.",
        feedback: "Strong atomic Lua script explanation. Mentioned fallback behavior when Redis connection degrades.",
      },
      {
        id: "q22",
        question: "Analyze time and space complexity of two-phase commit vs Saga orchestrator patterns.",
        category: "System Design",
        score: 84,
        responseTimeSeconds: 190,
        skipped: false,
        userAnswer: "Two-Phase Commit enforces strict ACID consistency but introduces blocking network locks. Sagas provide eventual consistency through compensating transactions.",
        feedback: "Good trade-off comparison between consistency models and lock contention.",
      },
      {
        id: "q23",
        question: "Explain how LSM-trees minimize write amplification compared to B+ Trees in high-throughput databases.",
        category: "Database Engineering",
        score: 83,
        responseTimeSeconds: 200,
        skipped: false,
        userAnswer: "LSM trees append writes sequentially to a MemTable and SSTables on disk, converting random I/O into sequential I/O.",
        feedback: "Solid foundation. Review compaction strategies (Size-Tiered vs Leveled Compaction).",
      },
    ],
    strengths: [
      "Atomic operations and Lua scripting in Redis rate limiters",
      "Clear articulation of Saga vs 2PC distributed transaction tradeoffs",
    ],
    weaknesses: [
      "Elaborate on Leveled Compaction in LSM-trees under write spikes",
    ],
    recommendedLearningPath: [
      "Deep dive into RocksDB storage engine internals and WAL durability",
    ],
  },
  {
    id: "int-103",
    date: "2026-07-18",
    role: "Senior/Staff Frontend Engineer",
    companyTier: "AI Frontier (OpenAI, Anthropic)",
    type: "Mixed",
    difficulty: "Adaptive",
    durationMinutes: 20,
    totalQuestions: 2,
    answeredQuestions: 2,
    skippedQuestions: 0,
    avgResponseTimeSeconds: 155,
    overallScore: 78,
    readinessVerdict: "Leaning Hire",
    categoryScores: {
      systemArchitecture: 80,
      codingAlgorithms: 76,
      behavioralSTAR: 82,
      communication: 79,
      problemDecomposition: 75,
    },
    questionsList: [
      {
        id: "q31",
        question: "Design an LLM streaming response component handling token backpressure and client Markdown parsing.",
        category: "AI Frontend Architecture",
        score: 82,
        responseTimeSeconds: 160,
        skipped: false,
        userAnswer: "Using Server-Sent Events (SSE) or WebSockets, chunks stream into a ring buffer. The React component uses requestAnimationFrame to smooth token insertion.",
        feedback: "Good queue design. Consider DOM virtualized list rendering when message size exceeds 10k tokens.",
      },
      {
        id: "q32",
        question: "How do you structure audio web sockets for real-time bi-directional speech modeling with low latency?",
        category: "Real-Time Protocols",
        score: 74,
        responseTimeSeconds: 150,
        skipped: false,
        userAnswer: "We use WebRTC data channels for low latency UDP streaming over standard WebSockets.",
        feedback: "Mention PCM buffer chunking and AudioContext buffer source nodes for seamless playback.",
      },
    ],
    strengths: [
      "SSE ring buffer architecture for streaming AI tokens",
    ],
    weaknesses: [
      "WebAudio API nodes & low-latency audio packetization",
    ],
    recommendedLearningPath: [
      "Study WebAudio API PCM buffer streaming & WebRTC DataChannels",
    ],
  },
];

export const sampleQuestionsPool: InterviewQuestionItem[] = [
  {
    id: "q-sample-1",
    number: 1,
    question: "Design a global real-time notification engine capable of delivering 10 million pushes per second with sub-100ms p99 latency.",
    category: "System Architecture",
    difficulty: "Hard",
    estimatedMinutes: 8,
    interviewerPersona: {
      name: "Sarah Chen",
      title: "Principal Infrastructure Architect",
      company: "Stripe",
    },
    keyTakeaways: [
      "Partitioning push queues by user_id hash rings",
      "WebSocket connection gateway clusters with idle keep-alive heartbeats",
      "Fallback to APNs/FCM via async Kafka workers during connection drops",
    ],
    initialHint: "Decompose into Connection Gateway layer, Pub/Sub message broker, and persistence/ack queue.",
    defaultTranscriptSample: "To handle 10 million pushes per second with sub-100ms p99 latency, I would decouple ingress payload processing from push delivery using a distributed event-driven pipeline. At the front layer, regional API gateways receive notification requests, validate payloads against JSON schemas, and publish them to a partitioned Kafka topic hashed by user_id...",
  },
  {
    id: "q-sample-2",
    number: 2,
    question: "How do you detect, isolate, and debug a memory leak occurring inside a Node.js SSR microservice in production under peak load?",
    category: "Technical Deep-Dive",
    difficulty: "Adaptive",
    estimatedMinutes: 6,
    interviewerPersona: {
      name: "Marcus Vance",
      title: "Staff Performance Specialist",
      company: "Google Cloud",
    },
    keyTakeaways: [
      "Heap snapshot generation via heapdump or clinic.js doctor",
      "Inspecting uncollected closures, global cache Maps, or dangling event listeners",
      "Isolating canary instances and analyzing V8 GC pause metrics",
    ],
    initialHint: "Focus on heap memory diffing between baseline and peak RSS growth, and closure lifecycle traps.",
    defaultTranscriptSample: "First, I would inspect our Grafana dashboards monitoring Process Resident Set Size (RSS) and V8 Heap Used metrics across our Kubernetes pod cluster. If memory growth shows a monotonic upward staircase without GC recovery after traffic surges, I would isolate a single canary pod, enable heap snapshots via clinic.js or heapdump module, and compare baseline heap graphs...",
  },
  {
    id: "q-sample-3",
    number: 3,
    question: "Tell me about a situation where a major technical debt decision backfired, and how you led the team out of outage vulnerability.",
    category: "Behavioral STAR",
    difficulty: "Medium",
    estimatedMinutes: 5,
    interviewerPersona: {
      name: "Elena Rostova",
      title: "Director of Engineering",
      company: "OpenAI",
    },
    keyTakeaways: [
      "Situation & Task: Explicit background and business risk",
      "Action: Blameless postmortem, architectural mitigation, automated testing coverage",
      "Result: Quantified uptime improvement and engineering team culture shift",
    ],
    initialHint: "Frame your answer strictly around STAR (Situation, Task, Action, Result) with clear team leadership ownership.",
    defaultTranscriptSample: "In my previous role, we deferred migrating a legacy monolithic MySQL database to partitioned PostgreSQL tables during a rapid product scaling phase. During a Cyber Monday traffic spike, database connection pool exhaustion caused a 45-minute checkout outage. As the lead engineer, I called an emergency incident response, spun up read replicas to divert traffic, and led a blameless postmortem...",
  },
];
