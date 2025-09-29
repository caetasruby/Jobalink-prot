import { JobaProfileCompletion } from "@/components/auth/joba-profile-completion"
import { Logo } from "@/components/ui/logo"

export default function JobaProfileCompletionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Logo size="lg" className="justify-center" />
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Completa o teu Perfil</h1>
          <p className="mt-2 text-gray-600">Passo 2: Informações profissionais obrigatórias</p>
          <div className="mt-4 bg-blue-100 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              Estas informações são obrigatórias para criar o teu CV e aumentar a confiança dos clientes
            </p>
          </div>
        </div>
        <JobaProfileCompletion />
      </div>
    </div>
  )
}
