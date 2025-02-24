import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "@auth/core/adapters";
declare module "next-auth" {
    interface session {
        user: User & DefaultSession["user"]
    }

    interface User{
        role: string
    }
}

declare module "next-auth/jwt" {
    interface JWT{
        sub: string,
        role: string
    }
}
declare module "@auth/core/adapters" {
  interface AdapterUser {
    // Add your additional properties here:
   role: string
  }
}


// 1:37:12 Protected Menu
// 1:42:00 User Page (Admin Only)
// 1:53:37 Product Page (Admin & User)
// 2:00:55 Format Date Library
// 2:03:28 Sign In with Google
// 2:16:20 Sign In with Github
// 2:26:24 Deploy