import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AuthMode, UserAuthDetails } from "./types";
import { AuthLayout } from "./components/AuthLayout";
import { AuthCard } from "./components/AuthCard";
import { LoginForm } from "./views/LoginForm";
import { RegisterForm } from "./views/RegisterForm";
import { ForgotPasswordForm } from "./views/ForgotPasswordForm";
import { EmailVerificationScreen } from "./views/EmailVerificationScreen";
import { useAuth } from "../../hooks/useAuth";

interface AuthContainerProps {
  onAuthenticate?: (user: UserAuthDetails) => void;
  initialMode?: AuthMode;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({
  onAuthenticate,
  initialMode = "login",
}) => {
  const { login, register, enterDemoMode } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [pendingUserEmail, setPendingUserEmail] = useState("");
  const [pendingUserName, setPendingUserName] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const handleSignIn = async (email: string, rememberMe: boolean) => {
    await login(email, undefined, rememberMe);
    if (onAuthenticate) {
      onAuthenticate({
        name: email.split("@")[0].replace(".", " "),
        email,
        isDemo: false,
      });
    }
  };

  const handleExploreDemo = () => {
    enterDemoMode();
    if (onAuthenticate) {
      onAuthenticate({
        name: "Alex Johnson",
        email: "alex.johnson@stanford.edu",
        isDemo: true,
      });
    }
  };

  const handleRegisterComplete = (name: string, email: string) => {
    setPendingUserName(name);
    setPendingUserEmail(email);
    setMode("email_verification");
  };

  const handleProceedFromVerification = async () => {
    await register(
      pendingUserName || "New Scholar",
      pendingUserEmail || "user@example.com"
    );
    if (onAuthenticate) {
      onAuthenticate({
        name: pendingUserName || "New Scholar",
        email: pendingUserEmail || "user@example.com",
        isDemo: false,
      });
    }
  };

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        <AuthCard key={mode}>
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: mode === "login" ? -10 : 10 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: mode === "login" ? 10 : -10 }
            }
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {mode === "login" && (
              <LoginForm
                onSignIn={handleSignIn}
                onExploreDemo={handleExploreDemo}
                onNavigateRegister={() => setMode("register")}
                onNavigateForgotPassword={() => setMode("forgot_password")}
              />
            )}

            {mode === "register" && (
              <RegisterForm
                onRegisterComplete={handleRegisterComplete}
                onNavigateLogin={() => setMode("login")}
              />
            )}

            {mode === "forgot_password" && (
              <ForgotPasswordForm onNavigateLogin={() => setMode("login")} />
            )}

            {mode === "email_verification" && (
              <EmailVerificationScreen
                email={pendingUserEmail}
                onProceedToDashboard={handleProceedFromVerification}
                onNavigateLogin={() => setMode("login")}
              />
            )}
          </motion.div>
        </AuthCard>
      </AnimatePresence>
    </AuthLayout>
  );
};
