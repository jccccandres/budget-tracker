import dayjs from 'dayjs';
import create from 'zustand';

const useFilterStore = create(
  (set) => ({
    category: "",
    month: dayjs().format('MM') - 1,
    year: dayjs().format('YYYY'),
    setCategory: (data) => set((state) => ({ category: data })),
    setMonth: (data) => set((state) => ({ month: data })),
    setYear: (data) => set((state) => ({ year: data }))
  })
)

export { useFilterStore };