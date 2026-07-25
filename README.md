# ASCEND AI — Adaptive Learning & Interview Platform

> **"Learn. Speak. Improve. Repeat."**

ASCEND AI is a high-performance, AI-powered career readiness platform designed to help engineers, students, and professionals master technical interviews, system design trade-offs, and computer science fundamentals. Featuring **ARIA** (*Adaptive Response Intelligence Assistant*), ASCEND AI provides real-time speech analysis, adaptive study paths, spaced repetition memory decks, and deep skill analytics.

---

## 🌟 Key Features

### 🔐 1. Premium Authentication Experience
- **Unified Split-Screen Architecture**: Left-side brand showcase with live statistics, feature highlights, and glassmorphism ARIA coach card; right-side focused form card.
- **Authentication Views**:
  - **Sign In**: Email & password authentication with show/hide toggle, "Remember Me", inline validation, and keyboard navigation.
  - **Create Account**: Complete registration flow with real-time password strength meter and interactive security requirements checklist.
  - **Forgot Password**: Clean recovery flow with success state and resend functionality.
  - **Email Verification**: Verification screen with a 30-second countdown timer for resending activation links.
  - **Explore Demo Workspace**: Official zero-account entry point enabling instant preview access.
- **Accessibility & Motion**: Full ARIA support (`aria-invalid`, `aria-describedby`, `aria-live`), autofocus management, keyboard navigation, and `prefers-reduced-motion` respecting Framer Motion animations.

### 🎙️ 2. AI Mock Interview Simulator
- Voice & speech practice with real-time audio waveforms and telemetry.
- Instant feedback on communication structure, technical accuracy, and filler word frequency.

### 🧠 3. ARIA Study Coach
- Contextual learning partner providing adaptive study plans, weakness identification, and custom learning paths.

### ⚡ 4. Interactive Skill Graph
- Visual dependency graph mapping core technical topics (Data Structures, Algorithms, System Design, Behavioral) with mastery indicators.

### 🎴 5. Spaced Repetition Memory Deck
- Flashcard system with interval scheduling algorithms and AI-powered card generation per topic.

### 📄 6. AI Resume Optimizer
- Automated resume analysis against FAANG+ job descriptions with real-time scorecards and keyword recommendations.

### 📊 7. Career Readiness Analytics
- Comprehensive breakdown of readiness metrics, interview history logs, flame streaks, and XP points tracking.

---

## 🏗️ Architecture & Project Structure

```text
src/
├── components/
│   ├── auth/                      # Authentication Module
│   │   ├── components/            # Reusable Auth UI (FormControls, PasswordRequirements, LeftPanel, AuthCard, etc.)
│   │   ├── views/                 # View Screens (LoginForm, RegisterForm, ForgotPasswordForm, EmailVerificationScreen)
│   │   ├── AuthContainer.tsx      # Protected View Router
│   │   └── types.ts               # Auth Types & Interfaces
│   ├── interview/                 # Voice & Interview Simulator Components
│   ├── motion/                    # Framer Motion Transition Wrappers
│   ├── profile/                   # Profile & Settings Management
│   ├── study/                     # AI Study Coach Components
│   └── views/                     # Core Dashboard View Panels
├── context/                       # React Context Providers
│   ├── AuthContext.tsx            # Session, Auth & Demo State
│   └── ThemeContext.tsx           # Global Theme Management (Dark/Light)
├── data/                          # Modular Static & Demo Data
│   ├── demoUser.ts                # Realistic Demo Profile & Statistics
│   ├── initialData.ts             # Default Workspace Collections
│   ├── interviewData.ts           # Mock Questions & Categories
│   └── studyData.ts               # Study Topics & Modules
├── hooks/                         # Custom React Hooks (useAuth)
├── utils/                         # Helper Utilities
│   ├── storage.ts                 # Session & LocalStorage Managers
│   └── validation.ts              # Form Sanitization & Security Evaluators
└── App.tsx                        # Main App Router & Workspace Container
```

---

## 🛠️ Technology Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS with custom CSS variables & design tokens
- **Animations**: Framer Motion (`motion/react`)
- **Icons**: Lucide React
- **State & Persistence**: React Context API + LocalStorage / SessionStorage Layer

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ascend-ai.git
   cd ascend-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🛡️ Authentication Architecture & Supabase Integration Plan

The frontend authentication layer is engineered with clean separation between UI state and authentication providers:

- **State Management**: Managed via `AuthContext` with support for both persistent sessions (`Remember Me`) and transient demo sessions.
- **Form Controls**: Built with reusable `FormInput` and `PasswordInput` components that handle inline validation, error announcements, and accessibility standards.
- **Backend Ready**: Future integration with **Supabase Auth** or Firebase Auth requires updating only the method handlers inside `src/context/AuthContext.tsx`.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.