import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "駅間の中間地点検索 | 2駅間の中間駅を簡単に見つける",
  description: "友人との待ち合わせや不動産探しに便利。2つの駅の中間地点となる駅を簡単に検索できるサービスです。",
  keywords: "駅 中間地点, 中間駅, 待ち合わせ場所, 不動産探し, 駅検索",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
