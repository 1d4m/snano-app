import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // ⬇ セッションに DB user.id を載せる
    async session({ session }) {
      if (!session?.user?.email) return session;

      const result = await db
        .select()
        .from(users)
        .where(eq(users.email, session.user.email))
        .limit(1);

      if (result.length > 0) {
        session.user.id = result[0].id;
      }

      return session;
    },

    // ⬇ ログイン時に users を作る
    async signIn({ user }) {
      try {
        console.log("SIGN IN CALLBACK USER:", user);

        if (!user?.email) {
          console.error("NO EMAIL → DENY");
          return false;
        }

        const existing = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1);

        if (existing.length === 0) {
          console.log("USER NOT FOUND → CREATING");
          await db.insert(users).values({
            name: user.name ?? "No name",
            email: user.email,
            image: user.image ?? null,
          });
        }

        return true;
      } catch (e) {
        console.error("SIGN IN ERROR:", e);
        return false;
      }
    },
  },
});
