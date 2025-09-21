
"use client"

import { useMemo } from "react"
import { Expense } from "@/types"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface DashboardProps {
  expenses: Expense[]
}

export function Dashboard({ expenses }: DashboardProps) {
  const totalSpending = useMemo(
    () => expenses.reduce((acc, expense) => acc + expense.amount, 0),
    [expenses]
  )

  const monthlySpending = useMemo(() => {
    const now = new Date()
    return expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date)
        return (
          expenseDate.getMonth() === now.getMonth() &&
          expenseDate.getFullYear() === now.getFullYear()
        )
      })
      .reduce((acc, expense) => acc + expense.amount, 0)
  }, [expenses])

  const topCategory = useMemo(() => {
    if (expenses.length === 0) return null
    const categorySpending = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {} as Record<string, number>)

    return Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0]
  }, [expenses])

  const spendingByCategory = useMemo(() => {
    const categorySpending = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {} as Record<string, number>)

    return Object.entries(categorySpending).map(([name, value]) => ({
      name,
      value,
    }))
  }, [expenses])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Total Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalSpending.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${monthlySpending.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Top Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topCategory ? topCategory[0] : 'N/A'}</div>
          <p className="text-xs text-muted-foreground">
            {topCategory ? `$${topCategory[1].toFixed(2)}` : ''}
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={spendingByCategory}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
