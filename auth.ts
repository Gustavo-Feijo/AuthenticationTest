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

//Authentication handlers.
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    //Credentials provider that receives only a email and plain text password.
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          //Verify if the email and password match the signInSchema from Zod.
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          //Get the email from the database with prisma.
          user = await prisma.user.findUnique({ where: { email: email } });
          if (!user) {
            return null;
          }
          //If the user exists, compare it's hashed password with the plaint text password.
          if (await bcrypt.compare(password, user.password)) {
            //If it matches, then the right password was inserted.
            //Removes the password from the response and returns the user object.
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
  //Custom pag for signIn.
  pages: { signIn: "/auth/signin" },
});
