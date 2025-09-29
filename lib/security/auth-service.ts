import type { User, UserRole, JobaProfile, LinkProfile } from "@/lib/types"

/**
 * Authentication Service
 * Handles user authentication, role management, and session security
 */

// Simulated token storage (in production, use httpOnly cookies)
const AUTH_TOKEN_KEY = "jobalink_auth_token"
const USER_DATA_KEY = "jobalink_user_data"

export interface AuthSession {
  user: User
  token: string
  expiresAt: number
}

/**
 * Authenticate user with email and password
 */
export async function authenticateUser(email: string, password: string): Promise<AuthSession> {
  // Simulate Firebase Authentication
  // In production, use: firebase.auth().signInWithEmailAndPassword(email, password)

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate user lookup
  const mockUser: User = {
    id: "user_" + Date.now(),
    email,
    role: "joba", // This would come from Firestore
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Generate session token (in production, Firebase handles this)
  const token = generateSecureToken()
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

  // Store session
  const session: AuthSession = {
    user: mockUser,
    token,
    expiresAt,
  }

  storeSession(session)

  return session
}

/**
 * Register new user with role-based profile creation
 */
export async function registerUser(
  email: string,
  password: string,
  role: UserRole,
  profileData: Partial<JobaProfile | LinkProfile>,
): Promise<AuthSession> {
  // Simulate Firebase Authentication
  // In production, use: firebase.auth().createUserWithEmailAndPassword(email, password)

  // Validate password strength
  if (!isPasswordStrong(password)) {
    throw new Error("Senha fraca. Use pelo menos 8 caracteres, incluindo letras e números.")
  }

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Create user document
  const newUser: User = {
    id: "user_" + Date.now(),
    email,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Create role-specific profile in Firestore
  // In production: firestore.collection('jobaProfiles' or 'linkProfiles').doc(newUser.id).set(profileData)

  // Generate session
  const token = generateSecureToken()
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000

  const session: AuthSession = {
    user: newUser,
    token,
    expiresAt,
  }

  storeSession(session)

  return session
}

/**
 * Get current authenticated session
 */
export function getCurrentSession(): AuthSession | null {
  if (typeof window === "undefined") return null

  const sessionData = localStorage.getItem(USER_DATA_KEY)
  const token = localStorage.getItem(AUTH_TOKEN_KEY)

  if (!sessionData || !token) return null

  try {
    const session: AuthSession = JSON.parse(sessionData)

    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      clearSession()
      return null
    }

    return session
  } catch {
    return null
  }
}

/**
 * Sign out user and clear session
 */
export function signOut(): void {
  clearSession()
  // In production: firebase.auth().signOut()
}

/**
 * Verify user has required role
 */
export function requireRole(requiredRole: UserRole): boolean {
  const session = getCurrentSession()
  if (!session) return false
  return session.user.role === requiredRole
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getCurrentSession() !== null
}

// Helper functions

function generateSecureToken(): string {
  // In production, Firebase generates secure tokens
  // This is a simulation
  return "token_" + Math.random().toString(36).substring(2) + Date.now().toString(36)
}

function isPasswordStrong(password: string): boolean {
  // Minimum 8 characters, at least one letter and one number
  const minLength = password.length >= 8
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  return minLength && hasLetter && hasNumber
}

function storeSession(session: AuthSession): void {
  if (typeof window === "undefined") return

  localStorage.setItem(AUTH_TOKEN_KEY, session.token)
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(session))

  // In production, also set httpOnly cookie for server-side verification
}

function clearSession(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(USER_DATA_KEY)
}

/**
 * Data encryption utilities
 * Note: In production, use proper encryption libraries and server-side encryption
 */
export const DataEncryption = {
  /**
   * Encrypt sensitive data before storing
   * In production: Use crypto libraries like crypto-js or server-side encryption
   */
  encrypt(data: string): string {
    // This is a placeholder - use proper encryption in production
    return btoa(data) // Base64 encoding (NOT secure, just for demonstration)
  },

  /**
   * Decrypt sensitive data when retrieving
   */
  decrypt(encryptedData: string): string {
    // This is a placeholder - use proper decryption in production
    return atob(encryptedData)
  },
}
