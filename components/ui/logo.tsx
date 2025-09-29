import Image from "next/image"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-GevlmCg9KDkzdjD3sygomFr2nxCgP9.jpg"
          alt="JobaLink Logo"
          width={size === "sm" ? 32 : size === "md" ? 48 : 64}
          height={size === "sm" ? 32 : size === "md" ? 48 : 64}
          className={`${sizeClasses[size]} w-auto`}
        />
      </div>
    </div>
  )
}
