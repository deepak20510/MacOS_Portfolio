import { create } from "zustand";

const useSpotlightStore = create((set) => ({
  isOpen: false,
  toggleSpotlight: () => set((state) => ({ isOpen: !state.isOpen })),
  closeSpotlight: () => set({ isOpen: false }),
  openSpotlight: () => set({ isOpen: true }),
}));

export default useSpotlightStore;
