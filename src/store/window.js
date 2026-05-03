import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WINDOW_CONFIG, INITIAL_Z_INDEX } from "#constants/index.js";

const useWindowStore = create(
  immer((set, get) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),

    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.zIndex = state.nextZIndex;
        win.data = null;
      }),

    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        state.nextZIndex++;
        win.zIndex = state.nextZIndex;
      }),

    // Get the topmost (highest z-index) open window key
    getTopmostOpenWindow: () => {
      const { windows } = get();
      let topKey = null;
      let topZ = -1;
      for (const [key, win] of Object.entries(windows)) {
        if (win.isOpen && win.zIndex > topZ) {
          topZ = win.zIndex;
          topKey = key;
        }
      }
      return topKey;
    },
  })),
);

export default useWindowStore;
