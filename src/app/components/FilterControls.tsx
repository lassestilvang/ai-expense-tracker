
"use client"

import { Category } from "@/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { DatePicker } from "@/components/ui/DatePicker"

interface FilterControlsProps {
  category: Category | "all"
  setCategory: (category: Category | "all") => void
  dateRange: { from?: Date; to?: Date }
  setDateRange: (dateRange: { from?: Date; to?: Date }) => void
}

export function FilterControls({
  category,
  setCategory,
  dateRange,
  setDateRange,
}: FilterControlsProps) {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <Select
        value={category}
        onValueChange={(value) => setCategory(value as Category | "all")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Transportation">Transportation</SelectItem>
          <SelectItem value="Entertainment">Entertainment</SelectItem>
          <SelectItem value="Shopping">Shopping</SelectItem>
          <SelectItem value="Bills">Bills</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center space-x-2">
        <DatePicker
          date={dateRange.from}
          setDate={(date) => setDateRange({ ...dateRange, from: date })}
        />
        <span>-</span>
        <DatePicker
          date={dateRange.to}
          setDate={(date) => setDateRange({ ...dateRange, to: date })}
        />
      </div>
    </div>
  )
}
