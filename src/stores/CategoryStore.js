import create from 'zustand';

const useCategoryStore = create(
  (set) => ({
    categories: {},
    setCategories: (data) => set((state) => ({ categories: data }))
  })
)

export { useCategoryStore };