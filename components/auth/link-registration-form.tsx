"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LinkButton } from "@/components/ui/button-variants"
import { auth, db } from "@/lib/firebase-config"
import type { AccountType } from "@/lib/types"

export function LinkRegistrationForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "" as AccountType | "",
    // Individual fields
    nomeCompleto: "",
    // Company fields
    nomeEmpresa: "",
    nif: "",
    nomeRepresentante: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      setLoading(false)
      return
    }

    if (!formData.accountType) {
      setError("Seleciona o tipo de conta")
      setLoading(false)
      return
    }

    if (formData.accountType === "individual" && !formData.nomeCompleto) {
      setError("Nome completo é obrigatório para conta individual")
      setLoading(false)
      return
    }

    if (formData.accountType === "empresa" && (!formData.nomeEmpresa || !formData.nomeRepresentante)) {
      setError("Nome da empresa e representante são obrigatórios")
      setLoading(false)
      return
    }

    try {
      console.log("[v0] Creating Link account:", formData.email)

      // Create user account
      const userCredential = await auth.createUserWithEmailAndPassword(formData.email, formData.password)

      // Save Link profile to Firestore
      const profileData = {
        role: "link",
        email: formData.email,
        accountType: formData.accountType,
        empresaVerificada: formData.accountType === "empresa" && !!formData.nif,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      if (formData.accountType === "individual") {
        Object.assign(profileData, {
          nomeCompleto: formData.nomeCompleto,
        })
      } else {
        Object.assign(profileData, {
          nomeEmpresa: formData.nomeEmpresa,
          nif: formData.nif,
          nomeRepresentante: formData.nomeRepresentante,
        })
      }

      await db.collection("users").doc(userCredential.user.uid).set(profileData)

      console.log("[v0] Link profile created, redirecting to dashboard")
      router.push("/dashboard/link")
    } catch (error) {
      console.error("[v0] Registration error:", error)
      setError("Erro ao criar conta. Tenta novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="text-center text-link-orange">Dados da Conta</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="teu@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-4">
            <Label>Tipo de Conta *</Label>
            <RadioGroup
              value={formData.accountType}
              onValueChange={(value: AccountType) => setFormData({ ...formData, accountType: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual">Individual - Pessoa física</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="empresa" id="empresa" />
                <Label htmlFor="empresa">Empresa - Pessoa jurídica</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Individual Fields */}
          {formData.accountType === "individual" && (
            <div className="space-y-2">
              <Label htmlFor="nomeCompleto">Nome Completo *</Label>
              <Input
                id="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
                required
                placeholder="João Silva"
              />
            </div>
          )}

          {/* Company Fields */}
          {formData.accountType === "empresa" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nomeEmpresa">Nome da Empresa *</Label>
                <Input
                  id="nomeEmpresa"
                  value={formData.nomeEmpresa}
                  onChange={(e) => setFormData({ ...formData, nomeEmpresa: e.target.value })}
                  required
                  placeholder="Empresa Lda"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nif">NIF/Número de Identificação Fiscal</Label>
                <Input
                  id="nif"
                  value={formData.nif}
                  onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                  placeholder="123456789 (opcional)"
                />
                <p className="text-xs text-gray-500">Opcional: Incluir o NIF dará um badge de "Empresa Verificada"</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomeRepresentante">Nome do Representante *</Label>
                <Input
                  id="nomeRepresentante"
                  value={formData.nomeRepresentante}
                  onChange={(e) => setFormData({ ...formData, nomeRepresentante: e.target.value })}
                  required
                  placeholder="Maria Santos"
                />
              </div>
            </div>
          )}

          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Transparência:</strong> Os Jobas verão claramente se estão a trabalhar com um cliente individual
              ou uma empresa verificada para maior segurança.
            </p>
          </div>

          <LinkButton type="submit" className="w-full" disabled={loading}>
            {loading ? "Criando conta..." : "Criar Conta Link"}
          </LinkButton>
        </form>
      </CardContent>
    </Card>
  )
}
