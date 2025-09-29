import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { ComoFunciona } from "@/components/landing/como-funciona"
import { FuncoesDetalhadas } from "@/components/landing/funcoes-detalhadas"
import { JuntaTe } from "@/components/landing/junta-te"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ComoFunciona />
      <FuncoesDetalhadas />
      <JuntaTe />
    </main>
  )
}
