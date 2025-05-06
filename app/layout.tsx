import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { KPITicker } from "@/components/kpi-ticker"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <KPITicker />
        <div className="pt-12">{children}</div>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
