"use client"

import { Shield, CheckCircle2, AlertTriangle } from "lucide-react"

interface SecurityBadgeProps {
  type: "verified-company" | "verified-joba" | "escrow-protected"
  className?: string
}

export function SecurityBadge({ type, className = "" }: SecurityBadgeProps) {
  const badges = {
    "verified-company": {
      icon: CheckCircle2,
      text: "Empresa Verificada",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    "verified-joba": {
      icon: Shield,
      text: "Perfil Verificado",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    "escrow-protected": {
      icon: Shield,
      text: "Pagamento Protegido",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  }

  const badge = badges[type]
  const Icon = badge.icon

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${badge.bgColor} ${badge.borderColor} ${className}`}
    >
      <Icon className={`h-4 w-4 ${badge.color}`} />
      <span className={`text-sm font-medium ${badge.color}`}>{badge.text}</span>
    </div>
  )
}

interface SecurityAlertProps {
  message: string
  severity: "info" | "warning" | "error"
  onDismiss?: () => void
}

export function SecurityAlert({ message, severity, onDismiss }: SecurityAlertProps) {
  const styles = {
    info: {
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    error: {
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
  }

  const style = styles[severity]
  const Icon = style.icon

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${style.bgColor} ${style.borderColor}`}>
      <Icon className={`h-5 w-5 ${style.color} flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        <p className={`text-sm font-medium ${style.color}`}>{message}</p>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className={`${style.color} hover:opacity-70 transition-opacity`}>
          <span className="sr-only">Fechar</span>×
        </button>
      )}
    </div>
  )
}
