// User Types
export type UserRole = "joba" | "link"
export type AccountType = "individual" | "empresa"
export type OperadoraMobile = "vodacom" | "movitel"

// User Profiles
export interface BaseUser {
  id: string
  email: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface JobaProfile extends BaseUser {
  role: "joba"
  nomeCompleto: string
  contactoMovel: string
  operadora: OperadoraMobile
  localizacao: {
    cidade: string
    bairro: string
  }
  fotoPerfil?: string
  competencias: string[]
  tarifaHoraria: number
  biografiaProfissional?: string
  avaliacaoMedia: number
  totalTrabalhos: number
  perfilCompleto: boolean
}

export interface LinkProfile extends BaseUser {
  role: "link"
  accountType: AccountType
  nomeCompleto?: string // For individual
  nomeEmpresa?: string // For empresa
  nif?: string // For empresa
  nomeRepresentante?: string // For empresa
  empresaVerificada: boolean
}

// Project Types
export type ProjectStatus =
  | "aguardando_propostas"
  | "em_execucao"
  | "aguardando_confirmacao_link"
  | "concluido"
  | "cancelado"

export type CustodiaStatus = "pendente" | "pago_em_custodia" | "liberado" | "reembolsado"

export interface Project {
  id: string
  linkId: string
  jobaId?: string
  titulo: string
  descricao: string
  categoria: string
  orcamento: number
  status: ProjectStatus
  custodiaStatus: CustodiaStatus
  createdAt: Date
  updatedAt: Date
  dataLimite?: Date
}

// Payment Types
export type TransactionType = "deposito" | "saque" | "comissao" | "reembolso"
export type TransactionStatus = "pendente" | "concluido" | "falhado"

export interface Transaction {
  id: string
  projectId: string
  linkId?: string
  jobaId?: string
  valor: number
  valorOriginal?: number
  comissao?: number
  tipo: TransactionType
  status: TransactionStatus
  operadora?: OperadoraMobile
  contactoMovel?: string
  motivo?: string
  createdAt: Date
  metadata?: {
    simulatedPayment?: boolean
    paymentMethod?: string
    comissaoPercentual?: number
    originalTransactionId?: string
  }
}

export interface EscrowAuditLog {
  projectId: string
  evento: string
  valor: number
  valorOriginal?: number
  comissao?: number
  transactionId: string
  userId: string
  jobaId?: string
  motivo?: string
  timestamp: Date
  metadata?: {
    userAgent?: string
    ip?: string
  }
}
