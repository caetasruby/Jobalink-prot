"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { JobaButton } from "@/components/ui/button-variants"
import { auth, db } from "@/lib/firebase-config"
import type { OperadoraMobile } from "@/lib/types"

export function JobaRegistrationForm() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactoMovel: "",
    operadora: "" as OperadoraMobile | "",
    cidade: "",
    bairro: "",
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

    if (!formData.operadora) {
      setError("Seleciona a operadora móvel")
      setLoading(false)
      return
    }

    try {
      console.log("[v0] Creating Joba account:", formData.email)

      // Create user account
      const userCredential = await auth.createUserWithEmailAndPassword(formData.email, formData.password)

      // Save Joba profile to Firestore
      await db
        .collection("users")
        .doc(userCredential.user.uid)
        .set({
          role: "joba",
          nomeCompleto: formData.nomeCompleto,
          email: formData.email,
          contactoMovel: formData.contactoMovel,
          operadora: formData.operadora,
          localizacao: {
            cidade: formData.cidade,
            bairro: formData.bairro,
          },
          perfilCompleto: false, // Will be completed in next step
          avaliacaoMedia: 0,
          totalTrabalhos: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        })

      console.log("[v0] Joba profile created, redirecting to profile completion")
      router.push("/registo/joba/completar-perfil")
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
        <CardTitle className="text-center text-joba-blue">Dados Pessoais</CardTitle>
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
              <Label htmlFor="nomeCompleto">Nome Completo *</Label>
              <Input
                id="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
                required
                placeholder="João Silva"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="joao@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactoMovel">Contacto Móvel (M-Pesa/eMola) *</Label>
              <Input
                id="contactoMovel"
                value={formData.contactoMovel}
                onChange={(e) => setFormData({ ...formData, contactoMovel: e.target.value })}
                required
                placeholder="84 123 4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="operadora">Operadora *</Label>
              <Select onValueChange={(value: OperadoraMobile) => setFormData({ ...formData, operadora: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleciona a operadora" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vodacom">Vodacom</SelectItem>
                  <SelectItem value="movitel">Movitel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade *</Label>
              <Input
                id="cidade"
                value={formData.cidade}
                onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                required
                placeholder="Maputo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bairro">Bairro *</Label>
              <Input
                id="bairro"
                value={formData.bairro}
                onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                required
                placeholder="Polana"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Importante:</strong> O contacto móvel será usado para receber pagamentos via M-Pesa/eMola.
              Certifica-te de que o número está correto e ativo.
            </p>
          </div>

          <JobaButton type="submit" className="w-full" disabled={loading}>
            {loading ? "Criando conta..." : "Criar Conta Joba"}
          </JobaButton>
        </form>
      </CardContent>
    </Card>
  )
}
