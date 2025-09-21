
import { useState, useEffect, useCallback } from 'react';
import { Expense } from '@/types';
import { loadExpenses, saveExpenses } from '@/lib/storage';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    // The effect should only run on the client-side where localStorage is available.
    if (typeof window !== 'undefined') {
      setExpenses(loadExpenses());
    }
  }, []);

  const syncExpenses = useCallback((updatedExpenses: Expense[]) => {
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  }, []);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: crypto.randomUUID() };
    syncExpenses([...expenses, newExpense]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    syncExpenses(updatedExpenses);
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    syncExpenses(updatedExpenses);
  };

  return { expenses, addExpense, updateExpense, deleteExpense, setExpenses: syncExpenses };
}
