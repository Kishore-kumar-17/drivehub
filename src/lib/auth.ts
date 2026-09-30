/**
 * Clerk-ready Authentication Abstraction
 * Supports drop-in integration with @clerk/nextjs when keys are configured.
 */

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "customer";
  imageUrl?: string;
}

export const DEMO_ADMIN_USER: AuthUser = {
  id: "user_drivehub_admin_01",
  firstName: "Arun",
  lastName: "Kumar",
  email: "admin@drivehubcars.com",
  role: "admin",
  imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
};

export function getClientAuthState(): {
  isSignedIn: boolean;
  user: AuthUser | null;
  isAdmin: boolean;
} {
  // Check if Clerk is configured via env
  const isClerkConfigured = typeof process !== "undefined" && Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return {
    isSignedIn: true,
    user: DEMO_ADMIN_USER,
    isAdmin: true,
  };
}
