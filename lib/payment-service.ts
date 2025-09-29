import { db } from "./firebase-config"
import type { OperadoraMobile } from "./types"

// Payment simulation service for M-Pesa and eMola
export class PaymentService {
  // Simulate M-Pesa/eMola deposit to escrow
  static async simulateDeposit(params: {
    projectId: string
    linkId: string
    valor: number
    operadora: OperadoraMobile
    contactoMovel: string
  }) {
    console.log("[v0] Simulating payment deposit:", params)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate 90% success rate
    const success = Math.random() > 0.1

    if (!success) {
      throw new Error("Falha na transação. Verifica o teu saldo e tenta novamente.")
    }

    // Create transaction record
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const transaction = {
      id: transactionId,
      projectId: params.projectId,
      linkId: params.linkId,
      valor: params.valor,
      tipo: "deposito" as const,
      status: "concluido" as const,
      operadora: params.operadora,
      contactoMovel: params.contactoMovel,
      createdAt: new Date(),
      metadata: {
        simulatedPayment: true,
        paymentMethod: `${params.operadora.toUpperCase()}_MOBILE`,
      },
    }

    // Save transaction to Firestore
    await db.collection("transactions").add(transaction)

    // Update project escrow status
    await db.collection("projects").doc(params.projectId).update({
      custodiaStatus: "pago_em_custodia",
      custodiaValor: params.valor,
      custodiaTransactionId: transactionId,
      updatedAt: new Date(),
    })

    // Log for audit
    await this.logEscrowEvent({
      projectId: params.projectId,
      evento: "DEPOSITO_REALIZADO",
      valor: params.valor,
      transactionId,
      userId: params.linkId,
    })

    return {
      success: true,
      transactionId,
      message: `Pagamento de ${params.valor.toLocaleString("pt-MZ")} MZN realizado com sucesso via ${params.operadora.toUpperCase()}`,
    }
  }

  // Simulate payment release from escrow to Joba
  static async simulateRelease(params: {
    projectId: string
    jobaId: string
    linkId: string
    valor: number
    jobaContactoMovel: string
    jobaOperadora: OperadoraMobile
    comissaoPercentual?: number
  }) {
    console.log("[v0] Simulating payment release:", params)

    const comissao = params.comissaoPercentual || 5 // 5% default commission
    const valorComissao = (params.valor * comissao) / 100
    const valorFinal = params.valor - valorComissao

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate 95% success rate for releases
    const success = Math.random() > 0.05

    if (!success) {
      throw new Error("Falha na liberação do pagamento. Tenta novamente.")
    }

    const transactionId = `rel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create release transaction
    const releaseTransaction = {
      id: transactionId,
      projectId: params.projectId,
      jobaId: params.jobaId,
      valor: valorFinal,
      valorOriginal: params.valor,
      comissao: valorComissao,
      tipo: "saque" as const,
      status: "concluido" as const,
      operadora: params.jobaOperadora,
      contactoMovel: params.jobaContactoMovel,
      createdAt: new Date(),
      metadata: {
        simulatedPayment: true,
        paymentMethod: `${params.jobaOperadora.toUpperCase()}_MOBILE`,
        comissaoPercentual: comissao,
      },
    }

    // Save release transaction
    await db.collection("transactions").add(releaseTransaction)

    // Create commission transaction
    const commissionTransaction = {
      id: `com_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      projectId: params.projectId,
      valor: valorComissao,
      tipo: "comissao" as const,
      status: "concluido" as const,
      createdAt: new Date(),
      metadata: {
        originalTransactionId: transactionId,
        comissaoPercentual: comissao,
      },
    }

    await db.collection("transactions").add(commissionTransaction)

    // Update project status
    await db.collection("projects").doc(params.projectId).update({
      custodiaStatus: "liberado",
      status: "concluido",
      dataLiberacao: new Date(),
      valorLiberado: valorFinal,
      comissaoPaga: valorComissao,
      updatedAt: new Date(),
    })

    // Update Joba balance (simulated)
    await db
      .collection("users")
      .doc(params.jobaId)
      .update({
        saldoTotal: db.FieldValue?.increment?.(valorFinal) || valorFinal,
        totalFaturamento: db.FieldValue?.increment?.(valorFinal) || valorFinal,
        updatedAt: new Date(),
      })

    // Log for audit
    await this.logEscrowEvent({
      projectId: params.projectId,
      evento: "PAGAMENTO_LIBERADO",
      valor: valorFinal,
      valorOriginal: params.valor,
      comissao: valorComissao,
      transactionId,
      userId: params.linkId,
      jobaId: params.jobaId,
    })

    return {
      success: true,
      transactionId,
      valorLiberado: valorFinal,
      comissao: valorComissao,
      message: `Pagamento de ${valorFinal.toLocaleString("pt-MZ")} MZN liberado para o Joba via ${params.jobaOperadora.toUpperCase()}`,
    }
  }

  // Simulate refund (in case of disputes)
  static async simulateRefund(params: {
    projectId: string
    linkId: string
    valor: number
    motivo: string
  }) {
    console.log("[v0] Simulating refund:", params)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const transactionId = `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const refundTransaction = {
      id: transactionId,
      projectId: params.projectId,
      linkId: params.linkId,
      valor: params.valor,
      tipo: "reembolso" as const,
      status: "concluido" as const,
      motivo: params.motivo,
      createdAt: new Date(),
      metadata: {
        simulatedPayment: true,
      },
    }

    await db.collection("transactions").add(refundTransaction)

    // Update project status
    await db.collection("projects").doc(params.projectId).update({
      custodiaStatus: "reembolsado",
      status: "cancelado",
      motivoCancelamento: params.motivo,
      dataReembolso: new Date(),
      updatedAt: new Date(),
    })

    // Log for audit
    await this.logEscrowEvent({
      projectId: params.projectId,
      evento: "REEMBOLSO_REALIZADO",
      valor: params.valor,
      transactionId,
      userId: params.linkId,
      motivo: params.motivo,
    })

    return {
      success: true,
      transactionId,
      message: `Reembolso de ${params.valor.toLocaleString("pt-MZ")} MZN processado com sucesso`,
    }
  }

  // Log escrow events for audit trail
  private static async logEscrowEvent(params: {
    projectId: string
    evento: string
    valor: number
    valorOriginal?: number
    comissao?: number
    transactionId: string
    userId: string
    jobaId?: string
    motivo?: string
  }) {
    const auditLog = {
      projectId: params.projectId,
      evento: params.evento,
      valor: params.valor,
      valorOriginal: params.valorOriginal,
      comissao: params.comissao,
      transactionId: params.transactionId,
      userId: params.userId,
      jobaId: params.jobaId,
      motivo: params.motivo,
      timestamp: new Date(),
      metadata: {
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "server",
        ip: "simulated-ip",
      },
    }

    await db.collection("escrow_audit_log").add(auditLog)
    console.log("[v0] Escrow event logged:", params.evento, params.transactionId)
  }

  // Get transaction history for a project
  static async getProjectTransactions(projectId: string) {
    console.log("[v0] Fetching transactions for project:", projectId)

    // Simulate fetching from Firestore
    const mockTransactions = [
      {
        id: "txn_123",
        tipo: "deposito",
        valor: 15000,
        status: "concluido",
        operadora: "vodacom",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: "rel_456",
        tipo: "saque",
        valor: 14250,
        valorOriginal: 15000,
        comissao: 750,
        status: "concluido",
        operadora: "vodacom",
        createdAt: new Date(),
      },
    ]

    return mockTransactions
  }

  // Validate mobile number format
  static validateMobileNumber(number: string, operadora: OperadoraMobile): boolean {
    const cleanNumber = number.replace(/\s+/g, "")

    if (operadora === "vodacom") {
      // Vodacom: 84, 85 prefixes
      return /^(84|85)\d{7}$/.test(cleanNumber)
    } else if (operadora === "movitel") {
      // Movitel: 86, 87 prefixes
      return /^(86|87)\d{7}$/.test(cleanNumber)
    }

    return false
  }

  // Get payment method info
  static getPaymentMethodInfo(operadora: OperadoraMobile) {
    const methods = {
      vodacom: {
        name: "M-Pesa",
        color: "#E60000",
        instructions: "Usa o teu número Vodacom registado no M-Pesa",
        prefixes: ["84", "85"],
      },
      movitel: {
        name: "eMola",
        color: "#FF6600",
        instructions: "Usa o teu número Movitel registado no eMola",
        prefixes: ["86", "87"],
      },
    }

    return methods[operadora]
  }
}
