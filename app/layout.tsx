import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata = {
  title: "JobaLink - Conectando Talentos em Moçambique",
  description:
    "Plataforma de conexão entre prestadores de serviços (Jobas) e clientes (Links) em Moçambique. Pagamentos seguros com M-Pesa e eMola.",
  keywords: "freelancer, serviços, Moçambique, M-Pesa, eMola, trabalho",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className={`${inter.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
