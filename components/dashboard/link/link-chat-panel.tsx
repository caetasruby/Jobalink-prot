import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Star, Send } from "lucide-react"

interface LinkChatPanelProps {
  expanded?: boolean
}

const mockChats = [
  {
    id: "1",
    jobaNome: "João Silva",
    jobaAvaliacao: 4.8,
    projeto: "Website para Restaurante",
    ultimaMensagem: "Enviei a primeira versão do design. Podes dar uma olhada?",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    naoLidas: 2,
    online: true,
  },
  {
    id: "2",
    jobaNome: "Ana Costa",
    jobaAvaliacao: 4.9,
    projeto: "Consultoria Marketing",
    ultimaMensagem: "Relatório mensal pronto. Quando podemos agendar a reunião?",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    naoLidas: 0,
    online: false,
  },
  {
    id: "3",
    jobaNome: "Pedro Santos",
    jobaAvaliacao: 4.7,
    projeto: "Logo e Identidade",
    ultimaMensagem: "Obrigado pelo feedback! Vou fazer as alterações solicitadas.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    naoLidas: 0,
    online: true,
  },
]

export function LinkChatPanel({ expanded = false }: LinkChatPanelProps) {
  const displayChats = expanded ? mockChats : mockChats.slice(0, 3)

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Agora"
    if (diffInHours < 24) return `${diffInHours}h`
    return `${Math.floor(diffInHours / 24)}d`
  }

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-link-orange" />
            <span className="text-link-orange">Conversas com Jobas</span>
          </div>
          {!expanded && mockChats.length > 3 && (
            <Button variant="outline" size="sm">
              Ver Todas
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayChats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={`/placeholder-40x40.png?height=40&width=40&text=${chat.jobaNome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}`}
                  />
                  <AvatarFallback className="bg-gray-200 text-gray-700 text-sm">
                    {chat.jobaNome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 truncate">{chat.jobaNome}</h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                      {chat.jobaAvaliacao}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{formatTimestamp(chat.timestamp)}</span>
                    {chat.naoLidas > 0 && (
                      <Badge className="bg-link-orange text-white text-xs px-2 py-1">{chat.naoLidas}</Badge>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-1">{chat.projeto}</p>
                <p className="text-sm text-gray-700 truncate">{chat.ultimaMensagem}</p>
              </div>
            </div>
          ))}

          {expanded && (
            <div className="border-t pt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Escreve uma mensagem..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-link-orange focus:border-transparent"
                />
                <Button size="sm" className="link-orange">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {displayChats.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">Nenhuma conversa ativa</p>
            <p className="text-sm text-gray-400 mt-1">As conversas com Jobas aparecerão aqui</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
