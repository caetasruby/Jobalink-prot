import { LoginForm } from "@/components/auth/login-form"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo size="lg" className="justify-center" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Entrar na tua conta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{" "}
            <Link href="/#junta-te" className="font-medium text-joba-blue hover:text-blue-500">
              cria uma nova conta
            </Link>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
