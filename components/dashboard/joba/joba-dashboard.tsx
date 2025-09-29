"use client"

import { useState } from "react"
import { JobaDashboardHeader } from "./joba-dashboard-header"
import { JobaStatsCards } from "./joba-stats-cards"
import { JobaProfileSection } from "./joba-profile-section"
import { JobaProjectsTable } from "./joba-projects-table"
import { JobaCalendar } from "./joba-calendar"
import { JobaPaymentAlerts } from "./joba-payment-alerts"

// Mock data - in production this would come from Firestore
const mockJobaData = {
  id: "demo-joba-id",
  nomeCompleto: "João Silva",
  email: "joao@email.com",
  fotoPerfil: "/placeholder.svg?height=100&width=100&text=JS",
  competencias: ["Programação", "Design Gráfico", "Consultoria"],
  tarifaHoraria: 750,
  biografiaProfissional:
    "Desenvolvedor full-stack com 5 anos de experiência em React, Node.js e design UI/UX. Especializado em criar soluções digitais inovadoras para pequenas e médias empresas.",
  avaliacaoMedia: 4.8,
  totalTrabalhos: 23,
  faturamentoTotal: 45600,
  perfilCompleto: true,
  localizacao: { cidade: "Maputo", bairro: "Polana" },
  contactoMovel: "84 123 4567",
  operadora: "vodacom" as const,
}

const mockProjects = [
  {
    id: "1",
    titulo: "Website para Restaurante",
    linkNome: "Maria Santos",
    linkTipo: "individual",
    valor: 15000,
    status: "em_execucao" as const,
    dataInicio: new Date("2024-01-15"),
    prazo: new Date("2024-02-15"),
  },
  {
    id: "2",
    titulo: "Logo e Identidade Visual",
    linkNome: "TechStart Lda",
    linkTipo: "empresa",
    valor: 8500,
    status: "aguardando_confirmacao_link" as const,
    dataInicio: new Date("2024-01-10"),
    prazo: new Date("2024-01-25"),
  },
  {
    id: "3",
    titulo: "Consultoria em Marketing Digital",
    linkNome: "João Pereira",
    linkTipo: "individual",
    valor: 12000,
    status: "concluido" as const,
    dataInicio: new Date("2023-12-01"),
    prazo: new Date("2023-12-20"),
  },
]

export function JobaDashboard() {
  const [activeSection, setActiveSection] = useState<"overview" | "projects" | "calendar" | "profile">("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      <JobaDashboardHeader jobaData={mockJobaData} activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Payment Alerts - Always visible when there are pending payments */}
        <JobaPaymentAlerts projects={mockProjects} />

        {activeSection === "overview" && (
          <div className="space-y-8">
            <JobaStatsCards jobaData={mockJobaData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <JobaProfileSection jobaData={mockJobaData} />
              <div className="space-y-6">
                <JobaProjectsTable projects={mockProjects.slice(0, 3)} showAll={false} />
              </div>
            </div>
          </div>
        )}

        {activeSection === "projects" && <JobaProjectsTable projects={mockProjects} showAll={true} />}

        {activeSection === "calendar" && <JobaCalendar />}

        {activeSection === "profile" && <JobaProfileSection jobaData={mockJobaData} expanded={true} />}
      </main>
    </div>
  )
}
