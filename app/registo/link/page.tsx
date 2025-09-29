import { LinkRegistrationForm } from "@/components/auth/link-registration-form"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"

export default function LinkRegistrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Logo size="lg" className="justify-center" />
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Registo como Link</h1>
          <p className="mt-2 text-gray-600">Cria o teu perfil de cliente</p>
          <p className="text-sm text-gray-500 mt-1">
            Já tens conta?{" "}
            <Link href="/login" className="text-link-orange hover:text-orange-500 font-medium">
              Faz login aqui
            </Link>
          </p>
        </div>
        <LinkRegistrationForm />
      </div>
    </div>
  )
}
