import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Server-side Gemini Client setup
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "ASCEND AI - Adaptive Learning Intelligence Platform",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY")
  });
});

// API 1: Generate Adaptive Interview Scenario & Follow-ups
app.post("/api/interview/generate", async (req, res) => {
  try {
    const { role, companyTier, mode, topic, seniorityLevel, difficulty } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback realistic mock data if key not set
      const fallbackQuestions = [
        {
          id: "q-fb-1",
          question: `Given a high-throughput microservices architecture at ${companyTier || "Tier 1 Tech"}, how would you design a distributed rate limiter that handles 10M RPM with sub-millisecond latency and graceful degradation during network partitions?`,
          category: mode || "System Architecture",
          difficulty: difficulty || "Senior/Staff",
          timeLimitSeconds: 300,
          expectedKeyPoints: [
            "Token Bucket or Leaky Bucket algorithm selection",
            "Redis Cluster with local sliding-window memory caching",
            "Consistent hashing & handling split-brain network scenarios",
            "Fallback strategy: Rate limiting at API Gateway edge vs service meshes"
          ],
          rubric: {
            architecturalDepth: 35,
            edgeCaseHandling: 30,
            communicationClarity: 20,
            tradeoffAnalysis: 15
          },
          initialHint: "Consider how local node batching reduces Redis roundtrips while preserving accuracy."
        },
        {
          id: "q-fb-2",
          question: "Describe a time when you had to make a critical architectural decision under tight deadlines without consensus from senior stakeholders. How did you align the team and measure success?",
          category: "Behavioral Leadership (STAR)",
          difficulty: "Senior/Staff",
          timeLimitSeconds: 240,
          expectedKeyPoints: [
            "Clear Situation framing with quantified metrics",
            "Action: Risk mitigation, prototype creation, stakeholder alignment",
            "Result: On-time delivery with zero major downtime"
          ],
          rubric: {
            starStructure: 35,
            ownershipAndInitiative: 30,
            quantifiedImpact: 20,
            empathyAndCollaboration: 15
          },
          initialHint: "Focus heavily on how you handled pushback with data rather than authority."
        }
      ];

      return res.json({
        success: true,
        isMock: true,
        scenario: fallbackQuestions[0]
      });
    }

    const prompt = `You are a Principal Interviewer at a top-tier tech company conducting an interview for a ${seniorityLevel || "Senior"} ${role || "Software Engineer"} targeting ${companyTier || "Top Tech / Quant"}.
Mode: ${mode || "Technical & Architecture"}.
Topic focus: ${topic || "Distributed Systems & Core Computer Science"}.

Generate 1 challenging, highly realistic interview question with a comprehensive rubric.

Return ONLY a JSON object matching this schema:
{
  "id": "string",
  "question": "string",
  "category": "string",
  "difficulty": "string",
  "timeLimitSeconds": number,
  "expectedKeyPoints": ["string"],
  "rubric": {
    "architecturalDepth": number,
    "edgeCaseHandling": number,
    "communicationClarity": number,
    "tradeoffAnalysis": number
  },
  "initialHint": "string"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, scenario: parsed });
  } catch (err: any) {
    console.error("Error generating scenario:", err);
    res.status(500).json({ error: "Failed to generate scenario", details: err.message });
  }
});

// API 2: Evaluate Interview Answer
app.post("/api/interview/evaluate", async (req, res) => {
  try {
    const { question, answer, category, role } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Mock evaluation response
      const lengthScore = Math.min(95, Math.max(50, answer.length / 5));
      return res.json({
        success: true,
        isMock: true,
        evaluation: {
          overallScore: Math.round(78 + (answer.length > 200 ? 10 : 0)),
          breakdown: {
            clarityAndStructure: Math.round(lengthScore),
            technicalDepth: 82,
            problemDecomposition: 79,
            edgeCaseCoverage: 71
          },
          strengthHighlights: [
            "Demonstrated strong familiarity with core architectural principles and state isolation.",
            "Clearly articulated primary trade-offs between consistency and latency."
          ],
          gapAnalysis: [
            "Omitted specific discussion on memory overflow recovery and cold-start fallback.",
            "Could strengthen STAR metric quantization (e.g. % improvement or latency reduction)."
          ],
          suggestedAnswerEnhancement: "To elevate this answer from Senior to Staff level, explicitly mention how you would handle asynchronous cache invalidation and provide 1-2 concrete production metrics.",
          followUpQuestion: "If write traffic spikes by 20x during a unexpected outage, how would your proposed solution hold up under backpressure?",
          recommendedTopicsToReview: ["Distributed Lock Invalidation", "Circuit Breakers & Backpressure", "Sliding Window Rate Limiting"]
        }
      });
    }

    const prompt = `You are a Staff Technical Hiring Committee Lead evaluating a candidate's answer for a ${role || "Senior Software Engineer"} role.

Question asked: "${question}"
Category: "${category}"
Candidate Answer: "${answer}"

Provide a thorough, highly constructive evaluation.

Return ONLY a JSON object with this exact structure:
{
  "overallScore": number (0-100),
  "breakdown": {
    "clarityAndStructure": number (0-100),
    "technicalDepth": number (0-100),
    "problemDecomposition": number (0-100),
    "edgeCaseCoverage": number (0-100)
  },
  "strengthHighlights": ["string"],
  "gapAnalysis": ["string"],
  "suggestedAnswerEnhancement": "string",
  "followUpQuestion": "string",
  "recommendedTopicsToReview": ["string"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const evaluation = JSON.parse(response.text || "{}");
    return res.json({ success: true, evaluation });
  } catch (err: any) {
    console.error("Error evaluating answer:", err);
    res.status(500).json({ error: "Failed to evaluate answer", details: err.message });
  }
});

// API 3: Resume & Job Match Intelligence
app.post("/api/resume/analyze", async (req, res) => {
  try {
    const { resumeText, jobDescription, targetRole } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        isMock: true,
        analysis: {
          matchScore: 84,
          marketReadinessTier: "Strong Candidate (Top 12%)",
          matchingKeywords: ["Distributed Systems", "React / TypeScript", "Microservices", "PostgreSQL", "CI/CD Pipeline"],
          missingCriticalSkills: ["Kubernetes Operator pattern", "eBPF observability", "gRPC streaming"],
          bulletPointImprovements: [
            {
              original: "Built a backend system for handling user data and processing payments.",
              improved: "Architected a high-throughput Node.js microservice handling $12M+ monthly transaction volume with 99.99% uptime and <45ms p99 latency.",
              impactReasoning: "Replaces vague description with explicit scale, business impact, and hard performance SLA metrics."
            },
            {
              original: "Worked on frontend performance optimizations and reduced load times.",
              improved: "Engineered code-splitting and Webpack asset optimization strategies, slashing initial bundle size by 38% and reducing Largest Contentful Paint (LCP) from 2.8s to 1.1s.",
              impactReasoning: "Quantifies technical scope, specific engineering levers, and measurable UX benchmarks."
            }
          ],
          tailoredInterviewPrepStrategy: "Focus 60% of your prep on System Architecture and 40% on Behavioral Leadership with metrics-driven story frameworks."
        }
      });
    }

    const prompt = `You are a Career & Hiring Intelligence Agent analyzing a candidate resume for target role: ${targetRole || "Software Engineer"}.

Resume Text:
"${resumeText}"

Target Job Description:
"${jobDescription}"

Provide deep, actionable feedback in JSON format:
{
  "matchScore": number (0-100),
  "marketReadinessTier": "string",
  "matchingKeywords": ["string"],
  "missingCriticalSkills": ["string"],
  "bulletPointImprovements": [
    {
      "original": "string",
      "improved": "string",
      "impactReasoning": "string"
    }
  ],
  "tailoredInterviewPrepStrategy": "string"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const analysis = JSON.parse(response.text || "{}");
    return res.json({ success: true, analysis });
  } catch (err: any) {
    console.error("Error analyzing resume:", err);
    res.status(500).json({ error: "Failed to analyze resume", details: err.message });
  }
});

// API 4: Generate Dynamic Flashcards / Micro-Lessons
app.post("/api/flashcards/generate", async (req, res) => {
  try {
    const { topic, count } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        isMock: true,
        cards: [
          {
            id: "fc-1",
            topic: topic || "System Architecture",
            question: "What is the CAP Theorem and how does PACELC extend it?",
            answer: "CAP states a distributed system can only choose 2 of Consistency, Availability, Partition Tolerance. PACELC adds: IF there is a Partition (P), choose Availability (A) or Consistency (C); ELSE (E), choose Latency (L) or Consistency (C).",
            keyTakeaway: "PACELC accounts for normal operating conditions, not just network partitions.",
            difficulty: "Medium"
          },
          {
            id: "fc-2",
            topic: topic || "System Architecture",
            question: "When should you use a Bloom Filter versus a Cuckoo Filter?",
            answer: "Bloom filters support fast probabilistic insertion & lookup without deletion. Cuckoo filters support item deletion, lower space overhead for lower error rates, and better CPU cache locality.",
            keyTakeaway: "Use Cuckoo filters if you need deletion or higher memory efficiency at scale.",
            difficulty: "Hard"
          }
        ]
      });
    }

    const prompt = `Generate ${count || 3} high-yield, interview-grade flashcards for topic: "${topic}".
JSON Schema:
{
  "cards": [
    {
      "id": "string",
      "topic": "string",
      "question": "string",
      "answer": "string",
      "keyTakeaway": "string",
      "difficulty": "Easy" | "Medium" | "Hard"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const data = JSON.parse(response.text || "{}");
    return res.json({ success: true, cards: data.cards || [] });
  } catch (err: any) {
    console.error("Error generating flashcards:", err);
    res.status(500).json({ error: "Failed to generate flashcards", details: err.message });
  }
});

// Start Express Server with Vite middleware in dev mode
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ASCEND AI] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
