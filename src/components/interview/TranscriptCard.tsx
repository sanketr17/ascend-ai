import React, { useState, useEffect } from "react";
import { MessageSquare, Edit3, Trash2, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TranscriptCardProps {
  transcriptText: string;
  onChangeTranscriptText: (text: string) => void;
  isRecording: boolean;
  notesText: string;
  onChangeNotesText: (text: string) => void;
  interviewerName?: string;
  className?: string;
}

export const TranscriptCard: React.FC<TranscriptCardProps> = ({
  transcriptText,
  onChangeTranscriptText,
  isRecording,
  notesText,
  onChangeNotesText,
  interviewerName = "Sarah Chen",
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<"transcript" | "notes">("transcript");
  const [visibleTextLength, setVisibleTextLength] = useState(transcriptText.length);

  // Progressive text stream simulation when recording starts
  useEffect(() => {
    if (isRecording && transcriptText) {
      if (visibleTextLength < transcriptText.length) {
        const timer = setTimeout(() => {
          setVisibleTextLength((prev) => Math.min(transcriptText.length, prev + 12));
        }, 80);
        return () => clearTimeout(timer);
      }
    } else {
      setVisibleTextLength(transcriptText.length);
    }
  }, [isRecording, transcriptText, visibleTextLength]);

  const displayedTranscript = isRecording 
    ? transcriptText.slice(0, visibleTextLength) 
    : transcriptText;

  const wordCount = transcriptText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = transcriptText.length;

  return (
    <div className={`bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft overflow-hidden flex flex-col ${className}`}>
      
      {/* Header Tabs */}
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-app)] border-b border-[var(--border-color)]">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab("transcript")}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              activeTab === "transcript"
                ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Live Response Transcript</span>
          </button>

          <button
            onClick={() => setActiveTab("notes")}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              activeTab === "notes"
                ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[var(--secondary-accent)]" />
            <span>Candidate Scratchpad</span>
          </button>
        </div>

        <div className="flex items-center space-x-3 text-[11px] font-mono text-[var(--text-secondary)]">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} chars</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col space-y-3">
        {activeTab === "transcript" ? (
          <div className="space-y-3 flex-1 flex flex-col">
            
            {/* Speaker Tag */}
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] pb-2 border-b border-[var(--border-color)]/40">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full bg-[var(--accent)] text-[var(--bg-app)] flex items-center justify-center text-[10px] font-bold">
                  C
                </div>
                <span className="font-semibold text-[var(--text-primary)]">You (Candidate)</span>
              </div>
              {isRecording ? (
                <span className="text-[var(--error)] flex items-center space-x-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-[var(--error)] animate-pulse" />
                  <span>ARIA is listening...</span>
                </span>
              ) : (
                <span className="text-[var(--success)] flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" />
                  <span>Ready for Evaluation</span>
                </span>
              )}
            </div>

            {/* Editable Transcript Textarea with progressive text stream */}
            <div className="relative flex-1 flex flex-col">
              <textarea
                value={displayedTranscript}
                onChange={(e) => {
                  onChangeTranscriptText(e.target.value);
                  setVisibleTextLength(e.target.value.length);
                }}
                placeholder="Your dictated or typed answer appears here. Speak clearly into your microphone or type your response..."
                rows={8}
                className="w-full flex-1 p-4 text-xs font-mono bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] leading-relaxed resize-none"
              />
              {isRecording && visibleTextLength < transcriptText.length && (
                <span className="absolute bottom-4 right-4 inline-block w-2 h-4 bg-[var(--accent)] animate-pulse" />
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                onClick={() => {
                  onChangeTranscriptText("");
                  setVisibleTextLength(0);
                }}
                className="text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--error)] flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear Transcript</span>
              </button>

              <span className="text-[11px] font-mono text-[var(--text-secondary)] flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-[var(--accent)]" />
                <span>AI cleans disfluencies automatically upon evaluation</span>
              </span>
            </div>

          </div>
        ) : (
          <div className="space-y-3 flex-1 flex flex-col">
            <div className="text-xs font-mono text-[var(--text-secondary)] pb-2 border-b border-[var(--border-color)]/40 flex items-center space-x-1.5">
              <Edit3 className="w-3.5 h-3.5 text-[var(--secondary-accent)]" />
              <span>Private Scratchpad & Architecture Sketch Area</span>
            </div>
            <textarea
              value={notesText}
              onChange={(e) => onChangeNotesText(e.target.value)}
              placeholder="Use this space for quick calculations, formulas, STAR bullet points or system architectural notes. Not evaluated by AI."
              rows={8}
              className="w-full flex-1 p-4 text-xs font-mono bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--secondary-accent)] leading-relaxed resize-none"
            />
          </div>
        )}
      </div>

    </div>
  );
};
