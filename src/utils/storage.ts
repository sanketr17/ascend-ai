const AUTH_SESSION_KEY = "ascend_auth_session";
const DEMO_SESSION_KEY = "ascend_demo_session";
const BANNER_DISMISSED_KEY = "ascend_banner_dismissed";

export interface StoredSession {
  isAuthenticated: boolean;
  isDemoMode: boolean;
  user: {
    name?: string;
    email: string;
    role?: string;
    isDemo?: boolean;
  } | null;
  timestamp: number;
}

export const getStoredSession = (): StoredSession | null => {
  try {
    const local = localStorage.getItem(AUTH_SESSION_KEY) || localStorage.getItem(DEMO_SESSION_KEY);
    if (local) {
      return JSON.parse(local);
    }
    const session = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (session) {
      return JSON.parse(session);
    }
  } catch (e) {
    console.error("Failed to parse stored session", e);
  }
  return null;
};

export const saveAuthSession = (
  user: { name?: string; email: string; isDemo?: boolean },
  rememberMe: boolean = true
) => {
  const sessionData: StoredSession = {
    isAuthenticated: !user.isDemo,
    isDemoMode: !!user.isDemo,
    user,
    timestamp: Date.now(),
  };

  const key = user.isDemo ? DEMO_SESSION_KEY : AUTH_SESSION_KEY;

  if (rememberMe || user.isDemo) {
    localStorage.setItem(key, JSON.stringify(sessionData));
  } else {
    sessionStorage.setItem(key, JSON.stringify(sessionData));
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_SESSION_KEY);
  localStorage.removeItem(DEMO_SESSION_KEY);
  sessionStorage.removeItem(AUTH_SESSION_KEY);
};

export const isDemoBannerDismissed = (): boolean => {
  return localStorage.getItem(BANNER_DISMISSED_KEY) === "true";
};

export const setDemoBannerDismissed = (dismissed: boolean) => {
  if (dismissed) {
    localStorage.setItem(BANNER_DISMISSED_KEY, "true");
  } else {
    localStorage.removeItem(BANNER_DISMISSED_KEY);
  }
};
