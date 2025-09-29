import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, Users, CreditCard } from "lucide-react"

export function ComoFunciona() {
  const steps = [
    {
      icon: UserPlus,
      title: "1. Cria o teu Perfil",
      description: "Regista-te como Joba (prestador) ou Link (cliente). Define as tuas competências ou necessidades.",
      color: "text-joba-blue",
    },
    {
      icon: Users,
      title: "2. Conecta e Negocia",
      description:
        "Jobas encontram projetos ideais. Links recebem propostas qualificadas. Chat integrado para negociação.",
      color: "text-link-orange",
    },
    {
      icon: CreditCard,
      title: "3. Pagamento Seguro",
      description: "Sistema de custódia com M-Pesa/eMola. O pagamento fica protegido até a conclusão do serviço.",
      color: "text-green-600",
    },
  ]

  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl text-balance">Como Funciona a JobaLink</h2>
          <p className="mt-4 text-lg text-gray-600 text-pretty max-w-2xl mx-auto">
            Três passos simples para conectar talentos e oportunidades em Moçambique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="card-shadow border-0 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 text-pretty">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
