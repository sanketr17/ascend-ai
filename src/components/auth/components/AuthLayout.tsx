import React from "react";
import { AuthLeftPanel } from "./AuthLeftPanel";
import { ThemeToggle } from "../../ThemeToggle";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[var(--bg-app)] text-[var(--text-primary)] flex flex-col lg:flex-row transition-colors duration-200 overflow-x-hidden">
      
      {/* LEFT PANEL: Split Screen Brand Experience (Visible on Desktop / Large screens) */}
      <div className="hidden lg:block lg:w-1/2 xl:w-[52%] min-h-screen">
        <AuthLeftPanel />
      </div>

      {/* RIGHT PANEL: Auth Form Shell */}
      <div className="w-full lg:w-1/2 xl:w-[48%] min-h-screen flex flex-col justify-between p-4 sm:p-8 lg:p-12 relative bg-[var(--bg-app)]">
        
        {/* Top Header Controls (Theme Toggle & Compact Mobile Brand Header) */}
        <div className="flex items-center justify-between w-full max-w-[450px] mx-auto pb-4">
          
          {/* Mobile-Only Compact Brand Identity */}
          <div className="flex lg:hidden items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] flex items-center justify-center font-bold text-xs shadow-xs border border-[var(--border-color)]">
              ▲
            </div>
            <span className="font-extrabold text-sm font-heading tracking-tight text-[var(--text-primary)]">
              ASCEND AI
            </span>
          </div>

          <div className="hidden lg:block text-xs font-mono text-[var(--text-secondary)]">
            Ascend Career Systems v2.4
          </div>

          {/* Theme Toggle */}
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>

        {/* Form Container Center */}
        <div className="my-auto flex items-center justify-center py-6 w-full">
          {children}
        </div>

        {/* Bottom Footer Links */}
        <div className="w-full max-w-[450px] mx-auto pt-6 text-center text-[11px] font-mono text-[var(--text-secondary)] space-y-1">
          <p>© 2026 ASCEND AI. All rights reserved.</p>
          <div className="flex items-center justify-center space-x-3 text-[10px]">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[var(--text-primary)] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[var(--text-primary)] transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#help" onClick={(e) => e.preventDefault()} className="hover:text-[var(--text-primary)] transition-colors">Support</a>
          </div>
        </div>

      </div>

    </div>
  );
};
