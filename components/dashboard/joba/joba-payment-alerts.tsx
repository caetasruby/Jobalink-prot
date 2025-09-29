import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, DollarSign, Clock } from "lucide-react"

interface JobaPaymentAlertsProps {
  projects: any[]
}

export function JobaPaymentAlerts({ projects }: JobaPaymentAlertsProps) {
  const pendingPayments = projects.filter((p) => p.status === "aguardando_confirmacao_link")
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.valor, 0)

  if (pendingPayments.length === 0) {
    return null
  }

  return (
    <div className="mb-6">
      <Alert className="border-orange-200 bg-orange-50">
        <AlertCircle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <strong>Pagamentos Pendentes:</strong> Tens {totalPending.toLocaleString("pt-MZ")} MZN em custódia
              aguardando confirmação de {pendingPayments.length} cliente(s).
            </div>
            <Button variant="outline" size="sm" className="ml-4 bg-transparent">
              Ver Detalhes
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      {/* Individual Payment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {pendingPayments.map((project) => (
          <Card key={project.id} className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{project.titulo}</h4>
                  <p className="text-sm text-gray-600">{project.linkNome}</p>
                  <div className="flex items-center mt-2 text-orange-600">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className="font-semibold">{project.valor.toLocaleString("pt-MZ")} MZN</span>
                  </div>
                </div>
                <div className="flex items-center text-orange-500">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Aguardando confirmação do cliente para liberação do pagamento
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
