"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { JobaButton } from "@/components/ui/button-variants"
import { Upload } from "lucide-react"
import { db } from "@/lib/firebase-config"

const competenciasDisponiveis = [
  "Programação",
  "Design Gráfico",
  "Marketing Digital",
  "Contabilidade",
  "Tradução",
  "Fotografia",
  "Vídeo",
  "Consultoria",
  "Ensino",
  "Manutenção",
  "Construção",
  "Jardinagem",
  "Limpeza",
  "Culinária",
  "Música",
  "Fitness",
  "Beleza",
  "Costura",
]

export function JobaProfileCompletion() {
  const [formData, setFormData] = useState({
    fotoPerfil: null as File | null,
    competencias: [] as string[],
    tarifaHoraria: "",
    biografiaProfissional: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("A foto deve ter menos de 5MB")
        return
      }
      setFormData({ ...formData, fotoPerfil: file })
      setError("")
    }
  }

  const toggleCompetencia = (competencia: string) => {
    const current = formData.competencias
    if (current.includes(competencia)) {
      setFormData({
        ...formData,
        competencias: current.filter((c) => c !== competencia),
      })
    } else {
      setFormData({
        ...formData,
        competencias: [...current, competencia],
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validation
    if (!formData.fotoPerfil) {
      setError("Foto de perfil é obrigatória")
      setLoading(false)
      return
    }

    if (formData.competencias.length === 0) {
      setError("Seleciona pelo menos uma competência")
      setLoading(false)
      return
    }

    if (!formData.tarifaHoraria || Number.parseFloat(formData.tarifaHoraria) <= 0) {
      setError("Tarifa horária deve ser maior que zero")
      setLoading(false)
      return
    }

    if (!formData.biografiaProfissional.trim()) {
      setError("Biografia profissional é obrigatória")
      setLoading(false)
      return
    }

    try {
      console.log("[v0] Completing Joba profile with:", {
        competencias: formData.competencias,
        tarifaHoraria: formData.tarifaHoraria,
        biografiaLength: formData.biografiaProfissional.length,
      })

      // In production, upload photo to Firebase Storage
      const fotoPerfilUrl = "/professional-profile.png"

      // Update user profile in Firestore
      await db
        .collection("users")
        .doc("demo-user-id")
        .update({
          fotoPerfil: fotoPerfilUrl,
          competencias: formData.competencias,
          tarifaHoraria: Number.parseFloat(formData.tarifaHoraria),
          biografiaProfissional: formData.biografiaProfissional,
          perfilCompleto: true,
          updatedAt: new Date(),
        })

      console.log("[v0] Profile completed, redirecting to dashboard")
      router.push("/dashboard/joba")
    } catch (error) {
      console.error("[v0] Profile completion error:", error)
      setError("Erro ao completar perfil. Tenta novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="text-center text-joba-blue">Informações Profissionais</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Photo Upload */}
          <div className="space-y-4">
            <Label>1. Foto de Perfil *</Label>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {formData.fotoPerfil ? (
                  <img
                    src={URL.createObjectURL(formData.fotoPerfil) || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="foto-upload" />
                <Label htmlFor="foto-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" asChild>
                    <span>Escolher Foto</span>
                  </Button>
                </Label>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG até 5MB</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <Label>2. Competências * (Seleciona as tuas áreas)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {competenciasDisponiveis.map((competencia) => (
                <Badge
                  key={competencia}
                  variant={formData.competencias.includes(competencia) ? "default" : "outline"}
                  className={`cursor-pointer text-center justify-center py-2 ${
                    formData.competencias.includes(competencia) ? "joba-blue" : "hover:bg-blue-50"
                  }`}
                  onClick={() => toggleCompetencia(competencia)}
                >
                  {competencia}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600">Selecionadas: {formData.competencias.length} competência(s)</p>
          </div>

          {/* Hourly Rate */}
          <div className="space-y-2">
            <Label htmlFor="tarifaHoraria">3. Tarifa Horária Base (MZN/hora) *</Label>
            <Input
              id="tarifaHoraria"
              type="number"
              min="1"
              step="0.01"
              value={formData.tarifaHoraria}
              onChange={(e) => setFormData({ ...formData, tarifaHoraria: e.target.value })}
              required
              placeholder="500.00"
            />
            <p className="text-xs text-gray-500">
              Esta é a tua tarifa base. Podes negociar preços específicos para cada projeto.
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="biografia">4. Biografia Profissional *</Label>
            <Textarea
              id="biografia"
              value={formData.biografiaProfissional}
              onChange={(e) => setFormData({ ...formData, biografiaProfissional: e.target.value })}
              required
              placeholder="Descreve a tua experiência, formação e o que te diferencia dos outros profissionais..."
              rows={6}
            />
            <p className="text-xs text-gray-500">{formData.biografiaProfissional.length}/500 caracteres recomendados</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Próximo passo:</strong> Após completar o perfil, terás acesso ao dashboard onde podes gerir
              projetos, ver estatísticas e gerar o teu CV profissional.
            </p>
          </div>

          <JobaButton type="submit" className="w-full" disabled={loading}>
            {loading ? "Completando perfil..." : "Completar Perfil e Entrar"}
          </JobaButton>
        </form>
      </CardContent>
    </Card>
  )
}
