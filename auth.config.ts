import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

      // 🔒 Protect ONLY dashboard routes
      if (isDashboardRoute) {
        if (isLoggedIn) return true;
        return false; // redirect to /login
      }

      // ✅ Public pages (shop, home, about) are ALWAYS allowed
      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;