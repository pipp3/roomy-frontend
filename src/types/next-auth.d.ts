import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      name: string
      email: string
      image: string
    }
  }

  interface User extends DefaultUser {
    id: string
    name: string
    email: string
    image: string
  }

  interface Profile {
    sub: string
    email: string
    name: string
    picture?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    googleId?: string
    avatar?: string
    email?: string
    name?: string
  }
} 