"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LinkButton } from "@/components/ui/button-variants"
import { PaymentService } from "@/lib/payment-service"
import { Shield, CreditCard, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import type { OperadoraMobile } from "@/lib/types"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    id: string
    titulo: string
    orcamento: number
    jobaNome: string
  }
  linkId: string
}

export function PaymentModal({ isOpen, onClose, project, linkId }: PaymentModalProps) {
  const [step, setStep] = useState<"payment" | "processing" | "success" | "error">("payment")
  const [formData, setFormData] = useState({
    operadora: "" as OperadoraMobile | "",
    contactoMovel: "",
    confirmarContacto: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setStep("processing")

    // Validation
    if (!formData.operadora) {
      setError("Seleciona a operadora")
      setStep("payment")
      setLoading(false)
      return
    }

    if (formData.contactoMovel !== formData.confirmarContacto) {
      setError("Os números de contacto não coincidem")
      setStep("payment")
      setLoading(false)
      return
    }

    if (!PaymentService.validateMobileNumber(formData.contactoMovel, formData.operadora)) {
      setError("Número de contacto inválido para a operadora selecionada")
      setStep("payment")
      setLoading(false)
      return
    }

    try {
      const paymentResult = await PaymentService.simulateDeposit({
        projectId: project.id,
        linkId,
        valor: project.orcamento,
        operadora: formData.operadora,
        contactoMovel: formData.contactoMovel,
      })

      setResult(paymentResult)
      setStep("success")
    } catch (error: any) {
      setError(error.message)
      setStep("error")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStep("payment")
    setFormData({ operadora: "", contactoMovel: "", confirmarContacto: "" })
    setError("")
    setResult(null)
    onClose()
  }

  const paymentMethodInfo = formData.operadora ? PaymentService.getPaymentMethodInfo(formData.operadora) : null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span>Pagamento Seguro</span>
          </DialogTitle>
        </DialogHeader>

        {step === "payment" && (
          <div className="space-y-6">
            {/* Project Info */}
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium text-gray-900">{project.titulo}</h3>
                <p className="text-sm text-gray-600">Joba: {project.jobaNome}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">Valor:</span>
                  <span className="text-lg font-bold text-link-orange">
                    {project.orcamento.toLocaleString("pt-MZ")} MZN
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="operadora">Operadora de Pagamento *</Label>
                <Select onValueChange={(value: OperadoraMobile) => setFormData({ ...formData, operadora: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleciona a operadora" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vodacom">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                        <span>Vodacom (M-Pesa)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="movitel">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                        <span>Movitel (eMola)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentMethodInfo && (
                <Alert>
                  <CreditCard className="h-4 w-4" />
                  <AlertDescription>
                    <strong>{paymentMethodInfo.name}:</strong> {paymentMethodInfo.instructions}
                    <br />
                    <span className="text-xs">
                      Números válidos: {paymentMethodInfo.prefixes.join(", ")} + 7 dígitos
                    </span>
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="contactoMovel">Número de Contacto *</Label>
                <Input
                  id="contactoMovel"
                  value={formData.contactoMovel}
                  onChange={(e) => setFormData({ ...formData, contactoMovel: e.target.value })}
                  placeholder="84 123 4567"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmarContacto">Confirmar Número *</Label>
                <Input
                  id="confirmarContacto"
                  value={formData.confirmarContacto}
                  onChange={(e) => setFormData({ ...formData, confirmarContacto: e.target.value })}
                  placeholder="84 123 4567"
                  required
                />
              </div>

              {/* Escrow Info */}
              <Alert className="border-green-200 bg-green-50">
                <Shield className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Sistema de Custódia:</strong> O teu pagamento ficará protegido até confirmares que o serviço
                  foi concluído com sucesso.
                </AlertDescription>
              </Alert>

              <div className="flex space-x-3">
                <Button type="button" variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                  Cancelar
                </Button>
                <LinkButton type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Processando..." : `Pagar ${project.orcamento.toLocaleString("pt-MZ")} MZN`}
                </LinkButton>
              </div>
            </form>
          </div>
        )}

        {step === "processing" && (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 mx-auto mb-4 text-link-orange animate-spin" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Processando Pagamento</h3>
            <p className="text-gray-600">
              A processar o pagamento via {paymentMethodInfo?.name}. Aguarda um momento...
            </p>
          </div>
        )}

        {step === "success" && result && (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pagamento Realizado!</h3>
            <p className="text-gray-600 mb-4">{result.message}</p>

            <Card className="bg-green-50 mb-4">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ID da Transação:</span>
                    <Badge variant="outline">{result.transactionId}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge className="bg-green-100 text-green-800">Em Custódia</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert className="text-left mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                O pagamento está agora em custódia. Será liberado para o Joba apenas após confirmares que o serviço foi
                concluído.
              </AlertDescription>
            </Alert>

            <Button onClick={handleClose} className="w-full link-orange">
              Continuar
            </Button>
          </div>
        )}

        {step === "error" && (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Erro no Pagamento</h3>
            <p className="text-gray-600 mb-4">{error}</p>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button onClick={() => setStep("payment")} className="flex-1 link-orange">
                Tentar Novamente
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
