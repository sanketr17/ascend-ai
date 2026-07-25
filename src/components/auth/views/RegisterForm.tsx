import React, { useState } from "react";
import { AuthHeader } from "../components/AuthHeader";
import { FormInput, PasswordInput, PrimaryButton } from "../components/FormControls";
import { PasswordRequirements, evaluatePassword } from "../components/PasswordRequirements";
import { AnimatedCheckbox } from "../../DesignSystem";
import { User, Mail, Lock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { isValidEmail, sanitizeInput } from "../../../utils/validation";

interface RegisterFormProps {
  onRegisterComplete: (name: string, email: string) => void;
  onNavigateLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegisterComplete,
  onNavigateLogin,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirm: false,
    terms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Live validation logic
  const sanitizedName = sanitizeInput(fullName);
  const sanitizedEmail = sanitizeInput(email);

  const isNameValid = sanitizedName.length >= 2;
  const isEmailValid = isValidEmail(sanitizedEmail);

  const passwordRules = evaluatePassword(password);
  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  const isConfirmValid = password.length > 0 && password === confirmPassword;

  const isFormValid =
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmValid &&
    agreeTerms;

  // Inline error messages
  const nameError =
    touched.name && !sanitizedName
      ? "Full name is required"
      : touched.name && !isNameValid
      ? "Name must be at least 2 characters"
      : "";

  const emailError =
    touched.email && !sanitizedEmail
      ? "Email address is required"
      : touched.email && !isEmailValid
      ? "Please enter a valid email address"
      : "";

  const confirmError =
    touched.confirm && !confirmPassword
      ? "Please confirm your password"
      : touched.confirm && !isConfirmValid
      ? "Passwords do not match"
      : "";

  const termsError =
    touched.terms && !agreeTerms
      ? "You must accept the Terms of Service and Privacy Policy"
      : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      password: true,
      confirm: true,
      terms: true,
    });

    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onRegisterComplete(sanitizedName, sanitizedEmail);
      }, 500);
    }, 800);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <AuthHeader mode="register" />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <FormInput
          label="Full Name"
          type="text"
          placeholder="Alex Chen"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            setTouched((prev) => ({ ...prev, name: true }));
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
          error={nameError}
          icon={<User className="w-4 h-4" />}
          autoComplete="name"
          disabled={isLoading}
          autoFocus
          required
        />

        <FormInput
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setTouched((prev) => ({ ...prev, email: true }));
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          error={emailError}
          icon={<Mail className="w-4 h-4" />}
          autoComplete="email"
          disabled={isLoading}
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setTouched((prev) => ({ ...prev, password: true }));
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          icon={<Lock className="w-4 h-4" />}
          autoComplete="new-password"
          disabled={isLoading}
          required
        />

        {/* Live Password Requirements Indicator */}
        <PasswordRequirements password={password} />

        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setTouched((prev) => ({ ...prev, confirm: true }));
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, confirm: true }))}
          error={confirmError}
          icon={<Lock className="w-4 h-4" />}
          autoComplete="new-password"
          disabled={isLoading}
          required
        />

        {/* Terms Checkbox */}
        <div className="space-y-1 pt-1">
          <div className="flex items-start space-x-2">
            <AnimatedCheckbox
              checked={agreeTerms}
              onChange={(val) => {
                setAgreeTerms(val);
                setTouched((prev) => ({ ...prev, terms: true }));
              }}
            />
            <span className="text-[11px] font-body text-[var(--text-secondary)] leading-tight">
              I agree to the{" "}
              <a
                href="#terms"
                onClick={(e) => e.preventDefault()}
                className="text-[var(--text-primary)] font-bold hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#privacy"
                onClick={(e) => e.preventDefault()}
                className="text-[var(--text-primary)] font-bold hover:underline"
              >
                Privacy Policy
              </a>
              .
            </span>
          </div>
          {termsError && (
            <p className="text-[11px] font-mono text-[var(--error)] flex items-center space-x-1 pl-6">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{termsError}</span>
            </p>
          )}
        </div>

        {/* Primary Submit Button */}
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
          {isSuccess ? "Account Created!" : "Create Account & Start Learning"}
        </PrimaryButton>
      </form>

      {/* Login Footer Link */}
      <div className="text-center pt-3 border-t border-[var(--border-color)]">
        <p className="text-xs font-body text-[var(--text-secondary)]">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onNavigateLogin}
            className="text-[var(--text-primary)] font-bold font-mono hover:text-[var(--accent)] underline transition-colors focus:outline-none"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};
