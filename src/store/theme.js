import { create } from "zustand";

const STORAGE_KEY = "portfolio-theme";

const getSystemTheme = () => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    ? "dark"
    : "light";
};

const safeReadStoredTheme = () => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === "dark" || raw === "light" ? raw : null;
};

const applyThemeToDom = (theme) => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
};

const ensureTransitionStyles = (cssText) => {
  if (typeof document === "undefined") return;
  const id = "theme-transition-styles";
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("style");
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = cssText;
};

const circleRevealCss = `
::view-transition-group(root) {
  animation-duration: 700ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

::view-transition-new(root) {
  animation-name: theme-reveal;
}

::view-transition-old(root) {
  animation: none;
  z-index: -1;
}

@keyframes theme-reveal {
  from {
    clip-path: circle(0% at 92% 8%);
  }
  to {
    clip-path: circle(150% at 92% 8%);
  }
}
`;

const switchWithOptionalViewTransition = (switchFn) => {
  if (typeof document === "undefined") return switchFn();
  if (!document.startViewTransition) return switchFn();
  ensureTransitionStyles(circleRevealCss);
  document.startViewTransition(switchFn);
};

const useThemeStore = create((set, get) => ({
  theme: "light",
  isHydrated: false,

  hydrateTheme: () => {
    const stored = safeReadStoredTheme();
    const nextTheme = stored ?? getSystemTheme();
    set({ theme: nextTheme, isHydrated: true });
    applyThemeToDom(nextTheme);
  },

  setTheme: (nextTheme, { animate = true } = {}) => {
    if (nextTheme !== "dark" && nextTheme !== "light") return;
    const doSwitch = () => {
      set({ theme: nextTheme });
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
      }
      applyThemeToDom(nextTheme);
    };
    if (!animate) return doSwitch();
    switchWithOptionalViewTransition(doSwitch);
  },

  toggleTheme: ({ animate = true } = {}) => {
    const nextTheme = get().theme === "dark" ? "light" : "dark";
    get().setTheme(nextTheme, { animate });
  },
}));

export default useThemeStore;

