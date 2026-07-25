export type AuthMode = 
  | "login" 
  | "register" 
  | "forgot_password" 
  | "email_verification";

export interface PasswordRequirementsState {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export interface UserAuthDetails {
  name?: string;
  email: string;
  isDemo?: boolean;
}
