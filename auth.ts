import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import z from "zod";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          user = await prisma.user.findUnique({ where: { email: email } });
          if (!user) {
            return null;
          }
          if (await bcrypt.compare(password, user.password)) {
            const { password, ...cleanUser } = user;
            return cleanUser;
          } else {
            return null;
          }
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/auth/signin", error: "/auth/error" },
});
