import { JobaButton, LinkButton } from "@/components/ui/button-variants"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-orange-50 py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-balance">
            Conectando Talentos em <span className="text-joba-blue">Moçambique</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 text-pretty max-w-2xl mx-auto">
            A plataforma que une prestadores de serviços qualificados (Jobas) com clientes que precisam de soluções
            (Links). Pagamentos seguros com M-Pesa e eMola.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#junta-te">
              <JobaButton size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
                Sou um Prestador (Joba)
              </JobaButton>
            </Link>
            <Link href="#junta-te">
              <LinkButton size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
                Preciso de Serviços (Link)
              </LinkButton>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-joba-blue">100%</div>
              <div className="text-sm text-gray-600">Pagamentos Seguros</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-link-orange">M-Pesa & eMola</div>
              <div className="text-sm text-gray-600">Integração Nacional</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">5★</div>
              <div className="text-sm text-gray-600">Sistema de Avaliação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
