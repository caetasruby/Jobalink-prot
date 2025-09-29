import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { JobaButton } from "@/components/ui/button-variants"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Download, MapPin, Phone, Star } from "lucide-react"

interface JobaProfileSectionProps {
  jobaData: any
  expanded?: boolean
}

export function JobaProfileSection({ jobaData, expanded = false }: JobaProfileSectionProps) {
  const profileCompleteness = jobaData.perfilCompleto ? 100 : 80

  return (
    <div className="space-y-6">
      {/* Profile Overview Card */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-joba-blue">Meu Perfil</span>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-start space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={jobaData.fotoPerfil || "/placeholder.svg"} alt={jobaData.nomeCompleto} />
              <AvatarFallback className="joba-blue text-white text-lg">
                {jobaData.nomeCompleto
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{jobaData.nomeCompleto}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {jobaData.localizacao.cidade}, {jobaData.localizacao.bairro}
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {jobaData.contactoMovel}
                </div>
              </div>
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                <span className="text-sm font-medium">{jobaData.avaliacaoMedia}</span>
                <span className="text-sm text-gray-500 ml-1">({jobaData.totalTrabalhos} trabalhos)</span>
              </div>
            </div>
          </div>

          {/* Profile Completeness */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Preenchimento do Perfil</span>
              <span className="text-sm text-gray-600">{profileCompleteness}%</span>
            </div>
            <Progress value={profileCompleteness} className="h-2" />
            {profileCompleteness < 100 && (
              <p className="text-xs text-gray-500">Complete o perfil para melhorar a visibilidade</p>
            )}
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Competências</h4>
            <div className="flex flex-wrap gap-2">
              {jobaData.competencias.map((competencia: string) => (
                <Badge key={competencia} variant="secondary" className="bg-blue-50 text-joba-blue">
                  {competencia}
                </Badge>
              ))}
            </div>
          </div>

          {/* Hourly Rate */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Tarifa Horária</span>
            <span className="text-lg font-semibold text-joba-blue">{jobaData.tarifaHoraria} MZN/hora</span>
          </div>

          {expanded && (
            <>
              {/* Biography */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Biografia Profissional</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{jobaData.biografiaProfissional}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* CV Generation Card */}
      {jobaData.perfilCompleto && (
        <Card className="card-shadow border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">CV Profissional</h4>
                <p className="text-sm text-gray-600 mt-1">Gera o teu CV com base no perfil JobaLink</p>
              </div>
              <JobaButton size="sm">
                <Download className="w-4 h-4 mr-2" />
                Imprimir CV
              </JobaButton>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="text-gray-900">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Edit className="w-4 h-4 mr-2" />
            Atualizar Competências
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Star className="w-4 h-4 mr-2" />
            Ver Avaliações
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Phone className="w-4 h-4 mr-2" />
            Atualizar Contacto
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
