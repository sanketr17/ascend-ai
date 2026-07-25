import React from "react";
import { AuthMode } from "../types";

interface AuthHeaderProps {
  mode: AuthMode;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ mode }) => {
  const titles: Record<AuthMode, { title: string; subtitle: string }> = {
    login: {
      title: "Welcome Back",
      subtitle: "Sign in to continue your career readiness journey with ARIA.",
    },
    register: {
      title: "Create Your Account",
      subtitle: "Join thousands of engineers mastering AI mock interviews and system design.",
    },
    forgot_password: {
      title: "Reset Your Password",
      subtitle: "Enter your registered email address and we'll send you recovery instructions.",
    },
    email_verification: {
      title: "Verify Your Email",
      subtitle: "We sent a secure activation link to your inbox. Check your email to activate your account.",
    },
  };

  const current = titles[mode];

  return (
    <div className="space-y-1.5 text-center sm:text-left">
      <h2 className="text-2xl font-extrabold font-heading text-[var(--text-primary)] tracking-tight">
        {current.title}
      </h2>
      <p className="text-xs font-body text-[var(--text-secondary)] leading-relaxed">
        {current.subtitle}
      </p>
    </div>
  );
};
