import NextAuth, { AuthError } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "./schema";
import { compareSync } from "bcrypt-ts";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";



export class InvalidLoginError extends AuthError {
    code = 'invalid_credentials'
    constructor(message: string) {
        super(message)
        this.code = message
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }
        try {
          const { email, password } = validatedFields.data;
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });
      

          if (!user) {
            throw new Error("User not found");
          }
          if (!user.password) {
            throw new Error("Please sign in with Google.");
          }

          const passwordMatch = compareSync(password, user.password);

          if (!passwordMatch) return null;

          return user;
        }
    
        catch (error) {
          throw error
          //throw new InvalidLoginError("invalid_credentials")
        }
        
      }
       
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoute = ["/dashboard", "/user", "/products"];
      if (!isLoggedIn && protectedRoute.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
    jwt({ user, token }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  secret: process.env.AUTH_SECRET
});


