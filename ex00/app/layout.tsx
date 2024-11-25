import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
//import { SessionProvider } from "next-auth/react";

import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Pokémon Generator",
  description: "Create unique Pokémon using AI generation",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <SessionProvider>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="system"
//             enableSystem
//             disableTransitionOnChange
//           >
//             {children}
//             <Toaster />
//           </ThemeProvider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }
