import React, { useState, useEffect } from "react";
import { AuthHeader } from "../components/AuthHeader";
import { PrimaryButton, SecondaryButton } from "../components/FormControls";
import { MailCheck, ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, Clock } from "lucide-react";

interface EmailVerificationScreenProps {
  email: string;
  onProceedToDashboard: () => void;
  onNavigateLogin: () => void;
}

export const EmailVerificationScreen: React.FC<EmailVerificationScreenProps> = ({
  email,
  onProceedToDashboard,
  onNavigateLogin,
}) => {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [countdown, setCountdown] = useState<number>(30);

  // Countdown timer effect for resend email
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = () => {
    if (countdown > 0 || isResending) return;

    setIsResending(true);
    setResendSuccess(false);

    setTimeout(() => {
      setIsResending(false);
      setResendSuccess(true);
      setCountdown(30); // Reset 30s countdown timer
      setTimeout(() => setResendSuccess(false), 4000);
    }, 800);
  };

  return (
    <div className="space-y-6 text-center">
      <AuthHeader mode="email_verification" />

      {/* Hero Badge Illustration */}
      <div className="py-2">
        <div className="w-16 h-16 rounded-3xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] mx-auto flex items-center justify-center shadow-craft">
          <MailCheck className="w-8 h-8" />
        </div>
      </div>

      <div className="p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl space-y-1.5 text-left">
        <div className="text-[10px] font-mono uppercase text-[var(--text-secondary)]">
          Sent Verification Address
        </div>
        <div className="text-xs font-mono font-bold text-[var(--text-primary)] truncate">
          {email || "alex.chen@engineering.io"}
        </div>
      </div>

      {resendSuccess && (
        <div className="p-3 bg-[var(--success)]/15 border border-[var(--success)]/30 text-[var(--success)] text-xs font-mono rounded-xl flex items-center justify-center space-x-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>New verification link dispatched to your inbox!</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <PrimaryButton
          onClick={onProceedToDashboard}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          I've Verified — Proceed to Workspace
        </PrimaryButton>

        <SecondaryButton
          onClick={handleResend}
          disabled={isResending || countdown > 0}
          icon={
            countdown > 0 ? (
              <Clock className="w-3.5 h-3.5" />
            ) : (
              <RotateCcw className={`w-3.5 h-3.5 ${isResending ? "animate-spin" : ""}`} />
            )
          }
        >
          {isResending
            ? "Sending New Email..."
            : countdown > 0
            ? `Resend available in ${countdown}s`
            : "Resend Verification Email"}
        </SecondaryButton>

        <div className="pt-2">
          <button
            type="button"
            onClick={onNavigateLogin}
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
};
