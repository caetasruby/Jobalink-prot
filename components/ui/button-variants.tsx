import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface JobaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

export function JobaButton({ children, className, variant = "default", size = "default", ...props }: JobaButtonProps) {
  return (
    <Button
      className={cn(
        "joba-blue button-shadow hover:opacity-90 transition-opacity",
        variant === "outline" && "bg-transparent border-2 border-joba-blue text-joba-blue hover:joba-blue",
        className,
      )}
      size={size}
      {...props}
    >
      {children}
    </Button>
  )
}

interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

export function LinkButton({ children, className, variant = "default", size = "default", ...props }: LinkButtonProps) {
  return (
    <Button
      className={cn(
        "link-orange button-shadow hover:opacity-90 transition-opacity",
        variant === "outline" && "bg-transparent border-2 border-link-orange text-link-orange hover:link-orange",
        className,
      )}
      size={size}
      {...props}
    >
      {children}
    </Button>
  )
}
