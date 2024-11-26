// lib/auth.ts
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      authorization: {
        params: {
          // Usar VERCEL_URL como fallback si está disponible
          redirect_uri: process.env.NEXTAUTH_URL 
            ? `${process.env.NEXTAUTH_URL}/api/auth/callback/github`
            : process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/auth/callback/github`
            : 'http://localhost:3000/api/auth/callback/github'
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Si la URL comienza con el baseUrl, es segura
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // Si es una URL relativa, agregarla al baseUrl
      else if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Por defecto, redirigir al baseUrl
      return baseUrl;
    }
  }
};