"use client"

import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, Settings, LogOut, User, Calendar, Briefcase, BarChart3 } from "lucide-react"
import Link from "next/link"

interface JobaDashboardHeaderProps {
  jobaData: any
  activeSection: string
  setActiveSection: (section: "overview" | "projects" | "calendar" | "profile") => void
}

export function JobaDashboardHeader({ jobaData, activeSection, setActiveSection }: JobaDashboardHeaderProps) {
  const navItems = [
    { id: "overview", label: "Visão Geral", icon: BarChart3 },
    { id: "projects", label: "Projetos", icon: Briefcase },
    { id: "calendar", label: "Agenda", icon: Calendar },
    { id: "profile", label: "Perfil", icon: User },
  ]

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
                      ? "text-joba-blue bg-blue-50"
                      : "text-gray-600 hover:text-joba-blue hover:bg-gray-50"
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
                    <AvatarImage src={jobaData.fotoPerfil || "/placeholder.svg"} alt={jobaData.nomeCompleto} />
                    <AvatarFallback className="joba-blue text-white text-xs">
                      {jobaData.nomeCompleto
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block text-sm font-medium">{jobaData.nomeCompleto}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setActiveSection("profile")}>
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
