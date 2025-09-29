/**
 * Content Moderation Service
 * Monitors chat messages and project descriptions for inappropriate content
 */

// List of prohibited words/phrases (simplified for demonstration)
const PROHIBITED_WORDS = [
  "fraude",
  "scam",
  "golpe",
  // Add more prohibited terms
]

// Suspicious patterns that might indicate fraud
const SUSPICIOUS_PATTERNS = [
  /pag(a|ue).*fora.*plataforma/i, // Payment outside platform
  /transfer.*direto/i, // Direct transfer
  /whatsapp.*pag/i, // WhatsApp payment
  /conta.*pessoal/i, // Personal account
]

export interface ModerationResult {
  isClean: boolean
  flaggedWords: string[]
  suspiciousPatterns: string[]
  riskLevel: "low" | "medium" | "high"
  recommendation: "approve" | "review" | "block"
}

/**
 * Moderate text content for inappropriate or fraudulent content
 */
export function moderateContent(content: string): ModerationResult {
  const lowerContent = content.toLowerCase()
  const flaggedWords: string[] = []
  const suspiciousPatterns: string[] = []

  // Check for prohibited words
  PROHIBITED_WORDS.forEach((word) => {
    if (lowerContent.includes(word)) {
      flaggedWords.push(word)
    }
  })

  // Check for suspicious patterns
  SUSPICIOUS_PATTERNS.forEach((pattern) => {
    if (pattern.test(content)) {
      suspiciousPatterns.push(pattern.source)
    }
  })

  // Calculate risk level
  let riskLevel: "low" | "medium" | "high" = "low"
  let recommendation: "approve" | "review" | "block" = "approve"

  if (flaggedWords.length > 0 || suspiciousPatterns.length > 0) {
    riskLevel = "medium"
    recommendation = "review"
  }

  if (flaggedWords.length > 2 || suspiciousPatterns.length > 1) {
    riskLevel = "high"
    recommendation = "block"
  }

  return {
    isClean: flaggedWords.length === 0 && suspiciousPatterns.length === 0,
    flaggedWords,
    suspiciousPatterns,
    riskLevel,
    recommendation,
  }
}

/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, "")

  // Escape special characters
  sanitized = sanitized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")

  return sanitized
}

/**
 * Validate phone number format for M-Pesa/eMola
 */
export function validateMozambiquePhone(phone: string, operator: "vodacom" | "movitel"): boolean {
  // Remove spaces and special characters
  const cleanPhone = phone.replace(/[\s\-$$$$]/g, "")

  // Mozambique phone format: +258 XX XXX XXXX or 258XXXXXXXXX or 8XXXXXXXX
  const phoneRegex = /^(\+?258)?8[2-7]\d{7}$/

  if (!phoneRegex.test(cleanPhone)) {
    return false
  }

  // Validate operator-specific prefixes
  const lastDigits = cleanPhone.slice(-9)

  if (operator === "vodacom") {
    // Vodacom: 84, 85
    return /^8[45]/.test(lastDigits)
  } else if (operator === "movitel") {
    // Movitel: 86, 87
    return /^8[67]/.test(lastDigits)
  }

  return false
}

/**
 * Validate NIF (Número de Identificação Fiscal) format
 */
export function validateNIF(nif: string): boolean {
  // Remove spaces and special characters
  const cleanNIF = nif.replace(/[\s-]/g, "")

  // Mozambique NIF format: 9 digits
  const nifRegex = /^\d{9}$/

  return nifRegex.test(cleanNIF)
}

/**
 * Rate limiting for API calls (prevent abuse)
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map()

  constructor(
    private maxRequests = 10,
    private windowMs = 60000, // 1 minute
  ) {}

  /**
   * Check if user has exceeded rate limit
   */
  isRateLimited(userId: string): boolean {
    const now = Date.now()
    const userRequests = this.requests.get(userId) || []

    // Remove old requests outside the time window
    const recentRequests = userRequests.filter((timestamp) => now - timestamp < this.windowMs)

    // Update stored requests
    this.requests.set(userId, recentRequests)

    // Check if limit exceeded
    return recentRequests.length >= this.maxRequests
  }

  /**
   * Record a new request
   */
  recordRequest(userId: string): void {
    const now = Date.now()
    const userRequests = this.requests.get(userId) || []
    userRequests.push(now)
    this.requests.set(userId, userRequests)
  }
}
