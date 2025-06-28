import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  
  // Configuración de JWT y sesiones
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 horas
  },
  
  // Configuración de JWT
  jwt: {
    maxAge: 24 * 60 * 60, // 24 horas
  },
  
  // Configuración de cookies
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60, // 24 horas
      },
    },
  },
  
  callbacks: {
    async jwt({ token, account, profile }) {
      // Al iniciar sesión, agregar información adicional al token
      if (account && profile) {
        token.googleId = profile.sub
        token.avatar = (profile as any).picture
        token.email = profile.email
        token.name = profile.name
      }
      return token
    },
    
    async session({ session, token }) {
      // Pasar información del token a la sesión
      if (token && session.user) {
        session.user.id = token.googleId as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.avatar as string
      }
      return session
    },
  },
  
  pages: {
    signIn: '/login',
    error: '/login',
  },
  
  // Configuración adicional
  debug: process.env.NODE_ENV === "development",
})

export { handler as GET, handler as POST } 