import { JobaButton, LinkButton } from "@/components/ui/button-variants"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Briefcase, Users } from "lucide-react"

export function JuntaTe() {
  return (
    <section id="junta-te" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">Junta-te à JobaLink</h2>
          <p className="mt-4 text-lg text-gray-300 text-pretty max-w-2xl mx-auto">
            Escolhe o teu papel e começa a conectar-te com oportunidades em Moçambique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Joba Registration Card */}
          <Card className="card-shadow border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full joba-blue mb-6">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quero ser um Joba!</h3>
              <p className="text-gray-600 mb-6 text-pretty">
                Sou um prestador de serviços e quero oferecer as minhas competências. Quero construir a minha reputação
                e aumentar os meus rendimentos.
              </p>
              <ul className="text-sm text-gray-600 mb-8 space-y-2 text-left">
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-joba-blue mr-2 flex-shrink-0" />
                  Cria o teu perfil profissional
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-joba-blue mr-2 flex-shrink-0" />
                  Recebe pagamentos via M-Pesa/eMola
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-joba-blue mr-2 flex-shrink-0" />
                  Constrói a tua reputação
                </li>
              </ul>
              <Link href="/registo/joba" className="block">
                <JobaButton size="lg" className="w-full">
                  Registar como Joba
                </JobaButton>
              </Link>
            </CardContent>
          </Card>

          {/* Link Registration Card */}
          <Card className="card-shadow border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full link-orange mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Preciso de um Link!</h3>
              <p className="text-gray-600 mb-6 text-pretty">
                Preciso de contratar serviços qualificados. Quero encontrar profissionais confiáveis com pagamento
                seguro.
              </p>
              <ul className="text-sm text-gray-600 mb-8 space-y-2 text-left">
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-link-orange mr-2 flex-shrink-0" />
                  Encontra profissionais qualificados
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-link-orange mr-2 flex-shrink-0" />
                  Pagamento protegido por custódia
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-link-orange mr-2 flex-shrink-0" />
                  Avalia e recomenda serviços
                </li>
              </ul>
              <Link href="/registo/link" className="block">
                <LinkButton size="lg" className="w-full">
                  Registar como Link
                </LinkButton>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Já tens uma conta?{" "}
            <Link href="/login" className="text-white hover:text-joba-blue transition-colors">
              Faz login aqui
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
