import React, { useState, useEffect } from "react";
import { SetupConfig } from "./InterviewSetupSubView";
import { sampleQuestionsPool } from "../../../data/interviewData";
import { QuestionCard } from "../QuestionCard";
import { TranscriptCard } from "../TranscriptCard";
import { Waveform } from "../Waveform";
import { MicButton } from "../MicButton";
import { RecordingIndicator } from "../RecordingIndicator";
import { ThinkingState } from "../ThinkingState";
import { Button } from "../../DesignSystem";
import { 
  Play, 
  Pause, 
  Clock, 
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VoiceInterviewScreenSubViewProps {
  config: SetupConfig;
  onCompleteQuestion: (transcript: string, timeSpentSeconds: number) => void;
  onEndInterviewEarly: () => void;
}

export const VoiceInterviewScreenSubView: React.FC<VoiceInterviewScreenSubViewProps> = ({
  config,
  onCompleteQuestion,
  onEndInterviewEarly,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionsList = sampleQuestionsPool;
  const currentQuestion = questionsList[currentQuestionIndex] || sampleQuestionsPool[0];

  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState<"idle" | "recording" | "paused" | "evaluating" | "completed">("idle");
  const [timerSeconds, setTimerSeconds] = useState(0);

  const [transcriptText, setTranscriptText] = useState("");
  const [notesText, setNotesText] = useState("");

  // Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Handle Mic Toggle
  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setStatus("paused");
    } else {
      setIsRecording(true);
      setStatus("recording");
      // If transcript is empty, simulate speech streaming
      if (!transcriptText) {
        setTranscriptText(currentQuestion.defaultTranscriptSample);
      }
    }
  };

  const handlePause = () => {
    setIsRecording(false);
    setStatus("paused");
  };

  const handleResume = () => {
    setIsRecording(true);
    setStatus("recording");
  };

  const handleSubmitQuestion = () => {
    setIsRecording(false);
    setStatus("evaluating");
    setTimeout(() => {
      onCompleteQuestion(transcriptText || currentQuestion.defaultTranscriptSample, timerSeconds);
    }, 1200);
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (status === "evaluating") {
    return (
      <div className="py-12">
        <ThinkingState message="ARIA is evaluating your response..." />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft">
        
        {/* Status & Indicator */}
        <div className="flex items-center space-x-3">
          <RecordingIndicator status={status} />
          
          <div className="flex items-center space-x-2 text-xs font-mono text-[var(--text-secondary)]">
            <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
            <motion.span 
              key={timerSeconds}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              className="font-bold font-numbers text-[var(--text-primary)] text-sm"
            >
              {formatTimer(timerSeconds)}
            </motion.span>
          </div>
        </div>

        {/* Center Progress Bar */}
        <div className="flex items-center space-x-2 text-xs font-mono text-[var(--text-secondary)]">
          <span>Question {currentQuestionIndex + 1} of {questionsList.length}</span>
          <div className="w-28 sm:w-36 h-2 bg-[var(--bg-app)] rounded-full overflow-hidden border border-[var(--border-color)]">
            <motion.div 
              className="h-full bg-[var(--accent)] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentQuestionIndex + 1) / questionsList.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Top Controls */}
        <div className="flex items-center space-x-2">
          {status === "recording" ? (
            <Button onClick={handlePause} variant="outline" size="sm" icon={<Pause className="w-3.5 h-3.5" />}>
              Pause
            </Button>
          ) : status === "paused" ? (
            <Button onClick={handleResume} variant="accent" size="sm" icon={<Play className="w-3.5 h-3.5 fill-current" />}>
              Resume
            </Button>
          ) : null}

          <Button onClick={onEndInterviewEarly} variant="ghost" size="sm" className="text-[var(--error)] hover:bg-[var(--error)]/10">
            End Session
          </Button>
        </div>

      </div>

      {/* Main Focus Question Stage with AnimatePresence for smooth slide/fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <QuestionCard
            questionItem={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questionsList.length}
          />
        </motion.div>
      </AnimatePresence>

      {/* Voice Mic & Waveform Stage */}
      <div className="p-8 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft flex flex-col items-center justify-center space-y-6 text-center">
        
        {/* Waveform Animation */}
        <Waveform isRecording={isRecording} barCount={24} className="w-full max-w-xs" />

        {/* Center Large Mic Button */}
        <MicButton
          isRecording={isRecording}
          onToggle={handleToggleRecording}
        />

        {/* Status Text & Hint */}
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold text-[var(--text-primary)]">
            {isRecording ? "ARIA is listening... Speak clearly" : "Click Microphone to Start Speaking"}
          </div>
          <p className="text-[11px] text-[var(--text-secondary)] font-body">
            Speak as naturally as you would in a real interview. You can also edit transcript manually.
          </p>
        </div>

      </div>

      {/* Live Transcript & Scratchpad Card */}
      <TranscriptCard
        transcriptText={transcriptText}
        onChangeTranscriptText={setTranscriptText}
        isRecording={isRecording}
        notesText={notesText}
        onChangeNotesText={setNotesText}
      />

      {/* Bottom Stage Action */}
      <div className="flex items-center justify-between p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft">
        <div className="text-xs text-[var(--text-secondary)] font-mono">
          Ready to submit answer for AI Committee evaluation?
        </div>

        <Button
          onClick={handleSubmitQuestion}
          variant="accent"
          size="lg"
          icon={<Sparkles className="w-4 h-4" />}
        >
          Evaluate Answer & Continue →
        </Button>
      </div>

    </div>
  );
};
