import create from 'zustand';

const useTypeStore = create(
  (set) => ({
    types: {},
    setTypes: (data) => set((state) => ({ types: data }))
  })
)

export { useTypeStore };