"use client"

import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, Settings, LogOut, CreditCard, MessageSquare, Briefcase, BarChart3, Building2 } from "lucide-react"
import Link from "next/link"

interface LinkDashboardHeaderProps {
  linkData: any
  activeSection: string
  setActiveSection: (section: "overview" | "projects" | "payments" | "chat") => void
}

export function LinkDashboardHeader({ linkData, activeSection, setActiveSection }: LinkDashboardHeaderProps) {
  const navItems = [
    { id: "overview", label: "Visão Geral", icon: BarChart3 },
    { id: "projects", label: "Projetos", icon: Briefcase },
    { id: "payments", label: "Pagamentos", icon: CreditCard },
    { id: "chat", label: "Conversas", icon: MessageSquare },
  ]

  const displayName = linkData.accountType === "empresa" ? linkData.nomeEmpresa : linkData.nomeCompleto || "Cliente"

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <Logo size="md" />
            </Link>

            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-link-orange bg-orange-50"
                      : "text-gray-600 hover:text-link-orange hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="link-orange text-white text-xs">
                      {linkData.accountType === "empresa"
                        ? linkData.nomeEmpresa?.substring(0, 2).toUpperCase()
                        : linkData.nomeCompleto
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("") || "CL"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium flex items-center space-x-2">
                      <span>{displayName}</span>
                      {linkData.accountType === "empresa" && linkData.empresaVerificada && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          <Building2 className="w-3 h-3 mr-1" />
                          Verificada
                        </Badge>
                      )}
                    </div>
                    {linkData.accountType === "empresa" && (
                      <div className="text-xs text-gray-500">{linkData.nomeRepresentante}</div>
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
