import { JobaRegistrationForm } from "@/components/auth/joba-registration-form"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"

export default function JobaRegistrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Logo size="lg" className="justify-center" />
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Registo como Joba</h1>
          <p className="mt-2 text-gray-600">Cria o teu perfil de prestador de serviços</p>
          <p className="text-sm text-gray-500 mt-1">
            Já tens conta?{" "}
            <Link href="/login" className="text-joba-blue hover:text-blue-500 font-medium">
              Faz login aqui
            </Link>
          </p>
        </div>
        <JobaRegistrationForm />
      </div>
    </div>
  )
}
