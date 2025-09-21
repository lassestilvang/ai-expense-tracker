
"use client"

import { useState, useMemo } from "react"
import { useExpenses } from "@/hooks/useExpenses"
import { Category, Expense } from "@/types"
import Header from "@/app/components/Header"
import { Dashboard } from "@/app/components/Dashboard"
import { ExpenseForm } from "@/app/components/ExpenseForm"
import { ExpenseList } from "@/app/components/ExpenseList"
import { FilterControls } from "@/app/components/FilterControls"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { CSVLink } from "react-csv"
import ClientOnly from "@/components/ui/ClientOnly"

export default function Home() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses()
  const [category, setCategory] = useState<Category | "all">("all")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      const categoryMatch = category === "all" || expense.category === category
      const dateMatch =
        (!dateRange.from || expenseDate >= dateRange.from) &&
        (!dateRange.to || expenseDate <= dateRange.to)
      return categoryMatch && dateMatch
    })
  }, [expenses, category, dateRange])

  const csvData = useMemo(() => {
    if (filteredExpenses.length > 0) {
      return filteredExpenses.map(e => ({
        ...e,
        date: new Date(e.date).toLocaleDateString(),
      }))
    }
    return []
  }, [filteredExpenses])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Dashboard expenses={filteredExpenses} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Expenses</CardTitle>
                  <ClientOnly>
                    <CSVLink data={csvData} filename={"expenses.csv"}>
                      <Button disabled={filteredExpenses.length === 0}>
                        Export CSV
                      </Button>
                    </CSVLink>
                  </ClientOnly>
                </div>
              </CardHeader>
              <CardContent>
                <FilterControls
                  category={category}
                  setCategory={setCategory}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
                <ExpenseList
                  expenses={filteredExpenses}
                  onUpdate={updateExpense}
                  onDelete={deleteExpense}
                />
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Add New Expense</CardTitle>
              </CardHeader>
              <CardContent>
                <ExpenseForm onSubmit={addExpense} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
