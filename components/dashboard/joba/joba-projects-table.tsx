import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, MessageSquare, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface Project {
  id: string
  titulo: string
  linkNome: string
  linkTipo: "individual" | "empresa"
  valor: number
  status: "proposta_enviada" | "em_execucao" | "aguardando_confirmacao_link" | "concluido"
  dataInicio: Date
  prazo: Date
}

interface JobaProjectsTableProps {
  projects: Project[]
  showAll?: boolean
}

const statusConfig = {
  proposta_enviada: {
    label: "Proposta Enviada",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  em_execucao: {
    label: "Em Execução",
    color: "bg-blue-100 text-blue-800",
    icon: AlertCircle,
  },
  aguardando_confirmacao_link: {
    label: "Aguarda Confirmação",
    color: "bg-orange-100 text-orange-800",
    icon: Clock,
  },
  concluido: {
    label: "Concluído",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
}

export function JobaProjectsTable({ projects, showAll = false }: JobaProjectsTableProps) {
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
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
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
                        <div className="text-sm text-gray-500">
                          Iniciado em {project.dataInicio.toLocaleDateString("pt-PT")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{project.linkNome}</span>
                        {project.linkTipo === "empresa" && (
                          <Badge variant="outline" className="text-xs">
                            Empresa
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-joba-blue">{project.valor.toLocaleString("pt-MZ")} MZN</span>
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
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
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
              <p className="text-sm mt-1">Os teus projetos aparecerão aqui quando começares a trabalhar</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
