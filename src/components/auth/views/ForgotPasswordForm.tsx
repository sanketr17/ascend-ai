import React, { useState } from "react";
import { AuthHeader } from "../components/AuthHeader";
import { FormInput, PrimaryButton, SecondaryButton } from "../components/FormControls";
import { Mail, ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { isValidEmail, sanitizeInput } from "../../../utils/validation";

interface ForgotPasswordFormProps {
  onNavigateLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onNavigateLogin }) => {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const sanitizedEmail = sanitizeInput(email);
  const isEmailValid = isValidEmail(sanitizedEmail);

  const emailError =
    touched && !sanitizedEmail
      ? "Email address is required"
      : touched && !isEmailValid
      ? "Please enter a valid email address"
      : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!isEmailValid || isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 700);
  };

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <AuthHeader mode="forgot_password" />

      {isSent ? (
        /* Success Screen */
        <div className="space-y-5 text-center p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-2xl shadow-craft">
          <div className="w-12 h-12 rounded-2xl bg-[var(--success)]/15 border border-[var(--success)]/30 text-[var(--success)] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-sm font-bold font-heading text-[var(--text-primary)]">
              Password Reset Link Sent
            </h3>
            <p className="text-xs font-body text-[var(--text-secondary)] leading-relaxed">
              We've sent recovery instructions to{" "}
              <span className="font-mono font-bold text-[var(--text-primary)]">
                {sanitizedEmail}
              </span>
              .
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <SecondaryButton onClick={handleResend} disabled={isLoading}>
              {isLoading ? "Sending..." : "Didn't receive email? Resend"}
            </SecondaryButton>

            <button
              type="button"
              onClick={onNavigateLogin}
              className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[var(--accent)] hover:underline pt-1 focus:outline-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>
          </div>
        </div>
      ) : (
        /* Email Reset Form */
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Registered Email Address"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setTouched(true);
            }}
            onBlur={() => setTouched(true)}
            error={emailError}
            icon={<Mail className="w-4 h-4" />}
            autoComplete="email"
            disabled={isLoading}
            autoFocus
            required
          />

          <PrimaryButton
            type="submit"
            isLoading={isLoading}
            disabled={!isEmailValid || isLoading}
            icon={<Send className="w-4 h-4" />}
          >
            Send Password Reset Link
          </PrimaryButton>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onNavigateLogin}
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors focus:outline-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
