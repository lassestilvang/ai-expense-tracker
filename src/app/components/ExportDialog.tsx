"use client"

import { useState, useMemo } from "react"
import { Expense, Category } from "@/types"
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/Dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Input } from "@/components/ui/Input"
import { DatePicker } from "@/components/ui/DatePicker"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

interface ExportDialogProps {
  expenses: Expense[]
  categories: Category[]
}

type ExportFormat = "csv" | "json" | "pdf"

export function ExportDialog({ expenses, categories }: ExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [format, setFormat] = useState<ExportFormat>("csv")
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [filename, setFilename] = useState("expenses")
  const [isLoading, setIsLoading] = useState(false)

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      if (startDate && expenseDate < startDate) return false
      if (endDate && expenseDate > endDate) return false
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(expense.category)
      )
        return false
      return true
    })
  }, [expenses, startDate, endDate, selectedCategories])

  const handleExport = () => {
    setIsLoading(true)

    setTimeout(() => {
      switch (format) {
        case "csv":
          exportToCsv()
          break
        case "json":
          exportToJson()
          break
        case "pdf":
          exportToPdf()
          break
      }
      setIsLoading(false)
      setIsOpen(false)
    }, 500)
  }

  const exportToCsv = () => {
    const headers = ["Date", "Category", "Amount", "Description"]
    const rows = filteredExpenses.map((expense) =>
      [expense.date, expense.category, expense.amount, expense.description].join(
        "," // This is a valid escaped comma
      )
    )
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows].join("\n") // Correctly escaped newline
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${filename}.csv`)
    document.body.appendChild(link)
    link.click()
  }

  const exportToJson = () => {
    const jsonContent =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(filteredExpenses, null, 2))
    const link = document.createElement("a")
    link.setAttribute("href", jsonContent)
    link.setAttribute("download", `${filename}.json`)
    document.body.appendChild(link)
    link.click()
  }

  const exportToPdf = () => {
    const doc = new jsPDF()
    autoTable(doc, {
      head: [["Date", "Category", "Amount", "Description"]],
      body: filteredExpenses.map((expense) => [
        expense.date,
        expense.category,
        expense.amount,
        expense.description,
      ]),
    })
    doc.save(`${filename}.pdf`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Export Data</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Export Expenses</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="format" className="text-right">
              Format
            </Label>
            <Select
              value={format}
              onValueChange={(value) => setFormat(value as ExportFormat)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date-range" className="text-right">
              Date Range
            </Label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              <DatePicker date={startDate} setDate={setStartDate} />
              <DatePicker date={endDate} setDate={setEndDate} />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="categories" className="text-right">
              Categories
            </Label>
            <Select
              onValueChange={(value) => {
                const newCategories = selectedCategories.includes(value as Category)
                  ? selectedCategories.filter((c) => c !== value)
                  : [...selectedCategories, value as Category]
                setSelectedCategories(newCategories)
              }}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="filename" className="text-right">
              Filename
            </Label>
            <Input
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div>
            <Label>Preview</Label>
            <div className="mt-2 h-48 overflow-y-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.slice(0, 10).map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>${expense.amount.toFixed(2)}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {filteredExpenses.length} expenses will be exported.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isLoading}>
            {isLoading ? "Exporting..." : "Export"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
