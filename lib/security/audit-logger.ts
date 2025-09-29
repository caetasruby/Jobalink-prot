/**
 * Audit Logger
 * Maintains immutable logs of all critical operations for security and compliance
 */

export type AuditEventType =
  | "USER_REGISTERED"
  | "USER_LOGIN"
  | "USER_LOGOUT"
  | "PROFILE_UPDATED"
  | "PROJECT_CREATED"
  | "PROJECT_STATUS_CHANGED"
  | "PAYMENT_INITIATED"
  | "PAYMENT_COMPLETED"
  | "ESCROW_DEPOSITED"
  | "ESCROW_RELEASED"
  | "ESCROW_REFUNDED"
  | "REVIEW_SUBMITTED"
  | "CONTENT_FLAGGED"
  | "SECURITY_VIOLATION"

export interface AuditLog {
  id: string
  timestamp: Date
  eventType: AuditEventType
  userId: string
  userRole: "joba" | "link"
  metadata: Record<string, any>
  ipAddress?: string
  userAgent?: string
}

/**
 * Log an audit event
 * In production, this should write to Firestore with strict security rules
 */
export async function logAuditEvent(
  eventType: AuditEventType,
  userId: string,
  userRole: "joba" | "link",
  metadata: Record<string, any> = {},
): Promise<void> {
  const auditLog: AuditLog = {
    id: "audit_" + Date.now() + "_" + Math.random().toString(36).substring(2),
    timestamp: new Date(),
    eventType,
    userId,
    userRole,
    metadata,
    ipAddress: await getClientIP(),
    userAgent: getClientUserAgent(),
  }

  // In production: Write to Firestore 'auditLogs' collection
  // firestore.collection('auditLogs').add(auditLog)

  console.log("[AUDIT LOG]", auditLog)

  // Store locally for demonstration
  if (typeof window !== "undefined") {
    const logs = getLocalAuditLogs()
    logs.push(auditLog)
    localStorage.setItem("jobalink_audit_logs", JSON.stringify(logs))
  }
}

/**
 * Retrieve audit logs for a specific user
 * Only accessible by the user themselves or system administrators
 */
export function getUserAuditLogs(userId: string): AuditLog[] {
  if (typeof window === "undefined") return []

  const logs = getLocalAuditLogs()
  return logs.filter((log) => log.userId === userId)
}

/**
 * Retrieve audit logs for a specific project
 * Used for dispute resolution
 */
export function getProjectAuditLogs(projectId: string): AuditLog[] {
  if (typeof window === "undefined") return []

  const logs = getLocalAuditLogs()
  return logs.filter((log) => log.metadata.projectId === projectId)
}

// Helper functions

function getLocalAuditLogs(): AuditLog[] {
  if (typeof window === "undefined") return []

  try {
    const logsJson = localStorage.getItem("jobalink_audit_logs")
    return logsJson ? JSON.parse(logsJson) : []
  } catch {
    return []
  }
}

async function getClientIP(): Promise<string> {
  // In production, get from server-side request headers
  return "simulated_ip"
}

function getClientUserAgent(): string {
  if (typeof window === "undefined") return "server"
  return window.navigator.userAgent
}

/**
 * Security monitoring - detect suspicious activities
 */
export function detectSuspiciousActivity(userId: string): {
  isSuspicious: boolean
  reasons: string[]
} {
  const logs = getUserAuditLogs(userId)
  const reasons: string[] = []

  // Check for rapid login attempts (potential brute force)
  const recentLogins = logs.filter(
    (log) => log.eventType === "USER_LOGIN" && Date.now() - new Date(log.timestamp).getTime() < 5 * 60 * 1000, // Last 5 minutes
  )

  if (recentLogins.length > 5) {
    reasons.push("Múltiplas tentativas de login em curto período")
  }

  // Check for multiple failed payment attempts
  const failedPayments = logs.filter(
    (log) =>
      log.eventType === "PAYMENT_INITIATED" &&
      log.metadata.status === "failed" &&
      Date.now() - new Date(log.timestamp).getTime() < 60 * 60 * 1000, // Last hour
  )

  if (failedPayments.length > 3) {
    reasons.push("Múltiplas tentativas de pagamento falhadas")
  }

  // Check for content moderation flags
  const contentFlags = logs.filter(
    (log) =>
      log.eventType === "CONTENT_FLAGGED" && Date.now() - new Date(log.timestamp).getTime() < 24 * 60 * 60 * 1000, // Last 24 hours
  )

  if (contentFlags.length > 2) {
    reasons.push("Conteúdo inapropriado detectado múltiplas vezes")
  }

  return {
    isSuspicious: reasons.length > 0,
    reasons,
  }
}
