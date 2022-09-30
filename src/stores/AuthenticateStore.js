import create from 'zustand';
import { persist } from 'zustand/middleware';

const useLogInStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: {},
      loggedIn: () => set((state) => ({ isLoggedIn: true })),
      loggedOut: () => set((state) => ({ isLoggedIn: false })),
      setUser: (data) => set((state) => ({ user: data }))
    }),
    {
      name: 'auth'
    }
  )
);

const useTokenStore = create(
  persist(
    (set) => ({
      token: '',
      setToken: (data) => set((state) => ({ token: data }))
    }),
    {
      name: 'token'
    }
  )
);

export { useLogInStore, useTokenStore };