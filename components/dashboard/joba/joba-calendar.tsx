"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { useState } from "react"

export function JobaCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set())

  // Mock availability data
  const availability = {
    "2024-01-15": "ocupado",
    "2024-01-16": "livre",
    "2024-01-17": "livre",
    "2024-01-18": "ocupado",
    "2024-01-19": "livre",
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const toggleAvailability = (date: Date) => {
    const dateKey = formatDateKey(date)
    const newSelected = new Set(selectedDates)

    if (newSelected.has(dateKey)) {
      newSelected.delete(dateKey)
    } else {
      newSelected.add(dateKey)
    }

    setSelectedDates(newSelected)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]
  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  return (
    <div className="space-y-6">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-joba-blue" />
              <span className="text-joba-blue">Gestão de Agenda</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-lg font-semibold min-w-[150px] text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-200 rounded"></div>
              <span>Livre</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-200 rounded"></div>
              <span>Ocupado</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-joba-blue rounded"></div>
              <span>Selecionado</span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="p-2"></div>
              }

              const dateKey = formatDateKey(day)
              const isSelected = selectedDates.has(dateKey)
              const availability_status = availability[dateKey as keyof typeof availability]
              const isToday = day.toDateString() === new Date().toDateString()

              let cellClass = "p-2 text-center text-sm cursor-pointer rounded-md transition-colors "

              if (isSelected) {
                cellClass += "bg-joba-blue text-white "
              } else if (availability_status === "ocupado") {
                cellClass += "bg-red-100 text-red-800 "
              } else if (availability_status === "livre") {
                cellClass += "bg-green-100 text-green-800 "
              } else {
                cellClass += "hover:bg-gray-100 "
              }

              if (isToday) {
                cellClass += "ring-2 ring-joba-blue "
              }

              return (
                <div key={index} className={cellClass} onClick={() => toggleAvailability(day)}>
                  {day.getDate()}
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">Clica nos dias para definir disponibilidade</p>
            <Button className="joba-blue">Guardar Alterações</Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Schedule */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="text-gray-900">Próximos Compromissos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Reunião - Website Restaurante</div>
                <div className="text-sm text-gray-600">Maria Santos</div>
              </div>
              <Badge className="bg-joba-blue text-white">Amanhã 14:00</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Entrega - Logo TechStart</div>
                <div className="text-sm text-gray-600">TechStart Lda</div>
              </div>
              <Badge className="bg-link-orange text-white">Sex 16:00</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
