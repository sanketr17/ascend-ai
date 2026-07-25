import React, { useState } from "react";
import { AuthHeader } from "../components/AuthHeader";
import { FormInput, PasswordInput, PrimaryButton, SocialDivider, DemoButton } from "../components/FormControls";
import { AnimatedCheckbox } from "../../DesignSystem";
import { Mail, Lock, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { isValidEmail, sanitizeInput } from "../../../utils/validation";

interface LoginFormProps {
  onSignIn: (email: string, rememberMe: boolean) => void;
  onExploreDemo: () => void;
  onNavigateRegister: () => void;
  onNavigateForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSignIn,
  onExploreDemo,
  onNavigateRegister,
  onNavigateForgotPassword,
}) => {
  const [email, setEmail] = useState("alex.chen@engineering.io");
  const [password, setPassword] = useState("Password123!");
  const [rememberMe, setRememberMe] = useState(true);

  const [touched, setTouched] = useState({ email: false, password: false });
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Live validation calculations
  const sanitizedEmail = sanitizeInput(email);
  const isEmailValid = isValidEmail(sanitizedEmail);
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const emailErrorMsg =
    touched.email && !sanitizedEmail
      ? "Email address is required"
      : touched.email && !isEmailValid
      ? "Please enter a valid email address (e.g. name@domain.com)"
      : "";

  const passwordErrorMsg =
    touched.password && !password
      ? "Password is required"
      : touched.password && !isPasswordValid
      ? "Password must be at least 6 characters"
      : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setAuthError(null);

    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSignIn(sanitizedEmail, rememberMe);
      }, 400);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <AuthHeader mode="login" />

      {/* Auth Error Banner if present */}
      {authError && (
        <div className="p-3 bg-[var(--error)]/10 border border-[var(--error)]/30 rounded-xl text-xs font-mono text-[var(--error)] flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setTouched((prev) => ({ ...prev, email: true }));
            if (authError) setAuthError(null);
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          error={emailErrorMsg}
          icon={<Mail className="w-4 h-4" />}
          autoComplete="email"
          disabled={isLoading}
          autoFocus
          required
        />

        <div className="space-y-1">
          <PasswordInput
            label="Password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setTouched((prev) => ({ ...prev, password: true }));
              if (authError) setAuthError(null);
            }}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            error={passwordErrorMsg}
            icon={<Lock className="w-4 h-4" />}
            autoComplete="current-password"
            disabled={isLoading}
            required
          />

          <div className="flex items-center justify-between pt-1 text-xs font-mono">
            <AnimatedCheckbox
              checked={rememberMe}
              onChange={setRememberMe}
              label="Remember me"
            />

            <button
              type="button"
              onClick={onNavigateForgotPassword}
              className="text-[var(--accent)] hover:underline font-medium focus:outline-none"
            >
              Forgot password?
            </button>
          </div>
        </div>

        {/* Primary Submit */}
        <PrimaryButton
          type="submit"
          isLoading={isLoading}
          disabled={!isFormValid || isLoading}
          icon={
            isSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )
          }
          className="mt-2"
        >
          {isSuccess ? "Authenticated! Opening..." : "Sign In to ASCEND AI"}
        </PrimaryButton>
      </form>

      {/* Divider */}
      <SocialDivider />

      {/* Explore Demo Entry */}
      <DemoButton onClick={onExploreDemo} isLoading={isLoading} />

      {/* Register Link Footer */}
      <div className="text-center pt-2 border-t border-[var(--border-color)]">
        <p className="text-xs font-body text-[var(--text-secondary)]">
          Don't have an account yet?{" "}
          <button
            type="button"
            onClick={onNavigateRegister}
            className="text-[var(--text-primary)] font-bold font-mono hover:text-[var(--accent)] underline transition-colors focus:outline-none"
          >
            Create an Account
          </button>
        </p>
      </div>
    </div>
  );
};
