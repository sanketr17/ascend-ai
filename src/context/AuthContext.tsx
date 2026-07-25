import React, { createContext, useContext, useState, useEffect } from "react";
import { UserAuthDetails } from "../components/auth/types";
import { DEMO_USER_PROFILE } from "../data/demoUser";
import {
  getStoredSession,
  saveAuthSession,
  clearAuthSession,
  isDemoBannerDismissed,
  setDemoBannerDismissed,
} from "../utils/storage";

interface AuthContextType {
  user: UserAuthDetails | null;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  bannerDismissed: boolean;
  isLoading: boolean;
  login: (email: string, password?: string, rememberMe?: boolean) => Promise<boolean>;
  register: (name: string, email: string, password?: string) => Promise<boolean>;
  enterDemoMode: () => void;
  exitDemoMode: () => void;
  logout: () => void;
  dismissBanner: () => void;
  restoreBanner: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAuthDetails | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [bannerDismissed, setBannerDismissedState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize session on mount
  useEffect(() => {
    const session = getStoredSession();
    if (session && session.user) {
      setUser(session.user);
      setIsAuthenticated(session.isAuthenticated);
      setIsDemoMode(session.isDemoMode);
    }
    setBannerDismissedState(isDemoBannerDismissed());
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password?: string, rememberMe = true): Promise<boolean> => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 600));

    const nameFromEmail = email.split("@")[0].replace(".", " ");
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    const userObj: UserAuthDetails = {
      name: formattedName,
      email: email.trim(),
      isDemo: false,
    };

    setUser(userObj);
    setIsAuthenticated(true);
    setIsDemoMode(false);
    saveAuthSession(userObj, rememberMe);
    setIsLoading(false);
    return true;
  };

  const register = async (name: string, email: string, _password?: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 800));

    const userObj: UserAuthDetails = {
      name: name.trim(),
      email: email.trim(),
      isDemo: false,
    };

    setUser(userObj);
    setIsAuthenticated(true);
    setIsDemoMode(false);
    saveAuthSession(userObj, true);
    setIsLoading(false);
    return true;
  };

  const enterDemoMode = () => {
    const demoUserObj: UserAuthDetails = {
      name: DEMO_USER_PROFILE.name,
      email: DEMO_USER_PROFILE.email,
      isDemo: true,
    };

    setUser(demoUserObj);
    setIsAuthenticated(false); // Demo mode allows access via isDemoMode flag
    setIsDemoMode(true);
    saveAuthSession(demoUserObj, true);
  };

  const exitDemoMode = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsDemoMode(false);
    clearAuthSession();
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsDemoMode(false);
    clearAuthSession();
  };

  const dismissBanner = () => {
    setBannerDismissedState(true);
    setDemoBannerDismissed(true);
  };

  const restoreBanner = () => {
    setBannerDismissedState(false);
    setDemoBannerDismissed(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isDemoMode,
        bannerDismissed,
        isLoading,
        login,
        register,
        enterDemoMode,
        exitDemoMode,
        logout,
        dismissBanner,
        restoreBanner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
