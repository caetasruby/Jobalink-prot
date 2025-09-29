import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare } from "lucide-react"

interface LinkPendingEvaluationsProps {
  projects: any[]
}

export function LinkPendingEvaluations({ projects }: LinkPendingEvaluationsProps) {
  const completedProjects = projects.filter((p) => p.status === "concluido")
  const pendingEvaluations = completedProjects.slice(0, 2) // Mock: first 2 need evaluation

  if (pendingEvaluations.length === 0) {
    return null
  }

  return (
    <Card className="card-shadow border-l-4 border-l-yellow-500">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="text-yellow-700">Avaliações Pendentes</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Ajuda outros Links avaliando os Jobas que trabalharam contigo recentemente.
          </p>

          {pendingEvaluations.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{project.titulo}</h4>
                <p className="text-sm text-gray-600">Joba: {project.jobaNome}</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  Concluído há 2 dias
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Comentar
                </Button>
                <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  <Star className="w-4 h-4 mr-1" />
                  Avaliar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
