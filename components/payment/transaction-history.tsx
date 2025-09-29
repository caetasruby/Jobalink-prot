import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, ArrowUpRight, ArrowDownLeft, Percent, RotateCcw } from "lucide-react"

interface Transaction {
  id: string
  tipo: "deposito" | "saque" | "comissao" | "reembolso"
  valor: number
  valorOriginal?: number
  comissao?: number
  status: "pendente" | "concluido" | "falhado"
  operadora?: string
  createdAt: Date
}

interface TransactionHistoryProps {
  transactions: Transaction[]
  title?: string
}

const transactionConfig = {
  deposito: {
    label: "Depósito",
    icon: ArrowDownLeft,
    color: "bg-green-100 text-green-800",
  },
  saque: {
    label: "Saque",
    icon: ArrowUpRight,
    color: "bg-blue-100 text-blue-800",
  },
  comissao: {
    label: "Comissão",
    icon: Percent,
    color: "bg-purple-100 text-purple-800",
  },
  reembolso: {
    label: "Reembolso",
    icon: RotateCcw,
    color: "bg-orange-100 text-orange-800",
  },
}

export function TransactionHistory({ transactions, title = "Histórico de Transações" }: TransactionHistoryProps) {
  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-gray-600" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Operadora</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => {
                  const config = transactionConfig[transaction.tipo]
                  const Icon = config.icon

                  return (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4 text-gray-500" />
                          <span>{config.label}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <span className="font-semibold">{transaction.valor.toLocaleString("pt-MZ")} MZN</span>
                          {transaction.valorOriginal && transaction.comissao && (
                            <div className="text-xs text-gray-500">
                              Original: {transaction.valorOriginal.toLocaleString("pt-MZ")} MZN
                              <br />
                              Comissão: {transaction.comissao.toLocaleString("pt-MZ")} MZN
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            transaction.status === "concluido"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "falhado"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {transaction.status === "concluido"
                            ? "Concluído"
                            : transaction.status === "falhado"
                              ? "Falhado"
                              : "Pendente"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {transaction.operadora ? (
                          <Badge variant="outline" className="text-xs">
                            {transaction.operadora.toUpperCase()}
                          </Badge>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {transaction.createdAt.toLocaleDateString("pt-PT")}
                        <br />
                        <span className="text-xs">{transaction.createdAt.toLocaleTimeString("pt-PT")}</span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8">
            <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">Nenhuma transação encontrada</p>
            <p className="text-sm text-gray-400 mt-1">As transações aparecerão aqui quando realizadas</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
