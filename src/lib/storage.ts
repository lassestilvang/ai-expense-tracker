
import { Expense } from '@/types';

export function loadExpenses(): Expense[] {
  const storedExpenses = localStorage.getItem('expenses');
  if (storedExpenses) {
    try {
      const parsedExpenses = JSON.parse(storedExpenses);
      // Basic validation to ensure it's an array
      if (Array.isArray(parsedExpenses)) {
        return parsedExpenses;
      }
    } catch (error) {
      console.error("Error parsing expenses from localStorage:", error);
      return [];
    }
  }
  return [];
}

export function saveExpenses(expenses: Expense[]) {
  try {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  } catch (error) {
    console.error("Error saving expenses to localStorage:", error);
  }
}
