import { Card, CardContent } from "@/components/ui/card"
import { LinkButton } from "@/components/ui/button-variants"
import { Plus, Lightbulb, Users, Shield } from "lucide-react"

export function LinkPublishCTA() {
  return (
    <Card className="card-shadow border-l-4 border-l-link-orange mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tens um novo projeto em mente?</h2>
            <p className="text-gray-600 mb-4">
              Publica o teu projeto e recebe propostas de Jobas qualificados em minutos. Pagamento seguro com sistema de
              custódia.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-link-orange" />
                <span>Descreve o teu projeto</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-link-orange" />
                <span>Recebe propostas qualificadas</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-link-orange" />
                <span>Pagamento protegido</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <LinkButton size="lg" className="px-8 py-4 text-lg">
              <Plus className="w-5 h-5 mr-2" />
              Publicar Novo Projeto
            </LinkButton>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
