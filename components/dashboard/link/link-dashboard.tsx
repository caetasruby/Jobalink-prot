"use client"

import { useState } from "react"
import { LinkDashboardHeader } from "./link-dashboard-header"
import { LinkPublishCTA } from "./link-publish-cta"
import { LinkEscrowOverview } from "./link-escrow-overview"
import { LinkProjectsTable } from "./link-projects-table"
import { LinkPendingEvaluations } from "./link-pending-evaluations"
import { LinkChatPanel } from "./link-chat-panel"

// Mock data - in production this would come from Firestore
const mockLinkData = {
  id: "demo-link-id",
  email: "maria@empresa.com",
  accountType: "empresa" as const,
  nomeEmpresa: "TechStart Lda",
  nif: "123456789",
  nomeRepresentante: "Maria Santos",
  empresaVerificada: true,
}

const mockProjects = [
  {
    id: "1",
    titulo: "Website para Restaurante",
    descricao: "Preciso de um website moderno para o meu restaurante com sistema de reservas online.",
    categoria: "Desenvolvimento Web",
    orcamento: 15000,
    status: "em_execucao" as const,
    custodiaStatus: "pago_em_custodia" as const,
    jobaId: "joba-1",
    jobaNome: "João Silva",
    jobaAvaliacao: 4.8,
    dataPublicacao: new Date("2024-01-10"),
    prazo: new Date("2024-02-15"),
    propostas: 5,
  },
  {
    id: "2",
    titulo: "Logo e Identidade Visual",
    descricao: "Criação de logo e manual de identidade visual para startup de tecnologia.",
    categoria: "Design Gráfico",
    orcamento: 8500,
    status: "aguardando_propostas" as const,
    custodiaStatus: "pendente" as const,
    dataPublicacao: new Date("2024-01-20"),
    prazo: new Date("2024-02-05"),
    propostas: 12,
  },
  {
    id: "3",
    titulo: "Consultoria em Marketing Digital",
    descricao: "Estratégia de marketing digital e gestão de redes sociais por 3 meses.",
    categoria: "Marketing",
    orcamento: 12000,
    status: "aguardando_confirmacao_link" as const,
    custodiaStatus: "pago_em_custodia" as const,
    jobaId: "joba-2",
    jobaNome: "Ana Costa",
    jobaAvaliacao: 4.9,
    dataPublicacao: new Date("2023-12-15"),
    prazo: new Date("2024-01-25"),
    propostas: 8,
  },
]

const mockEscrowPayments = mockProjects.filter((p) => p.custodiaStatus === "pago_em_custodia")

export function LinkDashboard() {
  const [activeSection, setActiveSection] = useState<"overview" | "projects" | "payments" | "chat">("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      <LinkDashboardHeader linkData={mockLinkData} activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Publish CTA - Always visible */}
        <LinkPublishCTA />

        {activeSection === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <LinkProjectsTable projects={mockProjects.slice(0, 3)} showAll={false} />
                <LinkPendingEvaluations projects={mockProjects} />
              </div>
              <div className="space-y-6">
                <LinkEscrowOverview payments={mockEscrowPayments} />
                <LinkChatPanel />
              </div>
            </div>
          </div>
        )}

        {activeSection === "projects" && <LinkProjectsTable projects={mockProjects} showAll={true} />}

        {activeSection === "payments" && (
          <div className="space-y-6">
            <LinkEscrowOverview payments={mockEscrowPayments} expanded={true} />
          </div>
        )}

        {activeSection === "chat" && <LinkChatPanel expanded={true} />}
      </main>
    </div>
  )
}
