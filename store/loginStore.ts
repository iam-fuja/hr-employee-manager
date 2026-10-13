import { create } from "zustand";

interface LoginState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isLoading: boolean;
  updateFirstName: (value: string) => void;
  updateLastName: (lastName: string) => void;
  updateEmail: (email: string) => void;
  updatePassword: (value: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLogin = create<LoginState>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  isLoading: false,

  updateFirstName: (value: string) => set({ firstName: value }),
  updateLastName: (lastName: string) => set({ lastName }),
  updateEmail: (email: string) => set({ email }),
  updatePassword: (value: string) => set({ password: value }),
  setIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
  // updateIsLoading: (value: boolean) => set({ isLoading: value }),
}));
