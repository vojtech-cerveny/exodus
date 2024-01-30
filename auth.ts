import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { NextAuthConfig, Session, User } from "next-auth";

const prisma = new PrismaClient();
export const config: NextAuthConfig = {
  theme: {
    logo: "/icons/login.svg",
  },
  providers: [Google],
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  // callbacks: {
  //   authorized({ request, auth }) {
  //     const { pathname } = request.nextUrl
  //     if (pathname === "/middleware-example") return !!auth
  //     return true
  //   },
  // },
  session: {
    strategy: "database",
  },
  // TODO: uncomment this when we have login page
  // pages: {
  //   signIn: "/auth/login",
  // },
  callbacks: {
    session({ session, user }: { session: Session; user?: User }) {
      if (session.user && user) {
        session.user.id = user!.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
