import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo size="md" />

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#como-funciona"
              className="text-sm font-medium text-gray-700 hover:text-joba-blue transition-colors"
            >
              Como Funciona
            </Link>
            <Link
              href="#funcoes-detalhadas"
              className="text-sm font-medium text-gray-700 hover:text-joba-blue transition-colors"
            >
              Funcionalidades
            </Link>
            <Link href="#junta-te" className="text-sm font-medium text-gray-700 hover:text-joba-blue transition-colors">
              Regista-te
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-700 hover:text-joba-blue">
                Entrar
              </Button>
            </Link>
            <Link href="#junta-te">
              <Button className="joba-blue button-shadow">Começar Agora</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
