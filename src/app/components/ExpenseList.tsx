
"use client"

import { useState } from "react"
import { Expense } from "@/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"
import { Button } from "@/components/ui/Button"
import { ExpenseForm } from "./ExpenseForm"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { MoreHorizontal } from "lucide-react"

interface ExpenseListProps {
  expenses: Expense[]
  onUpdate: (expense: Expense) => void
  onDelete: (id: string) => void
}

export function ExpenseList({ expenses, onUpdate, onDelete }: ExpenseListProps) {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense)
  }

  const handleUpdate = (data: Omit<Expense, "id">) => {
    if (editingExpense) {
      onUpdate({ ...data, id: editingExpense.id })
      setEditingExpense(null)
    }
  }

  return (
    <div className="w-full">
      {editingExpense && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Edit Expense</h2>
          <ExpenseForm onSubmit={handleUpdate} expense={editingExpense} />
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.description}</TableCell>
              <TableCell>${expense.amount.toFixed(2)}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEdit(expense)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onDelete(expense.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
