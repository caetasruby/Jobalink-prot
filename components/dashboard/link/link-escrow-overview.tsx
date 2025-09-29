import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DollarSign, Clock, CheckCircle, AlertCircle, Eye } from "lucide-react"

interface EscrowPayment {
  id: string
  titulo: string
  jobaNome: string
  orcamento: number
  status: string
  custodiaStatus: string
}

interface LinkEscrowOverviewProps {
  payments: EscrowPayment[]
  expanded?: boolean
}

export function LinkEscrowOverview({ payments, expanded = false }: LinkEscrowOverviewProps) {
  const totalInEscrow = payments.reduce((sum, payment) => sum + payment.orcamento, 0)
  const pendingConfirmation = payments.filter((p) => p.status === "aguardando_confirmacao_link")

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="card-shadow border-l-4 border-l-link-orange">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-link-orange" />
              <span className="text-link-orange">Pagamentos em Custódia</span>
            </div>
            {!expanded && (
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total em Custódia:</span>
              <span className="text-2xl font-bold text-link-orange">{totalInEscrow.toLocaleString("pt-MZ")} MZN</span>
            </div>

            {pendingConfirmation.length > 0 && (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  <strong>{pendingConfirmation.length} projeto(s)</strong> aguardam a tua confirmação para liberação do
                  pagamento ao Joba.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-800">{payments.length}</div>
                <div className="text-blue-600">Projetos Ativos</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-800">{pendingConfirmation.length}</div>
                <div className="text-green-600">Aguardam Confirmação</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Payment Cards */}
      {(expanded || payments.length <= 3) && (
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id} className="border-l-4 border-l-gray-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{payment.titulo}</h4>
                    <p className="text-sm text-gray-600">Joba: {payment.jobaNome}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-link-orange">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span className="font-semibold">{payment.orcamento.toLocaleString("pt-MZ")} MZN</span>
                      </div>
                      <Badge
                        className={
                          payment.status === "aguardando_confirmacao_link"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {payment.status === "aguardando_confirmacao_link" ? (
                          <>
                            <Clock className="w-3 h-3 mr-1" />
                            Aguarda Confirmação
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Em Execução
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {payment.status === "aguardando_confirmacao_link" && (
                      <Button size="sm" className="link-orange">
                        Confirmar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!expanded && payments.length === 0 && (
        <Card className="card-shadow">
          <CardContent className="p-8 text-center">
            <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">Nenhum pagamento em custódia</p>
            <p className="text-sm text-gray-400 mt-1">Os pagamentos dos teus projetos aparecerão aqui</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
