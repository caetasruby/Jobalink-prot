import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, MessageSquare, CheckCircle, Clock, AlertCircle, Users, Star } from "lucide-react"

interface Project {
  id: string
  titulo: string
  categoria: string
  orcamento: number
  status: "aguardando_propostas" | "em_execucao" | "aguardando_confirmacao_link" | "concluido"
  jobaId?: string
  jobaNome?: string
  jobaAvaliacao?: number
  dataPublicacao: Date
  prazo: Date
  propostas: number
}

interface LinkProjectsTableProps {
  projects: Project[]
  showAll?: boolean
}

const statusConfig = {
  aguardando_propostas: {
    label: "Aguardando Propostas",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  em_execucao: {
    label: "Em Execução",
    color: "bg-blue-100 text-blue-800",
    icon: AlertCircle,
  },
  aguardando_confirmacao_link: {
    label: "Aguarda Minha Confirmação",
    color: "bg-orange-100 text-orange-800",
    icon: Clock,
  },
  concluido: {
    label: "Concluído",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
}

export function LinkProjectsTable({ projects, showAll = false }: LinkProjectsTableProps) {
  const displayProjects = showAll ? projects : projects.slice(0, 3)

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-gray-900">{showAll ? "Todos os Projetos" : "Projetos Recentes"}</span>
          {!showAll && projects.length > 3 && (
            <Button variant="outline" size="sm">
              Ver Todos ({projects.length})
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projeto</TableHead>
                <TableHead>Joba/Propostas</TableHead>
                <TableHead>Orçamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayProjects.map((project) => {
                const statusInfo = statusConfig[project.status]
                const StatusIcon = statusInfo.icon

                return (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{project.titulo}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-2">
                          <span>{project.categoria}</span>
                          <span>•</span>
                          <span>Publicado em {project.dataPublicacao.toLocaleDateString("pt-PT")}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {project.jobaNome ? (
                        <div className="flex items-center space-x-2">
                          <div>
                            <div className="font-medium">{project.jobaNome}</div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                              {project.jobaAvaliacao}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          <span className="font-medium">{project.propostas}</span>
                          <span className="text-sm ml-1">propostas</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-link-orange">
                        {project.orcamento.toLocaleString("pt-MZ")} MZN
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusInfo.color} flex items-center space-x-1`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusInfo.label}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {project.prazo.toLocaleDateString("pt-PT")}
                        {project.prazo < new Date() && project.status !== "concluido" && (
                          <div className="text-red-600 text-xs">Atrasado</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {project.jobaNome && (
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        )}
                        {project.status === "aguardando_confirmacao_link" && (
                          <Button size="sm" className="link-orange">
                            Confirmar
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {displayProjects.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum projeto encontrado</p>
              <p className="text-sm mt-1">Publica o teu primeiro projeto para começar</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
