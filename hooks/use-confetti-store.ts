import { create } from "zustand";

type ConfettingStore = { 
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useConfettingStore = create<ConfettingStore>((set) => ({
  isOpen: false, 
  onOpen: () => set({ isOpen: true}),
  onClose: () => set({ isOpen: false}),
}));