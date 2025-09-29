import { Card, CardContent } from "@/components/ui/card"
import { Star, Calendar, FileText, Search, MessageSquare, Shield } from "lucide-react"

export function FuncoesDetalhadas() {
  const jobaFeatures = [
    {
      icon: Star,
      title: "Sistema de Reputação",
      description:
        "Constrói a tua reputação com avaliações de 5 estrelas. Clientes veem o teu histórico e qualidade de trabalho.",
    },
    {
      icon: Calendar,
      title: "Gestão de Agenda",
      description: "Calendário integrado para gerir disponibilidade. Define horários livres e ocupados facilmente.",
    },
    {
      icon: FileText,
      title: "CV Automático",
      description:
        "Gera automaticamente o teu CV profissional com base no perfil e histórico de trabalhos na plataforma.",
    },
  ]

  const linkFeatures = [
    {
      icon: Search,
      title: "Busca Inteligente",
      description: "Encontra o Joba ideal por categoria, localização, avaliação e disponibilidade. Filtros avançados.",
    },
    {
      icon: MessageSquare,
      title: "Chat Integrado",
      description: "Comunica diretamente com Jobas. Negocia preços, prazos e detalhes do projeto em tempo real.",
    },
    {
      icon: Shield,
      title: "Pagamento Protegido",
      description:
        "Sistema de custódia garante que o pagamento só é liberado após confirmação da conclusão do serviço.",
    },
  ]

  return (
    <section id="funcoes-detalhadas" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl text-balance">Funcionalidades Detalhadas</h2>
          <p className="mt-4 text-lg text-gray-600 text-pretty max-w-2xl mx-auto">
            Ferramentas específicas para cada tipo de utilizador
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Joba Features */}
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full joba-blue mb-4">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <h3 className="text-2xl font-bold text-joba-blue">Para Jobas (Prestadores)</h3>
              <p className="text-gray-600 mt-2">Ferramentas para gerir a tua carreira</p>
            </div>

            <div className="space-y-6">
              {jobaFeatures.map((feature, index) => (
                <Card key={index} className="border-l-4 border-l-joba-blue">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-joba-blue" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                        <p className="text-gray-600 text-sm text-pretty">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Link Features */}
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full link-orange mb-4">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <h3 className="text-2xl font-bold text-link-orange">Para Links (Clientes)</h3>
              <p className="text-gray-600 mt-2">Encontra e contrata com segurança</p>
            </div>

            <div className="space-y-6">
              {linkFeatures.map((feature, index) => (
                <Card key={index} className="border-l-4 border-l-link-orange">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-link-orange" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                        <p className="text-gray-600 text-sm text-pretty">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
