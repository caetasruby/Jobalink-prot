"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LinkButton } from "@/components/ui/button-variants"
import { PaymentService } from "@/lib/payment-service"
import { CheckCircle, AlertCircle, Loader2, DollarSign, Star } from "lucide-react"

interface ReleasePaymentModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    id: string
    titulo: string
    orcamento: number
    jobaNome: string
    jobaId: string
    jobaContactoMovel: string
    jobaOperadora: "vodacom" | "movitel"
  }
  linkId: string
}

export function ReleasePaymentModal({ isOpen, onClose, project, linkId }: ReleasePaymentModalProps) {
  const [step, setStep] = useState<"confirm" | "processing" | "success" | "error">("confirm")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<any>(null)

  const comissaoPercentual = 5
  const valorComissao = (project.orcamento * comissaoPercentual) / 100
  const valorFinal = project.orcamento - valorComissao

  const handleConfirm = async () => {
    setLoading(true)
    setError("")
    setStep("processing")

    try {
      const releaseResult = await PaymentService.simulateRelease({
        projectId: project.id,
        jobaId: project.jobaId,
        linkId,
        valor: project.orcamento,
        jobaContactoMovel: project.jobaContactoMovel,
        jobaOperadora: project.jobaOperadora,
        comissaoPercentual,
      })

      setResult(releaseResult)
      setStep("success")
    } catch (error: any) {
      setError(error.message)
      setStep("error")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStep("confirm")
    setError("")
    setResult(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span>Confirmar Conclusão</span>
          </DialogTitle>
        </DialogHeader>

        {step === "confirm" && (
          <div className="space-y-6">
            {/* Project Info */}
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium text-gray-900">{project.titulo}</h3>
                <p className="text-sm text-gray-600">Joba: {project.jobaNome}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">Valor em Custódia:</span>
                  <span className="text-lg font-bold text-link-orange">
                    {project.orcamento.toLocaleString("pt-MZ")} MZN
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Breakdown */}
            <Card className="border-green-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Resumo do Pagamento</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Valor do Projeto:</span>
                    <span>{project.orcamento.toLocaleString("pt-MZ")} MZN</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Comissão JobaLink ({comissaoPercentual}%):</span>
                    <span>-{valorComissao.toLocaleString("pt-MZ")} MZN</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold text-green-600">
                    <span>Valor para o Joba:</span>
                    <span>{valorFinal.toLocaleString("pt-MZ")} MZN</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Confirmation Alert */}
            <Alert className="border-orange-200 bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Confirma que o serviço foi concluído?</strong>
                <br />
                Esta ação irá liberar o pagamento para o Joba e não pode ser desfeita.
              </AlertDescription>
            </Alert>

            {/* Rating Prompt */}
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Avalia este Joba</span>
                </div>
                <p className="text-xs text-gray-600">
                  Após confirmar, poderás avaliar o trabalho do {project.jobaNome} para ajudar outros clientes.
                </p>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button type="button" variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <LinkButton onClick={handleConfirm} className="flex-1" disabled={loading}>
                Confirmar e Liberar
              </LinkButton>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 mx-auto mb-4 text-green-600 animate-spin" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Liberando Pagamento</h3>
            <p className="text-gray-600">
              A processar a liberação do pagamento para {project.jobaNome}. Aguarda um momento...
            </p>
          </div>
        )}

        {step === "success" && result && (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pagamento Liberado!</h3>
            <p className="text-gray-600 mb-4">{result.message}</p>

            <Card className="bg-green-50 mb-4">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ID da Transação:</span>
                    <Badge variant="outline">{result.transactionId}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor Liberado:</span>
                    <span className="font-semibold text-green-600">
                      {result.valorLiberado.toLocaleString("pt-MZ")} MZN
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comissão:</span>
                    <span className="text-gray-600">{result.comissao.toLocaleString("pt-MZ")} MZN</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert className="text-left mb-4">
              <Star className="h-4 w-4" />
              <AlertDescription>
                Projeto concluído! Não te esqueças de avaliar o trabalho do {project.jobaNome} para ajudar outros
                clientes.
              </AlertDescription>
            </Alert>

            <Button onClick={handleClose} className="w-full link-orange">
              Avaliar Joba
            </Button>
          </div>
        )}

        {step === "error" && (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Erro na Liberação</h3>
            <p className="text-gray-600 mb-4">{error}</p>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button onClick={() => setStep("confirm")} className="flex-1 link-orange">
                Tentar Novamente
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
