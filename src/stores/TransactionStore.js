import create from 'zustand';

const useTransactionsStore = create(
  (set) => ({
    transactions: {},
    setTransactions: (data) => set((state) => ({ transactions: data })),
    monthsYear: [],
    setMonthsYear: (data) => set((state) => ({ monthsYear: data }))
  })
)

export { useTransactionsStore };