import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Star, Briefcase, DollarSign } from "lucide-react"

interface JobaStatsCardsProps {
  jobaData: any
}

export function JobaStatsCards({ jobaData }: JobaStatsCardsProps) {
  const monthlyRevenue = [
    { month: "Nov", value: 12500 },
    { month: "Dez", value: 15800 },
    { month: "Jan", value: 17300 },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Revenue */}
      <Card className="card-shadow border-l-4 border-l-joba-blue">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Faturamento Total</CardTitle>
          <DollarSign className="h-4 w-4 text-joba-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {jobaData.faturamentoTotal.toLocaleString("pt-MZ")} MZN
          </div>
          <p className="text-xs text-green-600 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            +12% este mês
          </p>
        </CardContent>
      </Card>

      {/* Average Rating */}
      <Card className="card-shadow border-l-4 border-l-yellow-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Avaliação Média</CardTitle>
          <Star className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 flex items-center">
            {jobaData.avaliacaoMedia.toFixed(1)}
            <div className="flex ml-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.floor(jobaData.avaliacaoMedia) ? "text-yellow-500 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-1">Baseado em {jobaData.totalTrabalhos} trabalhos</p>
        </CardContent>
      </Card>

      {/* Completed Jobs */}
      <Card className="card-shadow border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Trabalhos Concluídos</CardTitle>
          <Briefcase className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{jobaData.totalTrabalhos}</div>
          <p className="text-xs text-green-600 mt-1">+3 este mês</p>
        </CardContent>
      </Card>

      {/* Monthly Revenue Trend */}
      <Card className="card-shadow border-l-4 border-l-link-orange">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Receita Mensal</CardTitle>
          <TrendingUp className="h-4 w-4 text-link-orange" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {monthlyRevenue[monthlyRevenue.length - 1].value.toLocaleString("pt-MZ")} MZN
          </div>
          <div className="flex items-center space-x-2 mt-2">
            {monthlyRevenue.map((month, index) => (
              <div key={month.month} className="flex flex-col items-center">
                <div
                  className="w-2 bg-link-orange rounded-full"
                  style={{ height: `${(month.value / 20000) * 20}px` }}
                />
                <span className="text-xs text-gray-500 mt-1">{month.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
